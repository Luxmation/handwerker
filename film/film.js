/* Handwerker Blesius – Imagefilm 20 s, One-Take (keine Schnitte, nur Kamerafahrt + Verwandlungen).
   Alles ist eine reine Funktion der Zeit: window.seek(t) setzt den kompletten Bildzustand.
   Welt: CSS-3D, y nach unten (Boden y=0, oben = negativ). Kamera: Orbit um Ziel (tx,ty,tz),
   Abstand dist, Neigung rx (+ = nach unten schauen), Drehung ry (+ = nach links), Rollen rz.
   Musik: „A Sound Foundation“ (Airae), 152,9 BPM, Schlag n bei B(n) = 3,923 + 0,3925·n.   */
'use strict';
const W = 1920, H = 1080, P = 1400, DUR = 20;
const BEAT = 0.3925, B0 = 3.923, B = n => B0 + n * BEAT;
const $ = s => document.querySelector(s);
const world = $('#world'), hud = $('#hud'), over = $('#over'), svg = $('#lines');
const TEX = 'assets/tex/', IMG = 'assets/img/', BR = 'assets/brand/';

/* ---------- Mathe & Easing ---------- */
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const D2R = Math.PI / 180;
const E = {
  lin: x => x,
  in: x => x * x * x,
  out: x => 1 - Math.pow(1 - x, 3),
  inOut: x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
  outQuint: x => 1 - Math.pow(1 - x, 5),
  inOutQuint: x => x < .5 ? 16 * x ** 5 : 1 - Math.pow(-2 * x + 2, 5) / 2,
  outExpo: x => x >= 1 ? 1 : 1 - Math.pow(2, -10 * x),
  inExpo: x => x <= 0 ? 0 : Math.pow(2, 10 * x - 10),
  inOutExpo: x => x <= 0 ? 0 : x >= 1 ? 1 : x < .5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2,
  outBack: (x, s = 1.70158) => 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2),
  inOutSine: x => -(Math.cos(Math.PI * x) - 1) / 2,
  outElastic: x => x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - .75) * (2 * Math.PI) / 3) + 1,
};
const ease = (t, a, b, e = E.inOut) => e(prog(t, a, b));
function rand(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

/* ---------- DOM-Helfer ---------- */
function mk(parent, cls, css, html) { const d = document.createElement('div'); if (cls) d.className = cls; if (css) d.style.cssText = css; if (html != null) d.innerHTML = html; parent.appendChild(d); return d; }
const f = v => (Math.abs(v) < 1e-4 ? 0 : v).toFixed(3);
function tf(o) { // Transform-String aus {x,y,z,rx,ry,rz,s,sx,sy}
  let s = `translate3d(${f(o.x || 0)}px,${f(o.y || 0)}px,${f(o.z || 0)}px)`;
  if (o.ry) s += ` rotateY(${f(o.ry)}deg)`;
  if (o.rx) s += ` rotateX(${f(o.rx)}deg)`;
  if (o.rz) s += ` rotateZ(${f(o.rz)}deg)`;
  if (o.s != null && o.s !== 1) s += ` scale(${f(o.s)})`;
  if (o.sx != null || o.sy != null) s += ` scale(${f(o.sx ?? 1)},${f(o.sy ?? 1)})`;
  return s;
}
function plane(parent, w, h, css, html) { // zentrierte Fläche
  return mk(parent, 'o', `width:${w}px;height:${h}px;margin:${-h / 2}px 0 0 ${-w / 2}px;${css || ''}`, html);
}
function group(parent) { return mk(parent || world, 'o', ''); }
function show(el, on) { const v = on ? '' : 'none'; if (el.style.display !== v) el.style.display = v; }
function op(el, v) { el.style.opacity = f(clamp(v)); }

/* Quader mit 6 Flächen; Schattierung je Fläche (Licht von oben-links-vorne) */
function box(parent, w, h, d, mat) {
  const g = group(parent);
  const faces = {};
  const add = (k, W_, H_, t, bg, light) => {
    const e = mk(g, 'o face', `width:${W_}px;height:${H_}px;margin:${-H_ / 2}px 0 0 ${-W_ / 2}px;transform:${t};${bg}`);
    const sh = mk(e, 'shade', `opacity:${1 - light}`);
    faces[k] = { e, sh };
  };
  add('top', w, d, `translateY(${-h / 2}px) rotateX(90deg)`, mat.top, 1.0);
  add('bottom', w, d, `translateY(${h / 2}px) rotateX(-90deg)`, mat.bottom || mat.top, .35);
  add('front', w, h, `translateZ(${d / 2}px)`, mat.front || mat.side, .78);
  add('back', w, h, `translateZ(${-d / 2}px) rotateY(180deg)`, mat.side, .5);
  add('right', d, h, `translateX(${w / 2}px) rotateY(90deg)`, mat.side, .62);
  add('left', d, h, `translateX(${-w / 2}px) rotateY(-90deg)`, mat.side, .7);
  return { g, faces };
}

/* Schrift: Zeilen mit Masken, Buchstaben einzeln animierbar */
function text(parent, lines, css, cls = 'disp') {
  const el = mk(parent, cls, css || '');
  const chars = [];
  lines.forEach((ln, li) => {
    const line = mk(el, 'line', '');
    const parts = typeof ln === 'string' ? [{ t: ln }] : ln;
    parts.forEach(p => {
      const host = p.em ? (() => { const e = document.createElement('em'); line.appendChild(e); return e; })() : line;
      [...p.t].forEach(c => {
        if (c === ' ') { host.appendChild(document.createTextNode(' ')); return; }
        const s = document.createElement('span'); s.className = 'ch'; s.textContent = c; host.appendChild(s);
        chars.push({ s, line: li });
      });
    });
  });
  return { el, chars };
}
// Buchstaben steigen aus der Zeilenmaske (p: 0..1 pro Buchstabe gestaffelt)
function riseChars(T, t, t0, dur = .55, stagger = .022, from = 1.08, e = E.outExpo, rot = 0) {
  T.chars.forEach((c, i) => {
    const p = e(prog(t, t0 + i * stagger, t0 + i * stagger + dur));
    c.s.style.transform = `translate3d(0,${f((1 - p) * from)}em,0)` + (rot ? ` rotate(${f((1 - p) * rot)}deg)` : '');
  });
}
function sinkChars(T, t, t0, dur = .35, stagger = .012, to = -1.08, e = E.inExpo) {
  T.chars.forEach((c, i) => {
    const p = e(prog(t, t0 + i * stagger, t0 + i * stagger + dur));
    if (p > 0) c.s.style.transform = `translate3d(0,${f(p * to)}em,0)`;
  });
}

/* ---------- Kamera ---------- */
const cam = { tx: 0, ty: 0, tz: 0, dist: 1400, rx: 90, ry: 0, rz: 0 };
let camPos = [0, 0, 0];
function camForward(rx, ry) { rx *= D2R; ry *= D2R; return [-Math.cos(rx) * Math.sin(ry), Math.sin(rx), -Math.cos(rx) * Math.cos(ry)]; }
function applyCam() {
  const fw = camForward(cam.rx, cam.ry);
  camPos = [cam.tx - cam.dist * fw[0], cam.ty - cam.dist * fw[1], cam.tz - cam.dist * fw[2]];
  world.style.transform = `translateZ(${P}px) rotateZ(${f(-cam.rz)}deg) rotateX(${f(-cam.rx)}deg) rotateY(${f(-cam.ry)}deg) translate3d(${f(-camPos[0])}px,${f(-camPos[1])}px,${f(-camPos[2])}px)`;
}
// Weltpunkt -> Bildschirm (für 2D-Beschriftungen, die 3D-Punkten folgen)
function project(x, y, z) {
  let v = [x - camPos[0], y - camPos[1], z - camPos[2]];
  const rY = a => { const c = Math.cos(a), s = Math.sin(a); return [c * v[0] + s * v[2], v[1], -s * v[0] + c * v[2]]; };
  const rX = a => { const c = Math.cos(a), s = Math.sin(a); return [v[0], c * v[1] - s * v[2], s * v[1] + c * v[2]]; };
  const rZ = a => { const c = Math.cos(a), s = Math.sin(a); return [c * v[0] - s * v[1], s * v[0] + c * v[1], v[2]]; };
  v = rY(-cam.ry * D2R); v = rX(-cam.rx * D2R); v = rZ(-cam.rz * D2R);
  if (v[2] > -1) return null;
  const k = P / -v[2];
  return { x: W / 2 + v[0] * k, y: H / 2 + v[1] * k, k };
}
/* Kamera-Schlüsselbilder: Hermite-Spline je Kanal (weiche Fahrt ohne Stopps); stop:true = Geschwindigkeit 0 */
const CH = ['tx', 'ty', 'tz', 'dist', 'rx', 'ry', 'rz'];
let KEYS = [];
function camAt(t) {
  const K = KEYS;
  if (t <= K[0].t) return Object.assign({}, K[0]);
  if (t >= K[K.length - 1].t) return Object.assign({}, K[K.length - 1]);
  let i = 0; while (i < K.length - 2 && t > K[i + 1].t) i++;
  const a = K[i], b = K[i + 1], dt = b.t - a.t;
  let s = (t - a.t) / dt;
  if (a.ease) s = a.ease(s);
  const h00 = 2 * s ** 3 - 3 * s ** 2 + 1, h10 = s ** 3 - 2 * s ** 2 + s, h01 = -2 * s ** 3 + 3 * s ** 2, h11 = s ** 3 - s ** 2;
  const tan = (j, c) => {
    const k = K[j]; if (k.stop || a.ease && j === i || a.ease && j === i + 1) return 0;
    const p = K[Math.max(0, j - 1)], n = K[Math.min(K.length - 1, j + 1)];
    if (p === n) return 0;
    return (n[c] - p[c]) / (n.t - p.t);
  };
  const o = {};
  CH.forEach(c => { o[c] = h00 * a[c] + h10 * dt * tan(i, c) + h01 * b[c] + h11 * dt * tan(i + 1, c); });
  return o;
}

/* ---------- Hintergrund: WebGL-Bänder (wie auf der Website) ---------- */
const bg = $('#bg');
const gl = bg.getContext('webgl', { antialias: false, preserveDrawingBuffer: true, alpha: false });
let uRes, uTime, uMouse, uAmp;
(function initGL() {
  if (!gl) return;
  const FRAG = `precision mediump float;
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uAmp;
const vec3 DEEP=vec3(0.085,0.052,0.030); const vec3 OAK=vec3(0.56,0.36,0.19); const vec3 HONEY=vec3(0.98,0.70,0.40);
const vec3 ORANGE=vec3(0.949,0.506,0.208); const vec3 BG=vec3(0.051,0.043,0.039);
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float centre(float x,float k,float t){return 0.40*sin(x*1.05+t*0.22+k*2.3)+0.16*sin(x*2.2-t*0.17+k*1.1)+(k-1.0)*0.92;}
vec4 ribbon(vec2 p,float k,float t){
 float y0=centre(p.x,k,t); float slope=(centre(p.x+0.01,k,t)-y0)/0.01; float twist=sin(p.x*1.2+t*0.30+k*1.7);
 float wd=0.05+0.15*abs(twist); float dd=(p.y-y0)/sqrt(1.0+slope*slope); float s=dd/wd; float glow=exp(-abs(dd)*6.5)*0.09;
 if(abs(s)>1.0) return vec4(ORANGE*glow,0.0);
 float z=sqrt(1.0-s*s); vec3 n=normalize(vec3(-slope*0.3,s*sign(twist+0.0001),z));
 vec3 l=normalize(vec3(-0.35+uMouse.x*0.7,0.75+uMouse.y*0.5,0.55)); float diff=max(dot(n,l),0.0);
 float spec=pow(max(dot(reflect(-l,n),vec3(0,0,1)),0.0),22.0); float fres=pow(1.0-z,3.0);
 float warp=noise(vec2(p.x*1.6+k*7.0,s*1.2))*0.55+noise(vec2(p.x*7.0,s*3.0+k))*0.12;
 float grain=0.5+0.5*sin((s+warp)*23.0); grain=grain*(0.82+0.18*noise(vec2(p.x*60.0,s*9.0))); grain=smoothstep(0.15,1.0,grain);
 vec3 col=mix(DEEP,OAK,diff*0.75)*(0.72+0.28*grain); col+=HONEY*(pow(diff,6.0)*0.42+fres*0.32)*(0.45+0.55*grain);
 col+=ORANGE*spec*0.75*(0.6+0.4*grain)+vec3(1.0,0.86,0.72)*pow(spec,5.0)*0.45;
 return vec4(col,smoothstep(1.0,0.62,abs(s)));}
void main(){
 vec2 uv=(gl_FragCoord.xy-0.5*uRes)/min(uRes.x,uRes.y); float t=uTime;
 vec2 p=mat2(0.86,0.51,-0.51,0.86)*uv*1.2; p+=uMouse*0.05; vec3 col=BG;
 for(int i=0;i<3;i++){float k=float(i); vec4 r=ribbon(p*(1.0+k*0.08),k,t); col=mix(col,r.rgb,r.a*0.82); col+=r.rgb*(1.0-r.a);}
 col=mix(BG,col,uAmp); col*=1.0-0.45*smoothstep(0.45,1.25,length(uv));
 gl_FragColor=vec4(col,1.0);}`;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s)); return s; };
  const pr = gl.createProgram();
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'));
  gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(pr); gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  uRes = gl.getUniformLocation(pr, 'uRes'); uTime = gl.getUniformLocation(pr, 'uTime'); uMouse = gl.getUniformLocation(pr, 'uMouse'); uAmp = gl.getUniformLocation(pr, 'uAmp');
  gl.viewport(0, 0, bg.width, bg.height);
})();
function drawBG(t, amp, mx, my) {
  if (!gl) return;
  gl.uniform2f(uRes, bg.width, bg.height); gl.uniform1f(uTime, 6 + t * 0.55); gl.uniform2f(uMouse, mx, my); gl.uniform1f(uAmp, amp);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

/* ---------- Filmkorn ---------- */
const fx = $('#fx'), fctx = fx.getContext('2d'), fimg = fctx.createImageData(fx.width, fx.height);
function drawGrain(t) {
  const r = rand(Math.floor(t * 60) * 7919 + 13), d = fimg.data;
  for (let i = 0; i < d.length; i += 4) { const v = 96 + r() * 64; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
  fctx.putImageData(fimg, 0, 0);
}

/* =====================================================================================
   SZENENAUFBAU
   ===================================================================================== */
const ROOM = { w: 1600, d: 1000 };            // Aufmaß 4,80 m x 3,00 m  (1 m = 333,3 px)
const L = { estrich: 150, spachtel: 26, tritt: 30, belag: 40 };
const Y_EST = -L.estrich, Y_SPA = Y_EST - L.spachtel, Y_TRI = Y_SPA - L.tritt, Y_TOP = Y_TRI - L.belag;
const NP = 10, PW = ROOM.d / NP;              // 10 Dielen à 100 px quer (z), 1600 lang (x)
const RISER = 120;

/* --- Boden-Raster (Bauplan) --- */
const ground = plane(world, 4400, 4400, `background:
  linear-gradient(rgba(242,129,53,.07) 2px,transparent 2px) 0 0/111.1px 111.1px,
  linear-gradient(90deg,rgba(242,129,53,.07) 2px,transparent 2px) 0 0/111.1px 111.1px;
  -webkit-mask-image:radial-gradient(closest-side,#000 0%,rgba(0,0,0,.6) 45%,transparent 100%);`);
ground.style.transform = tf({ rx: 90 });

/* --- A: Maßband --- */
const TAPE = { z: ROOM.d / 2 + 80, w: 84, x0: -ROOM.w / 2, len: ROOM.w };
const tapeG = group();
const tapeBlade = plane(tapeG, TAPE.len, TAPE.w, 'background:#F28135;box-shadow:0 0 0 1px rgba(0,0,0,.25);overflow:hidden;');
tapeBlade.style.transform = tf({ x: TAPE.x0 + TAPE.len / 2, z: TAPE.z, rx: 90 });
(function ticks() { // Skala: 1 cm = 3,333 px
  let html = '';
  const cm = 3.3333;
  for (let i = 0; i <= 480; i++) {
    const x = i * cm, big = i % 10 === 0, mid = i % 5 === 0;
    const h = big ? 34 : mid ? 22 : 12;
    html += `<i style="position:absolute;left:${x.toFixed(2)}px;top:0;width:${big ? 2 : 1}px;height:${h}px;background:#14110f"></i>`;
    if (big && i > 0 && i % 100) html += `<b style="position:absolute;left:${(x - 3).toFixed(2)}px;top:38px;transform:translateX(-100%);font:700 27px/1 Archivo;font-stretch:72%;color:#14110f">${i}</b>`;
    if (i % 100 === 0 && i > 0) html += `<b style="position:absolute;left:${(x - 4).toFixed(2)}px;top:36px;transform:translateX(-100%);padding:3px 6px;background:#14110f;font:700 26px/1 Archivo;font-stretch:72%;color:#F7A26C">${i / 100} M</b>`;
  }
  tapeBlade.innerHTML = html;
})();
const tapeHook = plane(tapeG, 18, 86, 'background:linear-gradient(90deg,#55504a,#9b958d 40%,#4a4642);border-radius:2px;');
const tapeCase = plane(tapeG, 250, 250, 'border-radius:58px 58px 58px 20px;background:linear-gradient(135deg,#3a3633,#1d1a18);box-shadow:inset 0 0 0 3px rgba(255,255,255,.06),0 18px 40px rgba(0,0,0,.6);',
  '<div style="position:absolute;inset:38px;border-radius:50%;border:10px solid #F28135;box-shadow:inset 0 0 0 8px #2b2826"></div><div style="position:absolute;left:50%;top:50%;width:44px;height:44px;margin:-22px;border-radius:50%;background:#14110f"></div><div class=\"mono\" style="position:absolute;left:0;right:0;bottom:12px;text-align:center;font-size:15px;color:rgba(237,232,225,.7)">5 m</div>');
tapeCase.style.transform = tf({ x: TAPE.x0 - 134, z: TAPE.z - 66, y: -3, rx: 90 });
const tapeShadow = plane(tapeG, TAPE.len, 50, 'background:rgba(0,0,0,.55);filter:blur(10px);');
tapeShadow.style.transform = tf({ x: TAPE.x0 + TAPE.len / 2, z: TAPE.z + 16, y: 1, rx: 90 });

/* Kreidelinien (Raum-Umriss) + Maßangaben */
const chalk = group();
const CL = [ // Kanten: unten (Maßband), rechts, oben, links
  { x: 0, z: ROOM.d / 2, len: ROOM.w, rot: 0 },
  { x: ROOM.w / 2, z: 0, len: ROOM.d, rot: 90 },
  { x: 0, z: -ROOM.d / 2, len: ROOM.w, rot: 0 },
  { x: -ROOM.w / 2, z: 0, len: ROOM.d, rot: 90 },
].map(c => { const e = plane(chalk, c.len + 8, 6, 'background:#F28135;box-shadow:0 0 18px rgba(242,129,53,.55);transform-origin:50% 50%;'); return Object.assign(c, { e }); });
const dimTop = plane(chalk, 400, 40, 'font:500 26px/40px "DM Mono";letter-spacing:.14em;color:#F7A26C;text-align:center;', '4,80 M');
const dimSide = plane(chalk, 400, 40, 'font:500 26px/40px "DM Mono";letter-spacing:.14em;color:#F7A26C;text-align:center;', '3,00 M');
const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sz]) => {
  const e = plane(chalk, 60, 60, `border-${sz < 0 ? 'top' : 'bottom'}:4px solid #EDE8E1;border-${sx < 0 ? 'left' : 'right'}:4px solid #EDE8E1;`);
  e.style.transform = tf({ x: sx * (ROOM.w / 2 + 34), z: sz * (ROOM.d / 2 + 34), y: -1, rx: 90 });
  return e;
});

/* Text auf dem Boden */
const floorText = group();
const T1 = text(floorText, ['Ein Boden', 'ist nur so gut,'], 'font-size:210px;color:#EDE8E1;text-align:left;');
T1.el.style.cssText += 'position:absolute;width:1400px;margin:-190px 0 0 -700px;';
floorText.style.transform = tf({ y: -1, rx: 90 });

/* --- B: Schichtaufbau --- */
const stackG = group();
const matEst = { top: `background:url(${TEX}estrich.jpg) center/900px auto,#777;`, side: 'background:linear-gradient(#8d8a85,#6d6a66);' };
const matSpa = { top: `background:url(${TEX}spachtel.jpg) center/1100px auto,#bbb;`, side: 'background:linear-gradient(#cfcbc4,#a9a49c);' };
const matTri = { top: 'background:radial-gradient(circle,rgba(20,14,10,.55) 1.8px,transparent 2.3px) 0 0/16px 16px,linear-gradient(135deg,#8f4a22,#6e3719);', side: 'background:repeating-linear-gradient(90deg,#8a4520 0 6px,#5e2f15 6px 9px);' };
const est = box(stackG, ROOM.w, L.estrich, ROOM.d, matEst);
const spa = box(stackG, ROOM.w, L.spachtel, ROOM.d, matSpa);
const tri = box(stackG, ROOM.w, L.tritt, ROOM.d, matTri);
const stackShadow = plane(stackG, ROOM.w + 300, ROOM.d + 300, 'background:radial-gradient(closest-side,rgba(0,0,0,.75),transparent);');
stackShadow.style.transform = tf({ y: -0.5, rx: 90, x: 120, z: -60 });

/* Dielen: je 2 Seiten (oben/unten) mit wechselnden Materialien */
const MATS = [ // Reihenfolge der Materialien beim Umdrehen
  { name: 'Parkett', tex: 'oak.jpg', sub: 'Echtholz · Landhausdiele · Fischgrät' },
  { name: 'Vinyl', tex: 'vinyl.jpg', sub: 'Klick & Klebe · Holz- und Steinoptik' },
  { name: 'Laminat', tex: 'laminat.jpg', sub: 'Belastbar · pflegeleicht' },
  { name: 'Teppich', tex: 'teppich.jpg', sub: 'Warm · leise · weich' },
  { name: 'Treppen', tex: 'oak.jpg', sub: 'Stufe für Stufe angepasst' },
];
const texCSS = (m, i) => m.tex === 'teppich.jpg'
  ? `background:url(${TEX}teppich.jpg) ${-((i * 37) % 60)}px ${-((i * 97) % 900)}px/1660px auto;`
  : `background:url(${TEX}${m.tex}) ${-((i * 311) % 780)}px ${-((i % 8) * 153.6 + 30)}px/2400px 1228.8px;`;
const planks = [];
for (let i = 0; i < NP; i++) {
  const b = box(stackG, ROOM.w - 6, L.belag, PW - 6, { top: texCSS(MATS[0], i), bottom: texCSS(MATS[1], i), side: 'background:linear-gradient(#7a5434,#5a3c24);' });
  // Kantenlicht oben
  b.faces.top.e.style.boxShadow = 'inset 0 2px 0 rgba(255,235,210,.25),inset 0 -2px 0 rgba(0,0,0,.35)';
  b.faces.bottom.e.style.boxShadow = 'inset 0 2px 0 rgba(255,235,210,.25),inset 0 -2px 0 rgba(0,0,0,.35)';
  planks.push({ b, i, z: -ROOM.d / 2 + PW / 2 + i * PW, mat: [-1, -1] });
}
/* Setzstufen (Treppe) – wachsen aus den Dielen */
const risers = [];
const RISER_WORDS = ['', 'Verlegt', 'mit der', 'Sorgfalt', 'einer', [{ t: 'Schreinerei.', em: true }], '', '', '', '']; // Index = Stufe s
for (let i = 0; i < NP; i++) {
  const e = plane(stackG, ROOM.w - 6, RISER, 'background:linear-gradient(180deg,#1f1a16,#15110e);overflow:hidden;box-shadow:inset 0 3px 0 rgba(242,129,53,.0);transform-origin:50% 0;');
  let T = null;
  const w = RISER_WORDS[i];
  if (w) {
    T = text(e, [w], `font-size:${i === 6 ? 104 : 104}px;color:#EDE8E1;position:absolute;left:0;right:0;top:12px;text-align:center;`);
  }
  const lab = mk(e, 'mono', 'position:absolute;left:28px;bottom:10px;font-size:14px;color:rgba(237,232,225,.45);', `Stufe ${String(i).padStart(2, '0')}`);
  risers.push({ e, T, lab });
}

/* Beschriftungen der Schichten (2D, folgen 3D-Punkten) */
const callouts = ['Estrich', 'Spachtelmasse', 'Trittschalldämmung', 'Belag'].map((n, i) => {
  const e = mk(over, 'mono', `position:absolute;left:0;top:0;font-size:19px;color:#EDE8E1;padding:8px 12px;background:rgba(13,11,10,.72);border:1px solid rgba(242,129,53,.55);`, `<span style="color:#F28135">0${i + 1}</span>&nbsp;&nbsp;${n}`);
  const ln = document.createElementNS('http://www.w3.org/2000/svg', 'path'); ln.setAttribute('stroke', '#F28135'); ln.setAttribute('stroke-width', '2'); ln.setAttribute('fill', 'none'); svg.appendChild(ln);
  const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); dot.setAttribute('r', '5'); dot.setAttribute('fill', '#F28135'); svg.appendChild(dot);
  return { e, ln, dot };
});

/* Satz 2 – Bildschirm-Text oben links (lesbar), driftet leicht mit der Kamera */
const t2G = mk(over, '', 'position:absolute;left:0;top:0;width:1920px;height:1080px;');
const T2 = text(t2G, ['Wie das,', [{ t: 'worauf er liegt.', em: true }]], 'position:absolute;left:150px;top:150px;font-size:150px;color:#EDE8E1;text-shadow:0 8px 40px rgba(0,0,0,.55);');

/* --- C: Material-Wort (liegt auf den Dielen) --- */
const wordG = group();
const sheen = plane(wordG, 700, 1300, 'background:linear-gradient(90deg,transparent,rgba(255,240,220,.16) 45%,rgba(255,250,240,.26) 50%,rgba(255,240,220,.16) 55%,transparent);');
const dimmer = plane(wordG, 1800, 1100, 'background:radial-gradient(closest-side,rgba(10,8,7,.66),rgba(10,8,7,.2) 70%,transparent);');
const reelWin = mk(wordG, 'o flat', 'width:1500px;height:300px;margin:-150px 0 0 -750px;overflow:hidden;');
const reel = mk(reelWin, '', 'position:absolute;left:0;top:0;width:100%;');
const reelWords = MATS.map((m, i) => mk(reel, 'disp', `height:300px;font-size:300px;line-height:300px;text-align:center;color:#EDE8E1;text-shadow:0 10px 50px rgba(0,0,0,.65),0 2px 6px rgba(0,0,0,.5);`, m.name));
const subWin = mk(wordG, 'o flat', 'width:1500px;height:44px;margin:150px 0 0 -750px;overflow:hidden;');
const subReel = mk(subWin, '', 'position:absolute;left:0;top:0;width:100%;');
MATS.forEach(m => mk(subReel, 'mono', 'height:44px;line-height:44px;font-size:26px;text-align:center;color:#F7A26C;text-shadow:0 2px 14px rgba(0,0,0,.8);', m.sub));

/* --- E: Portal (Haus-Silhouette) + Fotos --- */
const LAND = { y: Y_TOP - (NP - 1) * RISER, z: -ROOM.d / 2 + PW / 2 }; // oberste Stufe = hinterste Diele
const portalG = group();
const portalSVG = `<svg viewBox="0 0 1000 1000" width="1000" height="1000" style="overflow:visible"><path d="M60 990 V420 L500 60 L940 420 V990" fill="none" stroke="#F28135" stroke-width="16" stroke-linejoin="miter"/><path d="M215 300 V150 H300 V232" fill="none" stroke="#F28135" stroke-width="16"/><path d="M150 990 V460 L500 175 L850 460 V990" fill="none" stroke="rgba(237,232,225,.35)" stroke-width="3"/></svg>`;
const portal = plane(portalG, 1000, 1000, '', portalSVG);
const photoG = group();
const PHOTO = { w: 2400, h: 1600 };
const photo1 = plane(photoG, PHOTO.w, PHOTO.h, `background:url(${IMG}kueche-eiche-1600.jpg) 46% 30%/cover;`);
// zweites Foto über Dielen-Streifen (Wende-Wischer)
const strips = [];
const NS = 8;
for (let i = 0; i < NS; i++) {
  const sw = PHOTO.w / NS;
  const g = group(photoG);
  const a = mk(g, 'o face', `width:${sw}px;height:${PHOTO.h}px;margin:${-PHOTO.h / 2}px 0 0 ${-sw / 2}px;background:url(${IMG}kueche-eiche-1600.jpg) ${-(i * sw)}px 30%/${PHOTO.w}px auto;`);
  const b2 = mk(g, 'o face', `width:${sw}px;height:${PHOTO.h}px;margin:${-PHOTO.h / 2}px 0 0 ${-sw / 2}px;transform:rotateY(180deg);background:url(${IMG}fischgraet-raum-1600.jpg) ${-(i * sw)}px 62%/${PHOTO.w}px auto;`);
  const sha = mk(a, 'shade', 'opacity:0'), shb = mk(b2, 'shade', 'opacity:0');
  strips.push({ g, a, b: b2, sha, shb, x: -PHOTO.w / 2 + sw / 2 + i * sw });
}

/* Text im Foto (2D, Bildschirmebene) */
const resultG = mk(over, '', 'position:absolute;left:0;top:0;width:1920px;height:1080px;');
const resultShade = mk(resultG, '', 'position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,8,7,.78) 0%,rgba(10,8,7,.45) 42%,transparent 70%);');
const R1 = text(resultG, ['Beratung.'], 'position:absolute;left:150px;top:250px;font-size:170px;color:#EDE8E1;');
const R2 = text(resultG, ['Verkauf.'], 'position:absolute;left:150px;top:400px;font-size:170px;color:#EDE8E1;');
const R3 = text(resultG, ['Verlegung.'], 'position:absolute;left:150px;top:550px;font-size:170px;color:#EDE8E1;');
const R4 = text(resultG, [[{ t: 'Aus einer Hand.', em: true }]], 'position:absolute;left:154px;top:742px;font-size:92px;color:#F28135;');

/* --- F: Region --- */
const TOWNS = [
  ['Wermelskirchen', 51.139, 7.216], ['Remscheid', 51.179, 7.189], ['Solingen', 51.171, 7.084], ['Wuppertal', 51.256, 7.150],
  ['Burscheid', 51.087, 7.123], ['Bergisch Gladbach', 50.992, 7.136], ['Köln', 50.938, 6.960],
];
const KM = 52;
const mapG = group();
const MAPY = 0;
const towns = TOWNS.map(([n, la, lo], i) => {
  const x = (lo - 7.216) * Math.cos(51.1 * D2R) * 111.32 * KM, z = -(la - 51.139) * 111.32 * KM;
  const dot = plane(mapG, i ? 54 : 96, i ? 54 : 96, `border-radius:50%;background:${i ? '#EDE8E1' : '#F28135'};box-shadow:0 0 ${i ? 30 : 90}px ${i ? 'rgba(237,232,225,.6)' : 'rgba(242,129,53,.95)'};`);
  const lab = plane(mapG, 1400, 100, `font:500 ${i ? 70 : 92}px/100px "DM Mono";letter-spacing:.12em;text-transform:uppercase;color:${i ? '#EDE8E1' : '#F7A26C'};text-align:left;white-space:nowrap;text-shadow:0 4px 30px rgba(0,0,0,.8);`, n);
  return { n, x, z, dot, lab };
});
const routes = towns.slice(1).map(tw => {
  const len = Math.hypot(tw.x, tw.z), ang = Math.atan2(tw.z, tw.x) / D2R;
  const e = plane(mapG, len, 10, 'background:linear-gradient(90deg,#F28135,rgba(242,129,53,.4));transform-origin:0 50%;margin-left:0;box-shadow:0 0 24px rgba(242,129,53,.5);');
  return { tw, len, ang, e };
});
const mapRing = plane(mapG, 2600, 2600, 'border-radius:50%;border:6px solid rgba(242,129,53,.35);');
const mapRing2 = plane(mapG, 1300, 1300, 'border-radius:50%;border:4px dashed rgba(237,232,225,.22);');

/* --- G: Logo-Endtafel (Bildschirmebene) – echtes Lockup: Wortmarke links, Bildmarke rechts --- */
const endG = mk(over, '', 'position:absolute;left:0;top:0;width:1920px;height:1080px;transform-origin:50% 42%;');
const LKk = 1.28, LKW = 900 * LKk, LKH = 254 * LKk, LKX = (1920 - LKW) / 2, LKY = 168;
const wordmark = mk(endG, '', `position:absolute;left:${LKX}px;top:${LKY}px;width:${LKW}px;height:${LKH}px;background:url(${BR}logo-light.png) 0 0/${LKW}px ${LKH}px no-repeat;`);
const WM_W = 560 * LKk;                       // Breite der Wortmarke im Lockup
const MARKX = LKX + 565 * LKk, MARKW = 335 * LKk;
const markParts = ['roof', 'orange', 'graphite', 'house'].map(n => mk(endG, '', `position:absolute;left:${MARKX}px;top:${LKY}px;width:${MARKW}px;height:${LKH}px;background:url(${BR}mark-${n}.png) center/contain no-repeat;transform-origin:50% 100%;`));
const flare = mk(endG, '', 'position:absolute;left:960px;top:540px;width:520px;height:520px;margin:-260px 0 0 -260px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,236,214,.9),rgba(242,129,53,.45) 30%,rgba(242,129,53,0) 72%);');
const streak = mk(endG, '', 'position:absolute;left:0;top:538px;width:1920px;height:4px;background:linear-gradient(90deg,transparent,rgba(255,214,170,.0) 10%,rgba(255,226,196,.95) 50%,rgba(255,214,170,0) 90%,transparent);box-shadow:0 0 30px rgba(242,129,53,.8);');
const logoSheen = mk(endG, '', `position:absolute;left:${LKX}px;top:${LKY}px;width:${LKW}px;height:${LKH}px;overflow:hidden;-webkit-mask:url(${BR}logo-light.png) 0 0/${LKW}px ${LKH}px no-repeat;mask:url(${BR}logo-light.png) 0 0/${LKW}px ${LKH}px no-repeat;`, '<i style="position:absolute;top:-20%;left:0;width:220px;height:140%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.85),transparent);transform:skewX(-18deg)"></i>');
const endRule = mk(endG, '', `position:absolute;left:${LKX}px;top:${LKY + LKH + 44}px;height:4px;width:${LKW}px;background:#F28135;transform-origin:50% 50%;box-shadow:0 0 22px rgba(242,129,53,.6);`);
const endSub = text(endG, ['Bodenleger in Wermelskirchen'], `position:absolute;left:0;width:1920px;text-align:center;top:${LKY + LKH + 78}px;font-size:30px;color:#F7A26C;`, 'mono');
const endTel = text(endG, ['0159 0171 7249'], `position:absolute;left:0;width:1920px;text-align:center;top:${LKY + LKH + 134}px;font-size:150px;color:#EDE8E1;`);
const endRow = mk(endG, '', `position:absolute;left:0;width:1920px;top:${LKY + LKH + 318}px;display:flex;justify-content:center;align-items:center;gap:46px;`);
const endWeb = mk(endRow, 'mono', 'font-size:33px;color:#D5CEC3;letter-spacing:.1em;text-transform:none;', 'handwerker-blesius.de');
const endStars = mk(endRow, '', 'display:flex;align-items:center;gap:14px;font:500 33px/1 Archivo;color:#EDE8E1;',
  `<span style="display:flex;gap:5px">${'<svg width="32" height="32" viewBox="0 0 24 24"><path fill="#F28135" d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8Z"/></svg>'.repeat(5)}</span><span><b style="font-weight:800">5,0</b> bei Google</span>`);
const endCTA = mk(endRow, '', 'padding:22px 34px;background:#F28135;color:#140f0b;font:700 29px/1 Archivo;font-stretch:85%;letter-spacing:.08em;text-transform:uppercase;', 'Jetzt unverbindlich anfragen');

/* --- Staub im Licht --- */
const dustG = mk(over, '', 'position:absolute;inset:0;');
const dr = rand(77);
const dust = Array.from({ length: 46 }, () => ({ x: dr() * 1920, y: dr() * 1080, z: .3 + dr() * .9, s: 2 + dr() * 5, ph: dr() * 6.28,
  e: mk(dustG, '', 'position:absolute;left:0;top:0;border-radius:50%;background:radial-gradient(circle,rgba(255,226,190,.9),rgba(255,200,150,0) 70%);') }));

/* --- HUD --- */
const hudCorners = [[0, 0], [1, 0], [0, 1], [1, 1]].map(([sx, sy]) => mk(hud, '', `position:absolute;${sx ? 'right' : 'left'}:56px;${sy ? 'bottom' : 'top'}:56px;width:34px;height:34px;border-${sy ? 'bottom' : 'top'}:2px solid rgba(237,232,225,.7);border-${sx ? 'right' : 'left'}:2px solid rgba(237,232,225,.7);`));
const hudLabel = mk(hud, 'mono', 'position:absolute;left:112px;top:62px;font-size:19px;color:#EDE8E1;display:flex;align-items:center;gap:18px;', '<span class="hl-no" style="color:#F28135"></span><span class="hl-name"></span><i style="display:block;width:120px;height:1px;background:rgba(237,232,225,.35)"></i>');
const hudNo = hudLabel.querySelector('.hl-no'), hudName = hudLabel.querySelector('.hl-name');
const hudTR = mk(hud, 'mono', 'position:absolute;right:112px;top:62px;font-size:16px;color:rgba(237,232,225,.62);', 'Handwerker Blesius · Bodenleger');
const hudBL = mk(hud, 'mono', 'position:absolute;left:112px;bottom:62px;font-size:16px;color:rgba(237,232,225,.62);', '<span style="color:#F28135">●</span>&nbsp; 51.139° N · 7.216° E');
const hudRuler = mk(hud, '', 'position:absolute;right:112px;bottom:66px;width:420px;height:16px;');
hudRuler.innerHTML = Array.from({ length: 43 }, (_, i) => `<i style="position:absolute;left:${i * 10}px;bottom:0;width:1px;height:${i % 10 === 0 ? 16 : i % 5 === 0 ? 11 : 6}px;background:rgba(237,232,225,.5)"></i>`).join('') + '<b class="rf" style="position:absolute;left:0;bottom:0;height:2px;width:0;background:#F28135;box-shadow:0 0 10px rgba(242,129,53,.8)"></b>';
const hudFill = hudRuler.querySelector('.rf');
const hudMeter = mk(hud, 'mono', 'position:absolute;right:112px;bottom:92px;font-size:16px;color:rgba(237,232,225,.62);', '');
const SECTIONS = [
  [0, 'Schicht 01', 'Aufmaß'], [B(0), 'Schicht 02', 'Untergrund'], [B(4), 'Schicht 03', 'Verlegung'], [B(12), 'Schicht 04', 'Handwerk'],
  [B(20), 'Schicht 05', 'Oberfläche'], [B(25), 'Schicht 06', 'Region'],
];

/* =====================================================================================
   KAMERA-FAHRT (Orbit-Parameter)  rx: 90 = senkrecht von oben
   ===================================================================================== */
// Hilfe: Schlüsselbild aus Kameraposition C und Blickziel T
function look(t, C, T, rz = 0, extra = {}) {
  const d = [T[0] - C[0], T[1] - C[1], T[2] - C[2]], dist = Math.hypot(...d);
  const rx = Math.asin(d[1] / dist) / D2R, ry = Math.atan2(-d[0], -d[2]) / D2R;
  return Object.assign({ t, tx: T[0], ty: T[1], tz: T[2], dist, rx, ry, rz }, extra);
}
const PH = { y: LAND.y - 520, z: LAND.z - 1980 };          // Foto-Mitte
KEYS = [
  { t: 0.00, tx: -640, ty: 0, tz: TAPE.z, dist: 640, rx: 90, ry: 0, rz: -6 },
  { t: B(-9), tx: -560, ty: 0, tz: TAPE.z, dist: 640, rx: 90, ry: 0, rz: -5 },
  { t: B(-6), tx: 430, ty: 0, tz: TAPE.z - 20, dist: 720, rx: 90, ry: 0, rz: -2 },
  { t: B(-4.5), tx: 40, ty: 0, tz: 30, dist: 2050, rx: 90, ry: 0, rz: 0 },
  { t: B(-2), tx: 0, ty: -40, tz: 40, dist: 2300, rx: 64, ry: -14, rz: 0 },
  { t: B(0), tx: -120, ty: -260, tz: 40, dist: 2550, rx: 44, ry: -30, rz: 0 },
  { t: B(2), tx: -300, ty: -430, tz: 0, dist: 2450, rx: 36, ry: -38, rz: 0 },
  { t: B(3.2), tx: 0, ty: Y_TOP, tz: 0, dist: 1700, rx: 64, ry: -22, rz: 0 },
  { t: B(4), tx: 0, ty: Y_TOP, tz: 0, dist: 1180, rx: 90, ry: 0, rz: -3 },
  { t: B(8), tx: -40, ty: Y_TOP, tz: 0, dist: 1100, rx: 90, ry: 0, rz: 2 },
  { t: B(11.6), tx: 0, ty: Y_TOP, tz: 20, dist: 1150, rx: 90, ry: 0, rz: 0 },
  { t: B(12.6), tx: 0, ty: Y_TOP - 200, tz: 360, dist: 1150, rx: 38, ry: 12, rz: 0 },
  // Halt auf „Schreinerei.“ (identisch mit Treppen-Kamera k=4)
  { t: B(18.2), tx: 0, ty: Y_TOP - 4.5 * RISER - 10, tz: 0, dist: 760, rx: 24, ry: 22, rz: 0, stop: true },
  // Kran hoch + zurück: ganze Treppe mit Portal oben
  look(B(19.0), [0, -1500, 1150], [0, -1560, -700], 0),
  // durch das Portal ins Foto
  look(B(20.0), [0, -1830, -330], [0, PH.y, PH.z], 0),
  look(B(20.6), [0, PH.y, -900], [0, PH.y, PH.z], 0),
  look(B(24.6), [0, PH.y, -1120], [0, PH.y, PH.z], 0),
  // Region: hoch über die Karte, Foto fällt flach als Stecknadel
  look(B(26.2), [0, -3600, 1], [0, MAPY, 0], -10),
  look(B(27.3), [-60, -3300, 121], [-60, MAPY, 120], -6),
  look(B(28.0), [0, -900, 1], [0, MAPY, 0], 0, { stop: true }),
  look(DUR, [0, -900, 1], [0, MAPY, 0], 0),
];
const CLIMB = { t0: B(12.6), t1: B(18.2) };
KEYS.sort((a, b) => a.t - b.t);

/* =====================================================================================
   UPDATE
   ===================================================================================== */
function updateCam(t) {
  const c = camAt(t);
  // Treppe: Ziel = Setzstufe k+1; ein Schritt pro Schlag (B13..B17), Halt auf „Schreinerei.“
  if (t > CLIMB.t0 && t < CLIMB.t1) {
    const n = (t - B(13)) / BEAT;
    let k = clamp(n, 0, 4);
    k = Math.floor(k) + E.inOutQuint(k - Math.floor(k));
    const ty = Y_TOP - (k + .5) * RISER - 10, tz = 400 - 100 * k;
    const w = ease(t, CLIMB.t0, CLIMB.t0 + .3, E.inOut);
    c.ty = lerp(c.ty, ty, w); c.tz = lerp(c.tz, tz, w);
    c.rx = lerp(c.rx, 24, w); c.dist = lerp(c.dist, 760, w); c.ry = lerp(c.ry, 22, w); c.tx = lerp(c.tx, 0, w);
  }
  Object.assign(cam, c);
  // Aufprall-Wackler auf Hits
  const shake = (t0, a) => { const p = prog(t, t0, t0 + .45); return p > 0 && p < 1 ? Math.sin(p * 38) * a * (1 - p) ** 2 : 0; };
  cam.rz += shake(B(0), 1.2) + shake(B(12), .8);
  cam.dist += shake(B(0), 26);
  applyCam();
}

function setFaceMat(face, css) { if (face.e.dataset.m !== css) { face.e.dataset.m = css; face.e.style.background = ''; face.e.style.cssText = face.e.style.cssText.replace(/background[^;]*;?/g, '') + css; } }

function update(t) {
  updateCam(t);

  /* ---- A: Maßband ---- */
  const tapeOut = ease(t, B(-9), B(-6), E.outQuint);
  const tapeIn = ease(t, B(-3.2), B(-2.4), E.inExpo);
  const tl = TAPE.len * tapeOut * (1 - tapeIn);
  show(tapeG, t < B(-2.2));
  tapeBlade.style.clipPath = `inset(0 ${f(TAPE.len - tl)}px 0 0)`;
  tapeShadow.style.clipPath = `inset(0 ${f(TAPE.len - tl)}px 0 0)`;
  tapeHook.style.transform = tf({ x: TAPE.x0 + tl + 6, z: TAPE.z, y: -3, rx: 90 });
  op(tapeG, 1 - ease(t, B(-2.8), B(-2.3)));

  /* Kreidelinien: Unterkante „schnappt“, dann rechts, oben, links */
  show(chalk, t > B(-6.2) && t < B(1.2));
  const snap = (t0) => { const p = prog(t, t0, t0 + .5); return Math.sin(p * 30) * (1 - p) ** 2 * 14 * (p > 0 && p < 1); };
  CL.forEach((c, i) => {
    const t0 = B(-6) + i * 0.14;
    const p = ease(t, t0, t0 + .28, E.outExpo);
    const sc = Math.max(.0001, p);
    const w = i === 0 ? snap(B(-6)) : 0;
    c.e.style.transform = `translate3d(${f(c.x)}px,-2px,${f(c.z + (c.rot ? 0 : w))}px) rotateX(90deg) rotateZ(${c.rot}deg) scaleX(${f(sc)})`;
    op(c.e, p > 0 ? 1 : 0);
  });
  const dimP = ease(t, B(-5.4), B(-4.6), E.outExpo);
  dimTop.style.transform = tf({ x: 0, z: -ROOM.d / 2 - 70, y: -2, rx: 90 }); op(dimTop, dimP);
  dimSide.style.transform = `translate3d(${-ROOM.w / 2 - 70}px,-2px,0px) rotateX(90deg) rotateZ(-90deg)`; op(dimSide, dimP);
  corners.forEach((c, i) => op(c, ease(t, B(-5.6) + i * .05, B(-5.2) + i * .05)));
  op(chalk, 1 - ease(t, B(0.6), B(1.1)));

  /* Satz 1 auf dem Boden */
  show(floorText, t > B(-5.3) && t < B(0.4));
  T1.chars.forEach((c, i) => {
    const t0 = (c.line === 0 ? B(-5) : B(-4)) + (i % 12) * .028;
    const p = E.outExpo(prog(t, t0, t0 + .6));
    c.s.style.transform = `translate3d(0,${f((1 - p) * 1.08)}em,0)`;
  });
  op(floorText, 1 - ease(t, B(0) - .05, B(0) + .12));

  /* ---- B: Schichtaufbau ---- */
  show(stackG, t > B(-0.4) && t < B(25.6));
  op(stackG, 1 - ease(t, B(24.9), B(25.5)));
  const rise = E.outBack(prog(t, B(0), B(0) + .42), 1.4);
  const eh = Math.max(.001, rise);
  est.g.style.transform = `translate3d(0,${f(-L.estrich / 2 * eh)}px,0) scale3d(1,${f(eh)},1)`;
  const drop = (t0, yRest) => { const p = prog(t, t0 - .22, t0); const y = lerp(yRest - 420, yRest, E.in(p)); return { y, vis: t > t0 - .22 }; };
  const dS = drop(B(1), Y_EST - L.spachtel / 2); show(spa.g, dS.vis); spa.g.style.transform = tf({ y: dS.y });
  const dT = drop(B(2), Y_SPA - L.tritt / 2); show(tri.g, dT.vis); tri.g.style.transform = tf({ y: dT.y });
  op(stackShadow, ease(t, B(0), B(1)) * .9);

  /* Dielen: fallen (B(3)), drehen sich (Materialien), werden zur Treppe (B(12)) */
  const FLIP = [B(6), B(8), B(9), B(10)];             // Wechsel zu Vinyl, Laminat, Teppich, Treppen(Eiche)
  const FDUR = [.42, .42, .3, .3];
  planks.forEach(pl => {
    const i = pl.i;
    const tFall = B(3) - .26 + i * .028;
    const pf = E.in(prog(t, tFall, tFall + .26));
    let y = lerp(Y_TRI - L.belag / 2 - 1100, Y_TRI - L.belag / 2, pf);
    // Materialwechsel: Rotation um die Längsachse (x)
    let r = 0;
    FLIP.forEach((t0, k) => { const s = t0 - .06 + i * (k < 2 ? .026 : .016); r += E.inOutQuint(prog(t, s, s + FDUR[k])); });
    const kIdx = Math.floor(r + 1e-6), frac = r - kIdx;
    const mA = MATS[Math.min(kIdx, 4)], mB = MATS[Math.min(kIdx + 1, 4)];
    const frontIsA = kIdx % 2 === 0;
    const key = kIdx + (frontIsA ? 'a' : 'b');
    if (pl.mat[0] !== key) {
      pl.mat[0] = key;
      pl.b.faces.top.e.style.background = ''; pl.b.faces.bottom.e.style.background = '';
      const cssA = texCSS(mA, i), cssB = texCSS(mB, i);
      const topCss = frontIsA ? cssA : cssB, botCss = frontIsA ? cssB : cssA;
      pl.b.faces.top.e.style.cssText = pl.b.faces.top.e.style.cssText.replace(/background[^;]*;/g, '') + topCss;
      pl.b.faces.bottom.e.style.cssText = pl.b.faces.bottom.e.style.cssText.replace(/background[^;]*;/g, '') + botCss;
    }
    const lift = Math.sin(frac * Math.PI) * 60;               // beim Drehen kurz anheben
    // Licht: Oberseite hell, beim Kippen dunkler
    const ang = r * 180;
    const topLight = Math.max(0, Math.cos(ang * D2R)), botLight = Math.max(0, -Math.cos(ang * D2R));
    pl.b.faces.top.sh.style.opacity = f(1 - (.35 + .65 * topLight));
    pl.b.faces.bottom.sh.style.opacity = f(1 - (.35 + .65 * botLight));
    // Treppe: Diele i wird Stufe s = NP-1-i (hinten = oben)
    const sIdx = NP - 1 - i;
    const st = ease(t, B(12) - .05 + i * .018, B(12) + .5 + i * .018, E.outQuint);
    y -= st * sIdx * RISER;
    pl.b.g.style.transform = `translate3d(0,${f(y - lift)}px,${f(pl.z)}px) rotateX(${f(ang)}deg)`;
    show(pl.b.g, t > tFall);
    // Setzstufe vor der Diele: von Stufenoberkante bis zur nächsttieferen Stufe
    const rs = risers[sIdx];
    show(rs.e, sIdx > 0 && st > 0.01);
    if (sIdx > 0) {
      const topY = y - L.belag / 2;                       // Oberkante dieser Stufe
      rs.e.style.marginTop = '0px';
      rs.e.style.transform = `translate3d(0,${f(topY)}px,${f(pl.z + PW / 2 - 2)}px) scale3d(1,${f(Math.max(.001, st))},1)`;
      if (rs.T) riseChars(rs.T, t, B(12 + sIdx) - .05, .5, .02, 1.1);
    }
  });

  /* Beschriftungen der Schichten */
  const cAt = [B(0) + .25, B(1) + .1, B(2) + .1, B(3) + .3];
  const cY = [Y_EST / 2, Y_EST - L.spachtel / 2, Y_SPA - L.tritt / 2, Y_TRI - L.belag / 2];
  callouts.forEach((c, i) => {
    const vis = ease(t, cAt[i], cAt[i] + .25, E.outExpo) * (1 - ease(t, B(3.6), B(4.1)));
    const pnt = project(ROOM.w / 2, cY[i], ROOM.d / 2);
    if (!pnt || vis <= 0) { c.e.style.opacity = 0; c.ln.setAttribute('d', ''); c.dot.setAttribute('r', 0); return; }
    const lx = pnt.x + 120 + i * 0, ly = 300 + i * 92;
    c.e.style.opacity = f(vis);
    c.e.style.transform = `translate3d(${f(lx + 30)}px,${f(ly - 22)}px,0)`;
    const dx = lx + 26 - pnt.x;
    c.ln.setAttribute('d', `M${f(pnt.x)} ${f(pnt.y)} L${f(pnt.x + dx * vis * .5)} ${f(lerp(pnt.y, ly, vis))} L${f(pnt.x + dx * vis)} ${f(lerp(pnt.y, ly, vis))}`);
    c.dot.setAttribute('cx', f(pnt.x)); c.dot.setAttribute('cy', f(pnt.y)); c.dot.setAttribute('r', f(5 * vis));
  });

  /* Satz 2 */
  show(t2G, t > B(0.6) && t < B(4.6));
  t2G.style.transform = `translate3d(${f((cam.ry + 30) * 4)}px,0,0)`;
  T2.chars.forEach((c, i) => {
    const t0 = (c.line === 0 ? B(1) : B(2)) + (c.line === 0 ? i : i - 7) * .022;
    const p = E.outExpo(prog(t, t0, t0 + .55));
    c.s.style.transform = `translate3d(0,${f((1 - p) * 1.1)}em,0)`;
  });
  if (t > B(2.85)) sinkChars(T2, t, B(2.85), .26, .008, -1.1, E.in);

  /* ---- C: Materialwort ---- */
  show(wordG, t > B(3.8) && t < B(12.4));
  wordG.style.transform = tf({ y: Y_TOP - 170, rx: 90, rz: 0 });
  const steps = [B(4), B(6), B(8), B(9), B(10)];
  let ri = 0; steps.forEach((s, k) => { if (k) ri += E.inOutExpo(prog(t, s - .1, s + .18)); });
  reel.style.transform = `translate3d(0,${f(-ri * 300)}px,0)`;
  subReel.style.transform = `translate3d(0,${f(-ri * 44)}px,0)`;
  const wIn = ease(t, B(4) - .06, B(4) + .34, E.outExpo), wOut = ease(t, B(12) - .12, B(12) + .1, E.inExpo);
  reelWin.style.transform = `translate3d(0,${f((1 - wIn) * 120)}px,0) scale(${f(lerp(.85, 1, wIn) * (1 - wOut * .2))})`;
  op(reelWin, wIn * (1 - wOut)); op(subWin, wIn * (1 - wOut)); op(dimmer, wIn * (1 - wOut));
  // Glanzlicht nach jedem Wechsel quer über die Dielen
  let sh = -1; [B(4), B(6), B(8), B(9), B(10)].forEach(s0 => { const p = prog(t, s0 + .12, s0 + .62); if (p > 0 && p < 1) sh = p; });
  sheen.style.transform = `translate3d(${f(lerp(-1300, 1300, E.inOutSine(clamp(sh))))}px,0,${f(40)}px) rotateZ(14deg)`;
  op(sheen, sh >= 0 ? Math.sin(sh * Math.PI) : 0);

  /* ---- E: Portal + Fotos ---- */
  show(portalG, t > B(17.4) && t < B(20.8));
  portalG.style.transform = tf({ x: 0, y: LAND.y - 520, z: LAND.z - 300 });
  portal.style.transform = 'scale(1)';
  op(portalG, ease(t, B(17.6), B(18.8)) * (1 - ease(t, B(20.3), B(20.7))));
  show(photoG, t > B(17.5) && t < B(27.4));
  // Foto steht hinter dem Portal; in Region-Phase kippt es flach auf die Karte und schrumpft
  const toMap = ease(t, B(25), B(26.4), E.inOutQuint);
  const pz = lerp(LAND.z - 1980, 0, toMap), py = lerp(LAND.y - 520, MAPY - 2, toMap);
  const ps = lerp(1, .085, toMap);
  photoG.style.transform = `translate3d(0,${f(py)}px,${f(pz)}px) rotateX(${f(toMap * 90)}deg) scale(${f(ps)})`;
  op(photoG, ease(t, B(17.5), B(19)) * (1 - ease(t, B(26.6), B(27.3))));
  strips.forEach((s, i) => {
    const p = E.inOutQuint(prog(t, B(23) - .1 + i * .035, B(23) + .32 + i * .035));
    s.g.style.transform = `translate3d(${f(s.x)}px,0,1px) rotateY(${f(p * 180)}deg)`;
    s.sha.style.opacity = f(Math.sin(p * Math.PI) * .5); s.shb.style.opacity = f(Math.sin(p * Math.PI) * .5);
  });
  // Text im Foto
  const resIn = ease(t, B(20.6), B(21.2)), resOut = ease(t, B(24.7), B(25.3));
  show(resultG, t > B(20.5) && t < B(25.4));
  op(resultShade, resIn * (1 - resOut));
  [[R1, B(21)], [R2, B(22)], [R3, B(23)], [R4, B(24)]].forEach(([T, t0]) => { riseChars(T, t, t0, .5, .02); if (resOut > 0) sinkChars(T, t, B(24.8), .35, .008); });

  /* ---- F: Region ---- */
  show(mapG, t > B(25.4) && t < B(28.3));
  mapG.style.transform = tf({ y: MAPY - 3, rx: 0 });
  const mIn = ease(t, B(25.6), B(26.4), E.outExpo), mOut = ease(t, B(27), B(27.95), E.inExpo);
  towns.forEach((tw, i) => {
    const appear = ease(t, B(25.8) + i * .05, B(26.3) + i * .05, E.outBack);
    const k = 1 - mOut;
    tw.dot.style.transform = tf({ x: tw.x * k, z: tw.z * k, rx: 90, s: Math.max(.001, appear * (i ? 1 : 1 + mOut * .5)) });
    op(tw.dot, i ? 1 : 1 - ease(t, B(27.55), B(27.95)));
    const left = ['Solingen', 'Burscheid', 'Bergisch Gladbach', 'Köln'].includes(tw.n);
    tw.lab.style.textAlign = left ? 'right' : 'left';
    tw.lab.style.transform = tf({ x: tw.x * k + (left ? -760 : (i ? 760 : 800)), z: tw.z * k, y: -1, rx: 90 });
    op(tw.lab, appear * (1 - mOut * 1.6));
  });
  routes.forEach((r, i) => {
    const p = E.outExpo(prog(t, B(26) + i * .04, B(26.6) + i * .04)) * (1 - mOut);
    r.e.style.transform = `translate3d(${f(r.len / 2 * 0)}px,-1px,0) rotateX(90deg) rotateZ(${f(r.ang)}deg) scaleX(${f(Math.max(.001, p))})`;
    r.e.style.left = '0px';
  });
  mapRing.style.transform = tf({ y: -1, rx: 90, s: lerp(.2, 1.4, ease(t, B(25.8), B(27))) * (1 - mOut) + .001 });
  op(mapRing, mIn * (1 - ease(t, B(26.6), B(27.4))));
  mapRing2.style.transform = tf({ y: -1, rx: 90, s: lerp(.4, 1, ease(t, B(25.9), B(26.9))) * (1 - mOut) + .001 }); op(mapRing2, mIn * (1 - mOut));

  /* ---- G: Logo-Endtafel ---- */
  show(endG, t > B(27.6));
  const fl = prog(t, B(27.75), B(28.9));
  flare.style.transform = `scale(${f(.12 + E.outExpo(fl) * .6)})`; op(flare, Math.sin(clamp(fl * 1.4) * Math.PI) * .42);
  streak.style.transform = `scaleX(${f(.05 + E.outExpo(fl) * 1.2)}) scaleY(${f(1 + (1 - fl) * 2)})`; op(streak, Math.sin(clamp(fl * 1.3) * Math.PI) * .9);
  const parts = [B(28), B(28.5), B(29), B(29.5)];
  const fromY = [-170, 190, 190, 190];
  markParts.forEach((m, i) => {
    const p = E.outBack(prog(t, parts[i] - .02, parts[i] + .4), 1.7);
    m.style.transform = `translate3d(0,${f((1 - p) * fromY[i])}px,0) scale(${f(lerp(.55, 1, clamp(p * 1.3)))})`;
    op(m, clamp(prog(t, parts[i] - .02, parts[i] + .1)));
  });
  const wm = ease(t, B(29.8), B(31), E.inOutQuint);
  wordmark.style.clipPath = `inset(0 ${f(LKW - WM_W * wm)}px 0 0)`;
  wordmark.style.transform = `translate3d(${f((1 - wm) * -40)}px,0,0)`;
  endRule.style.transform = `scaleX(${f(Math.max(.001, ease(t, B(31.2), B(32.4), E.inOutExpo)))})`;
  riseChars(endSub, t, B(31.7), .5, .012, 1.1);
  riseChars(endTel, t, B(32.3), .65, .028, 1.1);
  [endWeb, endStars, endCTA].forEach((e, i) => { const p = ease(t, B(33.4) + i * .12, B(34.2) + i * .12, E.outExpo); e.style.transform = `translate3d(0,${f((1 - p) * 26)}px,0)`; op(e, p); });
  const shP = prog(t, B(36), B(38.2)); logoSheen.firstChild.style.transform = `translate3d(${f(lerp(-300, LKW + 100, E.inOutSine(shP)))}px,0,0) skewX(-18deg)`; op(logoSheen, shP > 0 && shP < 1 ? 1 : 0);
  const push = ease(t, B(28), DUR, E.out);
  endG.style.transform = `scale(${f(1.06 - push * .06)})`;

  /* ---- Staub ---- */
  const dOp = .5 * (1 - ease(t, B(19.6), B(20.4))) * ease(t, .3, 1.2) + .35 * ease(t, B(28.5), B(30));
  dust.forEach(d => {
    const px = (d.x + cam.ry * 14 * d.z + cam.tx * .05 * d.z + t * 12 * d.z) % 2000 - 40;
    const py = (d.y - t * 18 * d.z + cam.rx * 3 * d.z + 2000) % 1120 - 20;
    const sz = d.s * (1 + d.z);
    d.e.style.width = d.e.style.height = f(sz * 3) + 'px';
    d.e.style.transform = `translate3d(${f(px)}px,${f(py)}px,0)`;
    d.e.style.opacity = f(dOp * (.4 + .6 * (.5 + .5 * Math.sin(t * 1.3 + d.ph))));
  });

  /* ---- HUD ---- */
  let si = 0; SECTIONS.forEach((s, i) => { if (t >= s[0]) si = i; });
  if (hudNo.textContent !== SECTIONS[si][1]) { hudNo.textContent = SECTIONS[si][1]; hudName.textContent = SECTIONS[si][2]; }
  const hudIn = ease(t, .05, .5), hudOut = ease(t, B(27.4), B(28.2));
  op(hud, hudIn * (1 - hudOut));
  hudFill.style.width = f(420 * t / DUR) + 'px';
  hudMeter.textContent = 'Aufmaß ' + (Math.max(0, tl) / 333.33).toFixed(2).replace('.', ',') + ' m';
  op(hudMeter, 1 - ease(t, B(0), B(1)));

  /* ---- Hintergrund, Korn, Blende ---- */
  const amp = lerp(.32, .9, ease(t, B(27.5), B(29), E.inOut)) * (1 - ease(t, B(-10), B(-8)) * 0) * ease(t, 0, 1.2);
  drawBG(t, amp, Math.sin(t * .3) * .3, Math.cos(t * .23) * .2);
  drawGrain(t);
  op($('#fade'), 1 - ease(t, 0, .35));
}

/* ---------- Steuerung ---------- */
window.seek = function (t) { update(clamp(t, 0, DUR)); return true; };
window.ready = (async () => {
  await document.fonts.ready;
  const urls = [...new Set([...document.querySelectorAll('[style*="url("]')].flatMap(e => [...e.getAttribute('style').matchAll(/url\(["']?([^"')]+)["']?\)/g)].map(m => m[1])))];
  await Promise.all(urls.map(u => new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = u; })));
  seek(0);
  return urls.length;
})();

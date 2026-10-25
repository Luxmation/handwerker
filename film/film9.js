/* Handwerker Blesius – Imagefilm 30 s · Hochformat 9:16 · mit Sprecher.
   One-Take (keine Schnitte): nur Kamerafahrt + Verwandlungen. Reine Funktion der Zeit: window.seek(t).
   Welt: CSS-3D, y nach unten (Boden y=0, oben = negativ). Kamera: Orbit um Ziel (tx,ty,tz), Abstand dist,
   Neigung rx (+ = nach unten schauen), Drehung ry (+ = nach links), Rollen rz.
   Musik: „A Sound Foundation“ (Airae), 30-s-Edit, 134,2 BPM – Schlag n bei T(n) = n · 0,4473 s.
   Drop T(16) = 7,16 s · Steigerung T(36) = 16,10 s · Schlussakzent T(52) = 23,26 s · Ausklang bis 30 s.
   Sprecher: Wortzeiten aus vo.js (window.VO, erzeugt von vo_place.py). Ohne vo.js gilt VO_PLAN.      */
'use strict';
const W = 1080, H = 1920, P = 1400, DUR = 30;
const Q = 0.4473, T = n => n * Q;
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
};
const ease = (t, a, b, e = E.inOut) => e(prog(t, a, b));
function rand(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

/* ---------- Sprecher-Timing ---------- */
const VO_PLAN = { // [Start, Ende, Text] – nur Ersatz, solange vo.js fehlt
  v1: [0.55, 3.15, 'Jeder Boden beginnt mit einem genauen Aufmaß.'],
  v2: [3.55, 6.70, 'Denn ein Boden ist nur so gut wie das, worauf er liegt.'],
  v3: [7.40, 11.90, 'Parkett. Vinyl. Laminat. Teppich. Und Treppen.'],
  v4: [12.50, 15.30, 'Verlegt mit der Sorgfalt einer Schreinerei.'],
  v5: [16.90, 19.60, 'Beratung, Verkauf und Verlegung – aus einer Hand.'],
  v6: [20.00, 22.10, 'Im Bergischen Land, in Köln und Umgebung.'],
  v7: [23.45, 26.40, 'Handwerker Blesius. Ihr Bodenleger in Wermelskirchen.'],
  v8: [27.00, 28.50, 'Jetzt unverbindlich anfragen.'],
};
const V = {};
Object.keys(VO_PLAN).forEach(id => {
  const src = window.VO && window.VO[id];
  if (src) { V[id] = src; return; }
  const [a, b, txt] = VO_PLAN[id];
  const ws = txt.split(/\s+/).filter(w => /[A-Za-zÄÖÜäöüß]/.test(w));
  const d = (b - a) / ws.length;
  V[id] = { t0: a, t1: b, words: ws.map((w, i) => ({ w, t0: a + i * d, t1: a + (i + .85) * d })) };
});
const wt = (id, k) => V[id].words[Math.max(0, Math.min(k, V[id].words.length - 1))].t0;
const we = (id, k) => V[id].words[Math.max(0, Math.min(k, V[id].words.length - 1))].t1;

/* ---------- DOM-Helfer ---------- */
function mk(parent, cls, css, html) { const d = document.createElement('div'); if (cls) d.className = cls; if (css) d.style.cssText = css; if (html != null) d.innerHTML = html; parent.appendChild(d); return d; }
const f = v => (Math.abs(v) < 1e-4 ? 0 : v).toFixed(3);
function tf(o) { // Transform-String aus {x,y,z,rx,ry,rz,s}
  let s = `translate3d(${f(o.x || 0)}px,${f(o.y || 0)}px,${f(o.z || 0)}px)`;
  if (o.ry) s += ` rotateY(${f(o.ry)}deg)`;
  if (o.rx) s += ` rotateX(${f(o.rx)}deg)`;
  if (o.rz) s += ` rotateZ(${f(o.rz)}deg)`;
  if (o.s != null && o.s !== 1) s += ` scale(${f(o.s)})`;
  return s;
}
function plane(parent, w, h, css, html) { return mk(parent, 'o', `width:${w}px;height:${h}px;margin:${-h / 2}px 0 0 ${-w / 2}px;${css || ''}`, html); }
function group(parent) { return mk(parent || world, 'o', ''); }
function show(el, on) { const v = on ? '' : 'none'; if (el.style.display !== v) el.style.display = v; }
function op(el, v) { el.style.opacity = f(clamp(v)); }

/* Quader mit 6 Flächen; Schattierung je Fläche */
function box(parent, w, h, d, mat, light = {}) {
  const g = group(parent);
  const faces = {};
  const L_ = Object.assign({ top: 1, bottom: .35, front: .78, back: .5, right: .62, left: .7 }, light);
  const add = (k, W_, H_, t, bg) => {
    const e = mk(g, 'o face', `width:${W_}px;height:${H_}px;margin:${-H_ / 2}px 0 0 ${-W_ / 2}px;transform:${t};${bg}`);
    const sh = mk(e, 'shade', `opacity:${1 - L_[k]}`);
    faces[k] = { e, sh };
  };
  add('top', w, d, `translateY(${-h / 2}px) rotateX(90deg)`, mat.top);
  add('bottom', w, d, `translateY(${h / 2}px) rotateX(-90deg)`, mat.bottom || mat.top);
  add('front', w, h, `translateZ(${d / 2}px)`, mat.front || mat.side);
  add('back', w, h, `translateZ(${-d / 2}px) rotateY(180deg)`, mat.side);
  add('right', d, h, `translateX(${w / 2}px) rotateY(90deg)`, mat.side);
  add('left', d, h, `translateX(${-w / 2}px) rotateY(-90deg)`, mat.side);
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
function riseChars(T_, t, t0, dur = .55, stagger = .022, from = 1.08, e = E.outExpo) {
  T_.chars.forEach((c, i) => {
    const p = e(prog(t, t0 + i * stagger, t0 + i * stagger + dur));
    c.s.style.transform = `translate3d(0,${f((1 - p) * from)}em,0)`;
  });
}

/* Untertitel-Block: jedes Wort steigt genau dann aus seiner Maske, wenn der Sprecher es sagt.
   lines = Zeilen aus Tokens ('Wort' | {t, em, skip}); Tokens entsprechen den Sprecher-Wörtern in Reihenfolge,
   skip:true = Satzzeichen ohne eigenes Wort (erscheint mit dem vorigen Wort). */
function caption(parent, id, lines, css, k0 = 0, cls = 'disp cap') {
  const el = mk(parent, cls, css || '');
  const words = []; let k = k0, g = 0;
  lines.forEach(ln => {
    const line = mk(el, 'line', '');
    ln.forEach((tok, j) => {
      const o = typeof tok === 'string' ? { t: tok } : tok;
      if (j) line.appendChild(document.createTextNode(' '));
      let host = line;
      if (o.em) { host = document.createElement('em'); line.appendChild(host); }
      const ws = document.createElement('span'); ws.className = 'w'; host.appendChild(ws);
      const chars = [...o.t].map(c => { const s = document.createElement('span'); s.className = 'ch'; s.textContent = c; ws.appendChild(s); return { s, g: g++ }; });
      words.push({ chars, k: o.skip ? Math.max(0, k - 1) : k });
      if (!o.skip) k++;
    });
  });
  return { el, words, id };
}
function capUpdate(C, t, tOut, o = {}) {
  const lead = o.lead ?? .06, dur = o.dur ?? .5, st = o.st ?? .016;
  const on = t > wt(C.id, C.words[0].k) - lead - .02 && (tOut == null || t < tOut + .8);
  show(C.el, on); if (!on) return;
  C.words.forEach(w => {
    const t0 = wt(C.id, w.k) - lead;
    w.chars.forEach((c, i) => {
      const p = E.outExpo(prog(t, t0 + i * st, t0 + i * st + dur));
      let y = (1 - p) * 1.1;
      if (tOut != null) y -= E.inExpo(prog(t, tOut + c.g * .005, tOut + c.g * .005 + .34)) * 1.1;
      c.s.style.transform = `translate3d(0,${f(y)}em,0)`;
    });
  });
}
function fitBlock(el, maxW) { // Schriftgröße so verkleinern, dass die breiteste Zeile passt
  const fs = parseFloat(getComputedStyle(el).fontSize), w = el.offsetWidth;
  if (w > maxW) el.style.fontSize = (fs * maxW / w).toFixed(1) + 'px';
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
const CH = ['tx', 'ty', 'tz', 'dist', 'rx', 'ry', 'rz'];
let KEYS = [];
function camAt(t) {
  const K = KEYS;
  if (t <= K[0].t) return Object.assign({}, K[0]);
  if (t >= K[K.length - 1].t) return Object.assign({}, K[K.length - 1]);
  let i = 0; while (i < K.length - 2 && t > K[i + 1].t) i++;
  const a = K[i], b = K[i + 1], dt = b.t - a.t;
  const s = (t - a.t) / dt;
  const h00 = 2 * s ** 3 - 3 * s ** 2 + 1, h10 = s ** 3 - 2 * s ** 2 + s, h01 = -2 * s ** 3 + 3 * s ** 2, h11 = s ** 3 - s ** 2;
  const tan = (j, c) => {
    const k = K[j]; if (k.stop) return 0;
    const p = K[Math.max(0, j - 1)], n = K[Math.min(K.length - 1, j + 1)];
    if (p === n) return 0;
    return (n[c] - p[c]) / (n.t - p.t);
  };
  const o = {};
  CH.forEach(c => { o[c] = h00 * a[c] + h10 * dt * tan(i, c) + h01 * b[c] + h11 * dt * tan(i + 1, c); });
  return o;
}
function look(t, C, Tg, rz = 0, extra = {}) {
  const d = [Tg[0] - C[0], Tg[1] - C[1], Tg[2] - C[2]], dist = Math.hypot(...d);
  const rx = Math.asin(d[1] / dist) / D2R, ry = Math.atan2(-d[0], -d[2]) / D2R;
  return Object.assign({ t, tx: Tg[0], ty: Tg[1], tz: Tg[2], dist, rx, ry, rz }, extra);
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
 col=mix(BG,col,uAmp); col*=1.0-0.45*smoothstep(0.55,1.45,length(uv*vec2(1.0,0.62)));
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
  gl.uniform2f(uRes, bg.width, bg.height); gl.uniform1f(uTime, 6 + t * 0.5); gl.uniform2f(uMouse, mx, my); gl.uniform1f(uAmp, amp);
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
const CAPX = 72, CAPY = 300, CAPW = W - 2 * CAPX; // Untertitel-Bereich (Safe Zone für Reels/Shorts)

/* --- Boden-Raster (Bauplan) --- */
const ground = plane(world, 6000, 6000, `background:
  linear-gradient(rgba(242,129,53,.07) 2px,transparent 2px) 0 0/111.1px 111.1px,
  linear-gradient(90deg,rgba(242,129,53,.07) 2px,transparent 2px) 0 0/111.1px 111.1px;
  -webkit-mask-image:radial-gradient(closest-side,#000 0%,rgba(0,0,0,.6) 45%,transparent 100%);`);
ground.style.transform = tf({ rx: 90 });

/* --- A: Maßband (läuft im Hochformat von unten nach oben) --- */
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
  '<div style="position:absolute;inset:38px;border-radius:50%;border:10px solid #F28135;box-shadow:inset 0 0 0 8px #2b2826"></div><div style="position:absolute;left:50%;top:50%;width:44px;height:44px;margin:-22px;border-radius:50%;background:#14110f"></div><div class="mono" style="position:absolute;left:0;right:0;bottom:12px;text-align:center;font-size:15px;color:rgba(237,232,225,.7)">5 m</div>');
tapeCase.style.transform = tf({ x: TAPE.x0 - 134, z: TAPE.z - 66, y: -3, rx: 90, rz: 90 });
const tapeShadow = plane(tapeG, TAPE.len, 50, 'background:rgba(0,0,0,.55);filter:blur(10px);');
tapeShadow.style.transform = tf({ x: TAPE.x0 + TAPE.len / 2, z: TAPE.z + 16, y: 1, rx: 90 });

/* Kreidelinien (Raum-Umriss) + Maßangaben */
const chalk = group();
const CL = [ // Kanten: Maßband-Seite (z+), Stirnseite (x+), Rückseite (z-), Stirnseite (x-)
  { x: 0, z: ROOM.d / 2, len: ROOM.w, rot: 0 },
  { x: ROOM.w / 2, z: 0, len: ROOM.d, rot: 90 },
  { x: 0, z: -ROOM.d / 2, len: ROOM.w, rot: 0 },
  { x: -ROOM.w / 2, z: 0, len: ROOM.d, rot: 90 },
].map(c => { const e = plane(chalk, c.len + 8, 6, 'background:#F28135;box-shadow:0 0 18px rgba(242,129,53,.55);transform-origin:50% 50%;'); return Object.assign(c, { e }); });
const dimLong = plane(chalk, 400, 44, 'font:500 30px/44px "DM Mono";letter-spacing:.14em;color:#F7A26C;text-align:center;', '4,80 M');
const dimShort = plane(chalk, 400, 44, 'font:500 30px/44px "DM Mono";letter-spacing:.14em;color:#F7A26C;text-align:center;', '3,00 M');
const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sz]) => {
  const e = plane(chalk, 60, 60, `border-${sz < 0 ? 'top' : 'bottom'}:4px solid #EDE8E1;border-${sx < 0 ? 'left' : 'right'}:4px solid #EDE8E1;`);
  e.style.transform = tf({ x: sx * (ROOM.w / 2 + 34), z: sz * (ROOM.d / 2 + 34), y: -1, rx: 90 });
  return e;
});

/* --- B: Schichtaufbau --- */
const stackG = group();
const matEst = { top: `background:url(${TEX}estrich.jpg) center/900px auto,#777;`, side: 'background:linear-gradient(#8d8a85,#6d6a66);' };
const matSpa = { top: `background:url(${TEX}spachtel.jpg) center/1100px auto,#bbb;`, side: 'background:linear-gradient(#cfcbc4,#a9a49c);' };
const matTri = { top: 'background:radial-gradient(circle,rgba(20,14,10,.55) 1.8px,transparent 2.3px) 0 0/16px 16px,linear-gradient(135deg,#8f4a22,#6e3719);', side: 'background:repeating-linear-gradient(90deg,#8a4520 0 6px,#5e2f15 6px 9px);' };
const LIGHT_B = { left: .82, front: .66, back: .45, right: .55 };   // Licht passend zur Hochformat-Ansicht (Kamera bei -x)
const est = box(stackG, ROOM.w, L.estrich, ROOM.d, matEst, LIGHT_B);
const spa = box(stackG, ROOM.w, L.spachtel, ROOM.d, matSpa, LIGHT_B);
const tri = box(stackG, ROOM.w, L.tritt, ROOM.d, matTri, LIGHT_B);
const stackShadow = plane(stackG, ROOM.w + 300, ROOM.d + 300, 'background:radial-gradient(closest-side,rgba(0,0,0,.75),transparent);');
stackShadow.style.transform = tf({ y: -0.5, rx: 90, x: 120, z: -60 });

/* Dielen: je 2 Seiten (oben/unten) mit wechselnden Materialien */
const MATS = [
  { name: 'Parkett', tex: 'oak.jpg' },
  { name: 'Vinyl', tex: 'vinyl.jpg' },
  { name: 'Laminat', tex: 'laminat.jpg' },
  { name: 'Teppich', tex: 'teppich.jpg' },
  { name: 'Treppen', tex: 'oak.jpg' },
];
const texCSS = (m, i) => m.tex === 'teppich.jpg'
  ? `background:url(${TEX}teppich.jpg) ${-((i * 37) % 60)}px ${-((i * 97) % 900)}px/1660px auto;`
  : `background:url(${TEX}${m.tex}) ${-((i * 311) % 780)}px ${-((i % 8) * 153.6 + 30)}px/2400px 1228.8px;`;
const planks = [];
for (let i = 0; i < NP; i++) {
  const b = box(stackG, ROOM.w - 6, L.belag, PW - 6, { top: texCSS(MATS[0], i), bottom: texCSS(MATS[1], i), side: 'background:linear-gradient(#7a5434,#5a3c24);' });
  b.faces.top.e.style.boxShadow = 'inset 0 2px 0 rgba(255,235,210,.25),inset 0 -2px 0 rgba(0,0,0,.35)';
  b.faces.bottom.e.style.boxShadow = 'inset 0 2px 0 rgba(255,235,210,.25),inset 0 -2px 0 rgba(0,0,0,.35)';
  planks.push({ b, i, z: -ROOM.d / 2 + PW / 2 + i * PW, mat: [-1, -1] });
}
/* Setzstufen (Treppe) – wachsen aus den Dielen; Wörter = Sprecher-Satz 4 */
const risers = [];
const RISER_WORDS = ['', '', '', '', '', [{ t: 'Schreinerei.', em: true }], 'einer', 'Sorgfalt', 'mit der', 'Verlegt']; // Index = Stufe s (9 = oben)
const RISER_K = { 9: 0, 8: 1, 7: 3, 6: 4, 5: 5 };   // Stufe s -> Wortindex in Satz v4 (Kamera steigt Wort für Wort ab)
for (let i = 0; i < NP; i++) {
  const e = plane(stackG, ROOM.w - 6, RISER, 'background:linear-gradient(180deg,#1f1a16,#15110e);overflow:hidden;transform-origin:50% 0;');
  let T_ = null;
  const w = RISER_WORDS[i];
  if (w) T_ = text(e, [w], 'font-size:96px;color:#EDE8E1;position:absolute;left:0;right:0;top:16px;text-align:center;');
  mk(e, 'mono', 'position:absolute;left:28px;bottom:10px;font-size:14px;color:rgba(237,232,225,.45);', `Stufe ${String(i).padStart(2, '0')}`);
  risers.push({ e, T: T_ });
}

/* Beschriftungen der Schichten (2D, folgen 3D-Punkten) */
const callouts = ['Estrich', 'Spachtelmasse', 'Trittschalldämmung'].map((n, i) => {
  const e = mk(over, 'mono', `position:absolute;left:0;top:0;font-size:24px;color:#EDE8E1;padding:10px 14px;background:rgba(13,11,10,.78);border:1px solid rgba(242,129,53,.6);`, `<span style="color:#F28135">0${i + 1}</span>&nbsp;&nbsp;${n}`);
  const ln = document.createElementNS('http://www.w3.org/2000/svg', 'path'); ln.setAttribute('stroke', '#F28135'); ln.setAttribute('stroke-width', '2.5'); ln.setAttribute('fill', 'none'); svg.appendChild(ln);
  const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); dot.setAttribute('r', '6'); dot.setAttribute('fill', '#F28135'); svg.appendChild(dot);
  return { e, ln, dot };
});

/* --- C: Material-Wort (schwebt über den Dielen, im Hochformat lesbar gedreht) --- */
const wordG = group();
const sheen = plane(wordG, 760, 1500, 'background:linear-gradient(90deg,transparent,rgba(255,240,220,.16) 45%,rgba(255,250,240,.26) 50%,rgba(255,240,220,.16) 55%,transparent);');
const dimmer = plane(wordG, 1100, 1300, 'background:radial-gradient(closest-side,rgba(10,8,7,.62),rgba(10,8,7,.2) 70%,transparent);');
const REEL_H = 190;
const reelWin = mk(wordG, 'o flat', `width:820px;height:${REEL_H}px;margin:${-REEL_H / 2}px 0 0 -410px;overflow:hidden;`);
const reel = mk(reelWin, '', 'position:absolute;left:0;top:0;width:100%;');
MATS.forEach(m => mk(reel, 'disp', `height:${REEL_H}px;font-size:190px;line-height:${REEL_H}px;text-align:center;color:#EDE8E1;text-shadow:0 10px 50px rgba(0,0,0,.65),0 2px 6px rgba(0,0,0,.5);`, m.name));
const idxWin = mk(wordG, 'o flat', `width:820px;height:40px;margin:${REEL_H / 2 + 22}px 0 0 -410px;overflow:hidden;`);
const idxReel = mk(idxWin, '', 'position:absolute;left:0;top:0;width:100%;');
MATS.forEach((m, i) => mk(idxReel, 'mono', 'height:40px;line-height:40px;font-size:24px;text-align:center;color:#F7A26C;text-shadow:0 2px 14px rgba(0,0,0,.8);', `0${i + 1} / 05`));

/* --- E: Portal (Haus-Silhouette, Hochformat) + Fotos --- */
const LAND = { y: Y_TOP - (NP - 1) * RISER, z: -ROOM.d / 2 + PW / 2 };   // oberste Stufe
const PORTAL = { w: 1000, h: 1500, z: LAND.z - 300 };
const PH = { y: LAND.y - PORTAL.h / 2, z: PORTAL.z - 2300, w: 1350, h: 2400 };
const portalG = group();
const portalSVG = `<svg viewBox="0 0 1000 1500" width="1000" height="1500" style="overflow:visible"><path d="M60 1490 V560 L500 60 L940 560 V1490" fill="none" stroke="#F28135" stroke-width="16" stroke-linejoin="miter"/><path d="M215 384 V170 H300 V287" fill="none" stroke="#F28135" stroke-width="16"/><path d="M150 1490 V600 L500 202 L850 600 V1490" fill="none" stroke="rgba(237,232,225,.35)" stroke-width="3"/></svg>`;
const portal = plane(portalG, PORTAL.w, PORTAL.h, '', portalSVG);
const photoG = group();
const PHA = { url: `${IMG}langer-raum-1600.jpg`, w: 1279, h: 1800, px: .5 };     // vorher
const PHB = { url: `${IMG}wohnzimmer-eiche-1600.jpg`, w: 1500, h: 1800, px: .5 }; // nachher (Wende-Wischer)
const coverW = im => im.w * PH.h / im.h, cropX = im => (coverW(im) - PH.w) * im.px;
const strips = [];
const NS = 6;
for (let i = 0; i < NS; i++) {
  const sw = PH.w / NS;
  const g = group(photoG);
  const a = mk(g, 'o face', `width:${sw + 1}px;height:${PH.h}px;margin:${-PH.h / 2}px 0 0 ${-sw / 2}px;background:url(${PHA.url}) ${f(-(cropX(PHA) + i * sw))}px 0/${f(coverW(PHA))}px ${PH.h}px;`);
  const b2 = mk(g, 'o face', `width:${sw + 1}px;height:${PH.h}px;margin:${-PH.h / 2}px 0 0 ${-sw / 2}px;transform:rotateY(180deg);background:url(${PHB.url}) ${f(-(cropX(PHB) + i * sw))}px 0/${f(coverW(PHB))}px ${PH.h}px;`);
  const sha = mk(a, 'shade', 'opacity:0'), shb = mk(b2, 'shade', 'opacity:0');
  strips.push({ g, a, b: b2, sha, shb, x: -PH.w / 2 + sw / 2 + i * sw });
}

/* --- F: Region (Karte, Norden oben) --- */
const TOWNS = [
  ['Wermelskirchen', 51.139, 7.216, 'r'], ['Remscheid', 51.179, 7.189, 'r'], ['Solingen', 51.171, 7.084, 'l'], ['Wuppertal', 51.256, 7.150, 'r'],
  ['Burscheid', 51.087, 7.123, 'l'], ['Bergisch Gladbach', 50.992, 7.136, 'r'], ['Köln', 50.938, 6.960, 'r'],
];
const KM = 52;
const mapG = group();
const MAPY = 0;
const towns = TOWNS.map(([n, la, lo, side], i) => {
  const x = (lo - 7.216) * Math.cos(51.1 * D2R) * 111.32 * KM, z = -(la - 51.139) * 111.32 * KM;
  const dot = plane(mapG, i ? 60 : 104, i ? 60 : 104, `border-radius:50%;background:${i ? '#EDE8E1' : '#F28135'};box-shadow:0 0 ${i ? 30 : 90}px ${i ? 'rgba(237,232,225,.6)' : 'rgba(242,129,53,.95)'};`);
  const lab = plane(mapG, 1400, 110, `font:500 ${i ? 74 : 84}px/110px "DM Mono";letter-spacing:.08em;text-transform:uppercase;color:${i ? '#EDE8E1' : '#F7A26C'};text-align:${side === 'l' ? 'right' : 'left'};white-space:nowrap;text-shadow:0 4px 30px rgba(0,0,0,.85);`, n);
  return { n, x, z, dot, lab, side };
});
const routes = towns.slice(1).map(tw => {
  const len = Math.hypot(tw.x, tw.z), ang = Math.atan2(tw.z, tw.x) / D2R;
  const e = plane(mapG, len, 10, 'background:linear-gradient(90deg,#F28135,rgba(242,129,53,.4));transform-origin:0 50%;box-shadow:0 0 24px rgba(242,129,53,.5);');
  return { tw, len, ang, e };
});
const mapRing = plane(mapG, 2600, 2600, 'border-radius:50%;border:6px solid rgba(242,129,53,.35);');
const mapRing2 = plane(mapG, 1300, 1300, 'border-radius:50%;border:4px dashed rgba(237,232,225,.22);');

/* --- Untertitel (2D, Safe Zone oben links) --- */
const capCSS = s => `left:${CAPX}px;top:${CAPY}px;font-size:${s}px;`;
const C1 = caption(over, 'v1', [['Jeder', 'Boden'], ['beginnt', 'mit'], ['einem', 'genauen'], [{ t: 'Aufmaß.', em: true }]], capCSS(132));
const C2 = caption(over, 'v2', [['Denn', 'ein', 'Boden'], ['ist', 'nur', 'so', 'gut'], ['wie', 'das,'], [{ t: 'worauf', em: true }, { t: 'er', em: true }, { t: 'liegt.', em: true }]], capCSS(132));
const resultShade = mk(over, '', 'position:absolute;left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,rgba(10,8,7,.86) 0%,rgba(10,8,7,.62) 30%,rgba(10,8,7,.0) 55%);');
const C5 = caption(over, 'v5', [['Beratung,'], ['Verkauf', 'und'], ['Verlegung', { t: '–', skip: true }], [{ t: 'aus', em: true }, { t: 'einer', em: true }, { t: 'Hand.', em: true }]], capCSS(150));
const mapShade = mk(over, '', 'position:absolute;left:0;top:0;width:1080px;height:1920px;background:linear-gradient(180deg,rgba(10,8,7,.8) 0%,rgba(10,8,7,.5) 24%,rgba(10,8,7,0) 42%);');
const C6 = caption(over, 'v6', [['Im', 'Bergischen', 'Land,'], ['in', 'Köln', 'und'], [{ t: 'Umgebung.', em: true }]], capCSS(124));

/* --- G: Logo-Endtafel (Bildschirmebene, Hochformat, gestapelt) --- */
const endG = mk(over, '', 'position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:50% 45%;');
const LKk = 1.0, LKW = 900 * LKk, LKH = 254 * LKk, LKX = (W - LKW) / 2, LKY = 560;
const wordmark = mk(endG, '', `position:absolute;left:${LKX}px;top:${LKY}px;width:${LKW}px;height:${LKH}px;background:url(${BR}logo-light.png) 0 0/${LKW}px ${LKH}px no-repeat;`);
const WM_W = 560 * LKk;
const MARKX = LKX + 565 * LKk, MARKW = 335 * LKk;
const markParts = ['roof', 'orange', 'graphite', 'house'].map(n => mk(endG, '', `position:absolute;left:${MARKX}px;top:${LKY}px;width:${MARKW}px;height:${LKH}px;background:url(${BR}mark-${n}.png) center/contain no-repeat;transform-origin:50% 100%;`));
const flare = mk(endG, '', `position:absolute;left:540px;top:${LKY + LKH / 2}px;width:620px;height:620px;margin:-310px 0 0 -310px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,236,214,.9),rgba(242,129,53,.45) 30%,rgba(242,129,53,0) 72%);`);
const streak = mk(endG, '', `position:absolute;left:0;top:${LKY + LKH / 2 - 2}px;width:1080px;height:4px;background:linear-gradient(90deg,transparent,rgba(255,226,196,.95) 50%,transparent);box-shadow:0 0 30px rgba(242,129,53,.8);`);
const logoSheen = mk(endG, '', `position:absolute;left:${LKX}px;top:${LKY}px;width:${LKW}px;height:${LKH}px;overflow:hidden;-webkit-mask:url(${BR}logo-light.png) 0 0/${LKW}px ${LKH}px no-repeat;mask:url(${BR}logo-light.png) 0 0/${LKW}px ${LKH}px no-repeat;`, '<i style="position:absolute;top:-20%;left:0;width:200px;height:140%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.85),transparent);transform:skewX(-18deg)"></i>');
const ENDY = LKY + LKH;
const endRule = mk(endG, '', `position:absolute;left:${LKX}px;top:${ENDY + 50}px;height:4px;width:${LKW}px;background:#F28135;transform-origin:50% 50%;box-shadow:0 0 22px rgba(242,129,53,.6);`);
const endSub = caption(endG, 'v7', [['Bodenleger', 'in', 'Wermelskirchen']], `position:absolute;left:0;width:${W}px;text-align:center;top:${ENDY + 90}px;font-size:36px;color:#F7A26C;text-shadow:none;`, 3, 'mono cap');
const endTel = text(endG, ['0159 0171 7249'], `position:absolute;left:0;width:${W}px;text-align:center;top:${ENDY + 172}px;font-size:150px;color:#EDE8E1;`);
const endStars = mk(endG, '', `position:absolute;left:0;width:${W}px;top:${ENDY + 350}px;display:flex;justify-content:center;align-items:center;gap:16px;font:500 36px/1 Archivo;color:#EDE8E1;`,
  `<span style="display:flex;gap:6px">${'<svg width="36" height="36" viewBox="0 0 24 24"><path fill="#F28135" d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.8Z"/></svg>'.repeat(5)}</span><span><b style="font-weight:800">5,0</b> bei Google</span>`);
const endWeb = mk(endG, 'mono', `position:absolute;left:0;width:${W}px;top:${ENDY + 420}px;text-align:center;font-size:34px;color:#D5CEC3;letter-spacing:.1em;text-transform:none;`, 'handwerker-blesius.de');
const endCTA = mk(endG, '', `position:absolute;left:${(W - 760) / 2}px;width:760px;top:${ENDY + 500}px;height:96px;background:#F28135;color:#140f0b;display:flex;align-items:center;justify-content:center;overflow:hidden;`);
const ctaText = caption(endCTA, 'v8', [['Jetzt', 'unverbindlich', 'anfragen']], 'position:relative;font:700 38px/1 Archivo;font-stretch:85%;letter-spacing:.08em;color:#140f0b;text-shadow:none;');
const ctaGlint = mk(endCTA, '', 'position:absolute;top:-20%;left:0;width:140px;height:140%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent);transform:skewX(-18deg);');

/* --- Staub im Licht --- */
const dustG = mk(over, '', 'position:absolute;inset:0;');
const dr = rand(77);
const dust = Array.from({ length: 44 }, () => ({ x: dr() * W, y: dr() * H, z: .3 + dr() * .9, s: 2 + dr() * 5, ph: dr() * 6.28,
  e: mk(dustG, '', 'position:absolute;left:0;top:0;border-radius:50%;background:radial-gradient(circle,rgba(255,226,190,.9),rgba(255,200,150,0) 70%);') }));

/* --- HUD --- */
const HI = 44;
const hudCorners = [[0, 0], [1, 0], [0, 1], [1, 1]].map(([sx, sy]) => mk(hud, '', `position:absolute;${sx ? 'right' : 'left'}:${HI}px;${sy ? 'bottom' : 'top'}:${HI}px;width:30px;height:30px;border-${sy ? 'bottom' : 'top'}:2px solid rgba(237,232,225,.7);border-${sx ? 'right' : 'left'}:2px solid rgba(237,232,225,.7);`));
const hudLabel = mk(hud, 'mono', `position:absolute;left:${HI + 50}px;top:${HI + 6}px;font-size:19px;color:#EDE8E1;display:flex;align-items:center;gap:16px;`, '<span class="hl-no" style="color:#F28135"></span><span class="hl-name"></span><i style="display:block;width:80px;height:1px;background:rgba(237,232,225,.35)"></i>');
const hudNo = hudLabel.querySelector('.hl-no'), hudName = hudLabel.querySelector('.hl-name');
const hudBL = mk(hud, 'mono', `position:absolute;left:${HI + 50}px;bottom:${HI + 4}px;font-size:16px;color:rgba(237,232,225,.62);`, '<span style="color:#F28135">●</span>&nbsp; 51.139° N · 7.216° E');
const hudRuler = mk(hud, '', `position:absolute;right:${HI + 50}px;bottom:${HI + 8}px;width:260px;height:16px;`);
hudRuler.innerHTML = Array.from({ length: 27 }, (_, i) => `<i style="position:absolute;left:${i * 10}px;bottom:0;width:1px;height:${i % 10 === 0 ? 16 : i % 5 === 0 ? 11 : 6}px;background:rgba(237,232,225,.5)"></i>`).join('') + '<b class="rf" style="position:absolute;left:0;bottom:0;height:2px;width:0;background:#F28135;box-shadow:0 0 10px rgba(242,129,53,.8)"></b>';
const hudFill = hudRuler.querySelector('.rf');
const hudMeter = mk(hud, 'mono', `position:absolute;right:${HI + 50}px;bottom:${HI + 34}px;font-size:16px;color:rgba(237,232,225,.62);`, '');
const SECTIONS = [
  [0, 'Schicht 01', 'Aufmaß'], [T(8), 'Schicht 02', 'Untergrund'], [T(16), 'Schicht 03', 'Verlegung'], [T(26), 'Schicht 04', 'Handwerk'],
  [T(36), 'Schicht 05', 'Oberfläche'], [T(45), 'Schicht 06', 'Region'],
];

/* =====================================================================================
   ZEITPLAN (aus Musik + Sprecher)
   ===================================================================================== */
const S = {};
S.tapeOut = [T(1), T(4)];
S.chalk = T(4);
S.est = T(8); S.spa = T(10); S.tri = T(12);
S.drop = T(16);
S.flips = [1, 2, 3, 4].map(k => wt('v3', k) - .1);         // Vinyl, Laminat, Teppich, (Und) Treppen
S.stairs = Math.max(we('v3', 5) - .05, S.flips[3] + .55);   // Dielen werden zur Treppe
S.climb0 = Math.max(S.stairs + 1.0, wt('v4', 0) - .2);
S.steps = [0, 1, 3, 4, 5].map(k => wt('v4', k));            // Kamera steigt eine Stufe je Wort
S.hold = Math.max(T(36), we('v4', 5) + .9);                 // Totale auf den ganzen Satz, dann Kran
S.crane = S.hold + .9; S.portal = S.crane + .75;            // schneller Kran (Musik-Steigerung T(36)), dann durchs Portal
S.flip = wt('v5', 4) - .12;                                 // Foto-Wende bei „aus einer Hand“
S.toMap = Math.max(we('v5', 6) + .55, wt('v6', 0) - .7);
S.mapIn = S.toMap + .6;
S.end = T(50);                                              // Logo baut sich auf, Schlussakzent T(52)

/* =====================================================================================
   KAMERA-FAHRT
   ===================================================================================== */
const MAPC = { x: -280, z: 170 };
KEYS = [
  { t: 0.00, tx: -720, ty: 0, tz: 420, dist: 700, rx: 90, ry: -93, rz: 0 },
  { t: T(1), tx: -660, ty: 0, tz: 400, dist: 720, rx: 90, ry: -92, rz: 0 },
  { t: T(4), tx: 380, ty: 0, tz: 350, dist: 900, rx: 90, ry: -91, rz: 0 },
  { t: T(6.6), tx: 370, ty: 0, tz: 20, dist: 2150, rx: 90, ry: -90, rz: 0 },
  { t: T(9), tx: 160, ty: -60, tz: 20, dist: 2300, rx: 68, ry: -80, rz: 0 },
  { t: T(11), tx: 20, ty: -200, tz: 0, dist: 2500, rx: 46, ry: -64, rz: 0 },
  { t: T(14.8), tx: -120, ty: -250, tz: 0, dist: 2420, rx: 40, ry: -58, rz: 0 },
  { t: T(15.8), tx: 0, ty: Y_TOP, tz: 0, dist: 1750, rx: 68, ry: -78, rz: 0 },
  { t: T(16.7), tx: 0, ty: Y_TOP, tz: 0, dist: 1230, rx: 90, ry: -90, rz: 0 },
  { t: T(21), tx: 40, ty: Y_TOP, tz: 0, dist: 1170, rx: 90, ry: -88, rz: 0 },
  { t: S.stairs - .2, tx: 0, ty: Y_TOP, tz: 20, dist: 1190, rx: 90, ry: -90, rz: 0 },
  { t: S.stairs + .55, tx: 0, ty: -820, tz: -120, dist: 1750, rx: 46, ry: -14, rz: 0 },
  { t: S.climb0, tx: 0, ty: Y_TOP - 8.5 * RISER - 10, tz: -400, dist: 980, rx: 16, ry: 20, rz: 0 },
  // Totale auf „Verlegt mit der Sorgfalt einer Schreinerei.“ (identisch mit Treppen-Kamera, Mitte Stufe 7)
  { t: S.hold, tx: 0, ty: Y_TOP - 6.5 * RISER - 10, tz: -200, dist: 1180, rx: 16, ry: 20, rz: 0, stop: true },
  // Kran hoch: Haus-Portal auf dem Podest
  look(S.crane, [0, PH.y + 120, PORTAL.z + 1900], [0, PH.y, PORTAL.z], 0),
  // durch das Portal ins Foto
  look(S.portal, [0, PH.y, PH.z + 1650], [0, PH.y, PH.z], 0),
  look(S.toMap - .1, [0, PH.y, PH.z + 1540], [0, PH.y, PH.z], 0),
  // Region: hoch über die Karte, Foto fällt flach als Stecknadel
  look(S.mapIn + .3, [MAPC.x, -3300, MAPC.z + 1], [MAPC.x, MAPY, MAPC.z], -8),
  look(T(49.6), [MAPC.x + 40, -3050, MAPC.z + 41], [MAPC.x + 40, MAPY, MAPC.z + 40], -4),
  look(T(50.8), [0, -900, 1], [0, MAPY, 0], 0, { stop: true }),
  look(DUR, [0, -900, 1], [0, MAPY, 0], 0),
];
KEYS.sort((a, b) => a.t - b.t);

/* =====================================================================================
   UPDATE
   ===================================================================================== */
function updateCam(t) {
  const c = camAt(t);
  if (t > S.climb0 - .45 && t < S.hold) {
    // Ziel = Setzstufe des gerade gesprochenen Worts (oben -> unten), danach Totale auf alle fünf Wörter
    let sF = 9; S.steps.slice(1).forEach(ts => { sF -= E.inOutQuint(prog(t, ts - .14, ts + .3)); });
    const ov = ease(t, S.steps[4] + .35, S.hold, E.inOut);
    const sC = lerp(sF, 7, ov);
    const ty = Y_TOP - (sC - .5) * RISER - 10, tz = 500 - 100 * sC;
    const w = ease(t, S.climb0 - .45, S.climb0 + .05, E.inOut);
    c.ty = lerp(c.ty, ty, w); c.tz = lerp(c.tz, tz, w);
    c.rx = lerp(c.rx, 16, w); c.ry = lerp(c.ry, 20, w); c.tx = lerp(c.tx, 0, w);
    c.dist = lerp(c.dist, lerp(980, 1180, ov), w);
  }
  Object.assign(cam, c);
  const shake = (t0, a) => { const p = prog(t, t0, t0 + .5); return p > 0 && p < 1 ? Math.sin(p * 36) * a * (1 - p) ** 2 : 0; };
  cam.rz += shake(S.est, .5) + shake(S.drop, 1.3) + shake(S.stairs + .1, .7);
  cam.dist += shake(S.drop, 30);
  applyCam();
}

function update(t) {
  updateCam(t);

  /* ---- A: Maßband ---- */
  const tapeOut = ease(t, S.tapeOut[0], S.tapeOut[1], E.outQuint);
  const tapeIn = ease(t, T(7), T(7.8), E.inExpo);
  const tl = TAPE.len * tapeOut * (1 - tapeIn);
  show(tapeG, t < T(8.2));
  tapeBlade.style.clipPath = `inset(0 ${f(TAPE.len - tl)}px 0 0)`;
  tapeShadow.style.clipPath = `inset(0 ${f(TAPE.len - tl)}px 0 0)`;
  tapeHook.style.transform = tf({ x: TAPE.x0 + tl + 6, z: TAPE.z, y: -3, rx: 90 });
  op(tapeG, 1 - ease(t, T(7.3), T(7.9)));

  /* Kreidelinien: Längsseite „schnappt“, dann die anderen */
  show(chalk, t > S.chalk - .1 && t < T(12));
  const snap = t0 => { const p = prog(t, t0, t0 + .5); return Math.sin(p * 30) * (1 - p) ** 2 * 14 * (p > 0 && p < 1); };
  CL.forEach((c, i) => {
    const t0 = S.chalk + i * 0.15;
    const p = ease(t, t0, t0 + .3, E.outExpo);
    const w = i === 0 ? snap(S.chalk) : 0;
    c.e.style.transform = `translate3d(${f(c.x)}px,-2px,${f(c.z + (c.rot ? 0 : w))}px) rotateX(90deg) rotateZ(${c.rot}deg) scaleX(${f(Math.max(.0001, p))})`;
    op(c.e, p > 0 ? 1 : 0);
  });
  const dimP = ease(t, S.chalk + .5, S.chalk + 1.2, E.outExpo);
  dimLong.style.transform = tf({ x: 0, z: -ROOM.d / 2 - 74, y: -2, rx: 90 }); op(dimLong, dimP);
  dimShort.style.transform = tf({ x: -ROOM.w / 2 - 74, z: 0, y: -2, rx: 90, rz: 90 }); op(dimShort, dimP);
  corners.forEach((c, i) => op(c, ease(t, S.chalk + .3 + i * .05, S.chalk + .7 + i * .05)));
  op(chalk, 1 - ease(t, T(10), T(11.5)));

  /* Satz 1 + 2 */
  capUpdate(C1, t, wt('v2', 0) - .42);
  capUpdate(C2, t, clamp(we('v2', 10) + .15, T(14.4), T(15.1)));

  /* ---- B: Schichtaufbau ---- */
  show(stackG, t > S.est - .3 && t < S.toMap + 1.2);
  op(stackG, 1 - ease(t, S.toMap, S.toMap + .6));
  const rise = E.outBack(prog(t, S.est, S.est + .45), 1.4);
  const eh = Math.max(.001, rise);
  est.g.style.transform = `translate3d(0,${f(-L.estrich / 2 * eh)}px,0) scale3d(1,${f(eh)},1)`;
  const drop = (t0, yRest) => { const p = prog(t, t0 - .22, t0); const y = lerp(yRest - 420, yRest, E.in(p)); return { y, vis: t > t0 - .22 }; };
  const dS = drop(S.spa, Y_EST - L.spachtel / 2); show(spa.g, dS.vis); spa.g.style.transform = tf({ y: dS.y });
  const dT = drop(S.tri, Y_SPA - L.tritt / 2); show(tri.g, dT.vis); tri.g.style.transform = tf({ y: dT.y });
  op(stackShadow, ease(t, S.est, S.est + .6) * .9);

  /* Dielen: fallen (Drop), drehen sich (Materialien), werden zur Treppe */
  const FDUR = [.42, .42, .36, .36];
  planks.forEach(pl => {
    const i = pl.i;
    const tFall = S.drop - .26 + i * .028;
    const pf = E.in(prog(t, tFall, tFall + .26));
    let y = lerp(Y_TRI - L.belag / 2 - 760, Y_TRI - L.belag / 2, pf);
    let r = 0;
    S.flips.forEach((t0, k) => { const s = t0 - .06 + i * (k < 2 ? .026 : .016); r += E.inOutQuint(prog(t, s, s + FDUR[k])); });
    const kIdx = Math.floor(r + 1e-6), frac = r - kIdx;
    const mA = MATS[Math.min(kIdx, 4)], mB = MATS[Math.min(kIdx + 1, 4)];
    const frontIsA = kIdx % 2 === 0;
    const key = kIdx + (frontIsA ? 'a' : 'b');
    if (pl.mat[0] !== key) {
      pl.mat[0] = key;
      const cssA = texCSS(mA, i), cssB = texCSS(mB, i);
      const topCss = frontIsA ? cssA : cssB, botCss = frontIsA ? cssB : cssA;
      pl.b.faces.top.e.style.cssText = pl.b.faces.top.e.style.cssText.replace(/background[^;]*;/g, '') + topCss;
      pl.b.faces.bottom.e.style.cssText = pl.b.faces.bottom.e.style.cssText.replace(/background[^;]*;/g, '') + botCss;
    }
    const lift = Math.sin(frac * Math.PI) * 60;
    const ang = r * 180;
    const topLight = Math.max(0, Math.cos(ang * D2R)), botLight = Math.max(0, -Math.cos(ang * D2R));
    pl.b.faces.top.sh.style.opacity = f(1 - (.35 + .65 * topLight));
    pl.b.faces.bottom.sh.style.opacity = f(1 - (.35 + .65 * botLight));
    const sIdx = NP - 1 - i;                                   // Diele i wird Stufe s (hinten = oben)
    const st = ease(t, S.stairs + i * .018, S.stairs + .55 + i * .018, E.outQuint);
    y -= st * sIdx * RISER;
    pl.b.g.style.transform = `translate3d(0,${f(y - lift)}px,${f(pl.z)}px) rotateX(${f(ang)}deg)`;
    show(pl.b.g, t > tFall);
    const rs = risers[sIdx];
    show(rs.e, sIdx > 0 && st > 0.01);
    if (sIdx > 0) {
      const topY = y - L.belag / 2;
      rs.e.style.marginTop = '0px';
      rs.e.style.transform = `translate3d(0,${f(topY)}px,${f(pl.z + PW / 2 - 2)}px) scale3d(1,${f(Math.max(.001, st))},1)`;
      if (rs.T) riseChars(rs.T, t, wt('v4', RISER_K[sIdx]) - .07, .5, .02, 1.1);
    }
  });

  /* Beschriftungen der Schichten: zeigen auf die vordere Ecke des Aufbaus */
  const cAt = [S.est + .3, S.spa + .1, S.tri + .1];
  const cY = [Y_EST / 2, Y_EST - L.spachtel / 2, Y_SPA - L.tritt / 2];
  const cOut = ease(t, T(15.2), T(15.9));
  callouts.forEach((c, i) => {
    const vis = ease(t, cAt[i], cAt[i] + .3, E.outExpo) * (1 - cOut);
    const pnt = project(-ROOM.w / 2, cY[i], ROOM.d / 2);
    if (!pnt || vis <= 0) { c.e.style.opacity = 0; c.ln.setAttribute('d', ''); c.dot.setAttribute('r', 0); return; }
    const lx = 96, ly = 1180 + i * 92;                          // Etiketten links unten, gestapelt
    c.e.style.opacity = f(vis);
    c.e.style.transform = `translate3d(${f(lx)}px,${f(ly - 26)}px,0)`;
    const ex = lx + c.e.offsetWidth + 10, ey = ly;
    const mx = lerp(pnt.x, ex + 40, vis);
    c.ln.setAttribute('d', `M${f(pnt.x)} ${f(pnt.y)} L${f(lerp(pnt.x, ex + 40, vis))} ${f(lerp(pnt.y, ey, vis))} L${f(lerp(pnt.x, ex, vis))} ${f(lerp(pnt.y, ey, vis))}`);
    c.dot.setAttribute('cx', f(pnt.x)); c.dot.setAttribute('cy', f(pnt.y)); c.dot.setAttribute('r', f(6 * vis));
  });

  /* ---- C: Materialwort ---- */
  const wIn = ease(t, S.drop + .02, S.drop + .4, E.outExpo), wOut = ease(t, S.stairs - .1, S.stairs + .15, E.inExpo);
  show(wordG, wIn > 0 && wOut < 1);
  wordG.style.transform = tf({ y: Y_TOP - 170, rx: 90, rz: 90 });
  let ri = 0; S.flips.forEach(s => { ri += E.inOutExpo(prog(t, s - .04, s + .26)); });
  reel.style.transform = `translate3d(0,${f(-ri * REEL_H)}px,0)`;
  idxReel.style.transform = `translate3d(0,${f(-ri * 40)}px,0)`;
  reelWin.style.transform = `translate3d(0,${f((1 - wIn) * 120)}px,0) scale(${f(lerp(.85, 1, wIn) * (1 - wOut * .2))})`;
  op(reelWin, wIn * (1 - wOut)); op(idxWin, wIn * (1 - wOut)); op(dimmer, wIn * (1 - wOut));
  let sh = -1; [S.drop, ...S.flips].forEach(s0 => { const p = prog(t, s0 + .12, s0 + .62); if (p > 0 && p < 1) sh = p; });
  sheen.style.transform = `translate3d(${f(lerp(-1100, 1100, E.inOutSine(clamp(sh))))}px,0,${f(40)}px) rotateZ(14deg)`;
  op(sheen, sh >= 0 ? Math.sin(sh * Math.PI) : 0);

  /* ---- E: Portal + Fotos ---- */
  show(portalG, t > S.hold - .3 && t < S.portal + .3);
  portalG.style.transform = tf({ x: 0, y: PH.y, z: PORTAL.z });
  op(portalG, ease(t, S.hold - .2, S.hold + .7) * (1 - ease(t, S.portal - .35, S.portal)));
  show(photoG, t > S.hold - .2 && t < S.mapIn + 1.4);
  const toMap = ease(t, S.toMap, S.toMap + .95, E.inOutQuint);
  const pz = lerp(PH.z, 0, toMap), py = lerp(PH.y, MAPY - 2, toMap);
  photoG.style.transform = `translate3d(0,${f(py)}px,${f(pz)}px) rotateX(${f(toMap * 90)}deg) scale(${f(lerp(1, .085, toMap))})`;
  op(photoG, ease(t, S.hold - .1, S.hold + 1.1) * (1 - ease(t, S.mapIn + .5, S.mapIn + 1.2)));
  strips.forEach((s, i) => {
    const p = E.inOutQuint(prog(t, S.flip + i * .045, S.flip + .42 + i * .045));
    s.g.style.transform = `translate3d(${f(s.x)}px,0,1px) rotateY(${f(p * 180)}deg)`;
    s.sha.style.opacity = f(Math.sin(p * Math.PI) * .5); s.shb.style.opacity = f(Math.sin(p * Math.PI) * .5);
  });
  const resIn = ease(t, S.portal - .4, S.portal + .3), resOut = ease(t, S.toMap - .1, S.toMap + .5);
  show(resultShade, resIn > 0 && resOut < 1); op(resultShade, resIn * (1 - resOut));
  capUpdate(C5, t, S.toMap - .25);

  /* ---- F: Region ---- */
  show(mapG, t > S.toMap + .2 && t < T(51.4));
  mapG.style.transform = tf({ y: MAPY - 3 });
  const mIn = ease(t, S.mapIn - .2, S.mapIn + .6, E.outExpo), mOut = ease(t, T(49.6), T(50.9), E.inExpo);
  towns.forEach((tw, i) => {
    const appear = ease(t, S.mapIn + i * .07, S.mapIn + .5 + i * .07, E.outBack);
    const k = 1 - mOut;
    tw.dot.style.transform = tf({ x: tw.x * k, z: tw.z * k, rx: 90, s: Math.max(.001, appear * (i ? 1 : 1 + mOut * .5)) });
    op(tw.dot, i ? 1 : 1 - ease(t, T(50.4), T(50.9)));
    const left = tw.side === 'l';
    tw.lab.style.transform = tf({ x: tw.x * k + (left ? -750 : (i ? 750 : 772)), z: tw.z * k, y: -1, rx: 90 });
    op(tw.lab, appear * (1 - mOut * 1.6));
  });
  routes.forEach((r, i) => {
    const p = E.outExpo(prog(t, S.mapIn + .3 + i * .05, S.mapIn + .9 + i * .05)) * (1 - mOut);
    r.e.style.transform = `translate3d(0px,-1px,0) rotateX(90deg) rotateZ(${f(r.ang)}deg) scaleX(${f(Math.max(.001, p))})`;
    r.e.style.left = '0px';
  });
  mapRing.style.transform = tf({ y: -1, rx: 90, s: lerp(.2, 1.4, ease(t, S.mapIn, S.mapIn + 1.4)) * (1 - mOut) + .001 });
  op(mapRing, mIn * (1 - ease(t, S.mapIn + 1, S.mapIn + 1.8)));
  mapRing2.style.transform = tf({ y: -1, rx: 90, s: lerp(.4, 1, ease(t, S.mapIn + .1, S.mapIn + 1.2)) * (1 - mOut) + .001 }); op(mapRing2, mIn * (1 - mOut));
  const msIn = ease(t, S.toMap + .3, S.mapIn + .3), msOut = ease(t, T(49.4), T(50.2));
  show(mapShade, msIn > 0 && msOut < 1); op(mapShade, msIn * (1 - msOut));
  capUpdate(C6, t, clamp(we('v6', 6) + .25, T(49.3), T(50.1)));

  /* ---- G: Logo-Endtafel ---- */
  show(endG, t > S.end - .1);
  const fl = prog(t, T(50.2), T(52.6));
  flare.style.transform = `scale(${f(.12 + E.outExpo(fl) * .6)})`; op(flare, Math.sin(clamp(fl * 1.4) * Math.PI) * .42);
  streak.style.transform = `scaleX(${f(.05 + E.outExpo(fl) * 1.2)}) scaleY(${f(1 + (1 - fl) * 2)})`; op(streak, Math.sin(clamp(fl * 1.3) * Math.PI) * .9);
  const parts = [T(50.5), T(51), T(51.5), T(52)];
  const fromY = [-170, 190, 190, 190];
  markParts.forEach((m, i) => {
    const p = E.outBack(prog(t, parts[i] - .02, parts[i] + .4), 1.7);
    m.style.transform = `translate3d(0,${f((1 - p) * fromY[i])}px,0) scale(${f(lerp(.55, 1, clamp(p * 1.3)))})`;
    op(m, clamp(prog(t, parts[i] - .02, parts[i] + .1)));
  });
  const wm = ease(t, T(51.7), T(52.9), E.inOutQuint);
  wordmark.style.clipPath = `inset(0 ${f(LKW - WM_W * wm)}px 0 0)`;
  wordmark.style.transform = `translate3d(${f((1 - wm) * -40)}px,0,0)`;
  endRule.style.transform = `scaleX(${f(Math.max(.001, ease(t, wt('v7', 2) - .35, wt('v7', 2) + .6, E.inOutExpo)))})`;
  capUpdate(endSub, t, null, { dur: .45, st: .01 });
  riseChars(endTel, t, we('v7', 5) + .15, .65, .028, 1.1);
  [endStars, endWeb].forEach((e, i) => { const p = ease(t, we('v7', 5) + .5 + i * .14, we('v7', 5) + 1.2 + i * .14, E.outExpo); e.style.transform = `translate3d(0,${f((1 - p) * 26)}px,0)`; op(e, p); });
  const cIn = E.outBack(prog(t, wt('v8', 0) - .3, wt('v8', 0) + .2), 1.6);
  endCTA.style.transform = `scale(${f(Math.max(.001, cIn))})`; op(endCTA, clamp(cIn * 3));
  capUpdate(ctaText, t, null, { dur: .4, st: .012 });
  const gl_ = prog(t, we('v8', 2) + .2, we('v8', 2) + 1.0);
  ctaGlint.style.transform = `translate3d(${f(lerp(-200, 900, E.inOutSine(gl_)))}px,0,0) skewX(-18deg)`; op(ctaGlint, gl_ > 0 && gl_ < 1 ? 1 : 0);
  const shP = prog(t, T(53), T(55.4)); logoSheen.firstChild.style.transform = `translate3d(${f(lerp(-300, LKW + 100, E.inOutSine(shP)))}px,0,0) skewX(-18deg)`; op(logoSheen, shP > 0 && shP < 1 ? 1 : 0);
  const push = ease(t, S.end, DUR, E.out);
  const hit = prog(t, T(52), T(52) + .5);
  endG.style.transform = `scale(${f(1.05 - push * .05 + (hit > 0 && hit < 1 ? Math.sin(hit * Math.PI) * (1 - hit) * .018 : 0))})`;

  /* ---- Staub ---- */
  const dOp = .5 * (1 - ease(t, S.portal - .4, S.portal + .4)) * ease(t, .3, 1.2) + .35 * ease(t, T(51), T(53));
  dust.forEach(d => {
    const px = (d.x + cam.ry * 9 * d.z + cam.tx * .05 * d.z + t * 10 * d.z + 4000) % (W + 80) - 40;
    const py = (d.y - t * 18 * d.z + cam.rx * 3 * d.z + 4000) % (H + 40) - 20;
    const sz = d.s * (1 + d.z);
    d.e.style.width = d.e.style.height = f(sz * 3) + 'px';
    d.e.style.transform = `translate3d(${f(px)}px,${f(py)}px,0)`;
    d.e.style.opacity = f(dOp * (.4 + .6 * (.5 + .5 * Math.sin(t * 1.3 + d.ph))));
  });

  /* ---- HUD ---- */
  let si = 0; SECTIONS.forEach((s, i) => { if (t >= s[0]) si = i; });
  if (hudNo.textContent !== SECTIONS[si][1]) { hudNo.textContent = SECTIONS[si][1]; hudName.textContent = SECTIONS[si][2]; }
  op(hud, ease(t, .05, .5) * (1 - ease(t, T(49.6), T(50.4))));
  hudFill.style.width = f(260 * t / DUR) + 'px';
  hudMeter.textContent = 'Aufmaß ' + (Math.max(0, tl) / 333.33).toFixed(2).replace('.', ',') + ' m';
  op(hudMeter, 1 - ease(t, T(8), T(9)));

  /* ---- Hintergrund, Korn, Blende ---- */
  const amp = lerp(.32, .9, ease(t, T(50), T(52), E.inOut)) * ease(t, 0, 1.2);
  drawBG(t, amp, Math.sin(t * .3) * .3, Math.cos(t * .23) * .2);
  drawGrain(t);
  op($('#fade'), 1 - ease(t, 0, .35));
}

/* ---------- Steuerung ---------- */
window.seek = function (t) { update(clamp(t, 0, DUR)); return true; };
window.S = S; window.V = V;
window.ready = (async () => {
  await document.fonts.ready;
  [C1, C2, C5, C6].forEach(C => fitBlock(C.el, CAPW));
  fitBlock(endTel.el, LKW);
  const urls = [...new Set([...document.querySelectorAll('[style*="url("]')].flatMap(e => [...e.getAttribute('style').matchAll(/url\(["']?([^"')]+)["']?\)/g)].map(m => m[1])))];
  await Promise.all(urls.map(u => new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = u; })));
  seek(0);
  return urls.length;
})();

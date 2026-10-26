/* Handwerker Blesius – Logo-Intro 9:16 (7 Schläge, läuft vor dem 30-s-Film). Teile aus film9.js übernommen: Easing, Hintergrund, Korn. */
'use strict';
const W = 1080, H = 1920, Q = 0.4473, B = n => n * Q, DUR = 7 * Q;
const $ = s => document.querySelector(s);
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
function mk(parent, cls, css, html) { const d = document.createElement('div'); if (cls) d.className = cls; if (css) d.style.cssText = css; if (html != null) d.innerHTML = html; parent.appendChild(d); return d; }
const f = v => (Math.abs(v) < 1e-4 ? 0 : v).toFixed(3);
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
   LOGO-INTRO (7 Schläge = 3,131 s, 134,2 BPM) – läuft direkt vor dem 30-s-Film.
   Schlagschnur schnappt → Bildmarke steht Teil für Teil im Takt auf → Dach schlägt auf →
   Marke gleitet ins Logo, „Handwerker“ steigt Buchstabe für Buchstabe auf, „Blesius GmbH“ folgt,
   die Schnur wird zur Linie unter dem Logo → Glanz → Kamera fliegt ins Hausfenster.
   Der Film startet danach auf seinem ersten Musikakzent. Reine Funktion der Zeit: window.seek(t).
   ===================================================================================== */
const cam = $('#cam');
const BR = 'assets/brand/';
const LKW = 900, LKH = 254, LKX = (W - LKW) / 2, LKY = 833;     // Logo (logo-light.png) im Endstand, Bildmitte
const MK = { w: 497, h: 379 };                                   // Ebenen mark-*.png (gleiche Leinwand)
const S_LOCK = 332 / 497, MLX = LKX + 567.3, MLY = LKY;          // Marke im Logo
const S_BIG = 1.22, BASE_Y = 1150;                               // große Marke steht auf der Schlagschnur
const MBX = W / 2 - MK.w * S_BIG / 2, MBY = BASE_Y - MK.h * S_BIG;
const UL_Y = LKY + LKH + 46;                                     // Linie unter dem Logo
const tSnap = B(0.5), tOr = B(1), tGr = B(1.5), tHo = B(2), tRoof = B(2.5);
const tMove0 = B(3), tMove1 = B(4), tLet0 = B(3.45), tBl0 = B(4.2), tBl1 = B(4.85), tSh0 = B(4.85), tSh1 = B(5.8), tZ0 = B(5.8);
const ZX = MLX + 397 * S_LOCK, ZY = MLY + 210 * S_LOCK;          // Fensterscheibe unten links (Ziel der Kamerafahrt)

/* Glühen hinter der Marke beim Dach-Aufschlag */
const flare = mk(cam, 'abs', `left:${W / 2}px;top:${BASE_Y - 210}px;width:1000px;height:1000px;margin:-500px 0 0 -500px;border-radius:50%;background:radial-gradient(closest-side,rgba(255,232,206,.7),rgba(242,129,53,.34) 32%,rgba(242,129,53,0) 72%);opacity:0;`);

/* Schlagschnur (SVG) */
const NS = 'http://www.w3.org/2000/svg';
const lsvg = document.createElementNS(NS, 'svg');
lsvg.setAttribute('width', W); lsvg.setAttribute('height', H); lsvg.setAttribute('class', 'abs'); lsvg.style.overflow = 'visible';
lsvg.innerHTML = '<defs><filter id="gl" x="-20%" y="-400%" width="140%" height="900%"><feGaussianBlur stdDeviation="8"/></filter></defs>'
  + '<path id="cGlow" fill="none" stroke="#F28135" stroke-width="14" stroke-linecap="round" filter="url(#gl)" opacity="0"/>'
  + '<path id="cLine" fill="none" stroke="#F28135" stroke-width="4" stroke-linecap="round" opacity="0"/>';
cam.appendChild(lsvg);
const cGlow = lsvg.querySelector('#cGlow'), cLine = lsvg.querySelector('#cLine');

/* Bildmarke aus vier Ebenen; Scharniere an der jeweiligen Unterkante bzw. Seite */
const markG = mk(cam, 'abs', `width:${MK.w}px;height:${MK.h}px;transform-origin:0 0;perspective:1500px;`);
const ORIGIN = { orange: '75px 378px', graphite: '248px 378px', house: '348px 250px', roof: '248px 172px' };
const part = {};
['orange', 'graphite', 'house', 'roof'].forEach(n => {
  part[n] = mk(markG, 'abs', `width:${MK.w}px;height:${MK.h}px;background:url(${BR}mark-${n}.png) 0 0/${MK.w}px ${MK.h}px no-repeat;transform-origin:${ORIGIN[n]};backface-visibility:hidden;-webkit-backface-visibility:hidden;opacity:0;`);
});
/* Lichtstreifen an der Aufsetzkante je Teil (Takt sichtbar machen) */
const GL = [[75, 260], [248, 260], [422, 260], [248, 760]];
const glints = GL.map(([cx, w]) => mk(markG, 'abs', `left:${cx - w / 2}px;top:${378 - 5}px;width:${w}px;height:10px;border-radius:5px;background:radial-gradient(closest-side,rgba(255,240,224,.95),rgba(242,129,53,.55) 45%,rgba(242,129,53,0));opacity:0;`));

/* Schriftzug aus logo-light.png: „Handwerker“ Buchstabe für Buchstabe (Spalten gemessen), „Blesius GmbH“ als Ganzes */
const COLS = [[0, 62], [77, 115], [127, 174], [187, 232], [241, 308], [319, 354], [368, 400], [411, 456], [465, 500], [514, 546]];
const LET_Y = 46, LET_H = 96;
const letters = COLS.map(([a, b]) => {
  const x0 = a - 3, w = b - a + 7;
  const win = mk(cam, 'abs', `left:${LKX + x0}px;top:${LKY + LET_Y}px;width:${w}px;height:${LET_H}px;overflow:hidden;`);
  return mk(win, 'abs', `width:${w}px;height:${LET_H}px;background:url(${BR}logo-light.png) ${-x0}px ${-LET_Y}px/${LKW}px ${LKH}px no-repeat;transform:translate3d(0,${LET_H}px,0);`);
});
const blWin = mk(cam, 'abs', `left:${LKX + 255}px;top:${LKY + 150}px;width:300px;height:50px;overflow:hidden;`);
const blIn = mk(blWin, 'abs', `width:300px;height:50px;background:url(${BR}logo-light.png) -255px -150px/${LKW}px ${LKH}px no-repeat;clip-path:inset(0 100% 0 0);`);

/* Glanz über das fertige Logo (Maske = logo-light.png) */
const sheenG = mk(cam, 'abs', `left:${LKX}px;top:${LKY}px;width:${LKW}px;height:${LKH}px;overflow:hidden;-webkit-mask:url(${BR}logo-light.png) 0 0/${LKW}px ${LKH}px no-repeat;mask:url(${BR}logo-light.png) 0 0/${LKW}px ${LKH}px no-repeat;opacity:0;`);
const sheenBar = mk(sheenG, 'abs', 'top:-30%;width:230px;height:160%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.92),transparent);');

/* Kreidestaub: beim Schnappen entlang der Schnur, beim Dach-Aufschlag seitlich weg */
const dr = rand(2026);
const dustEl = () => mk(cam, 'abs', 'border-radius:50%;background:radial-gradient(circle,rgba(255,228,196,.95),rgba(247,162,108,.5) 45%,rgba(247,162,108,0) 72%);opacity:0;');
const dust = [];
for (let i = 0; i < 74; i++) dust.push({ t0: tSnap, x: -20 + dr() * 1120, y: BASE_Y + (dr() - .5) * 6, vx: (dr() - .5) * 90, vy: -30 - dr() * 170, s: 3 + dr() * 8, life: .5 + dr() * .75, e: dustEl() });
for (let i = 0; i < 52; i++) { const sd = dr() < .5 ? -1 : 1; dust.push({ t0: tRoof, x: W / 2 + sd * (30 + dr() * 250), y: BASE_Y - dr() * 8, vx: sd * (90 + dr() * 460), vy: -30 - dr() * 230, s: 3 + dr() * 9, life: .45 + dr() * .65, e: dustEl() }); }
function dustUpdate(t) {
  for (const d of dust) {
    const a = t - d.t0;
    if (a < 0 || a > d.life) { if (d.e.style.opacity !== '0') d.e.style.opacity = '0'; continue; }
    const k = a / d.life, sz = d.s * (1 + .7 * k);
    const x = d.x + d.vx * a, y = d.y + d.vy * a + 170 * a * a;
    d.e.style.width = d.e.style.height = f(sz) + 'px';
    d.e.style.transform = `translate3d(${f(x - sz / 2)}px,${f(y - sz / 2)}px,0)`;
    d.e.style.opacity = f(Math.sin(Math.min(1, k * 5) * Math.PI / 2) * (1 - k) * .9);
  }
}

/* Schnur: vorher gespannt und hochgezogen, nach dem Schnappen gedämpftes Schwingen; später Linie unter dem Logo */
function chalkPath(t) {
  const m = ease(t, tMove0, tMove1, E.inOutExpo);
  const x0 = lerp(-30, LKX, m), x1 = lerp(W + 30, LKX + LKW, m), y = lerp(BASE_Y, UL_Y, m);
  let A;
  if (t < tSnap) A = -86 * E.out(prog(t, .03, tSnap - .012));
  else { const a = t - tSnap; A = -86 * Math.cos(2 * Math.PI * 9.5 * a) * Math.exp(-a / .055); }
  let d = '';
  for (let i = 0; i <= 56; i++) { const u = i / 56; d += (i ? 'L' : 'M') + f(lerp(x0, x1, u)) + ' ' + f(y + A * Math.sin(Math.PI * u)); }
  return d;
}

/* Brett stellt sich auf: beschleunigt hoch, landet genau auf dem Schlag, schwingt kurz nach */
function hinge(t, t0, from, rise = .17) {
  if (t < t0) { const p = prog(t, t0 - rise, t0); return { ang: from * (1 - Math.pow(p, 2.3)), on: clamp(p * 3.5) }; }
  const a = t - t0; return { ang: -from * .085 * Math.sin(2 * Math.PI * 5.5 * a) * Math.exp(-a / .07), on: 1 };
}
const shade = ang => `brightness(${f(.5 + .5 * Math.cos(ang * D2R))})`;
function hit(t, t0, dec = .09) { const a = t - t0; return a < -.02 ? 0 : a < 0 ? (a + .02) / .02 : Math.exp(-a / dec); }

function update(t) {
  /* Teile im Takt */
  const o = hinge(t, tOr, 92), g = hinge(t, tGr, 92), h = hinge(t, tHo, -100, .19);
  part.orange.style.transform = `rotateX(${f(o.ang)}deg)`; part.orange.style.filter = shade(o.ang); op(part.orange, o.on);
  part.graphite.style.transform = `rotateX(${f(g.ang)}deg)`; part.graphite.style.filter = shade(g.ang); op(part.graphite, g.on);
  part.house.style.transform = `rotateY(${f(h.ang)}deg)`; part.house.style.filter = shade(h.ang); op(part.house, h.on);
  // Dach fällt (Schwerkraft), schlägt auf, federt einmal
  let ry, sq = 1;
  if (t < tRoof) { const p = prog(t, tRoof - .21, tRoof); ry = -780 * (1 - p * p); op(part.roof, clamp(p * 4)); }
  else { const a = t - tRoof; ry = a < .17 ? -24 * Math.sin(Math.PI * a / .17) : a < .26 ? -5 * Math.sin(Math.PI * (a - .17) / .09) : 0; sq = 1 - .07 * Math.exp(-a / .035); op(part.roof, 1); }
  part.roof.style.transform = `translate3d(0,${f(ry)}px,0) scale(${f(1 + (1 - sq) * .5)},${f(sq)})`;
  [tOr, tGr, tHo, tRoof].forEach((t0, i) => {
    const k = hit(t, t0, i === 3 ? .14 : .085);
    glints[i].style.transform = `scaleX(${f(.35 + (1 - k) * 1.1)})`; op(glints[i], k * (1 - ease(t, tMove0, tMove0 + .15)));
  });

  /* Marke: groß auf der Schnur → in die Position im Logo */
  const mv = ease(t, tMove0, tMove1, E.inOutExpo), s = lerp(S_BIG, S_LOCK, mv);
  markG.style.transform = `translate3d(${f(lerp(MBX, MLX, mv))}px,${f(lerp(MBY, MLY, mv))}px,0) scale(${f(s)})`;

  /* Schnur */
  const pre = t < tSnap, snapK = hit(t, tSnap, .35);
  cLine.setAttribute('d', chalkPath(t)); cGlow.setAttribute('d', cLine.getAttribute('d'));
  cLine.setAttribute('stroke', pre ? '#d8cbbb' : '#F28135');
  cLine.setAttribute('stroke-width', f(pre ? 2 : lerp(4.5, 4, mv)));
  cLine.setAttribute('opacity', f(pre ? ease(t, .03, .14) * .9 : 1));
  const ulPulse = hit(t, tMove1 - .05, .3);
  cGlow.setAttribute('opacity', f(pre ? 0 : clamp(.28 + snapK * .7 + ulPulse * .35 + hit(t, tRoof, .2) * .3)));

  /* Glühen beim Dach-Aufschlag */
  const fl = prog(t, tRoof - .02, tRoof + .7);
  flare.style.transform = `scale(${f(.25 + E.outExpo(fl) * .95)})`; op(flare, fl > 0 ? Math.sin(clamp(fl * 1.25) * Math.PI) * .5 : 0);

  /* Schriftzug */
  letters.forEach((el, i) => { const p = E.outExpo(prog(t, tLet0 + i * .032, tLet0 + i * .032 + .5)); el.style.transform = `translate3d(0,${f((1 - p) * LET_H)}px,0)`; });
  const bl = ease(t, tBl0, tBl1, E.inOutQuint);
  blIn.style.clipPath = `inset(0 ${f((1 - bl) * 100)}% 0 0)`; blIn.style.transform = `translate3d(${f((1 - bl) * -26)}px,0,0)`;

  /* Glanz */
  const sp = prog(t, tSh0, tSh1);
  sheenBar.style.transform = `translate3d(${f(lerp(-320, LKW + 80, E.inOutSine(sp)))}px,0,0) skewX(-18deg)`; op(sheenG, sp > 0 && sp < 1 ? 1 : 0);

  /* Kamera: leichtes Heranfahren, Wackler beim Aufschlag, am Ende Flug ins Fenster */
  let shx = 0, shy = 0;
  [[tOr, 3], [tGr, 3], [tHo, 4], [tRoof, 15]].forEach(([t0, A]) => {
    const a = t - t0; if (a < 0 || a > .4) return; const e = Math.exp(-a / .075);
    shx += A * .8 * e * Math.sin(2 * Math.PI * 22 * a); shy += A * e * Math.sin(2 * Math.PI * 17 * a + 1.3);
  });
  const drift = 1 + .035 * E.inOutSine(prog(t, 0, tZ0));
  const pz = prog(t, tZ0, DUR), kz = Math.exp(Math.log(150) * Math.pow(pz, 2.35)), pc = E.inOutSine(clamp(pz / .6));
  const cx = lerp(ZX, W / 2, pc), cy = lerp(ZY, H / 2, pc);
  cam.style.transform = `translate3d(${W / 2}px,${H / 2}px,0) scale(${f(drift)}) translate3d(${-W / 2}px,${-H / 2}px,0) `
    + `translate3d(${f(cx + shx)}px,${f(cy + shy)}px,0) scale(${f(kz)}) translate3d(${f(-ZX)}px,${f(-ZY)}px,0)`;

  dustUpdate(t);

  /* Hintergrund wie im Film (Zeit läuft nahtlos in den Film hinein), Korn, Blenden */
  const amp = .26 * ease(t, 0, .9) + .14 * hit(t, tRoof, .25) + .08 * hit(t, tSnap, .2);
  drawBG(t - DUR, amp, Math.sin((t - DUR) * .3) * .3, Math.cos((t - DUR) * .23) * .2);
  drawGrain(t + 1000);
  op($('#fade'), Math.max(1 - ease(t, 0, .2), ease(t, DUR - .07, DUR)));
}
function op(el, v) { el.style.opacity = f(clamp(v)); }

window.seek = function (t) { update(clamp(t, 0, DUR)); return true; };
window.ready = (async () => {
  const urls = ['logo-light.png', 'mark-orange.png', 'mark-graphite.png', 'mark-house.png', 'mark-roof.png'].map(n => BR + n);
  await Promise.all(urls.map(u => new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = u; })));
  update(0);
  return urls.length;
})();

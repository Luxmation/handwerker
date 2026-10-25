/* handwerker-blesius.de – Lebendig-Schicht (adaptiert aus made4music: shader.frag/site.js)
   Läuft vor motion.js und stellt window.Alive.introDone bereit (Hero-Sequenz wartet darauf).
   Module:  ambient (WebGL-Bänder mit Holzmaserung) · intro (Logo setzt sich zusammen, 1× pro Sitzung)
            · transition (Wisch für interne Links) · hud (Eckwinkel, Aufmaß, Uhrzeit, Öffnungsstatus,
            Maßband-Fortschritt, aktuelle Schicht) · layers (Schicht-Labels) · cursor · glow · distort
   Grundsätze: ohne JS ist alles sichtbar (alles hier ist Dekoration); prefers-reduced-motion =
   Standbild, kein Intro, kein Übergang, kein Cursor; Touch/schmal = kein HUD/Cursor, einfacher Shader. */
(function () {
  'use strict';
  var d = document, html = d.documentElement, w = window;
  var mq = function (q) { return !!(w.matchMedia && w.matchMedia(q).matches); };
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var reduce = mq('(prefers-reduced-motion: reduce)');
  var fine = mq('(hover: hover) and (pointer: fine)');
  var desk = function () { return fine && mq('(min-width: 1024px)'); };
  var G = w.gsap;
  var store = null; try { store = w.sessionStorage; } catch (e) { /* gesperrt */ }

  var A = w.Alive = {};
  if (w.__blSafety) clearTimeout(w.__blSafety); // ab hier steuert dieses Skript Intro und Übergang
  var introOn = html.classList.contains('intro-on');
  var resolveIntro, resolveArrive, introP = new Promise(function (r) { resolveIntro = r; }), arriveP = new Promise(function (r) { resolveArrive = r; });
  A.introDone = Promise.all([introP, arriveP]); // Hero-/Titel-Sequenz startet nach Intro und nach dem Öffnen der Seitenblende
  html.classList.add('has-alive');

  /* 1 Ambient – fließende, glänzende Bänder in Eiche/Orange mit feiner Maserung ------------------ */
  var FRAG = [
    'precision mediump float;',
    'uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse;',
    'const vec3 DEEP = vec3(0.085, 0.052, 0.030);',
    'const vec3 OAK = vec3(0.56, 0.36, 0.19);',
    'const vec3 HONEY = vec3(0.98, 0.70, 0.40);',
    'const vec3 ORANGE = vec3(0.949, 0.506, 0.208);',
    'const vec3 BG = vec3(0.071, 0.067, 0.063);',
    'float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }',
    'float noise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);',
    '  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y); }',
    'float centre(float x, float k, float t) {',
    '  return 0.40 * sin(x * 1.05 + t * 0.22 + k * 2.3) + 0.16 * sin(x * 2.2 - t * 0.17 + k * 1.1) + (k - 1.0) * 0.92; }',
    // Ein glänzendes, sich verdrehendes Band; rgb = Farbe, a = Deckkraft
    'vec4 ribbon(vec2 p, float k, float t) {',
    '  float y0 = centre(p.x, k, t);',
    '  float slope = (centre(p.x + 0.01, k, t) - y0) / 0.01;',
    '  float twist = sin(p.x * 1.2 + t * 0.30 + k * 1.7);',
    '  float wd = 0.05 + 0.15 * abs(twist);',
    '  float dd = (p.y - y0) / sqrt(1.0 + slope * slope);',
    '  float s = dd / wd;',
    '  float glow = exp(-abs(dd) * 6.5) * 0.09;',
    '  if (abs(s) > 1.0) return vec4(ORANGE * glow, 0.0);',
    '  float z = sqrt(1.0 - s * s);',
    '  vec3 n = normalize(vec3(-slope * 0.3, s * sign(twist + 0.0001), z));',
    '  vec3 l = normalize(vec3(-0.35 + uMouse.x * 0.7, 0.75 + uMouse.y * 0.5, 0.55));',
    '  float diff = max(dot(n, l), 0.0);',
    '  float spec = pow(max(dot(reflect(-l, n), vec3(0.0, 0.0, 1.0)), 0.0), 22.0);',
    '  float fres = pow(1.0 - z, 3.0);',
    // Maserung: Jahresringe laufen längs des Bandes, leicht verwirbelt, dazu feine Poren
    '#ifdef LITE',
    '  float grain = 0.5 + 0.5 * sin((s + 0.18 * sin(p.x * 2.6 + k * 3.0)) * 21.0);',
    '#else',
    '  float warp = noise(vec2(p.x * 1.6 + k * 7.0, s * 1.2)) * 0.55 + noise(vec2(p.x * 7.0, s * 3.0 + k)) * 0.12;',
    '  float grain = 0.5 + 0.5 * sin((s + warp) * 23.0);',
    '  grain = grain * (0.82 + 0.18 * noise(vec2(p.x * 60.0, s * 9.0)));',
    '#endif',
    '  grain = smoothstep(0.15, 1.0, grain);',
    '  vec3 col = mix(DEEP, OAK, diff * 0.75) * (0.72 + 0.28 * grain);',
    '  col += HONEY * (pow(diff, 6.0) * 0.42 + fres * 0.32) * (0.45 + 0.55 * grain);',
    '  col += ORANGE * spec * 0.75 * (0.6 + 0.4 * grain) + vec3(1.0, 0.86, 0.72) * pow(spec, 5.0) * 0.45;',
    '  return vec4(col, smoothstep(1.0, 0.62, abs(s)));',
    '}',
    'void main() {',
    '  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);',
    '  float t = uTime;',
    '  vec2 p = mat2(0.86, 0.51, -0.51, 0.86) * uv * 1.2;',
    '  p += uMouse * 0.05;',
    '  vec3 col = BG;',
    '#ifdef LITE',
    '  for (int i = 0; i < 2; i++) {',
    '#else',
    '  for (int i = 0; i < 3; i++) {',
    '#endif',
    '    float k = float(i);',
    '    vec4 r = ribbon(p * (1.0 + k * 0.08), k, t);',
    '    col = mix(col, r.rgb, r.a * 0.82);',
    '    col += r.rgb * (1.0 - r.a);',
    '  }',
    // Lichtschein an der Maus, Rand dunkler, Mitte ruhiger (Lesbarkeit)
    '  vec2 m = uMouse * vec2(0.5 * uRes.x / min(uRes.x, uRes.y), 0.5 * uRes.y / min(uRes.x, uRes.y));',
    '  col += ORANGE * 0.05 * exp(-length(uv - m) * 2.6);',
    '  float calm = smoothstep(0.0, 0.7, length(uv * vec2(0.9, 1.5)));',
    '  col = mix(BG, col, mix(0.55, 0.95, calm));',
    '  col *= 1.0 - 0.35 * smoothstep(0.5, 1.2, length(uv));',
    '  col += (hash(gl_FragCoord.xy + fract(t)) - 0.5) * 0.012;',
    '  gl_FragColor = vec4(col, 1.0);',
    '}'
  ].join('\n');

  var amb = (function ambient() {
    var box = $('[data-ambient-bg]'), cv = box && $('canvas', box);
    if (!cv) return null;
    var lite = !fine || w.innerWidth < 860;
    var gl = null;
    try { gl = cv.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: 'low-power' }); } catch (e) { gl = null; }
    if (!gl) return null;
    var sh = function (type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
    var prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, (lite ? '#define LITE\n' : '') + FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'a');
    gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var uRes = gl.getUniformLocation(prog, 'uRes'), uTime = gl.getUniformLocation(prog, 'uTime'), uMouse = gl.getUniformLocation(prog, 'uMouse');

    // Niedrige Auflösung, hochskaliert (die Bänder sind weich); Handy noch weniger Pixel und 30 fps
    var scale = lite ? 0.5 : Math.min(w.devicePixelRatio || 1, 2) * 0.6;
    var minDt = lite ? 1000 / 30 - 2 : 1000 / 60 - 2;
    var mouse = [0.15, 0.1], target = [0.15, 0.1], t = 8, last = 0, prev = 0, running = false, raf = 0, lost = false;
    var hero = $('[data-hero]'), heroEnd = 0;
    var measure = function () {
      cv.width = Math.max(2, Math.round(box.clientWidth * scale));
      cv.height = Math.max(2, Math.round(box.clientHeight * scale));
      gl.viewport(0, 0, cv.width, cv.height);
      heroEnd = hero ? hero.offsetTop + hero.offsetHeight : 0;
    };
    var draw = function () {
      if (lost) return;
      gl.uniform2f(uRes, cv.width, cv.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse[0], mouse[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    // Verdeckt? Solange der Hero den ganzen Bildschirm füllt, sieht man die Bänder nicht
    var covered = function () { if (html.classList.contains('intro-leaving')) return true; return !html.classList.contains('intro-on') && heroEnd && w.scrollY + w.innerHeight <= heroEnd + 1; }; // genau bildschirmhoher Hero zählt als verdeckt
    // Handy/Touch: während des Scrollens (und 160 ms danach) ruhen die Bänder – das Scrollen bekommt die GPU allein;
    // bei offenem Vollbild-Menü (body.is-locked) sieht man sie ohnehin nicht
    var scrolling = false, sT = 0;
    if (lite) w.addEventListener('scroll', function () { scrolling = true; clearTimeout(sT); sT = setTimeout(function () { scrolling = false; }, 160); }, { passive: true });
    var idle = function () { return (lite && scrolling) || (d.body && d.body.classList.contains('is-locked')); };
    var frame = function (now) {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (now - last < minDt) return;
      var dt = Math.min(50, now - (prev || now)); prev = now; last = now;
      if (covered() || idle()) return;
      t += dt / 1000 * 0.6;
      mouse[0] += (target[0] - mouse[0]) * 0.05; mouse[1] += (target[1] - mouse[1]) * 0.05;
      draw();
    };
    var start = function () { if (running || reduce || lost) return; running = true; prev = 0; raf = requestAnimationFrame(frame); };
    var stop = function () { running = false; cancelAnimationFrame(raf); };
    measure(); draw();
    box.classList.add('is-ready');
    html.classList.add('has-ambient');
    var rt;
    w.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { measure(); draw(); }, 120); });
    if (fine) w.addEventListener('pointermove', function (e) { target = [e.clientX / w.innerWidth * 2 - 1, -(e.clientY / w.innerHeight * 2 - 1)]; }, { passive: true });
    d.addEventListener('visibilitychange', function () { if (d.hidden) stop(); else start(); });
    cv.addEventListener('webglcontextlost', function (e) { e.preventDefault(); lost = true; stop(); box.classList.remove('is-ready'); html.classList.remove('has-ambient'); });
    start();
    // Hellere Bänder hinter Abschnitten mit data-ambient="bright"
    if ('IntersectionObserver' in w) {
      var brights = $$('[data-ambient="bright"]'), on = [];
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (e) { var i = on.indexOf(e.target); if (e.isIntersecting && i < 0) on.push(e.target); if (!e.isIntersecting && i > -1) on.splice(i, 1); });
        box.classList.toggle('is-bright', on.length > 0);
      }, { rootMargin: '-35% 0px -35% 0px' });
      brights.forEach(function (b) { io.observe(b); });
    }
    return { box: box };
  })();

  /* 2 Logo-Intro – Dach, Hammer-Feld, Schlüssel-Feld, Haus mit Fenster/Pinsel; ca. 3 s, 1× pro Sitzung */
  (function intro() {
    var el = $('[data-intro]');
    var finish = function () {
      html.classList.remove('intro-on', 'intro-leaving');
      html.classList.add('hud-on');
      if (amb) amb.box.style.transform = '';
      resolveIntro();
    };
    if (!introOn || !el || !G || reduce) { finish(); return; }
    var part = function (n) { return $('.intro__part--' + n, el); };
    var words = $$('.intro__word > span > span', el), rule = $('.intro__rule', el), hint = $('.intro__hint', el);
    if (hint && !fine) hint.textContent = 'Tippen zum Überspringen';
    var edge = $('.intro-edge');
    var cut = { v: 0 };
    // Wisch nach oben: Intro + Bänder werden als Ganzes verschoben (transform = GPU, kein Neuzeichnen je Bild)
    var setCut = function () {
      var y = 'translate3d(0,' + (-cut.v).toFixed(2) + '%,0)';
      el.style.transform = y;
      if (amb) amb.box.style.transform = y;
      if (edge) edge.style.transform = 'translate3d(0,' + ((1 - cut.v / 100) * w.innerHeight - 1).toFixed(1) + 'px,0)';
    };
    var heroImg = d.querySelector('[data-hero-media] img');
    if (heroImg && heroImg.decode) heroImg.decode().catch(function () {});
    var tl = A.introTl = G.timeline({ defaults: { ease: 'expo.out' }, onComplete: function () {
      el.style.transform = ''; el.style.willChange = ''; if (amb) { amb.box.style.transform = ''; amb.box.style.willChange = ''; }
      if (edge) edge.style.display = 'none'; finish(); } });
    tl.set(el, { autoAlpha: 1 }, 0)
      .fromTo($('.intro__mark', el), { scale: 0.86 }, { scale: 1, duration: 2.2, ease: 'power2.out' }, 0)
      .fromTo(part('roof'), { opacity: 0, yPercent: -22, rotate: -4 }, { opacity: 1, yPercent: 0, rotate: 0, duration: 0.85 }, 0.1)
      .fromTo(part('orange'), { opacity: 1, clipPath: 'inset(100% 0% 0% 0%)', yPercent: 8 }, { clipPath: 'inset(0% 0% 0% 0%)', yPercent: 0, duration: 0.8 }, 0.45)
      .fromTo(part('graphite'), { opacity: 1, clipPath: 'inset(100% 0% 0% 0%)', yPercent: 8 }, { clipPath: 'inset(0% 0% 0% 0%)', yPercent: 0, duration: 0.8 }, 0.65)
      .fromTo(part('house'), { opacity: 0, xPercent: 14 }, { opacity: 1, xPercent: 0, duration: 0.8 }, 0.85)
      .fromTo(part('orange'), { filter: 'drop-shadow(0 0 0px rgba(242,129,53,0))' }, { filter: 'drop-shadow(0 0 26px rgba(242,129,53,.6))', duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 1.25)
      .fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.inOut' }, 0.95)
      .fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.14 }, 1.2)
      .fromTo(hint, { opacity: 0 }, { opacity: 0.55, duration: 0.4 }, 0.6)
      .to($('.intro__mark', el), { scale: 0.92, duration: 0.45, ease: 'power2.in' }, 2.3)
      .to([rule, words], { opacity: 0, duration: 0.3, ease: 'power1.in' }, 2.35)
      .call(function () { if (edge) edge.style.display = 'block'; el.style.willChange = 'transform'; if (amb) amb.box.style.willChange = 'transform'; html.classList.add('intro-leaving'); }, null, 2.42)
      .to(cut, { v: 100, duration: 0.55, ease: 'expo.inOut', onUpdate: setCut }, 2.45)
      .call(function () { html.classList.add('hud-on'); resolveIntro(); }, null, 2.6);
    var skip = function () {
      if (tl.progress() < 1) tl.progress(1);
      ['keydown', 'pointerdown', 'wheel', 'touchstart'].forEach(function (t) { w.removeEventListener(t, skip); });
    };
    ['keydown', 'pointerdown', 'wheel', 'touchstart'].forEach(function (t) { w.addEventListener(t, skip, { passive: true }); });
  })();

  /* 3 Seitenübergänge (Doku: SPEC „Seitenübergänge“) ------------------------------------------------
     a) Links mit [data-vt] (Karten mit Bild) + Browser mit Cross-Document View Transitions: keine eigene
        Blende – CSS-View-Transition morpht [data-vt-media] → Ziel-Bild (vt-media) und [data-vt-title] →
        Seitentitel (vt-title), die alte Seite fällt weg, die neue öffnet sich in Dielen (site.css 25).
     b) alle übrigen internen Links (und alles in Browsern ohne View Transitions): GSAP-Choreografie –
        Inhalte fallen/skalieren weg, Orange/Schwarz-Dielen schieben sich ein, Name der Zielseite riesig
        (data-pt-label oder Linktext); die neue Seite startet verdeckt (html.pt-in) und öffnet die Dielen,
        erst dann baut sich ihr Titel auf (Alive.introDone).
     c) Prefetch der Zielseite bei Hover/Fokus (zusätzlich Speculation Rules im Layout).
     prefers-reduced-motion: keine Blende, nur das einfache Überblenden des Browsers.                    */
  var VT = !!(w.CSS && CSS.supports && CSS.supports('view-transition-name: a') && 'onpagereveal' in w);
  (function transition() {
    var pt = $('[data-pt]');
    if (!pt) { resolveArrive(); return; }
    var planks = $$('.pt__planks i', pt), label = $('.pt__label', pt), mark = $('.pt__mark', pt);
    var chars = function (txt) {
      label.innerHTML = '';
      (txt || '').split('').forEach(function (ch) { var b = d.createElement('b'); b.textContent = ch === ' ' ? ' ' : ch; label.appendChild(b); });
      return $$('b', label);
    };
    var outEls = function () { return $$('main, .site-footer'); };
    var clear = function () {
      html.classList.remove('pt-in', 'pt-out');
      if (G) { G.set(planks.concat([label, mark]), { clearProps: 'all' }); G.set(outEls(), { clearProps: 'transform,opacity,transformOrigin' }); }
      label.innerHTML = '';
    };
    if (html.classList.contains('pt-in')) {
      var inChars = chars(w.__blPtLabel || '');
      if (G && !reduce) {
        G.timeline({ onComplete: clear })
          .to(inChars, { yPercent: -110, opacity: 0, duration: 0.35, stagger: 0.02, ease: 'power3.in' }, 0)
          .to(mark, { opacity: 0, duration: 0.25 }, 0)
          .fromTo(planks, { x: 0, xPercent: 0 }, { x: 0, xPercent: function (i) { return i % 2 ? 101 : -101; }, duration: 0.7, stagger: 0.045, ease: 'expo.inOut' }, 0.12)
          .call(resolveArrive, null, 0.42);
      } else { clear(); resolveArrive(); }
    } else resolveArrive();
    w.addEventListener('pageshow', function (e) { if (e.persisted) clear(); });

    // Prefetch bei Hover/Fokus (einmal je Ziel)
    var fetched = {};
    var internal = function (a) {
      var href = a && a.getAttribute('href') || '';
      if (!href || href.charAt(0) === '#' || /^(mailto:|tel:|javascript:|data:)/i.test(href) || a.hasAttribute('download') || (a.target && a.target !== '_self')) return null;
      var url; try { url = new URL(a.href, location.href); } catch (err) { return null; }
      if (url.protocol !== location.protocol || url.host !== location.host) return null;
      if (url.pathname === location.pathname && url.search === location.search) return null; // nur Anker
      return url;
    };
    var prefetch = function (e) {
      var a = e.target.closest && e.target.closest('a[href]'), url = internal(a);
      if (!url || location.protocol === 'file:' || fetched[url.pathname]) return;
      fetched[url.pathname] = 1;
      var l = d.createElement('link'); l.rel = 'prefetch'; l.href = url.href; d.head.appendChild(l);
    };
    d.addEventListener('pointerover', prefetch, { passive: true });
    d.addEventListener('focusin', prefetch);

    // View Transition (a): Namen erst im letzten Moment setzen, damit sie eindeutig sind
    var lastVt = null;
    w.addEventListener('pageswap', function (e) {
      if (!e.viewTransition) return;
      if (html.classList.contains('pt-out')) { e.viewTransition.skipTransition(); return; }
      var a = lastVt; lastVt = null;
      if (!a) return;
      var media = null;
      $$('[data-vt-media]', a).forEach(function (m) { if (!media && m.offsetWidth) media = m; });
      var ix = a.closest('[data-index-preview]') && $('.ix-frame.is-open', a.closest('[data-index-preview]'));
      if (!media && ix) media = ix;
      var title = $('[data-vt-title]', a);
      if (media || title) $$('.sub-hero__media, .sub-hero__title .hero__l:first-child').forEach(function (el) { el.style.viewTransitionName = 'none'; }); // statische Namen der Seite nicht doppelt
      a.classList.add('is-vt');
      if (media) media.style.viewTransitionName = 'vt-media';
      if (title) title.style.viewTransitionName = 'vt-title';
    });

    if (!G || reduce) return;
    var busy = false;
    d.addEventListener('click', function (e) {
      if (busy || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest('a[href]'), url = internal(a);
      if (!url) return;
      if (VT && a.hasAttribute('data-vt') && location.protocol !== 'file:') { lastVt = a; return; } // (a) Browser übernimmt
      e.preventDefault();
      busy = true;
      var txt = (a.getAttribute('data-pt-label') || a.textContent || '').replace(/\s+/g, ' ').trim();
      if (txt.length > 18) txt = '';
      var cs = chars(txt), outs = outEls();
      html.classList.add('pt-out');
      G.set(outs, { transformOrigin: '50% ' + Math.round(w.scrollY + w.innerHeight / 2) + 'px' });
      G.timeline({ onComplete: function () {
        try { if (store) store.setItem('blesius-pt', '1|' + txt); } catch (err) { /* egal */ }
        location.href = url.href;
        setTimeout(function () { busy = false; }, 1500);
      } })
        .to(outs, { scale: 0.93, yPercent: 1.5, opacity: 0.35, duration: 0.6, ease: 'power3.in' }, 0)
        .fromTo(planks, { x: 0, xPercent: function (i) { return i % 2 ? -101 : 101; } }, { x: 0, xPercent: 0, duration: 0.6, stagger: 0.045, ease: 'expo.inOut' }, 0.05)
        .fromTo(mark, { opacity: 0, y: 12 }, { opacity: 0.9, y: 0, duration: 0.3 }, 0.45)
        .fromTo(cs, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.45, stagger: 0.03, ease: 'expo.out' }, 0.42)
        .to({}, { duration: 0.12 });
    });
  })();

  /* 4 HUD – Eckwinkel, Aufmaß-Koordinaten, Uhrzeit Europe/Berlin, Öffnungsstatus, Maßband ---------- */
  var HOURS = [[450, 1020], [450, 1020], [450, 1020], [450, 1020], [450, 1020], [480, 840], null]; // Mo … So, Minuten
  var DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  var hm = function (m) { return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + m % 60).slice(-2); };
  var berlin = (function () {
    var f = null;
    try { f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }); } catch (e) { f = null; }
    var tz = null;
    try { tz = new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', timeZoneName: 'short' }); } catch (e) { tz = null; }
    var idx = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
    return function (date) {
      if (!f) return null;
      var o = {};
      f.formatToParts(date).forEach(function (p) { o[p.type] = p.value; });
      var zone = '';
      if (tz) tz.formatToParts(date).forEach(function (p) { if (p.type === 'timeZoneName') zone = p.value; });
      var h = +o.hour % 24, m = +o.minute;
      return { day: idx[o.weekday], mins: h * 60 + m, text: ('0' + h).slice(-2) + ':' + o.minute, zone: zone };
    };
  })();
  A.openStatus = function (date) {
    var b = berlin(date || new Date());
    if (!b) return null;
    var today = HOURS[b.day];
    if (today && b.mins >= today[0] && b.mins < today[1]) return { open: true, text: 'Jetzt geöffnet bis ' + hm(today[1]) };
    if (today && b.mins < today[0]) return { open: false, text: 'Öffnet heute ' + hm(today[0]) };
    for (var i = 1; i <= 7; i++) {
      var nd = (b.day + i) % 7, h = HOURS[nd];
      if (h) return { open: false, text: 'Öffnet ' + (i === 1 ? 'morgen' : DAYS[nd]) + ' ' + hm(h[0]) };
    }
    return null;
  };

  (function hud() {
    var el = $('[data-hud]'), tape = $('[data-tape] i');
    var clock = el && $('[data-hud-clock]', el), open = el && $('[data-hud-open]', el), meter = el && $('[data-hud-meter]', el), layer = el && $('[data-hud-layer]', el);
    var setHud = function () { html.classList.toggle('has-hud', !!el && desk()); };
    setHud(); w.addEventListener('resize', setHud);
    // Uhr + Öffnungsstatus (Text, keine Bewegung – läuft auch bei reduzierter Bewegung)
    if (el) {
      var tick = function () {
        if (!html.classList.contains('has-hud')) return;
        var now = new Date(), b = berlin(now), s = A.openStatus(now), c = b ? b.text + (b.zone ? ' ' + b.zone : '') : '';
        if (clock && c && clock.textContent !== c) clock.textContent = c;
        if (s && open && open.textContent !== s.text) { open.textContent = s.text; open.parentNode.classList.toggle('is-open', s.open); }
      };
      tick(); setInterval(tick, 5000); w.addEventListener('resize', tick);
    }
    // Maßband oben + Zähler „gemessene Strecke“ (Scrollweg in cm, 96 px = 2,54 cm)
    var ticking = false;
    var upd = function () {
      ticking = false;
      var max = d.documentElement.scrollHeight - w.innerHeight, y = Math.max(0, w.scrollY);
      if (tape) tape.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0).toFixed(4) + ')';
      var end = max > 0 && max - y < 160;
      if (end !== html.classList.contains('hud-end')) html.classList.toggle('hud-end', end);
      if (meter && html.classList.contains('has-hud')) {
        var cm = y * 2.54 / 96;
        meter.textContent = cm < 100 ? cm.toFixed(1).replace('.', ',') + ' cm' : (cm / 100).toFixed(2).replace('.', ',') + ' m';
      }
    };
    w.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    w.addEventListener('resize', upd); upd();
    // Aktuelle Schicht (Abschnitt in der Bildschirmmitte)
    if (layer && 'IntersectionObserver' in w) {
      var cur = null;
      var io = new IntersectionObserver(function (en) {
        en.forEach(function (e) {
          if (!e.isIntersecting) return;
          var txt = e.target.getAttribute('data-layer');
          if (txt && txt !== cur) { cur = txt; scramble(layer, txt); }
        });
      }, { rootMargin: '-50% 0px -50% 0px' });
      $$('[data-layer]').forEach(function (s) { io.observe(s); });
    }
  })();

  /* 5 Schicht-Labels .layer – Maßlinie zieht sich auf, Text „rechnet“ kurz ----------------------- */
  var GLYPHS = 'ABCDEFGHKLMNOPRSTUVWXZ0123456789·/';
  function scramble(el, text) {
    if (reduce) { el.textContent = text; return; }
    clearInterval(el._scr);
    var n = 0, steps = 14;
    el._scr = setInterval(function () {
      n++;
      var keep = Math.floor(text.length * n / steps);
      el.textContent = text.split('').map(function (ch, i) {
        if (i < keep || ch === ' ' || ch === '·') return ch;
        return GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length));
      }).join('');
      if (n >= steps) { clearInterval(el._scr); el.textContent = text; }
    }, 38);
  }
  (function layers() {
    var list = $$('.layer');
    if (!list.length) return;
    if (reduce || !('IntersectionObserver' in w)) { list.forEach(function (l) { l.classList.add('is-in'); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        e.target.classList.add('is-in');
        var name = $('.layer__name', e.target);
        if (name) scramble(name, name.textContent);
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    list.forEach(function (l) { io.observe(l); });
  })();

  /* 6 Eigener Cursor (nur Maus) – Punkt, Ring über Links, Label über [data-cursor="…"] -------------- */
  (function cursor() {
    var c = $('[data-cursor-el]');
    if (!c || !fine || reduce || !G) return;
    var label = $('span', c);
    html.classList.add('has-cursor');
    var x = G.quickTo(c, 'x', { duration: 0.3, ease: 'power3' }), y = G.quickTo(c, 'y', { duration: 0.3, ease: 'power3' });
    var shown = false;
    w.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      if (!shown) { G.set(c, { x: e.clientX, y: e.clientY }); shown = true; c.classList.remove('is-hidden'); }
      x(e.clientX); y(e.clientY);
    }, { passive: true });
    d.addEventListener('pointerover', function (e) {
      var t = e.target;
      var lab = t.closest && t.closest('[data-cursor]');
      var text = lab ? lab.getAttribute('data-cursor') : '';
      var field = t.closest && t.closest('input, textarea, select');
      var link = !text && t.closest && t.closest('a, button, summary, label, [role="button"]');
      label.textContent = text;
      c.classList.toggle('is-label', !!text);
      c.classList.toggle('is-link', !!link);
      c.classList.toggle('is-field', !!field && !text);
    });
    d.documentElement.addEventListener('mouseleave', function () { c.classList.add('is-hidden'); shown = false; });
    d.addEventListener('pointerdown', function () { G.fromTo(c, { scale: 1 }, { scale: 0.82, duration: 0.12, yoyo: true, repeat: 1 }); });
  })();

  /* 7 Lichtschein folgt der Maus [data-glow] + Hover-Verzerrung [data-distort] -------------------- */
  if (fine) {
    var glowEl = null;
    d.addEventListener('pointermove', function (e) {
      var g = e.target.closest && e.target.closest('[data-glow]');
      if (glowEl && glowEl !== g) glowEl.style.setProperty('--glow', 0);
      glowEl = g;
      if (!g) return;
      var r = g.getBoundingClientRect();
      g.style.setProperty('--mx', (e.clientX - r.left).toFixed(0) + 'px');
      g.style.setProperty('--my', (e.clientY - r.top).toFixed(0) + 'px');
      g.style.setProperty('--glow', 1);
    }, { passive: true });
    d.addEventListener('pointerleave', function () { if (glowEl) glowEl.style.setProperty('--glow', 0); });
  }
  (function distort() {
    var disp = $('#bl-distort feDisplacementMap');
    if (!disp || !fine || reduce || !G) return;
    var tw = null;
    $$('[data-distort]').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        $$('[data-distort].is-warp').forEach(function (o) { o.classList.remove('is-warp'); });
        el.classList.add('is-warp');
        if (tw) tw.kill();
        tw = G.fromTo(disp, { attr: { scale: 38 } }, { attr: { scale: 0 }, duration: 1.1, ease: 'expo.out', onComplete: function () { el.classList.remove('is-warp'); } });
      });
    });
  })();
})();

/* handwerker-blesius.de – Motion-System (GSAP 3.13 + ScrollTrigger + SplitText, Lenis, stage.js)
   Wiederverwendbar über data-Attribute, Doku: SPEC.md „## Motion-System“.
   Grundsätze (tasteskill): nur transform/opacity/clip-path; Inhalte sind ohne JS und bei
   prefers-reduced-motion sofort sichtbar (Startzustände setzt erst dieses Skript); Reveals einmalig;
   keine Wheel-Übernahme (Lenis nur Maus/Trackpad). Cursor, Logo-Intro, HUD, Bänder-Hintergrund und
   Seitenübergang liegen in alive.js (läuft vorher; die Hero-Sequenz wartet auf Alive.introDone).
   Module:  smooth · velocity/lean · hero (Buchstaben-Einflug, wdth-Atmen) · split (Einflug, Atmen, Abbau,
            Licht-Sweep) · reveal · shutter (inset/planks/diagonal) · parallax+zoom · tilt · roll · Wortbänder ·
            draw · index-preview · sticky-cta · Leistungs-Laufband · Buttons (Roll, Magnet) ·
            scenes (opening, story, kinetic, strip, planks)                                     */
(function () {
  'use strict';
  var d = document, html = d.documentElement, w = window;
  var mq = function (q) { return !!(w.matchMedia && w.matchMedia(q).matches); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var reduce = mq('(prefers-reduced-motion: reduce)');
  var fine = mq('(hover: hover) and (pointer: fine)');
  var G = w.gsap, ST = w.ScrollTrigger, SPLIT = w.SplitText;
  var live = !!(G && ST) && !reduce;
  var pendingLate = !html.classList.contains('motion-pending'); // Sicherheits-Timeout im <head> schon abgelaufen?
  var EXPO = 'expo.out', INOUT = 'power3.inOut';
  var fontsReady = d.fonts && d.fonts.ready ? d.fonts.ready : Promise.resolve(); // SplitText erst mit echten Schriften
  var clamp = function (a, b, v) { return Math.max(a, Math.min(b, v)); };
  var deskW = function () { return mq('(min-width: 1024px)'); };   // schwere Typo-Effekte nur hier
  var phoneQ = function () { return mq('(max-width: 767px)'); };   // wie stage.js „phone“
  var headerH = function () { var h = d.querySelector('[data-header]'); return h ? h.offsetHeight : 0; };

  var M = w.Motion = { live: live, lenis: null };
  // Anteil 0–1 der geplanten Breiten-Animation, der in die verfügbare Breite passt (breiteste Zeile gemessen
  // bei wdth 62 und bei der Ziel-Breite). box = Element mit der verfügbaren Breite, rows = Zeilen-Elemente.
  var roomFor = function (el, box, rows, wdth, ls) {
    var widest = function () { var m = 0; rows.forEach(function (r) {
      var cs = r.querySelectorAll('.m-char'), a = cs[0], b = cs[cs.length - 1], wd;
      if (a && b) wd = b.getBoundingClientRect().right - a.getBoundingClientRect().left;
      else { var rg = d.createRange(); rg.selectNodeContents(r); wd = rg.getBoundingClientRect().width; }
      m = Math.max(m, wd); }); return m; };
    var fv = el.style.fontVariationSettings, lsp = el.style.letterSpacing;
    var w0 = widest();
    el.style.fontVariationSettings = '"wdth" ' + wdth; el.style.letterSpacing = ls + 'em';
    var w1 = widest();
    el.style.fontVariationSettings = fv; el.style.letterSpacing = lsp;
    var avail = box.clientWidth * 0.97 - 4; // Rest: Zeilenversatz ±1,5 %
    if (w1 <= avail || w1 <= w0) return 1;
    return clamp(0, 1, (avail - w0) / (w1 - w0));
  };
  if (live) {
    G.registerPlugin(ST);
    if (SPLIT) G.registerPlugin(SPLIT);
    html.classList.add('has-motion');
  }

  /* 1 Smooth Scroll (Lenis) – nur Maus/Trackpad, nie Touch oder reduced-motion -------------------- */
  if (live && w.Lenis && fine) {
    var lenis = M.lenis = new w.Lenis({ lerp: 0.1, smoothWheel: true, autoRaf: false });
    lenis.on('scroll', ST.update);
    G.ticker.add(function (t) { lenis.raf(t * 1000); });
    G.ticker.lagSmoothing(0);
    html.classList.add('is-smooth');
    if (w.Stage) w.Stage.lenis = lenis;
    // Ankerlinks weich, mit Abstand für den Sticky-Header
    d.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      var id = a.getAttribute('href').slice(1), t = id && d.getElementById(id);
      if (!t) return;
      e.preventDefault();
      lenis.scrollTo(t, { offset: -headerH() - 16, duration: 1.2 });
      if (history.pushState) history.pushState(null, '', '#' + id);
      t.setAttribute('tabindex', t.getAttribute('tabindex') || '-1');
      t.focus({ preventScroll: true });
    });
  }

  /* Hilfen ---------------------------------------------------------------------------------- */
  var firstMedia = function (el) { return el.querySelector('img, video'); };
  var once = function (el, start, fn) {
    return ST.create({ trigger: el, start: start || 'top 88%', once: true, onEnter: fn });
  };

  /* 1b Scroll-Geschwindigkeit (global): M.vel in px/s, geglättet. Überschriften in Sicht neigen sich
        minimal (skewY ≤ 1,4°), Wortbänder stärker (skewX ≤ 9°, siehe 8). M.lean(el) meldet ein Element an. */
  M.vel = 0;
  M.lean = function () {};
  if (live) {
    var lastY = w.scrollY, vs = 0, lastSk = 0, leaning = [];
    var lio = 'IntersectionObserver' in w ? new IntersectionObserver(function (en) {
      en.forEach(function (e) {
        var i = leaning.indexOf(e.target);
        if (e.isIntersecting && i < 0) leaning.push(e.target);
        else if (!e.isIntersecting && i > -1) { leaning.splice(i, 1); G.set(e.target, { skewY: 0 }); }
      });
    }) : null;
    M.lean = function (el) { if (lio && el) lio.observe(el); };
    G.ticker.add(function (t, dt) {
      var y = w.scrollY, v = dt > 0 ? (y - lastY) / dt * 1000 : 0;
      lastY = y;
      if (Math.abs(v) > 12000) v = 0; // Sprünge (Anker, Neuladen) zählen nicht
      vs += (v - vs) * 0.12;
      if (Math.abs(vs) < 2) vs = 0;
      M.vel = vs;
      var sk = clamp(-1.4, 1.4, -vs / 2200);
      if (Math.abs(sk - lastSk) > 0.01 || (sk === 0 && lastSk !== 0)) {
        lastSk = sk;
        for (var i = 0; i < leaning.length; i++) G.set(leaning[i], { skewY: sk });
      }
    });
  }

  /* 2 Hero [data-hero] – Buchstaben fliegen einzeln ein (Maske je Zeile), danach „atmet“ die H1 beim
       Scrollen (wdth 62→92 + Laufweite, nur ≥ 1024 px), Zeilen schieben sich gegeneinander; Bild legt
       sich in einen Rahmen. Kinder: data-hero-media, data-hero-lines (> .hero__l je Zeile), data-hero-load,
       data-hero-copy.                                                                                   */
  $$('[data-hero]').forEach(function (hero) {
    if (!live) return;
    var media = hero.querySelector('[data-hero-media]'), pic = media && firstMedia(media);
    var lines = hero.querySelector('[data-hero-lines]'), loads = $$('[data-hero-load]', hero);
    var copy = hero.querySelector('[data-hero-copy]');
    if (pic) G.set(pic, { scale: 1.1 });
    var breathe = function () {
      var st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.5 }, shift = [-7, 6, -10];
      $$('.hero__l', hero).forEach(function (l, i) { G.to(l, { xPercent: shift[i % 3], ease: 'none', scrollTrigger: st }); });
      if (lines && deskW()) {
        var br = { p: 0 }, f = roomFor(lines, lines, $$('.hero__l', lines), 92, 0.026);
        if (f > 0.05) G.to(br, { p: 1, ease: 'none', scrollTrigger: st, onUpdate: function () {
          lines.style.fontVariationSettings = '"wdth" ' + (62 + 30 * f * br.p).toFixed(1);
          lines.style.letterSpacing = (-0.004 + 0.03 * f * br.p).toFixed(4) + 'em';
        } });
      }
      var em = hero.querySelector('em.glow');
      if (em) em.classList.add('is-sweep');
      M.lean(lines);
    };
    var introDone = w.Alive && w.Alive.introDone ? w.Alive.introDone : null;
    Promise.all([fontsReady, introDone]).then(function () {
      if (pendingLate || !html.classList.contains('motion-pending')) { if (pic) G.set(pic, { scale: 1.02 }); breathe(); return; }
      var tl = G.timeline({ defaults: { ease: EXPO } });
      if (lines && SPLIT) {
        lines.classList.add('is-masking');
        var s = SPLIT.create(lines, { type: 'words,chars', charsClass: 'm-char', aria: 'none' });
        tl.fromTo(s.chars, { yPercent: 122, rotate: 9, transformOrigin: '0% 100%' }, { yPercent: 0, rotate: 0, duration: 0.95, stagger: { amount: 0.5 },
          onComplete: function () { s.revert(); lines.classList.remove('is-masking'); breathe(); } }, 0.06);
      } else breathe();
      if (loads.length) tl.from(loads, { y: 16, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, 0.62);
      if (pic) tl.to(pic, { scale: 1.02, duration: 1.4 }, 0);
      html.classList.remove('motion-pending');
    });
    if (!pic) return;
    var drift = G.to(pic, { scale: 1.07, xPercent: -1.2, duration: 16, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.4, paused: true });
    ST.create({ trigger: hero, start: 'top bottom', end: 'bottom top', onToggle: function (self) { self.isActive ? drift.play() : drift.pause(); } });
    var st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
    G.fromTo(media, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(4% 3% 10% 3%)', yPercent: 6, opacity: 0.55, ease: 'none', scrollTrigger: st });
    if (copy) G.to(copy, { yPercent: -10, opacity: 0, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: '70% top', scrub: true } });
  });
  if (!live || !d.querySelector('[data-hero]')) html.classList.remove('motion-pending');

  /* 3 Überschriften [data-split] – Buchstaben steigen gestaffelt aus ihrer Zeilenmaske; danach reagieren sie
       dauerhaft aufs Scrollen: Breite atmet (wdth 62→72→62 + Laufweite) und Zeilen versetzen sich (≥ 1024 px),
       beim Verlassen nach oben bauen sich die Buchstaben wieder ab (scrub); das Akzentwort <em> leuchtet beim
       Eintreten auf und bekommt alle paar Sekunden einen Licht-Sweep über die Buchstaben.
       In gehaltenen Szenen nur Einflug + Sweep. ="fill": Wörter füllen sich beim Scrollen.               */
  var splits = [];
  var ORANGE_INK = '#F59A5E', BRIGHT = '#FFF0E2';
  var makeSplit = function (o) {
    o.s = SPLIT.create(o.el, { type: 'lines,words,chars', mask: 'lines', linesClass: 'm-line', charsClass: 'm-char' });
    o.em = o.s.chars.filter(function (c) { return c.closest('em'); });
  };
  var killO = function (o) { (o.tw || []).forEach(function (t) { if (t.scrollTrigger) t.scrollTrigger.kill(); t.kill(); }); o.tw = []; };
  var sweep = function (o) {
    if (!o.em.length) return;
    G.fromTo(o.em, { color: BRIGHT, textShadow: '0 0 10px rgba(255,170,110,.7)' }, { color: ORANGE_INK, textShadow: '0 0 0px rgba(255,160,90,0)', duration: 1.4, stagger: 0.05, ease: 'power2.out' });
    var tl = G.timeline({ repeat: -1, repeatDelay: 3.4, delay: 2.4, paused: true });
    tl.to(o.em, { color: BRIGHT, textShadow: '0 0 10px rgba(255,170,110,.65)', duration: 0.2, stagger: 0.05, ease: 'power2.out' }, 0)
      .to(o.em, { color: ORANGE_INK, textShadow: '0 0 0px rgba(255,160,90,0)', duration: 0.5, stagger: 0.05, ease: 'power2.in' }, 0.2);
    o.tw.push(tl, ST.create({ trigger: o.el, start: 'top bottom', end: 'bottom top', onToggle: function (s) { s.isActive ? tl.play() : tl.pause(); } }));
  };
  var scrubO = function (o) {
    if (o.scene) return;
    // Abbau beim Verlassen nach oben
    o.tw.push(G.fromTo(o.s.chars, { yPercent: 0, opacity: 1 }, { yPercent: -100, opacity: 0, stagger: 0.02, ease: 'power1.in', immediateRender: false,
      scrollTrigger: { trigger: o.el, start: 'top 16%', end: 'bottom -8%', scrub: 0.4 } }));
    if (!deskW()) return;
    o.tw.push(G.fromTo(o.s.masks || [], { xPercent: function (i) { return i % 2 ? -1.5 : 1.5; } }, { xPercent: function (i) { return i % 2 ? 1.5 : -1.5; }, ease: 'none',
      scrollTrigger: { trigger: o.el, start: 'top bottom', end: 'bottom top', scrub: 0.6 } }));
    var vf = { p: 0 }, el = o.el, f = roomFor(el, el, o.s.lines || [], 72, 0.012);
    if (f < 0.05) return;
    o.tw.push(G.to(vf, { p: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.5 }, onUpdate: function () {
      var k = Math.sin(vf.p * Math.PI) * f;
      el.style.fontVariationSettings = '"wdth" ' + (62 + 10 * k).toFixed(1);
      el.style.letterSpacing = (0.012 * k).toFixed(4) + 'em';
    } }));
  };
  var enter = function (o) {
    o.tw.push(G.to(o.s.chars, { yPercent: 0, rotate: 0, duration: 0.9, stagger: { each: 0.014 }, ease: EXPO, onComplete: function () {
      o.done = true; o.el.classList.add('is-lit'); sweep(o); scrubO(o);
    } }));
  };
  var prepSplit = function (o) {
    makeSplit(o);
    o.tw = [];
    if (o.done) { o.el.classList.add('is-lit'); sweep(o); scrubO(o); return; }
    G.set(o.s.chars, { yPercent: 118, rotate: 6, transformOrigin: '0% 100%' });
    o.tw.push(once(o.el, 'top 88%', function () { enter(o); }));
  };
  if (live && SPLIT) fontsReady.then(function () {
    $$('[data-split]').forEach(function (el) {
      if (el.getAttribute('data-split') === 'fill') {
        if (el.closest('.scene.is-live')) return; // Kinetic-Szene erzählt den Satz selbst
        var s = SPLIT.create(el, { type: 'words', wordsClass: 'm-word' });
        el.classList.add('is-filling');
        G.fromTo(s.words, { opacity: 0.16 }, { opacity: 1, stagger: 0.1, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 50%', scrub: true } });
        return;
      }
      var o = { el: el, done: false, scene: !!el.closest('.scene'), tw: [] };
      prepSplit(o);
      splits.push(o);
      if (!o.scene) M.lean(el);
    });
    var lastW = w.innerWidth, rt;
    w.addEventListener('resize', function () {
      if (w.innerWidth === lastW) return;
      lastW = w.innerWidth; clearTimeout(rt);
      rt = setTimeout(function () {
        splits.forEach(function (o) { killO(o); o.s.revert(); o.el.style.fontVariationSettings = ''; o.el.style.letterSpacing = ''; prepSplit(o); });
        ST.refresh();
      }, 200);
    });
    ST.refresh();
  });

  /* 4 Reveals [data-reveal] (up|fade|scale) und [data-stagger] (Kinder nacheinander) ------------ */
  var revealed = [];
  if (live) {
    var items = $$('[data-reveal], [data-stagger] > *');
    items.forEach(function (el) {
      var p = el.parentElement && el.parentElement.hasAttribute('data-stagger') && !el.hasAttribute('data-reveal');
      var kind = p ? 'up' : (el.getAttribute('data-reveal') || 'up');
      G.set(el, kind === 'fade' ? { opacity: 0 } : kind === 'scale' ? { opacity: 0, scale: 0.96 } : { opacity: 0, y: 24 });
      revealed.push(el);
    });
    if (items.length) ST.batch(items, {
      start: 'top 90%', once: true, interval: 0.1,
      onEnter: function (batch) { G.to(batch, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: EXPO, stagger: 0.08, delay: 0.1, overwrite: true }); }
    });
  }

  /* 5 Bildöffnung [data-shutter] (="planks": versetzte Dielen-Streifen, ="diagonal": schräger Wisch)
     + 6 [data-parallax]: Bild driftet und zoomt beim Scrollen leicht heran -------------------------- */
  var plankClip = function (p, n, off) {
    var pts = ['0% 0%'];
    for (var i = 0; i < n; i++) {
      var x = Math.max(0, Math.min(1, p * (1 + (n - 1) * off) - i * off)) * 100;
      pts.push(x + '% ' + (i / n * 100) + '%', x + '% ' + ((i + 1) / n * 100) + '%');
    }
    pts.push('0% 100%');
    return 'polygon(' + pts.join(',') + ')';
  };
  var diagClip = function (p) {
    var a = clamp(0, 100, p * 145), b = clamp(0, 100, p * 145 - 45);
    return 'polygon(0% 0%,' + a + '% 0%,' + b + '% 100%,0% 100%)';
  };
  $$('[data-parallax], [data-shutter]').forEach(function (frame) {
    if (!live) return;
    var pic = firstMedia(frame);
    if (!pic && !frame.hasAttribute('data-shutter')) return;
    var amt = Math.min(0.08, parseFloat(frame.getAttribute('data-parallax')) || 0.06);
    var hasPx = frame.hasAttribute('data-parallax'), base = hasPx ? 1 + amt * 2 + 0.02 : 1;
    if (hasPx && pic) {
      G.fromTo(pic, { yPercent: -amt * 100, scale: base + 0.08 }, { yPercent: amt * 100, scale: base, ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } });
    }
    if (!frame.hasAttribute('data-shutter')) return;
    var mode = frame.getAttribute('data-shutter');
    var n = parseInt(frame.getAttribute('data-rows'), 10) || 5, prog = { p: 0 };
    var set = function () {
      frame.style.clipPath = mode === 'planks' ? plankClip(prog.p, n, 0.16) : mode === 'diagonal' ? diagClip(prog.p) : 'inset(0 0 ' + (100 - prog.p * 100) + '% 0)';
    };
    set();
    if (!hasPx && pic) G.set(pic, { scale: 1.08 });
    revealed.push(frame);
    once(frame, 'top 88%', function () {
      G.to(prog, { p: 1, duration: mode === 'planks' ? 1.3 : mode === 'diagonal' ? 1.4 : 1.1, ease: INOUT, onUpdate: set, onComplete: function () { frame.style.clipPath = ''; } });
      if (!hasPx && pic) G.to(pic, { scale: 1, duration: 1.5, ease: 'power2.out', onComplete: function () { G.set(pic, { clearProps: 'transform,scale' }); } });
    });
  });

  /* 6b Kippen [data-tilt]: Karte kippt beim Hereinscrollen aus der Tiefe (3D, scrub);
        [data-tilt-hover]: folgt auf Hover der Maus (nur Maus). Im Projekte-Streifen kippt die Szene. */
  $$('[data-tilt]').forEach(function (fig, i) {
    if (!live) return;
    if (fig.closest('[data-scene="strip"]') && !phoneQ()) return;
    var a = phoneQ() ? 0.5 : 1;
    G.fromTo(fig, { rotateX: 16 * a, rotateY: (i % 2 ? -7 : 7) * a, y: 60 * a, transformPerspective: 1100, transformOrigin: '50% 100%' },
      { rotateX: 0, rotateY: 0, y: 0, ease: 'none', scrollTrigger: { trigger: fig, start: 'top bottom', end: 'top 55%', scrub: 0.6 } });
  });
  if (live && fine) $$('[data-tilt-hover]').forEach(function (el) {
    G.set(el, { transformPerspective: 900 });
    var rx = G.quickTo(el, 'rotationX', { duration: 0.7, ease: 'power3' }), ry = G.quickTo(el, 'rotationY', { duration: 0.7, ease: 'power3' });
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 12); rx(-((e.clientY - r.top) / r.height - 0.5) * 9);
    });
    el.addEventListener('pointerleave', function () { rx(0); ry(0); });
  });

  /* 7 Rollende Ziffern [data-roll] – jede Ziffer rollt einmal komplett durch (0–9) und rastet auf ihrem
       Wert ein; nur echte Werte (1.000 €, 5 Schritte, 7 Orte). Zahl bleibt für Screenreader im Text.     */
  $$('[data-roll]').forEach(function (el) {
    if (!live) return;
    var value = el.textContent.trim(), cols = [];
    var said = d.createElement('span'); said.className = 'sr-only'; said.textContent = value;
    var shown = d.createElement('span'); shown.className = 'roll'; shown.setAttribute('aria-hidden', 'true');
    value.split('').forEach(function (ch) {
      if (!/\d/.test(ch)) { shown.appendChild(d.createTextNode(ch)); return; }
      var col = d.createElement('span'), strip = d.createElement('span');
      col.className = 'roll__col'; strip.className = 'roll__strip';
      for (var n = 0; n < 20; n++) { var s = d.createElement('span'); s.textContent = n % 10; strip.appendChild(s); }
      col.appendChild(strip); shown.appendChild(col); cols.push({ strip: strip, v: +ch });
    });
    el.textContent = ''; el.appendChild(said); el.appendChild(shown);
    once(el, 'top 90%', function () {
      cols.forEach(function (c, i) { G.to(c.strip, { yPercent: -(10 + c.v) * 5, duration: 1.6 + i * 0.12, delay: i * 0.08, ease: 'expo.inOut' }); });
    });
  });

  /* 8 Wortbänder [data-marquee] – riesige Versalien, mehrere pro Seite; je .marquee__track eine Zeile
       (data-dir="-1" = gegenläufig). Tempo und Richtung folgen der Scroll-Geschwindigkeit, die Zeilen
       neigen sich (skewX) nach Tempo; Hover bremst, außerhalb des Bildschirms Pause.                      */
  var bands = [];
  $$('[data-marquee]').forEach(function (band) {
    if (!live) return;
    var b = { on: false, slow: false, speed: parseFloat(band.getAttribute('data-marquee-speed')) || 40, tracks: [] };
    $$('.marquee__track', band).forEach(function (track) {
      if (track.firstElementChild) b.tracks.push({ track: track, set: track.firstElementChild, x: 0, w: 0, copies: 1, dir: +(track.getAttribute('data-dir') || 1) });
    });
    var measure = function () {
      b.tracks.forEach(function (t) {
        t.w = t.set.offsetWidth;
        while (t.copies * t.w < w.innerWidth * 2 && t.w > 0 && t.copies < 8) { t.track.appendChild(t.set.cloneNode(true)); t.copies++; }
      });
    };
    measure(); fontsReady.then(measure);
    w.addEventListener('resize', measure);
    band.addEventListener('pointerenter', function () { b.slow = true; });
    band.addEventListener('pointerleave', function () { b.slow = false; });
    ST.create({ trigger: band, start: 'top bottom', end: 'bottom top', onToggle: function (s) { b.on = s.isActive; } });
    bands.push(b);
  });
  if (bands.length) {
    var bdir = 1, bsk = 0;
    G.ticker.add(function (t, dt) {
      var v = M.vel;
      if (Math.abs(v) > 30) bdir = v > 0 ? 1 : -1;
      var boost = Math.min(7, Math.abs(v) / 260);
      bsk += (clamp(-9, 9, -v / 200) - bsk) * 0.2;
      bands.forEach(function (b) {
        if (!b.on) return;
        var f = b.slow ? 0.2 : 1;
        b.tracks.forEach(function (tr) {
          if (!tr.w) return;
          tr.x = (tr.x - b.speed * (1 + boost) * bdir * tr.dir * f * dt / 1000) % tr.w;
          if (tr.x > 0) tr.x -= tr.w;
          tr.track.style.transform = 'translate3d(' + tr.x.toFixed(2) + 'px,0,0) skewX(' + bsk.toFixed(2) + 'deg)';
        });
      });
    });
  }

  /* 9 SVG zeichnen [data-draw]: [data-draw-line] (pathLength="1"), [data-draw-dot], [data-draw-fade] */
  $$('[data-draw]').forEach(function (el) {
    if (!live) return;
    var lns = $$('[data-draw-line]', el), dots = $$('[data-draw-dot]', el), fades = $$('[data-draw-fade], [data-draw-label]', el);
    G.set(lns, { strokeDasharray: 1, strokeDashoffset: 1 });
    G.set(dots, { scale: 0, transformOrigin: '50% 50%' });
    G.set(fades, { opacity: 0 });
    once(el, 'top 80%', function () {
      var tl = G.timeline();
      tl.to($$('[data-draw-fade]', el), { opacity: 1, duration: 0.6, stagger: 0.1 }, 0)
        .to(lns, { strokeDashoffset: 0, duration: 0.7, stagger: 0.12, ease: INOUT }, 0.2)
        .to(dots, { scale: 1, duration: 0.4, stagger: 0.12, ease: 'power3.out' }, 0.6)
        .to($$('[data-draw-label]', el), { opacity: 1, duration: 0.4, stagger: 0.12 }, 0.65);
    });
  });

  /* 10 Liste mit Vorschau [data-index-preview] – Bild öffnet sich auf Höhe der Zeile (nicht am Cursor) */
  $$('[data-index-preview]').forEach(function (root) {
    var desk = function () { return mq('(hover: hover) and (pointer: fine) and (min-width: 1024px)'); };
    var rows = $$('a', root).filter(function (a) { return a.closest('[data-index-preview]') === root; });
    var frame = d.createElement('div'); frame.className = 'ix-frame'; frame.setAttribute('aria-hidden', 'true');
    var pics = rows.map(function (a) {
      var src = a.querySelector('[data-preview] img'), box = d.createElement('div');
      box.className = 'ix-frame__pic';
      if (src) { box.appendChild((src.closest('picture') || src).cloneNode(true)); $$('img', box).forEach(function (i) { i.alt = ''; i.loading = 'eager'; i.removeAttribute('style'); }); }
      frame.appendChild(box);
      return src ? box : null;
    });
    root.appendChild(frame);
    var show = function (i) {
      if (!desk()) return;
      var row = rows[i], pic = pics[i];
      pics.forEach(function (p) { if (p) p.classList.toggle('is-on', p === pic); });
      if (!pic) { frame.classList.remove('is-open'); return; }
      var y = row.offsetTop + row.offsetHeight / 2 - frame.offsetHeight / 2;
      y = Math.max(0, Math.min(root.offsetHeight - frame.offsetHeight, y));
      var opening = !frame.classList.contains('is-open');
      if (opening) frame.style.transition = 'clip-path .4s cubic-bezier(.22,1,.36,1)';
      frame.style.transform = 'translate3d(0,' + y + 'px,0)';
      if (opening) { frame.getBoundingClientRect(); frame.style.transition = ''; }
      frame.classList.add('is-open');
      root.classList.add('is-hovering');
    };
    var hide = function () { frame.classList.remove('is-open'); root.classList.remove('is-hovering'); };
    rows.forEach(function (row, i) {
      row.addEventListener('pointerenter', function () { show(i); });
      row.addEventListener('focus', function () { show(i); });
    });
    root.addEventListener('pointerleave', hide);
    root.addEventListener('focusout', function (e) { if (!root.contains(e.relatedTarget)) hide(); });
  });

  /* 11 Schwebender Handlungsknopf [data-sticky-cta] (data-sticky-after / data-sticky-hide = Selektor) */
  $$('[data-sticky-cta]').forEach(function (btn) {
    var after = d.querySelector(btn.getAttribute('data-sticky-after') || '[data-hero]');
    var stop = d.querySelector(btn.getAttribute('data-sticky-hide') || '#kontakt');
    var ticking = false;
    var upd = function () {
      ticking = false;
      var past = after ? after.getBoundingClientRect().bottom < 0 : w.scrollY > w.innerHeight;
      var before = stop ? stop.getBoundingClientRect().top > w.innerHeight * 0.9 : true;
      var over = $$('.scene.is-live').some(function (sc) { var r = sc.getBoundingClientRect(); return r.top < w.innerHeight * 0.5 && r.bottom > w.innerHeight * 0.5; });
      var on = past && before && !over;
      if (on !== btn.classList.contains('is-shown')) btn.classList.toggle('is-shown', on);
    };
    w.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  });

  /* 11b Leistungsliste: beim Hover läuft der Begriff als Laufband durch die Zeile (Desktop + Maus; CSS 24) */
  if (live && fine) $$('[data-index-preview] .svc__row').forEach(function (row) {
    var name = row.querySelector('.svc__name'); if (!name) return;
    var t = name.textContent.trim().replace(/</g, '&lt;'), one = '';
    for (var k = 0; k < 4; k++) one += '<span' + (k % 2 ? ' class="is-o"' : '') + '>' + t + '</span><i></i>';
    var run = d.createElement('span'); run.className = 'svc__run'; run.setAttribute('aria-hidden', 'true');
    run.innerHTML = '<span class="svc__run-track">' + one + one + '</span>';
    row.appendChild(run); row.classList.add('has-run');
  });

  /* 11c Buttons (.btn, nur Maus): Text rollt beim Hover, Knopf folgt der Maus ein Stück (magnetisch).
        Magnet über die CSS-Eigenschaft `translate`, damit :active-scale (transform) unberührt bleibt.      */
  if (live && fine) $$('.btn').forEach(function (b) {
    if (b.type !== 'submit') Array.prototype.slice.call(b.childNodes).forEach(function (n) {
      var t = n.nodeType === 3 ? n.textContent.trim() : '';
      if (!t) return;
      var o = d.createElement('span'), i = d.createElement('span');
      o.className = 'btn__t'; i.textContent = t; i.setAttribute('data-t', t);
      o.appendChild(i); b.replaceChild(o, n);
    });
    var p = { x: 0, y: 0 }, apply = function () { b.style.translate = p.x.toFixed(2) + 'px ' + p.y.toFixed(2) + 'px'; };
    var qx = G.quickTo(p, 'x', { duration: 0.6, ease: 'power3', onUpdate: apply }), qy = G.quickTo(p, 'y', { duration: 0.6, ease: 'power3', onUpdate: apply });
    b.classList.add('is-magnet');
    b.addEventListener('pointermove', function (e) {
      var r = b.getBoundingClientRect();
      qx((e.clientX - (r.left + r.width / 2)) * 0.28); qy((e.clientY - (r.top + r.height / 2)) * 0.4);
    });
    b.addEventListener('pointerleave', function () { qx(0); qy(0); });
  });
  /* 12 Scroll-Szenen auf der Bühne von stage.js (tasteskill): <section class="scene" data-scene="…"> */
  var Scenes = w.Scenes = w.Scenes || {};
  // Hilfe: Text in einzelne Buchstaben (<b>) zerlegen – nur für aria-hidden-Dekor
  var charWrap = function (el) {
    if (!el || el._chars) return el ? $$('b', el) : [];
    el.innerHTML = el.textContent.split('').map(function (ch) { return ch === ' ' ? ' ' : '<b>' + ch.replace(/</g, '&lt;') + '</b>'; }).join('');
    el._chars = true;
    return $$('b', el);
  };
  // Hilfe: Zoom-Ursprung in die Mitte eines Buchstabens legen (für den Durchflug), nach Font-Laden neu
  var originAt = function (el, ch, fy) {
    var put = function () { if (ch) G.set(el, { transformOrigin: (ch.offsetLeft + ch.offsetWidth / 2) + 'px ' + (ch.offsetTop + ch.offsetHeight * (fy || 0.55)) + 'px' }); };
    put(); fontsReady.then(put);
  };
  // „kinetic“: gepinnt; der Satz fährt Wort für Wort riesig durch den Screen (Buchstaben bauen sich auf
  // und wieder ab), das letzte Wort fliegt per Zoom durch das „I“ – danach steht die Aussage ruhig da.
  // Markup: .scene-stage > p.kt__fly > span (je Wort, letztes .is-em) + .statement__grid
  Scenes.kinetic = function (root, o) {
    return w.Stage.scene(root, { hold: o.hold || 3, phone: { hold: 2.4 }, build: function (tl, c) {
      var words = c.q('.kt__fly > span'), grid = c.q('.statement__grid')[0], n = words.length;
      words.forEach(function (wd, i) {
        var chars = charWrap(wd), t0 = 0.02 + i * (0.6 / (n - 1)), side = i % 2 ? 1 : -1;
        if (i === n - 1) {
          originAt(wd, chars[1], 0.5);
          tl.fromTo(wd, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.08, ease: 'power2.out' }, t0);
          tl.fromTo(chars, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.06, stagger: 0.01, ease: 'power3.out' }, t0);
          tl.to(wd, { scale: 70, duration: 0.17, ease: 'power3.in' }, 0.72);
          tl.to(wd, { opacity: 0, duration: 0.05 }, 0.88);
          return;
        }
        tl.fromTo(wd, { opacity: 0, scale: 0.5, xPercent: -side * 10 }, { opacity: 1, scale: 1, xPercent: 0, duration: 0.07, ease: 'power2.out' }, t0);
        tl.fromTo(chars, { yPercent: 110, rotate: side * 8, opacity: 0 }, { yPercent: 0, rotate: 0, opacity: 1, duration: 0.05, stagger: 0.006, ease: 'power3.out' }, t0);
        tl.to(chars, { yPercent: -70, opacity: 0, duration: 0.05, stagger: 0.006, ease: 'power2.in' }, t0 + 0.08);
        tl.to(wd, { scale: 3, xPercent: side * 12, duration: 0.08, ease: 'power2.in' }, t0 + 0.075);
      });
      if (grid) tl.fromTo(grid, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.88);
    }, rest: function (c) { var g = c.q('.statement__grid')[0]; if (g && G) G.set(g, { clearProps: 'opacity,transform' }); } });
  };
  // „strip“: Projekte als horizontal gepinnter Streifen; Karten drehen sich zur Bildmitte hin (Coverflow light).
  // Markup: .scene-stage > [data-strip-track] > .project …  Telefon/reduziert = Raster.
  Scenes.strip = function (root, o) {
    return w.Stage.scene(root, { hold: o.hold || 2, phone: 'rest', build: function (tl, c) {
      var track = c.q('[data-strip-track]')[0], cards = c.q('.project');
      if (!track) return;
      tl.fromTo(track, { x: 0 }, { x: function () { return -Math.max(0, track.scrollWidth - w.innerWidth); }, duration: 1, ease: 'none' }, 0);
      G.set(cards, { transformPerspective: 1200, transformOrigin: '50% 50%' });
      var turn = function () {
        var x = +G.getProperty(track, 'x') || 0, vw = w.innerWidth;
        cards.forEach(function (card) {
          var off = clamp(-1.2, 1.2, (card.offsetLeft + card.offsetWidth / 2 + x - vw / 2) / vw);
          G.set(card, { rotateY: -off * 16, z: -Math.abs(off) * 90 });
        });
      };
      tl.eventCallback('onUpdate', turn);
      turn();
    }, rest: function (c) { if (G) G.set(c.q('.project'), { clearProps: 'transform' }); } });
  };
  // „planks“: Übergang – Orange-Dielen wischen abwechselnd von links/rechts herein, ein Wort baut sich
  // Buchstabe für Buchstabe auf (wdth 100→62), Zoom-Durchflug durch den ersten Buchstaben in den nächsten
  // Abschnitt. Markup: .scene-stage > .wipe__planks > i×n + p.wipe__word + p.wipe__cap (alles aria-hidden)
  Scenes.planks = function (root, o) {
    return w.Stage.scene(root, { hold: o.hold || 1.4, build: function (tl, c) {
      var planks = c.q('.wipe__planks i'), word = c.q('.wipe__word')[0], cap = c.q('.wipe__cap')[0];
      var chars = charWrap(word), vf = { w: 100 };
      planks.forEach(function (p, i) { tl.fromTo(p, { xPercent: i % 2 ? 101 : -101 }, { xPercent: 0, duration: 0.24, ease: 'power3.out' }, i * 0.025); });
      tl.fromTo(chars, { yPercent: 105, opacity: 0, rotate: 6 }, { yPercent: 0, opacity: 1, rotate: 0, duration: 0.14, stagger: 0.04, ease: 'power3.out' }, 0.18);
      tl.fromTo(vf, { w: 100 }, { w: 62, duration: 0.3, ease: 'power2.out', onUpdate: function () { word.style.fontVariationSettings = '"wdth" ' + vf.w.toFixed(1); },
        onComplete: function () { originAt(word, chars[0], 0.6); } }, 0.18);
      if (cap) tl.fromTo(cap, { opacity: 0 }, { opacity: 1, duration: 0.06 }, 0.3).to(cap, { opacity: 0, duration: 0.05 }, 0.55);
      originAt(word, chars[0], 0.6);
      tl.to(word, { scale: 60, duration: 0.32, ease: 'power3.in' }, 0.56);
    } });
  };
  // „opening“: Bild öffnet sich vom Fenster zum ganzen Screen. Markup: .scene-stage > .scene-pic (img) [+ [data-at]]
  Scenes.opening = function (root, o) {
    return w.Stage.scene(root, { hold: o.hold || 1, phone: 'same', build: function (tl, c) {
      var pic = c.q('.scene-pic')[0], img = pic && firstMedia(pic);
      var ins = c.phone ? 'inset(16% 8% 16% 8%)' : 'inset(20% 28% 20% 28%)';
      tl.fromTo(pic, { clipPath: ins }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7 }, 0);
      if (img) tl.fromTo(img, { scale: 1.15 }, { scale: 1, duration: 0.7 }, 0);
      beats(tl, c);
    } });
  };
  // „story“: gehaltene Bühne mit Schritten. [data-beat-step] leuchten nacheinander auf, [data-beat-count]
  // zeigt „2 von 5“, [data-compare] fährt von data-compare-from nach data-compare-to, [data-at]/[data-out].
  Scenes.story = function (root, o) {
    return w.Stage.scene(root, { hold: o.hold || 3, phone: 'rest', build: function (tl, c) {
      var steps = c.q('[data-beat-step]'), count = c.q('[data-beat-count]')[0], cur = -1;
      var cmp = c.q('[data-compare]')[0];
      if (cmp) {
        cmp.removeAttribute('data-swing');
        var input = cmp.querySelector('input'), lbl = cmp.getAttribute('data-value-label') || '';
        var v = { p: +(cmp.getAttribute('data-compare-from') || 100) }, to = +(cmp.getAttribute('data-compare-to') || 0);
        tl.to(v, { p: to, duration: 0.9, onUpdate: function () {
          cmp.style.setProperty('--pos', v.p + '%');
          if (input) { input.value = Math.round(v.p); input.setAttribute('aria-valuetext', Math.round(v.p) + ' ' + lbl); }
        } }, 0);
      }
      beats(tl, c);
      var setStep = function () {
        var i = steps.length ? Math.min(steps.length - 1, Math.floor(tl.progress() * steps.length * 0.999)) : -1;
        if (i === cur) return; cur = i;
        steps.forEach(function (s, k) { s.classList.toggle('is-active', k === i); s.classList.toggle('is-done', k < i); });
        if (count) count.textContent = (i + 1) + ' von ' + steps.length;
      };
      tl.eventCallback('onUpdate', setStep);
      setStep();
    }, rest: function (c) { c.q('[data-beat-step]').forEach(function (s) { s.classList.remove('is-active', 'is-done'); }); } });
  };
  // [data-at="0.4"] erscheint bei 40 % der Szene, [data-out="0.6"] verschwindet bei 60 %
  function beats(tl, c) {
    c.q('[data-at]').forEach(function (el) { tl.fromTo(el, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.08 }, +el.getAttribute('data-at') || 0); });
    c.q('[data-out]').forEach(function (el) { tl.fromTo(el, { opacity: 1 }, { opacity: 0, duration: 0.08, immediateRender: false }, +el.getAttribute('data-out') || 0); });
  }
  if (w.Stage && G && ST) w.Stage.init();

  /* Sicherheitsnetz: am Seitenende alles Verbliebene zeigen; Höhen nach Fonts/Bildern neu messen -- */
  if (live) {
    ST.create({ start: function () { return ST.maxScroll(w) - 4; }, onEnter: function () {
      revealed.forEach(function (el) { if (el.hasAttribute('data-shutter')) el.style.clipPath = ''; else if (+G.getProperty(el, 'opacity') < 1) G.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.5 }); });
    } });
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(function () { ST.refresh(); });
    w.addEventListener('load', function () { ST.refresh(); });
  }
})();

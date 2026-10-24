/* handwerker-blesius.de – Motion-System (GSAP 3.13 + ScrollTrigger + SplitText, Lenis, stage.js)
   Wiederverwendbar über data-Attribute, Doku: SPEC.md „## Motion-System“.
   Grundsätze (tasteskill): nur transform/opacity/clip-path; Inhalte sind ohne JS und bei
   prefers-reduced-motion sofort sichtbar (Startzustände setzt erst dieses Skript); Reveals einmalig;
   kein Custom-Cursor, kein Preloader, keine Wheel-Übernahme (Lenis nur Maus/Trackpad).
   Leitmotiv „Dielen legen sich“: Kacheln öffnen sich von links wie eine Diele, die eingelegt wird.
   Module:  smooth · hero · split · chars · push · reveal · lay · mosaic · shutter · parallax · roll ·
            marquee · draw · index-preview · sticky-cta · scenes (opening, story)                       */
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
  var headerH = function () { var h = d.querySelector('[data-header]'); return h && getComputedStyle(h).position !== 'relative' ? h.offsetHeight : 0; };
  var CLIP_IN = 'inset(0% 100% 0% 0%)', CLIP_OPEN = 'inset(0% 0% 0% 0%)';

  var M = w.Motion = { live: live, lenis: null };
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
    // Ankerlinks auf dieselbe Seite (auch „index.html#kontakt“) weich, mit Abstand für den Kopf
    var samePage = function (a) {
      var strip = function (p) { return p.replace(/index\.html$/, ''); };
      return a.hash && a.hash.length > 1 && strip(a.pathname) === strip(location.pathname) && a.host === location.host;
    };
    d.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || !samePage(a)) return;
      var id = decodeURIComponent(a.hash.slice(1)), t = d.getElementById(id);
      if (!t) return;
      e.preventDefault();
      lenis.scrollTo(t, { offset: -headerH() - 12, duration: 1.2 });
      if (history.pushState) history.pushState(null, '', '#' + id);
      if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '-1');
      t.focus({ preventScroll: true });
    });
  }

  /* Hilfen ---------------------------------------------------------------------------------- */
  var firstMedia = function (el) { return el.querySelector('img, video'); };
  var once = function (el, start, fn) {
    return ST.create({ trigger: el, start: start || 'top 88%', once: true, onEnter: fn });
  };
  var revealed = [];

  /* 2 Hero [data-hero] – Ladesequenz ≤ 1,2 s, vier Bewegungen:
       [data-hero-word] steigt aus der Maske · [data-hero-shutter] öffnet sich von unten (Signatur „Shutter“)
       [data-hero-plank] legt sich von links ein · [data-hero-rise] steigen 16 px.
     Danach: langsamer Ken-Burns auf dem Shutter-Foto (bewegtes Bild), pausiert außerhalb.        */
  $$('[data-hero]').forEach(function (hero) {
    if (!live) return;
    var word = hero.querySelector('[data-hero-word]'), shutter = hero.querySelector('[data-hero-shutter]');
    var plank = hero.querySelector('[data-hero-plank]'), rises = $$('[data-hero-rise]', hero);
    var pic = shutter && firstMedia(shutter), pic2 = plank && firstMedia(plank);
    var run = function () {
      var late = pendingLate || !html.classList.contains('motion-pending');
      if (late) { html.classList.remove('motion-pending'); return startDrift(); }
      // Klasse zuerst lösen (gleicher Frame, kein Aufblitzen), damit GSAP nicht die CSS-Startwerte als Pixel übernimmt
      html.classList.remove('motion-pending');
      var tl = G.timeline({ defaults: { ease: EXPO }, onComplete: startDrift });
      if (word) tl.fromTo(word, { yPercent: 105, y: 0 }, { yPercent: 0, y: 0, duration: 1.0 }, 0.1);
      if (shutter) tl.fromTo(shutter, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: CLIP_OPEN, duration: 1.1, ease: INOUT, clearProps: 'clipPath' }, 0.12);
      if (pic) tl.fromTo(pic, { scale: 1.12 }, { scale: 1, duration: 1.4, ease: 'power2.out' }, 0.1);
      if (plank) tl.fromTo(plank, { clipPath: CLIP_IN }, { clipPath: CLIP_OPEN, duration: 0.95, ease: INOUT, clearProps: 'clipPath' }, 0.28);
      if (pic2) tl.fromTo(pic2, { scale: 1.08, xPercent: -3 }, { scale: 1, xPercent: 0, duration: 1.3, ease: 'power2.out' }, 0.28);
      if (rises.length) tl.fromTo(rises, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', clearProps: 'transform' }, 0.42);
    };
    var drifting = false;
    function startDrift() {
      if (drifting || !pic) return; drifting = true;
      var drift = G.to(pic, { scale: 1.07, xPercent: -1.5, duration: 18, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true });
      ST.create({ trigger: hero, start: 'top bottom', end: 'bottom top', onToggle: function (self) { self.isActive ? drift.play() : drift.pause(); } });
      if (ST.isInViewport && ST.isInViewport(hero)) drift.play();
    }
    fontsReady.then(run);
  });
  if (!live || !d.querySelector('[data-hero]')) html.classList.remove('motion-pending');

  /* 3 Überschriften [data-split] – Zeilen steigen aus ihrer Maske; ="fill": Wörter füllen sich ------
     4 [data-chars] – Buchstaben eines Ein-Wort-Titels steigen nacheinander (30 ms)                  */
  var splits = [];
  var prepSplit = function (o) {
    o.s = SPLIT.create(o.el, o.chars ? { type: 'chars', mask: 'chars', charsClass: 'm-char' } : { type: 'lines', mask: 'lines', linesClass: 'm-line' });
    G.set(o.chars ? o.s.chars : o.s.lines, { yPercent: o.chars ? 102 : 110 });
  };
  if (live && SPLIT) fontsReady.then(function () {
    $$('[data-split], [data-chars]').forEach(function (el) {
      if (el.getAttribute('data-split') === 'fill') {
        var s = SPLIT.create(el, { type: 'words', wordsClass: 'm-word' });
        G.fromTo(s.words, { opacity: 0.45 }, { opacity: 1, stagger: 0.1, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 50%', scrub: true } });
        return;
      }
      var o = { el: el, done: false, chars: el.hasAttribute('data-chars') };
      prepSplit(o);
      splits.push(o);
      once(el, 'top 95%', function () {
        o.done = true;
        var items = o.chars ? o.s.chars : o.s.lines;
        G.to(items, { yPercent: 0, duration: o.chars ? 0.9 : 0.9, stagger: o.chars ? 0.035 : 0.09, ease: EXPO, onComplete: function () { o.s.revert(); } });
      });
    });
    var lastW = w.innerWidth, rt;
    w.addEventListener('resize', function () {
      if (w.innerWidth === lastW) return;
      lastW = w.innerWidth; clearTimeout(rt);
      rt = setTimeout(function () {
        splits.forEach(function (o) { if (!o.done) { o.s.revert(); prepSplit(o); } });
        ST.refresh();
      }, 200);
    });
    ST.refresh();
  });

  /* 5 [data-push] – Riesentitel wird vom Scrollen sacht seitlich geschoben (kinetisch, an den Scrollbalken gebunden) */
  $$('[data-push]').forEach(function (el) {
    if (!live) return;
    G.fromTo(el, { xPercent: 2.5 }, { xPercent: -2.5, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* 6 Reveals [data-reveal] (up|fade|scale) und [data-stagger] (Kinder nacheinander) ------------ */
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
      onEnter: function (batch) { G.to(batch, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: EXPO, stagger: 0.07, delay: 0.05, overwrite: true, clearProps: 'transform' }); }
    });
  }

  /* 7 [data-lay] – „Dielen legen sich“: die Kacheln (Kinder) öffnen sich von links, eine nach der anderen */
  $$('[data-lay]').forEach(function (row) {
    if (!live) return;
    var kids = Array.prototype.slice.call(row.children).filter(function (k) { return k.offsetParent !== null || getComputedStyle(k).display !== 'none'; });
    if (!kids.length) return;
    G.set(kids, { clipPath: CLIP_IN });
    revealed = revealed.concat(kids);
    once(row, 'top 90%', function () {
      G.to(kids, { clipPath: CLIP_OPEN, duration: 0.75, ease: EXPO, stagger: 0.07, clearProps: 'clipPath' });
    });
  });

  /* 8 [data-mosaic] – das Fischgrät-Foto wird Kachel für Kachel verlegt, Reihen im Verband versetzt */
  $$('[data-mosaic]').forEach(function (grid) {
    if (!live) return;
    var cells = $$('.mcell', grid).filter(function (c) { return getComputedStyle(c).display !== 'none'; });
    var phone = mq('(max-width: 1099px)'); // ab hier 3 × 6-Raster (--pc/--pr)
    var num = function (c, k) { return parseFloat(getComputedStyle(c).getPropertyValue(k)) || 1; };
    G.set(cells, { clipPath: CLIP_IN });
    revealed = revealed.concat(cells);
    once(grid, 'top 78%', function () {
      cells.forEach(function (c) {
        var col = num(c, phone ? '--pc' : '--c'), r = num(c, phone ? '--pr' : '--r');
        var delay = (r - 1) * 0.13 + (col - 1) * 0.06 + (r % 2 ? 0 : 0.05) + (c.classList.contains('mtile') ? 0.12 : 0);
        G.to(c, { clipPath: CLIP_OPEN, duration: 0.7, ease: EXPO, delay: delay, clearProps: 'clipPath' });
      });
    });
  });

  /* 9 Bildöffnung [data-shutter] (="planks": in versetzten Dielen-Streifen) + 10 [data-parallax] ---- */
  var plankClip = function (p, n, off) {
    var pts = ['0% 0%'];
    for (var i = 0; i < n; i++) {
      var x = Math.max(0, Math.min(1, p * (1 + (n - 1) * off) - i * off)) * 100;
      pts.push(x + '% ' + (i / n * 100) + '%', x + '% ' + ((i + 1) / n * 100) + '%');
    }
    pts.push('0% 100%');
    return 'polygon(' + pts.join(',') + ')';
  };
  $$('[data-parallax], [data-shutter]').forEach(function (frame) {
    if (!live) return;
    var pic = firstMedia(frame); if (!pic) return;
    var amt = Math.min(0.08, parseFloat(frame.getAttribute('data-parallax')) || 0.06);
    var hasPx = frame.hasAttribute('data-parallax'), base = hasPx ? 1 + amt * 2 + 0.02 : 1;
    if (hasPx) {
      G.set(pic, { scale: base });
      G.fromTo(pic, { yPercent: -amt * 100 }, { yPercent: amt * 100, ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } });
    }
    if (!frame.hasAttribute('data-shutter')) return;
    var planks = frame.getAttribute('data-shutter') === 'planks';
    var n = parseInt(frame.getAttribute('data-rows'), 10) || 5, prog = { p: 0 };
    var set = function () { frame.style.clipPath = planks ? plankClip(prog.p, n, 0.16) : 'inset(0 0 ' + (100 - prog.p * 100) + '% 0)'; };
    set();
    G.set(pic, { scale: base * 1.08 });
    revealed.push(frame);
    once(frame, 'top 88%', function () {
      G.to(prog, { p: 1, duration: planks ? 1.3 : 1.1, ease: INOUT, onUpdate: set, onComplete: function () { frame.style.clipPath = ''; } });
      G.to(pic, { scale: base, duration: 1.5, ease: 'power2.out' });
    });
  });

  /* 11 Rollende Ziffern [data-roll] – Zahl bleibt für Screenreader im Text ------------------------- */
  $$('[data-roll]').forEach(function (el) {
    if (!live) return;
    var value = el.textContent.trim(), cols = [];
    var said = d.createElement('span'); said.className = 'sr-only'; said.textContent = value;
    var shown = d.createElement('span'); shown.className = 'roll'; shown.setAttribute('aria-hidden', 'true');
    value.split('').forEach(function (ch) {
      if (!/\d/.test(ch)) { shown.appendChild(d.createTextNode(ch)); return; }
      var col = d.createElement('span'), strip = d.createElement('span');
      col.className = 'roll__col'; strip.className = 'roll__strip';
      for (var k = 0; k < 10; k++) { var s = d.createElement('span'); s.setAttribute('data-n', k); strip.appendChild(s); }
      col.appendChild(strip); shown.appendChild(col); cols.push({ strip: strip, v: +ch });
    });
    el.textContent = ''; el.appendChild(said); el.appendChild(shown);
    once(el, 'top 90%', function () {
      cols.forEach(function (c, i) { G.to(c.strip, { yPercent: -c.v * 10, duration: 1.1 + i * 0.07, delay: i * 0.07, ease: EXPO }); });
    });
  });

  /* 12 Laufband [data-marquee] – eine Zeile, Tempo/Richtung folgen der Scroll-Geschwindigkeit ------ */
  $$('[data-marquee]').forEach(function (box) {
    var track = box.querySelector('.marquee__track'), set = track && track.firstElementChild;
    if (!live || !track || !set) return;
    var copies = 1, x = 0, wSet = 0, speed = parseFloat(box.getAttribute('data-marquee-speed')) || 40;
    var vel = 0, dir = 1, paused = false, onScreen = false;
    var measure = function () {
      wSet = set.offsetWidth;
      while (copies * wSet < w.innerWidth * 2 && wSet > 0 && copies < 8) {
        var c = set.cloneNode(true); track.appendChild(c); copies++;
      }
    };
    measure();
    w.addEventListener('resize', measure);
    box.addEventListener('pointerenter', function () { paused = true; });
    box.addEventListener('pointerleave', function () { paused = false; });
    ST.create({ trigger: box, start: 'top bottom', end: 'bottom top',
      onToggle: function (s) { onScreen = s.isActive; },
      onUpdate: function (s) { var v = s.getVelocity(); if (Math.abs(v) > 20) dir = v > 0 ? 1 : -1; vel = Math.min(6, Math.abs(v) / 300); } });
    G.ticker.add(function (t, dt) {
      if (!onScreen || !wSet) return;
      vel *= 0.94;
      var step = paused ? 0 : (speed * (1 + vel) * dir * dt) / 1000;
      x = (x - step) % wSet; if (x > 0) x -= wSet;
      track.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
    });
  });

  /* 13 SVG zeichnen [data-draw]: [data-draw-line] (pathLength="1"), [data-draw-dot], [data-draw-fade] */
  $$('[data-draw]').forEach(function (el) {
    if (!live) return;
    var lns = $$('[data-draw-line]', el), dots = $$('[data-draw-dot]', el), fades = $$('[data-draw-fade], [data-draw-label]', el);
    G.set(lns, { strokeDasharray: 1, strokeDashoffset: 1 });
    G.set(dots, { scale: 0.4, opacity: 0, transformOrigin: '50% 50%' });
    G.set(fades, { opacity: 0 });
    once(el, 'top 85%', function () {
      var tl = G.timeline();
      tl.to($$('[data-draw-fade]', el), { opacity: 1, duration: 0.6, stagger: 0.1 }, 0)
        .to(lns, { strokeDashoffset: 0, duration: 0.7, stagger: 0.12, ease: INOUT }, 0.1)
        .to(dots, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.12, ease: 'power3.out' }, 0.5)
        .to($$('[data-draw-label]', el), { opacity: 1, duration: 0.4, stagger: 0.12 }, 0.55);
    });
  });

  /* 14 Liste mit Vorschau [data-index-preview] – Bild öffnet sich auf Höhe der Zeile (nicht am Cursor) */
  $$('[data-index-preview]').forEach(function (root) {
    var desk = function () { return mq('(hover: hover) and (pointer: fine) and (min-width: 1024px)'); };
    var rows = $$('a', root).filter(function (a) { return a.closest('[data-index-preview]') === root; });
    var frame = d.createElement('div'); frame.className = 'ix-frame'; frame.setAttribute('aria-hidden', 'true');
    var pics = rows.map(function (a) {
      var src = a.querySelector('[data-preview] img'), box = d.createElement('div');
      box.className = 'ix-frame__pic';
      if (src) { box.appendChild((src.closest('picture') || src).cloneNode(true)); $$('img', box).forEach(function (i) { i.alt = ''; i.loading = 'eager'; }); }
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
      frame.style.transform = 'translate3d(0,' + y + 'px,0)';
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

  /* 15 Schwebender Handlungsknopf [data-sticky-cta] (data-sticky-after / data-sticky-hide = Selektor) */
  $$('[data-sticky-cta]').forEach(function (btn) {
    var after = d.querySelector(btn.getAttribute('data-sticky-after') || '[data-hero]');
    var stop = d.querySelector(btn.getAttribute('data-sticky-hide') || '#kontakt');
    var ticking = false;
    var upd = function () {
      ticking = false;
      var past = after ? after.getBoundingClientRect().bottom < 0 : w.scrollY > w.innerHeight;
      var before = stop ? stop.getBoundingClientRect().top > w.innerHeight * 0.9 : true;
      var on = past && before;
      if (on !== btn.classList.contains('is-shown')) btn.classList.toggle('is-shown', on);
    };
    w.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  });

  /* 16 Scroll-Szenen auf der Bühne von stage.js (tasteskill): <section class="scene" data-scene="…"> */
  var Scenes = w.Scenes = w.Scenes || {};
  Scenes.opening = function (root, o) {
    return w.Stage.scene(root, { hold: o.hold || 1, phone: 'same', build: function (tl, c) {
      var pic = c.q('.scene-pic')[0], img = pic && firstMedia(pic);
      var ins = c.phone ? 'inset(16% 8% 16% 8%)' : 'inset(20% 28% 20% 28%)';
      tl.fromTo(pic, { clipPath: ins }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7 }, 0);
      if (img) tl.fromTo(img, { scale: 1.15 }, { scale: 1, duration: 0.7 }, 0);
      beats(tl, c);
    } });
  };
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
  function beats(tl, c) {
    c.q('[data-at]').forEach(function (el) { tl.fromTo(el, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.08 }, +el.getAttribute('data-at') || 0); });
    c.q('[data-out]').forEach(function (el) { tl.fromTo(el, { opacity: 1 }, { opacity: 0, duration: 0.08, immediateRender: false }, +el.getAttribute('data-out') || 0); });
  }
  if (w.Stage && G && ST) w.Stage.init();

  /* Sicherheitsnetz: am Seitenende alles Verbliebene zeigen; Höhen nach Fonts/Bildern neu messen -- */
  if (live) {
    ST.create({ start: function () { return ST.maxScroll(w) - 4; }, onEnter: function () {
      revealed.forEach(function (el) {
        if (el.hasAttribute('data-shutter')) { el.style.clipPath = ''; return; }
        if (el.style.clipPath) G.to(el, { clipPath: CLIP_OPEN, duration: 0.4, clearProps: 'clipPath' });
        if (+G.getProperty(el, 'opacity') < 1) G.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.5 });
      });
    } });
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(function () { ST.refresh(); });
    w.addEventListener('load', function () { ST.refresh(); });
  }
})();

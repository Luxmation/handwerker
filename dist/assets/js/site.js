/* handwerker-blesius.de – Seitenverhalten (Vanilla JS, ohne Abhängigkeiten)
   Jedes Modul prüft selbst, ob seine Elemente auf der Seite vorhanden sind.
   Haken:  [data-burger] [data-mnav] [data-dropdown] [data-compare] [data-swing] [data-acc] [data-svc]
           [data-open-status] [data-calc] [data-form] [data-filter-group]/[data-filter-target]          */
(function () {
  'use strict';
  var d = document, body = d.body, w = window;
  var reduce = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = w.matchMedia && w.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var header = $('[data-header]');

  /* Burger-Menü: Kachel-Bogen, Fokus-Falle, Esc, Scroll-Sperre ---------------- */
  var burger = $('[data-burger]'), mnav = $('[data-mnav]');
  if (burger && mnav) {
    var open = false;
    var focusables = function () { return [burger].concat($$('a[href], button:not([disabled])', mnav)); };
    var setMenu = function (state, returnFocus) {
      open = state;
      burger.setAttribute('aria-expanded', String(state));
      burger.setAttribute('aria-label', state ? 'Menü schließen' : 'Menü öffnen');
      if (header) header.classList.toggle('is-open', state);
      body.classList.toggle('is-locked', state);
      if (w.Motion && w.Motion.lenis) state ? w.Motion.lenis.stop() : w.Motion.lenis.start();
      if (state) {
        mnav.hidden = false;
        requestAnimationFrame(function () { mnav.classList.add('is-open'); });
      } else {
        mnav.classList.remove('is-open');
        setTimeout(function () { if (!open) mnav.hidden = true; }, reduce ? 0 : 260);
        if (returnFocus) burger.focus();
      }
    };
    burger.addEventListener('click', function () { setMenu(!open); });
    mnav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    d.addEventListener('keydown', function (e) {
      if (!open) return;
      if (e.key === 'Escape') { setMenu(false, true); return; }
      if (e.key === 'Tab') {
        var f = focusables(), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
        else if (f.indexOf(d.activeElement) === -1) { e.preventDefault(); first.focus(); }
      }
    });
    w.addEventListener('resize', function () { if (open && w.innerWidth >= 1100) setMenu(false); });
  }

  /* Dropdown: Hover (CSS) + Klick + Tastatur ---------------------------------- */
  $$('[data-dropdown]').forEach(function (item) {
    var btn = $('.nav__toggle', item), menu = $('.dropdown', item);
    if (!btn || !menu) return;
    var links = $$('a', menu);
    var set = function (state, suppress) {
      item.classList.toggle('is-open', state);
      btn.setAttribute('aria-expanded', String(state));
      btn.setAttribute('aria-label', state ? 'Untermenü Leistungen schließen' : 'Untermenü Leistungen öffnen');
      item.classList.toggle('is-suppressed', !state && !!suppress);
    };
    btn.addEventListener('click', function () { set(!item.classList.contains('is-open'), true); });
    item.addEventListener('mouseleave', function () { item.classList.remove('is-suppressed'); });
    item.addEventListener('keydown', function (e) {
      var i = links.indexOf(d.activeElement);
      if (e.key === 'Escape' && (item.classList.contains('is-open') || item.matches(':hover'))) {
        set(false, true); btn.focus(); e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!item.classList.contains('is-open')) set(true);
        (links[i + 1] || links[0]).focus();
      } else if (e.key === 'ArrowUp' && i > -1) {
        e.preventDefault();
        (links[i - 1] || links[links.length - 1]).focus();
      } else if ((e.key === 'Home' || e.key === 'End') && i > -1) {
        e.preventDefault(); links[e.key === 'Home' ? 0 : links.length - 1].focus();
      }
    });
    item.addEventListener('focusout', function (e) { if (!item.contains(e.relatedTarget)) set(false); });
    d.addEventListener('click', function (e) { if (!item.contains(e.target) && item.classList.contains('is-open')) set(false); });
  });

  /* Live-Öffnungsstatus [data-open-status] (="short" für die Kurzform), Zeit in Europe/Berlin ------
     Mo–Fr 07:30–17:00, Sa 08:00–14:00, So geschlossen. Ohne JS bleibt der Text aus dem HTML stehen. */
  var statusEls = $$('[data-open-status]');
  if (statusEls.length && w.Intl && Intl.DateTimeFormat) {
    var HOURS = { 1: [450, 1020], 2: [450, 1020], 3: [450, 1020], 4: [450, 1020], 5: [450, 1020], 6: [480, 840] };
    var DAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    var IDX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    var clock = function (min) { var h = Math.floor(min / 60), m = min % 60; return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m; };
    var fmt;
    try { fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Berlin', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }); } catch (_) { fmt = null; }
    var now = function () {
      if (!fmt) { var t = new Date(); return { day: t.getDay(), min: t.getHours() * 60 + t.getMinutes() }; }
      var p = {}; fmt.formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
      return { day: IDX[p.weekday] != null ? IDX[p.weekday] : new Date().getDay(), min: (+p.hour % 24) * 60 + (+p.minute) };
    };
    var compute = function () {
      var n = now(), today = HOURS[n.day];
      if (today && n.min >= today[0] && n.min < today[1]) {
        return { open: true, long: 'Jetzt geöffnet · bis ' + clock(today[1]) + ' Uhr', short: 'Geöffnet bis ' + clock(today[1]) };
      }
      if (today && n.min < today[0]) {
        return { open: false, long: 'Geschlossen · öffnet heute um ' + clock(today[0]) + ' Uhr', short: 'Öffnet heute ' + clock(today[0]) };
      }
      for (var k = 1; k <= 7; k++) {
        var day = (n.day + k) % 7, h = HOURS[day];
        if (!h) continue;
        var when = k === 1 ? 'morgen' : 'am ' + DAYS[day];
        return { open: false, long: 'Geschlossen · öffnet ' + when + ' um ' + clock(h[0]) + ' Uhr', short: 'Öffnet ' + (k === 1 ? 'morgen' : DAYS[day].slice(0, 2)) + ' ' + clock(h[0]) };
      }
      return null;
    };
    var paint = function () {
      var s = compute(); if (!s) return;
      statusEls.forEach(function (el) {
        el.textContent = el.getAttribute('data-open-status') === 'short' ? s.short : s.long;
        el.setAttribute('data-open', s.open ? 'ja' : 'nein');
        el.title = 'Öffnungszeiten: Mo–Fr 07:30–17:00, Sa 08:00–14:00 (Feiertage ausgenommen)';
      });
    };
    paint();
    setInterval(paint, 30000);
  }

  /* Vorher/Nachher-Regler -------------------------------------------------------
     Maus: ziehen. Touch: waagerecht ziehen, senkrecht scrollt die Seite weiter,
     Antippen setzt den Regler. Tastatur: über das (unsichtbare) range-Input.     */
  $$('[data-compare]').forEach(function (el) {
    var input = $('.compare__range', el), raf = 0, drag = null, interacted = false;
    var label = el.getAttribute('data-value-label') || 'Prozent Vorher-Bild sichtbar';
    var set = function (v) {
      v = Math.max(0, Math.min(100, v));
      el.style.setProperty('--pos', v + '%');
      if (input) { input.value = Math.round(v); input.setAttribute('aria-valuetext', Math.round(v) + ' ' + label); }
    };
    var stop = function () { interacted = true; if (raf) cancelAnimationFrame(raf); raf = 0; };
    var at = function (e) { var r = el.getBoundingClientRect(); if (r.width) set((e.clientX - r.left) / r.width * 100); };
    set(input ? +input.value || 50 : 50);
    if (input) {
      input.addEventListener('input', function () { stop(); set(+input.value); });
      input.addEventListener('focus', stop);
    }
    el.addEventListener('pointerdown', function (e) {
      if (e.button > 0) return;
      stop();
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, touch: e.pointerType !== 'mouse', on: e.pointerType === 'mouse' };
      if (drag.on) { el.setPointerCapture(e.pointerId); el.classList.add('is-dragging'); at(e); e.preventDefault(); }
      if (input && fine) input.focus({ preventScroll: true });
    });
    el.addEventListener('pointermove', function (e) {
      if (!drag || drag.id !== e.pointerId) return;
      if (!drag.on) {
        var dx = Math.abs(e.clientX - drag.x), dy = Math.abs(e.clientY - drag.y);
        if (dy > 10 && dy > dx) { drag = null; return; }
        if (dx > 6 && dx > dy) { drag.on = true; try { el.setPointerCapture(e.pointerId); } catch (_) {} el.classList.add('is-dragging'); }
      }
      if (drag && drag.on) at(e);
    });
    var end = function (e) {
      if (drag && drag.touch && !drag.on && e.type === 'pointerup') at(e);
      drag = null; el.classList.remove('is-dragging');
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', function () { drag = null; el.classList.remove('is-dragging'); });
    el.addEventListener('dragstart', function (e) { e.preventDefault(); });

    // Einmaliges Schwingen beim ersten Sichtbarwerden (zeigt, dass man ziehen kann)
    if (el.hasAttribute('data-swing') && !reduce && 'IntersectionObserver' in w) {
      var io = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        setTimeout(function () {
          if (interacted) return;
          var t0 = 0, base = +(input && input.value) || 50;
          var step = function (ts) {
            if (interacted) return;
            if (!t0) t0 = ts;
            var t = (ts - t0) / 1000;
            if (t > 2.6) { set(base); raf = 0; return; }
            set(base + 22 * Math.sin(t * Math.PI * 2 / 1.7) * Math.pow(1 - t / 2.6, 2));
            raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
        }, 300);
      }, { threshold: 0.5 });
      io.observe(el);
    }
  });

  /* Akkordeon „Unter der Oberfläche“ [data-acc]: immer genau eine Stufe offen --------- */
  $$('[data-acc]').forEach(function (acc) {
    var stages = $$('.acc__stage', acc), btns = stages.map(function (s) { return $('.acc__btn', s); });
    var openStage = function (i) {
      stages.forEach(function (s, k) { s.classList.toggle('is-open', k === i); btns[k].setAttribute('aria-expanded', String(k === i)); });
    };
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () { openStage(i); });
      b.addEventListener('keydown', function (e) {
        var k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (e.key === 'Home') k = -i; if (e.key === 'End') k = btns.length - 1 - i;
        if (k == null) return;
        e.preventDefault();
        var n = (i + k + btns.length) % btns.length; btns[n].focus(); openStage(n);
      });
    });
  });

  /* Leistungen [data-svc]: immer ein Balken offen, Foto-Kachel wechselt mit ---------------- */
  $$('[data-svc]').forEach(function (list) {
    var bars = $$('details', list), pics = $$('[data-svc-pic]');
    var show = function (key) { pics.forEach(function (p) { p.classList.toggle('is-on', p.getAttribute('data-svc-pic') === key); }); };
    bars.forEach(function (bar) {
      bar.addEventListener('toggle', function () {
        if (bar.open) {
          bars.forEach(function (o) { if (o !== bar && o.open) o.open = false; });
          show(bar.getAttribute('data-pic'));
        }
      });
      var sum = $('summary', bar);
      if (fine && sum) sum.addEventListener('pointerenter', function () { show(bar.getAttribute('data-pic')); });
    });
    list.addEventListener('pointerleave', function () { var o = bars.filter(function (b) { return b.open; })[0]; if (o) show(o.getAttribute('data-pic')); });
  });

  /* Aufmaß-Rechner [data-calc] ------------------------------------------------------------
     Fläche = L × B, Bestellmenge ≈ Fläche × (1 + Verschnitt), Umfang = 2 (L + B).
     Verschnitt-Richtwerte: gerade 7 %, diagonal 12 %, Fischgrät 15 %. Grundriss als SVG-Schema. */
  var calcForm = $('[data-calc]');
  if (calcForm) {
    var WASTE = { gerade: 0.07, diagonal: 0.12, fischgraet: 0.15 };
    var LAYNAME = { gerade: 'gerade', diagonal: 'diagonal', fischgraet: 'im Fischgrätmuster' };
    var inL = $('#calc-l', calcForm), inB = $('#calc-b', calcForm), belag = $('#calc-belag', calcForm);
    var svg = $('[data-calc-plan]', calcForm), NS = 'http://www.w3.org/2000/svg';
    var out = { area: $('[data-calc-area]', calcForm), order: $('[data-calc-order]', calcForm), waste: $('[data-calc-waste]', calcForm), perim: $('[data-calc-perim]', calcForm) };
    var num = function (v) { var n = parseFloat(String(v).replace(/\s/g, '').replace(',', '.')); return isFinite(n) ? n : NaN; };
    var de = function (n, dec) { return n.toFixed(dec == null ? 1 : dec).replace('.', ','); };
    var clampM = function (n) { return Math.max(0.5, Math.min(40, n)); };
    var lay = function () { var r = $('input[name="verlegung"]:checked', calcForm); return r ? r.value : 'gerade'; };
    var state = null;
    var el = function (tag, attrs) { var e = d.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; };
    var TONES = ['#D9D4CD', '#CBC5BD', '#E3DED7', '#C2BBB2', '#D3CDC5'];
    var draw = function (L, B, mode) {
      if (!svg) return;
      while (svg.lastChild && svg.lastChild.nodeName !== 'title') svg.removeChild(svg.lastChild);
      var title = $('title', svg);
      if (title) title.textContent = 'Grundriss-Schema: Raum ' + de(L) + ' × ' + de(B) + ' m, ' + (mode === 'gerade' ? 'Dielen gerade im Verband' : mode === 'diagonal' ? 'Dielen diagonal' : 'Stäbe im Fischgrätmuster') + ' verlegt';
      var boxW = 330, boxH = 250, s = Math.min(boxW / L, boxH / B);
      var w2 = L * s, h2 = B * s, x0 = 60 + (boxW - w2) / 2, y0 = 20 + (boxH - h2) / 2;
      var cx = x0 + w2 / 2, cy = y0 + h2 / 2;
      var defs = el('defs', {}), clip = el('clipPath', { id: 'plan-clip' });
      clip.appendChild(el('rect', { x: x0, y: y0, width: w2, height: h2 })); defs.appendChild(clip); svg.appendChild(defs);
      svg.appendChild(el('rect', { x: x0, y: y0, width: w2, height: h2, fill: '#3A3633' }));
      var g = el('g', { 'clip-path': 'url(#plan-clip)' }), inner = g, gap = 1.6, n = 0, maxD = 900;
      var plank = function (x, y, pw, ph, delay) {
        var r = el('rect', { x: x.toFixed(1), y: y.toFixed(1), width: Math.max(1, pw - gap).toFixed(1), height: Math.max(1, ph - gap).toFixed(1), fill: TONES[Math.abs(n * 7 + Math.floor(x * 3 + y)) % TONES.length], class: 'plank' });
        r.style.setProperty('--d', Math.min(maxD, Math.round(delay)) + 'ms'); inner.appendChild(r); n++;
      };
      var pw = Math.max(9, Math.min(18, Math.min(w2, h2) / 12)), pl = pw * 6;
      if (mode === 'gerade') {
        for (var row = 0, y = y0; y < y0 + h2; row++, y += pw) {
          var off = (row % 3) * pl / 3;
          for (var x = x0 - off; x < x0 + w2; x += pl) plank(x, y, pl, pw, row * 45 + (x - x0) / w2 * 260);
        }
      } else if (mode === 'diagonal') {
        inner = el('g', { transform: 'rotate(-45 ' + cx + ' ' + cy + ')' }); g.appendChild(inner);
        var R = Math.sqrt(w2 * w2 + h2 * h2) / 2 + pl;
        for (var r2 = 0, yy = cy - R; yy < cy + R; r2++, yy += pw) {
          var o2 = (r2 % 3) * pl / 3;
          for (var xx = cx - R - o2; xx < cx + R; xx += pl) plank(xx, yy, pl, pw, r2 * 32 + (xx - cx + R) / (2 * R) * 200);
        }
      } else {
        inner = el('g', { transform: 'rotate(45 ' + cx + ' ' + cy + ')' }); g.appendChild(inner);
        var W = Math.max(8, Math.min(14, Math.min(w2, h2) / 16)), Lw = 4 * W, RR = Math.sqrt(w2 * w2 + h2 * h2) / 2 + 2 * Lw;
        var iMax = Math.ceil(RR / W) + 4, kMax = Math.ceil(RR / Lw) + 2;
        for (var k = -kMax; k <= kMax; k++) {
          for (var i = -iMax; i <= iMax; i++) {
            var hx = (i + 4 * k) * W, hy = (i - 4 * k) * W, vx = (i + 4 + 4 * k) * W, vy = (i - 3 - 4 * k) * W;
            var dly = (k + kMax) * 70 + (i + iMax) * 6;
            if (Math.abs(hx) < RR && Math.abs(hy) < RR) plank(cx + hx, cy + hy, Lw, W, dly);
            if (Math.abs(vx) < RR && Math.abs(vy) < RR) plank(cx + vx, cy + vy, W, Lw, dly + 20);
          }
        }
      }
      svg.appendChild(g);
      var tL = el('text', { x: cx, y: y0 + h2 + 26, 'text-anchor': 'middle' }); tL.textContent = de(L) + ' m'; svg.appendChild(tL);
      var tB = el('text', { x: x0 - 14, y: cy, 'text-anchor': 'middle', transform: 'rotate(-90 ' + (x0 - 14) + ' ' + cy + ')' }); tB.textContent = de(B) + ' m'; svg.appendChild(tB);
    };
    var update = function (redraw) {
      var L = num(inL.value), B = num(inB.value);
      if (!(L > 0) || !(B > 0)) return;
      L = clampM(L); B = clampM(B);
      var mode = lay(), wst = WASTE[mode], area = L * B, order = Math.ceil(area * (1 + wst) * 10 - 1e-9) / 10, perim = 2 * (L + B);
      out.area.textContent = de(area) + ' m²';
      out.order.textContent = de(order) + ' m²';
      out.waste.textContent = 'inkl. ca. ' + Math.round(wst * 100) + ' % Verschnitt';
      out.perim.textContent = de(perim) + ' m';
      var key = [L, B, mode].join('|');
      if (redraw !== false && (!state || state.key !== key)) draw(L, B, mode);
      state = { key: key, L: L, B: B, mode: mode, area: area, order: order, waste: wst, belag: belag ? belag.value : '' };
    };
    var t = 0;
    [inL, inB].forEach(function (inp) {
      inp.addEventListener('input', function () { clearTimeout(t); t = setTimeout(update, 220); });
      inp.addEventListener('blur', function () { var n = num(inp.value); if (n > 0) inp.value = de(clampM(n)); update(); });
      inp.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
        e.preventDefault(); var n = num(inp.value) || 0; inp.value = de(clampM(n + (e.key === 'ArrowUp' ? 0.1 : -0.1))); update();
      });
    });
    $$('[data-step]', calcForm).forEach(function (b) {
      b.addEventListener('click', function () {
        var inp = d.getElementById(b.getAttribute('data-for')), n = num(inp.value) || 0;
        inp.value = de(clampM(Math.round((n + parseFloat(b.getAttribute('data-step'))) * 10) / 10)); update();
      });
    });
    $$('input[name="verlegung"]', calcForm).forEach(function (r) { r.addEventListener('change', function () { update(); }); });
    if (belag) belag.addEventListener('change', function () { update(false); });
    update();

    // „Mit diesen Maßen anfragen“: füllt Bodenart, Fläche und Nachricht im Kontaktformular vor
    var send = $('[data-calc-send]', calcForm);
    if (send) send.addEventListener('click', function () {
      update(false);
      var form = $('#kontakt form[data-form]') || $('form[data-form]');
      if (!form || !state) return;
      var f = form.elements, s2 = state;
      if (f.bodenart) {
        var want = s2.belag || 'Noch offen';
        f.bodenart.value = Array.prototype.some.call(f.bodenart.options, function (o) { return o.value === want || o.text === want; }) ? want : 'Noch offen';
      }
      if (f.flaeche) f.flaeche.value = de(s2.area);
      if (f.nachricht) {
        var line = 'Raum ca. ' + de(s2.L) + ' × ' + de(s2.B) + ' m (' + de(s2.area) + ' m²), ' + (s2.belag && s2.belag !== 'Noch offen' ? s2.belag + ', ' : '') +
          'Verlegung ' + LAYNAME[s2.mode] + '. Laut Aufmaß-Rechner ca. ' + de(s2.order) + ' m² inkl. ca. ' + Math.round(s2.waste * 100) + ' % Verschnitt.';
        var cur = f.nachricht.value.trim(), prev = f.nachricht.getAttribute('data-calc-line');
        if (!cur || cur === prev) f.nachricht.value = line;
        else if (cur.indexOf(line) === -1) f.nachricht.value = cur + '\n' + line;
        f.nachricht.setAttribute('data-calc-line', line);
        ['bodenart', 'flaeche', 'nachricht'].forEach(function (n) { if (f[n]) f[n].removeAttribute('aria-invalid'); });
      }
      var note = $('.form__prefill', form);
      if (!note) { note = d.createElement('p'); note.className = 'form__prefill'; note.setAttribute('role', 'status'); form.insertBefore(note, form.firstChild); }
      note.textContent = 'Ihre Maße aus dem Rechner sind eingetragen. Bitte noch Name und Telefon oder E-Mail ergänzen.';
      if (fine && f.name) setTimeout(function () { f.name.focus({ preventScroll: true }); }, 1300);
    });
  }

  /* Filter (z. B. Projekte): [data-filter-group="x"] Knöpfe mit data-filter,
     Elemente in [data-filter-target="x"] mit data-cat="parkett treppe".          */
  $$('[data-filter-group]').forEach(function (group) {
    var target = $('[data-filter-target="' + group.getAttribute('data-filter-group') + '"]');
    if (!target) return;
    var btns = $$('[data-filter]', group);
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-filter');
        btns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        $$('[data-cat]', target).forEach(function (it) {
          it.hidden = !(f === 'alle' || (' ' + it.getAttribute('data-cat') + ' ').indexOf(' ' + f + ' ') > -1);
        });
      });
    });
  });

  /* Formulare: Prüfung, Honeypot, Versand per fetch an form.action ---------------
     Pflicht: [required]-Felder; data-require-any="email telefon|nachricht bodenart"
     = je Gruppe muss mindestens ein Feld gefüllt sein.                             */
  var MSG = {
    name: 'Bitte geben Sie Ihren Namen an.',
    'email telefon': 'Bitte geben Sie eine Telefonnummer oder E-Mail-Adresse an.',
    'nachricht bodenart': 'Bitte beschreiben Sie kurz Ihr Vorhaben oder wählen Sie eine Bodenart.',
    email: 'Die E-Mail-Adresse scheint nicht zu stimmen.',
    datenschutz: 'Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.',
    fallback: 'Bitte füllen Sie die markierten Felder aus.',
    preview: '<strong>Vorschau</strong>Das Formular wird erst auf dem Webserver versendet. Ihre Eingaben sind vollständig.',
    success: '<strong>Danke für Ihre Anfrage.</strong>Sie ist bei uns angekommen. Wir melden uns zeitnah bei Ihnen, in der Regel mit einem Terminvorschlag.',
    network: 'Die Nachricht konnte gerade nicht gesendet werden. Bitte rufen Sie uns an: <a href="tel:+4915901717249">0159 0171 7249</a> oder schreiben Sie an <a href="mailto:info@handwerker-blesius.de">info@handwerker-blesius.de</a>.'
  };
  $$('form[data-form]').forEach(function (form) {
    var status = $('.form__status', form), submit = $('[type="submit"]', form);
    var t = $('input[name="_t"]', form);
    if (t) t.value = String(Date.now());
    var say = function (type, msg) {
      if (!status) return;
      status.className = 'form__status is-' + type;
      status.innerHTML = msg;
    };
    var val = function (n) { var f = form.elements[n]; return f ? String(f.value || '').trim() : ''; };
    var mark = function (el, bad) { if (el) { if (bad) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid'); } };

    form.addEventListener('input', function (e) { if (e.target.getAttribute('aria-invalid')) mark(e.target, false); });
    form.addEventListener('change', function (e) { if (e.target.type === 'checkbox' || e.target.tagName === 'SELECT') mark(e.target, false); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var errors = [];
      $$('[aria-invalid]', form).forEach(function (el) { mark(el, false); });
      $$('[required]', form).forEach(function (el) {
        var bad = el.type === 'checkbox' ? !el.checked : !String(el.value).trim();
        if (bad) { mark(el, true); errors.push({ el: el, msg: MSG[el.name] || MSG.fallback }); }
      });
      (form.getAttribute('data-require-any') || '').split('|').forEach(function (grp) {
        var names = grp.trim().split(/\s+/).filter(Boolean);
        if (!names.length || names.some(function (n) { return val(n); })) return;
        names.forEach(function (n) { mark(form.elements[n], true); });
        errors.push({ el: form.elements[names[0]], msg: MSG[names.join(' ')] || MSG.fallback });
      });
      var mail = form.elements.email;
      if (mail && mail.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail.value.trim())) {
        mark(mail, true); errors.push({ el: mail, msg: MSG.email });
      }
      if (errors.length) {
        var order = $$('input, select, textarea', form);
        errors.sort(function (a, b) { return order.indexOf(a.el) - order.indexOf(b.el); });
        say('error', errors.map(function (x) { return x.msg; }).filter(function (m, i, arr) { return arr.indexOf(m) === i; }).join('<br>'));
        if (errors[0].el && errors[0].el.focus) errors[0].el.focus();
        return;
      }
      if (val('website')) { form.classList.add('is-sent'); say('success', MSG.success); return; } // Honeypot

      if (location.protocol === 'file:') { say('info', MSG.preview); return; }

      var label = submit ? submit.textContent : '';
      if (submit) { submit.disabled = true; submit.textContent = 'Wird gesendet …'; }
      fetch(form.getAttribute('action') || form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
        .then(function (res) {
          if (res && res.ok) {
            form.classList.add('is-sent');
            say('success', form.getAttribute('data-success') || MSG.success);
            form.reset();
            if (status) status.focus();
          } else {
            say('error', res && res.error ? String(res.error).replace(/</g, '&lt;') : MSG.network);
          }
        })
        .catch(function () { say('error', MSG.network); })
        .then(function () { if (submit) { submit.disabled = false; submit.textContent = label; } });
    });
  });
})();

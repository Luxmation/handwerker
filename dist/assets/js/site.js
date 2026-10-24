/* handwerker-blesius.de – Seitenverhalten (Vanilla JS, ohne Abhängigkeiten)
   Jedes Modul prüft selbst, ob seine Elemente auf der Seite vorhanden sind.
   Haken:  [data-header] [data-burger] [data-mnav] [data-dropdown] [data-compare] [data-swing]
           [data-swap] .reveal [data-form] [data-filter-group]/[data-filter-target]          */
(function () {
  'use strict';
  var d = document, html = d.documentElement, body = d.body;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };

  /* Header: Zustand beim Scrollen ------------------------------------------ */
  var header = $('[data-header]');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Burger-Menü: Vollbild, Fokus-Falle, Esc, Scroll-Sperre ------------------ */
  var burger = $('[data-burger]'), mnav = $('[data-mnav]');
  if (burger && mnav) {
    var open = false;
    var focusables = function () {
      return [burger].concat($$('a[href], button:not([disabled])', mnav));
    };
    var setMenu = function (state, returnFocus) {
      open = state;
      burger.setAttribute('aria-expanded', String(state));
      burger.setAttribute('aria-label', state ? 'Menü schließen' : 'Menü öffnen');
      if (header) header.classList.toggle('is-open', state);
      body.classList.toggle('is-locked', state);
      if (state) {
        mnav.hidden = false;
        requestAnimationFrame(function () { mnav.classList.add('is-open'); });
      } else {
        mnav.classList.remove('is-open');
        setTimeout(function () { if (!open) mnav.hidden = true; }, reduce ? 0 : 300);
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
    // Beim Wechsel auf Desktop-Breite Menü schließen
    window.addEventListener('resize', function () { if (open && window.innerWidth > 1100) setMenu(false); });
  }

  /* Dropdown: Hover (CSS) + Klick + Tastatur ---------------------------------- */
  $$('[data-dropdown]').forEach(function (item) {
    var btn = $('.nav__toggle', item), menu = $('.dropdown', item);
    if (!btn || !menu) return;
    var links = $$('a', menu);
    var set = function (state, suppress) {
      item.classList.toggle('is-open', state);
      btn.setAttribute('aria-expanded', String(state));
      btn.setAttribute('aria-label', (state ? 'Untermenü Leistungen schließen' : 'Untermenü Leistungen öffnen'));
      item.classList.toggle('is-suppressed', !state && !!suppress);
    };
    btn.addEventListener('click', function () { set(!item.classList.contains('is-open'), true); });
    // Nach Schließen per Esc/Klick bleibt das Hover-Menü zu, bis die Maus den Bereich verlässt
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
    });
    el.addEventListener('pointermove', function (e) {
      if (!drag || drag.id !== e.pointerId) return;
      if (!drag.on) {
        var dx = Math.abs(e.clientX - drag.x), dy = Math.abs(e.clientY - drag.y);
        if (dy > 10 && dy > dx) { drag = null; return; }           // senkrecht: Seite scrollt
        if (dx > 6 && dx > dy) { drag.on = true; try { el.setPointerCapture(e.pointerId); } catch (_) {} el.classList.add('is-dragging'); }
      }
      if (drag && drag.on) at(e);
    });
    var end = function (e) {
      if (drag && drag.touch && !drag.on && e.type === 'pointerup') at(e); // Antippen
      drag = null; el.classList.remove('is-dragging');
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', function () { drag = null; el.classList.remove('is-dragging'); });
    el.addEventListener('dragstart', function (e) { e.preventDefault(); });

    // Einmaliges sanftes Schwingen beim ersten Sichtbarwerden
    if (el.hasAttribute('data-swing') && !reduce && 'IntersectionObserver' in window) {
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
            if (t > 2.4) { set(base); raf = 0; return; }
            set(base + 18 * Math.sin(t * Math.PI * 2 / 1.6) * Math.pow(1 - t / 2.4, 2));
            raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
        }, 350);
      }, { threshold: 0.45 });
      io.observe(el);
    }
  });

  /* Bildwechsel-Karten: Knopf [data-swap] schaltet zweites Bild (Touch & Tastatur) */
  $$('[data-swap]').forEach(function (btn) {
    var card = btn.closest('.card-media');
    if (!card) return;
    btn.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      var on = !card.classList.contains('is-swapped');
      card.classList.toggle('is-swapped', on);
      btn.setAttribute('aria-pressed', String(on));
    });
  });

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

  /* Musterwahl [data-pattern] (Leistungsseiten): Segment-Schalter (role=radio, Pfeiltasten) zeigt eine Tafel;
     ohne JS stehen alle Tafeln untereinander. Bildwechsel per clip-path in leistungen.css. */
  $$('[data-pattern]').forEach(function (box) {
    var sw = $('[role="radiogroup"]', box), btns = $$('[data-pattern-to]', box), panels = $$('[data-pattern-panel]', box);
    if (!sw || !btns.length) return;
    sw.hidden = false; box.classList.add('is-live');
    var pick = function (b, focus) {
      var key = b.getAttribute('data-pattern-to');
      btns.forEach(function (x) { var on = x === b; x.setAttribute('aria-checked', String(on)); x.tabIndex = on ? 0 : -1; });
      panels.forEach(function (p) { var on = p.getAttribute('data-pattern-panel') === key; p.classList.toggle('is-on', on); p.setAttribute('aria-hidden', String(!on)); p.inert = !on; });
      if (focus) b.focus();
    };
    btns.forEach(function (b, i) {
      b.addEventListener('click', function () { pick(b); });
      b.addEventListener('keydown', function (e) {
        var k = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (k) { e.preventDefault(); pick(btns[(i + k + btns.length) % btns.length], true); }
      });
    });
    pick(btns[0]);
  });

  /* Anfrageformular vorbelegen: kontakt/?bodenart=Parkett&muster=Landhausdiele (nichts wird gespeichert) */
  (function () {
    var f = $('form[data-form]'); if (!f || !window.URLSearchParams) return;
    var q = new URLSearchParams(location.search), art = q.get('bodenart'), muster = q.get('muster');
    if (!art) return;
    var sel = f.elements.bodenart;
    if (sel) Array.prototype.forEach.call(sel.options, function (o) { if (o.value === art || o.text === art) sel.value = o.value || o.text; });
    var msg = f.elements.nachricht;
    if (msg && !msg.value) msg.value = 'Interesse: ' + art + (muster ? ', Muster ' + muster : '') + '.';
  })();

  /* Einblenden beim Scrollen (.reveal) – Inhalt ist ohne JS sichtbar ------------- */
  var reveals = $$('.reveal');
  if (reveals.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      reveals.forEach(function (r) { r.classList.add('is-visible'); });
    } else {
      var rio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-visible'); rio.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      reveals.forEach(function (r) { rio.observe(r); });
    }
  }

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
    success: '<strong>Danke für Ihre Anfrage.</strong>Sie ist bei uns angekommen. Wir melden uns zeitnah bei Ihnen – in der Regel mit einem Terminvorschlag.',
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
    form.addEventListener('change', function (e) { if (e.target.type === 'checkbox') mark(e.target, false); });

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
        // nach Position im Formular sortieren, erstes Feld fokussieren
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

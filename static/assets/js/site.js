/* handwerker-blesius.de – Seitenverhalten (Vanilla JS, ohne Abhängigkeiten)
   Jedes Modul prüft selbst, ob seine Elemente auf der Seite vorhanden sind.
   Haken:  [data-header] [data-burger] [data-mnav] [data-dropdown] [data-compare] [data-swing]
           [data-swap] .reveal [data-form] [data-filter-group]/[data-filter-target] [data-reels] [data-film] */
(function () {
  'use strict';
  var d = document, html = d.documentElement, body = d.body;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };

  /* Header: Zustand beim Scrollen ------------------------------------------ */
  var header = $('[data-header]');
  if (header) {
    var onScroll = function () { var on = window.scrollY > 24; if (on !== header.classList.contains('is-scrolled')) header.classList.toggle('is-scrolled', on); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Burger-Menü: Vollbild, Fokus-Falle, Esc, Scroll-Sperre ------------------ */
  var burger = $('[data-burger]'), mnav = $('[data-mnav]');
  if (burger && mnav) {
    var open = false;
    // nur sichtbare Ziele; am Handy gehört die Mobilbar (liegt über dem Menü) mit in den Kreis
    var focusables = function () {
      return [burger].concat($$('a[href], button:not([disabled])', mnav), $$('.mobilebar a[href]'))
        .filter(function (el) { return el === burger || el.getClientRects().length; });
    };
    var setMenu = function (state, returnFocus) {
      open = state;
      burger.setAttribute('aria-expanded', String(state));
      burger.setAttribute('aria-label', state ? 'Menü schließen' : 'Menü öffnen');
      if (header) header.classList.toggle('is-open', state);
      body.classList.toggle('is-locked', state);
      // Hinter dem Vollbild-Menü ist die Seite für Tastatur und Screenreader stumm (Mobilbar bleibt bedienbar)
      $$('main, .site-footer').forEach(function (el) { el.inert = state; });
      if (state) {
        mnav.hidden = false;
        requestAnimationFrame(function () { mnav.classList.add('is-open'); });
      } else {
        mnav.classList.remove('is-open');
        setTimeout(function () { if (!open) mnav.hidden = true; }, reduce ? 0 : 520);
        if (returnFocus) burger.focus();
      }
    };
    burger.addEventListener('click', function () { setMenu(!open); if (open) menuStatus(); });
    // Leistungen auf-/zuklappen (Plus/Minus)
    $$('[data-mnav-toggle]', mnav).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var g = btn.closest('[data-mnav-group]'), on = !g.classList.contains('is-expanded');
        g.classList.toggle('is-expanded', on);
        btn.setAttribute('aria-expanded', String(on));
        btn.setAttribute('aria-label', on ? 'Leistungen zuklappen' : 'Leistungen aufklappen');
      });
    });
    // Live-Öffnungsstatus in der Menü-Fußleiste (Alive.openStatus aus alive.js; ohne JS bleiben die festen Zeiten)
    var menuStatus = function () {
      var el = $('[data-mnav-open]', mnav), A = window.Alive;
      if (!el || !A || typeof A.openStatus !== 'function') return;
      var st = A.openStatus(new Date()), t = $('[data-mnav-open-text]', el);
      if (!st || !t) return;
      t.textContent = st.text;
      el.classList.toggle('is-open', !!st.open);
    };
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
    // Fokus landet im Untermenü (Tab) → offen halten, sonst verschwindet der fokussierte Link und der Fokus geht verloren
    menu.addEventListener('focusin', function () { if (!item.classList.contains('is-open')) set(true); });
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
    // Meldungen je Formular überschreibbar: data-msg-<schlüssel> (Leerzeichen → „-“), z. B. data-msg-email-telefon, data-msg-network
    var M = function (k) { var a = form.getAttribute('data-msg-' + k.replace(/ /g, '-')); return a != null ? a : MSG[k]; };
    var val = function (n) { var f = form.elements[n]; return f ? String(f.value || '').trim() : ''; };
    var mark = function (el, bad) { if (el) { if (bad) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid'); } };
    var fieldsIn = $$('input, select, textarea', form);
    var desc = function (el, id, on) { // ID an aria-describedby anhängen / wieder entfernen (vorhandene Hinweise bleiben)
      var ids = (el.getAttribute('aria-describedby') || '').split(/\s+/).filter(function (x) { return x && x !== id; });
      if (on) ids.push(id);
      if (ids.length) el.setAttribute('aria-describedby', ids.join(' ')); else el.removeAttribute('aria-describedby');
    };
    // Inline-Meldung direkt nach dem Feld (Select: nach seinem Rahmen, Checkbox: unter dem Text); group = alle Felder der Gruppe
    var showErr = function (el, msg, group) {
      if (!el || !el.id) return;
      group = group || [el];
      clearErr(el);
      var p = d.createElement('p'), id = el.id + '-err';
      p.className = 'field__error'; p.id = id; p.textContent = msg.replace(/<[^>]*>/g, '');
      p._group = group;
      var anchor = el.closest('.field__select') || el, box = el.closest('.field--check');
      if (box) box.appendChild(p); else anchor.parentNode.insertBefore(p, anchor.nextSibling);
      group.forEach(function (g) { mark(g, true); desc(g, id, true); g._err = p; });
    };
    var clearErr = function (el) {
      var p = el && el._err; if (!p) return;
      (p._group || [el]).forEach(function (g) { mark(g, false); desc(g, p.id, false); g._err = null; });
      if (p.parentNode) p.parentNode.removeChild(p);
    };
    var clearAll = function () { fieldsIn.forEach(clearErr); $$('[aria-invalid]', form).forEach(function (el) { mark(el, false); }); };
    var mailBad = function (el) { var v = el && String(el.value || '').trim(); return !!v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); };

    form.addEventListener('input', function (e) { if (e.target._err || e.target.getAttribute('aria-invalid')) { clearErr(e.target); mark(e.target, false); } });
    form.addEventListener('change', function (e) { if (e.target._err) clearErr(e.target); if (e.target.type === 'checkbox') mark(e.target, false); });
    // E-Mail schon beim Verlassen des Feldes prüfen
    if (form.elements.email) form.elements.email.addEventListener('blur', function () {
      var el = form.elements.email;
      if (mailBad(el)) showErr(el, M('email')); else if (el._err && el._err._group.length === 1) clearErr(el);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var errors = [];
      clearAll();
      $$('[required]', form).forEach(function (el) {
        var bad = el.type === 'checkbox' ? !el.checked : !String(el.value).trim();
        if (bad) { mark(el, true); errors.push({ el: el, msg: M(el.name) || M('fallback') }); }
      });
      (form.getAttribute('data-require-any') || '').split('|').forEach(function (grp) {
        var names = grp.trim().split(/\s+/).filter(Boolean);
        if (!names.length || names.some(function (n) { return val(n); })) return;
        var els = names.map(function (n) { return form.elements[n]; }).filter(Boolean)
          .sort(function (a, b) { return fieldsIn.indexOf(a) - fieldsIn.indexOf(b); });
        els.forEach(function (el) { mark(el, true); });
        if (els.length) errors.push({ el: els[0], group: els, msg: M(names.join(' ')) || M('fallback') });
      });
      var mail = form.elements.email;
      if (mailBad(mail) && !mail._err) { mark(mail, true); errors.push({ el: mail, msg: M('email') }); }
      if (errors.length) {
        // nach Position im Formular sortieren, je Feld eine Inline-Meldung, erstes Feld fokussieren
        var order = fieldsIn;
        errors.sort(function (a, b) { return order.indexOf(a.el) - order.indexOf(b.el); });
        errors.forEach(function (x) { if (!x.el._err) showErr(x.el, x.msg, x.group); });
        say('error', errors.map(function (x) { return x.msg; }).filter(function (m, i, arr) { return arr.indexOf(m) === i; }).join('<br>'));
        if (errors[0].el && errors[0].el.focus) errors[0].el.focus();
        return;
      }
      if (val('website')) { form.classList.add('is-sent'); say('success', form.getAttribute('data-success') || M('success')); return; } // Honeypot

      if (location.protocol === 'file:') { say('info', M('preview')); return; }

      var label = submit ? submit.textContent : '';
      if (submit) { submit.disabled = true; submit.textContent = 'Wird gesendet …'; }
      fetch(form.getAttribute('action') || form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
        .then(function (res) {
          if (res && res.ok) {
            form.classList.add('is-sent');
            say('success', form.getAttribute('data-success') || M('success'));
            form.reset();
            if (status) status.focus();
          } else {
            say('error', res && res.error ? String(res.error).replace(/</g, '&lt;') : M('network'));
          }
        })
        .catch(function () { say('error', M('network')); })
        .then(function () { if (submit) { submit.disabled = false; submit.textContent = label; } });
    });
  });

  /* Raumverwandlungen [data-reels]: Hochformat-Clips ---------------------------------------------------
     Stumm in Schleife, solange die Karte zur Hälfte sichtbar ist. Trailer (data-loop-end) zeigen stumm nur die
     Verwandlung und bleiben kurz auf dem fertigen Boden stehen. Ton-Knopf: ganzer Clip von vorn mit Ton, die
     anderen pausieren. Bei reduzierter Bewegung kein Autoplay – der Knopf startet den Clip. */
  var reels = $$('[data-reels] .reel');
  if (reels.length && 'IntersectionObserver' in window) {
    var R = reels.map(function (el, i) {
      return { el: el, v: $('video', el), btn: $('.reel__sound', el), bar: $('.reel__bar i', el),
        end: parseFloat(el.getAttribute('data-loop-end')) || 0, vis: false, sound: false, hold: 0, lag: i * 320, started: false };
    });
    var loud = function () { for (var i = 0; i < R.length; i++) if (R[i].sound) return R[i]; return null; };
    var play = function (r) { var p = r.v.play(); if (p && p.catch) p.catch(function () {}); };
    var sync = function (r) {
      if (r.sound) return;                                              // läuft mit Ton bis zum Ende
      var l = loud();
      if (r.vis && !reduce && !l && !r.hold) {
        if (!r.v.paused) return;
        if (!r.started && r.lag) {                                      // erster Start leicht versetzt (Kaskade statt Gleichtakt)
          r.started = true; r.hold = setTimeout(function () { r.hold = 0; sync(r); }, r.lag); return;
        }
        r.started = true; play(r);
      } else if (!r.v.paused) r.v.pause();
    };
    var setSound = function (r, on) {
      r.sound = on; r.v.muted = !on;
      r.btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      r.btn.setAttribute('aria-label', on ? 'Ton ausschalten' : 'Ton einschalten');
    };
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var r = R[reels.indexOf(e.target)];
        r.vis = e.isIntersecting && e.intersectionRatio >= 0.5;
        if (!r.vis && r.sound) { setSound(r, false); R.forEach(sync); }
        sync(r);
      });
    }, { threshold: [0, 0.5, 1] });
    R.forEach(function (r) {
      io.observe(r.el);
      r.btn.addEventListener('click', function (ev) {
        ev.stopPropagation();
        var on = !r.sound;
        R.forEach(function (o) { if (o !== r && o.sound) setSound(o, false); });
        if (r.hold) { clearTimeout(r.hold); r.hold = 0; }
        setSound(r, on);
        if (on) { r.v.currentTime = 0; play(r); }
        R.forEach(sync);
      });
      r.el.querySelector('.reel__frame').addEventListener('click', function () { r.btn.click(); });
      r.v.addEventListener('ended', function () {
        if (r.sound) setSound(r, false);
        r.v.currentTime = 0; R.forEach(sync);
      });
    });
    var tick = function () {
      R.forEach(function (r) {
        var v = r.v, len = (!r.sound && r.end) ? r.end : (v.duration || 1);
        if (!r.sound && r.end && !v.paused && v.currentTime >= r.end) {  // Verwandlung fertig: stehen lassen, dann von vorn
          v.pause();
          r.hold = setTimeout(function () { r.hold = 0; v.currentTime = 0; sync(r); }, 900);
        }
        r.bar.style.transform = 'scaleX(' + Math.min(1, v.currentTime / len).toFixed(4) + ')';
        var on = !v.paused; if (on !== r.el.classList.contains('is-playing')) r.el.classList.toggle('is-playing', on);
      });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* Imagefilm [data-film]: großer Knopf startet mit Ton, danach native Steuerung; am Ende zurück zum Startbild */
  $$('[data-film]').forEach(function (fig) {
    var v = $('video', fig), btn = $('.film__play', fig);
    if (!v || !btn) return;
    btn.addEventListener('click', function () {
      fig.classList.add('is-playing'); v.controls = true; v.muted = false;
      var p = v.play(); if (p && p.catch) p.catch(function () {});
      v.focus();
    });
    v.addEventListener('ended', function () { fig.classList.remove('is-playing'); v.controls = false; v.load(); btn.focus(); });
  });
})();

/* Anfrageformular vorbelegen (Kontaktseite) – alle Seiten verlinken auf kontakt/?… (s. docs/copy/*.md, Punkt 7).
   Strikte Whitelist: nur bekannte Parameter/Werte werden übernommen, alles andere ignoriert. Werte gehen nur per
   .value/.textContent ins Formular (nie als HTML), nichts wird gespeichert oder gesendet. Der Kunde kann alles ändern.
   bodenart  Parkett|Vinyl|Laminat|Teppich|Treppe|Untergrund|Noch offen (nur vorhandene Select-Optionen)
   muster    landhausdiele|fischgrät                         (Parkett)
   raum+wunsch                                               (Wegweiser leistungen/)
   raum+check=laminat                                        (Raum-Check Laminat)
   raum, optik, heizung, boden                               (Vinyl „Vier Fragen“)
   form, bauart, stufen, belag                               (Treppen-Steckbrief)
   flor, form=bahn|fliese                                    (Teppich)
   flaeche (Ziffern), nachricht (Freitext, max. 1000 Zeichen, wird angehängt)                                    */
(function () {
  'use strict';
  if (!window.URLSearchParams || !location.search) return;
  var forms = document.querySelectorAll('form[data-form]'), f = null, i;
  for (i = 0; i < forms.length; i++) if (forms[i].elements.bodenart && forms[i].elements.nachricht) { f = forms[i]; break; }
  if (!f) return;
  var q = new URLSearchParams(location.search);
  var has = function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };
  var key = function (k) { return String(q.get(k) || '').trim().toLowerCase(); };
  var pick = function (map, k) { var v = key(k); return v && has(map, v) ? map[v] : ''; };
  var clean = function (v, max) {
    return String(v || '').replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, ' ').replace(/[ \t]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n').trim().slice(0, max);
  };

  /* Beschriftungen aus den Copy-Decks */
  var WW_RAUM = { wohnen: 'Wohn- und Esszimmer', schlafen: 'Schlaf- und Kinderzimmer', kueche: 'Küche', bad: 'Bad', flur: 'Flur und Eingang', treppe: 'Treppe', gewerbe: 'Büro oder Laden' };
  var WW_WUNSCH = { holz: 'Echtes Holz', nass: 'Unempfindlich bei Nässe', robust: 'Robust im Alltag', leise: 'Leise und warm' };
  var WW_EMPF = { // Reihenfolge holz | nass | robust | leise
    wohnen: ['Parkett', 'Vinyl', 'Laminat', 'Teppich'], schlafen: ['Parkett', 'Vinyl', 'Vinyl', 'Teppich'],
    kueche: ['Parkett', 'Vinyl', 'Vinyl', 'Vinyl'], bad: ['Vinyl in Holzoptik', 'Vinyl, verklebt', 'Vinyl', 'Vinyl'],
    flur: ['Parkett', 'Vinyl', 'Vinyl', 'Vinyl'], gewerbe: ['Parkett', 'Vinyl', 'Vinyl, verklebt', 'Teppich'],
    treppe: ['Treppe mit Holzstufen', 'Treppe mit Vinyl', 'Treppe mit Vinyl', 'Treppe mit Teppich']
  };
  var LAM = {
    wohnen: ['Wohn- und Esszimmer', 'Gut geeignet'], schlafen: ['Schlaf- und Kinderzimmer', 'Gut geeignet'],
    kueche: ['Küche', 'Nur mit Vorsicht'], bad: ['Bad', 'Nicht empfohlen'],
    flur: ['Flur und Eingang', 'Im Flur gut, am Eingang mit Schmutzfang'], gewerbe: ['Büro oder Laden', 'Gut geeignet, mit Gewerbeklasse'],
    keller: ['Keller', 'Nur wenn der Raum trocken ist']
  };
  var VIN_RAUM = { wohnen: 'Wohn- oder Schlafraum', kueche: 'Küche', bad: 'Bad oder WC', flur: 'Flur', dach: 'Dachgeschoss', gewerbe: 'Büro oder Laden' };
  var VIN_OPTIK = { holz: 'Holz', stein: 'Stein', offen: 'noch offen' };
  var VIN_HEIZ = { ja: 'ja', nein: 'nein', unklar: 'weiß nicht' };
  var VIN_BODEN = { estrich: 'Estrich', fliesen: 'Fliesen', altbelag: 'Teppich, PVC oder Laminat', dielen: 'Holzdielen', unklar: 'weiß nicht' };
  var TR_FORM = { gerade: 'Gerade Treppe', viertel: 'Viertelgewendelte Treppe', halb: 'Halbgewendelte Treppe', podest: 'Treppe mit Podest', andere: 'Treppe in anderer Form' };
  var TR_BAU = { geschlossen: 'geschlossen, mit Setzstufen', offen: 'offen, ohne Setzstufen' };
  var TR_BELAG = { teppich: 'heute mit Teppich belegt', holz: 'heute Holz', fliese: 'heute Fliese oder Stein', beton: 'heute Beton ohne Belag', pvc: 'heute PVC oder Linoleum', unbekannt: 'heutiger Belag noch unklar' };
  var TP_FLOR = { schlinge: 'Flor Schlinge', velours: 'Flor Velours', frise: 'Flor Frisé', 'frisé': 'Flor Frisé', hochflor: 'Flor Hochflor' };
  var TP_FORM = { bahn: 'Bahnenware', fliese: 'Teppichfliesen' };
  var MUSTER = { landhausdiele: 'Landhausdiele', 'fischgrät': 'Fischgrät', fischgraet: 'Fischgrät' };

  /* Bodenart: nur eine vorhandene Option (Groß/klein egal, „Treppen“ → „Treppe“) */
  var sel = f.elements.bodenart, art = key('bodenart').replace(/^treppen$/, 'treppe'), opt = null;
  if (art && sel.options) for (i = 0; i < sel.options.length; i++) {
    if (sel.options[i].value !== '' && (sel.options[i].value || sel.options[i].text).trim().toLowerCase() === art) { opt = sel.options[i]; break; }
  }
  var bodenart = opt ? opt.text.trim() : '';

  var lines = [], treppe = false, raum = key('raum'), wunsch = key('wunsch');
  if (has(WW_EMPF, raum) && has(WW_WUNSCH, wunsch)) {                   // Wegweiser
    lines.push('Raum: ' + WW_RAUM[raum] + '.', 'Am wichtigsten ist mir: ' + WW_WUNSCH[wunsch] + '.',
      'Erste Einschätzung aus dem Wegweiser: ' + WW_EMPF[raum][['holz', 'nass', 'robust', 'leise'].indexOf(wunsch)] + '.');
  } else if (key('check') === 'laminat' && has(LAM, raum)) {             // Raum-Check Laminat
    lines.push('Raum: ' + LAM[raum][0] + '.', 'Erste Einschätzung von der Laminat-Seite: ' + LAM[raum][1] + '.');
  } else {
    var tf = pick(TR_FORM, 'form'), tb = pick(TR_BAU, 'bauart'), tl = pick(TR_BELAG, 'belag');
    var sm = /^\d{1,2}$/.test(key('stufen')) ? +key('stufen') : 0, ts = sm >= 1 && sm <= 40 ? sm : 0;
    if (tf || tb || ts || tl) {                                            // Treppen-Steckbrief
      treppe = true;
      var bits = [tf || 'Treppe, Form noch offen'];
      if (tb) bits.push(tb);
      bits.push(ts ? ts + (ts === 1 ? ' Stufe' : ' Stufen') : 'Stufen noch nicht gezählt');
      if (tl) bits.push(tl);
      lines.push('Treppe: ' + bits.join(', ') + '.', 'Fotos schicke ich per WhatsApp oder E-Mail.');
    } else {
      var vr = pick(VIN_RAUM, 'raum'), vo = pick(VIN_OPTIK, 'optik'), vh = pick(VIN_HEIZ, 'heizung'), vb = pick(VIN_BODEN, 'boden');
      var extra = [pick(MUSTER, 'muster') && 'Muster ' + pick(MUSTER, 'muster'), pick(TP_FLOR, 'flor'), pick(TP_FORM, 'form')].filter(Boolean);
      if (bodenart || extra.length) lines.push('Interesse: ' + [bodenart].concat(extra).filter(Boolean).join(', ') + '.');
      if (vr) lines.push('Raum: ' + vr + '.');                             // Vinyl „Vier Fragen“
      if (vo) lines.push('Optik: ' + vo + '.');
      if (vh) lines.push('Fußbodenheizung: ' + vh + '.');
      if (vb) lines.push('Jetziger Boden: ' + vb + '.');
    }
  }
  var text = clean(q.get('nachricht'), 1000);
  if (text) lines.push(text);

  var fm = clean(q.get('flaeche'), 24).match(/^\d{1,5}(?:[.,]\d{1,2})?(?:\s*[-–]\s*\d{1,5}(?:[.,]\d{1,2})?)?$/);
  var flaeche = fm && !treppe ? fm[0] : '';
  if (!opt && !lines.length && !flaeche) return;

  var done = [];
  if (opt && !sel.value) sel.value = opt.value || opt.text;
  if (opt && sel.value === (opt.value || opt.text)) done.push('Bodenart ' + (bodenart === 'Noch offen' ? 'noch offen' : bodenart));
  var fl = f.elements.flaeche;
  if (fl && flaeche) { if (!fl.value) fl.value = flaeche; if (fl.value === flaeche) done.push('ca. ' + flaeche + ' m²'); }
  var msg = f.elements.nachricht;
  if (lines.length && !msg.value.trim()) { msg.value = lines.join('\n'); done.push('Ihr Vorhaben'); }

  var note = document.querySelector('[data-prefill-note]'), noteText = note && note.querySelector('[data-prefill-text]');
  if (note && noteText && done.length) {
    noteText.textContent = treppe
      ? 'Ihre Angaben aus dem Treppen-Steckbrief sind eingetragen. Bitte noch Name und Telefon oder E-Mail ergänzen. Die Fläche können Sie bei einer Treppe leer lassen.'
      : 'Schon im Formular eingetragen: ' + done.join(', ').replace(/, ([^,]*)$/, ' und $1') + '. Sie können alles ändern.';
    note.hidden = false;
  }
})();

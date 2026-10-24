# handwerker-blesius.de – Spezifikation der finalen Website

Kunde: **Handwerker Blesius GmbH**, Bodenleger in Wermelskirchen. Der Kunde hat aus 14 Entwürfen zwei Favoriten gewählt: **„Meisterstück dunkel“** und **„Unter der Oberfläche“**. Die finale Seite verbindet beide:

- **Basis = Meisterstück dunkel**: warmes Fast-Schwarz, edle Serif-Headlines (Newsreader, ein Wort kursiv), Instrument Sans für Text, großes Vollbild-Foto im Hero, viel Ruhe und Luft, Orange nur als Akzent.
- **Dazu aus „Unter der Oberfläche“**: Vorher/Nachher-Regler (Untergrund → Ergebnis), Untergrund-Schritte 01–05 mit kleiner Schnittzeichnung (SVG-Schichten), Mono-Labels/Bildunterschriften in **DM Mono** (präziser Werkstatt-Eindruck), Leistungskarten mit Bildwechsel bei Hover/Tap.
- Leitidee: **edel, schlicht, unverkennbar deutsches Handwerk**. Marketing (Anfragen) genauso wichtig wie Optik.

Vorlagen zum Nachschlagen (nur lesen!):
- `/tmp/claude-0/-home-user/e534d912-4457-5b36-a90e-2c029f42c4b5/scratchpad/site/v01d.html` (Meisterstück dunkel)
- `/tmp/claude-0/-home-user/e534d912-4457-5b36-a90e-2c029f42c4b5/scratchpad/site/v04d.html` (Unter der Oberfläche dunkel)
- Inhalts- und Faktenregeln: `/tmp/claude-0/-home-user/e534d912-4457-5b36-a90e-2c029f42c4b5/scratchpad/site/BRIEF.md` (Abschnitte „Fakten“, „Texte / Marketing“ gelten weiter: **nichts erfinden**, keine Bewertungen/Zahlen/Zertifikate/Preise/Garantien, Handwerker-Foto nur „Aus unserem Team“).

## Projekt & Build
- Ordner: `/home/user/blesius-website`. Build: `python3 build.py` (→ `dist/`) und `python3 build.py --local` (→ `preview/` mit index.html-Links). Doku zum Seitenkopf und Platzhaltern oben in `build.py`.
- `src/layout.html` = Grundgerüst (head, header, main-Slot `{{content}}`, footer, Skripte).
- `src/partials/*.html` = wiederverwendbare Teile (header, footer, mobilebar, cta-band, contact-form …).
- `src/pages/*.html` = eine Datei pro Seite (Dateiname frei, z. B. `leistungen-parkett.html`; der Ausgabepfad steht im Kopf `path:`).
- `static/` wird 1:1 nach dist kopiert: `assets/css/site.css` (globales Design-System), `assets/css/fonts.css` (lokale Schriften – **keine Google-Fonts-Links, DSGVO**), `assets/js/site.js`, `assets/img/`, `assets/brand/`.
- Bilder **nur** über `{{img name alt="…" sizes="…"}}` einbinden (erzeugt WebP+JPEG, width/height). Verfügbare Namen + Größen: `src/images.json`. Inhalte der Bilder: siehe Tabelle in BRIEF.md. `kueche-eiche` ist jetzt ein Querformat (Boden + Kochinsel + LED, ohne Arbeitsplatte).
- Interne Links immer relativ mit `{{root}}`, mit Schrägstrich am Ende: `{{root}}leistungen/parkett/`, Startseite `{{root}}` bzw. `{{root}}#kontakt`.
- Kein externes Laden von irgendetwas (keine CDNs, keine Google Fonts, kein Maps-/YouTube-Embed). Karte nur als eigenes SVG oder Link „In Google Maps öffnen“.

## Seitenstruktur (Informationsarchitektur)
| Pfad | nav | Inhalt |
|---|---|---|
| `` | start | Startseite |
| `leistungen/` | leistungen | Übersicht aller Leistungen |
| `leistungen/parkett/` | leistungen | Parkett (Fertigparkett, Landhausdiele, Fischgrät) |
| `leistungen/vinyl/` | leistungen | Vinyl (Klick & Klebe, Holz-/Steinoptik, Bad/Küche) |
| `leistungen/laminat/` | leistungen | Laminat |
| `leistungen/teppich/` | leistungen | Teppich (kein Foto vorhanden → typografisch/grafisch lösen) |
| `leistungen/treppen/` | leistungen | Treppen belegen/renovieren |
| `leistungen/untergrund/` | leistungen | Untergrundvorbereitung (Prüfen, Entfernen, Schleifen/Fräsen, Grundieren, Spachteln/Nivellieren) |
| `projekte/` | projekte | Projekte/Referenzen (alle passenden Fotos, Filter nach Bodenart, Vorher/Nachher) |
| `ueber-uns/` | ueber-uns | Marcel Blesius, Team, Werte, Arbeitsweise, Einsatzgebiet |
| `karriere/` | karriere | Bodenleger & Trockenbauer (m/w/d), 1.000 € Wechselbonus, Bewerbungsformular |
| `kontakt/` | kontakt | Kontakt, Formular, Öffnungszeiten, Anfahrt (Link zu Google Maps), Ablauf |
| `impressum/` | – | Impressum (echte Daten s. u.) |
| `datenschutz/` | – | Datenschutzerklärung (Gerüst, s. u.) |
| `404.html` | – | Fehlerseite, noindex |

Hauptnavigation: Leistungen · Projekte · Über uns · Karriere · Kontakt + Telefon + Button „Angebot anfragen“ (→ `{{root}}kontakt/`). Leistungen-Menüpunkt am Desktop mit Untermenü (Dropdown, per Tastatur bedienbar) zu den 6 Leistungsseiten.

## Design-System (verbindlich – in `static/assets/css/site.css`, Stand Redesign 24.10.2026 nach tasteskill v2)
Richtung **„The well-kept board“**: Die Seite ist ein verlegter Boden aus Kacheln – gefüllte Flächen, Fuge 8 px (Handy 6 px), Reihen im Verband, eckig, keine Linien, keine Schatten in Ruhe, keine Verläufe (außer neutralem Scrim über Foto), keine Eyebrows, kein Mono, keine Index-Nummern, kein kursives/farbiges Akzentwort. Copy-Deck: `docs/COPY-START.md`.
- Farben (Tokens): `--bg #0F0E0D` (Grund = Fuge), `--tile #1B1917`, `--tile-2 #24211E`, `--tile-3`, `--ink #ECEAE6` (neutraler Knochenton), `--soft #ABA59D`, `--paper #ECEAE6` / `--on-paper #141210`, `--graphite #525252` (+ `-0/-2/-3`), `--accent #F28135` / `--on-accent #141210`, Stufen `--g1…--g5` (dunkel → hell). Orange nur auf Aktion + eine Kachel je Bereich.
- Schriften: `--serif` Newsreader (Name, Überschriften, nie kursiv), `--sans` Instrument Sans (alles andere). DM Mono und Newsreader kursiv sind entfernt.
- Fünf Größen: `--fs-display` (Name/Riesenwort), `--fs-head` (H2), `--fs-lead` (H3, Aussagen in Kacheln), `--fs-body` 17 px, `--fs-small` 14 px; dazu `--fs-say` (Aussage ≤ 36 px) und `--fs-figure` (eine Kennzahl). Nichts unter 13 px, Fließtext in voller Tinte.
- Raster: Ränder `--m` 16 px, Fuge `--j`, `--pad` 18–24 px, Abschnittsabstand `--sec`; Sektionen `.sec` (Ränder, ab 1920 px zentriert), 12-Spalten-Raster `.grid12`.
- Kacheln: `.t` (gefüllt), `.t--paper`, `.t--accent`, `.t--graphite`, `.t--photo` (Foto füllt die Kachel). Buttons: `.btn .btn--ink` (eckig), Links `.link` (2-px-Unterstreichung).
- Komponenten der Startseite: `.hero__board` (2 × 2), `.mosaic` (Fischgrät über 6 × 4 Kacheln, ab ≤ 1099 px 3 × 6), `.svc` + `details.bar` (Leistungen), `.acc` (Akkordeon getönter Paneele, ≥ 1100 px horizontal), `.compare` (Vorher/Nachher-Regler), `.wall` (Projekte-Wand), `.about__*`, `.proof__board`, `.calc` (Aufmaß-Rechner), `.cta` (Partial `cta-band`), `.contact` + `.form`/`.cell` (Formular in Zellen), `.strip` (Fotostreifen-Laufband), `.ftr` (Footer aus Kacheln).
- Kopf `.hdr`: Kachelreihe 60 px (Logo-Kachel · Navigations-Kachel mit Dropdown · Telefon + Live-Status · „Angebot anfragen“); < 1100 px Logo-Kachel + Menü-Kachel, Menü als Kachel-Bogen; < 600 px Mobilbar (Anrufen · WhatsApp · Anfragen).
- Unterseiten-Bausteine: `site.css` Abschnitt 23, Doku unten in **„## Unterseiten-Bausteine“**. Referenzseite: `src/pages/leistungen-parkett.html`.
- Bildnachweis gefundener Bilder: Seitenkopf `credits:` → erscheint im Footer (`{{credits}}`, siehe `build.py`).
- Barrierefreiheit: Skip-Link, Fokus sichtbar (orange Outline), eine H1 pro Seite, Alt-Texte, Formular-Labels, Kontrast ≥ 4.5:1.

## SEO / Marketing (jede Seite)
- `title` ≤ 60 Zeichen mit Leistung + „Wermelskirchen“ wo sinnvoll, `description` ≤ 155 Zeichen mit Nutzen + Handlungsaufforderung.
- Genau eine H1 (Leistung + Ort), sinnvolle H2/H3. Interne Verlinkung zwischen Leistungsseiten, Projekten und Kontakt.
- Leistungsseiten: Nutzen, Eigenschaften (allgemein gültig), für welche Räume, Ablauf, Untergrund-Hinweis, passende Projektfotos, FAQ (3–5 Fragen, allgemein gültige ehrliche Antworten, keine Preise/Garantien), CTA. Ortsbezug natürlich: „in Wermelskirchen, Remscheid, Solingen, Wuppertal, Burscheid, Bergisch Gladbach und Köln“.
- JSON-LD: global `HomeAndConstructionBusiness` im Layout (Name, Adresse, Telefon, E-Mail, Öffnungszeiten, areaServed, sameAs Instagram, logo, image). Leistungsseiten zusätzlich `Service` + `FAQPage` (über `jsonld:` im Seitenkopf, Datei in `src/jsonld/`). Keine `aggregateRating`!
- Open Graph/Twitter: `assets/img/og-image.jpg`.

## Fakten für Impressum (von der bisherigen Website)
Handwerker Blesius GmbH · vertreten durch den Geschäftsführer Marcel Blesius · Neuenhöhe 17, 42929 Wermelskirchen · Telefon +49 1590 1717 249 · info@handwerker-blesius.de · Handelsregister: Amtsgericht Köln, HRB 122801 · USt-IdNr.: DE454037857 · Mitglied der Handwerkskammer zu Köln, Heumarkt 12, 50667 Köln · Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: Marcel Blesius, Anschrift wie oben. Zusätzlich übliche Hinweise (EU-Streitschlichtung/Verbraucherstreitbeilegung) als markierter Vorschlag „vom Kunden/Rechtsberatung prüfen“.

## Formulare
- Kontakt- und Bewerbungsformular senden per `fetch` an `{{root}}anfrage.php` (PHP-Mailer für IONOS-Webhosting, liegt in `static/anfrage.php`), mit Honeypot-Feld, Pflichtfeldprüfung, Datenschutz-Checkbox, Erfolg/Fehler-Meldung im Formular. Ohne Server (lokale Vorschau) → freundliche Meldung „Vorschau: Formular wird erst auf dem Webserver versendet“.

## Motion-System
Dateien: `static/assets/js/motion.js` (eigenes System), `static/assets/js/stage.js` (Szenen-Bühne aus tasteskill, unverändert), Bibliotheken lokal in `static/assets/js/vendor/` (GSAP 3.13 + ScrollTrigger + SplitText, Lenis 1.3.4 = `window.Lenis`). Einbindung im Layout mit `defer` in dieser Reihenfolge: gsap → ScrollTrigger → SplitText → lenis → stage.js → motion.js → site.js. CSS: Abschnitt „22 Motion-System“ in `site.css`.

**Grundregeln** (tasteskill „Move“): nur `transform`/`opacity`/`clip-path`; Startzustände setzt ausschließlich motion.js (Inline-Styles, `html.has-motion`) – ohne JS, bei fehlgeschlagenem Laden und bei `prefers-reduced-motion: reduce` ist alles sofort sichtbar und bedienbar. Reveals einmalig, bei ca. 88–90 % Viewport-Höhe, 0,8 s expo-out, 24 px Hub, Staffel 80 ms (Überschrift → Text → Bild). Kein Preloader, kein Custom-Cursor, keine Wheel-Übernahme, kein Bounce. Eyebrows, Mono-Labels, Index-Nummern und Haarlinien gibt es nicht mehr (House Rules). Einzige CSS-Zurückhaltung: `html.motion-pending` (Inline-Skript im `<head>`, nur bei no-preference, max. 2,5 s) blendet Hero-Zeilen bis zum Start der Ladesequenz aus.

| Attribut | Wirkung | Hinweise |
|---|---|---|
| (global) | Lenis-Smooth-Scroll, lerp 0.1, an ScrollTrigger gekoppelt; Ankerlinks `href="#…"` laufen weich mit Header-Abstand | nur Maus/Trackpad (`hover:hover` + `pointer:fine`), nie Touch/reduced. `window.Motion.lenis` |
| `data-hero` | Hero: Ladesequenz ≤ 1,2 s und „legt sich in die Seite“ beim Scrollen (Bild zieht sich in einen Rahmen `clip-path: inset`, sinkt 6 %, wird ruhiger; Text hebt ab) | Kinder: `data-hero-media` (erstes `img`/`video` darin bekommt Settle + langsamen Ken-Burns, pausiert außerhalb), `data-hero-lines` (Zeilen steigen aus Maske), `data-hero-load` (steigen 16 px), `data-hero-copy` (Textblock für den Scroll-Abgang). Video statt Bild: einfach `<video>` in `.hero__media` setzen |
| `data-lay` | „Dielen legen sich“: die Kinder (Kacheln) öffnen sich nacheinander von links (clip-path, 70 ms Staffel) | auf die Kachelreihe setzen |
| `data-mosaic` | Fischgrät-Mosaik wird Kachel für Kachel verlegt, Reihen versetzt | nur `.mosaic__grid` |
| `data-chars` | Ein-Wort-Riesentitel: Buchstaben steigen nacheinander aus der Maske | nur für 1–2 Wörter |
| `data-push` | Riesentitel wird beim Scrollen sacht seitlich geschoben (±2,5 %) | an den Scrollbalken gebunden |
| `data-hero-word` / `data-hero-shutter` / `data-hero-plank` / `data-hero-rise` | Hero-Brett: Name steigt aus der Maske, Foto öffnet sich per Shutter (Signatur) und setzt sich, zweites Foto legt sich von links ein, Sätze steigen; danach langsamer Ken-Burns | Ladesequenz ≤ 1,2 s |
| `data-open-status` | Live-Öffnungsstatus (Europe/Berlin), `="short"` Kurzform | site.js; ohne JS bleibt der HTML-Text |
| `data-calc` | Aufmaß-Rechner (Fläche, Bestellmenge ca. inkl. 7/12/15 % Verschnitt, Umfang, Grundriss als SVG), „Mit diesen Maßen anfragen“ füllt das Formular vor | site.js |
| `data-split` | Überschrift: Zeilen steigen einmalig aus ihrer Maske (SplitText, nach Font-Laden, danach wieder normaler Text) | `data-split="fill"`: Wörter füllen sich beim Scrollen von 45 % auf volle Deckkraft (ein Statement pro Seite) |
| `data-reveal` | Element steigt 24 px + blendet ein | `="fade"` nur Blende, `="scale"` aus 0,96 |
| `data-stagger` | wie `data-reveal`, aber für alle direkten Kinder nacheinander (80 ms) | für Listen, Fakten, Kontaktliste |
| `data-shutter` | Bildrahmen öffnet sich von unten, Bild setzt sich aus 1,08 | `="planks"`: öffnet in versetzten Dielen-Streifen von links (`data-rows="5"`) |
| `data-parallax` | Bild driftet im Rahmen (Wert 0.02–0.08, Standard 0.06), Bild wird automatisch überskaliert | auf den Rahmen setzen, kombinierbar mit `data-shutter`. Hover-Zoom dann per CSS `scale`, nicht `transform` |
| `data-roll` | Ziffern rollen einmalig auf ihren Wert („1.000“); echter Wert bleibt für Screenreader im Text | nur für wenige Kennzahlen in Display-Größe |
| `data-marquee` | Laufband: eine Zeile großer Schrift, endlos; Tempo und Richtung folgen der Scroll-Geschwindigkeit; Pause bei Hover und außerhalb des Bildschirms; reduced = statisch | Markup: `.marquee > .marquee__track > .marquee__set` (Set wird automatisch geklont), `data-marquee-speed="40"` (px/s). Max. eins pro Seite, `aria-hidden` |
| `data-draw` | SVG zeichnet sich: `[data-draw-line]` (mit `pathLength="1"`) nacheinander, `[data-draw-dot]` poppen auf, `[data-draw-fade]`/`[data-draw-label]` blenden ein | z. B. Einsatzgebiet-Karte |
| `data-index-preview` | Liste mit Vorschau: am Desktop (Maus, ≥ 1024 px) öffnet sich ein Bild **auf Höhe der Zeile** (nicht am Cursor), übrige Zeilen auf 40 % | Zeilen = Links; Bildquelle `[data-preview] img` in der Zeile. Touch: CSS zeigt das Bild in der Zeile (Karten, Scroll-Snap). Klasse `.svc` als Vorlage |
| `data-sticky-cta` | Schwebender Handlungsknopf erscheint nach `data-sticky-after` (Selektor, Standard `[data-hero]`) und verschwindet vor `data-sticky-hide` (Standard `#kontakt`) sowie über gehaltenen Szenen | CSS zeigt ihn nur ≥ 861 px (darunter Mobilbar) |
| `class="scene" data-scene="opening"` | Scroll-Szene (stage.js): Bild öffnet sich vom Fenster zum ganzen Screen | `data-options='{"hold":1}'`; Markup `.scene-stage > .scene-pic` (img). Telefon gleich, reduced = fertiges Vollbild |
| `class="scene" data-scene="story"` | Gehaltene Bühne: `[data-beat-step]` leuchten nacheinander auf (Rest 40 %), `[data-beat-count]` zeigt „2 von 5“, `[data-compare]` fährt von `data-compare-from` nach `data-compare-to` (danach frei ziehbar) | `data-options='{"hold":3}'`; Telefon/reduced = fertige Ansicht (alle Schritte, Regler mit Schwingen) |
| `data-at="0.4"` / `data-out="0.6"` | innerhalb einer Szene: erscheint/verschwindet bei diesem Anteil der Szene | ohne Szene (Ruhezustand) ist `data-at` sichtbar, `data-out` ausgeblendet |

Beispiel (Unterseite, Bausteine siehe unten):
```html
<section class="sec" aria-labelledby="x-h">
  <div class="split-tile">
    <figure class="split-tile__pic t t--photo" data-shutter data-parallax="0.04">{{img handwerker alt="…"}}</figure>
    <div class="split-tile__body t">
      <h2 id="x-h" data-split>Sauber verlegt, sauber übergeben</h2>
      <p class="lead">…</p>
      <ul class="list" data-stagger><li>…</li><li>…</li></ul>
    </div>
  </div>
</section>
```
Eigene Szene: `Scenes['name'] = (root, opts) => Stage.scene(root, { hold, phone, build(tl, { q, phone }) { … } })` vor motion.js laden; Positionen im Timeline sind Anteile 0–1 (siehe tasteskill `references/scenes.md`). Weitere Buttons haben Druck-Feedback (`.btn:active` 0,97).

## Unterseiten-Bausteine

Stand 24.10.2026. CSS: `static/assets/css/site.css`, Abschnitt **23** (nicht ändern – fehlt etwas, beim Projektleiter melden). JS: `site.js` Modul `[data-switch]`. Referenzseite mit allen Bausteinen: `src/pages/leistungen-parkett.html` → `leistungen/parkett/`.
Feinschliff, den **alle Leistungsseiten** teilen: `static/assets/css/leistungen.css` (`css: leistungen`). Alle Bausteine sind ohne JS und bei reduzierter Bewegung vollständig; jede Komposition hat eine eigene Handy-Fassung (≤ 599 px) und eine Tablet-Fassung (≤ 1099 px).

**Grundregeln für Unterseiten**
- Jede Sektion: `<section class="sec" id="…" aria-labelledby="…-h">`, darin meist zuerst `.sec-head`. Eine H1 pro Seite (im `.page-board`), H2 je Abschnitt, max. zwei Zeilen.
- Flächen: Kacheln sind gefüllt, Fuge `--j`. Orange (`t--accent`, `tile--accent`, `btn--accent`) nur für Aktionen, höchstens eine orange Fläche pro Bildschirm.
- Bretter direkt untereinander (`.tiles`, `.feature-tiles`, `.split-tile`, `.choice`, `.related`, `.photo-wall`, `.steps-row`, `.data-table`) bekommen automatisch nur die Fuge als Abstand → wirken wie ein Brett. Text/Links unter einem Brett: Klasse `.sec-after`.
- Farbe von Kacheln, die `.t` nutzen (`page-board__*`, `split-tile__body`, `choice__body`, Foto-Rahmen): über `t--paper`, `t--graphite`, `t--accent`, `t--photo`. Bausteine mit eigenen Flächen (`.tile`, `.feature`) haben eigene Modifier.
- Motion sparsam: `data-split` auf H2, `data-reveal` auf Untersatz/Hinweis, `data-lay` auf Brett-Reihen (`.tiles`, `.steps-row`, `.related`, `.photo-wall`), `data-stagger` auf Listen (`.feature-tiles`, `.faq__list`), `data-shutter` (+ `data-parallax="0.04"`) auf einzelne große Fotos. Nicht schachteln (kein `data-reveal` in `data-lay`).
- Bilder nur per `{{img …}}`, Fotos in Kacheln immer mit `pos="x% y%"` ausrichten; `sizes` passend zur Kachelbreite.
- Links mit Parametern sind erlaubt (`{{root}}kontakt/?bodenart=Parkett`); `build.py --local` setzt dafür jetzt `index.html` vor das `?`.

| Klasse | Zweck | Varianten / Teile |
|---|---|---|
| `.sec-head` | Abschnittskopf: H2 links (Sp. 1–7), Untersatz rechts (8–12), Handy untereinander | `--stack` (alles links, Untersatz in Lead-Größe) |
| `.sec--band` | ein getöntes Feld pro Seite (wie die Projekte-Wand); Kacheln darin werden automatisch eine Stufe heller | – |
| `.page-board` | Seiten-Hero als Brett: Hauptkachel (Brotkrumen, H1, Untersatz, Aktion), Foto (2 Reihen hoch), Fakt-Kachel, Ruf-Kachel; fehlt eine Kachel, rücken die anderen nach | `__main` `__h` `__mask` `__lead` `__actions` `__pic` `__pic--b` `__cap` `__fact` `__call`; `--text` (ohne Foto: Recht, 404) |
| `.crumbs` | Brotkrumen ohne Linien (Trenner „›“), in Kachel oder über einer Sektion | Farbe passt sich `t--paper`/`t--graphite` an |
| `.tiles` + `.tile` | freies Brett (12 Spalten): Fakten, Aussagen, Foto-Kacheln, Aktions-Kachel | Größe `--quarter` 3 · (Standard 4) · `--half` 6 · `--wide` 8 · `--full` 12 · `--tall` 2 Reihen; Fläche `--tone` `--paper` `--accent` `--graphite` `--photo` (Höhe `style="--tile-h:460px"`); Inhalt `__name` `__say` `__cap` `__end`; `--go` = Link-Kachel mit Pfeil |
| `.feature-tiles` | Eigenschaften/Vorteile/Regeln als Kacheln ohne Icons (`dl`); 2/4 → halbe, 5 → 2 halbe + 3 Drittel, sonst Drittel | `.feature` (`--tone` `--paper` `--graphite`), `__name`; `--pic` (Foto links + `__list` 2-spaltig rechts), `--flip`, `__pic--stack` (mehrere Fotos übereinander) |
| `.split-tile` | Foto + Text nebeneinander (7 + 5 Spalten), H2 darf in der Textkachel stehen | `--flip` (Foto rechts), `--even` (6 + 6), `__cap` |
| `.choice` + `.switch` | 2–4 Tafeln (Foto/Zeichnung + H3, Text, `.specs`, Anfrage-Link). Mit `data-switch`: Segment-Schalter, eine Tafel, Pfeiltasten; ohne JS alle Tafeln nebeneinander | `__panel` `__pic` `__badge` (kleine Draufsicht-SVG) `__cap` `__body` `__note`; JS-Ereignis `switch` |
| `.specs` | Kennwerte als Zeilen (`dl`), Tonstufe auf jeder Fläche | Handy: Begriff über Wert |
| `.data-table` | Vergleichstabelle, Zellen als Kacheln mit Fuge | `--stack` (Handy: jede Zeile als Block, `td` braucht `data-label`), sonst in `<div class="table-scroll" tabindex="0" role="region" aria-label="…">` (Handy quer wischbar im Container); `--wide` (min. 760 px) |
| `.list` | Aufzählung mit gefülltem Quadrat | `--tight` |
| `.hint` | Hinweis-Zeile als gefüllte Fläche (z. B. Fußbodenheizung → `#faq`) | – |
| `.actions` | Knopfreihe | Knöpfe: `.btn--ink`, `.btn--accent`, `.btn--paper`, `.btn--quiet` (Tonfläche, passt auf jede Kachel), Icon per `<svg><use href="#i-tel"/></svg>` |
| `.photo-wall` | ungleichmäßige Bildwand; Breite je Bild = Seitenverhältnis `--r`, Reihenhöhe `--h` | `__row` (mehrere Reihen), `__item`, `__item--big` (Handy volle Breite); Handy: 1. Bild + `--big` volle Breite, Rest zu zweit |
| `.faq` | Fragen als gefüllte Balken (`details`), links Kopf (sticky), rechts Liste; erste Frage `open` | `__head` `__list` `__item` `__q` `__plus` `__a`; `id="faq"`; Antworten wortgleich zum JSON-LD |
| `.steps-row` | Ablauf ohne Ziffern: Stufen steigen nach rechts und werden heller, letzte Stufe Papier; Tablet/Handy eingerückte Treppe | `<ol role="list">`, `.step__name`; 3–6 Stufen, Texte ähnlich lang halten |
| `.related` | verwandte Seiten als Link-Kacheln; Eintrag mit Foto wird groß (links, zwei Reihen), max. 2 weitere rechts – ohne Foto zu dritt | `__item` `__pic` `__body` `__name` `__text` `__arrow`, Zeile darunter `.related__more` |
| `.cta` | Abschluss-Aktion als Board-Reihe (Foto-Flanke · orange Hauptkachel · Graphit-Flanke) | `{{include cta-page}}` (allgemein, → `kontakt/`), eigene Fassung = Markup kopieren; `.cta__meta` für Zeiten/Adresse. `cta-band` bleibt der Startseite (Anker `#kontakt`) |
| `.prose-board` + `.prose` | Textseiten (Impressum, Datenschutz): Seitenspalte (Inhaltsverzeichnis `.toc`, Kontakt-Kacheln), Text in großer Kachel, max. 68 Zeichen | `__side` `__main`; `.prose` setzt h2–h4, Listen, Links, `address`; `.note` = PRÜFEN-Hinweis |

**Beispiele** (kompakt, `…` = Inhalt aus dem Copy-Deck)

```html
<!-- Seiten-Hero mit Foto (data-hero = Ladesequenz der Startseite: Maske, Shutter, Steigen) -->
<section class="page-board" aria-labelledby="page-h" data-hero>
  <div class="page-board__grid">
    <div class="page-board__main t t--paper">
      <nav class="crumbs" aria-label="Brotkrumen" data-hero-rise><ol>
        <li><a href="{{root}}">Start</a></li><li><a href="{{root}}leistungen/">Leistungen</a></li><li><span aria-current="page">Vinyl</span></li>
      </ol></nav>
      <h1 id="page-h" class="page-board__h"><span class="page-board__mask"><span data-hero-word>Vinylboden in Wermelskirchen</span></span></h1>
      <p class="page-board__lead" data-hero-rise>…</p>
      <div class="page-board__actions" data-hero-rise><a class="btn btn--ink" href="{{root}}kontakt/?bodenart=Vinyl">Angebot anfragen</a></div>
    </div>
    <figure class="page-board__pic t t--photo" data-hero-shutter>
      {{img bad-vinyl alt="…" sizes="(max-width: 1099px) 100vw, 42vw" loading="eager" fetchpriority="high" pos="40% 70%"}}
      <figcaption class="page-board__cap">Bad, Vinyl in Steinoptik</figcaption>
    </figure>
    <div class="page-board__fact t" data-hero-rise><p>Für Wohnungen, Häuser und Büros in …</p></div>
    <a class="page-board__call t t--accent" href="tel:+4915901717249" data-hero-rise>
      <span>Rufen Sie an: <span class="nowrap">0159&nbsp;0171&nbsp;7249</span></span>
      <small data-open-status>Mo–Fr 07:30–17:00&nbsp;Uhr, Sa 08:00–14:00&nbsp;Uhr</small>
    </a>
  </div>
</section>
<!-- ohne Foto (Impressum, Datenschutz, 404, Teppich): Klasse page-board--text, figure weglassen.
     Rechts stehen dann __fact (oben) und __call (unten); eine davon weglassen → die andere wird zwei Reihen hoch. -->

<!-- Abschnittskopf -->
<div class="sec-head"><h2 id="x-h" data-split>Für welche Räume Vinyl passt</h2><p data-reveal>…</p></div>

<!-- Freies Brett -->
<div class="tiles" data-lay>
  <figure class="tile tile--photo tile--wide" style="--tile-h:440px">{{img … pos="50% 80%"}}<figcaption class="tile__cap">Raum, Material</figcaption></figure>
  <div class="tile tile--paper"><p class="tile__end">…</p></div>
  <div class="tile tile--quarter"><h3>…</h3><p>…</p></div>
  <a class="tile tile--accent tile--go tile--quarter" href="{{root}}kontakt/">Angebot anfragen<svg aria-hidden="true"><use href="#i-arrow"/></svg></a>
</div>

<!-- Eigenschaften (ohne bzw. mit Foto-Spalte) -->
<dl class="feature-tiles" data-stagger>
  <div class="feature"><dt class="feature__name">Warm unter den Füßen</dt><dd>…</dd></div>
  <div class="feature feature--tone"><dt class="feature__name">Holz arbeitet</dt><dd>…</dd></div>
</dl>
<div class="feature-tiles feature-tiles--pic feature-tiles--flip">
  <figure class="feature-tiles__pic t t--photo" data-shutter>{{img …}}<figcaption class="tile__cap">…</figcaption></figure>
  <dl class="feature-tiles__list" data-stagger><div class="feature">…</div>…</dl>
</div>

<!-- Foto + Text -->
<div class="split-tile split-tile--flip">
  <figure class="split-tile__pic t t--photo" data-shutter data-parallax="0.04">{{img untergrund alt="…" sizes="(max-width: 1099px) 100vw, 58vw"}}<figcaption class="split-tile__cap">…</figcaption></figure>
  <div class="split-tile__body t t--graphite"><h2 id="ug-h" data-split>…</h2><p class="lead">…</p><ul class="list"><li>…</li></ul><a class="link" href="…">…</a></div>
</div>

<!-- Tafeln zur Wahl mit Schalter (Musterwahl, Florwahl, Holz-/Steinoptik). Ohne data-switch: Tafeln nur nebeneinander. -->
<div class="choice" data-switch>
  <div class="switch" role="radiogroup" aria-label="Verlegemuster">
    <button class="switch__opt" type="button" role="radio" aria-checked="true" aria-controls="p-a" data-switch-to="a">Landhausdiele</button>
    <button class="switch__opt" type="button" role="radio" aria-checked="false" aria-controls="p-b" data-switch-to="b">Fischgrät</button>
  </div>
  <div class="choice__panels">
    <article class="choice__panel" id="p-a" data-switch-panel="a" aria-labelledby="p-a-h">
      <figure class="choice__pic t t--photo">{{img flur-eiche alt="…" sizes="(max-width: 1099px) 100vw, 58vw"}}<span class="choice__badge" aria-hidden="true"><svg viewBox="0 0 120 91">…</svg></span><figcaption class="choice__cap">…</figcaption></figure>
      <div class="choice__body t"><h3 id="p-a-h">Landhausdiele</h3><p>…</p>
        <dl class="specs"><div><dt>Wirkung</dt><dd>ruhig, großzügig</dd></div></dl>
        <a class="link" href="{{root}}kontakt/?bodenart=Parkett&amp;muster=Landhausdiele">Mit Landhausdiele anfragen</a></div>
    </article>
    <article class="choice__panel" id="p-b" data-switch-panel="b" aria-labelledby="p-b-h">…</article>
  </div>
  <p class="choice__note">Beide Fotos zeigen Böden aus unseren Projekten.</p>
</div>
<!-- Zeichnung statt Foto (Teppich): <figure class="choice__pic t t--graphite"><svg …></svg></figure> -->

<!-- Vergleichstabelle (Handy gestapelt) -->
<table class="data-table data-table--stack">
  <caption class="sr-only">Geölte und lackierte Parkettoberflächen im Vergleich</caption>
  <thead><tr><td></td><th scope="col">Geölt</th><th scope="col">Lackiert</th></tr></thead>
  <tbody><tr><th scope="row">Aussehen</th><td data-label="Geölt">…</td><td data-label="Lackiert">…</td></tr></tbody>
</table>
<!-- breite Tabelle (viele Spalten): Handy quer wischbar im eigenen Container -->
<div class="table-scroll" tabindex="0" role="region" aria-label="Beläge auf der Treppe im Vergleich"><table class="data-table data-table--wide">…</table></div>
<p class="hint sec-after">Sie haben eine Fußbodenheizung? … <a href="#faq">Fragen unten</a>.</p>

<!-- Bildwand -->
<div class="photo-wall" style="--h:clamp(280px,27vw,400px)" data-lay>
  <figure class="photo-wall__item" style="--r:0.71">{{img langer-raum alt="…" sizes="(max-width: 599px) 100vw, 20vw"}}<figcaption>Raum, Material</figcaption></figure>
  <figure class="photo-wall__item photo-wall__item--big" style="--r:1.227">{{img …}}<figcaption>…</figcaption></figure>
</div>

<!-- FAQ -->
<section class="sec faq" id="faq" aria-labelledby="faq-h">
  <div class="faq__head"><h2 id="faq-h" data-split>Häufige Fragen zu Vinyl</h2><p>…</p><a class="link" href="tel:+4915901717249">0159&nbsp;0171&nbsp;7249</a></div>
  <div class="faq__list" data-stagger>
    <details class="faq__item" open><summary><span class="faq__q">Frage?</span><span class="faq__plus" aria-hidden="true"></span></summary><div class="faq__a"><p>Antwort</p></div></details>
  </div>
</section>

<!-- Ablauf -->
<ol class="steps-row" role="list" data-lay>
  <li><h3 class="step__name">Anfrage</h3><p>…</p></li>
  <li><h3 class="step__name">Übergabe</h3><p>…</p></li>
</ol>
<div class="actions sec-after"><a class="btn btn--accent" href="{{root}}kontakt/?bodenart=Vinyl">Angebot anfragen</a></div>

<!-- Verwandte Seiten (h3 im Link ist erlaubt: a ist hier Flow-Inhalt) -->
<ul class="related" data-lay>
  <li><a class="related__item" href="{{root}}leistungen/treppen/">
    <span class="related__pic">{{img treppe-eiche alt="…" sizes="(max-width: 599px) 100vw, 32vw"}}</span>
    <div class="related__body"><h3 class="related__name">Treppen</h3><p class="related__text">…</p></div>
    <svg class="related__arrow" aria-hidden="true"><use href="#i-arrow"/></svg></a></li>
  <li><a class="related__item" href="…"><div class="related__body"><h3 class="related__name">…</h3><p class="related__text">…</p></div><svg class="related__arrow" aria-hidden="true"><use href="#i-arrow"/></svg></a></li>
</ul>
<p class="related__more">Doch lieber ein anderer Boden? <a href="…">…</a></p>

<!-- Abschluss: allgemein -->
{{include cta-page}}
<!-- Abschluss: eigene Fassung = Markup aus src/partials/cta-page.html kopieren, H2/Text/Links/Flanken-Foto anpassen -->

<!-- Textseite -->
<section class="sec" aria-label="Impressum">
  <div class="prose-board">
    <nav class="prose-board__side" aria-label="Auf dieser Seite"><ul class="toc"><li><a href="#anbieter">Anbieter</a></li>…</ul></nav>
    <div class="prose-board__main"><div class="prose">
      <h2 id="anbieter">Angaben gemäß § 5 DDG</h2><address>…</address>
      <p class="note"><strong>Prüfen:</strong> Vorschlag, vom Kunden bzw. von der Rechtsberatung zu prüfen.</p>
    </div></div>
  </div>
</section>
```

**Für Live-Dinge der Leistungsseiten**: Segment-Schalter immer mit `.choice`/`.switch` + `data-switch` (Tafeln) bauen. Formulare mit Auswahl (Raum-Check, Steckbrief, „Vier Fragen“): echte `fieldset`/`legend`/Radios, gestaltet wie `.lay__opt` aus dem Aufmaß-Rechner (Startseite), Ergebnisse in `.tile`/`.hint`. Seitenspezifisches JS kommt als eigenes, klar benanntes Modul ans Ende von `site.js` (nicht in fremde Module eingreifen). Formular-Vorbefüllung über `?bodenart=…&muster=…` auf der Kontaktseite ist noch **nicht** gebaut (Kontaktseite/`site.js`).

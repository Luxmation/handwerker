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
- Unterseiten-Bausteine (`.page-hero`, `.breadcrumb`, `.prose`, `.faq`) sind noch **nicht** im neuen System – beim Bau der ersten Unterseite im Kachel-Stil ergänzen.
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

Beispiel (Unterseite):
```html
<section class="section" aria-labelledby="x-h">
  <div class="container split">
    <figure class="split__media"><div class="split__frame" data-shutter data-parallax="0.05">{{img handwerker alt="…"}}</div></figure>
    <div class="split__text">
      <h2 id="x-h" data-split>Sauber verlegt, sauber übergeben.</h2>
      <p class="lead" data-reveal>…</p>
      <ul class="checklist" data-stagger><li>…</li><li>…</li></ul>
    </div>
  </div>
</section>
```
Eigene Szene: `Scenes['name'] = (root, opts) => Stage.scene(root, { hold, phone, build(tl, { q, phone }) { … } })` vor motion.js laden; Positionen im Timeline sind Anteile 0–1 (siehe tasteskill `references/scenes.md`). Weitere Buttons haben Druck-Feedback (`.btn:active` 0,97).

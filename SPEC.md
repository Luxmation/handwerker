# handwerker-blesius.de – Spezifikation der finalen Website

Kunde: **Handwerker Blesius GmbH**, Bodenleger in Wermelskirchen. Der Kunde hat aus 14 Entwürfen zwei Favoriten gewählt: **„Meisterstück dunkel“** und **„Unter der Oberfläche“**. Die finale Seite verbindet beide:

- **Basis = Meisterstück dunkel**: warmes Fast-Schwarz, Headlines seit Kundenfeedback in **Archivo schmal (Variante B)**, ein Akzentwort kursiv in Orange, Archivo normal breit für Text, großes Vollbild-Foto im Hero, viel Ruhe und Luft, Orange nur als Akzent.
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
| `` | start | Startseite = **Hub** (kurz, wuchtig): Hero · Fakten · Wortband · Leistungen (je Zeile Link + Bild-/Titel-Morph auf die Leistungsseite) · Kinetic-Szene „Grundsatz“ · Wortband · Projekte (Bild öffnet sich zum Vollbild + horizontaler Streifen, Link projekte/) · Über-uns-Teaser mit Kennzahlen · Orte-Wortband · Dielen-Wipe „TEAM“ · Karriere-Teaser (1.000 €) · CTA-Band. Untergrund-Story, Ablauf im Detail, Einsatzgebiet-Karte, Karriere-Details und Formular stehen auf ihren Unterseiten |
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

## Design-System (verbindlich – in `static/assets/css/site.css`)
- Farben (CSS-Variablen): `--bg #121110`, `--bg-2 #1A1917`, `--bg-3 #201E1B`, `--line rgba(237,232,225,.12)`, `--text #EDE8E1`, `--muted` (≥ 4.5:1 auf allen Flächen), `--orange #F28135` (Logo), `--orange-ink` für orange Text, `--graphite #525252` (Logo). Buttons: Orange-Fläche mit Text #141210.
- Schriften (Kundenwahl „Variante B“, alle selbst gehostet in `static/assets/fonts/`, `fonts.css`; Newsreader und Instrument Sans entfernt):
  - `--display "Archivo"` – **Überschriften**: `font-stretch:62%` (wdth 62), Gewicht 700, **Versalien**, Zeilenhöhe 0,88–0,92, Laufweite 0. Je Überschrift höchstens ein Akzentwort als `<em>` = Archivo Italic schmal in Orange (`--orange-ink`). Skala: Hero-H1 `clamp(50px, min(9.4vw,16svh), 156px)` in drei festen Zeilen (`.hero__l`), H1 Unterseiten `clamp(48px,7.4vw,124px)`, H2 `clamp(40px,5.2vw,84px)`, H3 72 % Breite `clamp(21px,1.8vw,27px)`. Max-Breiten in `em`, nicht `ch`. Zusätze wie „(m/w/d)“ als `.h-note` (Mono klein).
  - `--sans "Archivo"` – Text/UI in normaler Breite (wdth 100, 400/500/600). Buttons, Navigation, Mobilbar: 700/600, 85 % Breite, Versalien, Laufweite .06–.07em.
  - `--mono "DM Mono"` – Eyebrows, Labels, HUD, Bildunterschriften, Nummern (Versalien mit Laufweite).
  - Dateien: `Archivo-{normal|italic}-var-{latin|latin-ext}.woff2` (variabel: wdth 62–125, wght 100–900; Google Fonts v25), Preload der beiden latin-Dateien im Layout.
- Raster: max. Inhaltsbreite ~1240 px, Seitenabstand `clamp(20px,4vw,48px)`, 8-px-Abstandsraster, Abschnittsabstände großzügig (`clamp(80px,10vw,144px)`).
- Komponenten (Klassen kurz und sprechend, BEM-light): `.btn .btn--primary .btn--ghost`, `.eyebrow` (Mono, orange Strich davor), `.section`, `.section--alt` (bg-2), `.container`, `.grid-2`, `.card-media`, `.compare` (Vorher/Nachher-Regler), `.steps`, `.facts` (Vertrauensleiste), `.page-hero` (für Unterseiten: kleiner Hero mit Breadcrumb, Eyebrow, H1, Intro, optional Bild), `.breadcrumb`, `.cta-band` (Abschlussband „Unverbindlich anfragen“ auf jeder Unterseite), `.prose` (Fließtext-Seiten wie Impressum), `.faq` (details/summary), `.form`.
- Header: transparent über dem Startseiten-Hero, sonst/scroll dunkel mit Linie; sticky. Logo `logo-light.png` (Höhe 40–46 px). Am Handy Burger-Menü (Vollbild-Overlay) + feste untere Leiste: Anrufen · WhatsApp · Anfragen (safe-area).
- Footer: Logo, Kurztext, Adresse, Kontakt, Öffnungszeiten, Seitenlinks, Leistungen-Links, Rechtliches, Instagram, „Mitglied der Handwerkskammer zu Köln“, © {{year}}.
- Bewegung: dezent (Einblenden beim Scrollen über `.reveal` – Inhalt muss ohne JS sichtbar sein; Bild-Zoom auf Hover). `prefers-reduced-motion` respektieren.
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

**Grundregeln** (tasteskill „Move“): nur `transform`/`opacity`/`clip-path`; Startzustände setzt ausschließlich motion.js (Inline-Styles, `html.has-motion`) – ohne JS, bei fehlgeschlagenem Laden und bei `prefers-reduced-motion: reduce` ist alles sofort sichtbar und bedienbar. Reveals einmalig, bei ca. 88–90 % Viewport-Höhe, 0,8 s expo-out, 24 px Hub, Staffel 80 ms (Überschrift → Text → Bild). Kein Preloader, kein Custom-Cursor, keine Wheel-Übernahme, kein Bounce. Nicht animieren: Eyebrows, Mono-Labels, Index-Nummern, Haarlinien (diese Elemente entfallen laut House Rules). Einzige CSS-Zurückhaltung: `html.motion-pending` (Inline-Skript im `<head>`, nur bei no-preference, max. 2,5 s) blendet Hero-Zeilen bis zum Start der Ladesequenz aus.

| Attribut | Wirkung | Hinweise |
|---|---|---|
| (global) | Lenis-Smooth-Scroll, lerp 0.1, an ScrollTrigger gekoppelt; Ankerlinks `href="#…"` laufen weich mit Header-Abstand | nur Maus/Trackpad (`hover:hover` + `pointer:fine`), nie Touch/reduced. `window.Motion.lenis` |
| `data-hero` | Hero: Buchstaben fliegen einzeln ein (y + Drehung, Maske je Zeile, ~1,5 s), danach „atmet“ die H1 beim Scrollen (wdth 62→92 + Laufweite, nur ≥ 1024 px), Zeilen schieben sich gegeneinander, Akzentwort mit Licht-Sweep; Bild zieht sich in einen Rahmen (`clip-path: inset`), sinkt 6 %; Text hebt ab | Kinder: `data-hero-media` (erstes `img`/`video` darin bekommt Settle + langsamen Ken-Burns, pausiert außerhalb), `data-hero-lines` mit `.hero__l` je Zeile, `data-hero-load` (steigen 16 px), `data-hero-copy` (Textblock für den Scroll-Abgang). Video statt Bild: einfach `<video>` in `.hero__media` setzen |
| `data-split` | Überschrift (bleibt gesplittet: Zeilenmasken + Buchstaben, `aria-label` am Heading): Buchstaben steigen gestaffelt aus der Zeilenmaske; danach **dauerhaft scrollgekoppelt**: Breite atmet wdth 62→72→62 + Laufweite, Zeilen versetzen sich ±1,5 % (beides ≥ 1024 px), beim Verlassen nach oben bauen sich die Buchstaben wieder ab (scrub); das `<em>` leuchtet beim Eintreten auf und bekommt alle ~4 s einen Licht-Sweep über die Buchstaben; neigt sich bei schnellem Scrollen (skewY ≤ 1,4°) | In gehaltenen Szenen nur Einflug + Sweep. `data-split="fill"`: Wörter füllen sich beim Scrollen (in der Kinetic-Szene übernimmt die Szene) |
| `data-reveal` | Element steigt 24 px + blendet ein | `="fade"` nur Blende, `="scale"` aus 0,96 |
| `data-stagger` | wie `data-reveal`, aber für alle direkten Kinder nacheinander (80 ms) | für Listen, Fakten, Kontaktliste |
| `data-shutter` | Bildrahmen öffnet sich von unten, Bild setzt sich aus 1,08 | `="planks"`: versetzte Dielen-Streifen von links (`data-rows="5"`); `="diagonal"`: schräger Wisch von links |
| `data-parallax` | Bild driftet im Rahmen und zoomt beim Durchscrollen leicht heran (Wert 0.02–0.08, Standard 0.06), Bild wird automatisch überskaliert | auf den Rahmen setzen, kombinierbar mit `data-shutter`. Hover-Zoom dann per CSS `scale`, nicht `transform` |
| `data-roll` | Ziffern rollen einmalig eine volle Runde durch und rasten auf ihrem Wert ein („1.000“, „05“, „7“); echter Wert bleibt für Screenreader im Text | **nur echte Werte** (1.000 € Bonus, 5 Ablauf-Schritte, 7 Orte). Kennzahl-Block: `.kpi > .kpi__n[data-roll] + .kpi__l` |
| `data-marquee` | Wortband: riesige Versalien, gefüllt (`span`) / Outline (`span.is-alt`) im Wechsel, Raute `<i></i>` als Trenner; Tempo und Richtung folgen der Scroll-Geschwindigkeit, Zeilen neigen sich nach Tempo (skewX ≤ 9°); Hover bremst, Pause außerhalb; reduced = statisch | Markup: `.marquee > .marquee__track[data-dir="-1"] > .marquee__set` (Set wird geklont); mehrere Tracks = mehrere Zeilen (`.marquee--duo`, gegenläufig); `data-marquee-speed="40"` (px/s). Mehrere pro Seite erlaubt (Startseite: 3), immer `aria-hidden`, nur Wörter, die auf der Seite ohnehin stehen |
| `data-draw` | SVG zeichnet sich: `[data-draw-line]` (mit `pathLength="1"`) nacheinander, `[data-draw-dot]` poppen auf, `[data-draw-fade]`/`[data-draw-label]` blenden ein | z. B. Einsatzgebiet-Karte |
| `data-index-preview` | Liste mit Vorschau: am Desktop (Maus, ≥ 1024 px) öffnet sich ein Bild **auf Höhe der Zeile** (nicht am Cursor), übrige Zeilen auf 40 % | Zeilen = Links; Bildquelle `[data-preview] img` in der Zeile. Touch: CSS zeigt das Bild in der Zeile (Karten, Scroll-Snap). Klasse `.svc` als Vorlage |
| `data-sticky-cta` | Schwebender Handlungsknopf erscheint nach `data-sticky-after` (Selektor, Standard `[data-hero]`) und verschwindet vor `data-sticky-hide` (Standard `#kontakt`) sowie über gehaltenen Szenen | CSS zeigt ihn nur ≥ 861 px (darunter Mobilbar) |
| `class="scene" data-scene="opening"` | Scroll-Szene (stage.js): Bild öffnet sich vom Fenster zum ganzen Screen | `data-options='{"hold":1}'`; Markup `.scene-stage > .scene-pic` (img). Telefon gleich, reduced = fertiges Vollbild |
| `class="scene" data-scene="story"` | Gehaltene Bühne: `[data-beat-step]` leuchten nacheinander auf (Rest 40 %), `[data-beat-count]` zeigt „2 von 5“, `[data-compare]` fährt von `data-compare-from` nach `data-compare-to` (danach frei ziehbar) | `data-options='{"hold":3}'`; Telefon/reduced = fertige Ansicht (alle Schritte, Regler mit Schwingen) |
| `data-at="0.4"` / `data-out="0.6"` | innerhalb einer Szene: erscheint/verschwindet bei diesem Anteil der Szene | ohne Szene (Ruhezustand) ist `data-at` sichtbar, `data-out` ausgeblendet |

| `data-tilt` / `data-tilt-hover` | Karte kippt beim Hereinscrollen aus der Tiefe (rotateX/Y, scrub; Handy halb so stark) / Bildrahmen folgt auf Hover der Maus (nur Maus) | im Projekte-Streifen übernimmt die Szene das Kippen |
| `.btn` (automatisch) | Text rollt beim Hover (zweite Zeile schiebt sich hoch, `::after` mit `content: attr(data-t) / ""`), Knopf folgt der Maus magnetisch über CSS `translate` | nur Maus; Submit-Knöpfe nur Magnet (Text wird beim Senden ersetzt) |
| `.svc` (automatisch) | Leistungsliste Desktop: beim Hover läuft der Begriff als Laufband (gefüllt/Outline) durch die Zeile, Vorschaubild bleibt | `.svc__run` wird von JS erzeugt |
| global | Scroll-Geschwindigkeit `Motion.vel` (px/s); `Motion.lean(el)` lässt ein Element bei schnellem Scrollen minimal neigen | |
| `class="scene" data-scene="kinetic"` | Gepinnte Kinetic-Type-Szene: Satz fährt Wort für Wort riesig durch den Screen (Buchstaben bauen sich auf und ab), Zoom-Durchflug durch einen Buchstaben des letzten Worts, dann steht die Aussage | Markup: `.scene-stage > p.kt__fly[aria-hidden] > span` je Wort (letztes `.is-em`) + `.statement__grid` mit echter H2. Telefon hold 2,4; reduced/ohne JS = normaler Abschnitt |
| `class="scene" data-scene="strip"` | Projekte als horizontal gepinnter Streifen, Karten drehen sich zur Mitte (Coverflow light) | Markup: `.scene-stage > [data-strip-track] > .project…`; Telefon/reduced = Raster |
| `class="scene" data-scene="planks"` | Übergang: Orange-Dielen wischen abwechselnd herein, Wort baut sich Buchstabe für Buchstabe auf (wdth 100→62), Zoom-Durchflug durch den ersten Buchstaben in den nächsten Abschnitt | rein dekorativ (`aria-hidden`), ohne JS/reduced ausgeblendet |

**Große Momente der Startseite** (Kundenwunsch „epische Übergänge“): 1 Hero-Buchstabenflug + Atmen, 2 Kinetic-Szene „Grundsatz“ mit Zoom-Durchflug, 3 Bild öffnet sich zum Vollbild („opening“, Projekte), 4 horizontaler Projekte-Streifen, 5 Dielen-Wipe „TEAM“ mit Zoom-Durchflug in Karriere. Dazwischen 3 Wortbänder. Ausnahmen von „nur transform/opacity/clip-path/font-variation“: Farb-/Schein-Sweep der Akzentwörter (color/text-shadow bzw. background-position, wenige Zeichen) und CSS-Drift im Vorher/Nachher-Regler.

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

## Lebendig-Schicht (alive.js) – Kundenwunsch „nicht so tot“
Adaptiert aus den Kunden-Websites (made4music: shader.frag/site.js). Datei `static/assets/js/alive.js` (lädt vor stage.js/motion.js), CSS-Abschnitt „23 Lebendig-Schicht“ in `site.css`, Markup im Layout direkt nach dem Skip-Link. Die frühere tasteskill-Regel „kein Cursor/kein Preloader“ gilt nicht mehr. Alles ist Dekoration: ohne JS, ohne WebGL und bei `prefers-reduced-motion` bleibt die Seite ruhig und vollständig bedienbar.

| Baustein | Markup/Attribut | Verhalten |
|---|---|---|
| Bänder-Hintergrund | `.ambient[data-ambient-bg] > canvas` (Layout) | WebGL-Shader: fließende, glänzende Bänder Eiche/Orange mit Holzmaserung, Licht folgt der Maus. Halbe Auflösung, max. 60 fps; Touch/< 860 px: 2 Bänder, ohne Rauschen, 30 fps. Pausiert bei Tab-Wechsel und solange der Hero den Bildschirm füllt. Reduced = Standbild. Ohne WebGL/JS: CSS-Verlauf. Flächen (`.section--alt/--deep`, Karriere, Footer, CTA-Band) sind leicht durchscheinend. |
| Hellere Bänder | `data-ambient="bright"` auf einem Abschnitt | Hintergrund wird kräftiger, solange der Abschnitt in der Bildschirmmitte ist (Statement, Karriere). |
| Logo-Intro | `.intro[data-intro]` + `assets/brand/intro/mark-*.png` (Dach, Orange/Hammer, Graphit/Schlüssel, Haus/Fenster/Pinsel – aus `mark-light.png` geschnitten) | ≤ 1,5 s, nur beim ersten Seitenaufruf der Sitzung (`sessionStorage blesius-intro`, Kopf-Skript setzt `html.intro-on`), Klick/Taste/Scroll überspringt. Danach Wisch mit glühender Kante in den Hero; `Alive.introDone` startet die Hero-Sequenz. Sicherheitsnetz 3,2 s. |
| Seitenübergang | `.pt[data-pt]` (`.pt__planks > i×6`, `.pt__mark`, `.pt__label`) | siehe „Seitenübergänge“ unten (GSAP-Weg). |
| HUD | `.hud[data-hud]` | Nur ≥ 1024 px mit Maus: Eckwinkel, „● Aufmaß 51.139° N · 7.216° E“ + Uhrzeit Europe/Berlin, Live-Öffnungsstatus (Mo–Fr 07:30–17:00, Sa 08:00–14:00; Feiertage nicht berücksichtigt), rechts „Blesius · Bodenleger · Wermelskirchen“ + gemessene Scrollstrecke, links senkrecht die aktuelle Schicht. |
| Maßband | `.tape[data-tape]` | Scrollfortschritt oben, Desktop mit cm-Ticks (1 cm = 37,8 px). |
| Schicht-Labels | `<p class="layer" aria-hidden="true">…</p>` + `data-layer="Schicht 0X · Name"` am Abschnitt | Maßlinie zieht sich auf, Name „rechnet“ kurz; `data-layer` speist die HUD-Anzeige. |
| Cursor | `[data-cursor="Ziehen"]`, `[data-cursor="Ansehen"]` | Nur Maus: Punkt, Ring über Links, Label über markierten Flächen; über Formularfeldern ausgeblendet (System-Cursor bleibt dort). |
| Lichtschein | `data-glow` | Radialer Schein folgt der Maus, Kante glüht (nicht auf Elementen mit eigenem `::before/::after`). |
| Hover-Verzerrung | `data-distort` (Bildrahmen) | Kurze Wellen-Verzerrung (SVG-Filter `#bl-distort` im Sprite) + Zoom 1,05. |
| Badge | `.badge.sticky-cta` | Rotierender Schriftring „Angebot anfragen · Wermelskirchen“ als schwebender Anfrage-Knopf (≥ 861 px). |
| Footer-Laufband | `.ft-marquee` (Footer-Partial) | Großer Anfrage-Streifen, CSS-Animation, Hover pausiert. |
| Glanz | `.btn--primary`, `em.glow` | Glanzlicht + Lichthof beim Hover; glühende Akzentwörter (Hero: `.is-sweep` Licht-Verlauf über die Buchstaben). |

## Seitenübergänge (Mehrseiten-Website, Kundenwunsch „keine One-Page, kinetische Übergänge“)
Ein System für alle Seiten (alles im Layout, `alive.js` Modul 3, `site.css` Abschnitte 23 + 25, Kopf-Skript im Layout).

**Weg A – View-Transition-Morph** (Chromium ≥ 126 / Safari ≥ 18.2, gleiche Herkunft, nicht `file:`): Links mit `data-vt`.
- `@view-transition { navigation: auto; }`. Benannte Gruppen: `site-header` (statisch, Header bleibt stehen), `vt-media` (Bild) und `vt-title` (Begriff → Seitentitel).
- Quelle: im Link `[data-vt-media]` (sichtbares Bild; in der Desktop-Leistungsliste das geöffnete Vorschaubild `.ix-frame`) und `[data-vt-title]`. Die Namen setzt `alive.js` erst im `pageswap` (eindeutig, statische Namen der Seite werden dafür auf `none` gesetzt).
- Ziel: `.sub-hero__media` = `vt-media`, erste Titelzeile `.sub-hero__title .hero__l:first-child` = `vt-title` (statisch in `site.css` 26).
- Choreografie (CSS): alte Seite fällt weg (`vt-fall`: scale .9, abdunkeln), dahinter Orange (`::view-transition`), neue Seite öffnet sich in sechs versetzten Dielen (`vt-planks`, clip-path), Bild/Titel morphen 1 s; danach baut sich der Titel Buchstabe für Buchstabe auf (motion.js `[data-hero]`).
- Zurück-Navigation: das Kopf-Skript (`pagereveal`) sucht den Link `a[data-vt]` zur Herkunftsseite und benennt dessen Bild/Titel → Morph zurück in die Liste.

**Weg B – GSAP-Choreografie** (alle anderen internen Links und alle Browser ohne View Transitions):
- Ausgehend: `main` + Footer skalieren weg (0,93, Deckkraft 0,35), Orange/Schwarz-Dielen schieben sich abwechselnd von links/rechts ein, Haus-Logo + **Name der Zielseite riesig** in Archivo schmal (`data-pt-label="…"` am Link, sonst Linktext ≤ 18 Zeichen, sonst nur Logo).
- `sessionStorage blesius-pt = "1|Label"` → Kopf-Skript setzt `html.pt-in` (Seite startet verdeckt, Label in `window.__blPtLabel`) und überspringt eine zusätzliche View Transition (`skipTransition`).
- Eingehend: Label fliegt hoch weg, Dielen öffnen sich gestaffelt; `Alive.introDone` löst erst beim Öffnen aus → der Seitentitel baut sich Buchstabe für Buchstabe auf.
- Kein Übergang für Anker, `tel:`, `mailto:`, externe Links, neue Tabs, Modifier-Klicks. bfcache-Rückkehr setzt alles zurück (`pageshow`).

**Prefetch**: Speculation Rules im Layout (`prefetch`, `eagerness: moderate`, ohne `anfrage.php`) + `alive.js` hängt bei Hover/Fokus `<link rel="prefetch">` an (einmal je Ziel; nicht unter `file:`).
**Reduziert** (`prefers-reduced-motion`): keine Dielen/kein GSAP, nur die einfache Überblendung des Browsers.

## Unterseiten-Grundaufbau (Vorlage: `src/pages/leistungen-parkett.html`)
```html
<section class="sub-hero" aria-labelledby="page-h" data-hero data-layer="Leistung · Parkett">
  <div class="container" data-hero-copy>
    <nav class="breadcrumb" aria-label="Brotkrumen"><ol><li><a href="{{root}}" data-pt-label="Start">Start</a></li>…<li><span aria-current="page">Parkett</span></li></ol></nav>
    <h1 class="sub-hero__title" id="page-h"><span class="hero__line" data-hero-lines><span class="hero__l">Parkett</span> <span class="hero__l hero__l--sub">in Wermelskirchen</span></span></h1>
  </div>
  <div class="container sub-hero__grid">
    <div class="sub-hero__text" data-hero-load>… .lead, Text, .btn-row.sub-hero__actions, .sub-hero__hours …</div>
    <figure class="sub-hero__media"><div class="sub-hero__frame" data-hero-media>{{img …}}</div><figcaption>…</figcaption></figure>
  </div>
</section>
```
- Erste Titelzeile = Begriff riesig (Morph-Ziel `vt-title`), `.hero__l--sub` = Ort klein, kursiv, orange (H1 enthält damit Leistung + Ort). Bild = Morph-Ziel `vt-media`. Bewegung kommt automatisch aus `[data-hero]` (Buchstaben-Einflug, wdth-Atmen, Ken-Burns, Rahmen beim Scrollen).
- Auf der Startseite verlinkt jede Leistungszeile mit `data-vt` (Bild `data-vt-media`, Name `data-vt-title`) – neue Leistungsseiten brauchen nur den Grundaufbau oben, dann morpht es.
- Seitenspezifisches CSS in `static/assets/css/leistungen.css` (`css: leistungen` im Seitenkopf): `.props`, `.pattern` (Musterwahl, `site.js [data-pattern]`, Radiogroup mit Pfeiltasten, ohne JS beide Tafeln), `.spec`, `.rooms`, `.versus`, `.finish` + `.compare-table`, `.care`, `.gallery`, `.related` (Zeile mit Bild darf `data-vt` tragen).
- Formular-Vorbelegung: `kontakt/?bodenart=Parkett&muster=Landhausdiele` → `site.js` wählt die Bodenart und schreibt „Interesse: Parkett, Muster Landhausdiele.“ ins Nachrichtenfeld (nichts wird gespeichert).
- Überschriften im neuen Stil: ein Akzentwort als `<em>` (Kundenwahl Variante B), daher weichen die H2 der Parkett-Seite vom Copy-Deck ab („kein kursives Wort“) – Wortlaut unverändert, ohne Schlusspunkt.
- JSON-LD: `src/jsonld/service-parkett.json`, `faq-parkett.json`, `breadcrumb-parkett.json` (aus dem Copy-Deck).

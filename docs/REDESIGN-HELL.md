# Redesign „hell & ruhig“ – Arbeitsanweisung für die Unterseiten (Stand 25.10.2026)

## Warum
Kunde (Marcel Blesius) fand die bisherige Seite zu verspielt: zu viel Motion, zu viele Animationen, schwarzer Hintergrund.
Gewünscht: **schlicht, ruhig, hell**, im Stil der frühen Kachel-Version („Board“: Serifen-Überschriften, gefüllte Kacheln
mit schmaler Fuge, Fotos als Kacheln, ein orangener Akzent). Die Startseite ist fertig und ist die Referenz:
`src/pages/index.html` (Branch `redesign-hell`).

## Was feststeht (nicht ändern, nur benutzen)
- `static/assets/css/site.css` – Design-System inkl. **aller Unterseiten-Bausteine (Abschnitt 23a–23n)**.
- `src/layout.html`, `src/partials/header.html|footer.html|mobilebar.html|cta-band.html|cta-page.html`, `static/assets/js/site.js`,
  `static/assets/css/leistungen.css` (gemeinsam für alle Leistungsseiten), `build.py`, `src/images.json`.
- Fehlt dir ein Baustein oder eine gemeinsame Regel: **nicht** in den gemeinsamen Dateien ändern, sondern in deine
  seiteneigene CSS-Datei schreiben (siehe unten) und im Abschlussbericht erwähnen.

## Bausteine
Vollständige Doku mit HTML-Beispielen: **Abschnitt „## Unterseiten-Bausteine“** in
`/tmp/claude-0/-home-user/e534d912-4457-5b36-a90e-2c029f42c4b5/scratchpad/board/SPEC.md` (Zeile 116 bis Ende).
Referenzseite mit allen Bausteinen (alter Inhalt, aber richtiges Markup):
`/tmp/claude-0/-home-user/e534d912-4457-5b36-a90e-2c029f42c4b5/scratchpad/board/src/pages/leistungen-parkett.html`.
Kurz: `.page-board` (Seiten-Hero, H1), `.sec` + `.sec-head`, `.tiles`/`.tile`, `.feature-tiles`, `.split-tile`,
`.choice` + `.switch` (`data-switch`), `.specs`, `.data-table`, `.list`, `.hint`, `.actions`, `.photo-wall`, `.faq`,
`.steps-row`, `.related`, `{{include cta-page}}`, `.prose-board` + `.prose` (Textseiten), `.crumbs`.
Kacheln: `.t` mit `t--paper` (Sand), `t--graphite` (dunklere Steinstufe – NICHT dunkel), `t--accent` (Orange), `t--photo`.

## Regeln
1. **Inhalt bleibt.** Alle Texte, Fakten, Zahlen, Überschriften-Aussagen, Links (auch `kontakt/?bodenart=…`-Parameter),
   Bilder samt Alt-Texten und Bildunterschriften, FAQ-Antworten (wortgleich zum JSON-LD), Formulare (Feldnamen, IDs,
   `data-form`, `data-require-any`, `action`), Kopfdaten (title, description, path, nav, jsonld, mobilebar) übernehmen.
   Nichts erfinden: keine Bewertungen, Zitate, Jahreszahlen, Preise, Garantien, „Meisterbetrieb“. Pexels-Bilder
   (`laminat-raum`, `teppich-raum`, `teppich-boden`) nur als „Beispielbild“ beschriften.
   Kürzen ist erlaubt, wo ein Abschnitt nur Deko war (Wortbänder/Laufbänder, kinetische Typo-Szenen, „Schicht 01“-Etiketten,
   HUD-Texte, Koordinaten) – solche Deko ersatzlos weglassen.
2. **Keine Animationen.** Keine `data-split`, `data-reveal`, `data-stagger`, `data-lay`, `data-shutter`, `data-parallax`,
   `data-distort`, `data-tilt*`, `data-glow`, `data-cursor`, `data-hero*`, `data-draw*`, `data-marquee`, `data-scene`,
   `data-roll`, `data-vt*`, `data-layer`, `data-ambient`, `data-pt-label`, keine Marquees, keine Zähl-Effekte, kein
   Autoplay. Zeichnungen (SVG) dürfen bleiben, aber statisch; Farben für hellen Grund anpassen (Text dunkel `#1D1A17`,
   nichts Schwarzes als Fläche, keine hellen Beschriftungen auf hellen Kacheln).
3. **Keine dunklen Flächen.** Grund ist weiß, Kacheln warmer Stein. Höchstens eine orange Fläche pro Bildschirm.
4. **Interaktives bleibt funktionsfähig:** Segment-Schalter → `.choice` + `data-switch` (Modul in site.js), Vorher/Nachher
   `data-compare`, Filter `data-filter-group`, Musterwahl `data-pattern` (falls nötig), Film/Clips `data-film`.
   Seiteneigene Inline-Skripte (Raum-Check, Steckbrief, Wegweiser, Filter, 404-Vorschläge …) mitnehmen, Selektoren an das
   neue Markup anpassen und prüfen, dass sie dieselben `kontakt/?…`-Links erzeugen wie vorher.
5. **Seiteneigene CSS-Datei** (im Kopf `css: …`): komplett neu schreiben, nur was die Bausteine nicht abdecken, kurz halten.
   Die alten Regeln darin gehören zum verworfenen Design. Leistungsseiten: `css: leistungen, <seite>`.
6. Responsiv: 1440 px und 390 px sauber, kein waagerechtes Scrollen der Seite, Texte nicht abgeschnitten.
7. Barrierefrei wie bisher: eine H1, sinnvolle H2/H3, Alt-Texte, Tastatur bedienbar.

## Test (jede Seite)
```
python3 build.py --local --out /tmp/claude-0/-home-user/e534d912-4457-5b36-a90e-2c029f42c4b5/scratchpad/rd-<dein-name>
python3 -m http.server <eigener Port> --directory <obiger Ordner>
```
Mit Playwright (vorinstalliert, `require('playwright')`): Seite bei 1440×900 und 390×844 öffnen, einmal durchscrollen
(Bilder laden lazy), Ganzseiten-Screenshot ansehen, Konsolenfehler = 0, kaputte Bilder = 0,
`document.documentElement.scrollWidth <= innerWidth`. Interaktive Teile einmal durchklicken.
**Nicht committen** – der Projektleiter committet. Nur die dir zugeteilten Dateien ändern.

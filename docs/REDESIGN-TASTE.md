# Redesign der Startseite nach tasteskill v2

Skill: `/home/user/leonxlnx/taste-skill/skills/taste-skill/SKILL.md` (verbindlich, inkl. House rules, Laws, Gate, Look, Move).
Direction Sheet (gezogen, Seed 622592521): `/tmp/claude-0/-home-user-handwerker/e534d912-4457-5b36-a90e-2c029f42c4b5/scratchpad/direction-sheet.md`
→ **„The well-kept board“**, Hero „Two-by-two board“, Signature Motion „Shutter image“. `--keep palette,type`.
Vorher-Messung: `/tmp/claude-0/-home-user-handwerker/e534d912-4457-5b36-a90e-2c029f42c4b5/scratchpad/ts/.taste-skill/before/` – **17 FAIL, 8 WARN**.

Kundenwunsch: „viel mehr Motion Graphic, kinetic style, Effekte und Candys – nicht kitschig, kundenorientiert, schlicht aber modern, 2026.“ Zuvor gewählt: dunkle Anmutung („Meisterstück dunkel“) + Vorher/Nachher-Regler („Unter der Oberfläche“).

## Markenwerte (bleiben)
- Farben: Grund warmes Fast-Schwarz (#121110), Kachelflächen eine Tonstufe heller (#1C1A18 / #24211E), Tinte #EDE8E1 (Prüfer meldet „cream“ als WARN → Tinte etwas neutraler/steiniger wählen, z. B. #ECEAE6), **Akzent Orange #F28135** (Logo) – nur auf der Aktion und max. einem weiteren Element, Graphit #525252 als zweite Kachelfarbe. Optional eine einzige Kachel in Orange-Fläche (Aktions-Kachel), Text darauf in Schwarz.
- Schriften: max. 2. Vorschlag: **Instrument Sans** (eine Groteske, zwei Gewichte) für alles; **Newsreader** nur für den Namen/Display, falls es der Board-Idee dient – sonst weglassen. **DM Mono entfällt** (House rule).
- Logo: `assets/brand/mark-light.png` (Haus-Symbol) für die quadratische Logo-Kachel, `logo-light.png` wo die Wortmarke gebraucht wird.

## Inventar (was nur dieser Betrieb hat)
1. Name **Blesius** (Marcel Blesius, GmbH) – Logo: Haus mit Hammer, Schraubenschlüssel, Pinsel in Orange/Graphit/Schwarz.
2. Adresse **Neuenhöhe 17, 42929 Wermelskirchen** – Bergisches Land (Schiefer, weiße Sprossenfenster, grüne Schlagläden). Freies Foto derselben Straße: Wikimedia „Neuenhöhe 85 (Wermelskirchen)“ by DiAuras, CC BY-SA 4.0 (`assets.mjs`: commons:107878303) – nur als Straßen-/Ortsbild mit Credit, nie als Firmengebäude.
3. Öffnungszeiten Mo–Fr 07:30–17:00, Sa 08:00–14:00 → **live „Jetzt geöffnet / öffnet morgen 07:30“** (unterschiedlich bei jedem Besuch).
4. Kindheit in der **Schreinerei** → Faszination Holz.
5. Material: Eiche (Landhausdiele, rustikal, Astlöcher), **Fischgrät**, Vinyl in Stein-/Holzoptik, Treppenstufen, Estrich.
6. Ritual: Untergrund prüfen → Altbelag raus → Schleifen/Fräsen → Grundieren → Spachteln/Nivellieren → Verlegen → Leisten → Übergabe.
7. Artefakt: **Aufmaß** (Zollstock, Raummaße, m², Verschnitt), Verlegeplan.
8. Zahlen: 42929, Nr. 17, HRB 122801, **1.000 € Wechselbonus**, 0159 0171 7249.
9. Region: Wermelskirchen, Remscheid, Solingen, Wuppertal, Burscheid, Bergisch Gladbach, Köln.
10. Echte Fotos (21, siehe `src/images.json` + BRIEF.md-Tabelle), Team-Foto, Team von hinten.

## Idee
> Auf dieser Seite wird **der verlegte Boden** – Dielen Stoß an Stoß mit schmaler Fuge – zum **Brett aus Kacheln**: jede Kachel eine Diele, die Fuge 8 px, verlegt im Verband.

Konkretisierung (damit der Konkurrenz-Test besteht): Kachelgrößen folgen echten Dielenformaten (lang/schmal), Reihen sind **im Verband versetzt** (wie Dielen mit Stoßversatz), ein Bereich ist im **Fischgrät** verlegt; Fugen in Graphit. Die Seite „wird verlegt“: Signature Move = Kacheln legen sich beim Laden/Scrollen nacheinander ein (Shutter-Reveal je Diele, gestaffelt), das Hero-Foto öffnet sich per Shutter.

## Live-Ding (Pflicht, ein Ding)
**Aufmaß-Rechner** in einer Kachel: Raum Länge × Breite (m) eingeben, Verlegeart wählen (Diele gerade / Diagonal / Fischgrät) → zeigt Fläche in m², empfohlene Bestellmenge inkl. **ca.** Verschnitt (Richtwerte, klar als ca. gekennzeichnet: gerade ~7 %, diagonal ~12 %, Fischgrät ~15 %) und zeichnet den Raum als kleinen SVG-Grundriss im gewählten Muster. Button „Mit diesen Maßen anfragen“ füllt Bodenart/Fläche/Nachricht im Kontaktformular vor. Daumen-tauglich, ohne JS: Hinweis + Link zum Formular. Keine Preise.
Zusätzlich (klein): Live-Öffnungsstatus in der Ort/Zeit-Kachel.

## Argument (Abschnitte = Behauptung + Beweis)
1. Hero-Board: Wer (Blesius, Bodenleger Wermelskirchen) + was (Parkett, Vinyl, Laminat, Teppich, Treppen) + Aktion (Angebot anfragen) + echtes Foto (Küche/Podest) + Öffnungsstatus.
2. showcase (Mosaik, ein Bild über Kacheln): „Fischgrät, Stab für Stab“ – fischgraet-raum über 24 Kacheln, 5 Farbkacheln mit Fakten (Beratung · Verkauf · Verlegung aus einer Hand; Untergrund inklusive; Region) + Aktion.
3. how-it-works (Akkordeon getönter Paneele, dunkel→hell in Graphit/Orange-Tönen): Der Ablauf / „Unter der Oberfläche“ – Untergrund prüfen, Altbelag raus, Schleifen & Fräsen, Grundieren & Spachteln, Verlegen & Übergabe; im offenen Paneel echtes Foto; **der Vorher/Nachher-Regler** (untergrund → fischgraet-raum) sitzt im passenden Paneel oder direkt danach als eigene breite Kachel.
4. work (riesiger Titel „Projekte“, ungleichmäßige Wand): 9–16 echte Fotos, Bildunterschrift Raum/Material (kein Jahr erfinden).
5. Live-Ding: Aufmaß-Rechner (eigene Board-Reihe).
6. list (Riesenwort, gefüllte Balken): „Leistungen“ – Balken je Bodenart/Leistung als `details`, darin Leistungsumfang (keine Preise), Link zur Unterseite.
7. about (Team auf Farbkacheln): Marcel/Team – handwerker + team-ruecken, Text zur Schreinerei; ehrlich „Aus unserem Team“.
8. proof (große Marken auf Kacheln): keine erfundenen Logos/Bewertungen → Fakten-Kacheln (Mitglied der Handwerkskammer zu Köln, Handwerker Blesius GmbH · HRB 122801 Köln, Region, Karriere 1.000 € Wechselbonus) + **eine klar gekennzeichnete Kachel „Google-Bewertungen folgen“**.
9. cta (Aktions-Kachel) + contact (Foto-Streifen-Marquee aus echten Fotos + Formular-Leiste; volles Formular via `{{include contact-form}}` restyled in Kacheln).
10. footer aus Kacheln (Wortmarke groß, Aktion-Kachel orange, Navigation, Adresse/Öffnungszeiten, Credits der gefundenen Bilder).

## Technik
- Gleiche Projektstruktur (build.py, Layout, Partials). Header/Footer/Formular-Partials an das Board anpassen (Header = Kachelreihe laut Hero-Blueprint, mobil Logo-Kachel + Menü-Kachel), Mobilbar beibehalten (Anrufen · WhatsApp · Anfragen).
- `site.css` darf umfassend umgebaut werden (es gibt noch keine Unterseiten). Alte Komponenten, die gegen House rules verstoßen (eyebrow, mono, hairlines, Nummern, Schatten, Verläufe außer Bild-Scrim), entfernen.
- Motion: vorhandenes `static/assets/js/motion.js` (GSAP/ScrollTrigger/SplitText/Lenis, siehe SPEC.md „Motion-System“) weiterverwenden/anpassen; Rezepte aus `references/motion.md`. ≥ 16 bewegte Elemente, Signature „Shutter image“ + „Dielen verlegen sich“, reduced-motion = fertige Seite.
- Gate: `lint.mjs` und `inspect.mjs` (mit `CHROME_PATH=/tmp/claude-0/-home-user-handwerker/e534d912-4457-5b36-a90e-2c029f42c4b5/scratchpad/chrome-nosandbox.sh`) auf `preview/index.html` → **0 FAIL**, WARNs begründen. Danach Look-Runden mit `references/critique.md` (max. 3), Kritik schriftlich in `docs/CRITIQUE.md`.

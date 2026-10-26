# Team-Briefing: Unterseiten bauen (Stand nach Kundenfreigabe)

Kunde: Handwerker Blesius GmbH, Bodenleger, Wermelskirchen. Projekt: `/home/user/blesius-website`.

## Freigegebener Stil (vom Kunden gewählt – exakt so weiterbauen)
- Dunkel, warmes Schwarz, WebGL-Bänder im Hintergrund (Eiche/Orange), Bodenleger-HUD am Rand, Schicht-Labels („SCHICHT 01 · …“), Orange #F28135 als Akzent.
- **Schrift: Archivo schmal (wdth 62), 700, VERSALIEN** für Überschriften, ein Akzentwort in Archivo Italic schmal in Orange; Fließtext Archivo normal; DM Mono für Labels/HUD.
- **Kinetisch**: Buchstaben-Einflug, atmende Überschriften (Variable Font), Wortbänder nach Scroll-Tempo, Bild-Reveals (Diagonal-/Dielen-Wipe), Parallax/Zoom, Tilt, Zahlen-Rolle (nur echte Werte), magnetische Buttons. **Keine statischen Fotos.**
- **Mehrseitig mit epischen Seitenübergängen** (View Transitions + GSAP-Dielen) – bereits im Layout/alive.js eingebaut.
- Die Regeln aus dem tasteskill gelten NICHT (Mono-Labels, Nummern, Linien sind erlaubt).

## Pflichtlektüre vor dem Bauen
1. `SPEC.md` – vor allem „Motion-System“, „Lebendig-Schicht“, „Seitenübergänge“, „Unterseiten-Grundaufbau“ (Klasse `.sub-hero` usw.).
2. Kopf von `build.py` (Seitenkopf-Kommentar: title/description/path/nav/css/jsonld/credits; `{{root}}`, `{{include …}}`, `{{img name alt="…" sizes="…" pos="…"}}`).
3. **Musterseite** `src/pages/leistungen-parkett.html` + `static/assets/css/leistungen.css` + `src/jsonld/*parkett*.json` – Aufbau, Bausteine, Motion-Attribute 1:1 übernehmen.
4. `src/pages/index.html` (Startseite) für Komponenten.
5. Inhalte, die von der Startseite entfernt wurden und jetzt auf Unterseiten gehören (Untergrund-Story mit Vorher/Nachher-Regler und Schnittzeichnung, Ablauf 01–05, Einsatzgebiet-Karte, Bewertungs-Platzhalter, Kontaktformular): stehen in der früheren Startseite → `git show 7bb3b02:src/pages/index.html` (Markup/Texte übernehmen und an den neuen Stil anpassen).
6. Fakten/Bilder: `/tmp/claude-0/-home-user/e534d912-4457-5b36-a90e-2c029f42c4b5/scratchpad/site/BRIEF.md`, Bilderliste `src/images.json`. Copy-Decks (falls vorhanden): `docs/copy/<slug>.md`.

## Faktenregel (hart)
Nichts erfinden: keine Bewertungen/Kundenstimmen, keine Jahre, Projektzahlen, m², Garantien, Preise, Herstellernamen, Gehälter, Reaktionszeiten, kein „Meisterbetrieb“. Foto `handwerker` = „Aus unserem Team“ (nie Marcel). Fakten: Neuenhöhe 17, 42929 Wermelskirchen · 0159 0171 7249 (tel:+4915901717249) · info@handwerker-blesius.de · WhatsApp https://wa.me/4915901717249 · Instagram @handwerkerblesius · Mo–Fr 07:30–17:00, Sa 08:00–14:00 · Amtsgericht Köln HRB 122801 · USt-IdNr. DE454037857 · Mitglied der Handwerkskammer zu Köln · Region Wermelskirchen, Remscheid, Solingen, Wuppertal, Burscheid, Bergisch Gladbach, Köln (größere Projekte deutschlandweit) · Karriere: Bodenleger (m/w/d), 1.000 € Wechsel-Bonus nach erfolgreicher Probezeit (Trockenbau seit 25.10.2026 nicht mehr angeboten, keine Trockenbauer-Stelle).

## Dateiregeln (12 Leute arbeiten parallel!)
- Du änderst NUR: deine eigene(n) Seiten-Datei(en) in `src/pages/`, eigene `src/jsonld/<slug>*.json`, eigene CSS `static/assets/css/<eigene>.css` (im Seitenkopf `css:`) bzw. kleines `<style>` im Seiteninhalt.
- NICHT ändern: site.css, leistungen.css (nur Leistungsseiten dürfen es nutzen, nicht ändern), Layout, Partials, motion.js, alive.js, site.js, build.py. Fehlt etwas → in der Antwort melden.
- Ausnahme: nur die Kontakt-Seite darf am ENDE von site.js ein eigenes Modul anhängen (siehe ihr Auftrag).

## Build & Kurzprüfung (Tempo! Ausführliche Tests macht der Projektleiter)
```
cd /home/user/blesius-website && python3 build.py --local --out /tmp/claude-0/-home-user/e534d912-4457-5b36-a90e-2c029f42c4b5/scratchpad/pv-<slug>
PREVIEW_ROOT=/tmp/claude-0/-home-user/e534d912-4457-5b36-a90e-2c029f42c4b5/scratchpad/pv-<slug> SHOT_DIR=/tmp/claude-0/-home-user/e534d912-4457-5b36-a90e-2c029f42c4b5/scratchpad/shots-<slug> node /tmp/claude-0/-home-user/e534d912-4457-5b36-a90e-2c029f42c4b5/scratchpad/scripts/snap_site.js <pfad>/index.html <slug>
```
Screenshots (Desktop + Mobil, lange Bilder mit PIL zerschneiden) ansehen, keine Konsolenfehler, keine Querscrollbar bei 390 px. Max. 2 Prüfläufe. NIE `python3 build.py` ohne `--out`. Nicht committen.
Antwort: kurz – Datei(en), Besonderheiten, was fehlt, offene Kundenfragen.

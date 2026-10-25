# Imagefilm „Schicht für Schicht“ – 20 s, One-Take

Kinetischer Werbefilm für Handwerker Blesius GmbH: eine durchgehende Kamerafahrt ohne Schnitt,
alle Übergänge sind Verwandlungen (Maßband → Raum-Umriss → Schichtaufbau → Dielen wechseln das
Material → Dielen werden zur Treppe → Haus-Portal → Foto → Region → Logo).

**Ablauf (Musik 152,9 BPM, Schlag n = 3,923 s + n · 0,3925 s)**

| Zeit | Szene | Text |
|---|---|---|
| 0,0–3,9 s | Aufmaß: Maßband, Kreidelinien | „Ein Boden ist nur so gut,“ |
| 3,9–5,5 s | Untergrund: Estrich, Spachtel, Trittschall, Belag | „Wie das, worauf er liegt.“ |
| 5,5–8,6 s | Verlegung: Dielen drehen sich | Parkett · Vinyl · Laminat · Teppich · Treppen |
| 8,6–11,8 s | Handwerk: Treppe, Kamera steigt im Takt | „Verlegt mit der Sorgfalt einer Schreinerei.“ |
| 11,8–13,7 s | Oberfläche: durchs Haus-Portal ins Foto | „Beratung. Verkauf. Verlegung. Aus einer Hand.“ |
| 13,7–14,9 s | Region: Wermelskirchen → Bergisches Land, Köln | Ortsnamen |
| 14,9–20 s | Logo, Telefon, Website, Google-Wertung, Anfrage | Endtafel |

**Technik:** `index.html` + `film.js` (CSS-3D, eigene Kamera, alles reine Funktion der Zeit:
`window.seek(t)`), Bewegungsunschärfe über 3 Zwischenbilder je Frame (`render.js` → `encode.py`).
Soundeffekte sind komplett synthetisiert (`sfx.py`, keine Fremdlizenz).

**Musik:** „A Sound Foundation“ – Airae (Epidemic Sound), 20-s-Edit über die Epidemic-Bearbeitung.
Lizenz läuft über das Epidemic-Konto von Luxmation; die Datei liegt nicht im Repository
(`audio/music20.wav` selbst ablegen).

**Neu rendern**
```
./setup.sh
node preview.js 0.5 0 19.5 pv && python3 sheet.py pv     # Kontaktbogen
for w in 0 1 2 3; do node render.js 60 3 frames $w 4 & done; wait
python3 -I sfx.py . && ffmpeg -i audio/mix.wav -af loudnorm=I=-14:TP=-1 audio/mix_norm.wav
python3 -I encode.py frames 60 3 audio/mix_norm.wav film.mp4
```

---

# Hochformat 9:16 – 30 s mit deutschem Sprecher

Gleiche Welt, für Reels/Shorts/TikTok neu inszeniert (`index9.html` + `film9.js`, 1080 × 1920):
längere Standzeiten, jeder Text erscheint Wort für Wort genau dann, wenn der Sprecher es sagt
(funktioniert damit auch stumm als Untertitel). Texte liegen in der Safe Zone (oben 300 px frei
für die App-Leiste, unten frei für Bedienelemente).

**Musik:** 30-s-Edit von „A Sound Foundation“ (Epidemic Sound), 134,2 BPM, Schlag n bei n · 0,4473 s.
Drop auf Schlag 16 (7,16 s), Steigerung Schlag 36 (16,10 s), Schlussakzent Schlag 52 (23,26 s).

| Sprecher | Bild |
|---|---|
| „Jeder Boden beginnt mit einem genauen Aufmaß.“ | Maßband läuft hoch, Kreidelinien, Raum-Umriss |
| „Denn ein Boden ist nur so gut wie das, worauf er liegt.“ | Estrich, Spachtel, Trittschall mit Beschriftung |
| „Parkett. Vinyl. Laminat. Teppich. Und Treppen.“ | Drop: Dielen fallen und wechseln je Wort das Material |
| „Verlegt mit der Sorgfalt einer Schreinerei.“ | Dielen werden zur Treppe, ein Wort je Stufe (von oben nach unten lesbar) |
| „Beratung, Verkauf und Verlegung – aus einer Hand.“ | Kran zum Haus-Portal, hindurch ins Foto, Foto-Wende |
| „Im Bergischen Land, in Köln und Umgebung.“ | Karte der Region |
| „Handwerker Blesius. Ihr Bodenleger in Wermelskirchen.“ / „Jetzt unverbindlich anfragen.“ | Logo auf den Schlussakzent, Telefon, Google-Wertung, Website, Anfrage |

**Sprecher:** ElevenLabs, Stimme „Hans – Deep Warm German“, Modell eleven_v4. `vo_place.py` schneidet die
Sätze aus der Aufnahme, legt sie auf die Zeitleiste und schreibt die Wortzeiten nach `vo.js`
(ohne `vo.js` nutzt der Film Ersatzzeiten aus `VO_PLAN`). Alle Szenenzeiten hängen daran (`S` in `film9.js`).

**Neu rendern (Hochformat)**
```
export FILM_PAGE=index9.html FILM_W=1080 FILM_H=1920 FILM_DUR=30
node preview.js 0.5 0 30 pv9 && python3 sheet.py pv9 8 200          # Kontaktbogen
node dump_times.js > audio/times9.json && python3 -I sfx9.py .       # Effekte + Mischung -> audio/mix9.wav
for w in 0 1 2 3; do node render.js 60 3 frames9 $w 4 & done; wait
python3 -I encode.py frames9 60 3 audio/mix9_norm.wav film9.mp4
```

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

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

**Sprecher:** ElevenLabs, Stimme „Hans – Deep Warm German“, Modell eleven_v4, Flow `gxpFf95GZc6J21rMGtKc`
(Knoten `ARKoPCL9RWwGdkLIp2hl`). **Verwendet wird die lizenzierte Aufnahme aus dem bezahlten Plan** (25.10.2026,
Generation `gTYhWLyJHFIFTLOzdai6`, 25,4 s, nicht im Repository: `audio/vo_lic.wav`, Wortzeiten `audio/vo_words_lic.json`).
Von zwei Takes gewählt, weil die Satzpausen etwas deutlicher sind; Tempo weicht von der alten Aufnahme nur um
Hundertstelsekunden ab, die Choreografie bleibt gleich.
Wortzeiten: `asr_words.py` (faster-whisper „small“, lokal). `vo_place.py` schneidet Sätze bzw. Material-Wörter in den
Sprechpausen aus der Aufnahme, legt sie auf die Zeitleiste (Material-Wörter auf jeden zweiten Schlag,
„Handwerker Blesius“ direkt nach dem Schlussakzent) und schreibt `audio/vo_placed.wav` + `vo.js`. Alle Szenenzeiten
(`S` in `film9.js`) und Toneffekte (`sfx9.py` über `dump_times.js`) richten sich danach.
`VO_TAKE=take1` nimmt die alte Aufnahme aus dem Free-Plan (nur zum Vergleich, **nicht veröffentlichen**).

**Lizenz Sprecher:** Die alte Aufnahme `vo_take1` stammt aus dem Free-Plan und ist nicht für kommerzielle Nutzung
freigegeben. Die aktuelle Fassung (`vo_lic`) ist im bezahlten Plan erzeugt. Bei einer neuen Aufnahme: Knoten im Flow
erneut ausführen, `asr_words.py <audio> audio/vo_words_lic.json`, Schnittpunkte in `vo_place.py` (`CUTS['lic']`) in die
Sprechpausen legen, dann wie unten neu mischen und rendern.

**Mischung:** Musik weicht dem Sprecher aus (breitbandig bis ca. −10 dB plus zusätzliche Absenkung
0,7–5 kHz, nur so stark wie nötig), Effekte treten unter der Stimme zurück; Ziel −14 LUFS, −1 dBTP.

**Neu rendern (Hochformat)**
```
export FILM_PAGE=index9.html FILM_W=1080 FILM_H=1920 FILM_DUR=30
node preview.js 0.5 0 30 pv9 && python3 sheet.py pv9 8 200          # Kontaktbogen
python3 -I vo_place.py .                                             # Sprecher (lizenziert) -> audio/vo_placed.wav + vo.js
node dump_times.js > audio/times9.json && python3 -I sfx9.py .       # Effekte + Mischung -> audio/mix9.wav
ffmpeg -i audio/mix9.wav -af loudnorm=I=-14:TP=-2.5 audio/mix9_norm.wav   # Reserve für AAC
for w in 0 1 2 3; do node render.js 60 3 frames9 $w 4 & done; wait
python3 -I encode.py frames9 60 3 audio/mix9_norm.wav film9.mp4
```

---

# Logo-Intro vor dem Hochformat-Film (3,13 s, 26.10.2026)

Kinetisches Logo-Intro, läuft direkt vor dem 30-s-Film (zusammen 33,13 s). Genau 7 Schläge der Musik:
Schlagschnur schnappt (Kreidestaub) → orange, graue und Haus-Fläche stehen im Takt auf → Dach fällt und schlägt auf
(Wackler, Glühen) → Marke gleitet ins Logo, „Handwerker“ steigt Buchstabe für Buchstabe auf, „Blesius GmbH“ folgt,
die Schnur wird zur Linie unter dem Logo → Glanz → Kamera fliegt ins Hausfenster → Film startet auf seinem Musikakzent.

- Bild: `intro9.html` + `intro9.js` (Hintergrund, Korn und Easing aus `film9.js`; Logo-Ebenen `assets/brand/mark-*.png`,
  Schriftzug aus `logo-light.png`). 188 Bilder bei 60 fps, je 3 Zwischenbilder für Bewegungsunschärfe.
- Ton: `sfx_intro.py` – Musik-Anlauf = die 3,133 s des Volltracks „A Sound Foundation“ direkt vor dem Startpunkt des
  30-s-Schnitts (Volltrack 30,010 s, gemessen per Korrelation), Effekte mit den Klangbausteinen aus `sfx9.py`,
  danach unverändert der fertige Filmton (`audio/mix9_norm2.wav`). Intro ca. -16 LUFS, gesamt -14,4 LUFS, Spitze -1 dBTP.

```
for w in 0 1 2 3; do FILM_PAGE=intro9.html FILM_W=1080 FILM_H=1920 FILM_DUR=3.133333 node render.js 60 3 frames_intro $w 4 & done; wait
python3 -I enc_intro.py frames_intro intro60.mkv 188
INTRO_BOOST_DB=12 INTRO_MUS_DB=5 python3 -I sfx_intro.py . sfx9.py audio/foundation.mp3 30.010 audio/mix_intro33.wav
ffmpeg -i intro60.mkv -i out/Blesius-Imagefilm-9x16-30s-Master-1080x1920-60p.mp4 -i audio/mix_intro33.wav \
  -filter_complex "[0:v]setsar=1[a];[1:v]setsar=1[b];[a][b]concat=n=2:v=1:a=0[v]" -map "[v]" -map 2:a \
  -c:v libx264 -preset slow -crf 15 -profile:v high -pix_fmt yuv420p -r 60 -c:a aac -b:a 320k -movflags +faststart master.mp4
ffmpeg -i master.mp4 -vf fps=30 -c:v libx264 -preset slow -crf 21 -maxrate 6000k -bufsize 12000k -pix_fmt yuv420p \
  -c:a aac -b:a 192k -movflags +faststart web.mp4
```
Musiklizenz wie beim Film: Epidemic Sound über das Konto von Luxmation (für Kundenwerbung prüfen).

# Logo-Intro (3,133 s) vor dem 30-s-Film: Musik-Anlauf aus dem Volltrack + prozedurales Sounddesign,
# dann nahtlos der fertige Filmton. Klangbausteine aus sfx9.py.
# python3 -I sfx_intro.py <film-ordner> <sfx9.py> <volltrack.mp3> <offset_s> <ausgabe.wav>
import sys, os, subprocess, wave
import numpy as np

D, SFX9, FULL, OFFSET, OUT = sys.argv[1], sys.argv[2], sys.argv[3], float(sys.argv[4]), sys.argv[5]
SR = 48000
Q = 0.4473
DI = 188 / 60                                  # Intro-Länge = 188 Bilder bei 60 fps
NI = int(round(DI * SR))                       # 150400 Samples
TAIL = int(1.6 * SR)                           # Ausklang der Intro-Effekte läuft in den Film hinein
rng = np.random.default_rng(2026)
B = lambda k: k * Q

# Klangbausteine aus sfx9.py übernehmen (Funktionen zwischen „def t_“ und „Spur aufbauen“)
src = open(SFX9, encoding='utf-8').read()
blocks = src[src.index('def t_(n)'):src.index('# ---------------- Spur aufbauen')]
exec(blocks, globals())

def load(path, ch=2, ss=None, dur=None):
    cmd = ['ffmpeg', '-v', 'error']
    if ss is not None: cmd += ['-ss', f'{ss:.6f}']
    cmd += ['-i', path]
    if dur is not None: cmd += ['-t', f'{dur:.6f}']
    cmd += ['-ac', str(ch), '-ar', str(SR), '-f', 'f32le', '-']
    raw = subprocess.run(cmd, capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.float32).reshape(-1, ch).astype(np.float64)

track = np.zeros((NI + TAIL, 2))
def put(sig, at, gain_db=0.0, p=0.0, verb=0.0):
    st = sig if sig.ndim == 2 else pan(sig, p)
    if verb: st = reverb(st, rt=1.1, mix=verb)
    s = int(at * SR); e = min(len(track), s + len(st))
    if s >= len(track) or e <= 0: return
    track[max(0, s):e] += st[max(0, -s):e - s] * 10 ** ((gain_db + BOOST) / 20)

BOOST = float(os.environ.get('INTRO_BOOST_DB', '9'))       # Intro trägt ohne Sprecher: Effekte deutlich lauter als im Film
MUS_DB = float(os.environ.get('INTRO_MUS_DB', '4'))          # leiser Abschnitt vor dem Schnittpunkt etwas anheben
tSnap, tOr, tGr, tHo, tRoof = B(.5), B(1), B(1.5), B(2), B(2.5)
tMove0, tMove1, tLet0, tBl0, tSh0, tSh1, tZ0 = B(3), B(4), B(3.45), B(4.2), B(4.85), B(5.8), B(5.8)

# 1) Schlagschnur: Spannung, Schnappen, Schwingen, Kreidestaub
put(riser(.2, 300, 1600), .02, -26)
put(knock(1150, .03, 1.2, .9, .2), tSnap, -13)
put(thud(95, 45, .18, .6, .6, .6), tSnap, -11)
tt = t_(int(.9 * SR)); twang = sum(np.sin(2 * np.pi * k * 98 * tt + k) / k * np.exp(-tt / (.28 / k)) for k in range(1, 7))
twang *= 1 + .35 * np.sin(2 * np.pi * 9.5 * tt) * np.exp(-tt / .06)
put(twang / np.max(np.abs(twang)), tSnap, -21)
puff = bp_fft_sweep(rng.standard_normal(int(.5 * SR)), 2500, 5200, 1.4) * np.exp(-t_(int(.5 * SR)) / .12)
put(np.stack([puff, np.roll(puff, 311)], axis=1) / np.max(np.abs(puff)), tSnap + .005, -25)

# 2) Teile stehen im Takt auf: kurzer Luftzug + Holz-Knock + Bassschlag
for t0, f, p, sw in [(tOr, 300, -.3, (300, 1400)), (tGr, 360, 0, (320, 1500)), (tHo, 430, .3, (500, 2200))]:
    put(whoosh(.2, sw[0], sw[1], p - .2, p, .9), t0 - .19, -27)
    put(knock(f, .07, .9, .5), t0, -14, p)
    put(thud(78, 42, .14, .5, .3, .4), t0, -17, p)

# 3) Dach fällt und schlägt auf
put(whoosh(.24, 2600, 520, 0, 0, .96), tRoof - .23, -20)
put(impact(), tRoof, -8)
put(knock(250, .1, .8, .7), tRoof, -12)

# 4) Marke gleitet ins Logo, Buchstaben, „Blesius GmbH“, Linie
put(whoosh(.52, 420, 2100, -.1, .5, .55), tMove0 - .02, -23)
for i in range(10): put(tick(2600 + i * 110, .012, .06), tLet0 + i * .032 + .03, -31, -.5 + i * .09)
put(whoosh(.45, 1200, 4200, -.4, .4, .5, 1.0), tBl0, -29)
put(knock(720, .04, 1.0, .6, .25), tMove1 - .05, -25)

# 5) Glanz: heller Akkord, wandert mit dem Lichtstreifen von links nach rechts
n = int(1.0 * SR); tt = t_(n)
chime = sum(np.sin(2 * np.pi * f * tt) * np.exp(-tt / .55) for f in (1760, 2640, 3520)) * np.minimum(1, tt / .03)
put(pan(chime / np.max(np.abs(chime)), np.linspace(-.6, .6, n)), tSh0 + .05, -30)

# 6) Flug ins Fenster: Riser + Sog bis genau zum Filmstart (dort setzt der Musikakzent ein)
zd = DI - tZ0
put(riser(zd, 160, 1800), tZ0, -16)
put(whoosh(zd, 300, 3600, 0, 0, .97, .6), tZ0, -17)
put(thud(68, 34, .38, .9, .45, 1.4), DI, -12)                 # Aufprall genau auf dem Filmstart (läuft in den Film hinein)
put(reverb(pan(knock(180, .12, .6, .5, .6), 0), 1.6, .4), DI, -14)

track = np.tanh(track)

# Musik-Anlauf: die 3,133 s des Volltracks direkt vor dem Startpunkt des 30-s-Schnitts
G_MUS = 0.7356                       # Pegel wie im fertigen Filmton (Musik 0,71 · Volltrack→Schnitt 1,036)
G_SFX = 0.8 * 1.291                  # wie die Effekte im Film (0,8 · Normierung)
lead = load(FULL, 2, OFFSET - DI, DI)[:NI]
lead = np.pad(lead, ((NI - len(lead), 0), (0, 0)))
fade_in = np.minimum(1, t_(NI) / .25)[:, None]           # weich aus der Stille
film = load(os.path.join(D, 'audio', 'mix9_norm2.wav'), 2)
# Anhebung der Musik läuft vor dem Schnittpunkt aus, damit der Akzent zu Filmbeginn seine Wirkung behält
tt_i = t_(NI); ramp = np.clip((tt_i - (DI - .75)) / .7, 0, 1); ramp = ramp * ramp * (3 - 2 * ramp)
mus_gain = (10 ** (MUS_DB * (1 - ramp) / 20))[:, None]
# Effekte so weit zurücknehmen, dass Intro und Übergang unter -1,5 dBFS bleiben (Intro und Ausklang getrennt geregelt,
# der Filmton selbst bleibt unverändert)
for _ in range(30):
    intro = lead * G_MUS * mus_gain * fade_in + track[:NI] * G_SFX
    if float(np.max(np.abs(intro))) <= 0.84: break
    G_SFX *= 0.95
G_TAIL = G_SFX
for _ in range(30):
    ovl = film[:TAIL] + track[NI:NI + TAIL] * G_TAIL
    if float(np.max(np.abs(ovl))) <= 0.84: break
    G_TAIL *= 0.95
film = film.copy(); film[:TAIL] = ovl
print('Effekt-Pegel Intro', round(G_SFX, 3), 'Ausklang', round(G_TAIL, 3), 'Spitzen', round(float(np.max(np.abs(intro))), 3), round(float(np.max(np.abs(ovl))), 3))
full = np.concatenate([intro, film])
raw = (np.clip(full, -1, 1) * 32767).astype('<i2').tobytes()
with wave.open(OUT, 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(raw)
print('ok', OUT, 'Länge', round(len(full) / SR, 4), 's, Intro', NI, 'Samples')

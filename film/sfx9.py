# Hochformat-Film (30 s): prozedurales Sounddesign + Mischung aus Sprecher, Musik (geduckt) und Effekten, 48 kHz Stereo.
# python3 -I sfx9.py <film-ordner>   liest audio/times9.json (Szenenzeiten aus dem Film), audio/music30.wav, audio/vo_placed.wav
# schreibt audio/mix9.wav (ungenormt) und audio/sfx9_only.wav
import sys, os, json, subprocess, wave
import numpy as np

D = sys.argv[1]
SR = 48000
DUR = 30.0
N = int(SR * DUR)
rng = np.random.default_rng(4321)
Q = 0.4473
T = lambda n: n * Q
J = json.load(open(os.path.join(D, 'audio', 'times9.json')))
S, V = J['S'], J['V']
wt = lambda id_, k: V[id_]['words'][max(0, min(k, len(V[id_]['words']) - 1))]['t0']
we = lambda id_, k: V[id_]['words'][max(0, min(k, len(V[id_]['words']) - 1))]['t1']

def t_(n): return np.arange(int(n)) / SR

def env_adsr(n, a, d, peak_at=None):
    t = t_(n); a = max(a, 1e-4)
    e = np.minimum(1, t / a) * np.exp(-np.maximum(0, t - a) / max(d, 1e-4))
    return e

def biquad_bp(x, f, q):
    """Bandpass (RBJ), f darf ein Array (pro Block) sein."""
    y = np.zeros_like(x); blk = 128
    z1 = z2 = 0.0; x1 = x2 = y1 = y2 = 0.0
    fs = np.atleast_1d(f)
    for s in range(0, len(x), blk):
        fc = float(fs[min(len(fs) - 1, s * len(fs) // len(x))]) if len(fs) > 1 else float(fs[0])
        fc = min(max(fc, 30), SR * 0.45)
        w0 = 2 * np.pi * fc / SR; al = np.sin(w0) / (2 * q)
        b0, b1, b2 = al, 0, -al; a0, a1, a2 = 1 + al, -2 * np.cos(w0), 1 - al
        b0, b1, b2, a1, a2 = b0 / a0, b1 / a0, b2 / a0, a1 / a0, a2 / a0
        seg = x[s:s + blk]; out = np.empty_like(seg)
        for i, xi in enumerate(seg):
            yi = b0 * xi + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2
            x2, x1, y2, y1 = x1, xi, y1, yi; out[i] = yi
        y[s:s + blk] = out
    return y

def onepole_lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); z = 0.0
    for i, v in enumerate(x): z = (1 - a) * v + a * z; y[i] = z
    return y

def lp_fft(x, fc, order=4):
    X = np.fft.rfft(x); fr = np.fft.rfftfreq(len(x), 1 / SR)
    X /= np.sqrt(1 + (fr / fc) ** (2 * order)); return np.fft.irfft(X, len(x))

def hp_fft(x, fc, order=2):
    X = np.fft.rfft(x); fr = np.fft.rfftfreq(len(x), 1 / SR)
    X *= 1 / np.sqrt(1 + (fc / np.maximum(fr, 1e-3)) ** (2 * order)); return np.fft.irfft(X, len(x))

def bp_fft_sweep(x, f0, f1, bw_oct=1.0):
    """Zeitvariabler Bandpass per STFT (glatt, schnell)."""
    n = len(x); hop = 256; win = np.hanning(1024)
    out = np.zeros(n + 1024); norm = np.zeros(n + 1024)
    fr = np.fft.rfftfreq(1024, 1 / SR)
    frames = range(0, n, hop)
    for k, s in enumerate(frames):
        seg = np.zeros(1024); seg[:min(1024, n - s)] = x[s:s + 1024]
        p = s / max(1, n - 1); fc = f0 * (f1 / f0) ** p
        g = np.exp(-0.5 * (np.log2(np.maximum(fr, 1) / fc) / (bw_oct / 2)) ** 2)
        y = np.fft.irfft(np.fft.rfft(seg * win) * g, 1024) * win
        out[s:s + 1024] += y; norm[s:s + 1024] += win ** 2
    return (out / np.maximum(norm, 1e-3))[:n]

def pan(m, p):  # p -1..1 (Array oder Zahl)
    p = np.clip(np.broadcast_to(p, m.shape), -1, 1); a = (p + 1) * np.pi / 4
    return np.stack([m * np.cos(a), m * np.sin(a)], axis=1)

def reverb(st, rt=1.4, mix=0.25, pre=0.012):
    n = int(SR * rt * 1.5); t = t_(n)
    irL = rng.standard_normal(n) * np.exp(-6.9 * t / rt); irR = rng.standard_normal(n) * np.exp(-6.9 * t / rt)
    irL = lp_fft(irL, 5000); irR = lp_fft(irR, 5000)
    d = int(SR * pre); irL = np.concatenate([np.zeros(d), irL]); irR = np.concatenate([np.zeros(d), irR])
    def fconv(a, b):
        L_ = len(a) + len(b); nfft = 1 << (L_ - 1).bit_length()
        return np.fft.irfft(np.fft.rfft(a, nfft) * np.fft.rfft(b, nfft), nfft)[:len(a)]
    L = fconv(st[:, 0], irL); R = fconv(st[:, 1], irR)
    w = np.stack([L, R], axis=1); w *= np.sqrt(np.mean(st ** 2) + 1e-12) / np.sqrt(np.mean(w ** 2) + 1e-12)
    return st * (1 - mix) + w * mix

# ---------------- Klangbausteine ----------------
def whoosh(dur, f0=400, f1=2400, p0=-.6, p1=.6, peak=.6, bw=1.4, air=0.0):
    n = int(SR * dur); t = t_(n) / dur
    x = rng.standard_normal(n)
    x = bp_fft_sweep(x, f0, f1, bw)
    e = np.where(t < peak, (t / peak) ** 2.2, np.exp(-(t - peak) / (1 - peak) * 4.5))
    m = x * e
    if air: m += hp_fft(rng.standard_normal(n), 5000) * e * air
    m /= np.max(np.abs(m)) + 1e-9
    return pan(m, np.linspace(p0, p1, n))

def knock(f=420, dec=.08, bright=1.0, noise=.4, n_len=.35):
    n = int(SR * n_len); t = t_(n)
    ratios = [1, 2.32, 4.25, 6.63, 9.1]; decs = [dec, dec * .55, dec * .35, dec * .22, dec * .14]
    amps = [1, .55 * bright, .35 * bright, .2 * bright, .12 * bright]
    m = sum(a * np.sin(2 * np.pi * f * r * t + rng.random() * 6) * np.exp(-t / d) for r, d, a in zip(ratios, decs, amps))
    nb = hp_fft(rng.standard_normal(n), 1800) * np.exp(-t / .006) * noise
    m = m + nb; m /= np.max(np.abs(m)) + 1e-9
    return m

def thud(f0=75, f1=38, dec=.28, punch=.8, click=.4, n_len=.9):
    n = int(SR * n_len); t = t_(n)
    fr = f1 + (f0 - f1) * np.exp(-t / .06)
    ph = 2 * np.pi * np.cumsum(fr) / SR
    sub = np.sin(ph) * np.exp(-t / dec)
    body = lp_fft(rng.standard_normal(n), 520) * np.exp(-t / .07) * punch
    cl = hp_fft(rng.standard_normal(n), 2500) * np.exp(-t / .003) * click
    m = sub + body + cl; m /= np.max(np.abs(m)) + 1e-9
    return m

def tick(f=3200, dec=.012, n_len=.06):
    t = t_(int(SR * n_len)); return np.sin(2 * np.pi * f * t) * np.exp(-t / dec)

def ratchet(dur, r0=22, r1=55, f=3400):
    n = int(SR * dur); m = np.zeros(n); tt = 0.0; i = 0
    while tt < dur:
        p = tt / dur; rate = r0 + (r1 - r0) * np.sin(p * np.pi) ** .7
        s = int(tt * SR); c = tick(f * (0.9 + 0.2 * rng.random()), .004, .02) * (0.6 + 0.4 * rng.random())
        e = min(n, s + len(c)); m[s:e] += c[:e - s]
        cl = hp_fft(rng.standard_normal(len(c)), 4000) * np.exp(-t_(len(c)) / .0015) * .5
        m[s:e] += cl[:e - s]
        tt += 1 / rate; i += 1
    slide = bp_fft_sweep(rng.standard_normal(n), 3500, 5200, 1.0) * .25
    m += slide * np.minimum(1, t_(n) / .05) * np.minimum(1, (dur - t_(n)) / .08)
    return m / (np.max(np.abs(m)) + 1e-9)

def riser(dur, f0=180, f1=1400):
    n = int(SR * dur); t = t_(n) / dur
    x = bp_fft_sweep(rng.standard_normal(n), f0 * 2, f1 * 3, 1.2)
    ph = 2 * np.pi * np.cumsum(f0 * (f1 / f0) ** t) / SR
    tone = np.sin(ph) * .35 + np.sin(ph * 1.5) * .15
    e = t ** 2.6
    m = (x + tone) * e; return m / (np.max(np.abs(m)) + 1e-9)

def impact(n_len=3.2):
    n = int(SR * n_len); t = t_(n)
    fr = 30 + 40 * np.exp(-t / .09)
    sub = np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-t / .9)
    body = lp_fft(rng.standard_normal(n), 900) * np.exp(-t / .12) * .9
    cl = hp_fft(rng.standard_normal(n), 3000) * np.exp(-t / .004) * .6
    shim = sum(np.sin(2 * np.pi * f * t + rng.random() * 6) * np.exp(-t / 1.4) for f in (880, 1320, 1760, 2640)) * .05
    m = sub * 1.0 + body + cl + shim
    st = pan(m / (np.max(np.abs(m)) + 1e-9), 0)
    return reverb(st, rt=2.2, mix=.32)

# ---------------- Spur aufbauen ----------------
track = np.zeros((N, 2))
def put(sig, at, gain_db=0.0, p=0.0, verb=0.0):
    st = sig if sig.ndim == 2 else pan(sig, p)
    if verb: st = reverb(st, rt=1.1, mix=verb)
    s = int(at * SR); e = min(N, s + len(st))
    if s >= N or e <= 0: return
    track[max(0, s):e] += st[max(0, -s):e - s] * 10 ** (gain_db / 20)

# A: HUD-Ticks, Maßband, Schlagschnur, Raster
for i, at in enumerate([0.12, 0.2, 0.28, 0.36]): put(tick(2800 + i * 300), at, -27, -.5)
put(ratchet(S['tapeOut'][1] - S['tapeOut'][0] - .02), S['tapeOut'][0], -17, .25)
put(pan(knock(1900, .02, 1.2, 1.0, .2), 0.4), S['tapeOut'][1], -14)                     # Einrasten
put(thud(110, 60, .08, .5, 1.0, .4), S['chalk'], -12, 0)                                 # Schlagschnur
put(pan(hp_fft(rng.standard_normal(int(SR * .5)), 3000) * np.exp(-t_(int(SR * .5)) / .05), 0) * .3, S['chalk'], -21)
for i in range(3): put(whoosh(.32, 900, 3200, -.3 + i * .3, .3 + i * .2, .5, 1.6), S['chalk'] + .15 + i * .15, -26)
for i in range(4): put(tick(2400 + i * 220, .014, .07), S['chalk'] + .3 + i * .05, -28, -.5 + i * .3)
put(ratchet(.3, 60, 90, 4200) * .7, T(7), -18, .3)                                      # Maßband schnappt zurück
put(knock(1500, .03, 1.0, 1.0, .25), T(7.8), -16, .5)
# B: Schichtaufbau
put(thud(70, 32, .45, 1.0, .5, 1.2), S['est'], -7, 0, verb=.15)                        # Estrich
put(whoosh(.5, 300, 1500, -.5, -.2, .6), S['spa'] - .12, -25); put(thud(95, 50, .2, .7, .5, .6), S['spa'], -11, -.1)
put(whoosh(.5, 300, 1500, -.4, 0, .6), S['tri'] - .12, -25); put(thud(85, 45, .16, .5, .2, .5), S['tri'], -12, .1)
for i, at in enumerate([S['est'] + .3, S['spa'] + .1, S['tri'] + .1]): put(tick(3000 + i * 250, .012, .06), at, -27, -.6)
put(whoosh(.9, 120, 900, -.2, .2, .92, 1.8), S['drop'] - .9, -19)                      # Sog in den Drop
# C: Dielen fallen (Drop) + Materialwechsel
put(thud(62, 30, .4, 1.0, .4, 1.0), S['drop'], -8, 0, verb=.12)
for i in range(10): put(knock(330 + rng.random() * 90, .07, .8, .5), S['drop'] + i * .028, -16 + rng.random() * 2, -.6 + i * .12)
for k, (t0, stg, f) in enumerate(zip(S['flips'], [.026, .026, .016, .016], [600, 560, 480, 620])):
    for i in range(10):
        put(whoosh(.09, 900, 2600, -.6 + i * .12, -.5 + i * .12, .5, 1.0), t0 - .06 + i * stg, -29)
        put(knock(f + rng.random() * 60, .035, .9, .5, .2), t0 - .06 + i * stg + .14, -23, -.6 + i * .12)
# D: Treppe wächst, Kamera schwenkt, Schritte (je Wort eine Stufe)
for i in range(10): put(knock(260 + i * 34, .07, .8, .5), S['stairs'] + i * .018 + .1, -15, -.5 + i * .1)
put(whoosh(.9, 160, 1100, .5, -.3, .5), S['stairs'] + .05, -18)
for i, at in enumerate(S['steps']):
    put(knock(250 - i * 10, .1, .5, .3, .4), at, -15, .15)                                  # Schritt auf Holz
    put(whoosh(.34, 500, 2200, -.2, .2, .4), at - .06, -29)
put(whoosh(.9, 150, 1300, 0, 0, .55, 1.5, .2), S['hold'] - .05, -16)                   # Kran hoch
put(whoosh(1.0, 100, 1600, -.3, .3, .8, 1.6, .3), S['crane'] - .2, -13)                # durchs Portal
# E: Foto-Wende
for i in range(6): put(whoosh(.12, 800, 2400, -.7 + i * .25, -.6 + i * .25, .5), S['flip'] + i * .045, -26)
put(pan(sum(np.sin(2 * np.pi * f * t_(SR)) * np.exp(-t_(SR) / .5) for f in (1320, 1980, 2640)) * .3, 0), S['flip'] + .45, -26)
# F: Region
put(whoosh(1.1, 900, 140, -.2, .2, .35, 1.8), S['toMap'], -16)
for i in range(7): put(tick(2600 + i * 180, .02, .1), S['mapIn'] + i * .07, -26, -.6 + i * .2)
for i in range(6): put(whoosh(.25, 1200, 3800, 0, -.5 + i * .2, .4, 1.2), S['mapIn'] + .3 + i * .05, -29)
put(whoosh(1.2, 1600, 180, -.3, .3, .6, 1.6), T(50.6), -18)                          # Sturz in Wermelskirchen
put(riser(T(52) - T(49), 160, 1500), T(49), -17)
# G: Logo + Abbinder
put(impact(), T(52), -4)
for i, n_ in enumerate([52.5, 53, 53.5]): put(knock(440 + i * 70, .05, 1.0, .6), T(n_), -18, .2)
put(whoosh(.9, 400, 2000, -.4, .3, .5), wt('v7', 0) - .1, -24)                     # Schriftzug
put(whoosh(.6, 1200, 4200, -.6, .6, .5, 1.0), wt('v7', 2) - .35, -27)
put(whoosh(.5, 300, 1500, 0, 0, .55), we('v7', 5) + .15, -24)
for i in range(2): put(tick(2400 + i * 400, .015, .08), we('v7', 5) + .5 + i * .14, -27, -.3 + i * .6)
put(knock(700, .04, 1.0, .7, .25), wt('v8', 0) - .3, -21); put(tick(3600, .02, .08), wt('v8', 0) - .25, -25)
put(pan(sum(np.sin(2 * np.pi * f * t_(SR)) * np.exp(-t_(SR) / .6) for f in (1760, 2640, 3520)) * .25, .2), we('v8', 2) + .2, -30)

track = np.tanh(track * 1.0)
def wav(path, st):
    raw = (np.clip(st, -1, 1) * 32767).astype('<i2').tobytes()
    with wave.open(path, 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(raw)
wav(os.path.join(D, 'audio', 'sfx9_only.wav'), track)

def load(path, ch=2):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', str(ch), '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
    a = np.frombuffer(raw, dtype=np.float32).reshape(-1, ch)[:N]
    return np.pad(a, ((0, max(0, N - len(a))), (0, 0)))
mus = load(os.path.join(D, 'audio', 'music30.wav'))
vo_path = os.path.join(D, 'audio', 'vo_placed.wav')
vo = load(vo_path, 1)[:, 0] if os.path.exists(vo_path) else np.zeros(N)

# Ducking: Musik weicht dem Sprecher (Hüllkurve aus dem Sprecherpegel, Attack 60 ms, Release 450 ms)
blk = 240; e = np.sqrt(np.convolve(vo ** 2, np.ones(blk) / blk, 'same'))
act = np.clip((20 * np.log10(e + 1e-9) + 50) / 18, 0, 1)            # 0 = Stille, 1 = Sprache
env = np.zeros(N); a_at, a_rel = np.exp(-1 / (SR * .06)), np.exp(-1 / (SR * .45)); z = 0.0
step = 48
for i in range(0, N, step):
    v = act[i]; k = a_at if v > z else a_rel; z = v + (z - v) * k ** step; env[i:i + step] = z
# Ausweichen nur so weit nötig: leises Intro bleibt hörbar, lauter Mittelteil macht Platz
mE = np.sqrt(np.convolve(np.mean((mus * 0.55) ** 2, axis=1), np.ones(int(SR * .4)) / int(SR * .4), 'same'))
w_m = np.clip((20 * np.log10(mE + 1e-9) + 36) / 12, 0, 1)
env = env * w_m
duck = 1 - 0.68 * env                                                 # breitbandig bis ca. -10 dB unter Sprache
for at, depth, rel in [(S['drop'], .3, .5), (T(52), .45, 1.2)]:
    s = int(at * SR); n = int(rel * SR); e2 = min(N, s + n)
    duck[s:e2] *= 1 - depth * np.exp(-t_(e2 - s) / (rel / 3))

def band_dip(x, env, lo=700, hi=5000, dip_db=10.0, nfft=2048, hop=512):
    """Musik macht im Sprachband Platz: zusätzliche Absenkung 0,7–5 kHz, gesteuert von der Sprecher-Hüllkurve (STFT)."""
    win = np.hanning(nfft); fr = np.fft.rfftfreq(nfft, 1 / SR)
    lf = np.log2(np.maximum(fr, 1)); c0, c1 = np.log2(lo), np.log2(hi)
    band = np.clip(np.minimum((lf - (c0 - .5)) / .5, ((c1 + .5) - lf) / .5), 0, 1)   # weiche Flanken (½ Oktave)
    g_min = 10 ** (-dip_db / 20)
    out = np.zeros((len(x) + nfft, x.shape[1])); norm = np.zeros(len(x) + nfft)
    xp = np.pad(x, ((0, nfft), (0, 0)))
    for s0 in range(0, len(x), hop):
        e = env[min(len(env) - 1, s0 + nfft // 2)]
        g = 1 - e * (1 - g_min) * band
        for ch in range(x.shape[1]):
            out[s0:s0 + nfft, ch] += np.fft.irfft(np.fft.rfft(xp[s0:s0 + nfft, ch] * win) * g, nfft) * win
        norm[s0:s0 + nfft] += win ** 2
    return out[:len(x)] / np.maximum(norm[:len(x), None], 1e-6)

mus_d = band_dip(mus * 0.55 * duck[:, None], env)
# Sprecher: Hochpass, mittig; Effekte treten unter der Stimme zurück
vo_f = hp_fft(vo, 75, 2) * float(os.environ.get('VO_GAIN', '1.55'))
vo_st = np.stack([vo_f, vo_f], axis=1)
sfx = track * 0.8 * (1 - 0.58 * env)[:, None]
mix = mus_d + sfx + vo_st
peak = np.max(np.abs(mix)); k_ = 1 / max(1.0, peak / 0.98); mix = mix * k_
wav(os.path.join(D, 'audio', 'bg9.wav'), (mus_d + sfx) * k_)          # Hintergrund ohne Sprecher (Kontrolle)
wav(os.path.join(D, 'audio', 'mix9.wav'), mix)
print('ok, Spitze', round(float(peak), 3), 'Sprecher', 'ja' if os.path.exists(vo_path) else 'nein')

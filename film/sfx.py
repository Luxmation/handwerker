# Prozedurales Sounddesign + Mischung mit der Musik (48 kHz Stereo).
# python3 -I sfx.py <film-ordner>  -> audio/mix.wav (ungenormt) und audio/sfx_only.wav
import sys, os, subprocess
import numpy as np

D = sys.argv[1]
SR = 48000
DUR = 20.0
N = int(SR * DUR)
rng = np.random.default_rng(1234)
BEAT, B0 = 0.3925, 3.923
B = lambda n: B0 + n * BEAT

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

# A: HUD-Ticks, Maßband, Schnur, Linien, Text
for i, at in enumerate([0.12, 0.2, 0.28, 0.36]): put(tick(2800 + i * 300), at, -26, -.5)
put(ratchet(B(-6) - B(-9) - .02), B(-9), -15, 0)
put(pan(knock(1900, .02, 1.2, 1.0, .2), 0.4), B(-6), -12)                  # Einrasten
put(thud(110, 60, .08, .5, 1.0, .4), B(-6), -10, 0)                         # Schlagschnur
put(pan(hp_fft(rng.standard_normal(int(SR * .5)), 3000) * np.exp(-t_(int(SR * .5)) / .05), 0) * .3, B(-6), -20)
for i in range(3): put(whoosh(.32, 900, 3200, -.3 + i * .3, .3 + i * .2, .5, 1.6), B(-6) + .1 + i * .14, -24)
put(whoosh(.55, 300, 1600, -.4, .1, .55), B(-5) - .05, -22)
put(whoosh(.55, 320, 1700, .1, .4, .55), B(-4) - .05, -22)
ret = ratchet(.3, 60, 90, 4200) * .7
put(ret, B(-3.2), -16, -.2); put(knock(1500, .03, 1.0, 1.0, .25), B(-2.45), -13, -.6)   # Zurückschnappen
put(whoosh(.9, 120, 900, -.2, .2, .92, 1.8), B(-1.9) + .1, -18)          # Sog in den Drop
# B: Schichten
put(thud(70, 32, .45, 1.0, .5, 1.2), B(0), -4, 0, verb=.15)
put(thud(95, 50, .2, .7, .5, .6), B(1), -9, -.1)
put(thud(85, 45, .16, .5, .2, .5), B(2), -11, .1)
put(whoosh(.5, 300, 1500, -.5, -.2, .6), B(1) - .1, -24)
put(whoosh(.5, 300, 1500, -.4, 0, .6), B(2) - .1, -24)
for i in range(10): put(knock(330 + rng.random() * 90, .07, .8, .5), B(3) + i * .028, -15 + rng.random() * 2, -.6 + i * .12)
put(whoosh(.55, 200, 1200, .4, -.2, .7), B(3.2), -18)
# C: Materialwechsel
put(knock(520, .05, 1.0, .6), B(4), -14, 0)
for k, (t0, stg, f) in enumerate([(B(6), .026, 600), (B(8), .026, 560), (B(9), .016, 480), (B(10), .016, 620)]):
    for i in range(10):
        put(whoosh(.09, 900, 2600, -.6 + i * .12, -.5 + i * .12, .5, 1.0), t0 - .06 + i * stg, -27)
        put(knock(f + rng.random() * 60, .035, .9, .5, .2), t0 - .06 + i * stg + .14, -21, -.6 + i * .12)
# D: Treppe steigt + Schritte
for i in range(10): put(knock(260 + i * 34, .07, .8, .5), B(12) - .05 + i * .018 + .1, -14, -.5 + i * .1)
put(whoosh(.75, 160, 1100, .5, -.3, .5), B(11.7), -16)
for i, n_ in enumerate([13, 14, 15, 16, 17]):
    put(knock(210 + i * 12, .1, .5, .3, .4), B(n_), -11, .15)                # Schritt auf Holz
    put(whoosh(.34, 500, 2200, -.2, .2, .4), B(n_) - .06, -26)
put(whoosh(.8, 150, 900, 0, 0, .5, 1.5, .2), B(18.2), -17)                # Kran
put(whoosh(1.0, 100, 1600, -.3, .3, .82, 1.6, .3), B(19.0), -11)          # durchs Portal
# E: Wörter im Foto + Bildwechsel
for n_ in (21, 22, 23): put(thud(140, 80, .06, .6, .6, .3), B(n_), -17)
for i in range(8): put(whoosh(.12, 800, 2400, -.7 + i * .2, -.6 + i * .2, .5), B(23) - .1 + i * .035, -25)
put(pan(sum(np.sin(2 * np.pi * f * t_(SR) ) * np.exp(-t_(SR) / .5) for f in (1320, 1980, 2640)) * .3, 0), B(24), -22)
# F: Region
put(whoosh(1.1, 900, 140, -.2, .2, .35, 1.8), B(25), -15)
for i in range(6): put(tick(2600 + i * 180, .02, .1), B(25.8) + i * .05, -24, -.6 + i * .25)
for i in range(6): put(whoosh(.25, 1200, 3800, 0, -.5 + i * .2, .4, 1.2), B(26) + i * .04, -27)
put(riser(B(28) - B(26.6), 160, 1500), B(26.6), -14)
# G: Logo
put(impact(), B(28), -3)
for i, n_ in enumerate([28.5, 29, 29.5]): put(knock(440 + i * 70, .05, 1.0, .6), B(n_), -16, .2)
put(whoosh(.7, 400, 2000, -.4, .3, .5), B(29.8), -22)
put(whoosh(.6, 1200, 4200, -.6, .6, .5, 1.0), B(31.2), -25)
put(whoosh(.5, 300, 1500, 0, 0, .55), B(32.3), -22)
for i in range(3): put(tick(2400 + i * 400, .015, .08), B(33.4) + i * .12, -24, -.4 + i * .4)

track = np.tanh(track * 1.0)
os.makedirs(os.path.join(D, 'audio'), exist_ok=True)
def wav(path, st):
    raw = (np.clip(st, -1, 1) * 32767).astype('<i2').tobytes()
    import wave
    with wave.open(path, 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(raw)
wav(os.path.join(D, 'audio', 'sfx_only.wav'), track)

# Musik laden (48 kHz Stereo) und mischen
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', os.path.join(D, 'audio', 'music20.wav'), '-ac', '2', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True).stdout
mus = np.frombuffer(raw, dtype=np.float32).reshape(-1, 2)[:N]
mus = np.pad(mus, ((0, max(0, N - len(mus))), (0, 0)))
# leichtes Ducking der Musik unter den großen Treffern
duck = np.ones(N)
for at, depth, rel in [(B(0), .35, .5), (B(28), .5, 1.2), (B(19.9), .25, .6)]:
    s = int(at * SR); n = int(rel * SR); e = min(N, s + n)
    duck[s:e] *= 1 - depth * np.exp(-t_(e - s) / (rel / 3))
mix = mus * 0.62 * duck[:, None] + track * 0.9
peak = np.max(np.abs(mix)); mix = mix / max(1.0, peak / 0.98)
wav(os.path.join(D, 'audio', 'mix.wav'), mix)
print('ok, Spitze', round(float(peak), 3))

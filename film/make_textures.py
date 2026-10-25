# Prozedurale Materialtexturen für den Imagefilm (Eiche, Estrich, Spachtel, Vinyl, Laminat, Teppich).
# Ausgabe: assets/tex/*.jpg  –  python3 -I make_textures.py <film-ordner>
import sys, os
import numpy as np
from PIL import Image, ImageFilter

OUT = os.path.join(sys.argv[1], 'assets', 'tex')
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(7)


def value_noise(h, w, sy, sx, seed):
    """Glattes Rauschen (bikubisch hochskaliertes Zufallsgitter), Werte 0..1."""
    r = np.random.default_rng(seed)
    gh, gw = max(2, int(h / sy) + 3), max(2, int(w / sx) + 3)
    g = r.random((gh, gw)).astype(np.float32)
    im = Image.fromarray((g * 255).astype(np.uint8)).resize((int(gw * sx), int(gh * sy)), Image.BICUBIC)
    a = np.asarray(im, dtype=np.float32)[:h, :w] / 255.0
    return a


def fbm(h, w, sy, sx, seed, octaves=4, gain=0.5):
    tot = np.zeros((h, w), np.float32); amp = 1.0; norm = 0
    for o in range(octaves):
        tot += amp * value_noise(h, w, max(1, sy / 2 ** o), max(1, sx / 2 ** o), seed + o * 31)
        norm += amp; amp *= gain
    return tot / norm


def save(a, name, q=90):
    a = np.clip(a, 0, 255).astype(np.uint8)
    Image.fromarray(a).save(os.path.join(OUT, name), quality=q)
    print('  ', name, a.shape)


def wood(h, w, seed, base, dark, light, ring=0.055, knots=2, rustic=1.0, sat=1.0):
    """Holzmaserung längs (x = Faserrichtung)."""
    y = np.arange(h, dtype=np.float32)[:, None]
    x = np.arange(w, dtype=np.float32)[None, :]
    warp = (fbm(h, w, h * 0.9, w * 0.35, seed, 4) - 0.5) * h * 0.9
    warp += (fbm(h, w, h * 0.25, w * 0.08, seed + 5, 3) - 0.5) * h * 0.18
    # Knoten verbiegen die Jahresringe
    kn = np.zeros((h, w), np.float32)
    r = np.random.default_rng(seed + 99)
    for _ in range(knots):
        kx, ky = r.uniform(0.1, 0.9) * w, r.uniform(0.2, 0.8) * h
        rad = r.uniform(0.18, 0.35) * h
        d = np.sqrt(((x - kx) / 2.2) ** 2 + (y - ky) ** 2)
        kn += np.exp(-(d / rad) ** 2) * rad * 1.4 * rustic
    phase = (y + warp + kn) * ring
    rings = 0.5 + 0.5 * np.sin(phase * 2 * np.pi)
    rings = rings ** 2.2
    pores = fbm(h, w, 1.6, 26, seed + 11, 2)
    fleck = fbm(h, w, h * 0.5, w * 0.12, seed + 21, 3)
    t = np.clip(0.55 * rings + 0.25 * (pores - 0.5) * 2 + 0.35 * (fleck - 0.5), -1, 1)
    base = np.array(base, np.float32); dark = np.array(dark, np.float32); light = np.array(light, np.float32)
    col = base + (dark - base) * np.clip(t, 0, 1)[..., None] + (light - base) * np.clip(-t, 0, 1)[..., None] * 0.9
    # Knotenkerne dunkel
    for _ in range(knots):
        pass
    col *= (0.92 + 0.16 * fbm(h, w, h, w * 0.5, seed + 33, 2))[..., None]
    if sat != 1.0:
        g = col.mean(axis=2, keepdims=True); col = g + (col - g) * sat
    return col


def plank_atlas(name, n, h, w, seed, **kw):
    rows = []
    for i in range(n):
        p = wood(h, w, seed + i * 17, **kw)
        # leichte Farbvariation je Diele
        tint = 1 + (np.random.default_rng(seed + i).random(3) - 0.5) * 0.08
        rows.append(p * tint)
    save(np.concatenate(rows, axis=0), name)


print('Texturen ->', OUT)
# Eiche (Parkett): warm, rustikal
plank_atlas('oak.jpg', 8, 192, 2400, 100, base=(178, 128, 82), dark=(112, 72, 40), light=(214, 168, 116), ring=0.045, knots=2, rustic=1.0)
# Laminat: hell, gleichmäßiger, weniger Äste
plank_atlas('laminat.jpg', 8, 192, 2400, 300, base=(196, 158, 112), dark=(150, 112, 72), light=(222, 190, 146), ring=0.06, knots=0, rustic=0.0, sat=0.9)
# Vinyl: grau-beige Holzoptik, kühl
plank_atlas('vinyl.jpg', 8, 192, 2400, 500, base=(150, 142, 132), dark=(104, 98, 92), light=(186, 180, 170), ring=0.05, knots=1, rustic=0.6, sat=0.55)

# Estrich: grauer Zementestrich mit Kellenbögen und Sprenkeln
H, W = 1024, 1600
base = fbm(H, W, 220, 220, 900, 5)
spk = (np.random.default_rng(901).random((H, W)) > 0.985).astype(np.float32)
spk = np.asarray(Image.fromarray((spk * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8)), np.float32) / 255
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
arcs = np.zeros((H, W), np.float32)
r = np.random.default_rng(902)
for _ in range(26):
    cx, cy, rad = r.uniform(0, W), r.uniform(0, H), r.uniform(120, 420)
    d = np.abs(np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2) - rad)
    arcs += np.exp(-(d / r.uniform(10, 26)) ** 2) * r.uniform(0.04, 0.12)
c = 118 + (base - 0.5) * 60 + arcs * 120 - spk * 38
c += (fbm(H, W, 30, 30, 903, 2) - 0.5) * 18
save(np.stack([c * 0.98, c * 0.97, c * 0.95], axis=2), 'estrich.jpg')

# Spachtelmasse: heller, glatter, große Kellenzüge
base = fbm(H, W, 300, 300, 950, 4)
arcs = np.zeros((H, W), np.float32)
for _ in range(14):
    cx, cy, rad = r.uniform(0, W), r.uniform(0, H), r.uniform(200, 600)
    d = np.abs(np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2) - rad)
    arcs += np.exp(-(d / r.uniform(30, 60)) ** 2) * r.uniform(0.05, 0.1)
c = 182 + (base - 0.5) * 34 + arcs * 90
save(np.stack([c * 0.99, c * 0.985, c * 0.97], axis=2), 'spachtel.jpg')

# Teppich: feiner Flor, warmes Anthrazit
H, W = 768, 1200
fib = np.random.default_rng(970).random((H, W)).astype(np.float32)
fib = np.asarray(Image.fromarray((fib * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7)), np.float32) / 255
cl = fbm(H, W, 60, 60, 971, 4)
c = 70 + (fib - 0.5) * 70 + (cl - 0.5) * 40
save(np.stack([c * 1.04, c * 0.98, c * 0.92], axis=2), 'teppich.jpg')
print('fertig')

#!/usr/bin/env python3
"""Bildvarianten für die Website erzeugen und in src/images.json eintragen.

Nutzung:
  python3 tools/bild.py QUELLE NAME [--crop links,oben,rechts,unten] [--wie VORHANDENES_BILD]

Erzeugt in static/assets/img/:
  NAME-1600.jpg/.webp  lange Seite 1600 px
  NAME-800.jpg/.webp   Breite 800 px
JPG Qualität 84, progressiv (wie die übrigen Fotos), WebP Qualität 82. Metadaten werden nicht übernommen.

--crop  schneidet die Quelle vorher zu (Pixel der Quelle).
--wie   übernimmt das Seitenverhältnis eines vorhandenen Bildes (z. B. fischgraet-nachher), mittig zugeschnitten,
        damit Vorher- und Nachher-Bild im Regler deckungsgleich liegen.
"""
import argparse, io, json, os
from PIL import Image, ImageCms

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, 'static', 'assets', 'img')
JSON = os.path.join(ROOT, 'src', 'images.json')


def srgb(im):
    icc = im.info.get('icc_profile')
    if icc:
        src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
        im = ImageCms.profileToProfile(im, src, ImageCms.createProfile('sRGB'), outputMode='RGB')
    return im.convert('RGB')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('quelle'); ap.add_argument('name')
    ap.add_argument('--crop'); ap.add_argument('--wie')
    a = ap.parse_args()
    im = srgb(Image.open(a.quelle))
    if a.crop:
        im = im.crop(tuple(int(v) for v in a.crop.split(',')))
    if a.wie:
        rw, rh = Image.open(os.path.join(IMG, a.wie + '-1600.jpg')).size
        w, h = im.size
        if w / h > rw / rh:  # zu breit: links/rechts gleich viel weg
            nw = round(h * rw / rh); x = (w - nw) // 2; im = im.crop((x, 0, x + nw, h))
        else:
            nh = round(w * rh / rw); y = (h - nh) // 2; im = im.crop((0, y, w, y + nh))
    w, h = im.size
    k = 1600 / max(w, h)
    big = im.resize((round(w * k), round(h * k)), Image.LANCZOS) if k < 1 else im
    small = im.resize((800, round(h * 800 / w)), Image.LANCZOS)
    for suffix, pic in (('1600', big), ('800', small)):
        base = os.path.join(IMG, f'{a.name}-{suffix}')
        pic.save(base + '.jpg', quality=84, progressive=True, optimize=True)
        pic.save(base + '.webp', quality=82, method=6)
        print(f'{a.name}-{suffix}: {pic.size[0]} x {pic.size[1]}')
    data = json.load(open(JSON, encoding='utf-8'))
    data[a.name] = list(big.size)
    txt = json.dumps(dict(sorted(data.items())), ensure_ascii=False, indent=1)
    open(JSON, 'w', encoding='utf-8').write(txt + '\n')
    print(f'images.json: {a.name} = {list(big.size)}')


if __name__ == '__main__':
    main()

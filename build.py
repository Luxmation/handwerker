#!/usr/bin/env python3
"""Statischer Seitenbauer für handwerker-blesius.de – ohne Abhängigkeiten.

  python3 build.py            -> dist/  (für den Webserver, schöne URLs /leistungen/parkett/)
  python3 build.py --local    -> preview/ (Links zeigen auf .../index.html, zum Öffnen per Doppelklick)

Seiten liegen in src/pages/*.html. Jede Seite beginnt mit einem Kopf-Kommentar:

  <!--
  title: Seitentitel (max. ~60 Zeichen)
  description: Meta-Beschreibung (max. ~155 Zeichen)
  path: leistungen/parkett/        (Ausgabepfad, leer = Startseite)
  nav: leistungen                  (aktiver Menüpunkt: start|leistungen|projekte|ueber-uns|karriere|kontakt)
  noindex: ja                      (optional, z. B. für 404)
  css: leistungen                  (optional, zusätzliche Datei static/assets/css/leistungen.css)
  jsonld: service-parkett, faq-parkett   (optional, src/jsonld/<name>.json – reines JSON, wird automatisch
                                   in <script type="application/ld+json"> gepackt; mehrere Namen mit Komma)
  credits: „Titel“ von Urheber, <a href="…">CC BY-SA 4.0</a>, via Wikimedia Commons
                                   (optional, Bildnachweis gefundener Bilder; erscheint klein im Footer
                                   über {{credits}}, HTML erlaubt, mehrere Nachweise mit „ · “ trennen)
  -->

Platzhalter im Seiteninhalt und in den Partials:
  {{root}}                      relativer Pfad zur Wurzel ("", "../", "../../")
  {{year}}                      aktuelles Jahr
  {{credits}}                   Bildnachweis aus dem Seitenkopf (nur im Footer-Partial verwenden)
  {{include name}}              fügt src/partials/name.html ein
  {{img name alt="…" sizes="…" class="…" loading="eager|lazy" pos="50% 40%" fetchpriority="high"}}
                                erzeugt <picture> mit WebP + JPEG (800/1600 px) und Breite/Höhe
"""
import json, os, re, shutil, sys, datetime, html

BASE_URL = 'https://handwerker-blesius.de/'
ROOT = os.path.dirname(os.path.abspath(__file__))
LOCAL = '--local' in sys.argv
OUT = os.path.join(ROOT, 'preview' if LOCAL else 'dist')
IMAGES = json.load(open(os.path.join(ROOT, 'src', 'images.json')))


def read(p):
    with open(p, encoding='utf-8') as f:
        return f.read()


def parse_page(text):
    m = re.match(r'\s*<!--(.*?)-->', text, re.S)
    meta = {}
    if m:
        for line in m.group(1).strip().splitlines():
            if ':' in line:
                k, v = line.split(':', 1)
                meta[k.strip()] = v.strip()
        text = text[m.end():]
    meta.setdefault('path', '')
    meta.setdefault('nav', '')
    return meta, text


def attrs(s):
    return dict(re.findall(r'(\w[\w-]*)="([^"]*)"', s))


def picture(m):
    name = m.group(1)
    a = attrs(m.group(2) or '')
    if name not in IMAGES:
        raise SystemExit(f'Unbekanntes Bild: {name}')
    w, h = IMAGES[name]
    sizes = a.get('sizes', '100vw')
    loading = a.get('loading', 'lazy')
    cls = f' class="{a["class"]}"' if a.get('class') else ''
    style = f' style="object-position:{a["pos"]}"' if a.get('pos') else ''
    fp = f' fetchpriority="{a["fetchpriority"]}"' if a.get('fetchpriority') else ''
    p = '{{root}}assets/img/' + name
    return (f'<picture><source type="image/webp" srcset="{p}-800.webp 800w, {p}-1600.webp 1600w" sizes="{sizes}">'
            f'<img src="{p}-1600.jpg" srcset="{p}-800.jpg 800w, {p}-1600.jpg 1600w" sizes="{sizes}" '
            f'width="{w}" height="{h}" alt="{html.escape(a.get("alt", ""), quote=True)}" loading="{loading}" decoding="async"{cls}{style}{fp}></picture>')


def jsonld_block(name):
    # Reines JSON wird automatisch in <script type="application/ld+json"> gepackt; mehrere Namen mit Komma.
    j = read(os.path.join(ROOT, 'src', 'jsonld', name + '.json')).strip()
    return j if j.startswith('<') else f'<script type="application/ld+json">{j}</script>'


def render(text, meta, depth):
    for _ in range(3):  # verschachtelte includes
        text = re.sub(r'\{\{include ([\w-]+)\}\}', lambda m: read(os.path.join(ROOT, 'src', 'partials', m.group(1) + '.html')), text)
    text = re.sub(r'\{\{img ([\w-]+)((?:\s+[\w-]+="[^"]*")*)\s*\}\}', picture, text)
    root = '../' * depth
    path = meta['path']
    canonical = BASE_URL + path
    rep = {
        '{{root}}': root, '{{year}}': str(datetime.date.today().year),
        '{{title}}': html.escape(meta.get('title', 'Handwerker Blesius GmbH'), quote=True),
        '{{description}}': html.escape(meta.get('description', ''), quote=True),
        '{{canonical}}': canonical,
        '{{robots}}': 'noindex, follow' if meta.get('noindex') else 'index, follow',
        '{{extra_css}}': ''.join(f'<link rel="stylesheet" href="{root}assets/css/{c.strip()}.css">' for c in meta.get('css', '').split(',') if c.strip()),
        '{{jsonld}}': ''.join(jsonld_block(n.strip()) for n in meta.get('jsonld', '').split(',') if n.strip()),
        '{{credits}}': f'<p class="ftr__credit">Bildnachweis: {meta["credits"]}</p>' if meta.get('credits') else '',
    }
    for k, v in rep.items():
        text = text.replace(k, v)
    if meta.get('nav'):
        text = text.replace(f'data-nav="{meta["nav"]}"', f'data-nav="{meta["nav"]}" aria-current="page"')
    if LOCAL:  # Ordner-Links für Doppelklick-Vorschau auf index.html umbiegen
        def local(m):
            v = m.group(1)
            if re.match(r'(https?:|mailto:|tel:|#|javascript:|data:)', v):
                return m.group(0)
            base, _, anchor = v.partition('#')
            if base == '' or base.endswith('/'):
                base += 'index.html'
            return f'href="{base}{"#" + anchor if anchor else ""}"'
        text = re.sub(r'href="([^"]*)"', local, text)
    return text


def main():
    if os.path.exists(OUT):
        shutil.rmtree(OUT)
    shutil.copytree(os.path.join(ROOT, 'static'), OUT)
    layout = read(os.path.join(ROOT, 'src', 'layout.html'))
    urls = []
    for fn in sorted(os.listdir(os.path.join(ROOT, 'src', 'pages'))):
        if not fn.endswith('.html'):
            continue
        meta, body = parse_page(read(os.path.join(ROOT, 'src', 'pages', fn)))
        path = meta['path']
        if fn == '404.html':
            target, depth = os.path.join(OUT, '404.html'), 0
        else:
            target = os.path.join(OUT, path, 'index.html')
            depth = path.strip('/').count('/') + 1 if path.strip('/') else 0
        page = render(layout.replace('{{content}}', body), meta, depth)
        os.makedirs(os.path.dirname(target), exist_ok=True)
        with open(target, 'w', encoding='utf-8') as f:
            f.write(page)
        if not meta.get('noindex'):
            urls.append(BASE_URL + path)
        print('  ', target.replace(ROOT + '/', ''))
    today = datetime.date.today().isoformat()
    sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    sm += [f'  <url><loc>{u}</loc><lastmod>{today}</lastmod></url>' for u in urls]
    sm.append('</urlset>')
    with open(os.path.join(OUT, 'sitemap.xml'), 'w') as f:
        f.write('\n'.join(sm) + '\n')
    with open(os.path.join(OUT, 'robots.txt'), 'w') as f:
        f.write(f'User-agent: *\nAllow: /\n\nSitemap: {BASE_URL}sitemap.xml\n')
    print(f'{len(urls)} Seiten -> {OUT}')


if __name__ == '__main__':
    main()

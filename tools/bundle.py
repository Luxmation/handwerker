#!/usr/bin/env python3
"""Packt die komplette Website (preview/) in EINE HTML-Datei zum Offline-Testen.

Aufbau der Ausgabedatei:
  * eine Hülle mit einem bildschirmfüllenden <iframe>,
  * alle Assets (Bilder als WebP, Schriften, CSS, JS) genau einmal als Base64,
  * alle Seiten als Text. Beim Öffnen werden daraus Blob-URLs erzeugt; Links
    zwischen den Seiten zeigen auf kleine Weiterleitungs-Blobs, die zur Laufzeit
    die passende Seite laden. So funktionieren alle Seiten, Links, Seitenübergänge
    und der Zurück-Button – ohne Server.

Nutzung:  python3 build.py --local && python3 tools/bundle.py [ausgabe.html]
"""
import base64, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PV = os.environ.get('BUNDLE_SRC') or os.path.join(ROOT, 'preview')
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'blesius-website.html')

MIME = {'.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
        '.woff2': 'font/woff2', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.ico': 'image/x-icon'}
TEXT = {'.css', '.js', '.svg', '.json'}

# ---------- Seiten einsammeln ----------
pages = {}  # route ("", "leistungen/parkett/", "404.html") -> html
for d, _, fs in os.walk(PV):
    for f in fs:
        if f.endswith('.html'):
            rel = os.path.relpath(os.path.join(d, f), PV).replace(os.sep, '/')
            route = '' if rel == 'index.html' else (rel[:-len('index.html')] if rel.endswith('/index.html') else rel)
            pages[route] = open(os.path.join(d, f), encoding='utf-8').read()

assets = {}  # "assets/…" -> (mime, bytes)


def norm(base_dir, ref):
    p = os.path.normpath(os.path.join(base_dir, ref)).replace(os.sep, '/')
    return p


def use_asset(path):
    """Asset registrieren; JPEG-Fotos werden durch die (kleinere) WebP-Version ersetzt."""
    m = re.match(r'(assets/img/.+-(?:800|1600))\.jpg$', path)
    if m and os.path.exists(os.path.join(PV, m.group(1) + '.webp')):
        path = m.group(1) + '.webp'
    full = os.path.join(PV, path)
    if not os.path.isfile(full):
        return None
    if path not in assets:
        ext = os.path.splitext(path)[1].lower()
        data = open(full, 'rb').read()
        if ext == '.css':
            css_dir = os.path.dirname(path)
            txt = data.decode('utf-8')
            def cssurl(mm):
                ref = mm.group(2)
                if re.match(r'(data:|https?:|#)', ref):
                    return mm.group(0)
                t = use_asset(norm(css_dir, ref))
                return f'url("@@A:{t}@@")' if t else mm.group(0)
            txt = re.sub(r'url\((["\']?)([^)"\']+)\1\)', cssurl, txt)
            data = txt.encode('utf-8')
        if ext == '.js':
            txt = data.decode('utf-8')
            # Vorschau-Weichen: Blob-Seiten wie file: behandeln (Formular-Hinweis, kein View-Transition-Sprung)
            txt = txt.replace("location.protocol !== 'file:'", "(location.protocol !== 'file:' && location.protocol !== 'about:')")
            txt = txt.replace("location.protocol === 'file:'", "(location.protocol === 'file:' || location.protocol === 'about:')")
            # Formular-Vorbefüllung: Parameter kommen im Bundle von der Hülle
            txt = txt.replace('new URLSearchParams(location.search)', "new URLSearchParams((window.parent && parent.__blQuery) || location.search)")
            # Seitenwechsel nach der Übergangs-Animation an die Hülle übergeben
            txt = txt.replace('location.href = url.href;', 'if (window.parent && parent.__blNav) { parent.__blNav(url.href); } else { location.href = url.href; }')
            data = txt.encode('utf-8')
        assets[path] = (MIME.get(ext, 'application/octet-stream'), data)
    return path


def page_route_for(target):
    """Ziel-Pfad (relativ zu preview) -> Route oder None."""
    t = target
    if t.endswith('index.html'):
        t = t[:-len('index.html')]
    if t in ('.', './'):
        t = ''
    if t.endswith('.html') and t in pages:
        return t
    if t and not t.endswith('/'):
        t += '/'
    return t if t in pages else None


INJECT = '''<script>(function(){var P=window.parent;try{window.sessionStorage.length}catch(e){if(P&&P.__blStore)try{Object.defineProperty(window,'sessionStorage',{value:P.__blStore,configurable:true})}catch(_){}}
window.addEventListener('click',function(e){if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey)return;var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href');if(!h||h.indexOf('?bl=')!==0)return;e.preventDefault();if(P&&P.__blNav)P.__blNav(h);});})();</script>'''
processed = {}
for route, html in pages.items():
    base = os.path.dirname(('index.html' if route == '' else (route + 'index.html' if route.endswith('/') else route)))

    def attr(m):
        name, val = m.group(1), m.group(2)
        if name == 'srcset' or name == 'imagesrcset':
            parts = []
            for c in val.split(','):
                c = c.strip()
                if not c:
                    continue
                u, *rest = c.split()
                if re.match(r'(data:|https?:|blob:)', u):
                    parts.append(c); continue
                a = use_asset(norm(base, u))
                parts.append(' '.join([f'@@A:{a}@@' if a else u] + rest))
            return f'{name}="{", ".join(parts)}"'
        if re.match(r'(mailto:|tel:|javascript:|data:|#)', val):
            return m.group(0)
        if re.match(r'https?:', val):
            if name == 'href':
                return m.group(0) + ' target="_blank" rel="noopener"'
            return m.group(0)
        if val.startswith('/') and not val.startswith('//'):  # absolute Pfade (404-Seite) relativ zur Wurzel behandeln
            val = val.lstrip('/'); base_saved = base
        path, _, frag = val.partition('#')
        path, _, query = path.partition('?')
        target = norm(base, path) if path else norm(base, '.')
        if target.startswith('assets/') or '/assets/' in target:
            a = use_asset(target[target.index('assets/'):])
            return f'{name}="@@A:{a}@@"' if a else m.group(0)
        if name == 'href':
            r = page_route_for(target)
            if r is not None:
                q = ('&q=' + query.replace('&', '%26')) if query else ''
                return f'href="?bl={r}{q}' + (('#' + frag) if frag else '') + '"'
        return m.group(0)

    h = re.sub(r'\b(src|href|srcset|imagesrcset|poster|content)="([^"]*)"', attr, html)
    # Restliche Asset-Strings (Inline-Styles, Inline-Skripte)
    def loose(m):
        s = m.group(0)
        p = norm(base, s)
        a = use_asset(p[p.index('assets/'):] if 'assets/' in p else s[s.index('assets/'):])
        return f'@@A:{a}@@' if a else s
    h = re.sub(r'(?<!@@A:)(?<![A-Za-z0-9_./-])(?:\.\./)*assets/[A-Za-z0-9_./-]+\.(?:png|jpe?g|webp|svg|woff2|css|js)', loose, h)
    # webp-<source> ist doppelt, sobald img selbst WebP lädt
    h = re.sub(r'<source type="image/webp"[^>]*>', '', h)
    h = h.replace('<link rel="preload"', '<link rel="x-preload"')  # Preloads auf Blob unnötig
    h = h.replace("l.rel = 'preload'", "l.rel = 'x-preload'")  # dynamischer Schrift-Preload ebenfalls
    h = h.replace('<head>', '<head>' + INJECT, 1)
    processed[route] = h

# ---------- Ausgabedatei ----------
asset_list = sorted(assets)
blob_assets = []
for p in asset_list:
    mime, data = assets[p]
    ext = os.path.splitext(p)[1].lower()
    if ext in TEXT:
        blob_assets.append({'p': p, 'm': mime, 't': data.decode('utf-8')})
    else:
        blob_assets.append({'p': p, 'm': mime, 'b': base64.b64encode(data).decode('ascii')})

start = '' if '' in processed else sorted(processed)[0]
payload = json.dumps({'assets': blob_assets, 'pages': processed, 'start': start}, ensure_ascii=False)
payload = payload.replace('</', '<\\/')

shell = '''<!doctype html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Handwerker Blesius – Website (Vorschau)</title>
<style>html,body{margin:0;height:100%;background:#121110;overflow:hidden}iframe{position:fixed;inset:0;width:100%;height:100%;border:0;display:block;background:#121110}
#load{position:fixed;inset:0;display:grid;place-items:center;color:#9a948c;font:500 14px system-ui,sans-serif;letter-spacing:.08em}</style>
</head><body><div id="load">WIRD GELADEN …</div><iframe id="site" title="Handwerker Blesius" allow="fullscreen"></iframe>
<script id="data" type="application/json">__PAYLOAD__</script>
<script>
(function () {
  var D = JSON.parse(document.getElementById('data').textContent);
  var A = {};
  function b64(s, m) { var bin = atob(s), u = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return URL.createObjectURL(new Blob([u], { type: m })); }
  function fill(t) { return t.replace(/@@A:([^@]+)@@/g, function (_, p) { return A[p] || ''; }); }
  D.assets.forEach(function (a) { if (a.b != null) A[a.p] = b64(a.b, a.m); });
  for (var r = 0; r < 2; r++) D.assets.forEach(function (a) { if (a.t != null) A[a.p] = URL.createObjectURL(new Blob([fill(a.t)], { type: a.m })); });
  var cache = {};
  function page(route) { if (!(route in D.pages)) route = ('404.html' in D.pages) ? '404.html' : D.start; return cache[route] || (cache[route] = fill(D.pages[route])); }
  // In-Memory-Ersatz für sessionStorage (lokale Dateien dürfen keinen echten nutzen)
  var mem = {};
  window.__blStore = { getItem: function (k) { return k in mem ? mem[k] : null; }, setItem: function (k, v) { mem[k] = String(v); }, removeItem: function (k) { delete mem[k]; }, clear: function () { mem = {}; }, key: function (i) { return Object.keys(mem)[i] || null; }, get length() { return Object.keys(mem).length; } };
  var f = document.getElementById('site');
  function parse(h) { var u = new URL(h, 'https://x/'); return { r: u.searchParams.get('bl') || '', q: (u.searchParams.get('q') || '').replace(/%26/g, '&'), hash: u.hash }; }
  function show(t, push) {
    window.__blQuery = t.q ? '?' + t.q : '';
    f.srcdoc = page(t.r);
    if (t.hash) f.addEventListener('load', function go() { f.removeEventListener('load', go); try { var el = f.contentDocument.getElementById(t.hash.slice(1)); if (el) el.scrollIntoView(); } catch (e) {} });
    var url = '?bl=' + encodeURIComponent(t.r) + (t.q ? '&q=' + encodeURIComponent(t.q) : '') + (t.hash || '');
    try { if (push) history.pushState(t, '', url); else history.replaceState(t, '', url); } catch (e) {}
  }
  window.__blNav = function (h) { show(parse(h), true); };
  window.addEventListener('popstate', function (e) { show(e.state || parse(location.search + location.hash), false); });
  f.addEventListener('load', function () { document.getElementById('load').style.display = 'none'; try { document.title = f.contentDocument.title || document.title; } catch (e) {} });
  var init = parse(location.search + location.hash); if (!init.r && !location.search) init.r = D.start;
  show(init, false);
})();
</script></body></html>'''
html = shell.replace('__PAYLOAD__', payload)
with open(OUT, 'w', encoding='utf-8') as fh:
    fh.write(html)
print(f'{len(processed)} Seiten, {len(assets)} Assets -> {OUT} ({os.path.getsize(OUT)/1e6:.1f} MB)')

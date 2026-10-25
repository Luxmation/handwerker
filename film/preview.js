// node preview.js <step> [t0] [t1] [outdir]  – Standbilder + Kontaktbogen
const { chromium } = require('playwright');
// Format per Umgebung: FILM_PAGE (index.html), FILM_W/FILM_H (1920x1080), FILM_DUR (20)
const PAGE = process.env.FILM_PAGE || 'index.html', VW = +(process.env.FILM_W || 1920), VH = +(process.env.FILM_H || 1080), DURX = +(process.env.FILM_DUR || 20);
const step = +(process.argv[2] || .5), t0 = +(process.argv[3] || 0), t1 = +(process.argv[4] || DURX), out = process.argv[5] || 'pv';
require('fs').mkdirSync(out, { recursive: true });
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--disable-web-security', '--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: VW, height: VH } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + process.cwd() + '/' + PAGE);
  console.log('Bilder geladen:', await p.evaluate(() => window.ready));
  const times = []; for (let t = t0; t <= t1 + 1e-6; t += step) times.push(+t.toFixed(3));
  const T = Date.now();
  for (const t of times) {
    await p.evaluate(t => window.seek(t), t);
    await p.screenshot({ path: `${out}/f${String(Math.round(t * 1000)).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 82 });
  }
  console.log('ms/Bild:', Math.round((Date.now() - T) / times.length), 'Fehler:', errs.slice(0, 5));
  await b.close();
})();

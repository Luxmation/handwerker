// node shots.js <outdir> t1 t2 ... – einzelne Standbilder (Hochformat)
const { chromium } = require('playwright');
const out = process.argv[2], ts = process.argv.slice(3).map(Number);
require('fs').mkdirSync(out, { recursive: true });
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: +(process.env.FILM_W || 1080), height: +(process.env.FILM_H || 1920) } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + process.cwd() + '/' + (process.env.FILM_PAGE || 'index9.html'));
  await p.evaluate(() => window.ready);
  for (const t of ts) { await p.evaluate(t => window.seek(t), t); await p.screenshot({ path: `${out}/s${String(Math.round(t * 1000)).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 85 }); }
  console.log('ok', errs.slice(0, 3)); await b.close();
})();

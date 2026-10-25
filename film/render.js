// node render.js <fps> <subframes> <outdir> <worker> <workers> [scale] – rendert Frames (mit Zwischenbildern für Bewegungsunschärfe)
const { chromium } = require('playwright');
const [fps, sub, out, wi, wn, scale] = [+process.argv[2], +process.argv[3], process.argv[4], +process.argv[5], +process.argv[6], +(process.argv[7] || 1)];
const fs = require('fs'); fs.mkdirSync(out, { recursive: true });
const SHUTTER = 0.5;                 // 180°-Verschluss
// Format per Umgebung: FILM_PAGE (index.html), FILM_W/FILM_H (1920x1080), FILM_DUR (20)
const PAGE = process.env.FILM_PAGE || 'index.html', VW = +(process.env.FILM_W || 1920), VH = +(process.env.FILM_H || 1080), DURX = +(process.env.FILM_DUR || 20);
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: VW, height: VH }, deviceScaleFactor: scale });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + process.cwd() + '/' + PAGE);
  await p.evaluate(() => window.ready);
  await p.waitForTimeout(500);
  const N = Math.round(DURX * fps);
  const cdp = await p.context().newCDPSession(p);
  const T = Date.now(); let n = 0;
  for (let i = wi; i < N; i += wn) {
    for (let k = 0; k < sub; k++) {
      const name = `${out}/f${String(i).padStart(4, '0')}_${k}.png`;
      if (fs.existsSync(name)) continue;
      const t = i / fps + (sub > 1 ? (k / sub - 0.5 + 0.5 / sub) * SHUTTER / fps : 0);
      await p.evaluate(t => window.seek(t), Math.max(0, t));
      const r = await cdp.send('Page.captureScreenshot', { format: 'png', optimizeForSpeed: true, captureBeyondViewport: false });
      fs.writeFileSync(name, Buffer.from(r.data, 'base64')); n++;
    }
  }
  console.log(`Worker ${wi}: ${n} Bilder, ${Math.round((Date.now() - T) / Math.max(1, n))} ms/Bild`, errs.slice(0, 3));
  await b.close();
})();

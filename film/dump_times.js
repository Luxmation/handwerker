// node dump_times.js > audio/times9.json – liest Szenen- (S) und Sprecherzeiten (V) aus dem Hochformat-Film
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + process.cwd() + '/' + (process.env.FILM_PAGE || 'index9.html'));
  await p.evaluate(() => window.ready);
  const d = await p.evaluate(() => ({ S: window.S, V: window.V, Q: 0.4473 }));
  console.log(JSON.stringify(d, null, 1));
  await b.close();
})();

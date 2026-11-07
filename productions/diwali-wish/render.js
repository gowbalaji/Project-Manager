// Render scene.html to an MP4 (1080x1920, 30 fps) with the synthesized soundtrack.
// Usage: node render.js [out.mp4] ["Sender line"] [comic]
// Needs: playwright (Chromium), ffmpeg, python3 + numpy.
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const FPS = 30;
const out = path.resolve(process.argv[2] || path.join(__dirname, 'diwali-wish.mp4'));
const name = process.argv[3];
const style = process.argv[4];

(async () => {
  const work = fs.mkdtempSync(path.join(os.tmpdir(), 'diwali-'));
  const frames = path.join(work, 'frames');
  fs.mkdirSync(frames);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2 });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const q = new URLSearchParams({ render: '1' });
  if (name) q.set('name', name);
  if (style) q.set('style', style);
  await page.goto('file://' + path.join(__dirname, 'scene.html') + '?' + q);
  await page.evaluate(() => document.fonts.ready);
  const duration = await page.evaluate(() => window.DURATION);
  const total = Math.round(duration * FPS);
  for (let i = 0; i < total; i++) {
    await page.evaluate(t => window.setTime(t), i / FPS);
    await page.screenshot({ path: path.join(frames, `${String(i).padStart(5, '0')}.jpg`), type: 'jpeg', quality: 93 });
    if (i % 90 === 0) process.stdout.write(`frame ${i}/${total}\n`);
  }
  await browser.close();
  if (errors.length) { console.error(errors.join('\n')); process.exit(1); }

  const wav = path.join(work, 'audio.wav');
  execFileSync('python3', [path.join(__dirname, 'audio.py'), wav], { stdio: 'inherit' });
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', path.join(frames, '%05d.jpg'), '-i', wav,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
    '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '44100', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out], { stdio: 'inherit' });
  fs.rmSync(work, { recursive: true, force: true });
  console.log('wrote', out);
})();

import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

// Run against a local dev/preview server after changing the desktop artwork.
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  args: ['--disable-gpu', '--enable-unsafe-swiftshader'],
});
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await page.goto(process.env.ARTWORK_URL || 'http://127.0.0.1:4173/');
  await page.waitForSelector('.hero-webgl canvas', { timeout: 20000 });
  await page.waitForFunction(() => document.querySelector('.hero-art.webgl-ready, .desktop-artwork[data-ready="true"]'));
  await page.getByRole('button', { name: 'Pause animations', exact: true }).click();
  await page.addStyleTag({ content: `
    html, body, .hero-art { background: transparent !important; }
    .ambient-scene, body::before, .hero-art::before, .hero-art::after,
    .code-floating, .tech-orbit, .sculpture-fallback, .desktop-sculpture-poster { visibility: hidden !important; }
  ` });
  await mkdir('public/artwork', { recursive: true });
  await page.locator('.hero-webgl canvas').screenshot({ path: 'public/artwork/desktop-sculpture.png', omitBackground: true });
  console.log('Saved a transparent preview of the actual desktop sculpture.');
} finally {
  await browser.close();
}

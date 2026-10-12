import { chromium, expect } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Run after npm run build && npm run preview -- --port 4174.
// Media is captured from the actual site; presentation labels are added in export.
const base = process.env.PORTFOLIO_CAPTURE_URL || 'http://127.0.0.1:4174';
const out = path.resolve('launch/exports');
await mkdir(path.join(out, 'raw'), { recursive: true });
await mkdir('docs/images', { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  args: ['--enable-unsafe-swiftshader'],
});
const wait = (page, ms) => page.waitForTimeout(ms);
async function scrollTo(page, selector, offset = 120) {
  const y = await page.locator(selector).first().evaluate((node, top) => node.getBoundingClientRect().top + window.scrollY - top, offset);
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'smooth' }), y);
  await wait(page, 1600);
}
const scenes = [];
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await wait(page, 3500);
  await expect(page.locator('h1')).toContainText('Aizaz');
  await page.screenshot({ path: 'docs/images/portfolio-desktop.png' });
  await page.screenshot({ path: path.join(out, 'desktop-hero.png') });
  await scrollTo(page, '.project-novaworks');
  await expect(page.locator('.project-novaworks .preview-image')).toBeVisible();
  await page.screenshot({ path: path.join(out, 'project-desktop.png') });
  await scrollTo(page, '.about-layout');
  const portrait = page.locator('.portrait-photo');
  const box = await portrait.boundingBox();
  await page.mouse.move(box.x + box.width * .5, box.y + box.height * .35);
  await wait(page, 600);
  await page.screenshot({ path: path.join(out, 'portrait-desktop.png') });
  await context.close();

  // Capture the real startup handoff without slowing the application request.
  const introContext = await browser.newContext({ viewport: { width: 1440, height: 1000 }, recordVideo: { dir: path.join(out, 'raw'), size: { width: 1440, height: 1000 } } });
  const introPage = await introContext.newPage();
  await introPage.route('**/Background3D-*.js', route => route.abort());
  const introStart = Date.now();
  await introPage.goto(base, { waitUntil: 'commit' });
  await expect(introPage.locator('#startup-screen')).toBeVisible();
  await expect(introPage.locator('#startup-screen')).toHaveCount(0);
  await wait(introPage, 800);
  const introDuration = (Date.now() - introStart) / 1000;
  const introVideo = introPage.video();
  await introContext.close();
  scenes.push({ id: 'startup', file: path.relative(out, await introVideo.path()).replaceAll('\\', '/'), duration: introDuration });

  // Separate contexts keep load/setup frames out of the final demo.
  for (const scene of [
    { id: 'hero', selector: '#home', duration: 4500 },
    { id: 'projects', selector: '.project-novaworks', duration: 1800 },
    { id: 'portrait', selector: '.about-layout', duration: 800 },
  ]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, recordVideo: { dir: path.join(out, 'raw'), size: { width: 1440, height: 1000 } } });
    const tab = await ctx.newPage();
    if (scene.id !== 'hero') await tab.route('**/Background3D-*.js', (route) => route.abort());
    await tab.goto(base, { waitUntil: 'domcontentloaded' });
    await wait(tab, 3000);
    if (scene.id !== 'hero') await scrollTo(tab, scene.selector);
    const start = Date.now();
    await wait(tab, scene.duration);
    if (scene.id === 'projects') {
      await tab.getByRole('button', { name: 'Project details', exact: true }).click();
      await wait(tab, 1600);
      await tab.getByRole('button', { name: 'Enlarge NovaWorks Project details screenshot' }).click();
      await expect(tab.locator('.preview-dialog')).toBeVisible();
      await wait(tab, 2300);
      await tab.getByRole('button', { name: 'Close project screenshot' }).click();
      await wait(tab, 700);
    }
    if (scene.id === 'portrait') {
      const bounds = await tab.locator('.portrait-photo').boundingBox();
      for (const [x, y] of [[.25,.28],[.55,.3],[.7,.5],[.45,.65],[.25,.45]]) {
        await tab.mouse.move(bounds.x + bounds.width*x, bounds.y + bounds.height*y, { steps: 18 });
        await wait(tab, 550);
      }
      await expect(tab.locator('.portrait-photo')).toHaveAttribute('data-revealing', 'true');
      await tab.mouse.move(1350, 850, { steps: 15 });
      await wait(tab, 800);
    }
    const duration = (Date.now() - start)/1000;
    const video = tab.video();
    await ctx.close();
    const videoPath = await video.path();
    scenes.push({ id: scene.id, file: path.relative(out, videoPath).replaceAll('\\','/'), duration });
    await writeFile(path.join(out,'capture-manifest.json'),JSON.stringify({base,scenes},null,2));
    console.log('Captured', scene.id, duration.toFixed(1), 'seconds');
  }
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, recordVideo: { dir: path.join(out,'raw'), size: { width: 390, height: 844 } } });
  const tab = await mobile.newPage();
  await tab.goto(base, { waitUntil: 'networkidle' });
  await wait(tab, 2500);
  await tab.screenshot({ path: 'docs/images/portfolio-mobile.png' });
  await tab.screenshot({ path: path.join(out,'mobile-hero.png') });
  const start = Date.now();
  await wait(tab, 1500);
  await tab.getByRole('button', { name: 'Menu', exact: true }).click();
  await wait(tab, 1000);
  await tab.locator('.ios-mobile-links').getByRole('link', { name: 'Work', exact: true }).click();
  await wait(tab, 1800);
  await tab.screenshot({ path: path.join(out,'mobile-work.png') });
  await expect(tab.locator('.footer-wordmark')).toHaveText("LET'S BUILD");
  const noOverflow = await tab.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
  if (!noOverflow) throw new Error('Mobile horizontal overflow');
  await wait(tab, 1200);
  const video = tab.video();
  const duration = (Date.now()-start)/1000;
  await mobile.close();
  scenes.push({ id:'mobile',file:path.relative(out,await video.path()).replaceAll('\\','/'),duration });
  await writeFile(path.join(out,'capture-manifest.json'),JSON.stringify({capturedAt:new Date().toISOString(),base,desktop:{width:1440,height:1000},mobile:{width:390,height:844},pageErrors:errors,scenes},null,2));
  console.log('Capture complete. Desktop page errors:',errors.length);
} finally { await browser.close(); }

import { test, expect } from '@playwright/test';
const order = ['home','about','work','experience','techstack','certifications','contact'];
for (const width of [320,390,768,1440]) {
  test(`logo handoff and story navigation at ${width}px`, async ({page}) => {
    await page.setViewportSize({width,height:900});
    let release;
    const gate = new Promise(resolve => { release = resolve; });
    await page.route('**/src/main.jsx', async route => { await gate; await route.continue(); });
    await page.goto('/', {waitUntil:'commit'});
    const loader = page.locator('#startup-screen');
    await expect(loader).toBeVisible();
    await expect(page.locator('#root')).toHaveCSS('visibility','hidden');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width === 320 || width === 1440) await page.screenshot({path:`audit/ios-startup-${width}.png`});
    release();
    await expect(loader).toHaveCount(0, {timeout:5000});
    await expect(page.locator('#root')).toHaveCSS('visibility','visible');
    // The startup fail-safe can dismiss the loader before the app mounts.
    await expect(page.locator('#main-content > section')).toHaveCount(order.length);
    expect(await page.locator('#main-content > section').evaluateAll(nodes => nodes.map(node => node.id))).toEqual(order);
    const nav = width < 1024 ? '.ios-mobile-links' : '.ios-desktop-links';
    expect(await page.locator(`${nav} a`).evaluateAll(nodes => nodes.map(node => node.hash.slice(1)))).toEqual(order);
    await expect(page.locator('.hero-scroll-cue')).toHaveAttribute('href','#about');
    await expect(page.locator('.story-next')).toHaveAttribute('href','#work');
  });
}
test('startup failure releases readable fallback instead of trapping visitors', async ({page}) => {
  await page.route('**/src/main.jsx', route => route.abort());
  await page.goto('/');
  await expect(page.locator('#startup-screen')).toHaveCount(0, {timeout:5000});
  await expect(page.locator('#root > header h1')).toBeVisible();
  await expect(page.locator('html')).not.toHaveClass(/is-boot/);
  await expect(page.getByRole('link',{name:'View resume (PDF)'})).toBeVisible();
});
test('font failure and reduced motion preserve direct section links', async ({page}) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.route('**/*.woff2',route=>route.abort());
  await page.goto('/?ref=launch#work');
  await expect(page.locator('#startup-screen')).toHaveCount(0);
  await expect(page.locator('#work h2')).toBeInViewport();
  await expect(page).toHaveURL(/ref=launch#work$/);
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect(page.getByRole('button',{name:'Resume',exact:true})).toBeEnabled();
});
test('Save-Data desktop keeps CSS motion without fetching WebGL', async ({page}) => {
  await page.setViewportSize({width:1440,height:900});
  await page.addInitScript(() => Object.defineProperty(navigator,'connection',{value:{saveData:true,effectiveType:'4g',addEventListener(){},removeEventListener(){}}}));
  const graphics=[];
  page.on('request',req=>{if(req.url().includes('Background3D')) graphics.push(req.url());});
  await page.goto('/');
  await expect(page.locator('#startup-screen')).toHaveCount(0);
  await page.waitForTimeout(2300);
  expect(graphics).toEqual([]);
  await expect(page.locator('canvas')).toHaveCount(0);
  await expect(page.locator('.sculpture-band')).toHaveCount(3);
  await expect(page.locator('.portfolio-shell')).toHaveAttribute('data-motion','running');
});

test('a direct About link avoids downloading the offscreen desktop sculpture', async ({page}) => {
  await page.setViewportSize({width:1440,height:900});
  const graphics=[];
  page.on('request',req=>{if(req.url().includes('Background3D')) graphics.push(req.url());});
  await page.goto('/#about');
  await expect(page.locator('#startup-screen')).toHaveCount(0);
  await expect(page.locator('#about h2')).toBeInViewport();
  await page.waitForTimeout(2300);
  expect(graphics).toEqual([]);
});
test('saved animation pause also keeps the startup monogram still', async ({page}) => {
  await page.addInitScript(()=>localStorage.setItem('portfolio-motion-paused','true'));
  let release;
  const gate = new Promise(resolve=>{release=resolve;});
  await page.route('**/src/main.jsx',async route=>{await gate;await route.continue();});
  await page.goto('/',{waitUntil:'commit'});
  await expect(page.locator('#startup-screen')).toBeVisible();
  await expect(page.locator('.startup-monogram span').first()).toHaveCSS('animation-name','none');
  await expect(page.locator('html')).toHaveClass(/startup-static/);
  release();
  await expect(page.locator('#startup-screen')).toHaveCount(0);
  await expect(page.locator('.portfolio-shell')).toHaveAttribute('data-motion','paused');
});

import {test,expect} from '@playwright/test';
test.use({reducedMotion:'reduce'});

test('legacy language preferences and links render English without a switch',async({page})=>{
 await page.addInitScript(()=>localStorage.setItem('portfolio-language','ur'));
 const fonts=[];page.on('request',request=>{if(request.url().includes('/fonts/'))fonts.push(request.url());});
 await page.goto('/?lang=ur&ref=shared#work');
 await expect(page.locator('html')).toHaveAttribute('lang','en');
 await expect(page.locator('html')).toHaveAttribute('dir','ltr');
 await expect(page.locator('.language-toggle')).toHaveCount(0);
 await expect(page.locator('#work h2')).toHaveText('Selected projects.');
 await expect(page).toHaveURL(/ref=shared#work$/);
 await page.evaluate(()=>document.fonts.ready);
 expect(fonts.some(url=>/noto|nastaliq/i.test(url))).toBe(false);
 await expect(page.locator('.hero-name')).toHaveCSS('font-family',/Instrument Serif/);
 await expect(page.locator('body')).toHaveCSS('font-family',/Manrope/);
 await page.getByRole('button',{name:'Send Message',exact:true}).click();
 await expect(page.locator('#name-error')).toHaveText('Enter your name.');
});

for(const width of [320,390,768,1440])test(`resume is accessible only from the hero at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:800});await page.goto('/');
 await expect(page.locator('nav a[href="/resume.pdf"], #about a[href="/resume.pdf"]')).toHaveCount(0);
 await expect(page.getByRole('button',{name:/View r.sum./})).toHaveCount(1);
 const resume=page.locator('#home').getByRole('button',{name:/View r.sum./});
 if(width<1024){
  const menu=page.getByRole('button',{name:'Menu',exact:true});await menu.click();
  await expect(page.locator('#navigation-links a[href="/resume.pdf"]')).toHaveCount(0);
  await expect(page.locator('.ios-menu-socials').getByRole('link',{name:'GitHub profile'})).toBeVisible();
  await page.keyboard.press('Escape');await expect(menu).toBeFocused();
 }
 await resume.click();const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();
 await expect(dialog.getByRole('link',{name:'Download PDF'})).toHaveAttribute('href','/resume.pdf');
 await page.keyboard.press('Escape');await expect(resume).toBeFocused();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

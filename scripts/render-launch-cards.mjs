import {chromium} from '@playwright/test';
import {readFile} from 'node:fs/promises';
const out='launch/exports';
const image=async name=>'data:image/png;base64,'+(await readFile(`${out}/${name}.png`)).toString('base64');
const font=async name=>'data:font/woff2;base64,'+(await readFile(`public/fonts/${name}.woff2`)).toString('base64');
const manrope=await font('manrope-latin'),serif=await font('instrument-serif-regular');
const browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH||undefined});
const page=await browser.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:1});
const styles=`@font-face{font-family:Manrope;src:url(${manrope})}@font-face{font-family:Instrument;src:url(${serif})}*{box-sizing:border-box}body{margin:0;background:#0a0e18;color:#eff2fa;font-family:Manrope}main{width:1080px;height:1350px;position:relative;padding:72px 64px;background:radial-gradient(ellipse at 95% 0%,#242747 0,transparent 48%),#0a0e18;overflow:hidden}.top{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #383c50;padding-bottom:24px;font-size:20px;letter-spacing:2px;color:#bcc3d5}.brand{font-size:42px;font-weight:700;letter-spacing:-3px;color:#eee}h1{font-family:Instrument;font-weight:400;font-size:90px;line-height:1;margin:32px 0 18px;letter-spacing:-2px}h1 em{color:#a9a7ff;font-weight:400}.sub{font-size:25px;line-height:1.5;color:#bdc6d9;margin:0;max-width:910px}.shot{width:100%;border:1px solid #4c526b;border-radius:16px;display:block;box-shadow:0 20px 60px #0008}.screen{position:absolute;left:36px;top:475px;width:1008px}.bottom{position:absolute;bottom:62px;left:64px;right:64px;border-top:1px solid #383c50;padding-top:22px;color:#bcc3d5;font-size:20px;display:flex;justify-content:space-between}.note{margin:0;position:absolute;left:64px;right:64px;top:1195px;font-size:20px;color:#bdc6d9}.mobile{position:absolute;top:475px;width:320px;height:auto;border:1px solid #545b74;border-radius:22px}.big{font-size:136px}.outro{margin-top:135px}.url{font-size:32px;color:#c1bfff;margin-top:55px}.tags{font-size:23px;color:#a6aec3;letter-spacing:1px;margin-top:32px}`;
async function render(file,body){await page.setContent(`<style>${styles}</style><main><div class="top"><span class="brand">an.</span><span>PORTFOLIO / AIZAZ NOOR</span></div>${body}<div class="bottom"><span>Student & freelance developer</span><span>Lahore, Pakistan</span></div></main>`);await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`${out}/${file}.png`});}
const hero=await image('desktop-hero'),projects=await image('project-desktop'),portrait=await image('portrait-desktop');
await render('01-cover',`<h1>My work.<br><em>A new perspective.</em></h1><p class="sub">Web applications, developer tools, and the details behind them.</p><div class="screen"><img class="shot" src="${hero}"></div><p class="note">React / Vite / CSS / Three.js</p>`);
await render('02-projects',`<h1>Projects with<br><em>the story behind them.</em></h1><p class="sub">The problem. The approach. The result. Actual interface captures.</p><div class="screen"><img class="shot" src="${projects}"></div><p class="note">NovaWorks / Built with Code Nomads. My role is documented.</p>`);
await render('03-portrait',`<h1>A little motion.<br><em>A personal detail.</em></h1><p class="sub">Move your pointer. Color follows. A static color photo on touch.</p><div class="screen"><img class="shot" src="${portrait}"></div><p class="note">Reduced-motion support and a persistent animation pause control.</p>`);
const mobileHero=await image('mobile-hero'),mobileWork=await image('mobile-work');
await render('04-mobile',`<h1>Made for<br><em>smaller screens.</em></h1><p class="sub">Compact navigation. Lighter CSS graphics. Real project previews.</p><img class="mobile" style="left:160px" src="${mobileHero}"><img class="mobile" style="right:160px" src="${mobileWork}">`);
for(const [id,title,sub,note] of [
['hero','Meet my<br><em>portfolio.</em>','Web applications & developer tools.','Desktop motion / 3D sculpture and orbiting technology icons.'],
['projects','Explore the<br><em>actual work.</em>','Project context, source links, and interface previews.','NovaWorks / Code Nomads team project. Fictional demo data.'],
['portrait','Color follows<br><em>your cursor.</em>','A personal detail in the About section.','Pointer-driven reveal / Static color fallback on touch.'],
['mobile','A smaller screen.<br><em>The same story.</em>','Responsive content and compact navigation.','Mobile uses CSS graphics instead of desktop WebGL.']]){
 await render(`video-${id}`,`<h1 style="font-size:94px;margin-top:32px">${title}</h1><p class="sub">${sub}</p><p class="note">${note}</p>`);
}
await render('video-outro',`<h1 class="big outro">Built to share.<br><em>Open to feedback.</em></h1><p class="sub">Explore the projects. Try the interactions.<br>Tell me what you would improve.</p><p class="url">aizaznoorkhuwaja.vercel.app</p><p class="tags">React / Vite / CSS / Three.js</p>`);
await browser.close();
console.log('Exported four image cards and video backgrounds.');



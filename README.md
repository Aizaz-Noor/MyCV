# Aizaz Noor portfolio

The source for [aizaznoorkhuwaja.vercel.app](https://aizaznoorkhuwaja.vercel.app/). This is a static React 19 and Vite portfolio for a software engineering student and freelance developer. It presents selected projects, experience, skills, credentials, and contact options.

The page works without WebGL. The default hero is a lightweight orbital illustration. Eligible desktop visitors can explicitly enable a contained Three.js enhancement; it loads only after that interaction and pauses offscreen. Mobile and reduced-motion visitors see the static background. The HTML contains a readable no-JavaScript fallback with project and contact links.

## Run locally

Requires Node.js `^20.19.0 || >=22.12.0` and npm.

```powershell
git clone https://github.com/Aizaz-Noor/MyCV.git
cd MyCV
npm ci
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). On Windows PowerShell installations that block `npm.ps1`, use `npm.cmd` for the commands above.

## Checks

```powershell
npm run lint
npm test
npm run build
npm audit
```

`npm run preview` serves the production build for a local check. The audit and remediation notes are in [`audit/portfolio-audit.md`](audit/portfolio-audit.md) and [`audit/remediation.md`](audit/remediation.md). The original audit evidence is stored in the same folder.

## Architecture and integrations

- `src/pages/` contains the portfolio sections. `src/components/` contains shared presentation and effects. `src/services/` holds contact delivery and validation. `src/data/projects.js` contains verified project content.
- Navigation uses ordinary section links. The résumé viewer uses a native modal dialog; `/resume.pdf` remains downloadable directly.
- The contact form submits through [Web3Forms](https://docs.web3forms.com/getting-started/api-reference). Its browser access key may be supplied with `VITE_WEB3FORMS_ACCESS_KEY`. The form also includes the current public fallback key. Browser keys are public; configure provider-side restrictions and abuse controls in the provider dashboard. Do not place server secrets in `VITE_` variables.
- Project content is curated in `src/data/projects.js` from verified GitHub READMEs. No live GitHub or contribution-chart requests are required to render the page.
- `public/projects/` contains optimized WebP screenshots from the LifeFlow repository. See `audit/visual-upgrade.md` for provenance and design decisions.
- The site is deployed as static files on Vercel. Vercel project settings and the contact recipient account are managed outside this repository.

## Manual verification

After a deployment, check the homepage at 1440, 768, 390, and 320 CSS-pixel widths. Tab through navigation, screenshot preview buttons, project links, credentials, and the résumé dialog. Test Escape and focus restoration. Repeat with reduced motion enabled, JavaScript disabled, and a blocked graphics request. Mock contact success, error, and timeout before sending any real message. Check the form and long email address at 200% text zoom.

Project performance claims and public biography text should be backed by examples or verified records before publication. This repository does not currently declare a software license.


## Browser regression checks

```powershell
npx playwright install chromium
npm run test:browser
```

The suite starts its own local server on port 4173 and tests responsive layouts, keyboard navigation, résumé focus, project previews, contact success/failure with intercepted requests, no-JavaScript content, blocked 3D loading, and desktop/mobile accessibility. On Windows, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an installed Chrome executable to use it instead. Generated reports are in `playwright-report/`; traces are retained for failures.

See [`audit/visual-upgrade.md`](audit/visual-upgrade.md) for the redesign plan, project sources, motion/performance decisions, and verification scope.

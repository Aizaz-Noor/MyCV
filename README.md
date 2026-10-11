# Aizaz Noor portfolio

The source for [aizaznoorkhuwaja.vercel.app](https://aizaznoorkhuwaja.vercel.app/). This is a static React 19 and Vite portfolio for a software engineering student and freelance developer. It presents selected projects, experience, skills, credentials, and contact options.

The hero automatically animates a 3D sculpture on eligible desktop devices after idle time. Mobile visitors get animated CSS graphics instead. Orbiting brand icons, floating code panels, a technology ribbon, scroll reveals, and pointer tilt provide ongoing motion. A persistent pause control and the operating system's reduced-motion preference stop animations. Graphics pause offscreen and in hidden tabs; content remains usable if WebGL fails. The HTML also contains a readable no-JavaScript fallback with project and contact links.

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
- Project content is curated in `src/data/projects.js` from verified GitHub READMEs. The optional contribution calendar below About fetches public GitHub activity when nearby; project content and the rest of the page render independently.
- `public/projects/` contains verified NovaWorks screenshots and a real Tandem dashboard capture. See `audit/project-image-provenance.json` and `audit/ios-integration.md` for sources and capture details.
- The site is deployed as static files on Vercel. Vercel project settings and the contact recipient account are managed outside this repository.

## Manual verification

After a deployment, check the homepage at 1440, 768, 390, and 320 CSS-pixel widths. Tab through navigation, screenshot preview buttons, project links, credentials, and the résumé dialog. Test Escape and focus restoration. Repeat with reduced motion enabled, JavaScript disabled, and a blocked graphics request. Mock contact success, error, and timeout before sending any real message. Check the form and long email address at 200% text zoom.

Project performance claims and public biography text should be backed by examples or verified records before publication. This repository does not currently declare a software license.

## Browser regression checks

```powershell
npx playwright install chromium
npm run test:browser
```

The suite starts its own local server on port 4173 and tests responsive layouts, keyboard navigation, résumé focus, project previews, contact success/failure with intercepted requests, no-JavaScript content, automatic 3D failure recovery, ongoing motion, pause persistence, offscreen suspension, and desktop/mobile accessibility. On Windows, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an installed Chrome executable to use it instead. Generated reports are in `playwright-report/`; traces are retained for failures.

See [`audit/visual-upgrade.md`](audit/visual-upgrade.md) for the redesign plan, project sources, motion/performance decisions, and verification scope.

See [`audit/motion-upgrade.md`](audit/motion-upgrade.md) for the current motion implementation and validation.

## Apple/iOS component integration

The floating glass desktop navbar and mobile context menu recover the original design from `d67c57f`. Shared materials live in `src/ios-theme.css` and apply to project previews, experience, toolkit, credentials and contact. NovaWorks and Tandem use actual screenshots with accessible full-size previews. See [`audit/ios-integration.md`](audit/ios-integration.md) for the implementation plan, code examples, validation scope and further recommendations.

See [`audit/section-refinements.md`](audit/section-refinements.md) for the experience timeline, portrait, project-preview, and GitHub contribution updates.

## English-only interface

The portfolio is English-only. Resume access is available in the hero, including its PDF viewer and download. Old language query parameters and saved preferences do not change the interface. See [`audit/english-only.md`](audit/english-only.md) for removal details and verification.

## Typography

English display headings use **Instrument Serif**, paired with **Manrope** for body text and controls, following the public typography styles on princepal.in. All faces are self-hosted with their SIL Open Font Licenses. See [`audit/typography-upgrade.md`](audit/typography-upgrade.md) for font analysis and verification, and [`public/fonts/README.md`](public/fonts/README.md) for sources and checksums.

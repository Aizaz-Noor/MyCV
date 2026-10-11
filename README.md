# Aizaz Noor — portfolio

A portfolio for a software engineering student and freelance developer based in Lahore, Pakistan. Explore web applications, desktop software, and the decisions behind them.

**[Live portfolio](https://aizaznoorkhuwaja.vercel.app/)** · **[GitHub](https://github.com/Aizaz-Noor)** · **[LinkedIn](https://www.linkedin.com/in/aizaz-noor/)**

![Desktop portfolio with glass navigation, editorial typography, and an animated 3D hero](docs/images/portfolio-desktop.png)

## Explore

- **Project stories:** the problem, approach, outcome, and relevant source/demo links. NovaWorks credits Code Nomads and describes Aizaz's role. Tandem's multi-adapter speed gains remain unverified.
- **Actual interface previews:** selectable screenshots and full-size dialogs with keyboard dismissal and focus restoration.
- **Motion with controls:** deferred desktop 3D, lighter mobile CSS graphics, orbiting icons, a technology ribbon, and scroll reveals. Persistent pause and reduced-motion support let visitors choose their experience.
- **Portrait reveal:** color follows the desktop pointer over a grayscale photo. Touch, reduced-motion, paused-animation, and unsupported-mask conditions receive a static color portrait.
- **Background and skills:** biography, experience, toolkit, credentials, and a public contribution calendar loaded when nearby.
- **Contact and résumé:** validated Web3Forms delivery; English résumé preview and download in the hero.

<details>
<summary>Mobile preview</summary>

<img src="docs/images/portfolio-mobile.png" width="390" alt="Mobile portfolio with compact navigation and the Aizaz Noor hero" />

</details>

## Technology

| Area | Implementation |
| --- | --- |
| Application | React 19, JavaScript, Vite 8 |
| Styling and motion | CSS, Web Animations API, requestAnimationFrame |
| Desktop graphics | Three.js, React Three Fiber, Drei; dynamically imported |
| Icons and fonts | React Icons; self-hosted Manrope and Instrument Serif |
| Integrations | Web3Forms; public GitHub activity service |
| Verification | Node test runner, Playwright, axe-core, ESLint |
| Delivery | GitHub Actions and static Vercel deployment |

## Run locally

Requires Node.js `^20.19.0 || >=22.12.0` and npm.

```sh
git clone https://github.com/Aizaz-Noor/MyCV.git
cd MyCV
npm ci
npm run dev
```

Open Vite's printed URL, normally `http://localhost:5173`. If PowerShell blocks `npm.ps1`, use `npm.cmd`.

The contact form accepts `VITE_WEB3FORMS_ACCESS_KEY` and retains its existing public fallback key. Browser keys are public; configure domain restrictions and abuse controls in Web3Forms. Never place server secrets in `VITE_` variables. The recipient account is managed outside this repository.

## Checks and preview

```sh
npm run lint
npm test
npm run build
npm audit
npx playwright install chromium
npm run test:browser
npm run preview
```

The browser suite starts a server on port 4173. It covers 320, 390, 768, and 1440px layouts; keyboard navigation; project previews and résumé focus; mocked contact responses; no-JavaScript content; graphics failure recovery; motion pause persistence; offscreen suspension; portrait interactions/fallbacks; and desktop/mobile accessibility scans.

For installed Windows Chrome:

```powershell
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
npm.cmd run test:browser
```

Chromium emulation and automated accessibility scans do not establish native Safari performance or complete WCAG conformance. Also check a physical phone, keyboard navigation, 200% text zoom, reduced motion, high contrast, and dialog focus. Mock contact requests during tests instead of sending real messages.

## Source and customization

| Location | Purpose |
| --- | --- |
| `src/pages/` | Portfolio sections and biography |
| `src/components/` | Navigation, dialogs, graphics, shared presentation |
| `src/hooks/` | Motion preferences and optional graphics |
| `src/services/` | Contact validation/delivery and GitHub activity |
| `src/data/projects.js` | Curated project content, links, image dimensions, attribution |
| `public/projects/` | Actual product interface captures |
| `public/fonts/` | Self-hosted fonts, provenance, and licenses |
| `scripts/` and `launch/` | Reproducible launch media and LinkedIn copy |

Keep screenshots, links, claims, and contributor attribution in sync when editing content.

## Accessibility and performance

Content works independently of optional graphics. Mobile and reduced-motion visitors skip desktop WebGL. Graphics pause offscreen and in hidden tabs. The HTML contains an English no-JavaScript fallback; preview images are lazy-loaded; fonts use `font-display: swap`. The portrait avoids React updates on every pointer move.

The desktop 3D chunk still produces Vite's size warning. Follow-up work includes physical-device scroll profiling, mobile blur tuning, adaptive desktop graphics quality, deferred contribution-table rows, and benchmarking responsive image formats. No Lighthouse score or real-user Core Web Vitals result is claimed. See the [performance follow-up](audit/mobile-footer-performance.md).

The interface is English-only. Old language preferences do not change it. Résumé access stays in the hero rather than the navbar/menu.

## Deployment

Pushing `main` runs [GitHub Actions checks](.github/workflows/checks.yml) and triggers the connected Vercel deployment. Confirm CI and production deployment separately, then check the public URL. Vercel and contact-provider accounts are configured outside this repository.

## Documentation

- [LinkedIn launch package](launch/README.md) and [caption options](launch/linkedin-captions.md)
- [Original audit](audit/portfolio-audit.md) and [remediation](audit/remediation.md)
- [Motion implementation](audit/motion-upgrade.md) and [portrait reveal](audit/portrait-reveal.md)
- [Screenshot provenance](audit/project-image-provenance.json)
- [Section refinements](audit/section-refinements.md) and [glass components](audit/ios-integration.md)
- [Font provenance](public/fonts/README.md)

Launch media captures a specific build; the live site may evolve after publication. Large generated exports stay out of Git. The launch guide explains regeneration.

## Attribution and license

NovaWorks is a Code Nomads team project; this portfolio describes Aizaz's contribution rather than claiming sole authorship. Project screenshots retain their actual interface data and context. Manrope and Instrument Serif include SIL Open Font Licenses in `public/fonts/`; icons and dependencies retain their respective licenses.

This repository does not currently declare a software license. Do not assume it is MIT-licensed.

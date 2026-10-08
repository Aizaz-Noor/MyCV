# Portfolio visual upgrade — 8 October 2026

## Result and priorities

The portfolio now uses an editorial dark layout with a single lavender accent, large Outfit display typography, real project imagery, and a project-first reading order. The React/Vite stack, native anchor navigation, contact delivery, résumé download, and no-JavaScript fallback remain supported.

| Priority | Upgrade | Estimated effort | Implementation |
| --- | --- | --- | --- |
| P1 | Verify and curate project content | 1–2 days | Six GitHub projects reviewed; LifeFlow and Tandem featured with problem, approach, and result notes. |
| P1 | Visual foundation and hero | 1–2 days | Shared palette/type/spacing tokens; asymmetric hero, orbital artwork, restrained navigation, clear work and résumé actions. |
| P1 | Project presentation | 1–2 days | Sticky desktop previews; switchable genuine LifeFlow screenshots; labeled Tandem architecture; compact secondary projects. |
| P2 | Secondary sections | 1–2 days | Editorial experience rows, portrait/about section, visible grouped toolkit, accessible credential list, concise contact and footer. |
| P2 | Motion and interaction | 1–2 days | Staggered hero entrance, one-time scroll reveals, screenshot crossfade, pointer-gated artwork response, press feedback, explicit optional 3D. |
| P1 | Verification and regression coverage | 1–2 days | Responsive browser checks, keyboard/dialog checks, form provider mocks, no-JavaScript and blocked-WebGL tests, automated accessibility; CI extended. |

Estimates are planning ranges, not a claim about elapsed implementation time.

## Visual and interaction decisions

- The sequence is hero → selected work → experience/education → about → toolkit → credentials → contact. Profiles are integrated into About and the hero rather than repeated as another large section. The old `#profiles` link remains a valid About-section anchor.
- Use `src/index.css` for shared tokens, responsive breakpoints, focus states, and motion. Outfit provides the display voice; Inter remains the reading font. Main content is limited to 1,240 px with 20 px mobile gutters.
- Real screenshot preview buttons expose their selected state with `aria-pressed`. Links and required content remain visible; project descriptions are never hidden behind hover or a flip.
- Motion uses CSS and the Web Animations API, avoiding a new production animation dependency. Transforms and opacity carry movement. IntersectionObserver fires reveals once; cancellation and cleanup are explicit. Content is visible if an animation cannot run.
- Native scrolling and native anchor/hash behavior remain intact. Project imagery sticks only on desktop; reduced-motion mode uses the static layout. There is no scroll hijacking or automatic typewriter.
- Default artwork is lightweight CSS. 3D is contained in the hero and dynamically imported only after an eligible desktop visitor enables it. Mobile/reduced-motion visitors do not mount it. Rendering pauses offscreen or while the document is hidden. A failed enhancement leaves the CSS illustration and all content usable.
- The footer wordmark was brightened after an automated scan detected insufficient contrast. Automated checks complement, rather than establish, complete WCAG conformance.
- Cursor replacement, magnetic buttons, card tilts/flips, live GitHub statistics, and the external contribution chart were replaced. Their obsolete modules and the unused icon dependency were removed.

## Verified project content and assets

`src/data/projects.js` is the single source for featured and secondary project text. `audit/project-sources.json` records checked GitHub repository revisions.

| Project | Source | Portfolio treatment |
| --- | --- | --- |
| LifeFlow | https://github.com/Aizaz-Noor/LifeFlow-BloodBank-Frontend | Academic frontend demo; never presented as a live clinical service. |
| Tandem | https://github.com/Aizaz-Noor/Tandem | Windows desktop app; local mode dispatches separate connections; multi-adapter speed gains are explicitly unverified. |
| Weekly Habit Tracker | https://github.com/Aizaz-Noor/habit-tracker | React/TypeScript/plain CSS/localStorage, correcting the outdated Tailwind description. |
| ANK-CINEMA | https://github.com/Aizaz-Noor/ANK-CINEMA | Parallel terminal search and aria2c integration. |
| Newton's Glitch | https://github.com/Aizaz-Noor/Newtons-Glitch | Adaptive JavaFX gameplay/particles/weather/audio, correcting the prior unsupported gravity-flip description. |
| Hostel Kharcha Manager | https://github.com/Aizaz-Noor/Hostel-Kharcha-Manager | Shared-expense CLI, custom data structures, file persistence. |

LifeFlow imagery is copied from the user's repository at revision `ea793c4a9735be21e1581acc6fb7bf0a4bb4a9da`:

- `public/screenshots/11_dashboard.png` → `public/projects/lifeflow-dashboard.webp` (49,072 bytes).
- `public/screenshots/01_homepage_hero.png` → `public/projects/lifeflow-home.webp` (59,622 bytes).

Images were resized to 1,440 px width and encoded as WebP at quality 84. Both are genuine screenshots. The Tandem graphic is explicitly labeled an architecture illustration; no fabricated UI or outcome metrics are used. Existing portrait and credential PDFs are retained.

## Repeatable verification

```powershell
npm.cmd ci
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd audit --audit-level=low
npx.cmd playwright install chromium
npm.cmd run test:browser
git diff --check
```

To use an installed Chrome on Windows instead of downloading Playwright's Chromium:

```powershell
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
npm.cmd run test:browser
```

`playwright.config.js` starts an isolated local Vite server on port 4173. `e2e/portfolio.spec.js` covers 320/390/768/1440 px layouts, loaded imagery, overflow, reduced motion, mobile Escape/navigation, résumé Escape/focus return, screenshot switching, field validation, mocked provider success/failure, no-JavaScript content, default/no-WebGL rendering, blocked graphics imports, and axe checks on desktop/mobile. Provider requests are intercepted; browser QA does not deliver real messages.

GitHub Actions runs lint, service tests, production build, dependency audit, and the browser suite with installed Chromium. Browser traces/reports and review screenshots are generated artifacts ignored by Git.

## Performance and limits

The production build has approximately 229 KB initial JavaScript (71 KB gzip) and 25 KB CSS (6 KB gzip), compared with the previous approximately 281 KB JavaScript (89 KB gzip) and 49 KB CSS (10 KB gzip). These are emitted bundle sizes, not measured Core Web Vitals.

The optional graphics chunk is still about 884 KB minified / 235 KB gzip and triggers Vite's chunk-size warning. It is not fetched for the default visit. No Lighthouse score, conversion improvement, universal assistive-technology conformance, or live contact delivery is claimed. Device/GPU performance still varies; the static default is the complete experience.

## Final local results

- ESLint: passed.
- Contact service tests: 4/4 passed, including validation, explicit provider success, and timeout abort.
- Playwright: 8/8 passed. Responsive checks at 320, 390, 768, and 1440 px had no runtime errors, unloaded images, or horizontal overflow.
- Axe: zero detected violations for the selected WCAG 2 A/AA, 2.1 AA, and 2.2 AA rules on 390 px and 1440 px layouts after correcting footer contrast.
- Production build: passed; initial JS 228.37 KB / 70.63 KB gzip, CSS 25.02 KB / 6.22 KB gzip. Optional 3D 884.33 KB / 235.27 KB gzip retains its size warning.
- Dependency audit: zero vulnerabilities.
- `git diff --check`: passed.
- Optional 3D: a 568 × 568 canvas successfully initialized WebGL2 in local Chrome using its software rendering backend. Device performance is not inferred from that check.
- Review captures: `audit/redesign-hero.png`, `audit/redesign-mobile-hero.png`, `audit/redesign-projects.png`, and `audit/redesign-1440.png`. These are local, generated review artifacts.

# Portfolio design cleanup

## Scope and priorities

Reviewed all application components, pages, hooks, contact service, project data, and both stylesheets. This audit identifies concrete maintenance and presentation problems; it cannot determine whether a particular line was written by AI. Preserve the requested glass material, prominent animated sculpture, real technology icons, and genuine project imagery.

| Priority | Finding and location | Implemented remedy | Estimated effort |
| --- | --- | --- | --- |
| P1 | Navbar brand differs from the requested earlier identity (`Navbar.jsx`, `ios-theme.css`) | Restore the `an.` monogram with Aizaz Noor / Developer / Lahore. Change only brand markup and brand-specific styling. | 20 minutes |
| P1 | Unwanted hero role badge (`Hero.jsx`) | Remove badge and retain Lahore location. Student/freelance biography remains in About. | 10 minutes |
| P1 | Visible sections replay entrance animations after motion resumes (`Reveal.jsx`) | Track whether each entrance has already started; cancel safely on pause, preserve readable content, and do not replay it. | 30 minutes |
| P2 | Obsolete CSS from retired nav, static orbital graphic, and network diagram (`index.css`) | Remove 87 retired selector branches across both stylesheets and two unreferenced keyframes. Preserve dynamic project classes and responsive orbital keyframes. | 45 minutes |
| P2 | Repeated static inline styles and style-attribute responsive selectors (`Contact.jsx`, `index.css`) | Introduce named layout, label, field, spinner, and provider-error classes; remove attribute-selector and `!important` layout workarounds. Preserve submission and validation behavior. | 45 minutes |
| P2 | Repeated slogans and decorative fake developer object (`Hero.jsx`, section headings, footer) | Use actual NovaWorks and Tandem context, direct section titles, and factual descriptions. Remove the infinity caption and crosshair ornament. | 30 minutes |
| P2 | Gradient name and button compete with the sculpture (`index.css`) | Use one solid accent for the name and main CTA. Preserve glass lighting and 3D shading. | 15 minutes |
| P2 | Moving reading text and duplicate visibility management (`MotionDirector.jsx`, `AmbientBackground.jsx`) | Remove heading parallax and duplicate listener; keep the shared motion provider, scroll reveals, orbit, ticker, and interactive surfaces. | 30 minutes |

Estimates describe implementation work, excluding full browser verification and deployment.

## Updated navbar brand

The existing home anchor and all surrounding navbar links, controls, menu behavior, selection pill, and glass material remain unchanged.

```jsx
<span className="brand-symbol" aria-hidden="true">
  a<span>n</span>.
</span>
<span className="brand-caption">
  Aizaz Noor
  <small>Developer / Lahore</small>
</span>
```

The compact mobile version preserves all three 44px action targets at 320px width.

## Updated hero

```jsx
<div className="hero-topline">
  <span>Lahore, Pakistan <FiArrowUpRight aria-hidden="true" /></span>
</div>
```

The hero description now explains the work directly: web applications and developer tools, from AI-assisted workflows to desktop networking. The animated floating cards refer to NovaWorks and Tandem instead of a decorative JavaScript biography.

## Retained intentionally

- Desktop WebGL enhancement and mobile CSS sculpture fallback; no mandatory graphics download for reduced motion.
- Real SVG technology icons, genuine project screenshots, screenshot viewer, and accurate contributor attribution.
- Glass navigation and surfaces, continuous orbit/ticker motion, pause/resume preference, offscreen suspension, and reduced-motion support.
- Data-dependent inline values for icon colors, dot positions, screenshot aspect ratios, and measured navigation selection. These serve real runtime purposes.
- Semantic section headings, form labels, validation messages, keyboard focus restoration, and native dialogs.

## Verification and comparison

Local before and after screenshots are recorded under `audit/ios-cleanup-*.png` (ignored browser artifacts). The before capture uses reduced motion for a stable comparison; the final motion capture is checked separately.

Verification results and deployment commit are recorded below after checks finish. Automated accessibility checks are regression coverage, not a claim of complete WCAG conformance. The existing lazy-loaded ~883 KB desktop 3D chunk still triggers Vite's size warning; this cleanup does not conceal it or claim a full graphics optimization.


### Final local results

- ESLint passed; four contact unit tests passed; production build passed; dependency audit reported zero vulnerabilities; `git diff --check` passed.
- All 14 Chrome browser tests passed at 320/390/768/1440px. Coverage includes core navigation and dialogs, real screenshots, contact success/failure and validation, no-JavaScript fallback, blocked graphics, continuous animation, pause persistence, offscreen suspension, animation-phase overflow, brand fit, and entrance-resume regression.
- Automated axe scans passed on desktop/mobile and with navigation and screenshot viewer open.
- The tablet image check was improved to scroll every lazy image into view: visiting a tall section alone did not load all images. This was a test coverage problem, not evidence of a broken image.
- Production main JS is approximately 270.8 KB (87.9 KB gzip); CSS approximately 41.3 KB (9.7 KB gzip). The separate optional WebGL chunk remains approximately 883.5 KB (235 KB gzip).
- Desktop and 320px mobile after captures were visually inspected. All navbar source outside the brand subtree is unchanged. Local before/after captures are available in the audit folder.

Rollback: use `git revert` on the cleanup commit to restore the immediate prior version (`04ad5eb`) while preserving Git history. Deploy through the existing main-branch GitHub/Vercel integration.

- Separate normal-motion desktop capture confirmed changing WebGL canvas frames with zero page errors.

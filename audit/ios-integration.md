# Apple/iOS integration: plan, implementation and verification

## Result

The portfolio combines the current animated hero and real technology icons with the original portfolio's floating glass navigation and iOS material language. NovaWorks replaces LifeFlow in both the React page and the no-JavaScript fallback. Tandem now shows its actual dashboard rather than an architecture illustration.

## Prioritized implementation plan

Estimates describe a comparable integration from the starting version, not measured elapsed time.

| Priority | Work                                                                                             | Estimate  | Implementation                                                |
| -------- | ------------------------------------------------------------------------------------------------ | --------- | ------------------------------------------------------------- |
| P0       | Verify NovaWorks content, replace LifeFlow, obtain real project imagery                          | 30-60 min | `src/data/projects.js`, `index.html`, `public/projects/`      |
| P1       | Recover original desktop/mobile glass navbar and integrate current accessibility/motion controls | 1-2 hours | `src/components/Navbar.jsx`, `src/ios-theme.css`              |
| P1       | Apply a shared material language to key components                                               | 45-90 min | Project, experience, toolkit, credential and contact surfaces |
| P1       | Add full-size previews with keyboard/focus behavior                                              | 30-45 min | `src/components/ProjectPreview.jsx`                           |
| P1       | Validate responsive layouts, interactions, motion, images and accessibility; document and deploy | 45-90 min | `e2e/portfolio.spec.js`, this report, GitHub/Vercel           |

## Step 1: identify reusable components in the old portfolio

Use the audited pre-redesign revision `d67c57f`, not a guessed recreation:

```powershell
git show d67c57f:src/components/Navbar.jsx
git show d67c57f:src/index.css
git diff d67c57f..5d3e1d3 -- src/components/Navbar.jsx src/index.css
```

The recovered design contains these reusable pieces:

- Slate-grey gradient glass: white tint at the edges, a dark centre, blur and saturation, a fine white border, an inset highlight and soft shadow.
- A floating desktop pill that becomes a full-width toolbar after scrolling.
- A floating mobile pill with a rounded context-menu bubble, dimming backdrop and active selection indicator.
- A dynamic status capsule, thin specular top rims, rounded material panels and immediate press feedback.

Extract the component's dependencies as well as its visible rules: state, refs, scroll spy, outside-click/Escape behavior, breakpoint, active-pill positioning, reduced-motion behavior and logo. Importing the entire old stylesheet would also reintroduce obsolete grids, global resets and conflicting component rules.

## Step 2: isolate the materials from existing styles

The integration uses `--ios-*` tokens and `.ios-*` navigation classes in `src/ios-theme.css`, loaded after `src/index.css`. Existing project grids, typography, hero motion and contact logic remain the base. The following is the actual shared pattern:

```css
:root {
  --ios-glass-bg: linear-gradient(
    135deg,
    #ffffff29 0%,
    #232a3ed1 45%,
    #ffffff1f 100%
  );
  --ios-glass-blur: blur(28px) saturate(190%);
  --ios-material-bg: linear-gradient(145deg, #242a3be6, #121824ed);
  --ios-radius: 28px;
}
.ios-surface {
  position: relative;
  background: var(--ios-material-bg);
  border: 1px solid #ffffff1f;
  border-radius: var(--ios-radius);
  box-shadow:
    inset 0 1px 0 #ffffff1a,
    0 18px 48px #03040a29;
}
```

Apply the material as an explicit opt-in class instead of changing every generic `article`, `div` or `button`:

```jsx
<MotionSurface className="project-visual ios-surface">
  <ProjectPreview project={project} />
</MotionSurface>

<article className="experience-row ios-surface">...</article>
```

These snippets demonstrate composition; the complete components in the repository contain their real content. Background blur is concentrated on navigation and modal backdrops rather than repeated across every card. Opaque fallbacks cover unsupported backdrop filters and reduced-transparency preferences.

## Step 3: restore the original navigation intelligently

The implemented navbar restores all eight section destinations: Home, Work, Experience, About, Toolkit, Credentials, Profiles and Contact. It also restores the original logo and GitHub/LinkedIn actions, with a direct resume link.

```jsx
<button
  type="button"
  aria-label="Menu"
  aria-expanded={open}
  aria-controls="navigation-links"
  onClick={() => setOpen(value => !value)}
>
  {open ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
</button>
<div id="navigation-links" inert={!open} className={menuClassName}>
  {navigationLinks}
</div>
```

The complete version in `Navbar.jsx` adds the following behavior:

- The desktop indicator follows hover, keyboard focus and the active section. ResizeObserver updates its measured position after resizing and font/layout changes.
- The desktop toolbar changes from floating pill to edge-to-edge glass after scrolling more than 20 pixels, matching the old design.
- Mobile/tablet navigation below 1024px remains a floating pill. The menu opens from its trigger, fits within the viewport and scrolls internally on short screens.
- Opening moves focus to the first link. Escape and backdrop dismissal return focus to the trigger. Selecting a section moves focus to that section; tabbing outside closes the disclosure.
- Closed mobile links are inert and invisible. Expanding to desktop closes the mobile menu. Every control retains a 44px minimum touch target.
- Motion preferences and the portfolio's Pause control stop indicator/menu transitions. The interaction never waits for an animation before accepting input.

## Step 4: use actual project content and images

### NovaWorks

Verified against [the NovaWorks README](https://github.com/Aizaz-Noor/Nova-Works). The featured case study describes meeting-to-task extraction, batch validation, atomic saves, duplicate-safe replay and role-scoped access. Aizaz's role is credited as product direction, UI/UX, frontend, integration and repository ownership with Code Nomads. No hackathon win or unsupported solo authorship is claimed.

The screenshots are copied from the project's published assets. Their Git blob hashes match the public repository exactly; see `project-image-provenance.json`.

- `novaworks-workspace.png`: 1366 x 768, administrator project workspace.
- `novaworks-project.png`: 1280 x 1345, project and task details.
- Adjacent captions identify fictional demonstration data.
- The public demo and repository links point to NovaWorks. LifeFlow is removed from current rendered/fallback project content; earlier audit reports remain historical records.

### Tandem

The published Tandem repository has app icons but no dashboard screenshot. The image was therefore captured from the real `tandem-ui` source at local revision `02c4aa025fa0ca6624667f7d46f1d5e5de1df3a2`, rendered in an isolated frontend copy. No networking backend was started, no network settings were changed, and no adapters or performance readings were fabricated.

The screenshot shows the actual offline state. The caption says **Actual app interface - local capture with backend offline**. External font requests were blocked during capture to avoid network stalls, so the application's fallback fonts were used. The full 1366 x 900 capture was encoded as WebP at quality 90: approximately 29 KB. The temporary capture app and its dependencies were removed afterwards; they are not part of the shipped portfolio.

### Reusable previews

`ProjectPreview` reads `project.previews` instead of special-casing a project name. NovaWorks has a segmented preview switch; Tandem has a single real screenshot. Each image opens a native modal dialog with a labelled title, close button, Escape dismissal, scroll locking and focus restoration. Original aspect ratios and descriptive alt text are retained.

```js
previews: [
  {
    label: "Dashboard",
    image: "/projects/tandem-dashboard.webp",
    alt: "Tandem desktop dashboard showing network speed meters and adapter controls in the offline backend state",
    width: 1366,
    height: 900,
  },
];
```

## Step 5: unify key components

- Project previews: rounded glass frame, inset rim, dark window chrome and full-size image viewing.
- Experience: separated material cards with consistent padding and rounded corners.
- Toolkit: the same material tokens, recognizable brand icons and rounded technology cells.
- Credentials: one grouped rounded list with clear row boundaries and restrained hover feedback.
- Contact: a unified material panel, grouped information cells, rounded inputs and a pill-shaped primary action. Existing validation and delivery behavior are preserved.
- Hero: the original status-capsule material and rounded actions sit alongside the current automatic sculpture, orbiting icons, floating code panels and technology ribbon.

## Step 6: validate and publish

```powershell
npm.cmd run lint
npm.cmd test
npm.cmd run build
npm.cmd audit
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
npm.cmd run test:browser
git diff --check
```

Verified local results: all 13 browser tests passed together in the final full run (1.7 minutes, installed Chrome), including zero axe violations in desktop/mobile, expanded navigation and screenshot-dialog scans; lint passed; all 4 contact unit tests passed; production build passed; dependency audit reported zero vulnerabilities; patch whitespace check passed. The deferred 3D chunk remains approximately 235 KB gzip; the integrated main JavaScript is approximately 89 KB gzip and CSS approximately 11 KB gzip. Local Chrome rendered changing WebGL frames with no page errors alongside the restored glass navbar.

Browser coverage now includes 320/390/768/1440px layouts; both NovaWorks previews; actual Tandem image loading; screenshot enlargement, Escape and focus restoration; desktop selection indicator; mobile focus, backdrop dismissal and breakpoint changes; resume dialog; intercepted contact success/failure; no-JavaScript NovaWorks content; reduced motion; blocked graphics recovery; ongoing motion and pause persistence; animation-phase overflow checks; and axe desktop/mobile checks.

Automated accessibility scans are regression coverage, not a claim of full WCAG certification. The existing desktop-only deferred Three.js bundle remains the largest performance cost; no new animation framework was added. Screenshots load lazily and preserve layout dimensions.

Before publishing, verify all checks, inspect desktop and mobile renders, push `main` to the connected GitHub/Vercel deployment, check the exact commit's deployment/CI status, and repeat essential checks on the live site. Use Git revert for rollback so subsequent history is preserved; `5d3e1d3` is the immediate pre-integration version.

## Further premium improvements, in priority order

These are suggestions for subsequent work, not prerequisites or claims of implemented features.

1. **P2: richer case-study pages (2-4 hours each).** Add a dedicated NovaWorks route with the decision-to-task workflow, clear role attribution, outcome evidence and a captioned 20-30 second walkthrough. Keep the homepage summary short.
2. **P2: connected native Tandem capture (20-40 minutes when a native session is available).** Capture a genuine connected session and configuration screen, redact identifiers, and retain truthful mode/performance labels. Replace the current offline image without inventing state.
3. **P2: coordinated light appearance (3-5 hours).** Derive light surface/text/border tokens, respect the system preference and provide a persistent explicit choice. Review every screenshot frame and focus ring rather than simply inverting colors.
4. **P2: faster first meaningful graphics (2-4 hours).** Measure on a real mid-range phone and laptop, then consider a smaller custom Three.js import surface or a lower-cost desktop fallback. Preserve visible motion while reducing transfer/render cost.
5. **P3: device-specific polish (1-2 hours).** Review Safari on a physical iPhone, landscape short-height menus, large text and touch feedback. Browser emulation cannot prove the exact feel of those devices.

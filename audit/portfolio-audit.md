# MyCV portfolio audit

Audit date: 30 September 2026. Repository: [Aizaz-Noor/MyCV](https://github.com/Aizaz-Noor/MyCV). Deployment: [aizaznoorkhuwaja.vercel.app](https://aizaznoorkhuwaja.vercel.app/).

This document records the pre-remediation baseline. See [remediation.md](remediation.md) for changes and verification completed on 1 October 2026.

## Executive assessment and scope

The portfolio has a sound small-site foundation: React components, static Vercel hosting, meaningful project content, reusable presentation components, and SEO metadata. Its most urgent weaknesses are keyboard accessibility, failure isolation, inconsistent content, and the cost of decorative effects. Improve those before adding more animation or changing frameworks.

Reviewed all application components, hooks, sections, global CSS, entry HTML, build/lint/deployment configuration, package manifest, and dependency audit. Local commit `3352ddab0ee5c0a195618d495273b371149c1229` matches the remote repository HEAD returned during this audit. Production CSS and vendor asset filenames match the local build; the entry JavaScript hash differs, so exact deployment/source equivalence is not established.

Evidence:

- `npm.cmd run build`: passed, Vite 8.0.3; large-chunk warning.
- Largest chunk: `r3f-vendor`, 887.03 kB minified / 236.59 kB gzip. Main HTML explicitly module-preloads it in both the live deployment and local build. Gzip figures are local build estimates, not measured wire transfers.
- `npm.cmd run lint`: failed with 30 errors. There are 15 errors in the primary source tree and another 15 in `.kilo/worktrees/knowledgeable-meteorology`. These are not 30 distinct application bugs.
- `npm.cmd audit --json`: 10 affected packages: six high, three moderate, one low, zero critical. See the dependency section below for exposure distinctions.
- Live homepage and all 17 checked assets returned HTTP 200. Checked assets include entry JavaScript, preloaded vendor bundles, CSS, resume, five credential PDFs, portrait, logo, favicon, robots, and sitemap. This does not establish every outbound link or image is healthy.
- Browser inventory was empty. Screenshots, rendered viewport behavior, screen-reader operation, measured contrast, browser console errors, and Core Web Vitals could not be verified. UI findings below are source-supported; visual design recommendations are proposals, not screenshot observations.
- No contact message was sent. Delivery, spam controls configured in the provider dashboard, and recipient configuration remain unverified.

No application source, dependency versions, or deployment settings were changed. Files added under `audit/` contain this report and read-only evidence. A finite review cannot guarantee discovery of every bug.

## Bugs and Errors

Severity: **High** blocks an important interaction, undermines fallback availability, or warrants prompt security remediation; **Medium** degrades behavior or reliability; **Low** is a maintenance or secondary usability issue. Conditional findings state their trigger.

| ID | Severity | Location | Finding, impact, and specific fix |
|---|---|---|---|
| B01 | High, conditional | `index.html:122-187` | The native preloader is removed only after React dispatches `app-ready`. With JavaScript disabled or the entry bundle unavailable, it permanently covers the semantic fallback. Remove the blocking overlay, or show it only after JS initializes and add a bounded failure path. Verify that identity, project links, email, and resume remain available when the bundle is blocked. |
| B02 | High, conditional | `src/App.jsx:55-58`, `src/main.jsx:8`, `src/components/Background3D.jsx:94` | The decorative background has Suspense but no local error boundary or Canvas fallback. A rejected background import or propagated renderer initialization error can reach the root boundary and replace the portfolio. Isolate it in its own boundary and render a static background on failure; keep the main content mounted. |
| B03 | High | `src/pages/TechStack.jsx:49-56` | Skill cards are clickable `div` elements without keyboard focus or activation. Keyboard users cannot perform the flip interaction. Prefer a static description; otherwise use a native button and expose its expanded state with an associated description. |
| B04 | High | `src/components/ResumeModal.jsx:6-31` | The modal declares `aria-modal` but never moves focus inside, contains Tab navigation, makes the background inert, or restores focus. Use native `dialog.showModal()` with explicit focus restoration, or implement those behaviors with a tested dialog primitive. Keep Escape and PDF download support. |
| B05 | Medium | `src/App.jsx:74`, `src/pages/Hero.jsx:162`, `src/index.css:111,2447` | The resume overlay lives inside the main stacking context (`z-index:10`), while the navbar is at 1000. Its own z-index of 10000 cannot escape that parent. The navbar can remain above the backdrop. Render the dialog in the top layer or portal it outside main. Confirm full coverage by screenshot when a browser is available. |
| B06 | High | `src/index.css:1934-1948`, `src/pages/Certifications.jsx:110-128` | Credential links are inside an opacity-zero overlay revealed only by hover. Keyboard focus does not reveal them, making an actionable link invisible. Add `:focus-within` and a visible focus style, and keep an ordinary visible credential link on touch devices. |
| B07 | Medium | `src/pages/Contact.jsx:31-41` | Required name, subject, and message checks accept whitespace-only strings. Normalize text with `trim()` before validation and submission. Test blanks, whitespace, malformed email, valid values, and max lengths. |
| B08 | Medium | `src/pages/Contact.jsx:175-225` | Validation errors are not associated with fields; no `aria-invalid`, error descriptions, error-summary focus, or live status region is supplied. Retain explicit labels, add error IDs and `aria-describedby`, move focus to the first invalid field, and announce request failures and success separately from the button text. |
| B09 | Medium, conditional | `src/pages/Contact.jsx:56-75` | The request has no application timeout. If it stays pending, the button stays disabled. Use an AbortController timeout, preserve entered data on failure, and provide retry/direct-email actions. Read the provider response body for useful messages. HTTP 200 is documented as success; checking only `response.ok` is not by itself evidence of a current delivery bug. |
| B10 | Medium | `src/components/GithubStats.jsx:4,49,61` | Failed requests leave fabricated-looking defaults (15 repositories, 15 stars, one fork) visible without an error or stale-data label. A real zero repository count is also replaced with 15 because of `||`. Use nullable data, `??` for zero-safe fallback, and either a labeled cached result or “Unavailable.” |
| B11 | Low, conditional | `src/components/GithubStats.jsx:29` | Stars/forks aggregate only the first 100 repositories. Totals become incorrect if the account exceeds that page. Follow pagination or compute a cached aggregate outside the page, with an explicit “public repositories” scope. |
| B12 | Medium, conditional | `src/pages/Profiles.jsx:44-77` | The chart loader has `onLoad` but no `onError` or timeout. A failed ghchart request leaves a permanent spinner. Add loading/success/error states, stable reserved space, and a GitHub profile fallback link. |
| B13 | Medium | `src/components/Background3D.jsx:24-29,62-70,98`; `src/components/ParticleTunnel.jsx:70` | The claimed mobile renderer throttling only skips camera updates; Canvas still uses `frameloop="always"` and particle updates continue. Visibility handling changes CSS rather than the render-loop setting. Implement an explicit visibility/render policy; use a static or opt-in background on constrained devices. Do not claim 50% GPU savings without profiling. |
| B14 | Medium | `src/index.css:2068-2081,2911-2914`; `Hero.jsx:30`; `MagneticButton.jsx:10`; `TiltCard.jsx:8`; navbar/footer scroll handlers | Reduced-motion support is incomplete. The CSS rule excludes pseudo-elements, while JavaScript typing, mouse-driven transforms, and explicit smooth scrolling continue. A later touch rule also sets pseudo-element animation duration. Apply a shared motion preference to JS and CSS, include `::before`/`::after`, show a static role, and use immediate scrolling when requested. |
| B15 | Medium | `src/components/Navbar.jsx:73-80,164,235-282`; `src/components/Footer.jsx:23-28` | Navigation prevents native anchor behavior without updating the URL/history or moving focus. On slow loading, an absent target silently does nothing. The mobile dropdown also declares menu/menuitem semantics without the expected menu keyboard behavior or Escape focus restoration. Prefer real anchors with scroll margin, and a disclosure button with an ordinary list of links. Ensure target IDs exist before interaction. |
| B16 | Medium | `index.html:193-207`, `src/pages/Hero.jsx:6-9`, `src/pages/Experience.jsx:4-36` | Static fallback says “AIOps Engineer” and “Software Engineering Intern”; rendered content says “Aspiring AIOps Engineer” and freelance engineer/student. This produces conflicting professional information for different readers. Generate static and interactive content from the same verified data. Align structured data with current education and experience. |
| B17 | Medium | `eslint.config.js:8`, `src/App.jsx:1`, `Background3D.jsx:55`, `GithubStats.jsx:60`, `ParticleTunnel.jsx:56-64`, other locations in audit JSON | The lint command fails: unused imports/parameters/catch variables, an empty catch, synchronous effect state initialization, and impure random generation reported by React hook rules. Fix the 15 primary-tree errors and ignore nested tool worktrees in lint configuration. Use deterministic seeded particle generation if keeping render-time memoization; do not simply disable all hook rules. |
| B18 | Low | `src/components/Preloader.jsx:10-29`, `src/pages/About.jsx:15-25` | Animation-frame work and scheduled timers are not fully canceled on unmount. StrictMode can start duplicate preloader loops during development. Store and cancel RAF/timer IDs. Prefer removing the timer-based preloader entirely. |
| B19 | Low | `README.md:122,129,165-182` | Setup points at `Aizaz-Noor/portfolio.git`, not MyCV, and permits Node 18 although installed Vite requires `^20.19.0 || >=22.12.0`. The README links a LICENSE file absent from the tracked tree. Correct the repository and runtime requirements, add a license only if intended, and remove unsupported performance claims. |

### Dependency findings

The npm audit counts affected dependency packages, not necessarily independent vulnerabilities or exploitable website paths. All ten records report a fix available. Nine packages are marked dev-only in the lockfile; the runtime transitive dependency is fflate under three-stdlib. No exploitation was attempted or demonstrated.

| Package | Installed | Audit severity | Context |
|---|---:|---|---|
| Vite | 8.0.3 | High | Development server/build tool |
| PostCSS | 8.5.8 | High | Development/build pipeline |
| nanoid | 3.3.11 | High | Development dependency |
| js-yaml | 4.1.1 | High | Development dependency |
| browserslist | 4.28.2 | High | Development dependency |
| brace-expansion | 1.1.13 | High | Development dependency |
| fflate | 0.6.10 | Moderate | Transitive runtime dependency; vulnerable code reachability not established |
| @humanfs/node | 0.16.7 | Moderate | Development dependency |
| baseline-browser-mapping | 2.10.14 | Moderate | Development dependency |
| @babel/core | 7.29.0 | Low | Development dependency |

Prioritize reviewed dependency updates and rebuild/re-audit afterward. Avoid forced major upgrades without compatibility checks. Vite's [WebSocket file-read advisory](https://github.com/vitejs/vite/security/advisories/GHSA-p9ff-h696-f583) specifically requires a network-exposed development server; the audited Vite configuration does not enable that exposure. A separate [Windows path advisory](https://github.com/vitejs/vite/security/advisories/GHSA-fx2h-pf6j-xcff) is relevant to assessing the Windows development environment. These do not establish that the static Vercel deployment exposes local files.

## UI/UX Issues

### Interaction and content hierarchy

- **Projects appear too late:** App renders Hero, About, Experience, and TechStack before Projects. Move selected work directly after the hero so a recruiter sees evidence before an extended biography/tool inventory.
- **Primary action is vague:** rename “Work” to “View selected projects.” Keep “Resume” available as a direct PDF link as well as any optional viewer.
- **Two loading overlays:** index.html has a native preloader and App mounts another timer-driven loader. The React one waits one second before its exit and another 900 ms before removal, regardless of asset readiness. Remove this artificial wait and render the headline and actions immediately.
- **Typewriter announcements:** `Hero.jsx:90` marks continuously changing text `aria-live="polite"`. This can generate repeated partial announcements. Provide one stable accessible role sentence and hide the decorative typing from assistive technology.
- **Motion competes with content:** custom cursor, magnetic buttons, card tilt, animated borders, shimmer, typewriter, and a particle tunnel all operate in the same page. Retain at most one signature effect and subtle interaction feedback.
- **Important details are small:** project descriptions use 0.85rem and diagram labels 0.68rem; timeline text is also small. Start at 1rem for project/body text and 0.8125–0.875rem for supporting metadata.
- **Mobile contact risk to verify:** `index.css:1272` forces contact details to nowrap inside nested padded flex containers. At 320–375 px or enlarged text, the email may overflow or force clipping; global overflow-x hiding can conceal the failure. Allow wrapping, use `overflow-wrap:anywhere` and `min-width:0`, then verify widths in a browser.
- **Tiny social targets:** navbar links have no dedicated padded target and mobile SVGs are 18 px. Enlarge hit areas to approximately 44 px while keeping the icon size. This is a comfort recommendation; the WCAG spacing exception means icon size alone does not prove an AA failure.
- **Duplicated social/contact sections:** Profiles, Contact, navigation, and footer repeat the same destinations. Keep concise supporting links and remove the full Profiles section unless the contribution chart adds meaningful evidence.
- **Performance claims need support:** “zero-latency,” “sub-second,” “60 FPS,” and “100+ rigid body collisions” should link to a reproducible benchmark/demo or be replaced with precise qualitative descriptions. Their truth was not verified by this audit.

### Screenshot and acceptance checklist

Screenshots could not be captured because no browser was available. Capture the following after fixes, using the same content and motion settings for comparisons:

1. Hero and featured project at 1440×900, 768×1024, 390×844, and 320×568.
2. Resume open: navbar fully covered, focus inside, Escape closes, trigger regains focus, PDF download works.
3. Certificate keyboard focus: visible action and focus ring without mouse hover.
4. Mobile menu: Escape restores focus; subsequent Tab never disappears into closed content.
5. Contact: empty/whitespace validation, invalid email, simulated network error, timeout, successful mocked response, and 200% text zoom.
6. Reduced motion, disabled JS, blocked WebGL/background chunk, blocked chart, and cold navigation to `/#work`.
7. Horizontal overflow checks and contrast checks over the actual translucent backgrounds, not just nominal token colors.

Modal focus requirements follow the [WAI-ARIA dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). Ordinary site navigation is better represented by the [WAI disclosure navigation pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) than a partially implemented application menu.

## System Architecture Review

### Strengths

- React/Vite with static hosting fits a portfolio; an application server or database is unnecessary for the existing requirements.
- Sections and reusable components are already separated; local state avoids unnecessary global-state infrastructure.
- A lockfile supports reproducible dependency resolution.
- Reusable Reveal, TiltCard, MagneticButton, and error-boundary components create useful refactoring boundaries.
- Passive listeners, some RAF scheduling, observer cleanup, memoization, lazy-loaded images, and constrained content width show deliberate performance work.
- Semantic sections, explicit input labels, skill filter `aria-pressed`, a skip link, image alt text, canonical/Open Graph metadata, robots, sitemap, and JSON-LD provide a useful baseline.
- GitHub stats use bounded local caching, and the contact form has pending/error handling and a direct email alternative.

### Weaknesses and recommendations

| Area | Evidence | Recommendation |
|---|---|---|
| Content duplication | Facts exist in index.html, JSX arrays, metadata, stats defaults, and README | Put verified profile/projects/experience in shared content modules; generate metadata and initial HTML from them. Consider prerendering within the existing stack. |
| Decorative failure isolation | Background errors can reach root; seven main sections share one boundary | Give optional integrations and graphics local fallbacks; keep contact and project content usable when one section fails. Use contextual error messages instead of labeling every error a 3D failure. |
| Lazy loading effectiveness | All lazy sections are rendered immediately; the 887 kB graphics-related vendor chunk is module-preloaded | Lazy declarations alone do not defer work until scroll. Separate dependency graphs, defer graphics until after useful content or explicit opt-in, and inspect the build dependency graph to confirm no eager 3D dependency remains. Preserve stable section anchors/placeholders. |
| Styling | 2,927 lines in index.css, many inline styles, repeated overrides and !important rules | Split tokens/base/layout/component styles; keep dynamic transforms in styles but move static layout into classes. Introduce shared Section, SectionHeading, Button, and Card primitives. |
| Integration logic | Requests live inside Contact/GithubStats; chart is a separate third-party service | Extract small service functions and hooks with abort handling, schema checks, cached/stale/error states. Keep browser-side Web3Forms unless requirements justify a backend. |
| Testing and CI | No test script or tracked `.github` workflow was found | Add build/lint gates and focused interaction tests for navigation, dialog, form, reduced motion, and integration failures. Vercel project-level checks were not inspected. |
| Motion preferences | Several independent animation mechanisms | Use one reactive `useReducedMotion`/media-query utility. Stop optional effects when hidden and avoid continuous work when idle. |
| Dependency scope | No source imports found for lucide-react, postprocessing, @react-three/postprocessing; unused useScrollReveal hook | Remove unused dependencies/hooks after confirming their absence from intended features, then regenerate lockfile and run build. |
| Asset delivery | Favicon ~92 kB, logo ~108 kB | Export a compact favicon and optimize the displayed logo; generate an intentional social share image. Preserve visual quality and dimensions. |

Suggested boundaries: `content/`, `sections/`, `components/ui/`, `components/effects/`, `hooks/`, `services/`, and small scoped stylesheet files. Renaming `pages/` to `sections/` is optional; it should follow real refactoring rather than become a project on its own.

For Web3Forms, the visible access key is part of its documented browser integration and is not automatically a leaked server secret. Remove duplicated key configuration, document the environment variable, and add the supported honeypot. Provider-side restrictions/abuse protection need a separate settings review. See [Web3Forms API reference](https://docs.web3forms.com/getting-started/api-reference).

## Visual Design Improvement Plan

Direction: a restrained dark engineering portfolio with concrete project evidence, consistent typography, and a small amount of optional motion. Retain the existing identity rather than replacing it with a template.

1. **Rebuild the first impression.** Keep the name prominent, then one stable sentence: “Software Engineering student building full-stack web apps and developer tools.” Use “View selected projects,” “Resume,” and a quieter contact link. On desktop, pair text with a real project screenshot or terminal recording; stack on mobile. Verify wording against actual experience.
2. **Change section order.** Hero → Selected projects → Experience and education → Short about/skills → Credentials → Contact. Reduce navigation to Work, Experience, About, Contact, and Resume. Make skills an easy-to-scan grouped list instead of requiring flips.
3. **Show the work.** Feature two strongest projects with a real screenshot/demo, the problem, your contribution, one engineering decision, a verified outcome, source link, and demo/download where available. Show other projects as smaller rows. Place architecture diagrams inside the detailed case study rather than using them as the only preview.
4. **Simplify surfaces.** Start with background `#0B0D12`, surface `#131722`, text `#F3F4F6`, secondary text `#AAB3C2`, and the existing indigo `#818CF8` as the main accent. These are proposed tokens; validate composited contrast before acceptance. Reserve glass for navigation or the optional modal. Remove ubiquitous glow, shimmer, and rotating borders.
5. **Keep the current font pairing, improve scale.** Outfit display and Inter body are already coherent. Use a 48–80 px responsive hero, 30–44 px section headings, 16–18 px body, and at least 13–14 px useful metadata. Cap long text near 60–70 characters. Shorten headings such as “Project Showcase: What I've Built” to “Selected projects.”
6. **Create consistent spacing.** Use a 4/8/12/16/24/32/48/64/96 px scale, approximately 1120 px maximum content width, 20–24 px mobile gutters, and 56–96 px section spacing. Align project actions and text baselines. Prefer left alignment for case-study reading.
7. **Reduce interaction friction.** Keep native cursors and stable click targets. Use 150–220 ms color/opacity feedback; optional entrances should be short and subtle. Remove the artificial loader. Make reduced-motion mode static. If retaining WebGL, make it an enhancement with a reliable static fallback.
8. **Make contact direct.** Put the email and availability statement near a compact form. Move the “What I'm Building Toward” text into About or remove it. Make success/error states persistent enough to read and accessible.
9. **Strengthen credibility.** Replace repeated generic learning paragraphs with specific decisions, constraints, and examples. Align HTML/JSON-LD/React copy. Use only verified project metrics and accurate credential issuer/title descriptions. Create a 1200×630 social image with name, role, and one project visual.

## Prioritized Action Plan

Estimates are rough engineering effort, not elapsed delivery promises; project screenshots/case studies may require additional content work.

| Priority | Work | Effort | Acceptance criteria |
|---|---|---|---|
| P1 | Update vulnerable dependencies with reviewed lockfile changes | 0.5–1 day | Build passes; advisory scan repeated; remaining exposure explicitly documented. |
| P1 | Fix fallback availability and isolate WebGL (B01–B02) | 0.5–1 day | Blocking JS/background failure never hides the static identity/contact; renderer failure preserves working content. |
| P1 | Fix skills, credentials, and modal accessibility (B03–B06) | 1–2 days | Complete keyboard interaction; visible focus; top-layer modal; Escape and focus restoration verified. |
| P1 | Restore lint signal (B17), correct conflicting career content (B16) | 0.5 day | Lint only checks intended source and exits zero; static/rendered profile facts agree. |
| P2 | Form validation/status/timeout and honest integration fallbacks (B07–B12) | 1 day | Mocked success/failure/timeout paths pass; no whitespace messages, permanent spinners, or invented live stats. |
| P2 | Native navigation, motion preference, and effective rendering policy (B13–B15) | 1–2 days | URLs/anchors work; reduced-motion policy covers JS and pseudo-elements; no unintended graphics work on opted-out devices. |
| P2 | Hero/project ordering, project imagery, readable typography | 2–4 days | A new visitor can identify role, inspect work, open resume, and find contact without searching through repeated sections. |
| P3 | Consolidate content/styles, documentation, dependency cleanup | 1–2 days | One source for content; documented supported runtime; unused imports/assets/dependencies removed after verification. |
| P3 | CI, targeted regression checks, browser measurements | 1–2 days | Build/lint gates; automated core-flow checks; screenshot matrix completed; field/lab metrics collected. |

Proposed performance acceptance goals, not measured current scores: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 at the 75th percentile when field data is available. Initially target under 150 kB gzip of critical JavaScript before optional graphics; verify improvements with cold-load traces and the generated module graph. Do not accept a raised chunk-warning threshold as an optimization.

Evidence files: `eslint-results.json`, `dependency-audit.json`, `live-asset-checks.json`, and `live-index.html` in this directory.

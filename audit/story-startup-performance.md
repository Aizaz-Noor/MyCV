# Story, logo startup, and performance release

## Visitor journey

Hero establishes identity and offers a direct work shortcut. About introduces the person and current focus, with GitHub activity as supporting evidence. Selected projects demonstrate the work; Experience supplies background; Toolkit and Credentials support it; Contact closes the story. Section numbers, desktop/mobile navigation, and the no-JavaScript fallback follow the same order. Profile links remain in About, with existing #profiles deep links supported; the redundant top-level Profiles nav entry is removed.

## First impression

The previous semantic fallback could paint before React/CSS loaded. Critical inline styles now hide it only when the startup bootstrap actually runs. An accessible status screen introduces the an. monogram with staggered transform/opacity, a lavender dot, and an indeterminate light sweep. Manrope is self-hosted, preloaded, and declared in critical CSS so the logo does not depend on the application stylesheet.

The app signals readiness after mounting. Font readiness waits at most 800ms; ordinary visits use a 500ms introduction measured from bootstrap, followed by a 220ms fade. This is a deliberate presentation delay, not a performance improvement or a fabricated download percentage. Reduced motion and saved animation pause remove the introductory movement and minimum delay. Direct section links also skip that minimum. The screen does not wait for optional graphics or external data. It is removed from the DOM after handoff. A three-second bootstrap fail-safe reveals the semantic fallback if the application module fails. With JavaScript disabled, the loader stays hidden and the fallback is readable immediately.

Initial deep-link positioning occurs after critical font readiness and before optional graphics eligibility is rechecked, without a long automatic scroll. Normal navigation retains native scrolling. Hero entrance animations stay paused while covered.

## Concrete performance changes

| Area | Before | After |
| --- | --- | --- |
| Mobile navbar blur | 28px / 190% saturation | 12px / 150% |
| Mobile menu blur | 32px / 190% saturation | 12px / 150% |
| Mobile ambient effects | 2 drifting large gradients + 16 particles | Static gradients + 8 visible animated particles |
| Standard solid knot triangles | 10,080 | 5,120 |
| Wireframe knot triangles | 2,400 | 1,280 |
| Desktop DPR cap | 1.5 | 1.25; weaker devices use 1 |
| Closed activity details | 365 table rows mounted | No table rows until opened |
| Starfield | General-purpose Drei Stars | 180 static native Three.js points |
| Optional graphics | Desktop / idle / reduced-motion gate | Also Save-Data, 2G, very-low-memory, startup, artwork-visibility gates |
| Background tab | Optional canvas disposed and rebuilt | Warm canvas retained; existing frame loop pauses |

The standard knots use about 49% fewer triangles together. The DPR cap reduces the maximum backing pixel area about 31% on high-DPR standard-tier devices; these are workload reductions, not measured FPS gains. The dependency removal removed 42 packages, with zero reported vulnerabilities in npm audit.

Build comparison (same machine/toolchain): main JS 90.21 → 90.68 kB gzip; optional 3D 234.94 → 234.27 kB gzip. Inline HTML increases from 2.91 to 4.68 kB gzip for the critical logo/fallback logic. CSS is 11.91 kB gzip. The introduction adds a small startup cost; this release reduces ongoing GPU/DOM work and unnecessary optional requests rather than claiming a smaller main bundle. The existing 3D chunk-size warning remains.

## Validation

Unit tests cover contact validation/delivery and contribution parsing. Browser regressions cover the full portfolio plus the new first-paint handoff at 320/390/768/1440px; blocked application recovery; failed font requests; direct hashes; saved pause; constrained graphics; and absence of closed table rows. Existing keyboard/dialog, portrait, contact, mobile, no-JavaScript, graphics-failure, pause, and axe checks remain required.

Startup and final page screenshots are inspected. Production-build desktop/mobile smoke checks and live deployment verification are required before release. Chromium emulation does not establish native Safari FPS, real-user Core Web Vitals, or full WCAG compliance. No numerical speed gain or Lighthouse score is claimed.

README and launch captures are refreshed to match this version. Generated video assets remain local exports rather than repository binaries.

References:
- https://web.dev/articles/animations-and-performance/
- https://webkit.org/blog/3632/introducing-backdrop-filters/

### Local verification record

- ESLint: passed.
- Production build: passed; optional 3D chunk-size warning remains.
- Node unit tests: 6 passed.
- Full Playwright suite: 36 passed, including desktop/mobile axe scans and all startup/story cases.
- npm audit: zero reported vulnerabilities.
- Patch whitespace check: passed.

Performance reductions above are derived from current geometry, DPR configuration, DOM behavior, and build output. Physical-iPhone frame times and real-user Core Web Vitals were not measured.

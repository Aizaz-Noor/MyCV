# Historical gradient restoration

## Exact palette recovered from Git

The repository calls this **Hyper Indigo & Frost White**, rather than Grey-Violet. Commit `eb4fc835da246ece00ae3340887c65d6f790443a` explicitly names it in its subject and CSS comments. The restored primary-button definition appears in `9e05c14` and remains in the pre-redesign `d67c57f` stylesheet.

```css
/* Original primary-button and .g-text gradient */
linear-gradient(135deg, #f1f5f9 30%, #818cf8)

/* Original hover variation */
linear-gradient(135deg, #ffffff 20%, #818cf8)
```

| Role | Exact value |
| --- | --- |
| Frost White | `#f1f5f9` / `rgb(241, 245, 249)` |
| Hyper Indigo | `#818cf8` / `rgb(129, 140, 248)` |
| Hover highlight | `#ffffff` / `rgb(255, 255, 255)` |
| Slate-grey glass center | `rgba(35, 42, 62, 0.82)` / base `#232a3e` |

The historical glass gradient was `linear-gradient(135deg, rgba(255,255,255,.16) 0%, rgba(35,42,62,.82) 45%, rgba(255,255,255,.12) 100%)`. The current glass material already carries those colors; retain it instead of importing the obsolete stylesheet.

## Color-only implementation

- Centralize the recovered stops and gradients in `src/index.css` as `--accent`, `--accent-frost`, `--accent-gradient`, and `--accent-gradient-hover`.
- Restore the gradient to the hero surname, section heading accents, contact heading accent, monogram accent, and primary action buttons. Retain solid indigo as a fallback when text clipping is unsupported.
- Align accent borders, shadows, focus colors, ambient glows, and mobile sculpture colors with indigo and cool slate instead of mixing unrelated lavender and cyan decoration.
- Recolor only materials and lights in `Background3D.jsx`. Geometry, camera settings, frame loop, performance settings, and motion controls are unchanged.
- Keep technology brand icons, actual project screenshots, body text, navigation controls, and semantic success/error colors intact.
- Preserve existing dimensions, spacing, breakpoints, typography, DOM, links, and application behavior. No dependency or animation framework changes.
- Provide a forced-colors fallback for clipped gradient text so text remains visible in system high-contrast mode.

## Validation

Checks and final browser results are recorded below. Gradient contrast needs more than an automated scan: the indigo endpoint has approximately 6.52:1 contrast against `#0b0d12` and 4.79:1 against `#242a3b`. Dark primary-button text against the indigo and frost endpoints gives approximately 6.52:1 and 17.74:1 respectively. These endpoint checks supplement browser scans; they do not claim full accessibility conformance for every translucent composite.

Before screenshot: `audit/ios-cleanup-live-desktop.png` (previous version). Updated desktop/mobile screenshots are recorded as ignored local artifacts under `audit/ios-gradient-*.png`.

Rollback: revert the gradient restoration commit to return to `c4d274a` while preserving Git history.
## Verified results

- ESLint, four contact unit tests, production build, dependency audit (zero vulnerabilities), and whitespace checks passed.
- All 14 browser tests passed, covering 320/390/768/1440px layouts, keyboard navigation, mobile menu, dialogs, contact success/error states, image loading, no-JavaScript fallback, motion controls, overflow checks, and automated accessibility scans.
- Browser-computed hero, contact-button, and hero-heading gradients exactly matched `linear-gradient(135deg, rgb(241,245,249) 30%, rgb(129,140,248))`; the hero hover matched the original white-at-20% variation.
- Forced-colors mode produced opaque system text instead of transparent heading text.
- Desktop, mobile, and contact screenshots were visually inspected. A separate normal-motion desktop capture confirmed changing WebGL frames with no page errors.
- The existing optional desktop WebGL bundle remains approximately 883.5 KB (235 KB gzip); this color change does not claim a graphics-size optimization.

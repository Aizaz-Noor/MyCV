# Mobile footer emoji fix and performance follow-up

Removed the decorative northeast arrow beside LET'S BUILD and its unused CSS. iOS can render this Unicode character as a blue emoji tile. The footer navigation remains unchanged.

Validation: production build, ESLint, unit tests, and responsive/accessibility browser regressions. Chromium mobile emulation does not establish native Safari frame-rate performance.

## Prioritized performance work

1. Measure scrolling on a physical iPhone with Safari Web Inspector. Compare the fixed navigation with its current 28px glass blur against a smaller blur and more opaque background. Preserve the existing appearance where possible; backdrop filters add rendering passes. Reduced-transparency mode already removes these filters, but ordinary mobile mode still uses them.
2. Add adaptive desktop graphics quality. The deferred 3D chunk is 883.49 kB minified / 234.94 kB gzip. It is already excluded from mobile and reduced-motion mode. Profile a DPR 1 tier and lower torus geometry on weaker desktops; honor Save-Data when available. Do not assume this chunk causes the mobile issue.
3. Render the 365-row contribution details table when its details element opens, preserving the summary, keyboard access, and table semantics. The closed details currently retains all rows in the DOM.
4. Benchmark responsive WebP/AVIF variants for the two PNG NovaWorks screenshots (93,401 and 60,196 bytes). Retain readable screenshots and originals for enlargement. Other project previews already use WebP and lazy loading, so expected savings are modest.
5. Establish before/after real-device load, interaction, and scrolling measurements. Optimize measured bottlenecks before adding libraries or splitting more components. Main JS is currently 279.68 kB minified / 90.21 kB gzip; current font files are self-hosted and use swap.

These are proposed follow-ups, not changes included in the footer fix. Existing reduced-motion support, animation pause control, offscreen pausing, and portrait reveal behavior are preserved.

References:
- https://webkit.org/blog/3632/introducing-backdrop-filters/
- https://web.dev/articles/animations-and-performance/

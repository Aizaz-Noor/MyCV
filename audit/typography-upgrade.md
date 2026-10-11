# English and Urdu typography upgrade

## Reference analysis and selection

The public font CSS at https://www.princepal.in/css/tokens/fonts.css loads Instrument Serif, Manrope, and JetBrains Mono. Its typography tokens at https://www.princepal.in/css/tokens/typography.css assign Instrument Serif to editorial display text and Manrope to interface text and smaller headings. The font CSS explicitly describes Instrument Serif as a free substitute for the licensed PP Editorial Old. This implementation uses the supplied open-source pairing; it does not copy or claim to provide PP Editorial Old. The headless browser was shown a browser-verification interstitial, so identification is based on the public stylesheet declarations rather than an unobstructed interactive visit.

For this portfolio:

- **Instrument Serif 400 regular/italic**: personal-name display, section headings, contact heading, footer display and fatal-error heading. Italic accents use the actual italic face. Tracking and leading are adjusted for its narrow, high-contrast forms.
- **Manrope variable 400-800**: body copy, navigation, buttons, personal branding, project names, credential titles and English text inside Urdu layouts. Technical monospace labels and numerical markers retain their existing function.
- **Noto Nastaliq Urdu variable 400-700**, explicitly requested by the owner: Urdu explanations, navigation, controls, dates, case-study labels and form states. Paragraph leading is 2.6; headings use approximately 2.05. Normal tracking and genuine font shaping preserve connected letterforms.

## Implementation

`src/fonts.css` defines licensed self-hosted WOFF2 faces with `font-display: swap` and Unicode ranges. `src/index.css` centralizes `--font-body`, `--font-display`, and `--font-urdu`. The old remote Inter/Outfit stylesheet and preconnects are removed from `index.html`; the obsolete Naskh file is removed. Source URLs, versions, licenses, sizes and SHA-256 checksums are in `public/fonts/README.md`.

The three Latin files total 67,996 bytes. The Arabic-script Nastaliq subset is 239,060 bytes and is requested for Urdu content. Its richer shaping costs more transfer than the previous 94,032-byte Naskh asset. The English-page Urdu switch label uses a system font to avoid transferring the full Urdu font solely for that label. English fonts remain available for isolated names, technology brands, email addresses and URLs.

Urdu form inputs reserve 98px minimum height, enough padding for labels and descending forms, and a separate focused-label position. Textareas retain room for multiple lines. On phones up to 480px wide, Urdu hero actions stack into readable rows. Translated project metadata and experience dates receive Nastaliq instead of the previous technical monospace styling.

Locale selection, URL handling, form data, dialog/preview state, document direction, gradients, motion code, ticker coordinates and imagery are retained. Navbar measurements continue to use the existing font-ready and resize handling.

## Verification

Local checks completed on 2026-10-11:

- Lint: passed.
- Unit tests: 9 passed.
- Production build: passed; main JavaScript 301.73 KB (96.43 KB gzip), CSS 49.94 KB (11.47 KB gzip). The unchanged optional 3D chunk retains the existing size warning.
- Dependency audit: zero vulnerabilities.
- Browser tests: all 25 checks passed across the full run and the corrected font-failure test rerun. The initial failure was a missing variable in the new test instrumentation, corrected before release; the application did not fail this check. Actual font-face loading and same-origin font requests passed.
- Screenshots inspected for English and Urdu at 320px and 1440px, including section-heading strokes and diacritics, filled mixed-direction fields, the mobile menu and stacked Urdu actions. Layouts also checked at 390/768/1024px; no horizontal overflow or navbar overlap observed.

Coverage includes both languages at 320/390/768/1440px plus a 1024px navigation review, real font-face loading and same-origin requests, failed Nastaliq download, blocked storage, forced colors, focus/state preservation, reduced motion, normal mobile animation, dialog/menu accessibility and the existing English regression suite.

Local visual captures are ignored `audit/ios-font-*.png` files. Automated scans and browser emulation are supplemented by screenshot inspection; they are not a claim of physical-device testing or complete WCAG certification.

The fonts change can be reverted independently of the bilingual implementation. The previous deployed bilingual version is `87339f4`.

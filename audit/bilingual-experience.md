# English–Urdu implementation

## Viewer experience

English is the first-visit default. Select **اردو** in the navbar to read the full interface in Urdu; select **English** to switch back. A valid `?lang=en` or `?lang=ur` link overrides a saved choice. Without a valid parameter, the saved choice wins, then English. Selections are saved when browser storage is available. Existing query parameters and section hashes are retained, and browser back/forward updates the interface.

The switch is also available inside résumé and project-image dialogs. On mobile, the header contains the brand, language control, and menu; GitHub and LinkedIn remain available in the expanded menu. All section IDs and external destinations are unchanged.

## Content and state

- Complete authored Urdu copy covers section descriptions, case studies, navigation, controls, image alternatives, dialog names, validation, submission states, and error fallbacks. Names, official credentials, technology brands, source imagery, and the existing English PDF retain their original identity.
- `src/locales/en.js` and `src/locales/ur.js` are matching flat catalogues. UI message IDs use English source copy; case-study fields use stable `projects.<id>.<field>` keys. Update both catalogues when adding or changing copy. Unit checks enforce parity, interpolation parameters, static lookups, and project content coverage.
- `useLocale()` exposes `language`, `setLanguage(next)`, and `t(key, values)`. Unsupported languages are ignored. Missing messages fall back to English, then the message ID; required release content is checked for completeness.
- Project translations preserve stable IDs, image paths, dimensions, links, and preview index. Switching updates text in place without a locale-based React key or root remount.
- Contact validation returns stable error keys; the UI resolves them in the active language. Pending delivery, field values, errors, selected previews, open dialogs, focus restoration, and motion preferences survive language changes. The Web3Forms URL and request fields are unchanged.
- Browser title and description follow the selected language. The English canonical URL and static social/search metadata remain unchanged; no separate Urdu indexing or `hreflang` claim is introduced.
- The original English no-JavaScript fallback remains, with short Urdu instructions explaining that the switch needs JavaScript.

## Direction and typography

Document language/direction are initialized before React mounts and updated on every language selection. Urdu uses `lang="ur" dir="rtl"`. Content spacing is logical where appropriate; the navbar selection indicator retains its physical left-based coordinate origin and is remeasured after language/font changes. The ticker, sculpture coordinates, screenshots, logos, and technical names retain their natural orientation. Names and contact addresses use bidi isolation; interpolated names are isolated in Urdu messages.

Noto Nastaliq Urdu is self-hosted, licensed under the SIL Open Font License, uses `font-display: swap`, and includes Urdu glyphs. Urdu paragraphs use approximately 2.6 line height and normal tracking. English now uses Instrument Serif for display text and Manrope for interface/body text. See `audit/typography-upgrade.md` for the subsequent font upgrade. The English page's Urdu switch label uses a system fallback, so the bundled Urdu font is not downloaded until Urdu content needs it. A font-loading failure leaves readable system fallback text. Existing gradient high-contrast fallbacks and reduced-motion behavior are preserved.

## Verification

Initial bilingual release checks completed on 2026-10-11 (before the subsequent typography upgrade documented in `audit/typography-upgrade.md`):

- `npm.cmd run lint`: passed.
- `npm.cmd test`: 9 passed (contact delivery/validation and locale/catalogue coverage).
- `npm.cmd run build`: passed. Main JavaScript is approximately 301.7 KB (96.4 KB gzip); CSS is 47.1 KB (10.8 KB gzip). The existing lazy desktop 3D chunk is 883.5 KB (234.9 KB gzip).
- `npm.cmd audit --audit-level=low`: zero vulnerabilities across 214 packages.
- Browser regression coverage: all 14 existing checks passed; all 10 bilingual checks passed. An initial repeat run was interrupted by development hot reload and two non-motion tests exceeded the local software-rendering time budget. Those state tests now request reduced motion; all 10 bilingual tests passed on the clean rerun. Dedicated normal-motion checks remain enabled.
- Additional desktop frame comparisons confirmed ongoing animation in both languages and the same canvas DOM node after switching. The expanded Urdu mobile menu had zero automated accessibility violations; a mixed Urdu/English form and direct section link remained usable, with zero browser page errors.
- English/Urdu renders inspected at desktop and mobile sizes, including the 1024px desktop-navigation breakpoint. No clipped headings or horizontal overflow were observed. The self-hosted font is 94,032 bytes and is not fetched for the English-first page.

Browser coverage includes both languages at 320/390/768/1440px, persistence and direct links, invalid parameters, history, blocked storage, pending contact delivery and success/error states, open-dialog switching and focus, mixed-direction content, failed font, forced colors, reduced motion, ongoing motion, short mobile menus, and automated accessibility checks. Automated scans and browser emulation do not constitute full WCAG certification or physical iPhone testing.

Local comparison captures use ignored `audit/ios-bilingual-*.png` files. The existing optional desktop 3D bundle remains the largest transfer/render cost; no translation service or additional animation framework is introduced.

Rollback: revert the bilingual implementation commit to return to the gradient-only version `4951174` while preserving Git history.

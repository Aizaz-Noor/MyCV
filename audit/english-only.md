# English-only portfolio and hero resume

The language switch, translation catalogues/provider, preference/history handling, RTL styles, Urdu no-JavaScript notice, and Nastaliq font/license have been removed. Existing language query parameters or saved preferences are ignored; the document stays English and LTR. Instrument Serif and Manrope remain self-hosted.

Resume links were removed from desktop navigation, the mobile menu, About, and the error fallback. The hero still opens the accessible PDF viewer and offers its download. The static no-JavaScript hero retains its PDF link. Project images, motion controls, contact payloads, and dialog focus behavior remain unchanged. Contact validation and delivery messages are plain English.

Regression coverage checks legacy Urdu preferences/links, English fonts/errors, and hero-only resume access at 320, 390, 768, and 1440px. Existing tests cover contact delivery, accessibility, motion, graphics failure, no-JavaScript content, navigation, and preview focus.

Rollback baseline: `2224c6677e58924c746ad5132c1c245d1ea3588d` (before this removal).

## Verification

- `npm.cmd run lint`: passed.
- `npm.cmd test`: 4 contact tests passed, including English validation messages.
- `npm.cmd run build`: passed; the existing deferred 3D chunk size warning remains.
- `npm.cmd audit`: zero vulnerabilities.
- `npm.cmd run test:browser`: all 19 tests passed using installed Chrome, including responsive layouts, accessibility scans, motion, dialog focus, and contact delivery mocks.
- Inspected production-preview screenshots at 1440px and 320px, including the expanded mobile menu. No language control or navigation resume entry remains; hero resume access is retained.

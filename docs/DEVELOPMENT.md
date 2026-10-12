# Development notes

## Architecture and content

This is a client-rendered React application built as static files by Vite. `src/App.jsx` composes seven sections. Update project descriptions, links, screenshots, dimensions, and attribution together in `src/data/projects.js`. Biography and credential content live in `src/pages/`.

`src/services/contact.js` owns validation and delivery; browser tests mock delivery rather than sending messages. `src/services/contributions.js` fetches public GitHub activity when its section approaches the viewport. Provider availability and rate limits are external dependencies.

The résumé is `public/resume.pdf`; contact configuration is described in the root README. Preserve Search Console verification, social preview images, font licenses, and credential PDFs when changing assets.

## Motion and performance

The shared motion context manages the persistent pause preference. Its control is portalled to the document body to avoid ancestor clipping on long Safari pages, stays above safe-area insets, and remains visible as an explanatory reduced-motion indicator when device settings disable animation. Reduced motion, touch input, and unsupported masking receive appropriate portrait fallbacks. Pointer animation avoids React state updates on every move.

Eligible desktop home visits start importing WebGL during the logo introduction. Other section links defer loading until the artwork becomes visible. A transparent preview of the actual desktop sculpture is shown until the first rendered WebGL frame, then crossfades in 220ms. Mobile artwork is never used as a desktop loading placeholder. Mobile, reduced-motion, Save-Data, and constrained connections skip it. Graphics suspend offscreen and in hidden tabs; pagehide/pageshow also synchronize motion and viewport visibility after Safari page restoration. Animation timelines remain under CSS control so user pause and reduced-motion preferences continue to work. Mobile retains the original glass depth, animated ambient lights, all 16 particles, and an SVG orbital sculpture animated with 2D transforms. This avoids nested perspective layers on mobile Safari. Technology icons use one counter-rotating transform rather than separate parent/child animation clocks. Standard desktops use the original 180×28 sculpture surface and 1.5 maximum pixel density; constrained desktops retain a lighter tier. GitHub's detailed calendar rows mount only when expanded.

The HTML startup mark has a three-second fail-safe that reveals readable fallback content if application startup fails. Deep links skip the deliberate introduction delay.

The optional desktop graphics chunk still triggers Vite's size warning. Further performance work should begin with physical-device profiling and responsive image benchmarks. No Lighthouse score, native iPhone frame-rate result, or real-user Core Web Vitals result is claimed.

## Verification

Run the commands in the root README. The Playwright suite starts its server on port 4173 and covers 320, 390, 768, and 1440px layouts. To use installed Windows Chrome:

```powershell
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
npm.cmd run test:browser
```

For the focused touch-enabled WebKit checks (Safari engine):

```powershell
npx.cmd playwright install webkit
$env:PLAYWRIGHT_BROWSER = 'webkit'
npx.cmd playwright test e2e/mobile-motion.spec.js e2e/artwork-mobile.spec.js --reporter=list --output=test-results/webkit
Remove-Item Env:PLAYWRIGHT_BROWSER
```

CI runs both the complete Chromium suite and focused mobile WebKit checks. Automated accessibility checks and browser emulation supplement manual testing. Check keyboard navigation, focus restoration, 200% text zoom, high contrast, reduced motion, and a physical phone before significant visual releases. Mocked contact tests do not prove external message delivery.

Generated reports, local research, and social publishing materials are intentionally excluded from Git. Current screenshot attribution remains in `docs/project-image-provenance.json`.

## Desktop artwork preview

`public/artwork/desktop-sculpture.png` is a transparent capture of this project's actual Three.js artwork, not a separate design. It is preloaded only on desktop and is not requested by mobile browsers. Regenerate it after changing desktop geometry, lighting or materials:

```sh
npm run dev -- --host 127.0.0.1 --port 4173
# In another terminal, with Chromium installed or its executable path configured:
npm run artwork:poster
```

The generator defaults to the local server above; `ARTWORK_URL` can point to a local production preview. It only renders the portfolio and writes the preview image. Tests delay the desktop 3D module to verify its loading appearance, and check mobile sculpture movement, upright icons, pause, offscreen suspension, restoration events and real back navigation in Chromium and WebKit. These checks do not establish physical-device frame rates.

# Portfolio section refinements

## Requested changes

- Hero action shortened to **Resume**; hero remains its only entry point.
- Experience and education rebuilt as a connected, numbered timeline with genuine work/education icons, compact dates, clear role hierarchy, and staggered scroll entrances. Desktop uses paired cards; mobile uses a vertical timeline.
- About portrait uses a natural-color photo in an arched editorial frame with a signature and location caption. The original image file is unchanged.
- Selected projects use wide product-preview stages, clear preview selection, complete uncropped screenshots, visible full-size controls, and readable case-study columns below. Native screenshot dialogs and focus restoration remain intact.
- GitHub contributions restored below About with real daily counts, active-day totals, a keyboard-scrollable yearly heatmap, daily accessible table, profile link, retry handling, and an honest unavailable state. No made-up activity or credentials.

## Motion and performance

Reuse the existing IntersectionObserver/WAAPI Reveal component and motion preference context. Timeline cards enter once on scroll with a 70ms stagger; pause, reduced motion, hidden tabs and existing animations keep their behavior. Hover transforms are limited to fine pointers and enabled motion. No animation libraries added. Contribution data is requested only near the section, aborted after 10 seconds or unmount, and never blocks page rendering.

Data source: https://github.com/grubersjoe/github-contributions-api (public profile scraper, hourly provider cache). Runtime endpoint: `https://github-contributions-api.jogruber.de/v4/Aizaz-Noor?y=last`. Counts represent the provider's returned calendar, not a guarantee of public commits or coding time. The provider can be unavailable; the GitHub link remains usable.

## Verification scope

Unit checks reject malformed, duplicate and discontinuous contribution data. Browser regressions cover calendar success/failure/retry, daily details, timeline scroll entrances and pause behavior, mobile overflow, portrait loading, and screenshot dialogs. Existing checks cover contact delivery, navigation, no-JavaScript fallback, motion, graphics failure, and accessibility. Visual production screenshots are inspected on desktop and mobile; both real API data and deterministic mocked responses are checked.

Rollback baseline: `e27af06b4b9c784461a979cbb2317d2babc2a76b`.

## Results

- Lint and production build passed; the pre-existing deferred 3D bundle warning remains.
- All 6 unit tests passed. Dependency audit reported zero vulnerabilities.
- All 23 browser regressions passed at 320, 390, 768 and 1440px, including contact success/failure, native dialogs and focus, motion controls, graphics failure, no-JavaScript content and English-only behavior.
- Automated accessibility scans passed on desktop/mobile and with the loaded contribution calendar and expanded daily table. Forced-color mode retained readable calendar details.
- Inspected final desktop/mobile production screenshots of the timeline, portrait and project stage. A real browser loaded 365 actual contribution dates from the provider; no fixture data ships in the portfolio.
- Normal-motion desktop production check confirmed visible hero text and changing 3D canvas frames.

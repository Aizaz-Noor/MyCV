# Portfolio remediation record

Updated 1 October 2026. This record follows the [baseline audit](portfolio-audit.md). Effort estimates are engineering time for similar future work, not a claim about elapsed time. The user selected targeted visual polish, optional desktop 3D, verified assets only, and the public description “software engineering student and freelance developer; AIOps is an interest.”

## Prioritized plan and delivery

| Priority | Issue IDs | Planned work | Estimate | Result |
| --- | --- | --- | --- | --- |
| P1 | B01–B02 | Remove blocking loader; keep semantic fallback; isolate optional graphics | 0.5–1 day | Implemented |
| P1 | B03–B06 | Repair keyboard skill cards, credential actions, and resume dialog | 1–2 days | Implemented in source; browser keyboard pass pending |
| P1 | B16–B17, dependencies | Align public role, restore lint, update vulnerable packages | 0.5–1 day | Implemented; audit reports 0 vulnerabilities |
| P2 | B07–B09 | Trim and validate contact input, announce errors, bound request time | 0.5–1 day | Implemented; six focused tests cover contact and GitHub services |
| P2 | B10–B12 | Use honest GitHub counts and bounded chart fallback | 0.5–1 day | Implemented; chart starts its timeout when near the viewport |
| P2 | B13–B15 | Defer/disable 3D on constrained devices, honor reduced motion, restore anchor behavior | 1–2 days | Implemented; generated HTML no longer preloads 3D |
| P2 | Visual polish | Simplify first impression/contact, remove unsupported metrics, improve text and focus treatments | 1–2 days | Targeted changes implemented; screenshots and real-device review pending |
| P3 | B18–B19, maintenance | Remove unused timers/hooks/dependencies, correct README/runtime/license claim, add CI | 0.5–1 day | Implemented |

## Fix details

- **B01–B02:** Removed the blocking HTML and React preloaders. The no-JavaScript HTML now exposes the name, projects, email, and profile links. `App.jsx` gives graphics a null-fallback error boundary and gives each main section its own boundary; failures cannot replace the whole portfolio.
- **B03–B06:** Skill flips use native buttons and `aria-pressed`. Credential actions appear on keyboard focus and touch. The resume viewer uses native `dialog.showModal()`, takes initial focus, supports Escape, restores the trigger focus, and occupies the browser top layer above the navbar.
- **B07–B09:** Contact validation trims all user text, rejects empty/malformed fields, associates messages with the fields, and focuses the first invalid field. The form announces request status, retains input on failure, checks the provider’s explicit success response, and aborts after 12 seconds. Direct email remains available. The provider’s documented `botcheck` checkbox is included.
- **B10–B12:** GitHub metrics show zero correctly, aggregate all public-repository pages, and label stale or unavailable results. The chart has error and 10-second timeout states with a profile link, activated when the chart approaches the viewport.
- **B13–B15:** The 3D effect loads after idle time only on visible desktop browsers without reduced motion. The built HTML loads just the main JavaScript entry; the 3D chunk is separate. The shared motion hook disables JS effects, CSS covers pseudo-elements, and anchor links retain native hash behavior. The mobile navigation uses disclosure semantics and restores focus after Escape.
- **B16–B19:** Static HTML, metadata, hero, and experience now use the confirmed student/freelance description. Lint excludes the tool-owned `.kilo` worktree and passes without disabling the React rules. Unused preloader, hooks, and packages were removed; README has the correct repository and Node version and no unsupported MIT claim.
- **Dependency audit:** `npm audit fix` updated the lockfile within compatible ranges. `npm audit --audit-level=low` reported **0 vulnerabilities** on 1 October 2026. No `--force` upgrade was used.

## Validation and limits

- `npm run lint`: passed.
- `npm test`: 6/6 passed. Tests cover whitespace/malformed input, trimmed values and botcheck, provider success/failure, request timeout, zero-safe GitHub counts, pagination, and API failure.
- `npm run build`: passed on Vite 8.3.1. Main JavaScript: about 280 kB minified / 89 kB gzip; optional 3D: about 884 kB / 235 kB gzip. Vite still warns about the optional chunk size. These are generated-file estimates, not measured network transfers.
- Generated `dist/index.html` has no `modulepreload` link for the 3D chunk.
- `git diff --check`: passed.
- CI now runs install, lint, tests, build, and npm audit on pushes and pull requests. The new workflow itself has not run on GitHub yet.

No browser was available during this work. Screenshots, keyboard/focus behavior in a real browser, contrast over composited surfaces, WebGL failures, 320–1440 px layouts, 200% text zoom, and Web Vitals still require a browser pass. No live contact submission was sent, so recipient/delivery and provider-side spam settings remain unverified. The deployed Vercel site has not been updated by these local source changes.

Further design and architecture work should use verified project screenshots/case studies when supplied, consolidate duplicated static/React content through a build-time content source, and split the large global stylesheet when new component work justifies it. These are remaining enhancements rather than the B01–B19 defects above.

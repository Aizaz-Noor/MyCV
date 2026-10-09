# Motion-led portfolio correction

The editorial redesign at `6672b41` did not meet the requested level of visible motion: the hero was mostly static and 3D required an explicit click. This upgrade makes animation visible during normal browsing and restores recognizable technology icons.

## Implemented changes

- **Hero:** an automatically rotating, lit torus-knot sculpture with orbiting nodes and pointer-responsive camera movement. Loads lazily after idle time on desktop widths of 1024px and above. An animated CSS sculpture remains available on mobile or when graphics loading fails.
- **Ongoing motion:** orbiting React, Python, Node.js and TypeScript brand icons; floating code panels; moving technology ribbon; drifting background lights and particles; animated scroll cue.
- **Browsing interactions:** scroll-triggered section reveals, restrained heading parallax, pointer tilt on project previews and toolkit cards. Native page scrolling and direct links remain intact.
- **Real icons:** recognizable brand SVGs from react-icons for technologies, plus consistent navigation, social, and action icons. Adjacent labels provide meaning; decorative SVGs are hidden from assistive technology.
- **Controls:** a persistent Pause/Resume animations button remembers the visitor's choice in localStorage. System reduced-motion preferences disable motion. Decorative hero/ribbon loops pause offscreen; motion stops in hidden tabs. Observers, pointer handlers, scroll listeners and scheduled animation frames are cleaned up.
- **Accessibility fix:** the technology ribbon is a named, keyboard-focusable region, including when reduced-motion turns it into a static horizontal list.
- **Live-site correction:** clipped decorative horizontal overflow at the portfolio shell and contained ambient painting. Added regression coverage across multiple animation phases after pause/resume and scrolling; the initial reduced-motion layout checks did not expose this.
- **Cleanup:** removed the unused particle-tunnel implementation and updated the README and browser tests to match automatic graphics.

## Verification

- `npm.cmd run lint`: passed.
- `npm.cmd test`: 4 contact-validation/delivery tests passed.
- `npm.cmd run test:browser`: 10 tests passed using installed Chrome. Covers 320/390/768/1440px layouts, images and overflow, keyboard navigation, resume dialog focus, project previews, intercepted contact delivery, no-JavaScript content, blocked automatic graphics loading, ongoing motion, pause persistence, resume, offscreen suspension, animation-phase overflow checks at 320/390/768px, and axe desktop/mobile checks.
- `npm.cmd run build`: passed. The main JS is about 270 KB (88 KB gzip), CSS about 38 KB (9 KB gzip), and deferred 3D about 883 KB (235 KB gzip). Vite still reports its large-chunk warning for 3D; splitting it into smaller files would not remove the total transfer cost.
- `npm.cmd audit`: zero vulnerabilities.
- `git diff --check`: passed.

Automated accessibility checks are regression evidence, not a full WCAG certification. Graphics rendering is additionally reviewed in local Chrome with software WebGL. Video and screenshots are local ignored review artifacts rather than shipped application assets. Contact tests intercept requests and do not send real messages.

## Performance choices and limits

CSS handles ambient loops; the Web Animations API handles section entrances; requestAnimationFrame batches pointer and scroll updates. The 3D canvas caps device pixel ratio at 1.5 and uses a small star field with no post-processing or downloaded models. Its render loop stops offscreen or when paused. Eligible desktop visitors now download the deferred 3D bundle automatically, which deliberately increases visual presence and transfer cost compared with the previous opt-in version. Mobile and reduced-motion visitors do not request it.

The earlier `visual-upgrade.md` documents the first redesign and project-image provenance; this report supersedes its motion behavior descriptions. The pre-redesign state remains available at `d67c57f`; Git history is preserved for rollback.

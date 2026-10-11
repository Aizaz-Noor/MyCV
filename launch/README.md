# LinkedIn launch package

## Recommendation

Publish after a short physical-phone sanity check; do not hold the launch for every optimization on the backlog. Current responsive/interaction/accessibility checks and CI passed on the preceding application release. Further GPU and real-device performance work remains worthwhile. Do not claim a Lighthouse score or measured native-device frame rate.

If your phone shows broken navigation, unusable project previews, or consistently poor scrolling, address that before publishing. Otherwise, launch, invite specific feedback, and use measured issues for the next iteration.

## Ready-to-upload files

Generated locally in `launch/exports/`:

| File | Purpose |
| --- | --- |
| `aizaz-noor-portfolio-linkedin.mp4` | Silent 4:5 demo, 1080×1350, H.264, 30 fps, about 31 seconds |
| `01-cover.png` | Portfolio launch cover |
| `02-projects.png` | Actual project preview and case-study content |
| `03-portrait.png` | About section and pointer color reveal |
| `04-mobile.png` | Mobile home and project views |

The four PNGs are 1080×1350. Use the video for the launch post; keep the image set for a later implementation breakdown. See [captions and alt text](linkedin-captions.md). Review personal wording before publication. Engagement is not guaranteed.

The recording shows the actual production build, including desktop motion, project preview switching and enlargement, portrait pointer interaction, and mobile menu navigation. Branded labels are added around the screen recording. Non-hero desktop captures skip the offscreen 3D download to reduce capture overhead; their visible interfaces are unchanged. The mobile footage is Chromium emulation, not an iPhone screen recording. No real contact messages were sent. There is no music or voiceover; on-screen text makes the demo understandable without audio.

## Before publishing

1. Open the public site on your phone and a desktop. Check navigation, project screenshots, résumé opening, and scrolling. Contact delivery was tested with mocked responses; provider delivery remains dependent on its external configuration.
2. Watch the entire MP4, especially project switching and portrait movement. Confirm the content still matches the live site.
3. Review the caption for your voice and verify team attribution. Use one focused feedback question rather than promising results or asking for generic reactions.
4. Upload the MP4 as a native LinkedIn video and preview it on mobile. Keep links in the post, use a few relevant hashtags, and respond thoughtfully to substantive comments.
5. For the image follow-up, upload the four numbered images in order and add the provided alternative text where the composer allows it.

The assets meet LinkedIn's published video format, resolution, aspect-ratio, duration, and frame-rate ranges. The final upload still needs LinkedIn processing: [LinkedIn video requirements](https://www.linkedin.com/help/linkedin/answer/a551346).

## Regenerate

Requires the project's npm dependencies, Playwright Chromium or installed Chrome, Python 3, and `ffmpeg`/`ffprobe` on PATH. No new application runtime dependencies were added.

```powershell
npm.cmd run build
npm.cmd run preview -- --host 127.0.0.1 --port 4174 --strictPort
```

In another terminal:

```powershell
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
node scripts/capture-launch.mjs
node scripts/render-launch-cards.mjs
python scripts/render-launch-video.py
```

Set `PORTFOLIO_CAPTURE_URL` to capture another deployment. Generated recordings, cards, and intermediate files are ignored by Git. README screenshots under `docs/images/` are versioned. Capture manifests and ffprobe metadata accompany the local exports.

## Validation scope

Capture assertions verify the hero, screenshot dialog, pointer reveal, mobile footer, and mobile overflow. The initial desktop capture reported no uncaught page errors. Visual inspection covers the image set and sampled video frames; ffprobe verifies codec, dimensions, duration, and frame rate. This does not measure real-user Core Web Vitals or native Safari rendering. The video uses the website's existing animations without artificially accelerating them.

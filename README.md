# Aizaz Noor portfolio

The source for [aizaznoorkhuwaja.vercel.app](https://aizaznoorkhuwaja.vercel.app/). This is a static React 19 and Vite portfolio for a software engineering student and freelance developer. It presents selected projects, experience, skills, credentials, and contact options.

The page works without WebGL. On visible desktop browsers that allow motion, an optional Three.js background loads after the main content has had idle time. Mobile and reduced-motion visitors see the static background. The HTML contains a readable no-JavaScript fallback with project and contact links.

## Run locally

Requires Node.js `^20.19.0 || >=22.12.0` and npm.

```powershell
git clone https://github.com/Aizaz-Noor/MyCV.git
cd MyCV
npm ci
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). On Windows PowerShell installations that block `npm.ps1`, use `npm.cmd` for the commands above.

## Checks

```powershell
npm run lint
npm test
npm run build
npm audit
```

`npm run preview` serves the production build for a local check. The audit and remediation notes are in [`audit/portfolio-audit.md`](audit/portfolio-audit.md) and [`audit/remediation.md`](audit/remediation.md). The original audit evidence is stored in the same folder.

## Architecture and integrations

- `src/pages/` contains the portfolio sections. `src/components/` contains shared presentation and effects. `src/services/` holds contact and GitHub request logic.
- Navigation uses ordinary section links. The résumé viewer uses a native modal dialog; `/resume.pdf` remains downloadable directly.
- The contact form submits through [Web3Forms](https://docs.web3forms.com/getting-started/api-reference). Its browser access key may be supplied with `VITE_WEB3FORMS_ACCESS_KEY`. The form also includes the current public fallback key. Browser keys are public; configure provider-side restrictions and abuse controls in the provider dashboard. Do not place server secrets in `VITE_` variables.
- GitHub counts come from the public GitHub API, including repository pagination. Cached counts are identified as stale when refresh fails; unavailable data is never replaced with invented numbers.
- The contribution chart is supplied by `ghchart.rshah.org`; a GitHub profile link appears if the chart fails.
- The site is deployed as static files on Vercel. Vercel project settings and the contact recipient account are managed outside this repository.

## Manual verification

After a deployment, check the homepage at 1440, 768, 390, and 320 CSS-pixel widths. Tab through navigation, skill cards, credential links, and the résumé dialog. Test Escape and focus restoration. Repeat with reduced motion enabled, JavaScript disabled, and a blocked graphics request. Mock contact success, error, and timeout before sending any real message. Check the form and long email address at 200% text zoom.

Project performance claims and public biography text should be backed by examples or verified records before publication. This repository does not currently declare a software license.

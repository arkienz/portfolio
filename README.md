# Portfolio

The personal portfolio and marketing site of Mark Angelo Pasion, a software developer in the
Philippines. It presents four apps: Easy Payroll (DevPAYROLL) and DevPOS as featured work with
screen galleries, plus Kaha (DevGCASH) and DevPAUTANG, and asks visitors to request a free demo.
It's for small-business owners, HR and payroll staff, and anyone reviewing the work.

**Main design constraint: static and private by default.** The site is plain HTML built at deploy
time: no server code, no forms, no accounts, no analytics and no cookies. Not affiliated with
GCash, SSS, PhilHealth, Pag-IBIG (HDMF), BIR or DOLE.

Live: https://portfolio.arkienzkun.workers.dev

## What it does

**Pages**
- Home:
  - A 3D intro: a flat page of 12 app screens (payslip, GCash notice, shift calendar, sales chart,
    collection route and others) tilts back into a floor and breaks into lifted tiles as you scroll,
    with four headlines fading in step. Scrolling back reverses it.
  - A one-sentence contents line, then a chapter per app, each printed on the paper it replaces:
    Easy Payroll on a payslip, DevPOS on a cafe receipt, Kaha on a GCash ledger page and
    DevPAUTANG on a lined notebook page. The papers show sample data, and their totals are
    computed from their lines (`src/components/papers/money.ts`).
  - Easy Payroll and DevPOS chapters end in an expanding panel gallery of six screens each
    (hover, focus or tap a panel to open it).
  - A short "who's behind it" line, and a contact card whose email button follows the app you pick.
- Privacy notice (`/privacy/`) under the Data Privacy Act (RA 10173).
- A custom 404 page served with a real 404 status.

**Look and accessibility**
- Light and dark mode (follows the system, with a toggle that remembers the choice in the browser).
- Reduced motion shows the 3D intro's finished layout with no scroll-driven move; without WebGL it
  falls back to a plain text hero.
- Skip link, landmarks, alt text on every image, AA contrast in both themes, a 3:1 focus ring.

**Speed, search and sharing**
- Images converted to WebP at several sizes at build time (16-97 KB each); one self-hosted font,
  preloaded.
- The 3D intro loads as its own script chunk after the page (Three.js, about 120 KB gzipped);
  the rest of the page script is about 1 KB.
- Title, description, canonical URL, sitemap, robots.txt, and Open Graph / Twitter tags with a
  1200px banner preview.

**Security**
- Content Security Policy with hashes for every inline script and style (Astro `security.csp`).
- HSTS, `frame-ancestors 'none'`, `X-Frame-Options`, `nosniff`, `Referrer-Policy`,
  `Permissions-Policy` and `Cross-Origin-Opener-Policy` from `public/_headers`.

## Tech stack

| Part | Package / service | Version |
|---|---|---|
| Site generator | `astro` | 7.4.0 |
| Styling | `tailwindcss`, `@tailwindcss/vite` | 4.3.3 |
| Sitemap | `@astrojs/sitemap` | 3.7.4 |
| 3D intro | `three` | 0.170.0 |
| Type check | `@astrojs/check`, `typescript` | 0.9.10, 5.9.3 |
| Font | Plus Jakarta Sans (variable woff2, SIL OFL 1.1) | |
| Hosting | Cloudflare Workers static assets, deployed with `wrangler` | |
| Runtime | Node.js | 24 |

## Project layout

- `src/data/site.ts`: all copy, project details, contact details and image imports. Edit text here.
- `src/pages/`: `index.astro` (home), `privacy.astro`, `404.astro`.
- `src/layouts/Base.astro`: the page shell, head tags, theme and scroll-reveal scripts.
- `src/scripts/floor.js`: the 3D intro (tile drawing, scene, scroll animation, cleanup).
- `src/styles/global.css`: Tailwind import, color tokens for light and dark, the font, intro layout.
- `src/assets/payroll/`, `src/assets/pos/`: marketing images copied from
  `D:\Repos\DevPAYROLL\docs\marketing\en` and `D:\Repos\DevPOS\docs\marketing\raket`.
- `src/components/`: `PanelGallery.astro` and `papers/` (payslip, receipt, ledger, notebook).
- `mockup/` (not in git): the approved clickable mockups (`v2.html` is the current design).
- `public/`: files served as-is: `_headers`, `robots.txt`, `favicon.svg`, `fonts/` (font + `OFL.txt`).
- `wrangler.jsonc`: Cloudflare deploy config (serves `dist/`, uses `404.html` for unknown paths).
- `.claude/agents/site-auditor.md`: a read-only agent that audits the built site before publishing.
- `.claude/skills/publish-site/`: the one-step publish skill (scan, build, deploy, check, commit, push).
- `docs/`: the pre-deploy checklist results.

## Build and run

Requires Node.js 24. On Windows PowerShell, use `npm.cmd` / `npx.cmd` if script execution is
blocked.

```bash
npm install          # once
npm run dev          # local preview at http://localhost:4321
npm run build        # type check + build to dist/
npm run preview      # serve the built dist/ locally
```

Deploy to Cloudflare (first time: `npx wrangler login`, which signs in through the browser):

```bash
npm run deploy       # build + deploy in one command
```

Or, in a Claude Code session opened in this folder, run `/publish-site`
(`.claude/skills/publish-site/`): it scans for secrets, builds, deploys, checks the live site,
then commits and pushes.

No secrets or keys are needed to build. Wrangler keeps its Cloudflare sign-in in the user profile,
never in this repo.

To change the site address (for example after adding a custom domain), update `site` in
`astro.config.mjs` and the `Sitemap:` line in `public/robots.txt`.

## Other docs

- [Pre-deploy checklist](docs/pre-deploy-checklist.md): security, legal, SEO and accessibility
  results, newest run first.
- [Privacy notice](src/pages/privacy.astro): the source of `/privacy/`.
- [Site auditor agent](.claude/agents/site-auditor.md).

## Project status

**Works:** home, privacy and 404 pages are live; security headers and CSP are verified on the
deployed site; `npm audit` reports 0 vulnerabilities.

**Next:**
- Screenshots for Kaha and DevPAUTANG (they are fact cards without images now).
- A custom domain, and auto-deploy on `git push` by connecting GitHub in Cloudflare.

**Open before wider promotion:**
- A Philippine lawyer reviews the privacy notice (it is a draft).
- Confirm the Cloudflare account is on the Workers Free plan.
- A hand check at phone, tablet and PC widths and a keyboard walk-through; one Lighthouse run.

## License

Proprietary. Copyright (c) 2026 Mark Angelo Pasion. All rights reserved. The Plus Jakarta Sans
font is licensed separately under the SIL Open Font License 1.1 (`public/fonts/OFL.txt`).

# Pre-deploy checklist

## 2026-10-19, v0.1.0 (commit 78092c9 + uncommitted privacy/headers changes, live version 283ccf0e)

App shape: static Astro site on Cloudflare Workers static assets (https://portfolio.arkienzkun.workers.dev). No server code, no accounts, no forms, no database, no file storage, no paid API, no AI model. Repo arkienz/portfolio is PUBLIC.

| # | Item | Result | Evidence |
|---|------|--------|----------|
| 1 | Access rules per row | pass | No data store or API: `wrangler.jsonc` serves only `./dist`; `/api` returns 404 |
| 2 | No secrets shipped | pass | grep for `sk_live_`, `ghp_`, `AKIA`, `AIza`, `sk-ant-`, private keys, passwords over repo and `dist`: 0 hits; `git log -p --all`: 0 hits; no `.env`/key/db files tracked |
| 3 | Storage locked down | pass | No buckets or uploads; only static assets |
| 4 | Spend cap / rate limit | open (small) | Nothing metered is called. Confirm the account is on the Workers Free plan (hard cap 100k requests/day, no overage bill) under Compute > Workers plans; if Paid, set a billing alert |
| 5 | AI input/output | N/A | No AI model |
| 6 | Legal | open (lawyer review); claims and font license fixed | Privacy notice live at `/privacy/` (src/pages/privacy.astro), matches what the site does (no cookies: `curl -I` has no Set-Cookie; theme in localStorage, disclosed). Still a draft for lawyer review. Terms of Use: not needed, the site offers no service to accept. NPC registration: not required (individual, no sensitive PI). Not-affiliated lines: index.astro footer and the payroll screens note. **Claim that fails:** DevPOS "Every checkout action works with zero internet" (site.ts:58), but QR Ph via PayMongo needs internet (DevPOS README:24-28). **Unproven:** "I build and sell apps" (site.ts:27) while all products are in development. Font Plus Jakarta Sans (OFL) ships without its license notice. Other claims checked: see table below |
| 7 | Sign-in, sessions, routes | N/A | No server, no accounts |
| 8 | Untrusted input/output | pass | No inputs or forms; all content is build-time from src/data/site.ts |
| 9 | Browser/transport hardening | pass | `curl -I`: HSTS, CSP (frame-ancestors 'none', object-src 'none'), X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP; script/style CSP via Astro hashed meta tag (astro.config.mjs `security.csp`). Plain `http://` returns 200 to curl, but `.dev` is on the browsers' HSTS preload list so browsers never load it over HTTP. No CORS, no third-party scripts |
| 10 | Production config, exposure, deps | pass | `/.git/config`, `/.env`, `/package.json`, `/wrangler.jsonc`, `/src/data/site.ts`, `/node_modules/`, `/_headers` all 404; no source maps in dist; `npm audit`: 0 vulnerabilities; no debug pages |
| 11 | Public site basics | fixed (og tags, 404); Lighthouse not run | Pass: unique title + description per page, canonical, sitemap with both pages, robots.txt, favicon, 8/8 images have alt, links work (github 200, cloudflare privacy 200), images 16-97 KB WebP. Open: no `og:image`/`og:url`/twitter card (Base.astro:17-19); no custom 404 (blank body); Lighthouse not run |
| 12 | Accessibility and look | fixed (focus ring); look notes optional | Pass: contrast light (muted 5.96-6.33, link 6.31-6.70), dark (7.12-8.92), accent button 11.55, navy card text 6.49-10.11; heading order, landmarks, skip link, reduced motion. Open: focus ring #ffc447 on light page is 1.49:1, needs 3:1 (global.css:45); theme button text "Theme" differs from its aria-label (index.astro:15); uppercase eyebrow over every section heading reads as template. Not checked: real screen widths and keyboard walk-through in a browser |

Claims on the site and their evidence:

| Claim | Evidence | Result |
|---|---|---|
| Night OT at 150/h is 206.25 multiplied, not 202.50 | 150 x 1.25 x 1.10 = 206.25 | pass |
| Net pay never below zero, signed rate packs, server-stamped clock-in, shift types | DevPAYROLL README:5,45-47,55-56 | pass |
| Evaluation version available | DevPAYROLL README:88; contact card | pass |
| Money tested on the boundaries | DevPayroll.Api.Tests/OvertimeEstimateTests.cs, FixedPeriodPayEndpointsTests.cs | pass |
| Kaha: no server, no accounts, encrypted on device | DevGCASH README:13,53 | pass |
| DevPAUTANG pre-release 0.8.0, routes and reminders | DevPAUTANG README:9,14 | pass |
| DevPOS: Cash and GCash checkout work offline, QR Ph needs a connection | DevPOS README:24-28 | fixed |
| "I build apps" | the four repos | fixed |

Fixed in this run (user asked; built locally, verified in dist, not yet redeployed):
- DevPOS claim now "Cash and GCash checkout work with zero internet (QR Ph needs a connection)" (site.ts:58); hero says "keeps selling with no internet".
- "build and sell" changed to "build" (site.ts:26).
- Focus ring uses --color-link (light 6.31:1, dark 8.92:1), accent on the navy card (10.11:1) (global.css:45-47).
- og:url, og:image (1200px JPEG, 88 KB), og:image:alt, twitter:card summary_large_image (Base.astro).
- Custom 404 page (src/pages/404.astro) served with 404 status via `not_found_handling: "404-page"` (wrangler.jsonc); not in sitemap.
- Font license shipped at /fonts/OFL.txt and credited in the footer (index.astro); footer links /privacy/ directly.

Still open:
1. Confirm the Workers Free plan (owner).
2. Lawyer review of the privacy notice (owner).
3. Check screen widths and a keyboard walk-through by hand; run Lighthouse once.

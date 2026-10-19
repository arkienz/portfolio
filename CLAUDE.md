# Portfolio (CLAUDE.md)

Mark Angelo Pasion's portfolio and marketing site: Astro 7 + Tailwind 4, static, deployed to
Cloudflare Workers (`https://portfolio.arkienzkun.workers.dev`). See `README.md` for layout and
commands. Publish with `/publish-site`.

## License and disclaimer check (owner's standing rule, always)

Before applying any change that adds or swaps something made by someone else, check its license
and the disclaimers it needs. **If it doesn't pass, don't apply it**: say what failed and offer an
alternative that does pass. The owner's accounts (GitHub, Cloudflare, stores) must never be put at
risk by a license, trademark or content violation.

What counts and what to check:

- **Code libraries (npm packages, snippets, CDN scripts).** Read the package's own LICENSE.
  Allowed: MIT, ISC, BSD-2/3, Apache-2.0. Not allowed without asking: GPL/AGPL/LGPL, "non-commercial",
  no license, or custom terms. A new runtime dependency must be added to the `reviewed` list in
  `scripts/licenses.mjs` (the build fails otherwise), and anything that ships to visitors must have
  its notice in the generated `/licenses.txt`. No runtime CDN scripts (CSP and supply-chain risk).
- **Copied or adapted code from a page, gist or answer.** Same license rule; if the source has no
  clear license, write it from scratch instead.
- **Fonts.** OFL or Apache only, with the license file shipped (`public/fonts/`), and the copyright
  line checked against the font's official repo. No fonts lifted from other sites.
- **Images, icons, illustrations, video.** Only the owner's own marketing assets (DevPAYROLL,
  DevPOS, ... `docs/marketing`) or assets with a license that allows commercial use and is recorded.
  No images from search results, no stock without a license, no AI images imitating a real brand.
- **Other companies' names and logos.** Names only to describe what the apps work with (GCash,
  QR Ph, SSS, PhilHealth, Pag-IBIG, BIR, DOLE, ...), never their logos, colors as a brand, or anything
  implying partnership. Every new name goes into the footer's "not affiliated with or endorsed by"
  line in `src/pages/index.astro`.
- **Sample data.** Fictional and marked "Sample data"; receipts say "Not an official receipt";
  no real customer, employee or phone/email data except the owner's approved contact card in
  `src/data/site.ts`.
- **Claims.** Every claim on the page must be true today and provable from the app repos
  (`D:\Repos\<app>\README.md`); unprovable claims are reworded or removed.

Record a check that changed something in `docs/pre-deploy-checklist.md`.

## Other project rules

- All copy, contact details and image imports live in `src/data/site.ts`.
- The CSP blocks inline `style` attributes: put per-element values in CSS, not `style="..."`.
- Money on the sample papers is computed from line items in centavos
  (`src/components/papers/money.ts`), never typed in as totals.
- `mockup/` is git-ignored; approved designs get built into `src/`, then the mockup stays as reference.

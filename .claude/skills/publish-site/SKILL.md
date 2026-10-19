---
name: publish-site
description: Build, deploy and save the portfolio in one go - scan for secrets, build, deploy to Cloudflare with wrangler, check the live site, then commit and push to GitHub. Use when the user says "publish", "deploy", "ship it", "put it live" or runs /publish-site. Takes an optional commit message.
---

# Publish the portfolio

Running this skill is the user's explicit request to deploy, commit and push this repo
(the global git rule allows a commit/push when the user asks, after the sensitive-data scan).
It covers only `D:\Portfolio`. Use the Bash tool (Git Bash), where `npm` and `npx` work
without the PowerShell script policy problem. Stop at the first failing step and say why.

## Steps

1. **See what's changing.** `cd /d/Portfolio && git status --short`. If nothing changed
   and the live site already matches, say so and stop.

2. **Sensitive-data scan (top priority, never skip).** Over the changed and untracked files:
   - `git diff HEAD --name-only` plus `git ls-files --others --exclude-standard`; stop if any
     path matches `.env`, `*.pem`, `*.key`, `*.pfx`, `*.db`, `*.sqlite`, `*.bak`, `*.dlvault`.
   - `grep -rInE "sk_live_|sk_test_|ghp_|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{30}|sk-ant-|BEGIN [A-Z ]*PRIVATE KEY"`
     over those files; stop on any hit.
   - Contact details in `src/data/site.ts` are the owner's approved public card; anything
     else that looks like a real person's phone or email gets flagged and asked about.
   - Note the repo visibility: `gh repo view arkienz/portfolio --json visibility -q .visibility`.
   Report in one line: "checked: no secrets, keys, databases or personal data (repo PUBLIC)".

3. **Build.** `npm run build`. It runs `astro check`; any error stops the publish.

4. **Deploy.** `npx wrangler deploy`. If it says not logged in, stop and tell the user to run
   `npx.cmd wrangler login` in PowerShell (the sign-in is theirs), then rerun the skill.
   Record the Version ID from the output.

5. **Check the live site** (`https://portfolio.arkienzkun.workers.dev`):
   - `/` returns 200 and the `<title>`; `/privacy/` 200; `/nope` 404 with the custom page.
   - `curl -sI` shows `strict-transport-security` and `content-security-policy`.
   If any check fails, report it and do not commit.

6. **Commit and push.** `git add -A`, then commit with the user's message if they gave one,
   otherwise one short line written from the diff (what changed, not how). End the message
   with the attribution line from the current system reminder, if one is given. Then
   `git push`. The global pre-push hook runs its own secret scan; never pass `--no-verify`.
   If the hook blocks, report its output and stop.

7. **Report** in a few lines: deployed version, live checks passed, commit hash and message,
   pushed. Then the one thing worth checking by hand if the change was visual (e.g. "scroll
   the intro on your phone").

## Don'ts

- Don't deploy from a failing build or commit a change that failed the live check.
- Don't touch `mockup/` (it's git-ignored) or anything outside `D:\Portfolio`.
- Don't run `wrangler login`, change Cloudflare settings or force-push.

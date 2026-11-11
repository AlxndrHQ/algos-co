# Algos & Co. website: handoff

Algos & Co. is a "DMV Builder Collective" for tech professionals, creators and engineers in DC, Maryland and Virginia, built around cert study groups, build sprints, a talent exchange and social meetups. This repo is its public marketing website: a small static site that points visitors to the Discord and to real events on Posh and Luma. A local Xcode project that wraps the site as an iOS app also sits in this folder, but it is not tracked by this repo.

## Links

- Live site: https://algosandco.com (`www` redirects to it; the old https://alxndrhq.github.io/algos-co/ also redirects)
- GitHub repo: https://github.com/AlxndrHQ/algos-co (public, GitHub Pages from `main`, root folder)
- Discord invite (permanent): https://discord.gg/VAQPV9jksP
- Posh event: https://posh.vip/e/algos-co-builders-workshop · Posh group: https://posh.vip/g/algos-co
- Luma event: https://luma.com/1qxb9px8

## Current state (as of 2026-11-10)

- The redesigned site is live, matching the brand's social carousel posts: giant gold-to-blue gradient words (Build, Certs, Roles, Meet, Events, Pass), small gold caps labels, "01 / 05" section counters, and thin rules.
- Header: the "A&" monogram box plus the "Algos & Co." wordmark, both in self-hosted Playfair Display. The "DMV Builder Collective" tagline shows beside the name on desktop and is hidden on phones.
- The site follows the device's light/dark setting live. There is no saved theme preference.
- Calendar: the only event is the Builders Workshop on 2026-10-21 (Potomac District Café, Gaylord National). That date has passed, so the site shows it as past and there are no upcoming events. When nothing is upcoming, the hero button says "Join the Discord". When an event is upcoming, it switches to "RSVP on Posh".
- Pass section: all passes show "Coming soon" with no prices, because no passes exist yet.
- Cert track rows link to the official AWS AI Practitioner, CompTIA Security+ and AWS Well-Architected pages. The "Meet" rows (Co-working, Socials, Fireside chats) link to the Posh group. A cloud session made this change and the main session pushed it on 2026-11-08.
- The site has Privacy and Terms pages (`privacy.html`, `terms.html`) that describe what the site actually does: no cookies, no tracking, no forms. Both list a contact email for requests.
- Security: every page sets a strict Content-Security-Policy meta tag (`default-src 'self'`, no external scripts, `form-action 'none'`, `upgrade-insecure-requests`), and all fonts are self-hosted. HTTPS is enforced on GitHub Pages. The domain has the GoDaddy transfer lock and domain privacy turned on, and it is registered through 2029-10-03.
- Git: local `main` is **1 commit ahead of origin** ("Ignore macOS .DS_Store files", which adds `.gitignore`, made 2026-11-10). It has not been pushed yet. The `Algosandco/` Xcode folder is untracked.
- Rollback point: the git tag `v1-original` (pushed to GitHub) holds the pre-redesign site.

## How it's built

Stack: plain HTML, CSS and vanilla JS. There is no build step, framework or backend. It is hosted on GitHub Pages with the custom domain set in `CNAME`.

Files:
- `index.html`: home page (hero, tracks, calendar, pass, FAQ, closing Join Discord call to action, footer).
- `privacy.html`, `terms.html`: Privacy Policy and Terms of Use.
- `assets/site.css`: shared styles for all three pages, including the light/dark tokens.
- `assets/site.js`: the site's content and logic. It holds the `CONFIG` block (Discord invite and Luma URL), the `EVENTS` list, the `TRACKS` data and the `FAQ` items, and it renders the calendar, marks past events and switches the hero button between RSVP and Discord.
- `assets/fonts/`: `inter-latin.woff2` (body text), `playfair-latin.woff2` (logo) and their OFL licence files.
- `CNAME`: `algosandco.com`.
- `.gitignore`: ignores `.DS_Store` (not pushed yet).
- `Algosandco/` (untracked, has its own nested git repo with no remote): an Xcode/SwiftUI iOS app. `ContentView.swift` loads https://algosandco.com in a `WKWebView` and falls back to a bundled copy of the site in `Algosandco/site/` when offline or slow. Links to Discord, Posh and Luma open in Safari.

Run locally: serve the folder with any static server, for example `python3 -m http.server 8790`, and open `http://127.0.0.1:8790`. Use `127.0.0.1` rather than `localhost`. Safari remembers the live site's HTTPS upgrade rule for `localhost` and the page then loads with no styles. For a local preview copy only, drop `upgrade-insecure-requests` from the CSP.

Deploy: commit and `git push` to `main`. GitHub Pages rebuilds in about a minute.

Adding an event: add an entry to `EVENTS` in `assets/site.js` with `date` (YYYY-MM-DD), `title`, `venue`, `track`, `posh` and/or `luma`. Events do not sync automatically from Posh or Luma.

## Decisions and conventions

- **Only show real things.** Placeholder Discord channels, invented calendar events and pass prices were removed. Only events that actually exist on Posh or Luma go on the calendar, so visitors are not told about events that aren't happening. Passes stay "Coming soon" until they are real.
- **No Discord channel tags.** Real channel lists were added once and then removed at the user's request. The Discord popup is just one line and an "Open Discord invite" button, which looked cleaner.
- **Use the permanent Discord invite** `VAQPV9jksP`. If it changes, update `CONFIG.discordInvite` in `site.js` and the hard-coded `href`s in the HTML.
- **Prefer Posh** for RSVPs. Luma is secondary.
- **Theme follows the system.** The user asked for the page to be dark when the device is dark and light when it is light. The light palette matches the user's SemiConductor Earnings Breakdown site.
- **Logo:** Playfair Display for both the wordmark and the "A&" monogram (the user said it was the original typeface). Keep the monogram, because the wordmark alone looked "naked" to the user. Keep "A&" rather than "A&Co." in the box: the longer text doesn't fit the 28px box and repeats the name beside it. The tagline is hidden on mobile.
- **Self-host fonts** and load no third-party scripts, so the strict CSP holds and the fonts look the same on every device.
- **Cache-busting:** stylesheet and script links carry a version query (currently `site.css?v=20261107a`). Bump it in all three HTML files whenever CSS or JS changes, so phones pick up the change immediately.
- **Show mockups before pushing design changes.** The user reviews local previews (desktop and phone frames, light and dark) and approves before anything goes live.
- **Separate repos for apps.** Algos OS, the user's Python "operational middleware" proof of concept, was deliberately kept out of this repo. Everything here is served publicly by GitHub Pages, and an app with code, keys or a backend should be private. It lives in its own "Algos OS" folder in iCloud Drive, which has its own `CLAUDE.md` handoff. The planned repo is a private `AlxndrHQ/algos-os`, to be created only after the user confirms.
- Creating public repos and turning on Pages needs the user's direct approval, because auto mode blocks it.

## Open items

1. **Push the pending `.gitignore` commit** (local `main` is 1 ahead of origin).
2. **Add the next real event** to `EVENTS` in `assets/site.js`. The calendar currently has no upcoming events.
3. **Decide what to do with the `Algosandco/` iOS app.** It has its own git repo with no remote, uncommitted changes to `ContentView.swift` and the project file, and an untracked `site/` copy. Questions: should it get its own (private) GitHub repo? Is it meant for the App Store? The bundled `site/` copy will go stale as the live site changes.
4. Optional: auto-list events with a Luma calendar. The current Luma link is a single event, not a calendar. Claude proposed creating an "Algos & Co." Luma calendar so events could be pulled in automatically; the user hasn't decided.
5. Deferred by the user: Cloudflare Web Analytics. It would need the CSP and the Privacy page updated, since the policy currently says the site does no tracking.
6. Deferred by the user: add the GitHub Pages domain-verification TXT record for algosandco.com.
7. Optional: a browser-tab icon in Playfair to match the monogram. The favicon still uses a monospace "A&".
8. Question: did the Cowork session's updated `index.html` (2026-10-11) contain edits besides the Discord link? Only the link change was applied, because the file never reached this machine.
9. Group 2 "2027 Builder Roadmap" Track B prompt test (2026-10-10). It was built as a private Claude artifact (https://claude.ai/artifact/TP9ej3rUbj6rD2ELynfZ71) and is not part of this repo. Claude found that the prompt leaves gaps, such as how weekly hours should change the roadmap. Question: does the prompt need tightening before groups use it?

## Session log

- 2026-10-03: Created the git repo and the public GitHub repo `AlxndrHQ/algos-co`, turned on Pages, and removed a stray `~/.git` from the home folder (moved to Trash). Connected algosandco.com (DNS, HTTPS, enforced HTTPS). Trimmed the site to real events, added a light mode, then made the theme follow the system setting and rolled back the Discord channel tags.
- 2026-10-05: The user accidentally started Historical Wealth Mind Map setup from this session. No changes were made in this repo, and that work moved to its own folder.
- 2026-10-10 to 10-11: Tested the Group 2 "2027 Builder Roadmap" prompt as a Claude artifact. Swapped the Discord invite to `VAQPV9jksP` and pushed it.
- 2026-10-26 (main session): Rebuilt the site in the style of the brand's social posts (tag `v1-original` saved first). Added the Privacy and Terms pages, the contact email, self-hosted Inter and Playfair, the CSP, cache-busting version tags, the Playfair wordmark and "A&" monogram, and the tagline hidden on mobile. Checked the domain lock and GitHub 2FA.
- 2026-10-27: Advised a separate private repo for Algos OS, wrote a `CLAUDE.md` handoff in the Algos OS folder, and installed Homebrew Python 3.15.
- 2026-11-08: Pushed a cloud session's commit that links the cert rows to official cert pages and the Meet rows to the Posh group, and bumped the asset version.
- 2026-11-10: A `.gitignore` for `.DS_Store` was committed locally (not pushed), and this handoff was written.

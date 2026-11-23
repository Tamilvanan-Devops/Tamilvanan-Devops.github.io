# Tamil Vanan — Portfolio

**Live:** https://tamilvanan-devops.github.io · Repo: https://github.com/Tamilvanan-Devops/Tamilvanan-Devops.github.io

A static portfolio in plain HTML, CSS and JS with no build step. It's hosted free on **GitHub Pages** and served on a custom domain from **Cloudflare**.

It includes **four complete designs** that all read the same content file, so you edit your details once.

| Design | Style | Preview |
|---|---|---|
| `orbit` | Dark, cinematic, animated globe (closest to anishshettyk.com) | `/designs/orbit/` |
| `executive` | Light editorial, serif, sticky sidebar (recruiter-friendly) | `/designs/executive/` |
| `console` | Terminal/IDE: typed kubectl, project table, git-log career | `/designs/console/` |
| `bento` | Modern bento grid, project modals, light/dark toggle | `/designs/bento/` |

```
assets/content.js          # ALL your content: profile, metrics, projects, experience, skills
assets/shared.js           # helpers shared by every design (icons, links, scroll-spy)
designs/index.html         # gallery that compares all four designs side by side
designs/<name>/            # index.html + style.css + app.js for each design
index.html                 # the live home page (generated from your chosen design)
scripts/use-design.sh      # promotes a design to index.html
scripts/build-resume.sh    # rebuilds assets/Tamil-Vanan-Resume.pdf from resume.html
scripts/build-og-image.sh  # rebuilds assets/img/og-card.png (link-preview image) from scripts/og-card.html
resume.html                # printable resume generated from content.js
.github/workflows/deploy.yml
```

## Preview locally

```bash
cd ~/Projects/portfolio-site
python3 -m http.server 8080
# gallery:   http://localhost:8080/designs/
# home page: http://localhost:8080/
```

## Choose the home-page design

```bash
./scripts/use-design.sh executive   # or orbit | console | bento
```

This rewrites `index.html`. Run it again whenever you change your mind; the other designs stay available under `/designs/`.

## Edit your content (`assets/content.js`)

Already set: LinkedIn, email (`tamilvananaws@gmail.com`) and profile photo (`assets/img/profile.jpg`, the public 200×200 LinkedIn image).

Total experience (shown as "8+ years across 3 companies") and each role's duration are **calculated automatically** from the `experience` periods, so they stay current. You only need to edit dates.

Tech logos are self-hosted in `assets/icons/` (devicon, MIT; simple-icons, CC0) and mapped by name in `logos`. Anything without a logo shows a small hexagon icon.

- [x] `profile.links.github`: personal GitHub URL (set by `publish.sh`)
- [x] Resume: `resume.html` is a single-column, ATS-friendly resume generated from `content.js`. Experience bullets and education are shared with the site (each role can also set `scope`, `client` and `promoted`, which the resume prints); the title, summary, career highlights, competencies and keyword skill rows are in `resume`. Keep it to 3 pages: `build-resume.sh` output should report 3 pages when checked. After editing content, run `./scripts/build-resume.sh` to refresh `assets/Tamil-Vanan-Resume.pdf` (needs Chrome or Edge). The public PDF has no phone number. For job applications, build a private copy with your phone outside the repo:
  `PHONE="+91 ..." ./scripts/build-resume.sh ~/Downloads/Tamil_Vanan_Senior_DevOps_Engineer_Resume.pdf`
- [x] Link previews (LinkedIn Featured, Slack, X): the home page and `resume.html` have Open Graph tags pointing to `assets/img/og-card.png`. After changing your name, title, headline or photo, run `./scripts/build-og-image.sh`.
- [ ] Replace `assets/img/profile.jpg` with a sharper square headshot (600×600 or larger) when you have one
- [ ] `contact.formEndpoint` (optional): a free [Formspree](https://formspree.io) form URL adds a "Send a message" form under Let's connect
- [ ] `profile.links.blog` (optional): a dev.to / Medium / Hashnode profile, shown in the footer
- [ ] Update `profile.links.site` (printed on the resume) when the custom domain goes live
- [ ] Add certifications as you earn them
- [ ] Review every metric and project for what you're comfortable making public. Don't include internal ticket IDs, account IDs, cluster names, hostnames or exact cost figures.

To add a project, copy an object in `projects` and set its `category`. Filters are generated from the categories automatically. Give a project `links: { code, writeup, demo }` to show buttons on its case study.

Public side projects go in `labs` (title, summary, stack, code, demo). The "Open-source labs" section appears in Orbit once the list has entries.

Orbit colours: each section has its own accent (`[data-theme]` rules at the top of `designs/orbit/style.css`), and each Work domain tab has its own colour and icon (`DOMAINS` in `designs/orbit/app.js`). A new project `category` gets a tab automatically; add it to `DOMAINS` to give it a colour.

Other Orbit-only content: `profile.roles` (titles typed out in the hero), `principles` ("How I work"), `journey` (Milestones), `contact.talkAbout`, and `experience[].current` (the "Now shipping" badge). In the Experience timeline each role shows its first two points, and the rest sit behind "Show more outcomes".

---

## Publishing updates

The site deploys automatically to GitHub Pages on every push to `main`.

```bash
cd ~/Projects/portfolio-site
# edit assets/content.js (and/or designs/orbit/*), then:
PORTFOLIO_YES=1 ./scripts/publish.sh Tamilvanan-Devops
```

`publish.sh` temporarily switches the GitHub CLI to the personal account, rebuilds the resume PDF and home page,
commits as `Tamilvanan-Devops` (noreply email, never the work identity), pushes, and switches back to whichever
account was active before. Without `PORTFOLIO_YES=1` it asks for confirmation first.

If the personal account is ever logged out of the CLI: `gh auth login --hostname github.com --git-protocol https --web --scopes workflow`
(sign in as Tamilvanan-Devops), then `gh auth switch --user <work-account>` to go back.

## Custom domain (optional)

### 1. Buy the domain on Cloudflare
1. Sign up at https://dash.cloudflare.com, then go to **Domain Registration → Register Domains**.
2. Search for a name. Availability as of when this was written:
   - `tamilvanan.com` — ❌ taken
   - `tamilvananv.com` — ✅ available
   - `tamilvanan.cloud` / `tamilvanan.io` — ✅ available
3. Cloudflare charges the registry's cost price (a `.com` is roughly $10–11 a year) and includes WHOIS privacy.

### 2. Point the domain at GitHub Pages
In Cloudflare → your domain → **DNS → Records**, add:

| Type  | Name | Content                 | Proxy        |
|-------|------|-------------------------|--------------|
| A     | @    | 185.199.108.153         | DNS only (grey) |
| A     | @    | 185.199.109.153         | DNS only (grey) |
| A     | @    | 185.199.110.153         | DNS only (grey) |
| A     | @    | 185.199.111.153         | DNS only (grey) |
| CNAME | www  | `tamilvanan-devops.github.io` | DNS only (grey) |

Then:
1. Run `PORTFOLIO_YES=1 ./scripts/publish.sh Tamilvanan-Devops yourdomain.com` (or repo → **Settings → Pages → Custom domain**).
2. Wait for the DNS check to pass, then tick **Enforce HTTPS**.
3. Optional: once HTTPS works, you can switch the records to **Proxied (orange)** and set Cloudflare **SSL/TLS → Full**.
4. Recommended: verify the domain under GitHub **Settings (account) → Pages → Add a verified domain** so nobody else can claim it.
5. Point the link previews and resume at the new domain, then publish again:
   `grep -rl 'tamilvanan-devops.github.io' designs/orbit/index.html resume.html assets/content.js | xargs sed -i '' 's#https://tamilvanan-devops.github.io#https://yourdomain.com#g'`
   Then run `./scripts/build-og-image.sh` and `./scripts/build-resume.sh`. LinkedIn caches previews, so refresh yours at https://www.linkedin.com/post-inspector/.

### Alternative: host on Cloudflare Pages instead
Cloudflare → **Workers & Pages → Create → Pages → Connect to Git**, pick the repo, leave the build command empty and set the output directory to `/`. Then add the custom domain from the Pages project. Cloudflare handles DNS and SSL automatically.

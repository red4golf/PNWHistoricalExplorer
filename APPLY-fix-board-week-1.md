# `fix/board-week-1` — apply, publish for testing, roll back

The commit is `9fdf437`, based on **`4b19958`** — the commit your live site is
actually built from (mid-branch on `agent/tour-guide-concierge-prototype`, **not**
`main`). Basing it anywhere else will conflict.

`main` is not touched by any of this. It stays at `44ca9ec`.

I could not push for you: the GitHub token in the Cowork sandbox authenticates as
`red4golf` for identity only and has no repo write access.

---

## 1. Create a rollback ref FIRST

This is the one step not to skip. You plan to publish the test build to the live
URL, and rolling back means re-deploying `4b19958` — but **no branch or tag
currently points at it**, and GitHub's "Run workflow" dropdown only offers
branches and tags. Make one before you deploy anything:

```bash
cd C:\DEV\Projects\PNWHistoricalExplorer
git fetch origin agent/tour-guide-concierge-prototype
git branch live-snapshot-2026-07-25 4b19958
git push origin live-snapshot-2026-07-25
```

Now the current live site is one dispatch away at any time.

## 2. Apply the fix branch

```bash
git checkout -b fix/board-week-1 4b19958
git am 0001-fix-board-week-1.patch
npm install          # picks up pagefind
npm run build        # should end with "Indexed 112 pages"
npm run preview      # http://localhost:4321/PNWHistoricalExplorer
git push -u origin fix/board-week-1
```

If `git am` complains about line endings — your working copy shows ~265 files
modified purely from CRLF differences — use `git am --keep-cr` instead. Same
result, one commit.

Worth doing the local `npm run preview` pass before you publish: search, the
homepage, and an entry page all behave there exactly as they will live.

## 3. Publish it for testing

**Actions → "Deploy to GitHub Pages" → Run workflow → branch: `fix/board-week-1`**

GitHub Pages serves one site per repo, so this replaces `red4golf.github.io/PNWHistoricalExplorer`
until you deploy something else. The run ends with a new `smoke` job that fetches
the homepage, map, search page, both pagefind assets, `locations.json`, the
sitemap, an entry page and the manifest against the live URL — and fails if any
is missing or if `/admin` is publicly reachable. If that job goes green, the
deploy is sound.

## 4. Roll back

**Actions → "Deploy to GitHub Pages" → Run workflow → branch: `live-snapshot-2026-07-25`**

Takes about a minute. Today's site returns exactly as it is now.

---

## What to check while it's live

| Check | Expected |
|---|---|
| `/search` → type "bowerman" | Real results, Bowerman Airport first. No `npm run build` text anywhere. |
| Homepage, right-hand card | "START WITH THE TRIP, NOT THE DATABASE" is now readable dark rust, not invisible cream. |
| `/admin/`, `/admin/quality/` | **404.** That's the fix working. |
| Any entry page's "Continue the story" links | Still untagged Amazon links — the tag fix needs your Associates ID (below). |
| Actions log, build step | A yellow `[postbuild] WARNING: Amazon Associates tag is EMPTY` line. Expected until you set it. |

**One thing that changes for you:** `/admin/quality`, `/admin/seo` and
`/admin/pipeline` are no longer published, so you can't open them on the live
site. They still work locally — `npm run dev`, or `npm run build:admin && npm run preview`
if you want them in a production-style build.

## Two things left for you

1. **The Amazon tag.** The build warns when it's empty (it is — all 167 book links
   ship untagged). Set it at *Settings → Secrets and variables → Actions →
   Variables → `PUBLIC_AMAZON_TAG`*, then add `AFFILIATE_REQUIRED: '1'` to the
   `env:` block in `deploy.yml` so an empty tag can never ship again.
2. **`main` is a live hazard.** It sits at `44ca9ec` (10 July) — the pre-concierge
   design — and the workflow deploys on any push to it. Nothing here changes that;
   worth resolving deliberately, separately from this branch.

---

## What's in the commit

| Fix | Files |
|---|---|
| Search: pagefind added as a devDependency and run in `npm run build` | `package.json`, `package-lock.json` |
| Search page no longer shows visitors an npm command | `src/pages/search.astro` |
| `/admin/*` stripped from the published artifact; affiliate-tag warning; build-output assertions | `scripts/postbuild.mjs` |
| Contrast: invisible hero eyebrow (1.09:1) and the two 4.44:1 failures | `src/styles/global.css`, `src/styles/guide.css` |
| Post-deploy smoke test | `scripts/smoke.mjs`, `.github/workflows/deploy.yml` |

Verified in a clean clone before committing: build succeeds, pagefind indexes 112
pages, searching "bowerman" returns the Bowerman Airport entry, `dist/admin` is
absent, the homepage has **0** axe-core WCAG 2.1 AA violations (was 2), and the
smoke test passes — and fails when an asset is deleted.

Also note: `package-lock.json` at `4b19958` listed three root dependencies that
`package.json` doesn't declare (`@astrojs/compiler`, `shiki`, `unstorage`).
Installing pagefind regenerated the lock and dropped them. The build is
unaffected — Astro pulls what it needs transitively — but the lock had drifted.

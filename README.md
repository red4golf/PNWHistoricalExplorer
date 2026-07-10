# PNW Historical Explorer

Static Astro rebuild of the Pacific Northwest Historical Explorer — 93 historic locations with full narratives, 36 audio narrations, curated book lists, an interactive map, and offline (PWA) support.

## Quick start

```bash
npm install
npm run dev       # local dev server at http://localhost:4321/PNWHistoricalExplorer
npm run build     # static site → dist/
npm run preview   # preview the built site
```

## Project layout

- `src/content/locations/` — 93 markdown files (one per location, YAML frontmatter)
- `src/content.config.ts` — schema; the 9 categories are enforced as an enum
- `src/lib/categories.ts` — category names, slugs, icons (edit here to change the taxonomy UI)
- `src/lib/url.ts` — base-path-aware URL helper (`href('/map')`)
- `src/pages/` — home, `/map` (interactive map + GPS "find sites near me"), `/categories`, `/locations/[slug]`, `/about`, `/offline`, `/admin`
- `src/config.ts` — central config (Amazon tag, GoatCounter code) with env overrides
- `src/data/site.json` — editable site settings (name, tagline, affiliate tag, featured)
- `src/lib/amazon.ts` — appends the affiliate tag to Amazon links at build time
- `.pages.yml` — Pages CMS config (browser content editor)
- `src/pages/locations.json.ts` — builds the JSON the map and service worker use
- `public/sw.js` — service worker: precaches the shell, caches pages/images as you browse, saves audio for offline after first play
- `public/manifest.webmanifest` + `public/icons/` — PWA install support
- `scripts/migrate.mjs` — re-sync content from the live Replit API (idempotent)
- `scripts/optimize-images.mjs` — regenerate webp variants after adding hero images
- `scripts/generate-icons.mjs` — regenerate the icon set

## Adding a location

1. Add a markdown file to `src/content/locations/` matching the existing frontmatter (category must be one of the 9).
2. Drop a hero JPG in `public/images/locations/` named `<slug>-hero.jpg`, then run `npm run images`.
3. Optional audio MP3 in `public/audio/<slug>.mp3`, referenced in frontmatter.

## Admin, analytics & content editing

There is no server behind this site (GitHub Pages is static), so "admin" is split across three pieces, all free:

### Admin dashboard — `/admin`

Visit `https://red4golf.github.io/PNWHistoricalExplorer/admin`. It's a build-time snapshot of content health (location counts by category, missing hero images / audio / book links, affiliate status) plus quick links to the CMS, analytics, and the repo. It's `noindex` and excluded from the sitemap and `robots.txt`, but **it is publicly reachable by URL** — it contains no secrets, only counts and links.

The dashboard links to four deeper views:

- **`/admin/quality`** — per-entry fact-check status, grades, and traffic-weighted verified coverage.
- **`/admin/seo`** — build-time SEO audit: meta descriptions, titles, social images, structured data, and internal-link / asset integrity, with Google Search Console setup and PageSpeed links.
- **`/admin/pipeline`** — editorial board showing what each entry still needs (image, audio, verification, reading) plus draft / scheduled status.
- The hub itself also shows live **Engagement** events (audio plays, affiliate clicks, "find near me", searches, 404s) and **Deploy & build health** (latest GitHub Actions run, read live from the public API).

Two editorial frontmatter fields drive the pipeline: `draft: true` holds an entry out of the public build (still visible in `/admin`), and `publishDate` is an informational go-live label (a static build only refreshes on deploy, so it does **not** auto-publish). Both are editable in the CMS.

### Editing content — Pages CMS

Browser-based editor at **[app.pagescms.org](https://app.pagescms.org)** — sign in with GitHub, choose this repo. Config lives in `.pages.yml`. You can add/edit locations (every frontmatter field, including the books list and the article body) and edit **Site settings**. Saving commits to GitHub, which triggers the deploy workflow and rebuilds the site. No install or server required.

### Analytics — GoatCounter

Free, privacy-friendly, no cookie banner. One-time setup:

1. Create a free site at [goatcounter.com](https://www.goatcounter.com) (e.g. `pnwhistory.goatcounter.com`).
2. In the repo: Settings → Secrets and variables → Actions → **Variables** → add `PUBLIC_GOATCOUNTER_CODE` = `pnwhistory` (just the subdomain).
3. Push (or re-run the workflow). The tracking script only loads on the production build, never in `npm run dev`.

The `/admin` page shows live stats **in-page** (total pageviews + most-viewed locations) by reading GoatCounter's public counter endpoint — no API token, nothing secret in the page. For this to work you must enable **Settings → "Allow adding visitor counts on your website"** in GoatCounter. Full referrer/timeline data is one click away on the GoatCounter dashboard.

### Amazon affiliate links (no hardcoded ID)

Book links in content stay as plain Amazon URLs. `src/lib/amazon.ts` appends your `tag=` to every Amazon link at build time, so the ID lives in exactly one place. Precedence: `PUBLIC_AMAZON_TAG` env/repo-variable → `src/data/site.json` → empty.

- **Recommended:** set `PUBLIC_AMAZON_TAG` as a repo *Variable* (same place as the GoatCounter one) so it's separate from content.
- Or edit `amazonAssociatesTag` in **Site settings** via the CMS.
- Locally, copy `.env.example` to `.env` and fill it in.

The affiliate tag is **not secret** (it appears in the final public links); env/config is purely so it isn't copy-pasted across 90+ files. Tagged links also carry `rel="nofollow sponsored"` per Amazon/FTC guidance.

## Deploying

Deployed to **GitHub Pages** at `https://red4golf.github.io/PNWHistoricalExplorer` — every push to `main` triggers `.github/workflows/deploy.yml` (build + deploy automatically). One-time setup: repo Settings → Pages → Source: **GitHub Actions**.

The site is served from the `/PNWHistoricalExplorer/` subpath. The base path lives in three places that must stay in sync:

1. `astro.config.mjs` — `base` (env `BASE_PATH` overrides)
2. `public/sw.js` — `const BASE`
3. `public/manifest.webmanifest` — `start_url`, `scope`, icon paths

If you later attach a custom domain (which serves at the root), set `BASE_PATH=/` in the workflow, change `sw.js` BASE to `''`, and strip the prefix from the manifest.

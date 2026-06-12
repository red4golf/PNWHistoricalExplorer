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
- `src/pages/` — home, `/map`, `/categories`, `/locations/[slug]`, `/about`, `/offline`
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

## Deploying

Deployed to **GitHub Pages** at `https://red4golf.github.io/PNWHistoricalExplorer` — every push to `main` triggers `.github/workflows/deploy.yml` (build + deploy automatically). One-time setup: repo Settings → Pages → Source: **GitHub Actions**.

The site is served from the `/PNWHistoricalExplorer/` subpath. The base path lives in three places that must stay in sync:

1. `astro.config.mjs` — `base` (env `BASE_PATH` overrides)
2. `public/sw.js` — `const BASE`
3. `public/manifest.webmanifest` — `start_url`, `scope`, icon paths

If you later attach a custom domain (which serves at the root), set `BASE_PATH=/` in the workflow, change `sw.js` BASE to `''`, and strip the prefix from the manifest.

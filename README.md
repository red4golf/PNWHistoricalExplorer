# PNW Historical Explorer

Static Astro rebuild of the Pacific Northwest Historical Explorer — 93 historic locations with full narratives, 36 audio narrations, curated book lists, an interactive map, and offline (PWA) support.

## Quick start

```bash
npm install
npm run dev       # local dev server at http://localhost:4321
npm run build     # static site → dist/
npm run preview   # preview the built site
```

## Project layout

- `src/content/locations/` — 93 markdown files (one per location, YAML frontmatter)
- `src/content.config.ts` — schema; the 9 categories are enforced as an enum
- `src/lib/categories.ts` — category names, slugs, icons (edit here to change the taxonomy UI)
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

The site is fully static — any static host works.

- **Cloudflare Pages / Netlify**: connect the repo, build command `npm run build`, output `dist`. Set env var `SITE_URL` to your real domain (used for canonical URLs, sitemap, and OG tags).
- **Replit**: a Static Deployment pointed at `dist` works too (`SITE_URL` in Secrets).

After first deploy, verify: favicon shows in the tab, Lighthouse reports the PWA installable, and `https://<domain>/sitemap-index.xml` resolves.

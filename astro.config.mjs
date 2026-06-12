import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages project site: https://red4golf.github.io/PNWHistoricalExplorer
// If you later attach a custom domain, set SITE_URL and BASE_PATH ('/') in the
// workflow env — and update public/sw.js + public/manifest.webmanifest to match.
const site = process.env.SITE_URL || 'https://red4golf.github.io';
const base = process.env.BASE_PATH || '/PNWHistoricalExplorer';

export default defineConfig({
  site,
  base,
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});

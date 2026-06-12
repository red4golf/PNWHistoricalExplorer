import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Set SITE_URL when deploying (e.g. on Cloudflare Pages / Netlify env vars,
// or in Replit secrets). Falls back to a placeholder for local builds.
const site = process.env.SITE_URL || 'https://pnwhistoricalexplorer.example.com';

export default defineConfig({
  site,
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});

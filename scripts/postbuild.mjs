/**
 * Post-build guard rails. Runs between `astro build` and `pagefind`.
 *
 * 1. Removes the /admin pages from the published artifact.
 *    GitHub Pages has no auth layer, so anything Astro emits into dist/ is a
 *    public URL. /admin/quality in particular is a per-entry table of internal
 *    verification grades. Set INCLUDE_ADMIN=1 to keep them (local previews).
 *    `astro dev` is unaffected either way — /admin still works locally.
 *
 * 2. Warns when the Amazon Associates tag is missing, because an empty tag
 *    produces book links with no `tag=` parameter — the site earns nothing and
 *    nothing about the build looks wrong. Set AFFILIATE_REQUIRED=1 to make this
 *    a hard failure once PUBLIC_AMAZON_TAG is configured as a repo variable.
 */
import { rm, readFile, access } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const c = {
  warn: (s) => `\x1b[33m${s}\x1b[0m`,
  ok: (s) => `\x1b[32m${s}\x1b[0m`,
  err: (s) => `\x1b[31m${s}\x1b[0m`,
};

if (!existsSync(dist)) {
  console.error(c.err('[postbuild] dist/ not found — did astro build run?'));
  process.exit(1);
}

/* ---- 1. strip admin ------------------------------------------------------ */
const adminDir = path.join(dist, 'admin');
if (process.env.INCLUDE_ADMIN === '1') {
  console.log(c.warn('[postbuild] INCLUDE_ADMIN=1 — /admin left in dist/. Do NOT deploy this build.'));
} else if (existsSync(adminDir)) {
  await rm(adminDir, { recursive: true, force: true });
  console.log(c.ok('[postbuild] removed dist/admin — admin pages are not published'));
}

/* ---- 2. affiliate tag ---------------------------------------------------- */
let tag = process.env.PUBLIC_AMAZON_TAG || '';
if (!tag) {
  try {
    const site = JSON.parse(await readFile(path.join(root, 'src/data/site.json'), 'utf8'));
    tag = site.amazonAssociatesTag || '';
  } catch {
    /* site.json is optional */
  }
}

if (tag) {
  console.log(c.ok(`[postbuild] Amazon Associates tag in use: ${tag}`));
} else {
  const msg = [
    'Amazon Associates tag is EMPTY.',
    'Every book link in this build ships without a `tag=` parameter, so the',
    'site earns nothing from them. Fix: GitHub → Settings → Secrets and',
    'variables → Actions → Variables → new variable PUBLIC_AMAZON_TAG,',
    'or set amazonAssociatesTag in src/data/site.json.',
    'Once it is set, add AFFILIATE_REQUIRED=1 to the deploy workflow so an',
    'empty tag can never ship again.',
  ].join('\n           ');
  if (process.env.AFFILIATE_REQUIRED === '1') {
    console.error(c.err('[postbuild] ' + msg));
    process.exit(1);
  }
  console.warn(c.warn('[postbuild] WARNING: ' + msg));
}

/* ---- 3. sanity: the pages that must exist -------------------------------- */
const required = ['index.html', 'map/index.html', 'search/index.html', 'locations.json', 'sitemap-index.xml'];
const missing = [];
for (const f of required) {
  try {
    await access(path.join(dist, f));
  } catch {
    missing.push(f);
  }
}
if (missing.length) {
  console.error(c.err(`[postbuild] missing expected build output: ${missing.join(', ')}`));
  process.exit(1);
}
console.log(c.ok('[postbuild] build output looks complete'));

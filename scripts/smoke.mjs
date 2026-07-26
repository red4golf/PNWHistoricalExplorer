/**
 * Post-deploy smoke test. Fetches the URLs that have actually broken before
 * and fails loudly if any of them is not a 200 with the content we expect.
 *
 *   node scripts/smoke.mjs [baseUrl]
 *
 * Default base is the production site. The deploy workflow runs this after
 * actions/deploy-pages, so a build that silently drops the search index, the
 * sitemap or the locations feed fails the run instead of sitting live.
 */
const base = (process.argv[2] || process.env.SMOKE_BASE || 'https://red4golf.github.io/PNWHistoricalExplorer').replace(/\/$/, '');

/** [path, description, optional substring that must appear in the body] */
const checks = [
  ['/', 'homepage'],
  ['/map/', 'map page'],
  ['/categories/', 'category index'],
  ['/search/', 'search page'],
  ['/pagefind/pagefind-ui.js', 'pagefind UI script'],
  ['/pagefind/pagefind-ui.css', 'pagefind UI styles'],
  ['/locations.json', 'locations feed', '"slug"'],
  ['/sitemap-index.xml', 'sitemap'],
  ['/robots.txt', 'robots.txt'],
  ['/locations/museum-of-flight/', 'sample entry page', 'Museum of Flight'],
  ['/manifest.webmanifest', 'PWA manifest'],
];

/** These must NOT be publicly reachable. */
const mustBeAbsent = [
  ['/admin/', 'admin hub'],
  ['/admin/quality/', 'admin quality dashboard'],
];

const fails = [];
const timeout = (ms) => new Promise((_, r) => setTimeout(() => r(new Error('timeout')), ms));

async function get(url) {
  return Promise.race([fetch(url, { redirect: 'follow' }), timeout(20000)]);
}

for (const [p, label, needle] of checks) {
  try {
    const res = await get(base + p);
    if (!res.ok) {
      fails.push(`${label} (${p}) → HTTP ${res.status}`);
      continue;
    }
    if (needle) {
      const body = await res.text();
      if (!body.includes(needle)) {
        fails.push(`${label} (${p}) → 200 but missing expected content ${JSON.stringify(needle)}`);
        continue;
      }
    }
    console.log(`  ok    ${p}  (${label})`);
  } catch (e) {
    fails.push(`${label} (${p}) → ${e.message}`);
  }
}

for (const [p, label] of mustBeAbsent) {
  try {
    const res = await get(base + p);
    if (res.ok) {
      fails.push(`${label} (${p}) is PUBLIC → HTTP ${res.status}; it must not be in the published build`);
    } else {
      console.log(`  ok    ${p}  (${label} not published, HTTP ${res.status})`);
    }
  } catch {
    console.log(`  ok    ${p}  (${label} unreachable)`);
  }
}

if (fails.length) {
  console.error(`\nSmoke test FAILED against ${base}:`);
  for (const f of fails) console.error('  ✗ ' + f);
  process.exit(1);
}
console.log(`\nSmoke test passed against ${base} (${checks.length + mustBeAbsent.length} checks).`);

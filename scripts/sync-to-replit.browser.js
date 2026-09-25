// sync-to-replit.browser.js — push the live Astro content (GitHub main) into the legacy Replit app.
//
// HOW TO RUN: log in at https://historical-bainbridge-charles194.replit.app/admin, open the
// browser console on that page, paste this whole file, then run:  await syncToReplit({dryRun:true})
// then                                                            await syncToReplit()
//
// Direction: GitHub (Astro, source of truth) -> Replit. Never the reverse.
// Do NOT run scripts/migrate.mjs — it copies Replit -> Astro and would overwrite corrected entries.
//
// Matches entries by slug. Updates only: description, content, address, period, latitude,
// longitude, recommendedBooks. Leaves Replit's category, images, audio, status, photos alone.
// Replit-only entries (merged duplicates) and Astro-only entries are reported, not touched.
// Audio is NOT synced. New narration goes to Replit separately; record it in AUDIO-TRACKER.md (Live (Replit)).
async function syncToReplit({ dryRun = false, branch = 'main' } = {}) {
  const REPO = 'red4golf/PNWHistoricalExplorer';
  if (!window.jsyaml) {
    await new Promise((ok, bad) => {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js';
      s.onload = ok; s.onerror = bad; document.head.appendChild(s);
    });
  }
  const auth = await fetch('/api/admin/stats', { credentials: 'include' });
  if (auth.status !== 200) throw new Error('Not logged in to Replit admin (status ' + auth.status + ')');

  const list = await (await fetch(`https://api.github.com/repos/${REPO}/contents/src/content/locations?ref=${branch}`)).json();
  const files = list.filter((f) => f.name.endsWith('.md'));
  const replit = await (await fetch('/api/locations', { credentials: 'include' })).json();
  const bySlug = Object.fromEntries(replit.map((l) => [l.slug, l]));

  const report = { updated: [], unchanged: 0, astroOnly: [], errors: [], replitOnly: [] };
  const seen = new Set();
  for (const f of files) {
    const raw = (await (await fetch(`https://raw.githubusercontent.com/${REPO}/${branch}/src/content/locations/${f.name}`)).text()).replace(/\r\n/g, '\n');
    const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!m) { report.errors.push([f.name, 'no frontmatter']); continue; }
    const fm = jsyaml.load(m[1]); const body = m[2].trim();
    if (fm.draft) continue;
    seen.add(fm.slug);
    const r = bySlug[fm.slug];
    if (!r) { report.astroOnly.push(fm.slug); continue; }

    let oldBooks = []; try { oldBooks = JSON.parse(r.recommendedBooks || '[]'); } catch {}
    const oldByTitle = Object.fromEntries(oldBooks.map((b) => [(b.title || '').trim().toLowerCase(), b]));
    const books = (fm.books || []).map((b) => {
      const key = b.title.trim().toLowerCase();
      const o = { ...(oldByTitle[key] || {}) }; delete o.amazonUrl;
      o.title = b.title; if (b.author) o.author = b.author;
      if (b.url) o.amazon_url = b.url; else if (!oldByTitle[key]) delete o.amazon_url;
      return o;
    });

    const want = { description: fm.description, content: body, latitude: String(fm.coordinates.lat), longitude: String(fm.coordinates.lng) };
    if (fm.address) want.address = fm.address;
    if (fm.period) want.period = fm.period;
    const patch = {};
    for (const [k, v] of Object.entries(want)) {
      const cur = r[k];
      const same = (k === 'latitude' || k === 'longitude') ? Math.abs(parseFloat(cur || 0) - parseFloat(v)) < 1e-5 : String(cur || '').trim() === String(v).trim();
      if (!same) patch[k] = v;
    }
    if (JSON.stringify(oldBooks) !== JSON.stringify(books)) patch.recommendedBooks = JSON.stringify(books, null, 2);
    if (!Object.keys(patch).length) { report.unchanged++; continue; }
    if (dryRun) { report.updated.push([fm.slug, Object.keys(patch)]); continue; }
    const res = await fetch(`/api/admin/locations/${r.id}`, { method: 'PATCH', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(patch) });
    if (res.ok) report.updated.push([fm.slug, Object.keys(patch)]);
    else report.errors.push([fm.slug, res.status, (await res.text()).slice(0, 200)]);
  }
  report.replitOnly = replit.map((l) => l.slug).filter((s) => !seen.has(s));
  return report;
}

// Build-time SEO / integrity audit for location entries.
//
// Everything here runs during `astro build` (Node), so we can read the raw
// markdown body and check that referenced assets actually exist on disk. The
// results feed the /admin/seo dashboard. All checks are transparent and
// deterministic — no external calls.
import { existsSync } from 'node:fs';
import path from 'node:path';
import type { Loc } from './publish';

export type IssueLevel = 'error' | 'warn' | 'info';

export interface Issue {
  level: IssueLevel;
  code: string;
  msg: string;
}

export interface EntryAudit {
  slug: string;
  title: string;
  category: string;
  issues: Issue[];
  worst: IssueLevel | 'ok';
  hasOgImage: boolean;
}

// Meta-description sweet spot (Google typically renders ~155–160 chars).
const DESC_MIN = 70;
const DESC_MAX = 160;
// Raw title length before the site-wide " — PNW Historical Explorer" suffix.
const TITLE_MAX = 60;

const PUBLIC_DIR = path.join(process.cwd(), 'public');

/** True if a root-relative public asset path (e.g. "/images/x.jpg") exists. */
export function assetExists(publicPath: string): boolean {
  if (!publicPath || !publicPath.startsWith('/')) return false;
  return existsSync(path.join(PUBLIC_DIR, publicPath));
}

/** Pull every link/image target out of a markdown body. */
export function extractTargets(body: string): string[] {
  const out: string[] = [];
  const md = /\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)/g; // [text](url) and ![alt](src)
  const html = /(?:href|src)\s*=\s*["']([^"']+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = md.exec(body))) out.push(m[1]);
  while ((m = html.exec(body))) out.push(m[1]);
  return out;
}

const worstOf = (issues: Issue[]): IssueLevel | 'ok' =>
  issues.some((i) => i.level === 'error')
    ? 'error'
    : issues.some((i) => i.level === 'warn')
      ? 'warn'
      : issues.some((i) => i.level === 'info')
        ? 'info'
        : 'ok';

/**
 * Audit a single entry.
 * @param entry       the location
 * @param validSlugs  set of all published slugs, for internal-link validation
 */
export function auditEntry(entry: Loc, validSlugs: Set<string>): EntryAudit {
  const d = entry.data;
  const issues: Issue[] = [];

  // --- Meta description --------------------------------------------------
  const desc = (d.description ?? '').trim();
  if (!desc) {
    issues.push({ level: 'error', code: 'desc-missing', msg: 'No meta description.' });
  } else if (desc.length < DESC_MIN) {
    issues.push({
      level: 'warn',
      code: 'desc-short',
      msg: `Meta description is thin (${desc.length} chars; aim for ${DESC_MIN}–${DESC_MAX}).`,
    });
  } else if (desc.length > DESC_MAX) {
    issues.push({
      level: 'info',
      code: 'desc-long',
      msg: `Description is ${desc.length} chars; the page auto-trims the meta tag to ~158, which can cut mid-sentence — a tighter summary reads better in results.`,
    });
  }

  // --- Title -------------------------------------------------------------
  if ((d.title ?? '').length > TITLE_MAX) {
    issues.push({
      level: 'warn',
      code: 'title-long',
      msg: `Title is ${d.title.length} chars — long titles get cut off in results.`,
    });
  }

  // --- Open Graph image --------------------------------------------------
  const hasOgImage = Boolean(d.heroImage);
  if (!hasOgImage) {
    issues.push({
      level: 'info',
      code: 'og-default',
      msg: 'No hero image — social shares fall back to the generic site image.',
    });
  } else if (!assetExists(d.heroImage!)) {
    issues.push({
      level: 'error',
      code: 'hero-missing-file',
      msg: `heroImage points to ${d.heroImage}, but no such file exists in /public.`,
    });
  }

  // --- Audio asset -------------------------------------------------------
  if (d.audio && !assetExists(d.audio)) {
    issues.push({
      level: 'error',
      code: 'audio-missing-file',
      msg: `audio points to ${d.audio}, but no such file exists in /public.`,
    });
  }

  // --- Structured data ---------------------------------------------------
  if (!d.address) {
    issues.push({
      level: 'info',
      code: 'jsonld-no-address',
      msg: 'No address — the TouristAttraction structured data omits a postal address.',
    });
  }

  // --- Book links --------------------------------------------------------
  for (const b of d.books ?? []) {
    if (!b.url) {
      issues.push({
        level: 'warn',
        code: 'book-no-url',
        msg: `Further-reading item “${b.title}” has no link.`,
      });
    }
  }

  // --- Internal links & asset references in the body ---------------------
  for (const raw of extractTargets(entry.body ?? '')) {
    // Ignore anchors, mailto/tel, and external URLs (can't verify offline).
    if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) continue;
    if (/^https?:\/\//i.test(raw)) continue;

    // Strip any base prefix and query/hash so "/PNWHistoricalExplorer/locations/x" matches.
    let p = raw.replace(/^https?:\/\/[^/]+/i, '').split(/[?#]/)[0];
    p = p.replace(/^\/PNWHistoricalExplorer/, '');
    if (!p.startsWith('/')) continue; // relative link we can't resolve confidently

    const locMatch = p.match(/^\/locations\/([^/]+)\/?$/);
    if (locMatch) {
      if (!validSlugs.has(locMatch[1])) {
        issues.push({
          level: 'error',
          code: 'dead-internal-link',
          msg: `Body links to /locations/${locMatch[1]}, which is not a published entry.`,
        });
      }
      continue;
    }
    if (/^\/(images|audio|icons|favicon)/.test(p)) {
      if (!assetExists(p)) {
        issues.push({
          level: 'error',
          code: 'dead-asset-link',
          msg: `Body references ${p}, which is missing from /public.`,
        });
      }
    }
  }

  return {
    slug: d.slug,
    title: d.title,
    category: d.category,
    issues,
    worst: worstOf(issues),
    hasOgImage,
  };
}

export interface SiteAudit {
  entries: EntryAudit[];
  totals: { errors: number; warnings: number; infos: number; clean: number };
  byCode: Array<{ code: string; level: IssueLevel; count: number; msg: string }>;
  ogImageCount: number;
}

/** Run the audit across every entry and roll up the totals. */
export function auditSite(locations: Loc[]): SiteAudit {
  const validSlugs = new Set(locations.map((l) => l.data.slug));
  const entries = locations
    .map((l) => auditEntry(l, validSlugs))
    .sort((a, b) => rank(b.worst) - rank(a.worst) || a.title.localeCompare(b.title));

  const totals = { errors: 0, warnings: 0, infos: 0, clean: 0 };
  const codeMap = new Map<string, { level: IssueLevel; count: number; msg: string }>();
  let ogImageCount = 0;

  for (const e of entries) {
    if (e.hasOgImage) ogImageCount++;
    // "Clean" = free of errors and warnings. Info-level suggestions (e.g. no
    // hero image) don't disqualify a page — they're nice-to-haves, not defects.
    if (e.worst === 'ok' || e.worst === 'info') totals.clean++;
    for (const i of e.issues) {
      if (i.level === 'error') totals.errors++;
      else if (i.level === 'warn') totals.warnings++;
      else totals.infos++;
      const prev = codeMap.get(i.code);
      if (prev) prev.count++;
      else codeMap.set(i.code, { level: i.level, count: 1, msg: i.msg });
    }
  }

  const byCode = [...codeMap.entries()]
    .map(([code, v]) => ({ code, ...v }))
    .sort((a, b) => rank(b.level) - rank(a.level) || b.count - a.count);

  return { entries, totals, byCode, ogImageCount };
}

const rank = (l: IssueLevel | 'ok') =>
  l === 'error' ? 3 : l === 'warn' ? 2 : l === 'info' ? 1 : 0;

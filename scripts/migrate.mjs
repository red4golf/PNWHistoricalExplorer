#!/usr/bin/env node
/**
 * migrate.mjs — one-time content migration from the Replit PNW Historical Explorer API
 * to content-as-code markdown for the new Astro site.
 *
 * What it does:
 *   1. Fetches all locations from the live API (or reads --input <file>).
 *   2. Normalizes 32 legacy categories down to 9 canonical ones (with per-record overrides).
 *   3. Merges 3 duplicate sets (Fort Casey cluster, Fort Worden cluster, Columbia Gorge pair):
 *      primary record is the base; merged records' content is appended as demoted sections;
 *      books/audio/hero are unioned.
 *   4. Emits one markdown file per location to src/content/locations/<slug>.md.
 *   5. Downloads hero images to public/images/locations/ (skips placeholders < 1KB,
 *      e.g. the known 70-byte Fort Clatsop test PNG).
 *   6. Downloads audio originals to _archive/audio-originals/ (gitignored) and re-encodes
 *      to 64kbps mono MP3 in public/audio/ via ffmpeg.
 *
 * Usage:
 *   node scripts/migrate.mjs [--root <repoRoot>] [--input <locations.json>] [--no-audio] [--no-images]
 */

import { mkdir, writeFile, readFile, stat, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const execFileP = promisify(execFile);

const API_BASE = "https://historical-bainbridge-charles194.replit.app";
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : null; };

const ROOT = opt("--root") ?? process.cwd();
const CONTENT_DIR = path.join(ROOT, "src", "content", "locations");
const IMAGES_DIR = path.join(ROOT, "public", "images", "locations");
const AUDIO_DIR = path.join(ROOT, "public", "audio");
const ARCHIVE_DIR = path.join(ROOT, "_archive", "audio-originals");

// ---------------------------------------------------------------------------
// Category normalization: 32 legacy values -> 9 canonical categories
// ---------------------------------------------------------------------------
const CATEGORY_MAP = {
  "Indigenous Heritage": "Indigenous Heritage",
  "Natural": "Natural Wonders",
  "Natural Heritage": "Natural Wonders",
  "Natural Landmark": "Natural Wonders",
  "Natural Disaster": "Natural Wonders",
  "Maritime": "Maritime",
  "Maritime Heritage": "Maritime",
  "Military History": "Military and Conflict",
  "Military Installation": "Military and Conflict",
  "International Diplomacy": "Military and Conflict", // San Juan Island Pig War
  "Cultural Conflict": "Military and Conflict",       // Whitman Mission
  "Industrial": "Industry and Agriculture",
  "Industrial Heritage": "Industry and Agriculture",
  "Agricultural": "Industry and Agriculture",
  "Agricultural Heritage": "Industry and Agriculture",
  "Economic History": "Industry and Agriculture",
  "Transportation Hub": "Aviation and Transportation",
  "Transportation Heritage": "Aviation and Transportation",
  "Settlement": "Towns and Settlements",
  "Pioneer Settlement": "Towns and Settlements",
  "Cultural": "Culture and Community",
  "Cultural Heritage": "Culture and Community",
  "Cultural Site": "Culture and Community",
  "Public Art": "Culture and Community",
  "Religious": "Culture and Community",
  "Recreation": "Culture and Community",
  "Historic Landmark": "Landmarks and Memorials",
  "Historic Buildings": "Landmarks and Memorials",
  "Memorial Site": "Landmarks and Memorials",
  "Community Landmarks": "Landmarks and Memorials",
  // "Historical" and "Archaeological" are ambiguous -> resolved per-record below
};

// Per-record overrides by source id (mostly the 13 ambiguous Historical/Archaeological
// records, plus a few judgment calls where the legacy category was misleading).
const OVERRIDES = {
  125: "Towns and Settlements",      // Bannack State Park (gold-rush ghost town)
  65:  "Towns and Settlements",      // Underground Seattle
  115: "Towns and Settlements",      // Shasta State Historic Park
  60:  "Landmarks and Memorials",    // Astoria Column
  75:  "Towns and Settlements",      // Fort Steele Heritage Town
  57:  "Indigenous Heritage",        // Kennewick Man Discovery Site
  69:  "Maritime",                   // Shanghai Tunnels Portland (shanghaiing of sailors)
  77:  "Towns and Settlements",      // Barkerville Historic Town
  59:  "Military and Conflict",      // Manzanar National Historic Site (WWII incarceration)
  66:  "Indigenous Heritage",        // Treaty Rock
  116: "Towns and Settlements",      // Jacksonville Historic District
  132: "Towns and Settlements",      // Virginia City Historic District
  120: "Landmarks and Memorials",    // Old Idaho Penitentiary
};
// Name-based overrides applied before id overrides (robust if ids ever shift)
const NAME_OVERRIDES = [
  [/museum of flight/i, "Aviation and Transportation"],
  [/pioneer square/i, "Towns and Settlements"],
];

// ---------------------------------------------------------------------------
// Duplicate merges: primary id <- merged ids (appended as sections)
// ---------------------------------------------------------------------------
const MERGES = [
  { primary: 49, merge: [147, 124] }, // Fort Casey <- Admiralty Head Lighthouse at Fort Casey, Admiralty Head Lighthouse
  { primary: 84, merge: [133] },      // Fort Worden & Battery Kinzie <- Point Wilson Lighthouse
  { primary: 34, merge: [68] },       // Columbia River Gorge <- Columbia River Gorge Wind Farms
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const y = (v) => JSON.stringify(String(v)); // YAML-safe double-quoted scalar

function resolveCategory(loc) {
  for (const [re, cat] of NAME_OVERRIDES) if (re.test(loc.name)) return cat;
  if (OVERRIDES[loc.id]) return OVERRIDES[loc.id];
  const mapped = CATEGORY_MAP[loc.category];
  if (!mapped) {
    console.warn(`  ! Unmapped category "${loc.category}" on "${loc.name}" (id ${loc.id}) -> Landmarks and Memorials`);
    return "Landmarks and Memorials";
  }
  return mapped;
}

function parseBooks(raw) {
  if (!raw) return [];
  try {
    const arr = typeof raw === "string" ? JSON.parse(raw) : raw;
    return Array.isArray(arr) ? arr : [];
  } catch { return []; }
}

function dedupeBooks(books) {
  const seen = new Set();
  return books.filter((b) => {
    const key = (b.amazon_url || b.title || "").toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// Demote markdown headings by one level (so merged sections nest under their H2 title)
function demoteHeadings(md) {
  return md.replace(/^(#{1,5})\s/gm, "$1# ");
}

function absUrl(u) {
  return u.startsWith("http") ? u : API_BASE + u;
}

async function download(url, dest, tries = 3) {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(absUrl(url), { signal: AbortSignal.timeout(60_000) });
      if (!res.ok) throw new Error(`${res.status} ${url}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(dest, buf);
      return buf.length;
    } catch (e) {
      if (attempt >= tries) throw e;
      console.warn(`  retry ${attempt}/${tries - 1} for ${url}: ${e.message}`);
    }
  }
}

async function pool(items, limit, fn) {
  const results = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (i < items.length) results.push(await fn(items[i++]));
    })
  );
  return results;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  // 1. Load data
  let locations;
  const input = opt("--input");
  if (input) {
    locations = JSON.parse(await readFile(input, "utf8"));
  } else {
    const res = await fetch(`${API_BASE}/api/locations`, { signal: AbortSignal.timeout(60_000) });
    if (!res.ok) throw new Error(`API fetch failed: ${res.status}`);
    locations = await res.json();
  }
  console.log(`Fetched ${locations.length} locations`);

  // 2. Apply merges
  const byId = new Map(locations.map((l) => [l.id, l]));
  const mergedAway = new Set();
  const mergeInfo = new Map(); // primaryId -> merged records

  for (const { primary, merge } of MERGES) {
    const p = byId.get(primary);
    const ms = merge.map((id) => byId.get(id)).filter(Boolean);
    if (!p || ms.length !== merge.length) {
      console.warn(`  ! Merge set incomplete for primary ${primary} — skipping merge`);
      continue;
    }
    mergeInfo.set(primary, ms);
    ms.forEach((m) => mergedAway.add(m.id));
  }

  const output = locations.filter((l) => !mergedAway.has(l.id));
  console.log(`After merges: ${output.length} locations (${mergedAway.size} merged away)`);

  // 3. Prepare dirs
  for (const d of [CONTENT_DIR, IMAGES_DIR, AUDIO_DIR, ARCHIVE_DIR]) await mkdir(d, { recursive: true });

  // 4. Build records
  const catCounts = {};
  const imageJobs = [];
  const audioJobs = [];

  for (const loc of output) {
    const merged = mergeInfo.get(loc.id) ?? [];
    const category = resolveCategory(loc);
    catCounts[category] = (catCounts[category] || 0) + 1;

    // union assets across merge set
    const members = [loc, ...merged];
    const heroUrl = members.map((m) => m.heroImage).find(Boolean) || null;
    const audioUrl = members.map((m) => m.audioNarration).find(Boolean) || null;
    const books = dedupeBooks(members.flatMap((m) => parseBooks(m.recommendedBooks)));

    let heroPath = null;
    if (heroUrl) {
      const ext = heroUrl.split(".").pop().toLowerCase().replace("jpeg", "jpg");
      heroPath = `/images/locations/${loc.slug}-hero.${ext}`;
      if (!flag("--no-images")) {
        imageJobs.push({ url: heroUrl, dest: path.join(ROOT, "public", heroPath.slice(1)), slug: loc.slug });
      }
    }
    const audioPath = audioUrl ? `/audio/${loc.slug}.mp3` : null;
    if (audioUrl && !flag("--no-audio")) audioJobs.push({ url: audioUrl, slug: loc.slug });

    // body: primary content + merged sections (headings demoted one level)
    let body = (loc.content || "").trim();
    for (const m of merged) {
      body += `\n\n---\n\n## ${m.name}\n\n${demoteHeadings((m.content || "").trim())}`;
    }

    // frontmatter (no submitter PII)
    const fm = [];
    fm.push(`title: ${y(loc.name)}`);
    fm.push(`slug: ${y(loc.slug)}`);
    fm.push(`category: ${y(category)}`);
    fm.push(`legacyCategory: ${y(loc.category)}`);
    if (loc.period) fm.push(`period: ${y(loc.period)}`);
    if (loc.address) fm.push(`address: ${y(loc.address)}`);
    fm.push(`coordinates:`);
    fm.push(`  lat: ${Number(loc.latitude)}`);
    fm.push(`  lng: ${Number(loc.longitude)}`);
    fm.push(`description: ${y(loc.description || "")}`);
    fm.push(`heroImage: ${heroPath ? y(heroPath) : "null"}`);
    fm.push(`audio: ${audioPath ? y(audioPath) : "null"}`);
    if (books.length) {
      fm.push(`books:`);
      for (const b of books) {
        fm.push(`  - title: ${y(b.title || "")}`);
        if (b.author) fm.push(`    author: ${y(b.author)}`);
        if (b.amazon_url) fm.push(`    url: ${y(b.amazon_url)}`);
      }
    } else {
      fm.push(`books: []`);
    }
    fm.push(`sourceId: ${loc.id}`);
    if (merged.length) {
      fm.push(`mergedFrom:`);
      for (const m of merged) fm.push(`  - { id: ${m.id}, name: ${y(m.name)}, legacyCategory: ${y(m.category)} }`);
    }

    const file = `---\n${fm.join("\n")}\n---\n\n${body}\n`;
    await writeFile(path.join(CONTENT_DIR, `${loc.slug}.md`), file, "utf8");
  }

  console.log(`Wrote ${output.length} markdown files to ${path.relative(ROOT, CONTENT_DIR)}`);
  console.log("Category counts:", catCounts);

  // 5. Hero images (skip placeholders < 1KB, e.g. Fort Clatsop's 70-byte test PNG)
  if (!flag("--no-images")) {
    let ok = 0, skipped = 0;
    await pool(imageJobs, 6, async (job) => {
      try {
        const size = await download(job.url, job.dest);
        if (size < 1024) {
          await unlink(job.dest).catch(() => {});
          const mdPath = path.join(CONTENT_DIR, `${job.slug}.md`);
          const md = await readFile(mdPath, "utf8");
          await writeFile(mdPath, md.replace(/^heroImage: .*$/m, "heroImage: null"), "utf8");
          console.log(`  - skipped placeholder image (${size}B) for ${job.slug}`);
          skipped++;
        } else ok++;
      } catch (e) {
        console.warn(`  ! image failed for ${job.slug}: ${e.message}`);
      }
    });
    console.log(`Hero images: ${ok} downloaded, ${skipped} placeholder(s) excluded`);
  }

  // 6. Audio: originals -> _archive, re-encoded 64k mono -> public/audio
  if (!flag("--no-audio")) {
    let ok = 0;
    await pool(audioJobs, 4, async (job) => {
      try {
        const orig = path.join(ARCHIVE_DIR, `${job.slug}.mp3`);
        if (!existsSync(orig) || (await stat(orig)).size === 0) await download(job.url, orig);
        const out = path.join(AUDIO_DIR, `${job.slug}.mp3`);
        if (!existsSync(out) || (await stat(out)).size === 0) {
          await execFileP("ffmpeg", ["-nostdin", "-y", "-loglevel", "error", "-i", orig, "-ac", "1", "-b:a", "64k", out]);
        }
        ok++;
      } catch (e) {
        console.warn(`  ! audio failed for ${job.slug}: ${e.message}`);
      }
    });
    console.log(`Audio: ${ok}/${audioJobs.length} processed (64kbps mono)`);
  }

  console.log("Done.");
}

main().catch((e) => { console.error(e); process.exit(1); });

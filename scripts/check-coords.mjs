#!/usr/bin/env node
// Coordinate sanity check for location entries.
//
// Catches the class of error that shipped in the original data: coordinates
// that fall outside their stated state/province, and low-precision values that
// are usually geocoder "city centroid" fallbacks rather than real site pins.
//
// Run: node scripts/check-coords.mjs   (exit 1 if any suspects — good for CI)

import fs from 'node:fs';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'src/content/locations');

// Rough bounding boxes [latMin, latMax, lngMin, lngMax] for the regions used.
const BOXES = {
  WA: [45.5, 49.05, -124.9, -116.85],
  OR: [41.9, 46.32, -124.65, -116.4],
  ID: [41.9, 49.05, -117.3, -110.95],
  MT: [44.3, 49.05, -116.15, -104.0],
  CA: [32.5, 42.05, -124.55, -114.0],
  BC: [48.2, 60.1, -139.2, -113.9],
};

function regionFromAddress(addr) {
  if (!addr) return null;
  if (/\bBC\b|British Columbia|Canada/i.test(addr)) return 'BC';
  const m = addr.match(/\b(WA|OR|ID|MT|CA)\b/g);
  return m ? m[m.length - 1] : null; // last state token wins
}

function decimals(n) {
  const s = String(n);
  const i = s.indexOf('.');
  return i === -1 ? 0 : s.length - i - 1;
}

const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md'));
const errors = [];   // hard failures — out of region / invalid
const notes = [];    // advisories — worth a look, not necessarily wrong

for (const f of files) {
  const src = fs.readFileSync(path.join(DIR, f), 'utf8');
  const fm = src.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  const title = fm.match(/^title:\s*"?(.*?)"?\s*$/m)?.[1] ?? f;
  const addr = fm.match(/^address:\s*"?(.*?)"?\s*$/m)?.[1] ?? '';
  const lat = parseFloat(fm.match(/\n\s{2}lat:\s*(-?[\d.]+)/)?.[1]);
  const lng = parseFloat(fm.match(/\n\s{2}lng:\s*(-?[\d.]+)/)?.[1]);

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    errors.push(`${title} [${f}]: missing/invalid coordinate`);
    continue;
  }
  const region = regionFromAddress(addr);
  if (region && BOXES[region]) {
    const [a, b, c, d] = BOXES[region];
    if (lat < a || lat > b || lng < c || lng > d)
      errors.push(`${title} [${f}]: coordinate (${lat},${lng}) is OUTSIDE ${region} — wrong region`);
  } else if (!region) {
    notes.push(`${title} [${f}]: no state/province in address, cannot bound-check`);
  }
  // Very coarse coords (<=2 decimals) are often geocoder centroid fallbacks.
  if (Math.min(decimals(lat), decimals(lng)) <= 2)
    notes.push(`${title} [${f}]: coarse coordinate (${lat},${lng}) — confirm it's the real site, not a centroid`);
}

if (notes.length) {
  console.log(`ℹ ${notes.length} advisory note(s):`);
  for (const n of notes) console.log(`   - ${n}`);
  console.log('');
}

if (errors.length) {
  console.log(`✗ ${errors.length} HARD failure(s) — coordinate in the wrong region:`);
  for (const e of errors) console.log(`   - ${e}`);
  process.exit(1);
}

console.log(`✓ ${files.length} entries checked — all coordinates fall within their stated region.`);
process.exit(0);

// Generates optimized webp variants for every hero image:
//   <name>-hero.webp  (1600w, q72) — detail page hero
//   <name>-card.webp  (640w,  q70) — cards and map popups
// Naming matches the component convention: "/x-hero.jpg" → "/x-hero-hero.webp" / "/x-hero-card.webp"
// Idempotent; skips variants that are newer than the source.
// Run: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dir = path.join(root, 'public', 'images', 'locations');

const files = (await readdir(dir)).filter((f) => /\.(jpe?g|png)$/i.test(f));
let made = 0;

for (const file of files) {
  const src = path.join(dir, file);
  const base = file.replace(/\.(jpe?g|png)$/i, ''); // e.g. "astoria-column-hero"
  const srcStat = await stat(src);

  for (const v of [
    { out: `${base}-hero.webp`, width: 1600, quality: 72 },
    { out: `${base}-card.webp`, width: 640, quality: 70 },
  ]) {
    const dest = path.join(dir, v.out);
    try {
      const d = await stat(dest);
      if (d.mtimeMs >= srcStat.mtimeMs) continue; // up to date
    } catch {
      /* missing — generate */
    }
    await sharp(src).resize({ width: v.width, withoutEnlargement: true }).webp({ quality: v.quality }).toFile(dest);
    made++;
  }
}

console.log(`Optimized ${made} variants from ${files.length} source images in public/images/locations/`);

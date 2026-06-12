// Generates the PWA icon set + favicon from an inline SVG (evergreen on forest).
// Run: node scripts/generate-icons.mjs
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const iconsDir = path.join(root, 'public', 'icons');
await mkdir(iconsDir, { recursive: true });

const svg = (pad = 0) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="${pad ? 0 : 96}" fill="#1f3d2b"/>
  <g transform="translate(256 268) scale(${pad ? 0.72 : 0.92}) translate(-256 -268)">
    <path d="M256 64 L120 400 H210 L256 280 L302 400 H392 Z" fill="#c9a227"/>
    <path d="M256 150 L178 400 H334 Z" fill="#ece1cb" opacity="0.92"/>
    <circle cx="256" cy="430" r="14" fill="#a14e2c"/>
  </g>
</svg>`;

const plain = Buffer.from(svg(0));
const maskable = Buffer.from(svg(1)); // full-bleed bg + safe-zone glyph

const out = (name) => path.join(iconsDir, name);

await sharp(plain).resize(192, 192).png().toFile(out('icon-192.png'));
await sharp(plain).resize(512, 512).png().toFile(out('icon-512.png'));
await sharp(maskable).resize(512, 512).png().toFile(out('icon-maskable-512.png'));
await sharp(plain).resize(180, 180).png().toFile(out('apple-touch-icon.png'));
await sharp(plain).resize(1200, 1200).png().toFile(out('og-default.png'));
await writeFile(out('icon.svg'), svg(0));

// favicon.ico (32px PNG wrapped — modern browsers accept PNG-in-ICO; we also
// keep a 32px png fallback)
const png32 = await sharp(plain).resize(32, 32).png().toBuffer();

// Minimal single-image ICO wrapper
function pngToIco(png) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // count
  const entry = Buffer.alloc(16);
  entry[0] = 32; // width
  entry[1] = 32; // height
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bpp
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12); // offset
  return Buffer.concat([header, entry, png]);
}

await writeFile(path.join(root, 'public', 'favicon.ico'), pngToIco(png32));
console.log('Icons generated in public/icons/ + favicon.ico');

/*
 * Generates PWA icons from an inline SVG so the repo carries no binary blobs
 * that drift from the brand. Run with: npm run icons
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const PUBLIC = join(process.cwd(), 'public');
const ICONS = join(PUBLIC, 'icons');

/** A bold stepped-staircase silhouette in the brand gradient. */
const svg = (bg, rounded) => `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ff9242"/>
      <stop offset="1" stop-color="#e0610a"/>
    </linearGradient>
  </defs>
  ${
    rounded
      ? `<rect width="512" height="512" rx="116" fill="${bg}"/>`
      : `<rect width="512" height="512" fill="${bg}"/>`
  }
  <path fill="url(#grad)" d="M116 396 L116 324 L188 324 L188 252 L260 252 L260 180 L332 180 L332 108 L404 108 L404 396 Z"/>
  <rect x="116" y="404" width="288" height="20" rx="10" fill="#3b9eff"/>
</svg>`;

const targets = [
  { name: 'icons/icon-192.png', size: 192, svg: svg('#13171f', true) },
  { name: 'icons/icon-512.png', size: 512, svg: svg('#13171f', true) },
  { name: 'icons/maskable-512.png', size: 512, svg: svg('#0c0f14', false) },
  { name: 'apple-touch-icon.png', size: 180, svg: svg('#13171f', true) },
  { name: 'favicon.png', size: 64, svg: svg('#13171f', true) },
];

await mkdir(ICONS, { recursive: true });

for (const t of targets) {
  await sharp(Buffer.from(t.svg))
    .resize(t.size, t.size)
    .png()
    .toFile(join(PUBLIC, t.name));
  console.log('wrote', t.name);
}

console.log('icons done');

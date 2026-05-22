/*
 * Generates PWA icons from an inline SVG so the repo carries no binary blobs
 * that drift from the brand. Run with: npm run icons
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
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
  // 96px — square and a multiple of 48px, per Google's requirements for
  // favicons shown in Search results.
  { name: 'favicon.png', size: 96, svg: svg('#13171f', true) },
];

await mkdir(ICONS, { recursive: true });

for (const t of targets) {
  await sharp(Buffer.from(t.svg))
    .resize(t.size, t.size)
    .png()
    .toFile(join(PUBLIC, t.name));
  console.log('wrote', t.name);
}

// favicon.ico — sharp has no ICO encoder, so wrap a 48x48 PNG in a minimal
// single-image ICO container (modern .ico files may carry a PNG payload).
const png48 = await sharp(Buffer.from(svg('#13171f', true)))
  .resize(48, 48)
  .png()
  .toBuffer();
const entry = Buffer.alloc(16);
entry[0] = 48; // width
entry[1] = 48; // height
entry.writeUInt16LE(1, 4); // color planes
entry.writeUInt16LE(32, 6); // bits per pixel
entry.writeUInt32LE(png48.length, 8); // image data size
entry.writeUInt32LE(22, 12); // offset: 6-byte header + 16-byte entry
const ico = Buffer.concat([
  Buffer.from([0, 0, 1, 0, 1, 0]), // ICONDIR: reserved, type=icon, count=1
  entry,
  png48,
]);
await writeFile(join(PUBLIC, 'favicon.ico'), ico);
console.log('wrote favicon.ico');

console.log('icons done');

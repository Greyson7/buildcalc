/*
 * Generates PWA icons from an inline SVG so the repo carries no binary blobs
 * that drift from the brand. Run with: npm run icons
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const PUBLIC = join(process.cwd(), 'public');
const ICONS = join(PUBLIC, 'icons');

/** Stacked masonry courses with a small "+" — construction + calculator mark. */
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
      ? `<rect width="512" height="512" rx="116" fill="${bg}"/>
         <rect x="64" y="64" width="384" height="384" rx="76" fill="url(#grad)"/>`
      : `<rect width="512" height="512" fill="url(#grad)"/>`
  }
  <g fill="${bg}">
    <rect x="112" y="320" width="288" height="64" rx="10"/>
    <rect x="80" y="240" width="160" height="64" rx="10"/>
    <rect x="256" y="240" width="176" height="64" rx="10"/>
    <rect x="112" y="160" width="288" height="64" rx="10"/>
    <path d="M240 96 H272 V128 H304 V160 H272 V192 H240 V160 H208 V128 H240 Z"/>
  </g>
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

// Open Graph / social share card — 1200x630, the frame every platform crops
// link previews to. Pre-generated and committed so the static export ships a
// real preview image; wired up via openGraph.images in src/app/layout.tsx.
const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="og-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ff9242"/>
      <stop offset="1" stop-color="#e0610a"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#0c0f14"/>
  <g transform="translate(600 138) scale(0.42) translate(-260 -256)">
    <rect x="64" y="64" width="384" height="384" rx="76" fill="url(#og-grad)"/>
    <g fill="#0c0f14">
      <rect x="112" y="320" width="288" height="64" rx="10"/>
      <rect x="80" y="240" width="160" height="64" rx="10"/>
      <rect x="256" y="240" width="176" height="64" rx="10"/>
      <rect x="112" y="160" width="288" height="64" rx="10"/>
      <path d="M240 96 H272 V128 H304 V160 H272 V192 H240 V160 H208 V128 H240 Z"/>
    </g>
  </g>
  <text x="600" y="382" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="128" font-weight="bold" fill="#f3f5f8">BuildCalc</text>
  <text x="600" y="460" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="bold" fill="#ff7a1a">Free Construction Calculators</text>
  <text x="600" y="528" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="29" fill="#8b97a8">Stairs &#183; Concrete &#183; Roofing &#183; Decking &#183; Quick Math</text>
  <rect x="0" y="624" width="1200" height="6" fill="url(#og-grad)"/>
</svg>`;
await sharp(Buffer.from(ogSvg)).png().toFile(join(PUBLIC, 'og-image.png'));
console.log('wrote og-image.png');

console.log('icons done');

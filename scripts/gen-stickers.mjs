/*
 * Generates QR codes + composed 3"x3" sticker artwork for the print campaign.
 *
 *   public/qr/<name>.{svg,png}      — bare QR codes, reusable in any layout
 *   stickers/<name>.{svg,png}       — print-ready stickers (logo + headline +
 *                                     QR + sub copy + footer), 900x900 @ 300dpi
 *
 * Run with: npm run stickers
 *
 * Each sticker URL carries a unique utm_source so Plausible attributes
 * traffic and Affiliate Click goals back to the specific sticker placement.
 */
import sharp from 'sharp';
import QRCode from 'qrcode';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const OUT_QR = join(process.cwd(), 'public', 'qr');
const OUT_STICKERS = join(process.cwd(), 'stickers');

const SITE = 'https://buildprocalc.com';

/**
 * @typedef {Object} StickerSpec
 * @property {string} name        File-name slug.
 * @property {2 | 3}  sizeIn      Physical print size in inches (square).
 *                                Hardware-store stickers run small (2") so
 *                                they fit shelf edge tags / aisle markers;
 *                                jobsite stickers run large (3") to be
 *                                readable across a trailer wall.
 * @property {string} band        Hex for the top color band (the visual
 *                                differentiator that lets the user tell
 *                                concrete vs paint at a glance).
 * @property {string} url         The QR target — includes UTM tags so the
 *                                Plausible dashboard reports per-sticker.
 * @property {string} head1       Headline first line.
 * @property {string} head2       Headline second line.
 * @property {string} [head2Color] Optional override for line 2 color.
 *                                Defaults to band color (the "visual tie-back"
 *                                pattern). Override when the band is dark/
 *                                neutral so line 2 still pops.
 * @property {string} sub         One-line informative subtitle under the QR.
 *                                Trimmed for the 2" stickers to keep the QR
 *                                proportionally large enough for reliable
 *                                scanning at 1-2 ft.
 */
const STICKERS = [
  {
    name: 'concrete',
    sizeIn: 2,
    band: '#525965',
    url: `${SITE}/how-many-bags-of-concrete-for-a-10x10-slab/?utm_source=qr-sticker-concrete&utm_medium=print&utm_campaign=hardware-stores`,
    head1: 'HOW MANY',
    head2: 'BAGS?',
    sub: 'Free concrete calculator. Works offline.',
  },
  {
    name: 'paint',
    sizeIn: 2,
    band: '#1d4ed8',
    url: `${SITE}/how-much-paint-for-a-12x12-room/?utm_source=qr-sticker-paint&utm_medium=print&utm_campaign=hardware-stores`,
    head1: 'HOW MANY',
    head2: 'GALLONS?',
    sub: 'Free paint calculator. Works offline.',
  },
  {
    name: 'jobsite',
    sizeIn: 3,
    band: '#0c0f14', // surface-0 black — classic black-and-orange pro palette
    head2Color: '#ff7a1a', // brand orange on line 2 so it still pops
    url: `${SITE}/?utm_source=qr-sticker-jobsite&utm_medium=print&utm_campaign=jobsites`,
    head1: 'NO SIGNAL.',
    head2: 'NO PROBLEM.',
    sub: 'Stairs, concrete, decking, rafters — full construction math, free, offline.',
  },
];

// 300 DPI → physical-size faithfully scalable to any printer. Bigger stickers
// get a slightly larger QR + room for the wordmark; the small 2" stickers
// drop the wordmark and tighten the layout so the QR stays ~60% of the
// sticker (the floor for reliable scanning at 1-2 ft).
const DPI = 300;
const LAYOUTS = {
  2: {
    W: 600, H: 600,
    band: 22,
    showWordmark: false,
    headlineY: 78,
    headlineSize: 50,
    headlineGap: 54,
    qrSize: 300,
    qrTop: 175,
    subSize: 18,
    subGap: 40,
    footer: 46,
    footerSize: 22,
    frameStroke: 2,
    frameInset: 8,
  },
  3: {
    W: 900, H: 900,
    band: 70,
    showWordmark: true,
    headlineY: 255,
    headlineSize: 74,
    headlineGap: 80,
    qrSize: 380,
    qrTop: 380,
    subSize: 24,
    subGap: 50,
    footer: 60,
    footerSize: 28,
    frameStroke: 3,
    frameInset: 14,
  },
};

await mkdir(OUT_QR, { recursive: true });
await mkdir(OUT_STICKERS, { recursive: true });

for (const s of STICKERS) {
  const L = LAYOUTS[s.sizeIn];
  const qrX = (L.W - L.qrSize) / 2;

  // --- 1. Bare QR (reusable in any future layout) ---
  const qrSvg = await QRCode.toString(s.url, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 1,
    color: { dark: '#000000', light: '#ffffff' },
  });
  await writeFile(join(OUT_QR, `${s.name}.svg`), qrSvg);
  await sharp(Buffer.from(qrSvg))
    .resize(800, 800)
    .png()
    .toFile(join(OUT_QR, `${s.name}.png`));

  // --- 2. QR PNG embedded in the sticker (data URI keeps the SVG portable) ---
  const qrPng = await QRCode.toBuffer(s.url, {
    errorCorrectionLevel: 'M',
    margin: 1,
    width: L.qrSize * 2,
    color: { dark: '#000000', light: '#ffffff' },
  });
  const qrDataUri = `data:image/png;base64,${qrPng.toString('base64')}`;

  // --- 3. Logo + wordmark block (only on 3" stickers — 2" hasn't got room) ---
  const wordmarkBlock = L.showWordmark
    ? `
  <g transform="translate(${L.W / 2 - 175} 105) scale(0.16) translate(-116 -108)">
    <path fill="#ff7a1a" d="M116 396 L116 324 L188 324 L188 252 L260 252 L260 180 L332 180 L332 108 L404 108 L404 396 Z"/>
    <rect x="116" y="404" width="288" height="20" rx="10" fill="#3b9eff"/>
  </g>
  <text x="${L.W / 2 - 95}" y="167" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="900" fill="#0c0f14" letter-spacing="-1">BuildCalc</text>`
    : '';

  // --- 4. Composed sticker artwork ---
  const stickerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${L.W}" height="${L.H}" viewBox="0 0 ${L.W} ${L.H}">
  <!-- white background, best for print + QR contrast -->
  <rect width="${L.W}" height="${L.H}" fill="#ffffff"/>

  <!-- audience indicator band (gray/blue/orange) -->
  <rect x="0" y="0" width="${L.W}" height="${L.band}" fill="${s.band}"/>${wordmarkBlock}

  <!-- headline: line 1 in ink, line 2 in band color (visual tie-back) -->
  <text x="${L.W / 2}" y="${L.headlineY}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${L.headlineSize}" font-weight="900" fill="#0c0f14" letter-spacing="-2">${s.head1}</text>
  <text x="${L.W / 2}" y="${L.headlineY + L.headlineGap}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${L.headlineSize}" font-weight="900" fill="${s.head2Color ?? s.band}" letter-spacing="-2">${s.head2}</text>

  <!-- QR with a thin frame so it reads as a tappable target -->
  <rect x="${qrX - L.frameInset}" y="${L.qrTop - L.frameInset}" width="${L.qrSize + L.frameInset * 2}" height="${L.qrSize + L.frameInset * 2}" rx="12" fill="#ffffff" stroke="#0c0f14" stroke-width="${L.frameStroke}"/>
  <image x="${qrX}" y="${L.qrTop}" width="${L.qrSize}" height="${L.qrSize}" href="${qrDataUri}"/>

  <!-- sub copy below QR -->
  <text x="${L.W / 2}" y="${L.qrTop + L.qrSize + L.subGap}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${L.subSize}" fill="#374151">${s.sub}</text>

  <!-- footer band in brand orange with domain in white -->
  <rect x="0" y="${L.H - L.footer}" width="${L.W}" height="${L.footer}" fill="#ff7a1a"/>
  <text x="${L.W / 2}" y="${L.H - L.footer / 2 + L.footerSize / 3}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${L.footerSize}" font-weight="900" fill="#ffffff" letter-spacing="1">buildprocalc.com</text>
</svg>`;

  await writeFile(join(OUT_STICKERS, `${s.name}.svg`), stickerSvg);
  await sharp(Buffer.from(stickerSvg))
    .png()
    .toFile(join(OUT_STICKERS, `${s.name}.png`));
  console.log(`wrote ${s.name}: ${s.sizeIn}"x${s.sizeIn}" (${L.W}px @ ${DPI}dpi)`);
}

console.log('stickers done');

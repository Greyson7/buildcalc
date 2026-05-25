import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-much-paint-for-a-10x10-room/';
const TITLE = 'How Much Paint for a 10x10 Room?';
const DESCRIPTION =
  'A 10 × 10 room with 8 ft ceilings has 320 sq ft of wall — about 2 gallons of paint for two coats, after subtracting one door and one window. Full math, ceiling math, and which finish goes where.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: ROUTE },
  openGraph: {
    title: `${TITLE} · BuildCalc`,
    description: DESCRIPTION,
    url: ROUTE,
    type: 'article',
    images: ['/og-image.png'],
  },
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DESCRIPTION,
  mainEntityOfPage: `https://buildprocalc.com${ROUTE}`,
  author: { '@type': 'Organization', name: 'BuildCalc' },
  publisher: { '@type': 'Organization', name: 'BuildCalc' },
};

const FAQ: QA[] = [
  {
    q: 'How many gallons of paint do I need for a 10x10 room?',
    a: 'For walls only with one door and one window subtracted: about 285 sq ft × 2 coats = 570 sq ft of coverage = 2 gallons. For ceiling: 100 sq ft × 2 coats = 200 sq ft = 1 gallon. Total for the room: about 3 gallons.',
  },
  {
    q: 'How much paint do I need for two coats?',
    a: 'Always plan for two coats on a color change or fresh drywall — that doubles your coverage needs. One coat is rarely enough for full color depth, especially with lighter or trendy mid-tone colors over a different base.',
  },
  {
    q: 'How much wall area does one gallon of paint cover?',
    a: 'About 350 to 400 sq ft per gallon with one coat on smooth drywall. Rough textures (orange peel, knockdown, popcorn), porous primers, and dark-to-light color changes can cut that to 250 sq ft per gallon.',
  },
  {
    q: 'Should I paint the ceiling and walls the same color?',
    a: 'No — use a flat or matte ceiling-specific paint for the ceiling (hides imperfections, no glare) and eggshell or satin for the walls (wipeable, holds up to traffic). The ceiling paint is also formulated to roll without dripping.',
  },
  {
    q: 'What finish should I use for a 10x10 bedroom?',
    a: 'Walls: eggshell or matte (subtle, easy to clean). Trim and doors: semi-gloss or satin (washable, takes some abuse). Ceiling: flat ceiling paint. For bathrooms or kitchens at this size, step walls up to satin or semi-gloss for moisture resistance.',
  },
  {
    q: 'How much primer do I need for a 10x10 room?',
    a: 'About 1 gallon for the walls if you are going over previously painted in a similar color, or if you are using a paint-and-primer-in-one. Use a dedicated primer (about 1 gallon) when going over fresh drywall, stains, dark colors, or oil-based finishes.',
  },
];

const ROWS = [
  { ceiling: '8 ft', wallSqft: 320, less: 320 - 35, coats1: 1, coats2: 2 },
  { ceiling: '9 ft', wallSqft: 360, less: 360 - 35, coats1: 1, coats2: 2 },
  { ceiling: '10 ft', wallSqft: 400, less: 400 - 35, coats1: 2, coats2: 3 },
];

export default function Paint10x10GuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/paint/"
          buttonLabel="Calculate for your room"
          description="The example below is a 10′ × 10′ × 8′ room with one door and one window. Tap here for any room size, ceiling height and number of openings."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Paint
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Much Paint for a 10×10 Room?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The most-searched bedroom size — small primary bedrooms, kid&apos;s
            rooms, home offices. Here is the wall math, the ceiling math, and
            what to buy at the paint counter.
          </p>
        </header>

        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> a 10 × 10 × 8 ft
            room with one door and one window needs about{' '}
            <span className="font-bold text-brand-light">2 gallons</span> of
            wall paint (two coats) and{' '}
            <span className="font-bold text-brand-light">1 gallon</span> of
            ceiling paint. Buy 3 gallons total, plus a quart of trim paint.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Wall area first, with openings subtracted:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Wall area</span> = perimeter
              × ceiling height. (10 + 10 + 10 + 10) × 8 ={' '}
              <span className="font-mono font-bold text-ink">320 sq ft</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Subtract one door</span>{' '}
              (~20 sq ft for a 3 × 6.7 ft door) and{' '}
              <span className="font-bold text-ink">one window</span> (~15 sq
              ft): 320 − 35 ={' '}
              <span className="font-mono font-bold text-ink">285 sq ft</span>{' '}
              of paintable wall.
            </li>
            <li>
              <span className="font-bold text-ink">Two coats</span> = 285 × 2 ={' '}
              <span className="font-mono font-bold text-ink">570 sq ft of coverage</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Divide by gallon
              coverage</span> (350 sq ft/gal): 570 ÷ 350 ={' '}
              <span className="font-mono font-bold text-ink">1.63 → 2 gallons</span>{' '}
              of wall paint.
            </li>
            <li>
              <span className="font-bold text-ink">Ceiling</span> = 10 × 10 ={' '}
              <span className="font-mono font-bold text-ink">100 sq ft</span> ×
              2 coats = 200 sq ft = 1 gallon (smallest available).
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            By ceiling height
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Wall area grows linearly with ceiling height. Older homes often
            have 9 ft ceilings; modern builds and additions sometimes go to 10.
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left">
                  <th className="px-3 py-2 font-bold">Ceiling</th>
                  <th className="px-3 py-2 font-bold">Walls</th>
                  <th className="px-3 py-2 font-bold">After openings</th>
                  <th className="px-3 py-2 font-bold">1 coat</th>
                  <th className="px-3 py-2 font-bold">2 coats</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROWS.map((r) => (
                  <tr key={r.ceiling}>
                    <td className="px-3 py-2 font-mono font-bold text-ink">
                      {r.ceiling}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.wallSqft} sf
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.less} sf
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.coats1} gal
                    </td>
                    <td className="px-3 py-2 font-mono font-bold text-brand-light">
                      {r.coats2} gal
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            Assumes 1 door + 1 window (35 sq ft of openings) and 350 sq ft per
            gallon. Add 1 gallon for ceiling.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Which paint where
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Walls</span>: eggshell or
              matte. Wipeable enough for fingerprints, low enough sheen to hide
              minor wall imperfections. Bathrooms and kitchens: bump up to
              satin.
            </li>
            <li>
              <span className="font-bold text-ink">Ceiling</span>: dedicated
              flat ceiling paint. Cheaper than wall paint, hides patches and
              roller marks, no glare from overhead lights.
            </li>
            <li>
              <span className="font-bold text-ink">Trim, doors, window
              casings</span>: semi-gloss or satin enamel. A quart of trim paint
              covers a typical room (one door, baseboards, window casings).
            </li>
            <li>
              <span className="font-bold text-ink">Primer</span>: skip if going
              over the same color or a similar tone. Use it on fresh drywall,
              stains, dark-to-light color changes, or over oil-based finishes.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Shopping list for a 10×10 room
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink-dim">
            <li>• 2 gallons wall paint (eggshell)</li>
            <li>• 1 gallon ceiling paint (flat)</li>
            <li>• 1 quart trim paint (semi-gloss)</li>
            <li>• 1 gallon primer if needed</li>
            <li>• 2 sleeves of 9-inch roller covers (medium nap for walls, smooth for trim)</li>
            <li>• 1 angled 2.5 inch trim brush</li>
            <li>• 1 roll of 1.88-inch painter&apos;s tape</li>
            <li>• 1 canvas drop cloth</li>
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate for your own room
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            BuildCalc&apos;s paint calculator takes room dimensions, ceiling
            height, and the number of doors and windows — and returns gallons
            for one and two coats.
          </p>
          <Link
            href="/paint/"
            className="tap mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-surface-0 active:bg-brand-dark"
          >
            Open the paint calculator →
          </Link>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">FAQ</h2>
          <div className="mt-3">
            <Faq items={FAQ} />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Related guides
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink-dim">
            <li>
              <Link
                href="/how-much-paint-for-a-12x12-room/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How much paint for a 12×12 room?
              </Link>{' '}
              — one size up, same math.
            </li>
            <li>
              <Link
                href="/how-many-sheets-of-drywall-for-a-12x12-room/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many sheets of drywall for a 12×12 room?
              </Link>{' '}
              — for finishing a wall before you paint it.
            </li>
          </ul>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      </article>

      <SiteFooter />
    </>
  );
}

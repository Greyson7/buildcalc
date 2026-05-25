import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-many-sheets-of-drywall-for-a-12x12-room/';
const TITLE = 'How Many Sheets of Drywall for a 12x12 Room?';
const DESCRIPTION =
  'A 12 × 12 room with 8 ft ceilings needs 12 sheets of 4 × 8 drywall for the walls and 5 for the ceiling — 17 sheets total, or 18 to 19 with a 10% waste factor. Math, sheet-size table and screws/mud quantities.';

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
    q: 'How many sheets of 4x8 drywall do I need for a 12x12 room?',
    a: '17 sheets net: 12 for the walls (384 sq ft) + 5 for the ceiling (144 sq ft). Add 10 percent waste and round up to 19 sheets, especially if you have multiple openings or you are a first-time hanger.',
  },
  {
    q: 'Should I use 4x8 or 4x12 sheets of drywall?',
    a: '4 × 12 sheets are better when you can manage the weight (about 82 lb each for 1/2 inch) — they create fewer butt joints, which are the joints that show. 4 × 8 are easier to handle solo and fit through doorways. For a 12 × 12 room, 4 × 12 sheets hung horizontally span the wall in one piece — that is the cleanest finish.',
  },
  {
    q: 'What thickness drywall should I use?',
    a: '1/2 inch is standard for walls in residential construction. 5/8 inch is required for garage/house separations, ceilings with 24-inch joist spacing, and most fire-rated walls. 1/4 inch is for curved walls or skim-coating over existing surfaces.',
  },
  {
    q: 'How many screws do I need for a 12x12 room?',
    a: 'About 350 to 450 drywall screws. Field screws go 12 inches on-center, perimeter 8 inches. For 17 sheets that is roughly 25 screws per sheet on walls, 30 on the ceiling. Buy a 5 lb bucket of 1-1/4 inch coarse-thread screws (about 750 screws) and you will have plenty.',
  },
  {
    q: 'How much joint compound and tape do I need?',
    a: 'For 17 sheets at 4 × 8: 5 gallons of all-purpose joint compound (a typical bucket) and 250 to 300 ft of paper tape or mesh tape. Add a smaller bag or bucket of setting-type compound (20 or 45 minute) for filling deeper gaps and pre-filling butt joints.',
  },
  {
    q: 'Can I hang drywall by myself?',
    a: 'Yes for walls, with a drywall lift or a few brackets. For ceilings, rent a drywall lift — even 4 × 8 sheets at 56 lb overhead are dangerous solo. A drywall lift rents for $30 to $50 per day.',
  },
];

const ROWS = [
  { sheet: '4 × 8 (32 sf)', walls: 12, ceiling: 5, total: 17 },
  { sheet: '4 × 10 (40 sf)', walls: 10, ceiling: 4, total: 14 },
  { sheet: '4 × 12 (48 sf)', walls: 8, ceiling: 3, total: 11 },
];

export default function DrywallGuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/drywall/"
          buttonLabel="Calculate for your room"
          description="The example below is a 12 × 12 × 8 ft room. Tap here for any room size, ceiling height and sheet size — the calculator handles the math automatically."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Drywall
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Sheets of Drywall for a 12×12 Room?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The standard primary-bedroom and small-living-room size. Here is
            the count for the three common sheet sizes, plus what else to put
            in the cart.
          </p>
        </header>

        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> a 12 × 12 × 8 ft
            room with 4 × 8 sheets needs{' '}
            <span className="font-bold text-brand-light">17 sheets net</span>{' '}
            (12 walls + 5 ceiling) — bump to{' '}
            <span className="font-bold text-brand-light">19 sheets</span> with
            a 10 percent waste factor. 4 × 12 sheets cut that to 11 sheets
            total with fewer butt joints.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Drywall is just area math, divided by sheet area:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Wall area</span> = perimeter
              × ceiling height. (12 + 12 + 12 + 12) × 8 ={' '}
              <span className="font-mono font-bold text-ink">384 sq ft</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Ceiling area</span> = 12 ×
              12 = <span className="font-mono font-bold text-ink">144 sq ft</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Total</span> = 384 + 144 ={' '}
              <span className="font-mono font-bold text-ink">528 sq ft</span>{' '}
              of drywall.
            </li>
            <li>
              <span className="font-bold text-ink">Sheets needed</span> = total
              ÷ sheet area. 528 ÷ 32 ={' '}
              <span className="font-mono font-bold text-ink">16.5 → 17 sheets</span>{' '}
              of 4 × 8 (no waste factor).
            </li>
            <li>
              <span className="font-bold text-ink">Add 10% waste</span> = 17 ×
              1.10 = <span className="font-mono font-bold text-ink">19 sheets</span>{' '}
              to buy.
            </li>
          </ol>
          <p className="mt-2 text-xs text-ink-faint">
            We don&apos;t subtract for doors and windows because the cutoffs go
            to waste anyway, and the math comes out close to a 10 percent
            allowance.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            By sheet size
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Bigger sheets mean fewer joints to tape and float. For a 12 × 12
            wall, a 4 × 12 sheet spans the entire wall horizontally — that
            eliminates butt joints (the ugly ones).
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left">
                  <th className="px-3 py-2 font-bold">Sheet size</th>
                  <th className="px-3 py-2 font-bold">Walls (12 × 12 × 8)</th>
                  <th className="px-3 py-2 font-bold">Ceiling (12 × 12)</th>
                  <th className="px-3 py-2 font-bold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROWS.map((r) => (
                  <tr key={r.sheet}>
                    <td className="px-3 py-2 font-mono font-bold text-ink">
                      {r.sheet}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.walls} sheets
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.ceiling} sheets
                    </td>
                    <td className="px-3 py-2 font-mono font-bold text-brand-light">
                      {r.total} sheets
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            Rounded up. Add 10 percent for waste, more for cut-up rooms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Everything else for the room
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Screws</span>: 1 bucket (5
              lb, ~750 screws) of 1-1/4 inch coarse-thread drywall screws.
              About 350 to 450 needed for a 12 × 12 room.
            </li>
            <li>
              <span className="font-bold text-ink">Joint compound</span>: 1
              bucket of 5 gallon all-purpose ready-mix.
            </li>
            <li>
              <span className="font-bold text-ink">Tape</span>: 250 to 300 ft
              of paper tape (one roll) or mesh tape. Paper is stronger; mesh is
              easier for beginners.
            </li>
            <li>
              <span className="font-bold text-ink">Corner bead</span>: one 8 or
              10 ft piece per outside corner.
            </li>
            <li>
              <span className="font-bold text-ink">Sanding</span>: 120 and 220
              grit sanding screens, plus a sanding pole.
            </li>
            <li>
              <span className="font-bold text-ink">Primer</span>: 1 gallon
              before painting — fresh drywall is too porous for paint alone.
            </li>
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate for your own room
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Punch in dimensions, ceiling height and sheet size — BuildCalc
            returns sheets, screws and joint compound estimates.
          </p>
          <Link
            href="/drywall/"
            className="tap mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-surface-0 active:bg-brand-dark"
          >
            Open the drywall calculator →
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
              — what comes after the drywall.
            </li>
            <li>
              <Link
                href="/how-much-paint-for-a-10x10-room/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How much paint for a 10×10 room?
              </Link>{' '}
              — smaller room, same wall math.
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

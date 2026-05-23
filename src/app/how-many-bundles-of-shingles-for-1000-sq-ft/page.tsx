import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-many-bundles-of-shingles-for-1000-sq-ft/';
const TITLE = 'How Many Bundles of Shingles for 1,000 Sq Ft?';
const DESCRIPTION =
  '1,000 sq ft of roof is 10 squares — that needs about 33 bundles of standard architectural shingles including waste, plus a few extra for starter strip and ridge cap. Full math, a table by shingle type, and what else to buy with them.';

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
    q: 'How many bundles of shingles are in a square?',
    a: 'Most asphalt shingles — 3-tab and standard architectural like GAF Timberline HDZ or Owens Corning Duration — come 3 bundles per square (100 sq ft). Heavier designer shingles (GAF Camelot, Timberline UHDZ) often come 4 or even 5 bundles per square because each bundle weighs the same but covers less area. Always check the bundle label.',
  },
  {
    q: 'How much waste should I add for shingles?',
    a: 'Plan for 10 percent waste on a simple gable roof — that covers ridge cuts, valleys and ends. A roof with hips, dormers and lots of cut-up geometry should bump that to 15 percent. Steep pitches (above 8/12) often need more, because shingles dragged up the roof get scuffed.',
  },
  {
    q: 'Do I need to buy starter strip and ridge cap separately?',
    a: 'Yes, in most cases. Modern best practice uses a dedicated starter strip product along the eaves (1 bundle covers ~80 to 120 linear feet) and a matching hip-and-ridge cap product on the peaks (1 bundle covers ~25 to 35 linear feet). You can cut starter from 3-tab bundles, but pre-made starter has the sealant strip in the right place and saves time.',
  },
  {
    q: 'How is roof area measured — by footprint or actual surface?',
    a: 'By actual surface area, not the ground footprint. A 1,000 sq ft footprint at a 6/12 pitch is actually 1,118 sq ft of roof. The steeper the pitch, the bigger the multiplier — 4/12 = 1.054x, 6/12 = 1.118x, 8/12 = 1.202x, 12/12 = 1.414x. Measure the actual surface or apply the pitch multiplier to your footprint.',
  },
  {
    q: 'How many roofing nails do I need per square?',
    a: 'Plan for 320 nails per square (4 nails per shingle × 80 shingles per square). High-wind areas often require 6 nails per shingle = 480 nails per square. A 1-lb box holds about 140 nails (1.5 inch roofing nails), so 1,000 sq ft is roughly 25 lb of nails — buy a 30 lb box and have leftovers for repairs.',
  },
  {
    q: 'What else do I need besides shingles for 1,000 sq ft?',
    a: 'Underlayment (3 to 4 rolls of synthetic at 1,000 sq ft per roll), ice-and-water shield at the eaves and valleys (1 roll per 200 sq ft), drip edge (one 10 ft piece per 10 ft of edge), pipe boots and step flashing as needed, and a 30 lb box of 1.5 inch roofing nails. Budget about 1.5x to 2x the shingle cost for everything else.',
  },
];

const ROWS = [
  { type: '3-tab asphalt', perSquare: 3, baseBundles: 30, withWaste: 33 },
  { type: 'Architectural (standard)', perSquare: 3, baseBundles: 30, withWaste: 33 },
  { type: 'Architectural (heavy)', perSquare: 4, baseBundles: 40, withWaste: 44 },
  { type: 'Designer / luxury', perSquare: 5, baseBundles: 50, withWaste: 55 },
];

export default function ShinglesGuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/roofing/"
          buttonLabel="Calculate for your roof"
          description="The example below is 1,000 sq ft of roof surface. Tap here for any roof size and pitch — the calculator handles pitch multipliers and waste factor automatically."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Roofing
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Bundles of Shingles for 1,000 Sq Ft?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            One of the most asked roofing questions, because 1,000 sq ft is
            roughly the roof of a small to mid-size single story house or one
            slope of a larger one. Here is the math, the difference between
            shingle types, and what else you need to budget for.
          </p>
        </header>

        {/* TL;DR */}
        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> 1,000 sq ft of roof
            = 10 squares. At standard 3 bundles per square that&apos;s{' '}
            <span className="font-bold text-brand-light">30 bundles</span> of
            architectural or 3-tab shingles —{' '}
            <span className="font-bold text-brand-light">33 bundles</span> with
            a 10% waste factor. Plus about{' '}
            <span className="font-bold text-brand-light">2 bundles of starter</span>{' '}
            and{' '}
            <span className="font-bold text-brand-light">2 bundles of ridge cap</span>,
            so call it 37 bundles total for a typical gable roof.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Roofing is sold and ordered in &quot;squares&quot; — 1 square =
            100 sq ft of roof surface. The math is just division:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Squares</span> = sq ft ÷
              100. 1,000 ÷ 100 ={' '}
              <span className="font-mono font-bold text-ink">10 squares</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Bundles for the field</span>{' '}
              = squares × bundles-per-square. Standard architectural or 3-tab
              is 3 bundles/square: 10 × 3 ={' '}
              <span className="font-mono font-bold text-ink">30 bundles</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Add waste</span>. A simple
              gable roof takes 10 percent for cuts and ridge work: 30 × 1.10 ={' '}
              <span className="font-mono font-bold text-ink">33 bundles</span>{' '}
              of shingles for the field.
            </li>
            <li>
              <span className="font-bold text-ink">Starter strip</span> goes
              along every eave at 1 bundle per ~100 linear feet. A typical
              1,000 sq ft roof has ~80 to 120 ft of eave = 1 to 2 bundles.
            </li>
            <li>
              <span className="font-bold text-ink">Hip and ridge cap</span> at
              1 bundle per ~30 linear feet of ridge. A simple gable has 30 to
              50 ft of ridge = 1 to 2 bundles.
            </li>
            <li>
              <span className="font-bold text-ink">Total</span>: ~33 field + 2
              starter + 2 ridge ={' '}
              <span className="font-mono font-bold text-ink">~37 bundles</span>{' '}
              for a typical 1,000 sq ft gable roof.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            By shingle type
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Bundle count is not the same across shingle types. Heavier
            designer shingles weigh the same per bundle but cover less area —
            so you need more bundles per square.
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left">
                  <th className="px-3 py-2 font-bold">Shingle type</th>
                  <th className="px-3 py-2 font-bold">Per square</th>
                  <th className="px-3 py-2 font-bold">10 sq base</th>
                  <th className="px-3 py-2 font-bold">+10% waste</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROWS.map((r) => (
                  <tr key={r.type}>
                    <td className="px-3 py-2 font-mono font-bold text-ink">
                      {r.type}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.perSquare} bundles
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.baseBundles}
                    </td>
                    <td className="px-3 py-2 font-mono font-bold text-brand-light">
                      {r.withWaste}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            Bundle counts cover the field only. Add 2 to 4 bundles for starter
            strip and ridge cap on a typical 1,000 sq ft roof.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            What changes the number
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Roof complexity.</span>{' '}
              Hips, valleys and dormers eat shingles fast. A cut-up roof
              should run 15 percent waste instead of 10 — that&apos;s 5 extra
              bundles on a 1,000 sq ft roof.
            </li>
            <li>
              <span className="font-bold text-ink">Roof pitch.</span> If you
              measured the ground footprint, you need to multiply by the pitch
              factor to get actual roof area: 4/12 = 1.054x, 6/12 = 1.118x,
              8/12 = 1.202x, 10/12 = 1.302x, 12/12 = 1.414x. A 1,000 sq ft
              footprint at 8/12 is 1,202 sq ft of roof — about 4 extra bundles.
            </li>
            <li>
              <span className="font-bold text-ink">Starter strip choice.</span>{' '}
              Pre-made starter (1 bundle per ~100 ft) is faster and has the
              sealant strip in the right spot. Cutting starter from 3-tab
              bundles saves a little money but adds labor.
            </li>
            <li>
              <span className="font-bold text-ink">Ridge cap type.</span>{' '}
              Dedicated hip-and-ridge cap (GAF Seal-A-Ridge, Timbertex) covers
              25 to 35 ft per bundle. Cutting cap from 3-tab gives more
              coverage but doesn&apos;t match architectural shingles visually.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Don&apos;t forget the rest
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Shingles are roughly half the material cost on a re-roof. Budget
            for these as well, for 1,000 sq ft of roof:
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Underlayment</span>:
              synthetic felt or 30 lb felt paper, about 3 to 4 rolls.
            </li>
            <li>
              <span className="font-bold text-ink">Ice and water shield</span>:
              at eaves and valleys, ~2 rolls (200 sq ft each) for a typical
              house.
            </li>
            <li>
              <span className="font-bold text-ink">Drip edge</span>: one 10 ft
              piece per 10 ft of roof edge; figure 10 to 16 pieces.
            </li>
            <li>
              <span className="font-bold text-ink">Roofing nails</span>: 4
              nails per shingle (6 in high-wind zones) = 25 to 40 lb of 1.5″
              roofing nails.
            </li>
            <li>
              <span className="font-bold text-ink">Pipe boots and step flashing</span>{' '}
              for plumbing vents, sidewalls and chimneys.
            </li>
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate for your own roof
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            BuildCalc&apos;s roofing calculator takes your roof footprint and
            pitch, converts to actual surface area, applies your chosen waste
            factor, and returns bundles needed plus a live material cost.
          </p>
          <Link
            href="/roofing/"
            className="tap mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-surface-0 active:bg-brand-dark"
          >
            Open the roofing calculator →
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
                href="/how-many-bags-of-concrete-for-a-10x10-slab/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a 10×10 slab?
              </Link>{' '}
              — for the patio you&apos;re pouring under the new roofline.
            </li>
            <li>
              <Link
                href="/how-to-calculate-stair-stringers/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How to calculate stair stringers
              </Link>{' '}
              — for the deck or addition you&apos;re re-roofing.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Related calculators
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink-dim">
            <li>
              <Link
                href="/roofing/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                Roofing calculator
              </Link>{' '}
              — pitch, waste and bundle counts in one place.
            </li>
            <li>
              <Link
                href="/square-footage/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                Square footage calculator
              </Link>{' '}
              — for measuring the roof footprint or facade area.
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

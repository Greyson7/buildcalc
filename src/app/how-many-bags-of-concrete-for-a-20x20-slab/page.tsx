import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-many-bags-of-concrete-for-a-20x20-slab/';
const TITLE = 'How Many Bags of Concrete for a 20x20 Slab?';
const DESCRIPTION =
  'A 20x20 by 4-inch slab takes about 5.19 cubic yards of concrete; at 6 inches (two-car garage) it is 7.78 yd³. Bags are not realistic at this scale — full ready-mix math and order tips.';

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
    q: 'How many cubic yards of concrete is a 20x20 slab?',
    a: 'A 20 by 20 foot slab at 4 inches thick is about 4.94 cubic yards of net concrete. With a 5 percent waste allowance, order 5.19 cubic yards. At 6 inches thick (standard for a two-car garage) you are at 7.78 cubic yards.',
  },
  {
    q: 'How thick should a 20x20 garage slab be?',
    a: '6 inches is the standard for a two-car garage or workshop floor. Step up to 8 inches only for heavy commercial vehicles or stored equipment. 4 inches is for a patio or non-vehicle pad.',
  },
  {
    q: 'How many 80 lb bags would a 20x20 slab take?',
    a: 'At 4 inches: about 234 bags. At 6 inches: about 350 bags. These are theoretical — almost nobody bags a 20×20. The math is here as a reality check on why ready-mix is the only sane choice at this size.',
  },
  {
    q: 'How much does a 20x20 concrete pad cost?',
    a: 'Ready-mix runs about $150 to $200 per cubic yard delivered in most US markets, so a 4 inch 20×20 (5.19 yd³) is roughly $780 to $1,040 in material. A 6 inch garage slab (7.78 yd³) is $1,170 to $1,560 in material. Forms, rebar, vapor barrier, gravel base and finishing labor are separate — total installed cost typically runs $4,000 to $7,000.',
  },
  {
    q: 'Do I need a thickened edge on a 20x20 slab?',
    a: 'Yes — a free-standing 20×20 should have a 12 inch deep by 6 inch wide turn-down edge around the perimeter. That is about 80 linear feet × 0.5 ft² = 1.5 cubic yards extra, on top of the slab. Skip the thickened edge only when the pad butts up against an existing foundation.',
  },
  {
    q: 'How many people do I need to pour a 20x20 slab?',
    a: 'At least four. One on the chute or wheelbarrow, one screeding, one floating and one cutting in edges. With 5+ yards arriving on a truck you have under 90 minutes to place and screed before the concrete starts setting — being short-handed costs you the pour.',
  },
];

const ROWS = [
  { thickness: '3"', cuFt: '100.0', cuYd: '3.70', bags80: 175, bags60: 234 },
  { thickness: '4"', cuFt: '133.3', cuYd: '4.94', bags80: 234, bags60: 312 },
  { thickness: '6"', cuFt: '200.0', cuYd: '7.41', bags80: 350, bags60: 467 },
];

export default function ConcreteBags20x20GuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/concrete/"
          buttonLabel="Calculate for your slab"
          description="The example below is a 20′ × 20′ × 4″ slab. Tap here for any other size, depth or shape — including thickened-edge footings and round columns."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Concrete
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Bags of Concrete for a 20×20 Slab?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            A 20 by 20 foot pad is two-car garage territory. At this size,
            bagged concrete is a thought experiment — the right answer is to
            order ready-mix and plan the day around the truck arriving.
          </p>
        </header>

        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> a 20′ × 20′ × 4″
            slab takes{' '}
            <span className="font-bold text-brand-light">5.19 cubic yards</span>{' '}
            of concrete with waste. At 6 inches (standard garage floor) it is
            7.78 yd³. Theoretical bag count: 234 bags of 80 lb at 4 inches.
            Order ready-mix.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Volume in cubic feet</span>{' '}
              = 20 × 20 × (4 ÷ 12) ={' '}
              <span className="font-mono font-bold text-ink">133.33 ft³</span>{' '}
              at 4 inches, or 200 ft³ at 6 inches.
            </li>
            <li>
              <span className="font-bold text-ink">Cubic yards</span> = ft³ ÷
              27. 133.33 ÷ 27 ={' '}
              <span className="font-mono font-bold text-ink">4.94 yd³</span>{' '}
              net.
            </li>
            <li>
              <span className="font-bold text-ink">Add waste.</span> 4.94 ×
              1.05 ={' '}
              <span className="font-mono font-bold text-ink">5.19 yd³</span> to
              order. At 6 inches you are at 7.78 yd³.
            </li>
            <li>
              <span className="font-bold text-ink">Bags (theoretical)</span> at
              0.6 ft³ per 80 lb: ~234 bags at 4 inch, ~350 bags at 6 inch.
              Don&apos;t do this.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            By slab thickness
          </h2>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left">
                  <th className="px-3 py-2 font-bold">Thickness</th>
                  <th className="px-3 py-2 font-bold">ft³</th>
                  <th className="px-3 py-2 font-bold">yd³</th>
                  <th className="px-3 py-2 font-bold">80 lb bags</th>
                  <th className="px-3 py-2 font-bold">60 lb bags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROWS.map((r) => (
                  <tr key={r.thickness}>
                    <td className="px-3 py-2 font-mono font-bold text-ink">
                      {r.thickness}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.cuFt}
                    </td>
                    <td className="px-3 py-2 font-mono font-bold text-brand-light">
                      {r.cuYd}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.bags80}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.bags60}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            Includes a 5 percent waste factor. Bag columns are theoretical.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Planning the pour
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Order the right mix.</span>{' '}
              4,000 PSI for a garage or driveway slab. 3,500 PSI minimum if it
              is a covered patio.
            </li>
            <li>
              <span className="font-bold text-ink">Round up to whole
              yards.</span> 5.19 yd³ usually gets ordered as 5.5 yd³.
              Suppliers will deliver in 0.25 yd³ increments but you do not want
              to be short with a wet form ready to pour.
            </li>
            <li>
              <span className="font-bold text-ink">Time of day.</span> Schedule
              an early morning pour in summer — concrete sets faster in heat.
              In freezing weather, schedule mid-morning so the slab gets at
              least 6 hours above freezing before night.
            </li>
            <li>
              <span className="font-bold text-ink">Truck access.</span> A
              standard concrete truck needs about 11 ft of width and 14 ft of
              vertical clearance. Confirm overhead wires and tree branches
              before the truck shows up.
            </li>
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate for your own slab
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The numbers above are for a 20′ × 20′ × 4″ pad. For any other size,
            depth or shape — including thickened edges and round columns —
            BuildCalc&apos;s concrete calculator handles fractional input,
            waste factor and live material cost.
          </p>
          <Link
            href="/concrete/"
            className="tap mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-surface-0 active:bg-brand-dark"
          >
            Open the concrete calculator →
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
                href="/how-many-bags-of-concrete-for-a-16x20-slab/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a 16×20 slab?
              </Link>{' '}
              — single-car detached garage footprint.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-driveway/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a driveway?
              </Link>{' '}
              — typical driveway sizes and yards needed.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-12x12-slab/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a 12×12 slab?
              </Link>{' '}
              — small patio version of the same math.
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

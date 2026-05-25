import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-many-bags-of-concrete-for-a-16x20-slab/';
const TITLE = 'How Many Bags of Concrete for a 16x20 Slab?';
const DESCRIPTION =
  'A 16x20 by 4-inch slab needs about 187 bags of 80 lb concrete — but at 4.15 cubic yards, almost everyone should order ready-mix. Full math, garage-floor 6 inch numbers, and why bags rarely make sense at this size.';

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
    q: 'How many cubic yards of concrete is a 16x20 slab?',
    a: 'A 16 by 20 foot slab at 4 inches thick is about 3.95 cubic yards of net concrete. Add a 5 percent waste allowance and you order about 4.15 cubic yards. At 6 inches thick (garage-floor depth) you are at about 6.22 cubic yards.',
  },
  {
    q: 'Should a 16x20 garage slab be 4 or 6 inches?',
    a: '6 inches is the standard call for a garage or workshop floor — anywhere a vehicle parks. 4 inches is enough only for a covered patio, shed pad or other space that never sees a wheel. The IBC and most local codes are at 4 inches minimum residential, 6 inches if vehicles are involved.',
  },
  {
    q: 'Is bagged concrete realistic for a 16x20 slab?',
    a: 'No, not really. A 4 inch 16×20 needs 187 bags of 80 lb, which is 15,000 lbs of dry mix. Mixing and pouring that takes a small crew several days and the cold joints make the slab weaker than one continuous pour. Order ready-mix.',
  },
  {
    q: 'How much does 16x20 of concrete cost?',
    a: 'Ready-mix runs about $150 to $200 per cubic yard delivered in most US markets, so a 4 inch 16×20 (4.15 yd³) is roughly $625 to $830 for the material — plus a short-load fee if under 5 yards. A 6 inch garage slab (6.22 yd³) is $930 to $1,250 in material. Forms, rebar and finishing are separate.',
  },
  {
    q: 'How much rebar does a 16x20 slab need?',
    a: 'For a 4 inch patio: 16 in OC #3 rebar both directions, or a roll of 6×6 W2.9×W2.9 welded wire mesh. For a 6 inch garage floor: 12 in OC #4 rebar both directions, with the bars supported on chairs at slab mid-depth. That is roughly 280 ft of #3 for the patio or 580 ft of #4 for the garage.',
  },
  {
    q: 'Do I need a thickened edge on a free-standing slab?',
    a: 'Yes — a free-standing 16×20 pad benefits from a turn-down edge or footing around the perimeter. The standard detail is 12 inches deep by 6 inches wide. That adds roughly 0.7 cubic yards to the order. Skip the thickened edge only when the slab pours up against an existing foundation.',
  },
];

const ROWS = [
  { thickness: '3"', cuFt: '80.0', cuYd: '2.96', bags80: 140, bags60: 187 },
  { thickness: '4"', cuFt: '106.7', cuYd: '3.95', bags80: 187, bags60: 249 },
  { thickness: '6"', cuFt: '160.0', cuYd: '5.93', bags80: 280, bags60: 374 },
];

export default function ConcreteBags16x20GuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/concrete/"
          buttonLabel="Calculate for your slab"
          description="The example below is a 16′ × 20′ × 4″ slab. Tap here for any other size, depth or shape — including thickened-edge footings and round columns."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Concrete
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Bags of Concrete for a 16×20 Slab?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            A 16 by 20 foot pad is detached-garage / workshop / small-RV-pad
            territory — the size at which bagged concrete stops being a real
            option and the conversation becomes about yards delivered.
          </p>
        </header>

        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> a 16′ × 20′ × 4″
            slab needs about{' '}
            <span className="font-bold text-brand-light">4.15 cubic yards</span>{' '}
            of concrete — order ready-mix. That works out to 187 bags of 80 lb
            if you insisted on bagging it, which almost nobody should at this
            size. A 6 inch garage-grade pour is 6.22 yd³.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Volume in cubic feet</span>{' '}
              = 16 × 20 × (4 ÷ 12) ={' '}
              <span className="font-mono font-bold text-ink">106.67 ft³</span>{' '}
              at 4 inches, or 160 ft³ at 6 inches.
            </li>
            <li>
              <span className="font-bold text-ink">Cubic yards</span> = ft³ ÷
              27. 106.67 ÷ 27 ={' '}
              <span className="font-mono font-bold text-ink">3.95 yd³</span>{' '}
              net at 4 inches.
            </li>
            <li>
              <span className="font-bold text-ink">Add waste.</span> 3.95 ×
              1.05 ={' '}
              <span className="font-mono font-bold text-ink">4.15 yd³</span> to
              order. At 6 inches you are at 6.22 yd³.
            </li>
            <li>
              <span className="font-bold text-ink">Bags (theoretical)</span> at
              0.6 ft³ per 80 lb: ~187 bags. At 0.45 ft³ per 60 lb: ~249 bags.
              Realistically nobody bags a slab this size.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            By slab thickness
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Thickness drives the order, and on a 16×20 the difference between
            4 and 6 inches is over 2 cubic yards.
          </p>
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
            Includes a 5 percent waste factor. Bag columns are theoretical —
            order yards.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Order ready-mix, here is how
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Round up</span> the
              with-waste number. A 4 inch slab at 4.15 yd³ usually gets ordered
              as 4.5 yd³ to be safe.
            </li>
            <li>
              <span className="font-bold text-ink">Short-load fee.</span> Most
              suppliers charge $50 to $150 for any order under 5 cubic yards. A
              6 inch slab at 6.22 yd³ avoids the fee entirely — worth knowing
              if you are on the edge.
            </li>
            <li>
              <span className="font-bold text-ink">Get the right mix.</span>{' '}
              3,000 PSI is standard for patios and sheds. 4,000 PSI for
              driveways, garages and anywhere vehicles park.
            </li>
            <li>
              <span className="font-bold text-ink">Have a crew.</span> At 4+
              yards, you need at least three people: one to screed, one to
              float, one to manage the chute or wheelbarrow.
            </li>
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate for your own slab
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The numbers above are for a 16′ × 20′ × 4″ pad. For any other size,
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
                href="/how-many-bags-of-concrete-for-a-12x12-slab/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a 12×12 slab?
              </Link>{' '}
              — the common patio size below this one.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-20x20-slab/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a 20×20 slab?
              </Link>{' '}
              — full two-car garage footprint.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-driveway/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a driveway?
              </Link>{' '}
              — typical sizes and yards needed.
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

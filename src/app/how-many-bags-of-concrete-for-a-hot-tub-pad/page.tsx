import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-many-bags-of-concrete-for-a-hot-tub-pad/';
const TITLE = 'How Many Bags of Concrete for a Hot Tub Pad?';
const DESCRIPTION =
  'A standard 8x8 hot-tub pad at 6 inches needs about 56 bags of 80 lb concrete (or 75 bags of 60 lb) — roughly 1.25 cubic yards. Sizing chart for 7x7 to 10x10 pads, weight math, and why 6 inches is the minimum.';

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
    q: 'How thick should a hot tub pad be?',
    a: '6 inches is the minimum for a filled hot tub. A typical 7×7 ft tub holds 350 to 500 gallons of water plus 4 to 6 people — easily 5,000 lbs concentrated on the pad. 4 inches is not enough; the slab will crack from edge to edge within a season or two.',
  },
  {
    q: 'How big should a hot tub pad be?',
    a: 'Size the pad at least 1 foot larger than the tub on every side, so the pad is 2 feet larger than the tub overall. A 7×7 tub gets a 9×9 pad; an 8×8 tub gets a 10×10 pad. That gives you room for the access skirt and a place to stand to step in.',
  },
  {
    q: 'Should a hot tub pad be reinforced?',
    a: 'Yes. Use #4 rebar at 12 inch on-center both directions, supported on chairs at slab mid-depth, or use 6×6 W2.9×W2.9 welded wire mesh. The reinforcement is what keeps the slab in one piece under the concentrated load of a filled tub.',
  },
  {
    q: 'Can I put a hot tub on a regular concrete patio?',
    a: 'Only if the patio is 6 inches thick with reinforcement and rated for at least 100 lbs per square foot live load. Most existing residential patios are 4 inch with no reinforcement and will crack under a filled tub. When in doubt, pour a dedicated 6 inch pad.',
  },
  {
    q: 'How much does a 8x8 hot tub pad cost in concrete?',
    a: 'Bagged: 56 bags of 80 lb at roughly $5 to $7 per bag — about $280 to $400 in material. Ready-mix at 1.25 yd³ runs about $200 to $250 in concrete but adds a short-load fee of $50 to $150 since the pour is well under 5 yards. Bagged is usually the cheaper call at this size.',
  },
  {
    q: 'Does a hot tub pad need a footing?',
    a: 'For pads that stand alone on grade, no separate footing is required as long as the pad is 6 inches thick with reinforcement and sits on at least 4 inches of compacted gravel base. If you are building on an upper deck or unstable soil, talk to a structural engineer — the loading is significant.',
  },
];

const ROWS = [
  { size: '7×7', cuFt: '24.5', cuYd: '0.91', bags80: 43, bags60: 58 },
  { size: '8×8', cuFt: '32.0', cuYd: '1.19', bags80: 56, bags60: 75 },
  { size: '9×9', cuFt: '40.5', cuYd: '1.50', bags80: 71, bags60: 95 },
  { size: '10×10', cuFt: '50.0', cuYd: '1.85', bags80: 88, bags60: 117 },
];

export default function ConcreteBagsHotTubGuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/concrete/"
          buttonLabel="Calculate for your pad"
          description="The chart below is at the 6 inch hot-tub-pad standard. Tap here to enter your own dimensions, depth or shape — the calculator handles fractional sizes too."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Concrete
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Bags of Concrete for a Hot Tub Pad?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Hot tubs need their own dedicated 6 inch reinforced pad, sized
            slightly larger than the tub footprint. Here is the bag count for
            every common tub size and exactly why 6 inches is the floor.
          </p>
        </header>

        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> a standard 8′ × 8′
            × 6″ hot-tub pad needs about{' '}
            <span className="font-bold text-brand-light">56 bags of 80 lb</span>{' '}
            concrete mix — or{' '}
            <span className="font-bold text-brand-light">75 bags of 60 lb</span>.
            That works out to 1.25 cubic yards with a 5 percent waste
            allowance. Pads must be at least 6 inches thick and reinforced.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Why 6 inches is the minimum
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            A filled hot tub is heavy: a typical 6-person tub holds 400 gallons
            of water (3,300 lbs), weighs about 800 lbs empty, and adds another
            900 lbs of people. That is over 5,000 lbs centered on a footprint
            of less than 50 sq ft.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            At 4 inches, an unreinforced slab cannot carry that concentrated
            load without cracking through. At 6 inches with #4 rebar at 12 inch
            on-center, the slab spreads the load to the gravel base below
            without flexing.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Bag counts by pad size
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Size the pad 1 ft larger than the tub on every side. All rows below
            are at 6 inch thickness with a 5 percent waste allowance.
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left">
                  <th className="px-3 py-2 font-bold">Pad size</th>
                  <th className="px-3 py-2 font-bold">ft³</th>
                  <th className="px-3 py-2 font-bold">yd³</th>
                  <th className="px-3 py-2 font-bold">80 lb bags</th>
                  <th className="px-3 py-2 font-bold">60 lb bags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROWS.map((r) => (
                  <tr key={r.size}>
                    <td className="px-3 py-2 font-mono font-bold text-ink">
                      {r.size}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.cuFt}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.cuYd}
                    </td>
                    <td className="px-3 py-2 font-mono font-bold text-brand-light">
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
            All rows at 6 inch thickness. Includes 5 percent waste and rounds
            up to whole bags.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            For an 8 by 8 foot pad at 6 inches thick:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Volume in cubic feet</span>{' '}
              = 8 × 8 × 0.5 ={' '}
              <span className="font-mono font-bold text-ink">32 ft³</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Cubic yards</span> = 32 ÷ 27
              = <span className="font-mono font-bold text-ink">1.19 yd³</span>{' '}
              net, or 1.25 yd³ with waste.
            </li>
            <li>
              <span className="font-bold text-ink">Bag count</span> = (32 ×
              1.05) ÷ 0.6 = 56 bags of 80 lb, or ÷ 0.45 = 75 bags of 60 lb.
            </li>
          </ol>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate for your own pad
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The chart above covers standard square pads. For a rectangular pad
            sized to a specific tub, or a different thickness,
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
                href="/how-many-bags-of-concrete-for-a-10x10-slab/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a 10×10 slab?
              </Link>{' '}
              — the 4 inch patio version of the math.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-an-8x10-slab/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for an 8×10 slab?
              </Link>{' '}
              — close-in size, lighter-load thickness.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-fence-post/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a fence post?
              </Link>{' '}
              — cylinder math for round post holes.
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

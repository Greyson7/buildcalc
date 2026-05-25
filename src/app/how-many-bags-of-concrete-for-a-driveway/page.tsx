import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-many-bags-of-concrete-for-a-driveway/';
const TITLE = 'How Many Bags of Concrete for a Driveway?';
const DESCRIPTION =
  'A typical 12 ft × 40 ft driveway at 4 inches takes about 6 cubic yards — roughly 270 bags of 80 lb mix. The real answer for any driveway is "don\'t use bags, get a ready-mix truck." Full math, sizing table and pour-day plan.';

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
    q: 'Can I pour a driveway with bagged concrete?',
    a: 'Technically yes — but for a single-car driveway you would mix 250 to 300 bags of 80 lb, which is 10+ hours of mixing and the cold joints between batches will crack. Anything bigger than about 3 yards (a small slab) should go ready-mix. Driveways are 5 to 12 yards.',
  },
  {
    q: 'How many cubic yards of concrete do I need for a driveway?',
    a: 'A standard 1-car driveway (12 × 40 ft, 4 in thick) is about 5.9 yd³. A 2-car driveway (20 × 40 ft, 4 in) is about 9.9 yd³. Step up to 6 inches and those numbers go to 8.9 and 14.8 yd³. Add 5 to 10 percent for waste and over-excavation.',
  },
  {
    q: 'How thick should a concrete driveway be?',
    a: '4 inches handles passenger cars and light trucks. 5 inches is the sweet spot for most homes. 6 inches is standard if you ever park an RV, dump trailer, or work truck. Subgrade prep matters as much as thickness — 4 inches of compacted gravel base under the concrete prevents differential settlement.',
  },
  {
    q: 'How much does a concrete driveway cost?',
    a: 'Materials alone for a 1-car (12 × 40 × 4 in) driveway are about $900 to $1,200 of ready-mix at $150 to $200 per yard. Installed by a contractor, that same driveway runs $5 to $10 per sq ft = $2,400 to $4,800. DIY saves the labor but doubles the schedule and risks cracking if you mix from bags.',
  },
  {
    q: 'Do driveways need rebar or wire mesh?',
    a: 'Yes. Use #4 rebar at 12 to 18 inch on-center (a grid) or 6×6 W2.9/W2.9 welded wire mesh. Chair it up so it sits in the middle of the slab thickness. Rebar does not stop cracks from happening — it stops the two sides of a crack from drifting apart and creating a trip hazard.',
  },
  {
    q: 'How long until you can drive on a new concrete driveway?',
    a: 'Foot traffic at 24 to 48 hours. Cars at 7 days (most ready-mix is rated 28-day strength but reaches 70 percent in a week). Heavy trucks or RVs at 28 days. In cold weather (below 50°F) double those numbers. Keep it wet or covered the first 7 days — that is what builds long-term strength.',
  },
];

const ROWS = [
  { size: '10 × 20 ft (1-car short)', sqft: 200, yd3_4: '2.5', yd3_5: '3.1', yd3_6: '3.7' },
  { size: '12 × 40 ft (1-car standard)', sqft: 480, yd3_4: '5.9', yd3_5: '7.4', yd3_6: '8.9' },
  { size: '16 × 40 ft (1.5-car)', sqft: 640, yd3_4: '7.9', yd3_5: '9.9', yd3_6: '11.9' },
  { size: '20 × 40 ft (2-car standard)', sqft: 800, yd3_4: '9.9', yd3_5: '12.3', yd3_6: '14.8' },
  { size: '24 × 40 ft (2-car wide)', sqft: 960, yd3_4: '11.9', yd3_5: '14.8', yd3_6: '17.8' },
];

export default function ConcreteDrivewayGuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/concrete/"
          buttonLabel="Calculate for your driveway"
          description="Tap here to size any driveway by length, width and thickness — the calculator gives cubic yards, bag counts and live material cost in one step."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Concrete
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Bags of Concrete for a Driveway?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The short version: don&apos;t. A driveway is the volume that breaks
            the bag math. Here is the real number, the ready-mix math, and how
            to think about size, thickness and cost.
          </p>
        </header>

        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> a standard 1-car
            driveway (12 × 40 ft × 4 in) is about{' '}
            <span className="font-bold text-brand-light">5.9 cubic yards</span>{' '}
            — equivalent to{' '}
            <span className="font-bold text-brand-light">~270 bags of 80 lb</span>{' '}
            (or 355 bags of 60 lb). At this volume, ready-mix is faster,
            stronger and cheaper. Order ready-mix.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Same formula as any slab — length × width × depth in feet, then
            convert. For a 12 × 40 × 4 in driveway:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Cubic feet</span> = 12 × 40 ×
              (4 ÷ 12) ={' '}
              <span className="font-mono font-bold text-ink">160 ft³</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Cubic yards</span> = 160 ÷ 27
              = <span className="font-mono font-bold text-ink">5.93 yd³</span>{' '}
              net.
            </li>
            <li>
              <span className="font-bold text-ink">Order amount</span> = 5.93 ×
              1.05 = <span className="font-mono font-bold text-ink">6.2 yd³</span>{' '}
              with 5% waste. Most suppliers sell in 0.25 yd³ increments, so
              order 6.25 yd³.
            </li>
            <li>
              <span className="font-bold text-ink">Equivalent bag count</span>:
              160 ÷ 0.6 = <span className="font-mono font-bold text-ink">~267 bags of 80 lb</span>{' '}
              (or 356 bags of 60 lb). At ~50 pounds per bag handled twice
              (lift, mix), that is 13 tons of moving — and the cold joints
              between batches will crack.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            By driveway size
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Cubic yards for common driveway dimensions at three slab
            thicknesses. Add 5 to 10 percent to the order to cover waste and
            over-excavation.
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left">
                  <th className="px-3 py-2 font-bold">Driveway</th>
                  <th className="px-3 py-2 font-bold">sq ft</th>
                  <th className="px-3 py-2 font-bold">4 in (yd³)</th>
                  <th className="px-3 py-2 font-bold">5 in (yd³)</th>
                  <th className="px-3 py-2 font-bold">6 in (yd³)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROWS.map((r) => (
                  <tr key={r.size}>
                    <td className="px-3 py-2 font-mono font-bold text-ink">
                      {r.size}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.sqft}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.yd3_4}
                    </td>
                    <td className="px-3 py-2 font-mono font-bold text-brand-light">
                      {r.yd3_5}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.yd3_6}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            Net volumes. Add 5 to 10 percent for waste. 5 inch is the sweet
            spot for most residential driveways.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Why ready-mix wins on driveways
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Cold joints crack.</span> A
              driveway poured in 12 batches from a wheelbarrow has 11 cold
              joints between batches. Each one becomes a future crack line. A
              ready-mix truck delivers it monolithically in 30 to 45 minutes.
            </li>
            <li>
              <span className="font-bold text-ink">Bag mix is weaker.</span>{' '}
              Most bagged concrete is rated 4,000 psi but actually tests in the
              3,000 to 3,500 psi range when hand-mixed. Ready-mix from a plant
              is consistent and quality-controlled.
            </li>
            <li>
              <span className="font-bold text-ink">Cost is similar or
              cheaper.</span> At 6 yd³, bagged concrete is $1,200 to $1,500 in
              material. Ready-mix at $175/yd³ is about $1,050 plus a $100 to
              $200 short-load fee — total $1,150 to $1,250. Plus you finish in
              one afternoon instead of three days.
            </li>
            <li>
              <span className="font-bold text-ink">Finishing window.</span> A
              good driveway finish (broomed, sealed, edged) requires the whole
              slab to be at similar set-time. That only happens with one pour.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Pour-day plan
          </h2>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Day 1:</span> excavate to
              depth (slab + 4 inches of gravel base), form the perimeter,
              compact the subgrade.
            </li>
            <li>
              <span className="font-bold text-ink">Day 2:</span> place 4 inches
              of crushed stone, compact in 2-inch lifts, lay rebar or wire
              mesh on chairs.
            </li>
            <li>
              <span className="font-bold text-ink">Day 3 (pour day):</span>{' '}
              truck arrives, pour, screed, bull-float, broom finish, control
              joints every 10 to 12 ft, edge.
            </li>
            <li>
              <span className="font-bold text-ink">Day 4 to 7:</span> keep wet
              with sprinkler or curing blanket. No foot traffic for 24 hours,
              no vehicle traffic for 7 days.
            </li>
          </ol>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate for your own driveway
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Punch in length, width and thickness — BuildCalc returns cubic
            yards, the ready-mix order amount with waste factored in, and the
            equivalent bag count if you really want to know.
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
                href="/how-many-bags-of-concrete-for-a-20x20-slab/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a 20×20 slab?
              </Link>{' '}
              — garage-floor sized pour, where ready-mix also wins.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-in-a-yard/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete in a yard?
              </Link>{' '}
              — the conversion you need when comparing prices.
            </li>
            <li>
              <Link
                href="/how-many-yards-of-gravel-for-a-driveway/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many yards of gravel for a driveway?
              </Link>{' '}
              — for the base under the slab.
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

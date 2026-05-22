import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';

const ROUTE = '/how-many-bags-of-concrete-for-a-10x10-slab/';
const TITLE = 'How Many Bags of Concrete for a 10x10 Slab?';
const DESCRIPTION =
  'A 10x10 by 4-inch concrete slab needs about 59 bags of 80 lb mix (or 78 bags of 60 lb) — roughly 1.3 cubic yards. Full math, bag-vs-ready-mix trade-offs, and the count for 3 and 6 inch slabs.';

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

// Article structured data — helps Google show a richer result.
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
    q: 'How many cubic yards of concrete is a 10x10 slab?',
    a: 'A 10 by 10 foot slab at 4 inches thick is about 1.23 cubic yards of net concrete. Add a 5 percent waste allowance and you would order about 1.30 cubic yards.',
  },
  {
    q: 'How thick should a 10x10 concrete slab be?',
    a: '4 inches is the standard thickness for a patio, shed pad or other light-load slab. Go up to 6 inches for a driveway, hot-tub pad or anywhere a vehicle will sit. 3 inches is reserved for sidewalks, paver bases and other very light-duty surfaces.',
  },
  {
    q: 'Should I use 60 lb or 80 lb bags for a 10x10 slab?',
    a: '80 lb bags mean fewer bags to mix and carry, which adds up fast at this volume — 59 bags vs. 78 bags for a 4 inch slab. 60 lb bags are lighter to handle but you make more trips. For a 10x10 most people pick 80 lb to keep the count down.',
  },
  {
    q: 'Is bagged concrete cheaper than ready-mix for a 10x10 slab?',
    a: 'At about 1.3 cubic yards, bagged usually ends up more expensive once you factor in 59 bags vs. a short-load delivery. Bagged still wins when the truck cannot reach the site, you need to pour in stages, or you want to do it over a weekend. For one continuous pour at this volume, ready-mix is generally faster and cheaper.',
  },
  {
    q: 'How much waste should I add for a concrete slab?',
    a: 'Add at least 5 percent — that covers normal spillage and minor over-excavation. Rough or hand-dug subgrade can push it to 10 percent. The bag count and yardage shown above already include a 5 percent allowance.',
  },
  {
    q: 'Do I need rebar in a 10x10 concrete slab?',
    a: 'For a 4 inch patio or shed pad, a sheet of welded wire mesh or #3 rebar at 16 to 24 inch on-center is standard practice — it does not add slab strength so much as control cracking. For driveways and heavier slabs, #4 rebar at 12 to 16 inch on-center is the usual call.',
  },
];

const ROWS = [
  { thickness: '3"', cuFt: '25.0', cuYd: '0.93', bags80: 44, bags60: 59 },
  { thickness: '4"', cuFt: '33.3', cuYd: '1.23', bags80: 59, bags60: 78 },
  { thickness: '6"', cuFt: '50.0', cuYd: '1.85', bags80: 88, bags60: 117 },
];

export default function ConcreteBagsGuidePage() {
  return (
    <>
      <article className="space-y-7">
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Concrete
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Bags of Concrete for a 10×10 Slab?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            A 10 by 10 foot concrete slab — patio, shed pad, hot-tub base or
            small structure footprint — is one of the most common DIY concrete
            jobs. Here is the short answer and exactly how to get there.
          </p>
        </header>

        {/* TL;DR */}
        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> for a standard
            10′ × 10′ × 4″ slab you need about{' '}
            <span className="font-bold text-brand-light">59 bags of 80 lb</span>{' '}
            concrete mix — or about{' '}
            <span className="font-bold text-brand-light">78 bags of 60 lb</span>.
            That works out to roughly 1.3 cubic yards, with a 5 percent waste
            allowance.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Concrete is sold and ordered in cubic yards, but the math starts
            in cubic feet. For a 10 by 10 foot slab at 4 inches thick:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Volume in cubic feet</span>{' '}
              = length × width × depth, all in feet. 10 × 10 × (4 ÷ 12) ={' '}
              <span className="font-mono font-bold text-ink">33.33 ft³</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Cubic yards</span> = cubic
              feet ÷ 27. 33.33 ÷ 27 ={' '}
              <span className="font-mono font-bold text-ink">1.23 yd³</span>{' '}
              of net concrete.
            </li>
            <li>
              <span className="font-bold text-ink">Add waste.</span> A 5
              percent allowance covers spillage and uneven subgrade — the safe
              minimum. 1.23 × 1.05 ={' '}
              <span className="font-mono font-bold text-ink">1.30 yd³</span>{' '}
              to order in bulk.
            </li>
            <li>
              <span className="font-bold text-ink">Convert to bags.</span> An
              80 lb bag yields about 0.6 ft³, and a 60 lb bag about 0.45 ft³.
              With the 5 percent waste folded in, that is{' '}
              <span className="font-mono font-bold text-ink">59 bags of 80 lb</span>{' '}
              or{' '}
              <span className="font-mono font-bold text-ink">78 bags of 60 lb</span>.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            By slab thickness
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            A 10×10 slab is built at 3, 4 or 6 inches depending on what rolls
            or sits on it. The bag count scales directly with depth:
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
            Includes a 5 percent waste factor and rounds up to whole bags.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Bags or ready-mix delivery?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            At about 1.3 cubic yards, a 10×10 by 4 inch slab sits right on the
            line between bag-mixing and ready-mix territory. Here is how the
            trade-off shakes out:
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Bags win</span> when access
              is the problem (a truck cannot reach the site), the job is under
              about 1 yd³, or you want to pour in stages over a couple of
              weekends. The downside: mixing 59 bags by hand or in a wheelbarrow
              mixer is real work — figure 4 to 6 hours with a buddy.
            </li>
            <li>
              <span className="font-bold text-ink">Ready-mix wins</span> on
              price and time once you are over about 1 yd³. Most suppliers
              charge a short-load fee under 3 yd³, but the all-in cost is
              still usually cheaper than 59 bags. A 1-yard pour from a truck
              takes about 30 minutes once it arrives.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            What changes the number
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Waste factor.</span> 5
              percent is the minimum. Rough or hand-dug subgrade can push it
              to 10 percent — about three extra bags of 80 lb.
            </li>
            <li>
              <span className="font-bold text-ink">
                Thickened edges or footings.
              </span>{' '}
              A turn-down edge for a free-standing slab can add 10 to 20
              percent of volume. Treat it as a separate pour in the calculator.
            </li>
            <li>
              <span className="font-bold text-ink">Bag yield variance.</span>{' '}
              0.6 ft³ per 80 lb bag is the manufacturer typical for Quikrete
              and Sakrete concrete mix. Check the spec on the actual bags you
              buy — premium and fast-set mixes can differ.
            </li>
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate for your own slab
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The numbers above are for a standard 10′ × 10′ × 4″ pad. For any
            other size, depth or bag — including footings and round sonotube
            columns — BuildCalc&apos;s concrete calculator handles mixed-unit
            input, waste factor and live material cost.
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
            Related calculators
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink-dim">
            <li>
              <Link
                href="/gravel/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                Gravel calculator
              </Link>{' '}
              — for the compacted base under the slab.
            </li>
            <li>
              <Link
                href="/square-footage/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                Square footage calculator
              </Link>{' '}
              — area in feet, yards, meters and acres.
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

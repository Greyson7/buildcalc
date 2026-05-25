import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-many-bags-of-concrete-for-an-8x10-slab/';
const TITLE = 'How Many Bags of Concrete for an 8x10 Slab?';
const DESCRIPTION =
  'An 8x10 by 4-inch slab needs about 47 bags of 80 lb concrete mix (or 63 bags of 60 lb) — roughly 1.0 cubic yard. Full math, thickness table, and bag-vs-ready-mix call.';

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
    q: 'How many cubic yards of concrete is an 8x10 slab?',
    a: 'An 8 by 10 foot slab at 4 inches thick is about 0.99 cubic yards of net concrete. Add a 5 percent waste allowance and you would order about 1.04 cubic yards.',
  },
  {
    q: 'How thick should an 8x10 concrete slab be?',
    a: '4 inches handles a patio, shed pad or hot-tub deck. Step up to 6 inches if anything heavier than foot traffic will sit on it — a small structure, a workbench with a vise, or a vehicle wheel. 3 inches is fine for sidewalks and paver bases.',
  },
  {
    q: 'Is 1 yard of concrete enough for an 8x10 pad?',
    a: 'Just barely at 4 inches — the net volume is 0.99 yd³, so any waste at all pushes you over. Order 1.1 to 1.25 yd³ to be safe, or plan to top off with a bag or two if you go ready-mix.',
  },
  {
    q: 'Is bagged concrete cheaper than ready-mix for an 8x10 slab?',
    a: 'At about 1 cubic yard, bagged usually costs the same or more once you total 47 bags vs. a short-load delivery. Bagged still wins when the truck cannot reach the site or you want to pour in stages. For one continuous pour at this size, ready-mix is generally faster and not much more expensive.',
  },
  {
    q: 'How much waste should I add for a small slab?',
    a: 'Add at least 5 percent — that covers normal spillage and minor over-excavation. The bag counts in the table above already include 5 percent. For rough or hand-dug subgrade, push it to 10 percent.',
  },
  {
    q: 'Do I need rebar in an 8x10 slab?',
    a: 'For a 4 inch patio or shed pad, a sheet of welded wire mesh or #3 rebar at 16 to 24 inch on-center is standard — it controls cracking more than it adds strength. For driveways and heavier slabs, step up to #4 rebar at 12 to 16 inch on-center.',
  },
];

const ROWS = [
  { thickness: '3"', cuFt: '20.0', cuYd: '0.74', bags80: 35, bags60: 47 },
  { thickness: '4"', cuFt: '26.7', cuYd: '0.99', bags80: 47, bags60: 63 },
  { thickness: '6"', cuFt: '40.0', cuYd: '1.48', bags80: 70, bags60: 94 },
];

export default function ConcreteBags8x10GuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/concrete/"
          buttonLabel="Calculate for your slab"
          description="The example below is an 8′ × 10′ × 4″ slab. Tap here for any other size, depth or shape — including round footings and sonotube columns."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Concrete
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Bags of Concrete for an 8×10 Slab?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            An 8 by 10 foot pad — shed floor, hot-tub base, generator pad or
            small patio — is one of the most common DIY concrete jobs. Here is
            the short answer and the exact math.
          </p>
        </header>

        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> for a standard
            8′ × 10′ × 4″ slab you need about{' '}
            <span className="font-bold text-brand-light">47 bags of 80 lb</span>{' '}
            concrete mix — or{' '}
            <span className="font-bold text-brand-light">63 bags of 60 lb</span>.
            That works out to roughly 1.04 cubic yards with a 5 percent waste
            allowance.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Concrete is priced and ordered in cubic yards, but the math starts
            in cubic feet. For an 8 by 10 foot slab at 4 inches thick:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Volume in cubic feet</span>{' '}
              = length × width × depth, all in feet. 8 × 10 × (4 ÷ 12) ={' '}
              <span className="font-mono font-bold text-ink">26.67 ft³</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Cubic yards</span> = cubic
              feet ÷ 27. 26.67 ÷ 27 ={' '}
              <span className="font-mono font-bold text-ink">0.99 yd³</span>{' '}
              net.
            </li>
            <li>
              <span className="font-bold text-ink">Add waste.</span> 0.99 × 1.05
              = <span className="font-mono font-bold text-ink">1.04 yd³</span>{' '}
              to order in bulk.
            </li>
            <li>
              <span className="font-bold text-ink">Convert to bags.</span> An
              80 lb bag yields about 0.6 ft³, a 60 lb bag about 0.45 ft³. With
              5 percent waste folded in, that is{' '}
              <span className="font-mono font-bold text-ink">47 bags of 80 lb</span>{' '}
              or{' '}
              <span className="font-mono font-bold text-ink">63 bags of 60 lb</span>.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            By slab thickness
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            An 8×10 is poured at 3, 4 or 6 inches depending on what sits on it.
            Bag count scales directly with depth:
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
            Bags or ready-mix?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            An 8×10 sits at the low end of the ready-mix range — about a yard
            for a 4 inch pad. Here is how the call usually goes:
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Bags win</span> when access
              is the problem (no truck path), the job is under about 1 yd³, or
              you want to mix at your own pace. Downside: mixing 47 bags takes
              3 to 5 hours with a wheelbarrow mixer.
            </li>
            <li>
              <span className="font-bold text-ink">Ready-mix wins</span> the
              moment you have truck access. Most suppliers charge a short-load
              fee under 3 yd³, but the all-in cost is often within $50 of
              bagged — for a 30 minute pour instead of half a day.
            </li>
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate for your own slab
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The numbers above are for a standard 8′ × 10′ × 4″ pad. For any
            other size, depth or bag — including footings and round sonotube
            columns — BuildCalc&apos;s concrete calculator handles fractional
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
              — the next-size-up clone, with the bag-vs-truck math.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-12x12-slab/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a 12×12 slab?
              </Link>{' '}
              — most common patio size.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-hot-tub-pad/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a hot-tub pad?
              </Link>{' '}
              — sizing the 6 inch slab a tub needs.
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

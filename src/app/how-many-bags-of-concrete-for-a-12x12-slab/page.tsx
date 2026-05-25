import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-many-bags-of-concrete-for-a-12x12-slab/';
const TITLE = 'How Many Bags of Concrete for a 12x12 Slab?';
const DESCRIPTION =
  'A 12x12 by 4-inch concrete slab needs about 84 bags of 80 lb mix (or 112 bags of 60 lb) — roughly 1.87 cubic yards. Math, thickness table, and why most 12x12 pours go ready-mix.';

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
    q: 'How many cubic yards of concrete is a 12x12 slab?',
    a: 'A 12 by 12 foot slab at 4 inches thick is about 1.78 cubic yards of net concrete. Add a 5 percent waste allowance and you would order 1.87 cubic yards — typically rounded up to 2 yd³ for a ready-mix order.',
  },
  {
    q: 'How thick should a 12x12 patio slab be?',
    a: '4 inches is the standard call for a 12×12 patio or shed pad. Drop to 3 inches only for a paver underlayment. Step up to 6 inches if a vehicle will park on it — and add a thickened edge if it stands free of an existing slab.',
  },
  {
    q: 'Should I do bags or ready-mix for a 12x12?',
    a: 'At ~2 cubic yards, ready-mix is the easy call. Mixing 84 bags by hand takes most of a day and costs about the same as a short-load delivery. Stick with bags only if a truck cannot reach the site or you need to pour in stages.',
  },
  {
    q: 'How many 80 lb bags in a cubic yard?',
    a: 'About 45 bags. An 80 lb bag yields 0.6 cubic feet and a cubic yard is 27 ft³, so 27 ÷ 0.6 = 45 bags per yard before waste. With a 5 percent waste allowance, plan on 48 per yard.',
  },
  {
    q: 'How much waste should I add for a 12x12 slab?',
    a: 'Add at least 5 percent — that covers normal spillage and minor over-excavation. The bag counts in the table already include 5 percent. For rough or hand-dug subgrade, push to 10 percent (about 4 extra bags of 80 lb at 4 inch).',
  },
  {
    q: 'Do I need rebar in a 12x12 slab?',
    a: 'For a 4 inch patio, welded wire mesh or #3 rebar at 16 to 24 inch on-center is standard — it controls cracking. For a 6 inch driveway-grade slab at 12×12, step up to #4 rebar at 12 to 16 inch on-center, both directions.',
  },
];

const ROWS = [
  { thickness: '3"', cuFt: '36.0', cuYd: '1.33', bags80: 63, bags60: 84 },
  { thickness: '4"', cuFt: '48.0', cuYd: '1.78', bags80: 84, bags60: 112 },
  { thickness: '6"', cuFt: '72.0', cuYd: '2.67', bags80: 126, bags60: 168 },
];

export default function ConcreteBags12x12GuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/concrete/"
          buttonLabel="Calculate for your slab"
          description="The example below is a 12′ × 12′ × 4″ slab. Tap here for any other size, depth or shape — including round footings and sonotube columns."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Concrete
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Bags of Concrete for a 12×12 Slab?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            A 12 by 12 foot pad is the most common backyard patio size — big
            enough for a small table and chairs, small enough to pour in one
            session. Here is the short answer and the math.
          </p>
        </header>

        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> a 12′ × 12′ × 4″
            slab needs about{' '}
            <span className="font-bold text-brand-light">84 bags of 80 lb</span>{' '}
            concrete mix — or{' '}
            <span className="font-bold text-brand-light">112 bags of 60 lb</span>.
            That is roughly 1.87 cubic yards with a 5 percent waste allowance,
            so most people round up and order 2 yd³ ready-mix.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            For a 12 by 12 foot slab at 4 inches thick:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Volume in cubic feet</span>{' '}
              = length × width × depth. 12 × 12 × (4 ÷ 12) ={' '}
              <span className="font-mono font-bold text-ink">48 ft³</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Cubic yards</span> = ft³ ÷
              27. 48 ÷ 27 ={' '}
              <span className="font-mono font-bold text-ink">1.78 yd³</span>{' '}
              net.
            </li>
            <li>
              <span className="font-bold text-ink">Add waste.</span> 1.78 × 1.05
              = <span className="font-mono font-bold text-ink">1.87 yd³</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Convert to bags.</span> At
              0.6 ft³ per 80 lb bag and 0.45 ft³ per 60 lb bag, that is{' '}
              <span className="font-mono font-bold text-ink">84 bags of 80 lb</span>{' '}
              or{' '}
              <span className="font-mono font-bold text-ink">112 bags of 60 lb</span>.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            By slab thickness
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Pick thickness by load. A 12×12 paver underlayment is fine at 3
            inches, a patio at 4, a driveway-grade slab at 6.
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
            Why most 12×12 pours go ready-mix
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Mixing 84 bags of 80 lb concrete — that is 6,720 lbs of dry mix —
            takes a full day with a wheelbarrow mixer and two people, and you
            cannot stop in the middle without a cold joint. A 2 yard ready-mix
            short load takes 20 minutes to pour, runs about the same money
            after the short-load fee, and gives you a single continuous slab.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Stick with bags only when truck access is impossible or the pour
            site is split into pieces small enough to do in stages.
          </p>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate for your own slab
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The numbers above are for a 12′ × 12′ × 4″ pad. For any other size,
            depth or shape — including footings and round sonotube columns —
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
              — one size down, with the bag-vs-truck trade-off.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-16x20-slab/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a 16×20 slab?
              </Link>{' '}
              — typical garage-floor or detached-shop size.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-driveway/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a driveway?
              </Link>{' '}
              — why every driveway should be ready-mix.
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

import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-many-bags-of-concrete-in-a-yard/';
const TITLE = 'How Many Bags of Concrete Are in a Yard?';
const DESCRIPTION =
  'One cubic yard of concrete equals 45 bags of 80 lb mix, 60 bags of 60 lb, or 90 bags of 40 lb. Full conversion math, a yard-to-bag table, and when ordering by the yard makes more sense.';

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
    q: 'How many 80 lb bags of concrete equal a yard?',
    a: 'A cubic yard is 27 cubic feet. One 80 lb bag of pre-mixed concrete yields about 0.6 cubic feet when wet. 27 ÷ 0.6 = 45 bags per yard. Add 5 percent waste and order 47 to 48 bags if you need a full yard.',
  },
  {
    q: 'How many 60 lb bags of concrete equal a yard?',
    a: 'A 60 lb bag yields about 0.45 cubic feet. 27 ÷ 0.45 = 60 bags per yard. So 60 lb bags cost more per yard than 80 lb bags by weight — but they are easier to lift.',
  },
  {
    q: 'How many 40 lb bags of concrete equal a yard?',
    a: 'A 40 lb bag yields about 0.30 cubic feet. 27 ÷ 0.30 = 90 bags per yard. 40 lb bags are mostly used for small repairs and post-setting — at 90 bags per yard, the price per yard is roughly double what an 80 lb bag costs.',
  },
  {
    q: 'When is it cheaper to order ready-mix instead of bags?',
    a: 'Once you cross about 1 cubic yard (roughly 45 bags of 80 lb), ready-mix is usually competitive or cheaper than bagged, plus you finish in one continuous pour. Below 1 yard, bags win because most ready-mix plants charge a short-load fee under 3 yards.',
  },
  {
    q: 'Why does a bag of dry concrete only make 0.6 cubic feet wet?',
    a: 'Pre-mixed concrete is cement, sand and gravel in dry form. When you add water, the cement paste fills the voids between aggregate particles instead of adding bulk — so wet volume is less than dry volume. The 0.6 ft³ per 80 lb bag yield is the industry-standard wet volume printed on the bag.',
  },
  {
    q: 'How heavy is one cubic yard of concrete?',
    a: 'About 4,050 lb (just over 2 tons) for standard concrete with normal aggregate. That is roughly what 45 bags of 80 lb add up to in dry mix weight (3,600 lb) — the rest is the weight of the water you mix in.',
  },
];

const ROWS = [
  { yards: 0.25, bags80: 12, bags60: 15, bags40: 23 },
  { yards: 0.5, bags80: 23, bags60: 30, bags40: 45 },
  { yards: 1, bags80: 45, bags60: 60, bags40: 90 },
  { yards: 1.5, bags80: 68, bags60: 90, bags40: 135 },
  { yards: 2, bags80: 90, bags60: 120, bags40: 180 },
  { yards: 3, bags80: 135, bags60: 180, bags40: 270 },
];

export default function BagsPerYardGuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/concrete/"
          buttonLabel="Calculate by volume"
          description="Tap here to enter your slab, footing or post hole — BuildCalc converts to yards and bag counts (80 lb, 60 lb, 40 lb) in one step."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Concrete
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Bags of Concrete Are in a Yard?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The conversion every concrete shopper needs — because ready-mix
            comes in yards and Home Depot comes in bags. Here is the math and
            the table.
          </p>
        </header>

        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> one cubic yard of
            concrete =
            <span className="font-bold text-brand-light"> 45 bags of 80 lb</span>,{' '}
            <span className="font-bold text-brand-light">60 bags of 60 lb</span>{' '}
            or{' '}
            <span className="font-bold text-brand-light">90 bags of 40 lb</span>.
            Add 5 percent waste in real life. Above ~1 yard, ready-mix
            delivery is usually a better deal.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            A cubic yard is just a 3 ft × 3 ft × 3 ft cube — 27 cubic feet. The
            yield printed on each bag of pre-mixed concrete tells you how many
            cubic feet of wet concrete that bag produces:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Cubic feet in a yard</span>{' '}
              = 3 × 3 × 3 ={' '}
              <span className="font-mono font-bold text-ink">27 ft³</span>.
            </li>
            <li>
              <span className="font-bold text-ink">80 lb bag</span> yields ~0.6
              ft³. 27 ÷ 0.6 ={' '}
              <span className="font-mono font-bold text-ink">45 bags per yard</span>.
            </li>
            <li>
              <span className="font-bold text-ink">60 lb bag</span> yields ~0.45
              ft³. 27 ÷ 0.45 ={' '}
              <span className="font-mono font-bold text-ink">60 bags per yard</span>.
            </li>
            <li>
              <span className="font-bold text-ink">40 lb bag</span> yields ~0.30
              ft³. 27 ÷ 0.30 ={' '}
              <span className="font-mono font-bold text-ink">90 bags per yard</span>.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Yards to bags
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Common pour sizes converted both ways. Bag counts are rounded up to
            whole bags and don&apos;t include a waste factor — add 5 to 10
            percent on top for real-world pours.
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left">
                  <th className="px-3 py-2 font-bold">Cubic yards</th>
                  <th className="px-3 py-2 font-bold">80 lb bags</th>
                  <th className="px-3 py-2 font-bold">60 lb bags</th>
                  <th className="px-3 py-2 font-bold">40 lb bags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROWS.map((r) => (
                  <tr key={r.yards}>
                    <td className="px-3 py-2 font-mono font-bold text-ink">
                      {r.yards} yd³
                    </td>
                    <td className="px-3 py-2 font-mono font-bold text-brand-light">
                      {r.bags80}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.bags60}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.bags40}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Bags vs. ready-mix break-even
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The bag count tells you when to switch ordering methods:
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Under 0.5 yd³</span> (~23
              bags of 80 lb): always bags. Ready-mix short-load fees make small
              orders uneconomical.
            </li>
            <li>
              <span className="font-bold text-ink">0.5 to 1.5 yd³</span> (23 to
              68 bags): depends on access. If a truck can reach the site,
              ready-mix is usually faster and similar in cost. If access is
              tight, bags.
            </li>
            <li>
              <span className="font-bold text-ink">Over 1.5 yd³</span> (68+
              bags): ready-mix every time. Mixing 68 bags by hand is 4 to 6
              hours of work and you will get cold joints between batches.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Where the bag yield comes from
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Pre-mixed concrete is roughly 60 percent aggregate (sand and
            gravel) by weight, 25 percent cement and 15 percent water once
            mixed. The dry mix weighs 80 lb, but when you stir in about a
            gallon of water (8.3 lb) and the mix consolidates, you end up with
            roughly 0.6 ft³ of placeable wet concrete. The yield numbers on
            the bag are tested by the manufacturer — Quikrete, Sakrete and
            others all publish them in their product data sheets.
          </p>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Skip the conversion math
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Punch in the slab or footing dimensions — BuildCalc returns cubic
            yards, equivalent bag counts at every bag size, and live material
            cost.
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
              — small slab math in real bag counts.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-driveway/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a driveway?
              </Link>{' '}
              — why driveways always go ready-mix.
            </li>
            <li>
              <Link
                href="/how-many-cubic-feet-in-a-cubic-yard/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many cubic feet in a cubic yard?
              </Link>{' '}
              — the foundational conversion.
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

import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-many-cubic-yards-of-mulch-for-1000-sq-ft/';
const TITLE = 'How Many Cubic Yards of Mulch for 1,000 Sq Ft?';
const DESCRIPTION =
  '1,000 sq ft of bed at the standard 3-inch depth takes about 9.5 cubic yards of mulch — roughly 125 bags of 2 cu ft. Full math, a table by depth, bulk-vs-bagged decision and the gotchas that change the order.';

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
    q: 'How thick should I lay mulch?',
    a: '3 inches is the standard recommendation for new beds — thick enough to suppress weeds and retain moisture without smothering plant roots. Refreshing existing mulch can usually get away with 2 inches on top. Deeper than 4 inches starts to block air and water from reaching the soil.',
  },
  {
    q: 'How many sq ft does a yard of mulch cover?',
    a: 'A cubic yard of mulch covers about 108 sq ft at 3 inches deep, 162 sq ft at 2 inches, or 81 sq ft at 4 inches. The simple formula: 324 ÷ inches of depth = square feet per yard.',
  },
  {
    q: 'How many bags of mulch in a cubic yard?',
    a: 'A cubic yard is 27 cubic feet. Standard mulch bags at home improvement stores are 2 cubic feet, so 27 ÷ 2 = 13.5 bags per yard. Some bags are 3 cu ft (9 bags/yard) or 1 cu ft (27 bags/yard) — always check the bag.',
  },
  {
    q: 'Should I buy bulk or bagged mulch?',
    a: 'Bulk is cheaper per yard once you need 3 or more yards — usually 30 to 50 percent less than the equivalent bagged volume. Bagged wins for small jobs, when you can\'t accept a dump pile in your driveway, or when you want a specific color (dyed bagged mulches have more consistent color than bulk dyed).',
  },
  {
    q: 'How long does mulch last before I need to refresh it?',
    a: 'Hardwood and dyed mulches typically need a 1 to 2 inch top-up every spring. Cedar and cypress last 2 to 3 years before serious refresh. Rubber mulch lasts indefinitely but doesn\'t feed the soil. Most homeowners on a refresh-yearly schedule order about 1/3 the original yardage.',
  },
  {
    q: 'Do I need to remove old mulch before adding new?',
    a: 'Only if the existing layer is already 3 to 4 inches thick or has matted/molded. Otherwise, a fresh 1 to 2 inches on top is enough — the old material decomposes underneath and feeds the soil. If you\'re changing color (e.g., from dyed black to natural hardwood), strip the top 1 inch first.',
  },
];

const ROWS = [
  { depth: '2"', yards: '6.2', sqFtPerYd: 162, bags2cf: 83 },
  { depth: '3"', yards: '9.3', sqFtPerYd: 108, bags2cf: 125 },
  { depth: '4"', yards: '12.4', sqFtPerYd: 81, bags2cf: 167 },
];

export default function MulchGuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/mulch/"
          buttonLabel="Calculate for your beds"
          description="The example below is 1,000 sq ft of bed at 3″ depth. Tap here for any area and depth — the calculator handles odd-shaped beds and gives you both bulk yards and bagged counts."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Mulch
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Cubic Yards of Mulch for 1,000 Sq Ft?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Spring mulch math, simplified. Whether you&apos;re ordering bulk
            from a landscape supply or hauling bags from the home store, here
            is the formula, a depth table, and the cost trade-off that matters.
          </p>
        </header>

        {/* TL;DR */}
        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> 1,000 sq ft at the
            standard 3-inch depth =&nbsp;
            <span className="font-bold text-brand-light">9.3 cubic yards</span>{' '}
            (round to 9.5). In bagged terms, that&apos;s about{' '}
            <span className="font-bold text-brand-light">125 bags</span> of 2
            cubic feet. For a refresh-only 2-inch layer, drop to{' '}
            <span className="font-bold text-brand-light">6.2 yards</span> or
            ~83 bags.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Mulch is volume — square feet times depth. The trick is the unit
            conversion: depth is in inches, but you want the answer in cubic
            yards. The formula collapses to one shortcut:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Cubic yards</span> = (sq ft
              × depth in inches) ÷ 324.{' '}
              <span className="block text-xs text-ink-faint">
                The 324 comes from 27 cu ft per yard × 12 inches per foot. Memorize
                this and you can do mulch math in your head.
              </span>
            </li>
            <li>
              <span className="font-bold text-ink">For 1,000 sq ft at 3″</span>:
              (1,000 × 3) ÷ 324 = 3,000 ÷ 324 ={' '}
              <span className="font-mono font-bold text-ink">9.26 yd³</span>.
              Round up to{' '}
              <span className="font-mono font-bold text-ink">9.5 yards</span>{' '}
              for ordering.
            </li>
            <li>
              <span className="font-bold text-ink">Convert to bags</span>: 1
              cubic yard = 27 cubic feet = 13.5 bags of 2 cu ft. So 9.26 ×
              13.5 ={' '}
              <span className="font-mono font-bold text-ink">125 bags</span>{' '}
              of 2 cu ft mulch.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">By depth</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Same 1,000 sq ft area, different depths. Most beds end up at 3
            inches; refresh-only top-ups can run thinner.
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left">
                  <th className="px-3 py-2 font-bold">Depth</th>
                  <th className="px-3 py-2 font-bold">Cubic yards</th>
                  <th className="px-3 py-2 font-bold">Sq ft / yard</th>
                  <th className="px-3 py-2 font-bold">2 cu ft bags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROWS.map((r) => (
                  <tr key={r.depth}>
                    <td className="px-3 py-2 font-mono font-bold text-ink">
                      {r.depth}
                    </td>
                    <td className="px-3 py-2 font-mono font-bold text-brand-light">
                      {r.yards}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.sqFtPerYd}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.bags2cf}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            Yards rounded to one decimal. Bag count assumes standard 2 cu ft bags.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Bulk or bagged?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            At 9 yards, this isn&apos;t a bagged job for most people — but
            here&apos;s the trade-off:
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Bulk wins</span> on price
              once you&apos;re past 3 yards. Bulk mulch is typically $25 to $45
              per yard delivered, vs. about $4 per 2 cu ft bag — which works
              out to $54 per yard equivalent. On 9 yards, bulk saves around
              $200 to $300.
            </li>
            <li>
              <span className="font-bold text-ink">Bagged wins</span> when you
              can&apos;t accept a dump pile in the driveway, when you want a
              specific dyed color (consistency is better in bagged), or when
              you&apos;re mulching in stages over a few weekends. Bags also
              don&apos;t need to be moved twice.
            </li>
            <li>
              <span className="font-bold text-ink">Hybrid approach</span>: 7
              yards bulk + 14 bags for the far corners. Works well when one
              side of the property has a clear path for the wheelbarrow but
              the other side is a fence and side gate.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            What changes the number
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Settling.</span> Loose
              bulk mulch settles 15 to 20 percent over the first few weeks.
              Order at your target depth — don&apos;t pre-compact in your
              head.
            </li>
            <li>
              <span className="font-bold text-ink">Existing mulch.</span> If
              you&apos;re topping up, measure your CURRENT depth. Beds that
              are already at 2 inches only need a 1-inch refresh = 3 yards on
              the same 1,000 sq ft.
            </li>
            <li>
              <span className="font-bold text-ink">Irregular bed shapes.</span>{' '}
              Most landscape beds aren&apos;t rectangles. Break complex shapes
              into rectangles and triangles, calculate each, and sum. The
              square footage calculator linked below handles the arithmetic.
            </li>
            <li>
              <span className="font-bold text-ink">Tree mulch rings.</span>{' '}
              Standard 3-inch depth is fine, but never pile mulch up against
              the trunk — leave a 3 to 4 inch gap. &quot;Volcano mulching&quot;
              kills trees by trapping moisture against the bark.
            </li>
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate for your own beds
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            BuildCalc&apos;s mulch calculator takes your bed area and target
            depth, returns cubic yards AND bag counts at 2 or 3 cu ft, and
            adds a price input for live cost. Handles odd shapes too — just
            add rectangles.
          </p>
          <Link
            href="/mulch/"
            className="tap mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-surface-0 active:bg-brand-dark"
          >
            Open the mulch calculator →
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
                href="/how-many-bags-of-concrete-for-a-fence-post/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a fence post?
              </Link>{' '}
              — for the fence posts framing the new beds.
            </li>
            <li>
              <Link
                href="/how-many-bundles-of-shingles-for-1000-sq-ft/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bundles of shingles for 1,000 sq ft?
              </Link>{' '}
              — same &quot;per-1,000-sq-ft&quot; logic, applied to roofing.
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
                href="/mulch/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                Mulch calculator
              </Link>{' '}
              — depth, area and bag/yard counts.
            </li>
            <li>
              <Link
                href="/gravel/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                Gravel calculator
              </Link>{' '}
              — same volume math, for crushed stone and river rock.
            </li>
            <li>
              <Link
                href="/square-footage/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                Square footage calculator
              </Link>{' '}
              — for measuring odd-shaped landscape beds.
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

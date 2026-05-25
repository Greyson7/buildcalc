import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-many-bags-of-mulch-in-a-yard/';
const TITLE = 'How Many Bags of Mulch Are in a Yard?';
const DESCRIPTION =
  'One cubic yard of mulch equals 13.5 bags of 2 cu ft, or 9 bags of 3 cu ft. Math, the price-break math, and when bulk delivery actually saves money.';

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
    q: 'How many bags of mulch are in a cubic yard?',
    a: '13.5 bags of 2 cu ft mulch equals 1 cubic yard. 9 bags of 3 cu ft equals 1 cubic yard. Bagged mulch sold in 1.5 cu ft bags (smaller, Home Depot common size) takes 18 bags per yard.',
  },
  {
    q: 'How many cubic feet are in a cubic yard of mulch?',
    a: '27 cubic feet — same as any other cubic yard. The yard is a unit of volume, not material. The bag count changes with bag size, but a yard is always 27 ft³.',
  },
  {
    q: 'Is it cheaper to buy mulch in bags or bulk?',
    a: 'Once you need 3+ yards, bulk delivery is usually cheaper per yard — even after delivery fees. Below 3 yards, bagged from a big-box store wins because bulk suppliers charge $50 to $100 minimum delivery. For 2 yards or less, especially with a sale, bagged often wins.',
  },
  {
    q: 'How much area does a yard of mulch cover?',
    a: 'At 2 inches deep (the standard), 1 yard covers 162 sq ft. At 3 inches (recommended for weed suppression), 1 yard covers 108 sq ft. At 4 inches (heavy weed beds and tree rings), 1 yard covers 81 sq ft.',
  },
  {
    q: 'How heavy is a yard of mulch?',
    a: 'Hardwood mulch: 800 to 1,000 lb per yard dry, up to 1,500 lb wet. Pine bark: lighter, 600 to 800 lb per yard. A standard pickup truck handles 1.5 to 2 yards before the springs bottom out — most suppliers will not load more than that into a half-ton truck for safety.',
  },
  {
    q: 'How many bags of mulch fit in a pickup truck?',
    a: '40 to 60 bags of 2 cu ft fit in a standard pickup bed (about 60 cu ft of usable space). That is 3 to 4 yards by volume. Fewer if you have a tonneau cover or tool box reducing space.',
  },
];

const ROWS = [
  { yards: 0.25, bags2: 4, bags3: 3, sqft2in: 41, sqft3in: 27 },
  { yards: 0.5, bags2: 7, bags3: 5, sqft2in: 81, sqft3in: 54 },
  { yards: 1, bags2: 14, bags3: 9, sqft2in: 162, sqft3in: 108 },
  { yards: 2, bags2: 27, bags3: 18, sqft2in: 324, sqft3in: 216 },
  { yards: 3, bags2: 41, bags3: 27, sqft2in: 486, sqft3in: 324 },
  { yards: 5, bags2: 68, bags3: 45, sqft2in: 810, sqft3in: 540 },
];

export default function MulchPerYardGuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/mulch/"
          buttonLabel="Calculate for your beds"
          description="The example below converts cubic yards to bags. Tap here to size mulch for your specific bed area and desired depth."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Mulch
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Bags of Mulch Are in a Yard?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The conversion every landscaping shopper needs — because big-box
            sells bags and your local mulch yard sells in cubic yards. Math
            below, table after.
          </p>
        </header>

        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> 1 cubic yard =
            <span className="font-bold text-brand-light"> 13.5 bags of 2 cu ft</span>{' '}
            or <span className="font-bold text-brand-light">9 bags of 3 cu ft</span>.
            One yard covers about 162 sq ft at 2 inches deep.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">1 cubic yard</span> = 27 ft³
              (the foundational conversion).
            </li>
            <li>
              <span className="font-bold text-ink">2 cu ft bag</span>: 27 ÷ 2 ={' '}
              <span className="font-mono font-bold text-ink">13.5 bags per yard</span>.
            </li>
            <li>
              <span className="font-bold text-ink">3 cu ft bag</span>: 27 ÷ 3 ={' '}
              <span className="font-mono font-bold text-ink">9 bags per yard</span>.
            </li>
            <li>
              <span className="font-bold text-ink">1.5 cu ft bag</span> (common
              Home Depot size): 27 ÷ 1.5 ={' '}
              <span className="font-mono font-bold text-ink">18 bags per yard</span>.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Yards, bags and coverage
          </h2>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left">
                  <th className="px-3 py-2 font-bold">Cubic yards</th>
                  <th className="px-3 py-2 font-bold">2 ft³ bags</th>
                  <th className="px-3 py-2 font-bold">3 ft³ bags</th>
                  <th className="px-3 py-2 font-bold">2&quot; deep</th>
                  <th className="px-3 py-2 font-bold">3&quot; deep</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROWS.map((r) => (
                  <tr key={r.yards}>
                    <td className="px-3 py-2 font-mono font-bold text-ink">
                      {r.yards} yd³
                    </td>
                    <td className="px-3 py-2 font-mono font-bold text-brand-light">
                      {r.bags2}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.bags3}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.sqft2in} sf
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.sqft3in} sf
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            Bag counts rounded up. Coverage at the stated depth.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Bags or bulk?
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Under 1 yard (under 14
              bags)</span>: bagged. The convenience and lack of delivery fee
              wins.
            </li>
            <li>
              <span className="font-bold text-ink">1 to 3 yards</span>:
              depends. Big-box sales (5 bags for $10) often beat bulk prices.
              No sale, bulk wins.
            </li>
            <li>
              <span className="font-bold text-ink">3+ yards</span>: bulk every
              time. Per-yard prices drop and the delivery fee amortizes across
              more volume.
            </li>
            <li>
              <span className="font-bold text-ink">Color-dyed mulch</span> is
              usually only available bagged or at higher-end bulk suppliers.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            How thick to spread it
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">2 inches</span>: refresh
              layer over existing mulch. Maintains color and weed barrier
              without smothering plants.
            </li>
            <li>
              <span className="font-bold text-ink">3 inches</span>: fresh beds.
              The recommended depth for weed suppression and moisture
              retention.
            </li>
            <li>
              <span className="font-bold text-ink">4 inches</span>: heavy
              weed problems, tree rings, or first-time beds without weed
              fabric.
            </li>
            <li>
              <span className="font-bold text-ink">Avoid 6+ inches</span> —
              builds heat, kills shallow plant roots, and creates the dreaded
              &quot;mulch volcano&quot; around tree trunks.
            </li>
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate for your beds
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Enter bed area or length × width and desired depth — BuildCalc
            returns yards, bag counts (in any bag size) and live cost.
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
                href="/how-many-cubic-yards-of-mulch-for-1000-sq-ft/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many cubic yards of mulch for 1,000 sq ft?
              </Link>{' '}
              — sizing the whole yard.
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

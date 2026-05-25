import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-many-cubic-feet-in-a-cubic-yard/';
const TITLE = 'How Many Cubic Feet in a Cubic Yard?';
const DESCRIPTION =
  'There are 27 cubic feet in a cubic yard. The math is 3 × 3 × 3 — because a yard is 3 feet on every side. Conversion table for concrete, mulch, gravel and topsoil, plus how to figure out which to order.';

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
    q: 'How do you convert cubic feet to cubic yards?',
    a: 'Divide cubic feet by 27. Example: a 10 × 10 × 4 inch slab is 100 × 0.333 = 33.3 ft³. Divide by 27 to get 1.23 yd³.',
  },
  {
    q: 'Why is a cubic yard 27 cubic feet, not 9?',
    a: 'A yard is 3 feet linearly. A cubic yard is a 3 × 3 × 3 ft cube. 3 × 3 × 3 = 27. People often confuse this with square measurement (a square yard is 9 sq ft = 3 × 3) — but cubic measures all three dimensions.',
  },
  {
    q: 'How many cubic feet are in 0.5 yards?',
    a: '13.5 cubic feet — half of 27. This is a useful number for small mulch beds, footings or single post holes.',
  },
  {
    q: 'How heavy is a cubic yard of common materials?',
    a: 'Concrete ~4,050 lb, dry sand ~2,700 lb, wet sand ~3,200 lb, pea gravel ~2,800 lb, crushed stone ~2,700 lb, topsoil ~2,000 lb, mulch ~800 to 1,500 lb depending on moisture. The "1 yard" volume is constant — the weight varies wildly with the material.',
  },
  {
    q: 'How do I figure out yards from length, width and depth?',
    a: 'Convert depth to feet (inches ÷ 12), multiply length × width × depth in feet for cubic feet, then divide by 27 for cubic yards. A 10 × 12 ft bed at 3 inches of mulch is 10 × 12 × 0.25 = 30 ft³ ÷ 27 = 1.11 yd³.',
  },
  {
    q: 'Why do mulch and gravel get sold in yards but bags of concrete in cubic feet?',
    a: 'Bulk materials delivered by truck (mulch, gravel, sand, topsoil, ready-mix concrete) are sold by the cubic yard because trucks are sized in yards. Packaged products (bagged concrete, bagged mulch) are sold by cubic feet because each bag yields a small, repeatable amount. The conversion is always ÷27 or ×27.',
  },
];

const ROWS = [
  { yards: 0.25, feet: '6.75' },
  { yards: 0.5, feet: '13.5' },
  { yards: 1, feet: '27' },
  { yards: 1.5, feet: '40.5' },
  { yards: 2, feet: '54' },
  { yards: 3, feet: '81' },
  { yards: 5, feet: '135' },
  { yards: 10, feet: '270' },
];

export default function CubicFeetYardGuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/math/"
          buttonLabel="Use the unit converter"
          description="Tap here to convert between cubic feet, cubic yards, cubic meters and gallons — BuildCalc's Quick Math handles every unit, including fractions."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Math
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Cubic Feet in a Cubic Yard?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The conversion that shows up on every concrete, gravel and mulch
            job. Short answer, the why, and a quick reference table.
          </p>
        </header>

        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> there are{' '}
            <span className="font-bold text-brand-light">27 cubic feet</span>{' '}
            in 1 cubic yard. The math: a yard is 3 feet, and 3 × 3 × 3 = 27.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            A cubic yard is a 3-foot cube. Every dimension is 3 feet:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">1 yard = 3 feet</span>{' '}
              (linear).
            </li>
            <li>
              <span className="font-bold text-ink">1 cubic yard</span> = 3 ft ×
              3 ft × 3 ft ={' '}
              <span className="font-mono font-bold text-ink">27 ft³</span>.
            </li>
            <li>
              <span className="font-bold text-ink">To convert ft³ to yd³</span>:
              divide by 27.
            </li>
            <li>
              <span className="font-bold text-ink">To convert yd³ to ft³</span>:
              multiply by 27.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Conversion table
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Common volumes both ways. Use the inverse direction by reading the
            table backwards.
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left">
                  <th className="px-3 py-2 font-bold">Cubic yards</th>
                  <th className="px-3 py-2 font-bold">Cubic feet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROWS.map((r) => (
                  <tr key={r.yards}>
                    <td className="px-3 py-2 font-mono font-bold text-ink">
                      {r.yards} yd³
                    </td>
                    <td className="px-3 py-2 font-mono font-bold text-brand-light">
                      {r.feet} ft³
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Where this conversion matters
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Concrete</span> — bags are
              sold by yield in ft³ (an 80 lb bag = 0.6 ft³), but ready-mix is
              priced and delivered by the yd³. To compare prices you have to
              convert.
            </li>
            <li>
              <span className="font-bold text-ink">Mulch</span> — bagged mulch
              is 2 or 3 ft³ per bag, bulk is yd³ delivered. 1 yd³ = 13.5 bags
              of 2 ft³ or 9 bags of 3 ft³.
            </li>
            <li>
              <span className="font-bold text-ink">Gravel and stone</span> —
              always priced per yd³ delivered, but bag math (0.5 to 1 ft³ per
              bag) is the same conversion.
            </li>
            <li>
              <span className="font-bold text-ink">Topsoil and fill</span> —
              calculations always start in ft³ from length × width × depth,
              then convert.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Cubic vs. square — don&apos;t mix them up
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The biggest mistake is using 9 instead of 27. A square yard is 9 sq
            ft (3 × 3) — but a cubic yard is 27 cu ft (3 × 3 × 3). Square
            measures area (flat). Cubic measures volume (3D — with depth).
            Concrete, gravel and mulch are always cubic.
          </p>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Convert without the math
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            BuildCalc&apos;s Quick Math handles cubic feet ↔ cubic yards ↔
            cubic meters ↔ gallons, plus fractional dimensional input for
            length and depth.
          </p>
          <Link
            href="/math/"
            className="tap mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-surface-0 active:bg-brand-dark"
          >
            Open Quick Math →
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
                href="/how-many-bags-of-concrete-in-a-yard/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete in a yard?
              </Link>{' '}
              — applies the same conversion to bag yields.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-mulch-in-a-yard/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of mulch in a yard?
              </Link>{' '}
              — for the bagged-vs-bulk decision on landscaping.
            </li>
            <li>
              <Link
                href="/how-many-square-feet-in-an-acre/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many square feet in an acre?
              </Link>{' '}
              — the area conversion you need for lot calculations.
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

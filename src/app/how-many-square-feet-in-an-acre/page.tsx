import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-many-square-feet-in-an-acre/';
const TITLE = 'How Many Square Feet in an Acre?';
const DESCRIPTION =
  'One acre equals 43,560 square feet — the area of a football field minus the end zones. Full math, a side-length visualization, and conversions to square yards, square meters and hectares.';

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
    q: 'How many square feet are in one acre?',
    a: 'One acre is exactly 43,560 square feet. The number comes from the historical British definition: 1 acre = 10 square chains = 10 × (66 ft)² = 43,560 sq ft.',
  },
  {
    q: 'What does one acre look like?',
    a: 'A square acre is 208.71 feet on each side — slightly smaller than a 220 × 220 backyard. A standard American football field including both end zones is 1.32 acres. The playing field alone (between end zones) is 1.1 acres.',
  },
  {
    q: 'How many acres are in a square mile?',
    a: '640 acres in one square mile. A standard rural land "section" in the U.S. Public Land Survey System is one square mile = 640 acres. A "quarter section" is 160 acres — the famous Homestead Act allotment.',
  },
  {
    q: 'How many acres are in a hectare?',
    a: 'One hectare is about 2.471 acres. Or in reverse: 1 acre = 0.4047 hectares. A hectare is 10,000 square meters; an acre is 4,046.86 square meters.',
  },
  {
    q: 'How big is half an acre?',
    a: 'Half an acre is 21,780 square feet — roughly a square 147 feet on each side, or a rectangle about 100 × 218 feet. That is generous suburban-lot size in most U.S. neighborhoods.',
  },
  {
    q: 'How big is a quarter acre?',
    a: 'A quarter acre is 10,890 square feet — about a 104 × 104 ft square, or a 100 × 110 ft rectangle. That is the typical suburban-lot size in most American developments.',
  },
];

const ROWS = [
  { acres: 0.1, sqft: '4,356', dim: '~66 × 66 ft', note: 'typical urban lot' },
  { acres: 0.25, sqft: '10,890', dim: '~104 × 104 ft', note: 'standard suburban lot' },
  { acres: 0.5, sqft: '21,780', dim: '~147 × 147 ft', note: 'generous suburban lot' },
  { acres: 1, sqft: '43,560', dim: '~209 × 209 ft', note: 'football field minus end zones' },
  { acres: 2, sqft: '87,120', dim: '~295 × 295 ft', note: 'small horse paddock' },
  { acres: 5, sqft: '217,800', dim: '~467 × 467 ft', note: 'small farm or hobby ranch' },
  { acres: 10, sqft: '435,600', dim: '~660 × 660 ft', note: 'standard rural homestead' },
  { acres: 40, sqft: '1,742,400', dim: '~1320 × 1320 ft', note: 'quarter-quarter section' },
];

export default function AcreGuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/square-footage/"
          buttonLabel="Calculate area"
          description="Tap here to convert any length × width into square feet, square yards, square meters and acres in one step."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Math
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Square Feet in an Acre?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The conversion you Google every time you read a real-estate listing
            or shop a land parcel. Here is the number, the visualization, and
            the related conversions.
          </p>
        </header>

        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> 1 acre =
            <span className="font-bold text-brand-light"> 43,560 square feet</span>{' '}
            = a square ~209 × 209 ft. About the size of an American football
            field minus the end zones.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Where 43,560 comes from
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            It is a historical British unit, originally defined as the area a
            yoke of oxen could plow in one day. The modern statute number:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">1 chain</span> = 66 ft (a
              surveyor&apos;s chain).
            </li>
            <li>
              <span className="font-bold text-ink">1 furlong</span> = 10 chains
              = 660 ft.
            </li>
            <li>
              <span className="font-bold text-ink">1 acre</span> = 1 chain × 1
              furlong = 66 × 660 ={' '}
              <span className="font-mono font-bold text-ink">43,560 sq ft</span>.
            </li>
            <li>
              <span className="font-bold text-ink">As a square</span>: √43,560
              = <span className="font-mono font-bold text-ink">208.71 ft per side</span>.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Acre size reference
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Common acre fractions and multiples, with side length and what they
            roughly look like.
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left">
                  <th className="px-3 py-2 font-bold">Acres</th>
                  <th className="px-3 py-2 font-bold">Sq ft</th>
                  <th className="px-3 py-2 font-bold">If square</th>
                  <th className="px-3 py-2 font-bold">Looks like</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROWS.map((r) => (
                  <tr key={r.acres}>
                    <td className="px-3 py-2 font-mono font-bold text-ink">
                      {r.acres}
                    </td>
                    <td className="px-3 py-2 font-mono font-bold text-brand-light">
                      {r.sqft}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.dim}
                    </td>
                    <td className="px-3 py-2 text-xs text-ink-dim">
                      {r.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Other area conversions
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">1 acre</span> = 43,560 sq ft
              = 4,840 sq yd = 4,046.86 sq m = 0.4047 hectares.
            </li>
            <li>
              <span className="font-bold text-ink">1 square mile</span> = 640
              acres = 27,878,400 sq ft.
            </li>
            <li>
              <span className="font-bold text-ink">1 hectare</span> = 2.471
              acres = 10,000 sq m = 107,639 sq ft.
            </li>
            <li>
              <span className="font-bold text-ink">1 section</span> (PLSS) = 1
              sq mile = 640 acres. A quarter section is 160 acres — historical
              Homestead Act allotment.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Where this comes up
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Real estate</span> — listing
              acreage to compare against lot dimensions in feet.
            </li>
            <li>
              <span className="font-bold text-ink">Landscaping</span> — figuring
              fertilizer, seed or chemical coverage rates (sold per sq ft, lot
              measured in acres).
            </li>
            <li>
              <span className="font-bold text-ink">Land surveys</span> — old
              deeds measured in chains, links and acres; you need to convert
              for modern math.
            </li>
            <li>
              <span className="font-bold text-ink">Agriculture</span> — yield
              measured per acre, machinery rated per acre per hour.
            </li>
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate any area
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            BuildCalc&apos;s square footage calculator handles length × width →
            sq ft / sq yd / sq m / acres. Useful for lot, room, garden bed and
            sod orders.
          </p>
          <Link
            href="/square-footage/"
            className="tap mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-surface-0 active:bg-brand-dark"
          >
            Open the square footage calculator →
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
                href="/how-many-cubic-feet-in-a-cubic-yard/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many cubic feet in a cubic yard?
              </Link>{' '}
              — the most-asked volume conversion.
            </li>
            <li>
              <Link
                href="/how-many-cubic-yards-of-mulch-for-1000-sq-ft/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many cubic yards of mulch for 1,000 sq ft?
              </Link>{' '}
              — applies area math to material orders.
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

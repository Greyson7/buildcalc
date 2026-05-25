import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-many-bags-of-concrete-for-a-sonotube/';
const TITLE = 'How Many Bags of Concrete for a Sonotube?';
const DESCRIPTION =
  'A standard 10-inch sonotube 4 feet deep needs about 4 bags of 80 lb concrete (or 6 bags of 60 lb). Full chart of 6, 8, 10, 12 and 16 inch tubes at 36, 48 and 60 inch depths — plus the cylinder math.';

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
    q: 'How many 80 lb bags fill a 10 inch sonotube 4 feet deep?',
    a: 'About 4 bags. The tube holds 2.18 cubic feet of concrete, and an 80 lb bag yields 0.6 cubic feet — so 4 bags with a small safety margin. A 12 inch tube at the same depth needs 6 bags.',
  },
  {
    q: 'How deep should a sonotube footing be?',
    a: 'Below the frost line for your area. In the southern US that is 12 to 24 inches; in the upper Midwest and Northeast it is 36 to 48 inches; in northern New England and most of Canada it is 48 to 60 inches. Above the frost line the footing will heave each winter and the structure above will rack.',
  },
  {
    q: 'What size sonotube for a deck?',
    a: 'Standard residential decks use 10 or 12 inch sonotubes. 10 inch is fine for ground-level decks and short-span beams; 12 inch is the safer default for elevated decks and longer beam spans. Tubes go up to 18 inches for heavier loads.',
  },
  {
    q: 'Do you need rebar in a sonotube?',
    a: 'Yes, typically one or two #4 vertical bars in the tube plus a saddle of #4 rebar through the bottom. The vertical bars tie into the post bracket or strap above. Without rebar the footing is brittle and the post connection has no real anchor.',
  },
  {
    q: 'Can I dry-pour a sonotube?',
    a: 'No. Sonotube footings are structural — they need wet-mixed concrete vibrated or rodded for full consolidation. Dry-pouring (dumping bagged mix in and adding water on top) is for fence posts only, not load-bearing footings.',
  },
  {
    q: 'How much does a sonotube footing cost in concrete?',
    a: 'For a typical 10 inch × 4 ft footing: 4 bags of 80 lb at $5 to $7 per bag = $20 to $28 in concrete per footing. A 12 inch × 4 ft footing is about 6 bags = $30 to $42. Multiply by the number of footings — a 12×16 deck typically needs 6 to 9.',
  },
];

const ROWS = [
  { dia: '6″', d36: 1, d48: 2, d60: 2 },
  { dia: '8″', d36: 2, d48: 3, d60: 4 },
  { dia: '10″', d36: 3, d48: 4, d60: 5 },
  { dia: '12″', d36: 4, d48: 6, d60: 7 },
  { dia: '16″', d36: 7, d48: 10, d60: 12 },
];

export default function ConcreteBagsSonotubeGuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/concrete/"
          buttonLabel="Calculate for your footing"
          description="The chart below covers standard sonotubes. Tap here for any custom diameter or depth — the round-column mode handles every size."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Concrete
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Bags of Concrete for a Sonotube?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Sonotube footings are sized by diameter and depth — every inch of
            either changes the bag count noticeably. Here is the full chart
            for common sizes plus the cylinder math for any custom footing.
          </p>
        </header>

        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> a standard{' '}
            <span className="font-bold text-brand-light">10 inch tube at 4 feet deep</span>{' '}
            takes about 4 bags of 80 lb concrete. A 12 inch tube at the same
            depth needs 6 bags. Below is the table for every common combination.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Bag count chart — 80 lb bags
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            All counts are for 80 lb bags (0.6 ft³ yield), include a 5 percent
            safety margin, and round up to whole bags. For 60 lb bags multiply
            by 1.33.
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left">
                  <th className="px-3 py-2 font-bold">Diameter</th>
                  <th className="px-3 py-2 font-bold">36″ deep</th>
                  <th className="px-3 py-2 font-bold">48″ deep</th>
                  <th className="px-3 py-2 font-bold">60″ deep</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROWS.map((r) => (
                  <tr key={r.dia}>
                    <td className="px-3 py-2 font-mono font-bold text-ink">
                      {r.dia}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.d36}
                    </td>
                    <td className="px-3 py-2 font-mono font-bold text-brand-light">
                      {r.d48}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.d60}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            Below the frost line is required — most of the US is 36 to 48
            inches; northern climates push to 48 to 60.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            For a 10 inch diameter sonotube 4 feet deep:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Cylinder volume</span> = π
              × r² × h, with everything in feet. π × (5 ÷ 12)² × 4 ={' '}
              <span className="font-mono font-bold text-ink">2.18 ft³</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Add waste.</span> 2.18 ×
              1.05 ={' '}
              <span className="font-mono font-bold text-ink">2.29 ft³</span>{' '}
              with a 5 percent margin.
            </li>
            <li>
              <span className="font-bold text-ink">Bag count</span> = 2.29 ÷
              0.6 = 3.82 →{' '}
              <span className="font-mono font-bold text-ink">4 bags of 80 lb</span>.
              For 60 lb bags: 2.29 ÷ 0.45 = 5.1 → 6 bags.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Tips for ordering and pouring
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Count footings, then
              tubes.</span> A 12×16 deck typically uses 6 to 9 sonotubes
              depending on beam span. Multiply your per-tube bag count by the
              number of footings and add 1 to 2 extra bags for the total job.
            </li>
            <li>
              <span className="font-bold text-ink">Order one extra
              sonotube.</span> They come in 4 ft and 12 ft lengths. The longer
              tube can be cut down — but a tube cut too short is scrap.
            </li>
            <li>
              <span className="font-bold text-ink">Vibrate or rod.</span> A
              hand-vibrator or a 1/2 inch rebar worked up and down knocks out
              the air pockets that weaken the column.
            </li>
            <li>
              <span className="font-bold text-ink">Strap before the concrete
              sets.</span> Anchor brackets or J-bolts need to be set into wet
              concrete and held square until the pour cures.
            </li>
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate for your own footing
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The chart above covers standard sizes. For an off-spec diameter or
            depth — or to total the bag count across all the footings on a
            project — BuildCalc&apos;s round-column mode handles the cylinder
            math, multiple identical footings and live material cost.
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
                href="/how-many-bags-of-concrete-for-a-fence-post/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a fence post?
              </Link>{' '}
              — fence-post version of the cylinder math.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-4x4-post/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a 4×4 post?
              </Link>{' '}
              — fence-line vs. corner vs. gate post counts.
            </li>
            <li>
              <Link
                href="/how-many-deck-boards-for-a-12x16-deck/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many deck boards for a 12×16 deck?
              </Link>{' '}
              — the rest of the deck materials, once footings are set.
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

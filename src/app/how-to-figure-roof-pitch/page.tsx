import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-to-figure-roof-pitch/';
const TITLE = 'How to Figure Roof Pitch';
const DESCRIPTION =
  'Roof pitch is rise over run in inches per foot — a 6/12 pitch rises 6 inches for every 12 inches of horizontal run. Two ways to measure (level + ruler, or rafter-square), pitch-to-degrees conversion and the multiplier you need for shingle math.';

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
    q: 'How do you measure roof pitch?',
    a: 'Easiest from inside the attic: hold a level against the bottom of a rafter, slide it out 12 inches horizontally, then measure straight up to the rafter. The vertical measurement in inches is your rise — that number over 12 is the pitch (e.g., 6 inches up = 6/12 pitch).',
  },
  {
    q: 'What is the most common residential roof pitch?',
    a: '6/12 is the most common residential pitch in the U.S. — it sheds water well, allows shingles in all standard widths, and gives enough attic height for storage and HVAC equipment. 4/12 is the minimum for asphalt shingles. 8/12 to 12/12 are common on steeper architectural styles.',
  },
  {
    q: 'How do you convert roof pitch to degrees?',
    a: 'Take the arctangent of (rise ÷ run). For 6/12: arctan(6/12) = arctan(0.5) = 26.57°. Common conversions: 4/12 = 18.4°, 6/12 = 26.6°, 8/12 = 33.7°, 10/12 = 39.8°, 12/12 = 45°.',
  },
  {
    q: 'What is the pitch multiplier and why does it matter?',
    a: 'The pitch multiplier converts horizontal (footprint) area to actual roof surface area. For 6/12 it is 1.118 — meaning a 1,000 sq ft footprint is actually 1,118 sq ft of roof surface. You need actual surface area, not footprint, when ordering shingles, underlayment or sheathing.',
  },
  {
    q: 'What is the lowest pitch you can shingle?',
    a: '4/12 is the minimum slope for asphalt shingles per IRC. From 2/12 to 4/12 you can use shingles only with a doubled underlayment system (ice-and-water shield over the entire roof). Below 2/12 you need a low-slope system: rolled roofing, modified bitumen, TPO, or EPDM.',
  },
  {
    q: 'Is there a roof pitch app or tool I can use on my phone?',
    a: 'Yes — most smartphones have a level/angle app built in that can read degrees if you hold the phone flat against a roof rafter or rake board. Convert degrees back to pitch with tan(angle) × 12. A 26.6° reading is tan(26.6) × 12 = 6.0, so 6/12 pitch.',
  },
];

const ROWS = [
  { pitch: '2/12', degrees: '9.5°', mult: '1.014', use: 'low slope — needs ice/water everywhere' },
  { pitch: '4/12', degrees: '18.4°', mult: '1.054', use: 'minimum for asphalt shingles' },
  { pitch: '5/12', degrees: '22.6°', mult: '1.083', use: 'common ranch/contemporary' },
  { pitch: '6/12', degrees: '26.6°', mult: '1.118', use: 'most common residential' },
  { pitch: '7/12', degrees: '30.3°', mult: '1.158', use: 'colonial, traditional' },
  { pitch: '8/12', degrees: '33.7°', mult: '1.202', use: 'limit for safe walking' },
  { pitch: '9/12', degrees: '36.9°', mult: '1.250', use: 'steep architectural' },
  { pitch: '10/12', degrees: '39.8°', mult: '1.302', use: 'roofing-jack territory' },
  { pitch: '12/12', degrees: '45.0°', mult: '1.414', use: 'A-frame, Cape Cod' },
];

export default function RoofPitchGuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/roofing/"
          buttonLabel="Calculate roof area"
          description="Tap here to enter footprint and pitch — BuildCalc returns actual roof surface area, shingle bundles and waste-factored material."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Roofing
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How to Figure Roof Pitch
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Pitch is the most-quoted roof measurement and the most-confused.
            Here is how to measure it, what the numbers mean, and how to use it
            for material math.
          </p>
        </header>

        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> roof pitch is{' '}
            <span className="font-bold text-brand-light">rise over run in
            inches per foot</span>. A 6/12 pitch rises 6 inches for every 12
            inches of horizontal run — about 26.6°. Use a level + ruler against
            a rafter to measure.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            How to measure pitch (from inside the attic)
          </h2>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Step 1:</span> hold a 24
              inch level horizontally against the bottom edge of any rafter.
            </li>
            <li>
              <span className="font-bold text-ink">Step 2:</span> from the
              point 12 inches out along the level, measure straight up to the
              underside of the rafter.
            </li>
            <li>
              <span className="font-bold text-ink">Step 3:</span> read the
              vertical measurement in inches. That is the rise.
            </li>
            <li>
              <span className="font-bold text-ink">Step 4:</span> the pitch is
              that number over 12. 6 inches up = 6/12 pitch. 8 = 8/12. Done.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            How to measure pitch (from outside)
          </h2>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Step 1:</span> from a safe
              spot like the rake board (gable end), hold a level horizontally
              against the underside of the soffit or the rake fascia.
            </li>
            <li>
              <span className="font-bold text-ink">Step 2:</span> at the 12
              inch mark, measure straight up to the roof line.
            </li>
            <li>
              <span className="font-bold text-ink">Step 3:</span> read in
              inches as before.
            </li>
            <li>
              <span className="font-bold text-ink">Alternative:</span> use a
              digital angle finder or your phone&apos;s level app against a
              roof rafter. Read the angle in degrees, then convert: tan(angle)
              × 12 = pitch over 12.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Pitch reference table
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Every common pitch, with the degree conversion and the surface-area
            multiplier you apply to footprint.
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left">
                  <th className="px-3 py-2 font-bold">Pitch</th>
                  <th className="px-3 py-2 font-bold">Degrees</th>
                  <th className="px-3 py-2 font-bold">Multiplier</th>
                  <th className="px-3 py-2 font-bold">Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROWS.map((r) => (
                  <tr key={r.pitch}>
                    <td className="px-3 py-2 font-mono font-bold text-ink">
                      {r.pitch}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.degrees}
                    </td>
                    <td className="px-3 py-2 font-mono font-bold text-brand-light">
                      {r.mult}
                    </td>
                    <td className="px-3 py-2 text-xs text-ink-dim">{r.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Using the pitch multiplier
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            When you measure a house from the ground, you get the
            footprint — but a roof is angled, so it has more surface area than
            its footprint:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Footprint area</span> ×
              pitch multiplier = actual roof surface area.
            </li>
            <li>
              <span className="font-bold text-ink">Example</span>: a 30 × 40
              ft house = 1,200 sq ft footprint. At 6/12 pitch: 1,200 × 1.118 ={' '}
              <span className="font-mono font-bold text-ink">1,342 sq ft of roof</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Convert to squares</span>{' '}
              (100 sq ft each): 1,342 ÷ 100 = 13.4 squares of shingles.
            </li>
            <li>
              <span className="font-bold text-ink">With 10% waste</span>: 13.4
              × 1.10 = 14.8 squares = 45 bundles of architectural shingles (3
              per square).
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Why pitch matters
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Material selection.</span>{' '}
              Below 4/12, you can&apos;t use standard asphalt shingles. Below
              2/12 you need rolled roofing, TPO, EPDM, or built-up roofing.
            </li>
            <li>
              <span className="font-bold text-ink">Walkability.</span> Up to
              6/12 most roofers can walk it. 6/12 to 8/12 needs care. Above
              8/12 you need roofing jacks or harnesses.
            </li>
            <li>
              <span className="font-bold text-ink">Waste factor.</span>{' '}
              Steeper roofs scuff and break shingles when dragged up the slope
              — add 5 percent more waste for pitches over 8/12.
            </li>
            <li>
              <span className="font-bold text-ink">Attic space.</span> A 6/12
              pitch over a 30 ft wide house gives ~7.5 ft of peak attic height.
              Lower pitches give cramped attics; higher pitches give walkable
              storage or even living space.
            </li>
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate roof area
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            BuildCalc&apos;s roofing calculator takes footprint and pitch,
            applies the multiplier, and returns actual surface area, squares,
            shingle bundles and live material cost.
          </p>
          <Link
            href="/roofing/"
            className="tap mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-surface-0 active:bg-brand-dark"
          >
            Open the roofing calculator →
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
                href="/how-many-bundles-of-shingles-for-1000-sq-ft/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bundles of shingles for 1,000 sq ft?
              </Link>{' '}
              — applies the pitch math to a real order.
            </li>
            <li>
              <Link
                href="/how-many-square-feet-in-an-acre/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many square feet in an acre?
              </Link>{' '}
              — the other most-searched area conversion.
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

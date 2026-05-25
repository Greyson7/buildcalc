import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/what-is-the-actual-size-of-a-2x4/';
const TITLE = 'What Is the Actual Size of a 2x4?';
const DESCRIPTION =
  'A 2x4 is actually 1.5 inches by 3.5 inches. The nominal-vs-actual rule applies to every dimensional lumber size — full table for 1x, 2x and larger, plus why lumber shrinks from rough-cut to finished.';

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
    q: 'What is the actual size of a 2x4?',
    a: 'A 2 × 4 is actually 1.5 inches by 3.5 inches. The "2 × 4" name refers to the nominal (rough-cut) size before the lumber is dried and surfaced — the actual finished dimensions are smaller.',
  },
  {
    q: 'Why is a 2x4 not actually 2 inches by 4 inches?',
    a: 'Lumber is sold by nominal size, which is the rough-cut size before it dries and gets planed smooth on all 4 sides (S4S = "surfaced four sides"). Drying shrinks it ~1/4 inch, planing removes another ~1/4 inch — leaving a 2 × 4 at 1.5 × 3.5 inches. The American Lumber Standard ALS PS 20 has set these dimensions since 1924.',
  },
  {
    q: 'What is the actual size of a 2x6, 2x8, 2x10 and 2x12?',
    a: '2 × 6 is 1.5 × 5.5 in. 2 × 8 is 1.5 × 7.25 in. 2 × 10 is 1.5 × 9.25 in. 2 × 12 is 1.5 × 11.25 in. The thickness stays 1.5 inches across the whole 2x family — only the width changes. Notice the wider boards shrink more (~3/4 inch instead of 1/2) because the raw dimension was larger.',
  },
  {
    q: 'What is the actual length of an 8-foot 2x4?',
    a: 'An 8 ft 2 × 4 is actually 8 feet long — or very close. Length is one dimension that is NOT planed shorter than nominal. You may see slight variation (1/4 inch over or under) depending on the mill, but it is essentially the labeled length.',
  },
  {
    q: 'What about 4x4 posts, are those actually 4 inches?',
    a: 'No — a 4 × 4 is actually 3.5 × 3.5 inches. A 6 × 6 is 5.5 × 5.5 inches. An 8 × 8 is 7.25 × 7.25 inches. Same nominal-vs-actual rule. Rough-sawn timber-framing-grade 4x4s and 6x6s sold by specialty suppliers can be true 4 × 4 — but that is the exception.',
  },
  {
    q: 'Do plywood and OSB follow the same rule?',
    a: 'No — plywood and OSB sheets are usually their stated size. A 4 × 8 sheet is actually 4 × 8 feet (48 × 96 inches). Thickness is the exception: a "1/2 inch" sheet is often 15/32 inch, a "3/4 inch" is 23/32 inch. The undersize is for cabinet-grade tolerance during assembly.',
  },
];

const ROWS = [
  { nominal: '1 × 2', actual: '3/4 × 1-1/2 in', sl: '0.75 × 1.5' },
  { nominal: '1 × 3', actual: '3/4 × 2-1/2 in', sl: '0.75 × 2.5' },
  { nominal: '1 × 4', actual: '3/4 × 3-1/2 in', sl: '0.75 × 3.5' },
  { nominal: '1 × 6', actual: '3/4 × 5-1/2 in', sl: '0.75 × 5.5' },
  { nominal: '1 × 8', actual: '3/4 × 7-1/4 in', sl: '0.75 × 7.25' },
  { nominal: '1 × 10', actual: '3/4 × 9-1/4 in', sl: '0.75 × 9.25' },
  { nominal: '1 × 12', actual: '3/4 × 11-1/4 in', sl: '0.75 × 11.25' },
  { nominal: '2 × 2', actual: '1-1/2 × 1-1/2 in', sl: '1.5 × 1.5' },
  { nominal: '2 × 3', actual: '1-1/2 × 2-1/2 in', sl: '1.5 × 2.5' },
  { nominal: '2 × 4', actual: '1-1/2 × 3-1/2 in', sl: '1.5 × 3.5' },
  { nominal: '2 × 6', actual: '1-1/2 × 5-1/2 in', sl: '1.5 × 5.5' },
  { nominal: '2 × 8', actual: '1-1/2 × 7-1/4 in', sl: '1.5 × 7.25' },
  { nominal: '2 × 10', actual: '1-1/2 × 9-1/4 in', sl: '1.5 × 9.25' },
  { nominal: '2 × 12', actual: '1-1/2 × 11-1/4 in', sl: '1.5 × 11.25' },
  { nominal: '4 × 4', actual: '3-1/2 × 3-1/2 in', sl: '3.5 × 3.5' },
  { nominal: '4 × 6', actual: '3-1/2 × 5-1/2 in', sl: '3.5 × 5.5' },
  { nominal: '6 × 6', actual: '5-1/2 × 5-1/2 in', sl: '5.5 × 5.5' },
  { nominal: '8 × 8', actual: '7-1/4 × 7-1/4 in', sl: '7.25 × 7.25' },
];

export default function LumberSizeGuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/math/"
          buttonLabel="Add lumber dimensions"
          description="Tap here for BuildCalc's Quick Math — add and subtract feet, inches and fractions when laying out real-world (actual) lumber dimensions."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Lumber
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            What Is the Actual Size of a 2×4?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Every framer learns this on their first day. Every DIYer measures
            wrong on theirs. Here is the rule, the table for every dimensional
            lumber size, and why the labels lie.
          </p>
        </header>

        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> a 2 × 4 is
            actually{' '}
            <span className="font-bold text-brand-light">1.5 × 3.5 inches</span>.
            The &quot;2 × 4&quot; name is the rough-cut size before drying and
            surfacing — by the time it hits the lumberyard, it has lost about
            1/4 inch on each face.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            The nominal-vs-actual rule
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Lumber is sold by its nominal size — what the rough timber
            measured before processing. From rough log to lumberyard, dimensions
            shrink:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Rough-cut</span>: log sawn
              to nominal size (full 2 × 4 in).
            </li>
            <li>
              <span className="font-bold text-ink">Drying</span>: kiln-dried
              from ~25% moisture to ~19%. Shrinks ~1/8 inch each face.
            </li>
            <li>
              <span className="font-bold text-ink">Surfacing</span>: planed
              smooth on all 4 sides (S4S). Removes ~1/8 inch each face.
            </li>
            <li>
              <span className="font-bold text-ink">Result</span>: a 2 × 4
              arrives at 1.5 × 3.5 inches — losing 1/2 inch on each dimension.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Dimensional lumber sizes
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Every common size, nominal vs. actual. Use the right column for
            layout math.
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left">
                  <th className="px-3 py-2 font-bold">Nominal</th>
                  <th className="px-3 py-2 font-bold">Actual</th>
                  <th className="px-3 py-2 font-bold">Decimal in</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROWS.map((r) => (
                  <tr key={r.nominal}>
                    <td className="px-3 py-2 font-mono font-bold text-ink">
                      {r.nominal}
                    </td>
                    <td className="px-3 py-2 font-mono font-bold text-brand-light">
                      {r.actual}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.sl}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            Standard S4S dimensional lumber per American Lumber Standard ALS PS
            20. Rough-sawn timbers from specialty mills may run full nominal.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Why it matters
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Stud wall thickness.</span>{' '}
              A 2 × 4 wall is 3.5 inches deep (stud) + 0.5 inch drywall both
              sides = 4.5 inches total finished wall.
            </li>
            <li>
              <span className="font-bold text-ink">Joist spacing.</span> A
              16-inch on-center joist layout puts joist centers 16 inches
              apart, but the actual clear span between joists is 16 − 1.5 =
              14.5 inches.
            </li>
            <li>
              <span className="font-bold text-ink">Post hole math.</span> A 4 ×
              4 post takes up 3.5 × 3.5 inches of hole, not 4 × 4. Affects
              concrete volume for fence and deck posts.
            </li>
            <li>
              <span className="font-bold text-ink">Sheathing layouts.</span> A
              4 × 8 sheet of plywood spans exactly the 16 inch centers of 6
              studs — that&apos;s a 96 inch sheet over studs at 0, 16, 32, 48,
              64, 80 and 96 inches. The whole system is sized around the
              actual stud dimension.
            </li>
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Add and subtract real dimensions
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            BuildCalc&apos;s Quick Math adds and subtracts feet, inches and
            fractions — perfect for laying out studs, joists and trim using
            actual lumber dimensions instead of nominal.
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
                href="/how-many-bags-of-concrete-for-a-4x4-post/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a 4×4 post?
              </Link>{' '}
              — uses the actual 3.5 inch post width in the math.
            </li>
            <li>
              <Link
                href="/how-many-deck-screws-per-board/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many deck screws per board?
              </Link>{' '}
              — joist spacing for 16-inch OC framing.
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

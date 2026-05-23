import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-many-bags-of-concrete-for-a-fence-post/';
const TITLE = 'How Many Bags of Concrete for a Fence Post?';
const DESCRIPTION =
  'A standard 10-inch diameter by 24-inch deep hole around a 4x4 fence post takes about 2 bags of 80 lb concrete (or 3 bags of 60 lb). Full math, a table for other hole sizes, and a quick read on fast-set vs. standard mix.';

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
    q: 'How many bags of concrete do I need per fence post?',
    a: 'For a typical 10 inch diameter by 24 inch deep post hole around a 4x4 wood post, plan on about 2 bags of 80 lb concrete mix (or 3 bags of 60 lb). The exact count depends on your hole diameter and depth — see the table above for common sizes.',
  },
  {
    q: 'How deep should a fence post hole be?',
    a: 'A good rule is to bury 1/3 of the post — so a 6 ft above-grade fence needs a 3 ft post below grade, total post length about 9 ft. In freeze-prone areas, the hole must also reach below your local frost line (24 to 48 inches depending on region) so frost heave does not lift the post.',
  },
  {
    q: 'How wide should a fence post hole be?',
    a: 'The standard guidance is 3 times the post width. A 4x4 wood post (actual 3.5 inches) gets a 10 to 12 inch diameter hole. A 6x6 (actual 5.5 inches) gets 12 to 18 inches. Larger diameter = more concrete but also more lateral stability and a stronger fence.',
  },
  {
    q: 'Should I use fast-set concrete or standard mix for fence posts?',
    a: 'Fast-set (Quikrete Fast-Setting, Sakrete Fast-Setting) sets in 20 to 40 minutes and lets you brace, level and walk away the same hour — ideal when you have many posts in one day. Standard mix is cheaper per bag and gives you working time but requires bracing overnight. For 20+ post jobs the time savings from fast-set usually beat the price difference.',
  },
  {
    q: 'Do I really have to mix the concrete, or can I dump it dry in the hole?',
    a: 'The "dry pour" method (dump dry mix in the hole, then add water on top) works specifically with fast-setting fence post mixes — the package directions allow it. It will NOT work with standard concrete mix. Even with fast-set, mixing in a wheelbarrow or bucket gives a stronger, more uniform set, so most pros still mix even when not required.',
  },
  {
    q: 'How much waste should I add for a fence project?',
    a: 'Add at least 10 percent because spilled concrete around fence posts is the rule, not the exception. On a long fence line, plan for one extra bag for every 10 posts to cover slop and uneven holes.',
  },
];

const ROWS = [
  { hole: '8" × 24"', cuFt: '0.53', bags80: 1, bags60: 2 },
  { hole: '10" × 24"', cuFt: '0.92', bags80: 2, bags60: 3 },
  { hole: '10" × 30"', cuFt: '1.15', bags80: 2, bags60: 3 },
  { hole: '12" × 30"', cuFt: '1.75', bags80: 3, bags60: 4 },
  { hole: '12" × 36"', cuFt: '2.10', bags80: 4, bags60: 5 },
  { hole: '12" × 48"', cuFt: '2.80', bags80: 5, bags60: 7 },
];

export default function ConcreteFencePostGuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/concrete/"
          buttonLabel="Calculate for your post"
          description="The example below is a 10″ × 24″ hole around a 4×4 post. Tap here for any hole diameter and depth — the calculator handles round holes and post-volume subtraction automatically."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Concrete
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Bags of Concrete for a Fence Post?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Almost every fence-building question starts here. The answer
            depends on your hole, your post, and your frost line — here is the
            math, a table for common hole sizes, and the trade-offs that
            actually matter.
          </p>
        </header>

        {/* TL;DR */}
        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> a standard{' '}
            <span className="font-bold text-brand-light">10″ diameter × 24″ deep</span>{' '}
            hole around a 4×4 post takes about{' '}
            <span className="font-bold text-brand-light">2 bags of 80 lb</span>{' '}
            concrete (or{' '}
            <span className="font-bold text-brand-light">3 bags of 60 lb</span>).
            On a 20-post fence line, plan for{' '}
            <span className="font-bold text-brand-light">~40 bags of 80 lb</span>{' '}
            plus 2 to 3 extra for waste.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            A post hole is a cylinder. You calculate the hole volume, subtract
            the volume of the post itself, then convert to bags. For a 10 inch
            diameter by 24 inch deep hole with a 4×4 post:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Hole volume</span> = π × r² ×
              depth. With r = 5″ and depth = 24″ that is π × 25 × 24 ={' '}
              <span className="font-mono font-bold text-ink">1,885 in³</span>{' '}
              (~1.09 ft³).
            </li>
            <li>
              <span className="font-bold text-ink">Post volume in hole</span> =
              3.5 × 3.5 × 24 ={' '}
              <span className="font-mono font-bold text-ink">294 in³</span>{' '}
              (~0.17 ft³). A 4×4 is actually 3.5″ × 3.5″ — that&apos;s the
              nominal-vs-actual lumber rule.
            </li>
            <li>
              <span className="font-bold text-ink">Net concrete</span> = hole −
              post = 1.09 − 0.17 ={' '}
              <span className="font-mono font-bold text-ink">0.92 ft³</span>{' '}
              per hole.
            </li>
            <li>
              <span className="font-bold text-ink">Convert to bags</span>. An 80
              lb bag yields about 0.6 ft³, so 0.92 ÷ 0.6 ={' '}
              <span className="font-mono font-bold text-ink">1.54 → 2 bags</span>{' '}
              of 80 lb. Or 0.92 ÷ 0.45 ={' '}
              <span className="font-mono font-bold text-ink">2.05 → 3 bags</span>{' '}
              of 60 lb.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            By hole size (4×4 post)
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Hole sizes vary with post type, soil conditions and frost line.
            Deeper, wider holes are more stable but eat more concrete.
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left">
                  <th className="px-3 py-2 font-bold">Hole (Ø × depth)</th>
                  <th className="px-3 py-2 font-bold">Net ft³</th>
                  <th className="px-3 py-2 font-bold">80 lb bags</th>
                  <th className="px-3 py-2 font-bold">60 lb bags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROWS.map((r) => (
                  <tr key={r.hole}>
                    <td className="px-3 py-2 font-mono font-bold text-ink">
                      {r.hole}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.cuFt}
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
            Net of 4×4 post volume. Rounded up to whole bags. Add ~10 percent
            for waste on a multi-post job.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Fast-set vs. standard concrete
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The biggest decision on a fence build isn&apos;t bag count — it&apos;s
            which mix:
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Fast-set (Quikrete Fast-Setting, Sakrete Fast-Setting)</span>{' '}
              sets in 20 to 40 minutes. Brace the post, dump the dry mix, add
              water on top, walk away. Best for full-day fence builds with
              20+ posts where rebracing is impractical. Costs about 25 to 40
              percent more per bag.
            </li>
            <li>
              <span className="font-bold text-ink">Standard mix</span> needs to
              be mixed wet in a wheelbarrow or mixer, gives you 30 to 60 minutes
              of working time, and needs overnight bracing. Best for small jobs,
              repairs, or when you want to plumb posts with care.
            </li>
            <li>
              <span className="font-bold text-ink">Gravel only (no concrete)</span>{' '}
              works in well-drained soils for non-load-bearing fence posts.
              Pack 4 to 6 inches of compacted gravel at the bottom, set the
              post, then backfill with more compacted gravel. Cheaper, drains
              better, and the post is easier to replace later — but in
              freeze/thaw climates or clay soil, concrete is more reliable.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            What changes the number
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Frost line.</span> Northern
              climates require 36 to 48 inch deep holes — that doubles the
              concrete vs. a 24 inch hole. Check your local frost depth before
              digging.
            </li>
            <li>
              <span className="font-bold text-ink">Post size.</span> A 6×6 post
              (actual 5.5″ × 5.5″) takes up about 3× more hole volume than a
              4×4, but the hole grows too. Net concrete typically lands close
              to the same numbers, just at a larger hole diameter.
            </li>
            <li>
              <span className="font-bold text-ink">Crown above grade.</span>{' '}
              Many pros dome the concrete 1 to 2 inches above ground at the
              post base — that sheds water away from the post and adds about
              10 percent volume. Cheap insurance against rot.
            </li>
            <li>
              <span className="font-bold text-ink">Corner and gate posts.</span>{' '}
              These take more lateral load. Bump the hole diameter up one step
              (12″ instead of 10″) or add 6 inches of depth.
            </li>
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate for your own posts
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            BuildCalc&apos;s concrete calculator handles round footings and
            sonotube columns directly — punch in your hole diameter and depth,
            it does the cylinder math, subtracts post volume, and gives you
            exact bag counts plus a live cost estimate.
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
              — slab math vs. the cylinder math used here.
            </li>
            <li>
              <Link
                href="/how-many-cubic-yards-of-mulch-for-1000-sq-ft/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many cubic yards of mulch for 1,000 sq ft?
              </Link>{' '}
              — for the beds along the fence line.
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
                href="/concrete/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                Concrete calculator
              </Link>{' '}
              — round footings, slabs and sonotubes in one place.
            </li>
            <li>
              <Link
                href="/gravel/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                Gravel calculator
              </Link>{' '}
              — for the compacted base in the bottom of the hole.
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

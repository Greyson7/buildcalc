import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-many-bags-of-concrete-for-a-12x16-slab/';
const TITLE = 'How Many Bags of Concrete for a 12x16 Slab?';
const DESCRIPTION =
  'A 12 ft × 16 ft × 4 in slab needs about 112 bags of 80 lb concrete (or 150 bags of 60 lb) — roughly 2.4 cubic yards. Full math, thickness table, and the case for switching to ready-mix at this size.';

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
    q: 'How many cubic yards of concrete is a 12x16 slab?',
    a: 'A 12 by 16 foot slab at 4 inches is about 2.37 yd³ net, or 2.49 yd³ ordered with 5 percent waste. At 6 inches it is 3.56 yd³ net, 3.74 yd³ ordered.',
  },
  {
    q: 'How thick should a 12x16 shed slab be?',
    a: '4 inches handles a wood-framed shed up to about 12 × 16 ft with normal storage (lawn equipment, bikes, light tools). Step up to 5 or 6 inches if you will park a tractor, ATV or do woodworking with a heavy table saw, jointer, or workbench full of cast iron.',
  },
  {
    q: 'Is 12x16 too big to pour with bags?',
    a: 'It is right at the line. 112 bags of 80 lb is 8,960 pounds — about 4 hours of mixing with a wheelbarrow mixer, or 6+ hours by hand. The cold joints between batches will crack. At this size, most pros recommend ready-mix unless truck access is impossible.',
  },
  {
    q: 'How much does ready-mix cost for a 12x16 slab?',
    a: 'At 2.5 yd³ with $150 to $200 per yard, ready-mix is $375 to $500 in material, plus a short-load fee of $75 to $200 because most plants charge a fee under 3 yd³. Total $450 to $700. By comparison, 112 bags of 80 lb at $6 each is $672.',
  },
  {
    q: 'Do I need rebar in a 12x16 slab?',
    a: 'Yes — at this size, control joints alone are not enough. Use #3 or #4 rebar in a grid at 16 to 24 inch on-center, or 6×6 W2.9/W2.9 welded wire mesh. Chair it up to the middle of the slab thickness. Rebar does not stop cracks, but it keeps the two halves of any crack tied together.',
  },
  {
    q: 'How many control joints does a 12x16 slab need?',
    a: 'Two — one across the short dimension every 8 to 10 ft. Cut control joints 1/4 of the slab depth, within 24 hours of pouring while the concrete is still green. They give the slab a planned place to crack rather than letting cracks appear randomly.',
  },
];

const ROWS = [
  { thickness: '3"', cuFt: '48.0', cuYd: '1.78', bags80: 84, bags60: 112 },
  { thickness: '4"', cuFt: '64.0', cuYd: '2.37', bags80: 112, bags60: 150 },
  { thickness: '5"', cuFt: '80.0', cuYd: '2.96', bags80: 140, bags60: 187 },
  { thickness: '6"', cuFt: '96.0', cuYd: '3.56', bags80: 168, bags60: 224 },
];

export default function Concrete12x16GuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/concrete/"
          buttonLabel="Calculate for your slab"
          description="The example below is a 12′ × 16′ × 4″ slab. Tap here for any size, depth or shape — including round footings and sonotube columns."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Concrete
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Bags of Concrete for a 12×16 Slab?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            12 × 16 is the most-built shed footprint in the U.S. Here is the
            exact bag count for a standard 4-inch pour, the thicker-slab
            numbers, and why most contractors call the ready-mix truck at this
            size.
          </p>
        </header>

        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> a 12′ × 16′ × 4″
            slab needs about{' '}
            <span className="font-bold text-brand-light">112 bags of 80 lb</span>{' '}
            (or 150 bags of 60 lb) — roughly{' '}
            <span className="font-bold text-brand-light">2.49 yd³</span> with a
            5 percent waste factor. At this volume, ready-mix is usually faster
            and similar cost.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Standard slab math, all in feet:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Volume in cubic feet</span>{' '}
              = 12 × 16 × (4 ÷ 12) ={' '}
              <span className="font-mono font-bold text-ink">64.0 ft³</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Cubic yards</span> = 64 ÷ 27
              = <span className="font-mono font-bold text-ink">2.37 yd³</span>{' '}
              net.
            </li>
            <li>
              <span className="font-bold text-ink">Add waste.</span> 2.37 ×
              1.05 ={' '}
              <span className="font-mono font-bold text-ink">2.49 yd³</span> to
              order in bulk.
            </li>
            <li>
              <span className="font-bold text-ink">Convert to bags</span> at
              0.6 ft³ per 80 lb bag: 64 × 1.05 ÷ 0.6 ={' '}
              <span className="font-mono font-bold text-ink">112 bags of 80 lb</span>{' '}
              (or 150 bags of 60 lb).
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            By slab thickness
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            A 12 × 16 slab is poured at 3 to 6 inches depending on what sits on
            it. Bag count scales linearly with depth.
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
            Bags or ready-mix?
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">112 bags is a lot.</span>{' '}
              That is 8,960 lb of material, two pallets, and roughly 4 hours of
              mixing if you have a wheelbarrow mixer running continuously.
              Without a mixer, double that.
            </li>
            <li>
              <span className="font-bold text-ink">Ready-mix is faster.</span>{' '}
              One truck delivers 2.5 yd³ in 30 minutes. With 2 to 3 people on
              wheelbarrows or chutes, the pour is done in under an hour.
            </li>
            <li>
              <span className="font-bold text-ink">Cost is close to a
              wash.</span> 112 × $6 bags = $672. 2.5 yd³ ready-mix at $175 plus
              $150 short-load fee = $588. Add tax and the numbers come within
              $50 to $100 either way.
            </li>
            <li>
              <span className="font-bold text-ink">Choose bags only if</span>{' '}
              the truck cannot reach the site, you want to pour in stages, or
              you genuinely enjoy mixing.
            </li>
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate for your own slab
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Any slab size, any thickness, any bag — BuildCalc returns cubic
            yards, equivalent bag counts and live cost.
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
              — one size down, where bags still win.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-12x12-slab/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a 12×12 slab?
              </Link>{' '}
              — square version of the same shed pad.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-16x20-slab/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a 16×20 slab?
              </Link>{' '}
              — one size up, ready-mix territory.
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

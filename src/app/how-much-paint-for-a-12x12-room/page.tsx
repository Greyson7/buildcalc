import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';

const ROUTE = '/how-much-paint-for-a-12x12-room/';
const TITLE = 'How Much Paint for a 12x12 Room?';
const DESCRIPTION =
  'A standard 12 by 12 foot room with 8 ft ceilings, one door and two windows takes about 2 gallons of paint at 2 coats. Full math, a table for other room sizes, and the variables that change the number.';

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
    q: 'How many gallons of paint do I need for a 12x12 room?',
    a: 'Plan on about 2 gallons for a standard 12 by 12 foot room with 8 ft ceilings, one door and two windows, painted in 2 coats with average 350 sq ft/gallon coverage. That is about 1.9 gallons exactly, rounded up to whole cans.',
  },
  {
    q: 'Does one gallon of paint really cover 350 sq ft?',
    a: 'Most interior latex paints quote 350 to 400 sq ft per gallon on smooth, primed drywall. Textured walls and bigger color changes drop that closer to 300, and a primer coat covers less still (250 to 350). Always pour back into the can to read the manufacturer-stated coverage.',
  },
  {
    q: 'How many coats of paint do I need?',
    a: 'Two coats is the default for an even, finished look. Touch-ups and same-color repaints can sometimes get away with one. A dramatic color change — a dark color over white, or vice versa — typically needs a primer plus two coats.',
  },
  {
    q: 'Should I subtract doors and windows from the paintable area?',
    a: 'Yes. Subtracting roughly 21 sq ft per standard door and 15 sq ft per window keeps you from over-ordering on a small room. The savings get bigger as the room shrinks — for a 12x12 the openings cut about 13 percent off the wall area.',
  },
  {
    q: 'Do I paint the ceiling the same color or separately?',
    a: 'Most people paint ceilings white in a flat or matte finish, separate from the wall color. That keeps the room feeling taller and lets the wall paint take a small amount of overspray near the corners. If you plan to do the ceiling too, add about 144 sq ft (12 by 12) of paintable area — roughly half a gallon at 2 coats.',
  },
  {
    q: 'How much extra paint should I buy for touch-ups?',
    a: 'A spare quart per color is usually enough for touch-ups over a year or two. Paint stores can match a sample, but a quart of the original batch matches perfectly. Label it with the room and date when you store it.',
  },
];

const ROWS = [
  { room: '10×10 × 8', wall: 269, twoCoats: 538, gal: 2 },
  { room: '12×12 × 8', wall: 333, twoCoats: 666, gal: 2 },
  { room: '12×12 × 9', wall: 381, twoCoats: 762, gal: 3 },
  { room: '14×14 × 8', wall: 397, twoCoats: 794, gal: 3 },
  { room: '16×16 × 8', wall: 461, twoCoats: 922, gal: 3 },
];

export default function PaintRoomGuidePage() {
  return (
    <>
      <article className="space-y-7">
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Paint
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Much Paint for a 12×12 Room?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            One of the most common DIY paint questions, with a deceptively
            simple answer. Here is the math, the openings to subtract, and
            what changes the number for your specific room.
          </p>
        </header>

        {/* TL;DR */}
        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> for a standard
            12&apos; × 12&apos; room with 8&apos; ceilings, 1 door and 2
            windows, painted in 2 coats with average 350 sq ft/gallon
            coverage, you need about{' '}
            <span className="font-bold text-brand-light">2 gallons</span>{' '}
            (1.9 gallons exactly). Add half a gallon if you are also painting
            the ceiling.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Paint quantity is wall area times coats divided by the coverage
            per gallon. For a 12 by 12 foot room with 8 foot ceilings, one
            standard door, and two standard windows:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Perimeter</span> = 2 ×
              (length + width) = 2 × (12 + 12) ={' '}
              <span className="font-mono font-bold text-ink">48 ft</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Wall area</span> =
              perimeter × ceiling height = 48 × 8 ={' '}
              <span className="font-mono font-bold text-ink">384 ft²</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Subtract openings</span>.
              A standard door is about 21 ft² (3&apos; × 7&apos;) and a
              standard window is about 15 ft² (3&apos; × 5&apos;). For 1 door
              + 2 windows that is 21 + 30 ={' '}
              <span className="font-mono font-bold text-ink">51 ft²</span>{' '}
              off.
            </li>
            <li>
              <span className="font-bold text-ink">Net paintable wall</span>{' '}
              = 384 − 51 ={' '}
              <span className="font-mono font-bold text-ink">333 ft²</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Multiply by coats</span>.
              At 2 coats, you are painting{' '}
              <span className="font-mono font-bold text-ink">666 ft²</span>{' '}
              total.
            </li>
            <li>
              <span className="font-bold text-ink">Divide by coverage</span>.
              At 350 ft²/gallon, 666 / 350 = 1.9 → round up to{' '}
              <span className="font-mono font-bold text-ink">2 gallons</span>.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            By room size (8 ft ceilings, 2 coats)
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Same assumptions: 1 door, 2 windows, 350 ft²/gallon coverage. Wall
            area is shown net of openings.
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left">
                  <th className="px-3 py-2 font-bold">Room (L×W × H)</th>
                  <th className="px-3 py-2 font-bold">Net wall</th>
                  <th className="px-3 py-2 font-bold">2 coats</th>
                  <th className="px-3 py-2 font-bold">Buy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROWS.map((r) => (
                  <tr key={r.room}>
                    <td className="px-3 py-2 font-mono font-bold text-ink">
                      {r.room}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.wall} ft²
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.twoCoats} ft²
                    </td>
                    <td className="px-3 py-2 font-mono font-bold text-brand-light">
                      {r.gal} gal
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            Rounded up to whole gallons. Add about 0.5 gallon if also doing
            the ceiling at 2 coats.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            What changes the number
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Coverage rating.</span>{' '}
              350 ft²/gal is average. Premium one-coat paints quote 400; flat
              ceiling paint also covers a touch more. Primer covers less —
              plan 250 to 300 ft²/gal.
            </li>
            <li>
              <span className="font-bold text-ink">Surface texture.</span>{' '}
              Smooth drywall hits the quoted coverage. Knockdown, orange peel
              or popcorn textures eat 15 to 25 percent more paint per coat.
            </li>
            <li>
              <span className="font-bold text-ink">Color change.</span> A big
              color jump (dark over light, or covering a saturated color)
              usually needs a primer plus two finish coats. Same-color
              repaints can sometimes get by with one.
            </li>
            <li>
              <span className="font-bold text-ink">Trim and doors.</span>{' '}
              These are typically a different finish (semi-gloss) from the
              wall paint and bought separately. Plan about 1 quart per room
              for trim.
            </li>
            <li>
              <span className="font-bold text-ink">Texture and porosity.</span>{' '}
              New drywall and bare patches drink paint until they are sealed.
              Spot-prime patches before the first finish coat.
            </li>
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate for your own room
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            BuildCalc&apos;s paint calculator takes the room dimensions, your
            number of doors and windows, coats and coverage rating, and
            returns the exact gallon count. Add a price per gallon for a live
            cost estimate.
          </p>
          <Link
            href="/paint/"
            className="tap mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-surface-0 active:bg-brand-dark"
          >
            Open the paint calculator →
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
              — outdoor projects often start with a slab.
            </li>
            <li>
              <Link
                href="/how-to-calculate-stair-stringers/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How to calculate stair stringers
              </Link>{' '}
              — for the basement or addition you are painting next.
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

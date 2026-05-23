import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-to-calculate-stair-stringers/';
const TITLE = 'How to Calculate Stair Stringers (With IRC Code Rules)';
const DESCRIPTION =
  'Step-by-step math for calculating stair stringers: riser height, tread depth, stringer length and the bottom riser cut. Includes IRC R311.7 residential code limits and a worked example for a 9 foot rise.';

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
    q: 'What is the maximum riser height per code?',
    a: 'The International Residential Code (IRC R311.7.5) sets a maximum riser height of 7-3/4 inches for residential stairs. Any layout above that fails inspection. BuildCalc flags it automatically.',
  },
  {
    q: 'Is 10 inches really the minimum stair tread depth?',
    a: 'Yes — IRC R311.7.5 requires a 10 inch minimum tread depth, measured between the nosings. Deeper treads are more comfortable; the calculator warns you if the layout falls below 10 inches.',
  },
  {
    q: 'What is the bottom riser cut, or stringer drop?',
    a: 'Once finished treads are installed, each tread adds its own thickness on top of every step. To keep every finished step the same height as the first, the bottom of the stringer is cut shorter by exactly one tread thickness. That offset is called the bottom riser cut, or "dropping the stringer."',
  },
  {
    q: 'How do I keep every riser exactly the same height?',
    a: 'Total rise divided by the number of risers gives the exact riser height — they will all be the same on paper. Real-world variance comes from layout and saw work: clamp stair gauges to a framing square at the riser-and-tread marks, scribe every notch from the same gauges, and recheck against the saw blade before each cut. IRC allows at most 3/8 inch difference between the largest and smallest riser in a flight.',
  },
  {
    q: 'What stair pitch is comfortable?',
    a: 'Most comfortable stairs land between 30 and 37 degrees from horizontal. Steeper than about 37 starts to feel like a ladder; shallower than 30 eats a lot of floor space. The classic comfort rule is that twice the riser height plus the tread depth (2R + T) should be between 24 and 25 inches.',
  },
  {
    q: 'What length lumber do I need for a stringer?',
    a: 'Stringer length is the diagonal — the square root of total rise squared plus total run squared. A 9 foot rise with a 12 foot 3 inch run works out to about 183 inches, so you would buy 16 foot 2x12 stock (and cut once). For a 9-or-12 foot run you can usually get away with 14 foot 2x12.',
  },
];

export default function StairStringersGuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/stairs/"
          buttonLabel="Calculate for your stairs"
          description="The example below is a 9 ft floor-to-floor rise. Tap here for any total rise — the calculator runs IRC code checks live as you type."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Stairs
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How to Calculate Stair Stringers
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Stair layout is the most code-loaded carpentry job most DIYers
            will ever tackle. Here is the math, the IRC limits, and a worked
            example for a typical 9 foot floor-to-floor rise.
          </p>
        </header>

        {/* TL;DR */}
        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> for a 9 foot
            (108 in) floor-to-floor rise, the typical layout is{' '}
            <span className="font-bold text-brand-light">15 risers at 7.20″</span>,{' '}
            <span className="font-bold text-brand-light">14 treads at 10-1/2″</span>,
            a stringer about <span className="font-bold text-brand-light">183″</span>{' '}
            (15 ft 3 in) long, climbing at about{' '}
            <span className="font-bold text-brand-light">36°</span>. All inside
            IRC R311.7.5 (max riser 7-3/4″, min tread 10″).
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Every stair layout starts from a single measurement: the{' '}
            <span className="font-bold text-ink">total rise</span> from
            finished floor to finished floor. Everything else follows.
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Number of risers</span> =
              total rise ÷ target riser, rounded to a whole number. Aim for a
              target between 7.25″ and 7.5″.
            </li>
            <li>
              <span className="font-bold text-ink">Riser height</span> = total
              rise ÷ number of risers (exact). This is what you mark on the
              stringer.
            </li>
            <li>
              <span className="font-bold text-ink">Number of treads</span> =
              risers − 1. The top &quot;tread&quot; is the upper floor.
            </li>
            <li>
              <span className="font-bold text-ink">Tread depth</span> = total
              run ÷ treads. If you have a fixed total run, this is locked. If
              not, pick a target (10″ minimum, 10.5–11″ is typical).
            </li>
            <li>
              <span className="font-bold text-ink">Stringer length</span> =
              √(rise² + run²) — the diagonal hypotenuse. This is the lumber
              length you need to buy.
            </li>
            <li>
              <span className="font-bold text-ink">Angle</span> = arctan(rise
              ÷ run). 30°–37° is the comfort band.
            </li>
            <li>
              <span className="font-bold text-ink">Bottom riser cut</span> =
              riser height − tread thickness. Cutting the bottom of the
              stringer shorter by one tread thickness is what keeps every
              finished step equal once the treads sit on top.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            IRC R311.7 in plain English
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The International Residential Code section that governs stairs in
            houses is R311.7. The numbers that show up on every inspection:
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Max riser height: 7-3/4″.</span>{' '}
              Hard limit. Any layout above this fails.
            </li>
            <li>
              <span className="font-bold text-ink">Min tread depth: 10″</span>,
              measured between the nosings. (Open-riser stairs are allowed to
              cheat the math, but most inspectors will still want 10″ of
              walking surface.)
            </li>
            <li>
              <span className="font-bold text-ink">
                Riser uniformity: 3/8″ max difference
              </span>{' '}
              between the largest and smallest riser in a single flight. This
              is why a precise layout matters — uneven steps trip people.
            </li>
            <li>
              <span className="font-bold text-ink">Headroom: 6 ft 8 in</span>{' '}
              measured plumb above the tread nosing. Easy to miss when
              framing a finished ceiling.
            </li>
            <li>
              <span className="font-bold text-ink">Comfort guideline:</span>{' '}
              2R + T between 24″ and 25″. Not a code limit, but a long-standing
              rule of thumb that produces a stair people enjoy using.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Worked example — 9 foot rise
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            A 9 foot floor-to-floor rise (108 inches) is one of the most
            common deck-to-grade or basement runs. With a 7.5″ target riser
            and a 10.5″ target tread:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              108 ÷ 7.5 = 14.4 → round to{' '}
              <span className="font-mono font-bold text-ink">15 risers</span>.
            </li>
            <li>
              108 ÷ 15 ={' '}
              <span className="font-mono font-bold text-ink">7.20″ riser height</span>{' '}
              (well under the 7.75″ max).
            </li>
            <li>
              Treads = 15 − 1 ={' '}
              <span className="font-mono font-bold text-ink">14 treads</span>.
            </li>
            <li>
              Total run = 14 × 10.5 ={' '}
              <span className="font-mono font-bold text-ink">147″ (12 ft 3 in)</span>.
            </li>
            <li>
              Stringer = √(108² + 147²) = √33 273 ={' '}
              <span className="font-mono font-bold text-ink">~182.4″ (15 ft 3 in)</span>.
              Buy 16 ft 2×12 stock.
            </li>
            <li>
              Angle = arctan(108 / 147) ={' '}
              <span className="font-mono font-bold text-ink">36.3°</span>.
              Within the 30°–37° comfort band.
            </li>
            <li>
              2R + T = 14.4 + 10.5 ={' '}
              <span className="font-mono font-bold text-ink">24.9″</span> —
              right in the 24–25″ comfort window.
            </li>
            <li>
              With 1″ tread thickness, bottom riser cut = 7.2 − 1 ={' '}
              <span className="font-mono font-bold text-ink">6.2″</span>.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Laying it out cleanly
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              Clamp <span className="font-bold text-ink">stair gauges</span> to
              a framing square at the riser and tread marks. The gauges
              guarantee every cut you scribe matches every other one — no
              measure-and-mark drift down the length of the 2×12.
            </li>
            <li>
              Cut the <span className="font-bold text-ink">bottom riser short</span>{' '}
              by exactly one tread thickness. The treads then bring every
              finished step back up to the same height.
            </li>
            <li>
              Plan your <span className="font-bold text-ink">attachment at
              the top</span> before you cut anything — hanging the stringer
              off a rim joist usually means a notch at the top, while landing
              on a top plate or LVL means a flat cut.
            </li>
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate for your stairs
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            BuildCalc&apos;s stair calculator turns one measurement — your
            total rise — into a complete cut list with riser height, tread
            depth, stringer length, angle and the bottom riser cut. Every
            layout is checked live against IRC R311.7.
          </p>
          <Link
            href="/stairs/"
            className="tap mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-surface-0 active:bg-brand-dark"
          >
            Open the stair calculator →
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
              — for the stair landing pad or footing.
            </li>
            <li>
              <Link
                href="/how-much-paint-for-a-12x12-room/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How much paint for a 12×12 room?
              </Link>{' '}
              — finishing the basement at the bottom of the stairs.
            </li>
            <li>
              <Link
                href="/how-many-bundles-of-shingles-for-1000-sq-ft/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bundles of shingles for 1,000 sq ft?
              </Link>{' '}
              — exterior stairs and the porch roof above them.
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

import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-many-stair-stringers-do-i-need/';
const TITLE = 'How Many Stair Stringers Do I Need?';
const DESCRIPTION =
  'A 36-inch stair takes 3 stringers (16-inch on-center). A 48-inch stair takes 4. Wider stairs and thinner treads need more stringers — full table by width, tread thickness and material.';

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
    q: 'How many stringers do I need for a 36 inch wide staircase?',
    a: '3 stringers at 16 inches on-center: two on the outside and one in the middle. That handles standard 5/4 (1 inch actual) treads or 2× decking. With composite treads, check the manufacturer spec — some require 12 inch on-center, which would push you to 4 stringers.',
  },
  {
    q: 'How many stringers do I need for a 48 inch wide staircase?',
    a: '4 stringers at 16 inches on-center: outside, 16 in, 32 in, outside. For 5/4 boards on 12 inch OC, you would need 5 stringers.',
  },
  {
    q: 'How far apart should stair stringers be?',
    a: '16 inches on-center is the safe default for most decking and 2× treads. 12 inches on-center is required for thinner composite treads, longer span treads, or stairs that need to feel solid underfoot with no bounce. Spacing wider than 18 inches will let the tread flex under load.',
  },
  {
    q: 'Can I use 2 stringers instead of 3?',
    a: 'For very narrow stairs (under 30 inches) and short runs (3 to 4 risers), two outside stringers can work. For anything 36 inches or wider or more than 4 risers, you need a middle stringer — otherwise the treads bow in the middle and the stair feels unsafe.',
  },
  {
    q: 'What size lumber should stringers be?',
    a: '2×12 is the standard. A 2×10 leaves too little wood between the notches once you cut the treads and risers (need at least 5 inches of "throat" remaining for structural strength). Pressure-treated for any stair touching the ground or exterior.',
  },
  {
    q: 'Do stringers need to be attached at the top and bottom?',
    a: 'Yes — top of the stringer to the rim joist or ledger with metal joist hangers, structural screws, or a stringer-rated hanger like the Simpson LSC. Bottom to a concrete pad or buried block with appropriate anchors. Floating stringers are not code-compliant.',
  },
];

const ROWS = [
  { width: '24"', oc16: 2, oc12: 3 },
  { width: '30"', oc16: 3, oc12: 3 },
  { width: '36"', oc16: 3, oc12: 4 },
  { width: '42"', oc16: 3, oc12: 4 },
  { width: '48"', oc16: 4, oc12: 5 },
  { width: '60"', oc16: 5, oc12: 6 },
];

export default function StairStringersGuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/stairs/"
          buttonLabel="Lay out your stair"
          description="The BuildCalc stair calculator gives you stringer count, rise and run, and a cut diagram for any height and run — and flags risers that fail the IRC."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Stairs
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Stair Stringers Do I Need?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Two outside stringers and one in the middle is the default — and
            it&apos;s right for most decks. Here is when you need more, and
            why.
          </p>
        </header>

        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span>{' '}
            <span className="font-bold text-brand-light">3 stringers for a
            36-inch stair</span>,{' '}
            <span className="font-bold text-brand-light">4 for a 48-inch
            stair</span> — assuming standard 5/4 or 2× treads at 16 inches
            on-center. Composite treads with closer-spacing requirements bump
            you up one stringer.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The count comes from stair width divided by spacing, plus one for
            the second outside stringer:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Step 1:</span> width ÷
              spacing. 36 ÷ 16 = 2.25.
            </li>
            <li>
              <span className="font-bold text-ink">Step 2:</span> round up + 1.
              Round 2.25 up to 3 (number of spaces), then count both edges →
              still 3 stringers because the two ends share the count.
            </li>
            <li>
              <span className="font-bold text-ink">Step 3:</span> verify
              spacing. Stringers at 0, 18 and 36 = 18 inch OC — too wide. Reset
              to 0, 16, 32, 48 to keep all spaces ≤ 16 inch. For 36 inch wide,
              that means 3 stringers at 0, 18 and 36 OR 4 stringers if you are
              strict about 16 inch max.
            </li>
            <li>
              <span className="font-bold text-ink">In practice</span>: 3
              stringers for stairs 30 to 42 inches wide with 5/4 or 2× treads.
              4 for stairs 42 to 60 inches. Add one for 12 inch OC.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            By stair width and spacing
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Most residential decks land on 36 to 48 inch wide stairs with
            16-inch OC stringers. Composite tread manufacturers (Trex,
            TimberTech) often require 12-inch OC — check your product&apos;s
            installation guide.
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left">
                  <th className="px-3 py-2 font-bold">Stair width</th>
                  <th className="px-3 py-2 font-bold">16 in OC</th>
                  <th className="px-3 py-2 font-bold">12 in OC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROWS.map((r) => (
                  <tr key={r.width}>
                    <td className="px-3 py-2 font-mono font-bold text-ink">
                      {r.width}
                    </td>
                    <td className="px-3 py-2 font-mono font-bold text-brand-light">
                      {r.oc16}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.oc12}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            What changes the count
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Tread thickness.</span> 5/4
              decking (~1 inch) and 2× lumber (1.5 inch) handle 16 inch OC. 1×
              boards or thin composites often need 12 inch OC.
            </li>
            <li>
              <span className="font-bold text-ink">Composite tread spec.</span>{' '}
              Trex Transcend allows 16 inch OC on stairs perpendicular to the
              joist, 12 inch OC on diagonal. TimberTech AZEK requires 10 to 12
              inches. Check the spec sheet.
            </li>
            <li>
              <span className="font-bold text-ink">Stair length.</span> Tall
              staircases (more than 12 risers) develop sway. A middle stringer
              also resists lateral bow — never skip it on a long stair.
            </li>
            <li>
              <span className="font-bold text-ink">Stringer span.</span>{' '}
              Stringers should not span more than ~13 feet between top and
              bottom support. A long run may need an intermediate landing.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Other materials per stair
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Treads</span>: one piece per
              riser. A 6-step stair needs 6 treads.
            </li>
            <li>
              <span className="font-bold text-ink">Risers</span> (closed
              stairs): one per riser, ~7 to 7.75 inch tall.
            </li>
            <li>
              <span className="font-bold text-ink">Joist hangers or stringer
              brackets</span>: one Simpson LSC per stringer at the top
              connection.
            </li>
            <li>
              <span className="font-bold text-ink">Screws/nails</span>: 6 to 8
              fasteners per tread (2 per stringer crossing), plus framing
              fasteners.
            </li>
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Lay out your stair
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            BuildCalc&apos;s Visual Stair Calculator generates a stringer cut
            diagram from any height and run, checks risers against the IRC
            (7.75 inch max), and accounts for tread thickness drop on the
            bottom step.
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
                href="/how-to-calculate-stair-stringers/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How to calculate stair stringers
              </Link>{' '}
              — the rise/run/cut math for the stringer itself.
            </li>
            <li>
              <Link
                href="/how-many-deck-screws-per-board/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many deck screws per board?
              </Link>{' '}
              — for the treads and the deck on top.
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

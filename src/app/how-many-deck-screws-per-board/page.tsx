import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-many-deck-screws-per-board/';
const TITLE = 'How Many Deck Screws Per Board?';
const DESCRIPTION =
  'Two deck screws per joist. On a 16-inch on-center frame, a 12-foot board takes 18 screws; a 16-foot board takes 24. Full math, screw-size chart and a buy-list for an average deck.';

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
    q: 'How many deck screws do I need per board?',
    a: 'Two screws per joist crossing. On a standard 16-inch on-center joist layout, a 12-foot board crosses 9 joists = 18 screws per board. A 16-foot board crosses 12 joists = 24 screws.',
  },
  {
    q: 'How many deck screws per square foot?',
    a: 'On 16-inch on-center joists with 5-1/2 inch wide boards, plan for about 5 screws per square foot of deck. A 200 sq ft deck takes about 1,000 screws — call it a 5 lb box.',
  },
  {
    q: 'What length deck screws should I use?',
    a: '2-1/2 inch for 5/4 (~1 inch actual) composite or wood decking on 2× joists — penetrates the joist about 1-1/2 inches. 3 inch for 2× decking. 1-5/8 inch for thinner under-rail trim or fascia. Match the head type to your decking — most composites need hidden fasteners or color-matched screws.',
  },
  {
    q: 'Should I use stainless or coated deck screws?',
    a: 'For pressure-treated lumber, use either stainless or screws specifically rated for ACQ-treated wood (T-50 hot-dip or ceramic coating). Standard zinc-plated screws corrode in 1 to 2 years in PT lumber because of the copper-based treatment. Stainless costs 3× more but lasts 30+ years.',
  },
  {
    q: 'Are deck screws better than nails?',
    a: 'For deck boards: yes. Screws hold under thermal expansion/contraction cycles and don\'t pop out like ring-shank nails will after a few winters. For framing (joists to ledger, hangers): structural screws or proper joist-hanger nails — never deck screws, which lack the shear strength.',
  },
  {
    q: 'Can I use hidden fasteners instead of face-screwing?',
    a: 'Yes — most composite manufacturers (Trex, TimberTech, Fiberon) sell board-edge clip systems that hide every fastener. Costs more per square foot than face-screwing but the finished look is clean. Hidden systems generally use 2 clips per joist on the board edge, same count as 2 screws.',
  },
];

const ROWS = [
  { length: '8 ft', joistsOC16: 7, screws: 14, joistsOC12: 9, screwsOC12: 18 },
  { length: '10 ft', joistsOC16: 8, screws: 16, joistsOC12: 11, screwsOC12: 22 },
  { length: '12 ft', joistsOC16: 9, screws: 18, joistsOC12: 13, screwsOC12: 26 },
  { length: '14 ft', joistsOC16: 11, screws: 22, joistsOC12: 15, screwsOC12: 30 },
  { length: '16 ft', joistsOC16: 12, screws: 24, joistsOC12: 17, screwsOC12: 34 },
  { length: '20 ft', joistsOC16: 15, screws: 30, joistsOC12: 21, screwsOC12: 42 },
];

export default function DeckScrewsGuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/decking/"
          buttonLabel="Calculate for your deck"
          description="Tap here to enter deck dimensions, board length and joist spacing — BuildCalc returns boards, screws and a buy-list for the whole deck."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Decking
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Deck Screws Per Board?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Build a deck and you will buy more screws than you think. Here is
            the per-board count, screw lengths and what an average deck needs.
          </p>
        </header>

        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> two screws per
            joist crossing. On a 16-inch on-center frame, a{' '}
            <span className="font-bold text-brand-light">12-ft board = 18 screws</span>,
            a 16-ft board = 24. For a 200 sq ft deck, plan on{' '}
            <span className="font-bold text-brand-light">~1,000 screws (5 lb box)</span>.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Two factors decide the count: how many joists the board crosses,
            and how many screws per joist.
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Joist count</span> = board
              length ÷ joist spacing + 1. A 12-ft board on 16-inch OC: 144 ÷
              16 + 1 = <span className="font-mono font-bold text-ink">9 joists</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Screws per joist</span>: 2.
              One screw on each side of the board, into the same joist.
            </li>
            <li>
              <span className="font-bold text-ink">Total per board</span> = 9 ×
              2 = <span className="font-mono font-bold text-ink">18 screws per 12-ft board</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Whole deck</span>: count
              boards, multiply by screws per board, add 10 percent for
              dropped/stripped screws.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            By board length and joist spacing
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            16-inch OC is the standard for most decks. 12-inch OC is used for
            diagonal patterns, picture-frame borders, or composite decking that
            requires it.
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left">
                  <th className="px-3 py-2 font-bold">Board</th>
                  <th className="px-3 py-2 font-bold">Joists (16 OC)</th>
                  <th className="px-3 py-2 font-bold">Screws (16 OC)</th>
                  <th className="px-3 py-2 font-bold">Joists (12 OC)</th>
                  <th className="px-3 py-2 font-bold">Screws (12 OC)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROWS.map((r) => (
                  <tr key={r.length}>
                    <td className="px-3 py-2 font-mono font-bold text-ink">
                      {r.length}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.joistsOC16}
                    </td>
                    <td className="px-3 py-2 font-mono font-bold text-brand-light">
                      {r.screws}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.joistsOC12}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.screwsOC12}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Screw sizes for decking
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">2-1/2 inch</span> — the
              workhorse. Use for 5/4 (about 1 inch actual) composite or wood
              decking. Penetrates 1-1/2 inches into the joist below.
            </li>
            <li>
              <span className="font-bold text-ink">3 inch</span> — for thicker
              2× lumber decking (uncommon residentially, but used for
              docks/heavy use).
            </li>
            <li>
              <span className="font-bold text-ink">1-5/8 inch</span> — fascia,
              rail trim, stair risers. Anywhere you are screwing a thin board
              into a 1× backing.
            </li>
            <li>
              <span className="font-bold text-ink">Star drive (T20 or T25)</span>{' '}
              over Phillips — way fewer cam-outs. Worth the small upcharge,
              especially with a battery driver.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            How much to buy
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            By deck size, with 10 percent waste for stripped/dropped screws:
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">100 sq ft (10 × 10)</span>:
              ~550 screws → 1 box of 5 lb (~750 count).
            </li>
            <li>
              <span className="font-bold text-ink">200 sq ft (10 × 20)</span>:
              ~1,100 screws → 1 box of 5 lb plus a spare 1 lb box.
            </li>
            <li>
              <span className="font-bold text-ink">400 sq ft (20 × 20)</span>:
              ~2,200 screws → 3 boxes of 5 lb.
            </li>
            <li>
              <span className="font-bold text-ink">Hidden fasteners</span>:
              clip systems use 2 clips per joist crossing instead of 2 screws,
              same overall count but no visible screw heads on the deck face.
            </li>
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate for your own deck
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Punch in deck dimensions, joist spacing, board length and
            orientation — BuildCalc returns boards, screws, and joists for the
            whole frame.
          </p>
          <Link
            href="/decking/"
            className="tap mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-surface-0 active:bg-brand-dark"
          >
            Open the decking calculator →
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
                href="/how-many-stair-stringers-do-i-need/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many stair stringers do I need?
              </Link>{' '}
              — for the steps off the deck.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-sonotube/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a sonotube?
              </Link>{' '}
              — for the deck footings underneath.
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

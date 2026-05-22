import type { Metadata } from 'next';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { DeckingCalculator } from './DeckingCalculator';

export const metadata: Metadata = {
  title: 'Decking Calculator — Deck Boards, Joists & Screws',
  description:
    'Free decking calculator: deck board count, joist count, linear feet and screws from your deck size, board width and joist spacing. Works offline.',
  alternates: { canonical: '/decking/' },
  openGraph: {
    title: 'Decking Calculator — Deck Boards, Joists & Screws · BuildCalc',
    description:
      'Deck board count, joists, linear feet and screws from your deck size.',
    url: '/decking/',
  },
};

const FAQ: QA[] = [
  {
    q: 'How do I calculate how many deck boards I need?',
    a: 'Divide the deck width by the board width plus the gap between boards to get the number of rows. Multiply rows by the deck length for the total run of decking, add a waste factor, then divide by the length of the boards you are buying. BuildCalc does all of this and rounds up to whole boards.',
  },
  {
    q: 'How far apart should deck joists be?',
    a: 'Joists are most often spaced 16 inches on-center. Many composite and PVC deck boards call for 12 inches on-center, especially when boards run diagonally. Pressure-treated wood decking can sometimes go to 24 inches on-center — always check the board manufacturer’s span rating.',
  },
  {
    q: 'What gap should I leave between deck boards?',
    a: 'A gap of 1/8 to 1/4 inch lets the deck drain and dry. Kiln-dried wood is usually installed with a 1/8 inch gap because it shrinks; wet pressure-treated lumber is butted tighter since it shrinks as it dries. Composite boards follow the manufacturer’s spec, often 3/16 inch.',
  },
  {
    q: 'How many screws do I need for a deck?',
    a: 'Plan on roughly 350 deck screws per 100 square feet of decking — about two screws where each board crosses each joist. BuildCalc estimates around 3.5 screws per square foot, so a 200 square foot deck needs roughly 700 screws.',
  },
  {
    q: 'What is the actual width of a deck board?',
    a: 'Nominal sizes are bigger than the real board. A nominal 6-inch deck board (a 5/4x6) is actually about 5-1/2 inches wide, and a nominal 4-inch board is about 3-1/2 inches. BuildCalc uses the actual face width so the row count is correct.',
  },
  {
    q: 'How much extra decking should I buy for waste?',
    a: 'A waste factor of about 10 percent is normal for decking. It covers end cuts, the occasional warped or split board, and offcuts that are too short to use. Decks with angles, picture-frame borders or diagonal boards need more — lean toward 15 percent.',
  },
];

export default function DeckingPage() {
  return (
    <>
      <DeckingCalculator />

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            How the decking calculator works
          </h2>
          <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-dim">
            <p>
              BuildCalc&apos;s decking calculator turns your deck size into a
              board and joist take-off. It divides the deck width by the board
              width plus its gap to find how many rows of decking you need,
              multiplies by the deck length for the total run, and converts
              that — with a waste factor — into whole boards to buy.
            </p>
            <p>
              Joists run across the width, spaced on-center along the length, so
              the joist count is the length divided by the spacing, plus one.
              The calculator also estimates deck screws at about 3.5 per square
              foot. Beams, posts and footings depend on your span and local
              code, so size those separately.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Decking calculator FAQ
          </h2>
          <div className="mt-3">
            <Faq items={FAQ} />
          </div>
        </section>
      </div>

      <SiteFooter />
    </>
  );
}

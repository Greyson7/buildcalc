import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { SquareFootageCalculator } from './SquareFootageCalculator';

export const metadata: Metadata = {
  title: 'Square Footage Calculator — Area in Sq Ft, Yards & Acres',
  description:
    'Free square footage calculator: total area in square feet, square yards, square meters and acres from length and width. Works in your browser, no sign-up.',
  alternates: { canonical: '/square-footage/' },
  openGraph: {
    title: 'Square Footage Calculator — Area in Sq Ft, Yards & Acres · BuildCalc',
    description:
      'Free square footage calculator: total area in square feet, square yards, square meters and acres from length and width. Works in your browser, no sign-up.',
    url: '/square-footage/',
    images: ['/og-image.png'],
  },
};

const FAQ: QA[] = [
  {
    q: 'How do I calculate square footage?',
    a: 'Measure the length and width of the area in feet, then multiply them together — length times width equals square footage. A room 12 feet long and 10 feet wide is 120 square feet. BuildCalc does the multiplication for you and lets you enter measurements in feet, inches or yards.',
  },
  {
    q: 'How many square feet are in a square yard?',
    a: 'There are 9 square feet in one square yard, because a yard is 3 feet and 3 times 3 equals 9. To convert square feet to square yards, divide by 9. Carpet and some flooring are priced by the square yard, so the calculator shows both figures.',
  },
  {
    q: 'How do I find the square footage of multiple rooms?',
    a: 'Calculate the area of each room separately, then add the totals together. If the rooms are the same size, enter one room and set the Identical Areas stepper to the number of rooms — the calculator multiplies the area for you. For rooms of different sizes, add each result by hand.',
  },
  {
    q: 'How many square feet are in an acre?',
    a: 'One acre is 43,560 square feet. To convert square feet to acres, divide the total square footage by 43,560. The calculator reports acreage automatically, which is useful for sizing lots, lawns and large outdoor areas.',
  },
  {
    q: 'How do I convert square feet to square meters?',
    a: 'Multiply square feet by 0.092903 to get square meters, since one square foot equals 0.092903 square meters. A 500-square-foot space is about 46.5 square meters. BuildCalc shows the metric figure alongside the imperial one so you can quote in either system.',
  },
  {
    q: 'Why does square footage matter for flooring and paint estimates?',
    a: 'Flooring, tile, paint and many other materials are sold by coverage area, so an accurate square-footage figure is the starting point for every estimate. Knowing the area lets you divide by a product’s coverage rate to find how many boxes, gallons or rolls to buy — and add a waste allowance on top.',
  },
];

export default function SquareFootagePage() {
  return (
    <>
      <SquareFootageCalculator />

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            How the square footage calculator works
          </h2>
          <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-dim">
            <p>
              BuildCalc&apos;s square footage calculator turns two measurements
              — the length and width of a flat rectangle — into a total area.
              It multiplies length by width to get the area, then restates that
              figure in square feet, square yards, square meters and acres so
              you can use whichever unit your job calls for.
            </p>
            <p>
              Enter measurements in feet, inches or yards and the calculator
              keeps everything consistent internally. The Identical Areas
              stepper repeats the same rectangle for several matching spaces —
              handy for a row of identical rooms — and the perimeter figure
              gives the edge length around one area for trim, baseboard or
              fencing take-offs.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">Guides</h2>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink-dim">
            <li>
              <Link
                href="/how-many-square-feet-in-an-acre/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many square feet in an acre?
              </Link>{' '}
              — the 43,560 conversion, lot-size examples, and a quick reference
              table.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Square footage calculator FAQ
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

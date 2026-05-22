import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { PaintCalculator } from './PaintCalculator';

export const metadata: Metadata = {
  title: 'Paint Calculator — How Many Gallons of Paint',
  description:
    'Free paint calculator: how many gallons of paint to cover a room, with doors and windows subtracted and multiple coats. Works offline.',
  alternates: { canonical: '/paint/' },
  openGraph: {
    title: 'Paint Calculator — How Many Gallons of Paint · BuildCalc',
    description:
      'How many gallons of paint to cover a room, with doors and windows subtracted and multiple coats. Works offline.',
    url: '/paint/',
    images: ['/og-image.png'],
  },
};

const FAQ: QA[] = [
  {
    q: 'How much paint do I need for a room?',
    a: 'Measure the room length, width and ceiling height. Multiply the perimeter — two times length plus width — by the height to get the wall area, subtract the doors and windows, then divide by the coverage of a gallon and multiply by the number of coats. BuildCalc does this for you and rounds up to whole gallons.',
  },
  {
    q: 'How many square feet does a gallon of paint cover?',
    a: 'A gallon of interior wall paint covers about 350 to 400 square feet in one coat on a smooth, primed surface. Rough or porous walls absorb more and pull that figure toward 300, so BuildCalc lets you pick 350 or 400 to match your wall.',
  },
  {
    q: 'How many coats of paint should I use?',
    a: 'Two coats is the standard for a durable, even finish, and it is what most manufacturers assume in their coverage ratings. A single coat can work when you are repainting the same color over a sound surface; expect three coats when going from a dark color to a light one.',
  },
  {
    q: 'Should I subtract doors and windows from the paint estimate?',
    a: 'Yes — they are surfaces you will not roll. BuildCalc subtracts a flat 21 square feet for each door and 15 square feet for each window, which keeps the gallon count from running high on a room with several openings.',
  },
  {
    q: 'How much paint do I need for a 12x12 room?',
    a: 'A 12 by 12 foot room with an 8 foot ceiling has about 384 square feet of wall. After subtracting one door and two windows, two coats need a little under 2 gallons at 350 square feet per gallon — so plan on 2 gallons. Enter your exact openings above for a precise figure.',
  },
  {
    q: 'Should I buy extra paint for touch-ups?',
    a: 'It is worth keeping a small amount in reserve. Because BuildCalc rounds up to whole gallons, you will usually have some left over already — store it sealed and labeled so a future scuff or nail hole is an easy fix instead of a new shopping trip.',
  },
];

export default function PaintPage() {
  return (
    <>
      <PaintCalculator />

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            How the paint calculator works
          </h2>
          <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-dim">
            <p>
              BuildCalc&apos;s paint calculator turns three measurements — the
              room length, width and ceiling height — into a gallon count. It
              multiplies the wall perimeter by the height to get the gross wall
              area, subtracts a flat allowance for every door and window, then
              multiplies the net wall by your coat count.
            </p>
            <p>
              That paintable surface is divided by the per-gallon coverage —
              350 to 400 square feet for one coat of interior paint — and
              rounded up to whole gallons, because paint is sold by the can.
              Coverage drops on rough or porous walls and when a big color
              change needs an extra coat, so treat the result as a solid
              starting point and confirm against the label on your paint.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Paint calculator FAQ
          </h2>
          <div className="mt-3">
            <Faq items={FAQ} />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">Guides</h2>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink-dim">
            <li>
              <Link
                href="/how-much-paint-for-a-12x12-room/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How much paint for a 12×12 room?
              </Link>{' '}
              — math, a room-size table and the variables that change the
              number.
            </li>
          </ul>
        </section>
      </div>

      <SiteFooter />
    </>
  );
}

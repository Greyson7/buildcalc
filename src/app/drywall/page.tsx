import type { Metadata } from 'next';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { DrywallCalculator } from './DrywallCalculator';

export const metadata: Metadata = {
  title: 'Drywall Calculator — Sheets & Screws',
  description:
    'Free drywall calculator: how many sheets of drywall and screws for walls and ceilings, with a waste factor. Works offline.',
  alternates: { canonical: '/drywall/' },
  openGraph: {
    title: 'Drywall Calculator — Sheets & Screws · BuildCalc',
    description:
      'How many sheets of drywall and screws for walls and ceilings, with a waste factor. Works offline.',
    url: '/drywall/',
    images: ['/og-image.png'],
  },
};

const FAQ: QA[] = [
  {
    q: 'How many sheets of drywall do I need?',
    a: 'Add up the surface area you are covering — all four walls are 2 × (length + width) × height, and the ceiling is length × width — then divide by the area of one sheet. A 4×8 sheet covers 32 square feet, a 4×10 covers 40, and a 4×12 covers 48. BuildCalc does this for you, folds in your waste factor, and rounds up to whole sheets.',
  },
  {
    q: 'What sizes do drywall sheets come in?',
    a: 'Drywall panels are 4 feet wide and come in 8-, 10- and 12-foot lengths — so 4×8 (32 sq ft), 4×10 (40 sq ft) and 4×12 (48 sq ft). The 4×8 sheet is the most common and the easiest to carry; longer sheets cover more wall with fewer butt joints but are heavier and harder to handle in tight spaces.',
  },
  {
    q: 'How many screws per sheet of drywall?',
    a: 'Plan on about 32 screws per sheet. On 16-inch on-center framing that works out to roughly one screw every 12 inches in the field and every 8 inches along the edges. BuildCalc multiplies your sheet count by 32 to give a total screw estimate — buy a slightly larger box to allow for missed and stripped screws.',
  },
  {
    q: 'Should I drywall the ceiling or the walls first?',
    a: 'Hang the ceiling first. The top edge of the wall sheets then supports the ceiling perimeter, the joints between the two are cleaner, and you avoid trying to wedge ceiling panels in after the walls are already up. Wall sheets go up next, top sheet first, tight against the ceiling.',
  },
  {
    q: 'How much waste should I add for drywall?',
    a: 'A waste factor of around 10 percent is typical. It covers cut-offs at door and window openings, the odd cracked corner, and partial sheets that cannot be reused. Rooms with lots of openings or angled walls run higher; a plain rectangular room with few openings can run a little lower.',
  },
  {
    q: 'Are bigger drywall sheets better?',
    a: 'Bigger sheets mean fewer seams to tape, mud and sand, which makes for a flatter, faster finish — that is why pros favor 4×12 panels on long walls. The trade-off is weight and maneuverability: a 4×12 sheet is heavy and awkward to carry up stairs or around corners, so 4×8 sheets are easier for one person and tight rooms.',
  },
];

export default function DrywallPage() {
  return (
    <>
      <DrywallCalculator />

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            How the drywall calculator works
          </h2>
          <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-dim">
            <p>
              BuildCalc&apos;s drywall calculator turns a room&apos;s length,
              width and ceiling height into a full sheet take-off. It wraps
              drywall around all four walls — an area of 2 × (length + width) ×
              height — and adds the ceiling when you include it, then divides
              the total surface area by the area of one sheet to get the panel
              count.
            </p>
            <p>
              Drywall panels are 4 feet wide in 8-, 10- and 12-foot lengths,
              covering 32, 40 or 48 square feet each. A waste factor of about 10
              percent covers cut-offs at openings and the occasional damaged
              sheet, and is folded into every total. The calculator also
              estimates screws at roughly 32 per sheet — about one every 12
              inches in the field and every 8 inches along the edges.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Drywall calculator FAQ
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

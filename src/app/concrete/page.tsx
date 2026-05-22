import type { Metadata } from 'next';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { ConcreteCalculator } from './ConcreteCalculator';

export const metadata: Metadata = {
  title: 'Concrete Calculator — Cubic Yards & Bags',
  description:
    'Free concrete calculator: cubic yards, 60 lb and 80 lb bag counts, waste factor and live cost for slabs and footings. Mixed-unit input, works offline.',
  alternates: { canonical: '/concrete/' },
  openGraph: {
    title: 'Concrete Calculator — Cubic Yards & Bags · BuildCalc',
    description:
      'Cubic yards, bag counts, waste factor and live cost for slabs and footings.',
    url: '/concrete/',
    images: ['/og-image.png'],
  },
};

const FAQ: QA[] = [
  {
    q: 'How many 80 lb bags of concrete are in a cubic yard?',
    a: 'An 80-pound bag of concrete mix yields about 0.6 cubic feet. A cubic yard is 27 cubic feet, so that works out to roughly 45 bags of 80 lb mix per cubic yard. A 60-pound bag yields about 0.45 cubic feet — about 60 bags per cubic yard.',
  },
  {
    q: 'How do I calculate concrete for a slab?',
    a: 'Multiply the slab length by its width by its thickness to get the volume, then divide cubic feet by 27 to get cubic yards. BuildCalc lets you mix units, so a 10 by 10 foot slab at 4 inches thick is entered directly — about 1.23 cubic yards before waste.',
  },
  {
    q: 'How many cubic feet are in a cubic yard?',
    a: 'There are 27 cubic feet in one cubic yard (3 feet by 3 feet by 3 feet). Ready-mix concrete is ordered by the cubic yard.',
  },
  {
    q: 'What waste factor should I use for concrete?',
    a: 'A waste factor of 5 to 10 percent is standard. It covers spillage, over-excavation and uneven subgrade. For rough or hand-dug footings, lean toward 10 percent. BuildCalc folds the waste factor into both the yardage and the bag count.',
  },
  {
    q: 'Should I use 60 lb or 80 lb concrete bags?',
    a: '80-pound bags mean fewer bags to mix and carry, so they suit larger pours. 60-pound bags are lighter and easier for small jobs and repairs. For anything over about half a cubic yard, ready-mix delivery is usually cheaper than bags.',
  },
  {
    q: 'How do I estimate concrete for multiple footings?',
    a: 'Enter one footing’s dimensions, then set the pour count to the number of identical footings. The calculator multiplies the volume, bag count and cost across all of them at once.',
  },
];

export default function ConcretePage() {
  return (
    <>
      <ConcreteCalculator />

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            How the concrete calculator works
          </h2>
          <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-dim">
            <p>
              The concrete calculator finds how much concrete a slab, footing or
              pad needs. It multiplies length, width and depth to get volume in
              cubic feet, then converts to cubic yards — the unit ready-mix is
              ordered in — by dividing by 27.
            </p>
            <p>
              You can mix units freely: enter a slab as 20 feet long and 4
              inches deep without converting anything by hand. Add a waste
              factor (5 to 10 percent is typical) to cover spillage and uneven
              subgrade, and it is folded into both the yardage and the bag
              count. Enter a price per cubic yard or per bag for a live cost
              estimate.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Concrete calculator FAQ
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

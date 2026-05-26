import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { ConcreteCalculator } from './ConcreteCalculator';

export const metadata: Metadata = {
  title: 'Concrete Calculator — Slabs, Round Footings & Bags',
  description:
    'Free concrete calculator: cubic yards, 60 and 80 lb bag counts and live cost for slabs, footings and round sonotube columns. Mixed-unit input, works offline.',
  alternates: { canonical: '/concrete/' },
  openGraph: {
    title: 'Concrete Calculator — Slabs, Round Footings & Bags · BuildCalc',
    description:
      'Cubic yards and bag counts for slabs, footings and round sonotube columns.',
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
  {
    q: 'How do I calculate concrete for a sonotube or round column?',
    a: 'Switch the shape to Round Column and enter the diameter and column height. BuildCalc uses the cylinder volume — pi × radius squared × height — and converts to cubic yards and bag count just like a slab. Common sonotube diameters are 8, 10 and 12 inches; a four-foot-deep 12-inch footing takes about 0.12 cubic yards of concrete, or roughly 6 bags of 80 lb mix.',
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
              The concrete calculator finds how much concrete a slab, footing,
              pad or round column needs. For slabs it multiplies length, width
              and depth to get volume in cubic feet; for round footings and
              sonotubes it uses pi × radius squared × height. Either way it
              converts to cubic yards — the unit ready-mix is ordered in — by
              dividing by 27.
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
          <h2 className="text-lg font-extrabold tracking-tight">Guides</h2>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink-dim">
            <li>
              <Link
                href="/how-many-bags-of-concrete-in-a-yard/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete are in a yard?
              </Link>{' '}
              — the conversion every job comes back to, for 40, 60 and 80 lb bags.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-an-8x10-slab/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for an 8×10 slab?
              </Link>{' '}
              — 80 sq ft slab, 4-inch standard with a 6-inch comparison.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-10x10-slab/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a 10×10 slab?
              </Link>{' '}
              — 4-inch standard, with the math and a 3/4/6-inch comparison.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-12x12-slab/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a 12×12 slab?
              </Link>{' '}
              — 144 sq ft slab in 60 and 80 lb bag counts.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-12x16-slab/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a 12×16 slab?
              </Link>{' '}
              — 192 sq ft slab in bags and yards.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-16x20-slab/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a 16×20 slab?
              </Link>{' '}
              — 320 sq ft slab — where bags stop making sense vs. a truck.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-20x20-slab/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a 20×20 slab?
              </Link>{' '}
              — 400 sq ft slab and the bag-vs-ready-mix tipping point.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-driveway/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a driveway?
              </Link>{' '}
              — yards and bags for typical residential driveway sizes.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-hot-tub-pad/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a hot tub pad?
              </Link>{' '}
              — pad size and depth for the soak load, with the bag math.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-sonotube/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a sonotube?
              </Link>{' '}
              — round column volume for common 8, 10 and 12 inch tubes.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-4x4-post/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a 4×4 post?
              </Link>{' '}
              — post-hole math for a mailbox, fence or lamp post anchor.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-fence-post/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a fence post?
              </Link>{' '}
              — cylinder math for round post holes, by hole size.
            </li>
          </ul>
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

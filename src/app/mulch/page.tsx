import type { Metadata } from 'next';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { MulchCalculator } from './MulchCalculator';

export const metadata: Metadata = {
  title: 'Mulch Calculator — Cubic Yards & Bags',
  description:
    'Free mulch calculator: how much mulch you need in cubic yards and 2 or 3 cu ft bags, plus cost, from the bed size and depth. Works offline.',
  alternates: { canonical: '/mulch/' },
  openGraph: {
    title: 'Mulch Calculator — Cubic Yards & Bags · BuildCalc',
    description:
      'Cubic yards and bags of mulch from the bed dimensions and the depth you want.',
    url: '/mulch/',
    images: ['/og-image.png'],
  },
};

const FAQ: QA[] = [
  {
    q: 'How much mulch do I need?',
    a: 'Multiply the bed length by its width by the depth you want, then divide cubic inches by 1,728 for cubic feet and again by 27 for cubic yards. BuildCalc accepts mixed units, so a 20 by 10 foot bed at 3 inches deep is entered directly and works out to about 1.85 cubic yards before waste.',
  },
  {
    q: 'How deep should mulch be?',
    a: 'Two to three inches is the sweet spot for most beds — enough to suppress weeds and hold moisture without smothering plants. Three to four inches is fine for paths and around shrubs; go thinner around delicate perennials. Avoid piling mulch up against tree trunks (the so-called mulch volcano), which traps moisture against the bark.',
  },
  {
    q: 'How many bags of mulch are in a cubic yard?',
    a: 'A cubic yard is 27 cubic feet. Standard retail bags are 2 cubic feet, so it takes about 13.5 bags to make a yard. The jumbo 3 cubic foot bags work out to 9 bags per yard. BuildCalc lets you choose either size and rounds up to whole bags with the waste factor folded in.',
  },
  {
    q: 'Bulk or bagged mulch — which is cheaper?',
    a: 'Bulk mulch (by the cubic yard) is almost always cheaper per cubic foot than bagged, often by 30 to 50 percent. Bags win on convenience for small jobs or when you cannot get a delivery. Past about a cubic yard, bulk is usually worth the trade-off — but plug both prices in to compare.',
  },
  {
    q: 'When is the best time to mulch?',
    a: 'Late spring is most common, after the soil has warmed and weeds are starting to sprout. A second top-up in the fall protects roots from winter cold. Avoid mulching very wet beds — let them drain first so the mulch is not locking in soggy conditions.',
  },
  {
    q: 'How much extra mulch should I buy for waste?',
    a: 'Five to ten percent extra covers settling, gaps and spillage at the wheelbarrow. Beds with lots of curves, edges or plants to work around lean toward 10 percent. BuildCalc folds the waste factor into both the yardage and the bag count.',
  },
];

export default function MulchPage() {
  return (
    <>
      <MulchCalculator />

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            How the mulch calculator works
          </h2>
          <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-dim">
            <p>
              The mulch calculator turns a flower bed&apos;s footprint and the
              depth you want into a clean material take-off. It multiplies
              length by width by depth in inches, divides by 1,728 to get
              cubic feet, then by 27 to get cubic yards — the unit bulk mulch
              is sold in. The bag count is the same volume divided by the size
              of the bag you choose, rounded up.
            </p>
            <p>
              A small waste factor of 5 to 10 percent covers settling, the
              gaps between plants, and a little spillage at the wheelbarrow.
              Add a price per cubic yard, per bag, or both, and the live cost
              card updates with every change. Most jobs over about a cubic
              yard work out cheaper in bulk than in bags.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Mulch calculator FAQ
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

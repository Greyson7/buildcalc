import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { RoofingCalculator } from './RoofingCalculator';

export const metadata: Metadata = {
  title: 'Roofing Calculator — Squares, Bundles & Roof Area',
  description:
    'Free roofing calculator: roof area, roofing squares and shingle bundle count from your footprint and pitch. Handles gable, hip and shed roofs. Works offline.',
  alternates: { canonical: '/roofing/' },
  openGraph: {
    title: 'Roofing Calculator — Squares, Bundles & Roof Area · BuildCalc',
    description:
      'Roof area, roofing squares and shingle bundles from your footprint and pitch.',
    url: '/roofing/',
    images: ['/og-image.png'],
  },
};

const FAQ: QA[] = [
  {
    q: 'How many bundles of shingles do I need?',
    a: 'Most shingles — three-tab and standard architectural — come three bundles to a roofing square, and a square covers 100 square feet of roof. Find your roof area, divide by 100 for the square count, then multiply by three for bundles. BuildCalc does this for you and rounds up to whole bundles with your waste factor included.',
  },
  {
    q: 'What is a roofing square?',
    a: 'A roofing square is 100 square feet of roof surface. Shingles, underlayment and labor are all quoted by the square, so it is the unit every roofing estimate is built on.',
  },
  {
    q: 'How does roof pitch change the amount of material?',
    a: 'A steeper roof has more surface area than the footprint it sits on. BuildCalc multiplies the footprint area by the pitch multiplier — the square root of the pitch squared plus 144, divided by 12. A 6/12 roof has a multiplier of about 1.118, so it needs roughly 12 percent more material than a flat area of the same footprint.',
  },
  {
    q: 'Does this work for a hip or shed roof?',
    a: 'Yes. For any roof whose planes share one pitch — gable, hip or shed — the total sloped area equals the horizontal footprint area times the pitch multiplier. Enter the footprint the roof covers and the calculator handles all three.',
  },
  {
    q: 'How much waste should I add for a roofing job?',
    a: 'A waste factor of 10 to 15 percent is standard. It covers the starter course, ridge cap, and cut-off at hips and valleys. Simple gable roofs lean toward 10 percent; complex roofs with several hips and valleys lean toward 15 percent or more.',
  },
  {
    q: 'How do I measure my roof footprint?',
    a: 'Measure the length and width of the building at the eaves, including any overhang past the walls. That outline is the footprint the roof covers. You do not need to climb on the roof — the calculator converts the flat footprint to true sloped area using the pitch.',
  },
];

export default function RoofingPage() {
  return (
    <>
      <RoofingCalculator />

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            How the roofing calculator works
          </h2>
          <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-dim">
            <p>
              BuildCalc&apos;s roofing calculator turns two measurements — the
              footprint the roof covers and its pitch — into a full material
              take-off. It multiplies the footprint area by the pitch
              multiplier to get the true sloped area, then converts that into
              roofing squares, shingle bundles and underlayment rolls.
            </p>
            <p>
              Roofing is sold by the square — 100 square feet — with three
              bundles of shingles to a square. A waste factor of 10 to 15
              percent covers the starter course, ridge cap and cut-off at hips
              and valleys, and is folded into every total. Because all sloped
              planes of one pitch scale the same way, the same calculation
              works for gable, hip and shed roofs alike.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">Guides</h2>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink-dim">
            <li>
              <Link
                href="/how-many-bundles-of-shingles-for-1000-sq-ft/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bundles of shingles for 1,000 sq ft?
              </Link>{' '}
              — math, a table by shingle type, and what else to buy with them.
            </li>
            <li>
              <Link
                href="/how-to-figure-roof-pitch/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How to figure roof pitch
              </Link>{' '}
              — rise-over-12, converting to degrees, and the pitch multiplier
              for material take-offs.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Roofing calculator FAQ
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

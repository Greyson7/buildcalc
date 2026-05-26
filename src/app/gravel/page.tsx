import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { GravelCalculator } from './GravelCalculator';

export const metadata: Metadata = {
  title: 'Gravel Calculator — Cubic Yards & Tons',
  description:
    'Free gravel calculator: how much gravel you need in cubic yards and tons, plus cost, from the area size and depth. Works offline, no sign-up.',
  alternates: { canonical: '/gravel/' },
  openGraph: {
    title: 'Gravel Calculator — Cubic Yards & Tons · BuildCalc',
    description:
      'How much gravel you need in cubic yards and tons, plus cost, from the area size and depth.',
    url: '/gravel/',
    images: ['/og-image.png'],
  },
};

const FAQ: QA[] = [
  {
    q: 'How much gravel do I need?',
    a: 'Multiply the length, width and depth of the area to cover to get its volume, then convert to cubic yards by dividing by 27 (after converting every measurement to feet). Enter the length, width and depth in BuildCalc and it returns the volume in cubic yards and the weight in tons, with your waste factor already included.',
  },
  {
    q: 'How many tons are in a cubic yard of gravel?',
    a: 'A cubic yard of crushed gravel or stone weighs roughly 1.4 tons on average. The exact figure depends on the material and how wet it is — dry sand is lighter, dense crushed stone is heavier — so confirm the conversion with your supplier for a precise order.',
  },
  {
    q: 'How deep should a gravel layer be?',
    a: 'For walkways and patios, a gravel layer of 2 to 4 inches is usually enough. Driveways need more — typically 4 to 6 inches, often built up in compacted layers over a deeper base. Deeper layers carry more weight and resist rutting, so match the depth to the traffic the surface will see.',
  },
  {
    q: 'How do I calculate gravel for a driveway?',
    a: 'Measure the driveway length and width, then pick a depth — 4 to 6 inches is common for residential driveways. Enter all three into the calculator. It multiplies them into a volume, converts to cubic yards and tons, and adds a waste factor so you order enough to spread and compact the full surface.',
  },
  {
    q: 'Is gravel sold by the ton or the yard?',
    a: 'Both. Bulk gravel from a quarry or landscape supplier is usually priced and delivered by the ton, while some yards sell it by the cubic yard. BuildCalc shows both numbers, so you can order in whichever unit your supplier uses and check the price either way.',
  },
  {
    q: 'How much extra gravel should I add for waste?',
    a: 'A waste factor of about 10 percent is a sensible default. It covers material lost to spreading, compaction settling and uneven subgrade. Running short means a second delivery fee, so it is usually cheaper to order a little extra than to come up short.',
  },
];

export default function GravelPage() {
  return (
    <>
      <GravelCalculator />

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            How the gravel calculator works
          </h2>
          <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-dim">
            <p>
              BuildCalc&apos;s gravel calculator turns three measurements — the
              length, width and depth of the area you want to cover — into a
              full material take-off. It multiplies them into a volume, converts
              that to cubic yards, and uses an average density of about 1.4 tons
              per cubic yard to estimate the weight you need to order.
            </p>
            <p>
              Gravel is sold both by the cubic yard and by the ton, so the
              calculator reports both. A waste factor — about 10 percent is
              typical — is folded into every total to cover spreading,
              compaction and uneven subgrade. Because gravel weight varies with
              the material and its moisture, treat the tonnage as a close
              estimate and confirm the density with your supplier before you
              order.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">Guides</h2>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink-dim">
            <li>
              <Link
                href="/how-many-yards-of-gravel-for-a-driveway/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many yards of gravel for a driveway?
              </Link>{' '}
              — yards and tons by driveway size at 4 and 6 inches deep.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Gravel calculator FAQ
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

import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StairsCalculator } from './StairsCalculator';

export const metadata: Metadata = {
  title: 'Stair Calculator — Risers, Treads & Stringer Length',
  description:
    'Free online stair calculator: exact riser height, tread depth, stringer length and a live diagram, all checked against IRC stair code. Works offline.',
  alternates: { canonical: '/stairs/' },
  openGraph: {
    title: 'Stair Calculator — Risers, Treads & Stringer Length · BuildCalc',
    description:
      'Exact riser height, tread depth and stringer length with a live diagram and IRC code checks.',
    url: '/stairs/',
    images: ['/og-image.png'],
  },
};

const FAQ: QA[] = [
  {
    q: 'How do I calculate stair stringers?',
    a: 'Start with the total rise — finished floor to finished floor. Divide it by a target riser height (around 7 to 7-3/4 inches) and round to the nearest whole number for the riser count. The exact riser height is the total rise divided by that count. The tread count is one less than the riser count, and the stringer length is the diagonal: the square root of total rise squared plus total run squared.',
  },
  {
    q: 'What is the maximum riser height allowed by code?',
    a: 'The International Residential Code (IRC R311.7.5) sets the maximum riser height for residential stairs at 7-3/4 inches. BuildCalc flags any layout that exceeds it.',
  },
  {
    q: 'What is the minimum stair tread depth?',
    a: 'IRC requires a minimum tread depth of 10 inches, measured between the nosings. Deeper treads are more comfortable; the calculator warns you when a layout falls below the minimum.',
  },
  {
    q: 'What is the bottom riser cut, or stringer drop?',
    a: 'Once treads are installed, each finished tread adds its own thickness on top of the step. To keep every finished step equal, the bottom of the stringer is cut shorter by one tread thickness. BuildCalc lists this bottom riser cut separately in the cut list.',
  },
  {
    q: 'What is a comfortable stair angle?',
    a: 'Most comfortable stairs fall between 30 and 37 degrees. Steeper than about 37 degrees starts to feel like a ladder; shallower than 30 degrees uses a lot of floor space. BuildCalc reports the exact angle for your layout.',
  },
  {
    q: 'Do I need a total run to use the stair calculator?',
    a: 'No. Total rise is the only required input. If you enter a total run, the calculator locks the geometry and divides it into exact treads. Leave it blank and your target tread depth sizes the run instead.',
  },
];

export default function StairsPage() {
  return (
    <>
      <StairsCalculator />

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            How the stair calculator works
          </h2>
          <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-dim">
            <p>
              BuildCalc&apos;s stair calculator turns one measurement — your
              total rise, floor to floor — into a complete cut list. It divides
              the rise into equal risers, derives the exact riser height and
              tread depth, and draws a live diagram you can check before
              cutting. Enter a total run to lock the geometry exactly, or leave
              it blank and let your target tread depth size the staircase.
            </p>
            <p>
              Every layout is checked against IRC R311.7, the residential stair
              code: a maximum riser height of 7-3/4 inches and a minimum tread
              depth of 10 inches, plus comfort guidelines like the 2R + T rule.
              The cut list also includes the bottom riser cut — shortened by one
              tread thickness so the finished steps come out equal once treads
              are installed.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">Guides</h2>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink-dim">
            <li>
              <Link
                href="/how-to-calculate-stair-stringers/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How to calculate stair stringers (with IRC code rules)
              </Link>{' '}
              — math, code limits and a worked example for a 9 ft rise.
            </li>
            <li>
              <Link
                href="/how-many-stair-stringers-do-i-need/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many stair stringers do I need?
              </Link>{' '}
              — spacing rules by tread material (wood, composite, metal) and
              stair width.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Stair calculator FAQ
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

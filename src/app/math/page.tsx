import type { Metadata } from 'next';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { QuickMathTool } from './QuickMathTool';

export const metadata: Metadata = {
  title: 'Construction Math Calculator — Feet, Inches & Fractions',
  description:
    'Add, subtract, multiply and divide feet-inch-fraction measurements to 1/16". Plus fast conversions: roof pitch to degrees, square feet to acres and more.',
  alternates: { canonical: '/math/' },
  openGraph: {
    title: 'Construction Math Calculator — Feet, Inches & Fractions · BuildCalc',
    description:
      'Fraction-accurate dimensional math and one-tap job-site conversions.',
    url: '/math/',
  },
};

const FAQ: QA[] = [
  {
    q: 'How do I add feet and inches?',
    a: 'Enter each measurement as whole feet, whole inches and a fraction, then choose the plus operator. Quick Math converts everything to a common unit internally and returns a clean feet-inches-fraction result, rounded to the nearest 1/16 inch.',
  },
  {
    q: 'How do I convert roof pitch to degrees?',
    a: 'Roof pitch is written as rise over 12 inches of run — a 6/12 pitch rises 6 inches per foot. The angle in degrees is the arctangent of the rise divided by 12. A 6/12 pitch is about 26.6 degrees; the conversions panel does it instantly, either direction.',
  },
  {
    q: 'How many square feet are in an acre?',
    a: 'One acre is 43,560 square feet. The conversions panel converts either direction — square feet to acres or acres to square feet.',
  },
  {
    q: 'How do I figure out joist bays in a span?',
    a: 'Divide the total span by the joist spacing using the divide operator. A 10-foot span divided by 16 inches gives 7.5 — so the span holds seven full bays. The count rounds down to whole bays.',
  },
  {
    q: 'How do I convert inches to millimeters?',
    a: 'One inch equals exactly 25.4 millimeters. The conversions panel converts inches to millimeters and back.',
  },
  {
    q: 'How many cubic feet are in a cubic yard?',
    a: 'There are 27 cubic feet in a cubic yard. Use the cubic feet to cubic yards conversion to switch between them when ordering material.',
  },
];

export default function QuickMathPage() {
  return (
    <>
      <QuickMathTool />

      <div className="mt-8 space-y-6">
        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            How the construction math calculator works
          </h2>
          <div className="mt-2 space-y-2 text-sm leading-relaxed text-ink-dim">
            <p>
              Quick Math is a dimensional calculator built for the job site. It
              adds, subtracts, multiplies and divides measurements in feet,
              inches and fractions — so you can work out 12&apos; 4&quot; minus
              3-5/8&quot; without converting to decimals in your head. Results
              round to the nearest 1/16 inch.
            </p>
            <p>
              Plus and minus return a length. Multiply two lengths for an area.
              Divide one length by another for a count — handy for finding how
              many joist bays fit in a span. The conversions panel handles fast,
              everyday swaps: square feet to acres, cubic feet to cubic yards,
              millimeters to inches, and roof pitch to degrees.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Construction math FAQ
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

import type { Metadata } from 'next';
import { SiteFooter } from '@/components/SiteFooter';
import { WaitlistForm } from './WaitlistForm';

export const metadata: Metadata = {
  title: 'BuildCalcPro — Join the Waitlist',
  description:
    'Vote on the BuildCalcPro features that matter most — saved jobs, PDF estimates, custom local material prices, and more. Free to join the waitlist.',
  alternates: { canonical: '/waitlist/' },
};

const FEATURES: { id: string; label: string; hint: string }[] = [
  {
    id: 'save-jobs',
    label: 'Save & retrieve jobs by name',
    hint: 'Pull up a quote from last week without re-entering everything.',
  },
  {
    id: 'pdf-export',
    label: 'Export estimates as PDF',
    hint: 'Hand a clean printout to a client, lender, or spouse.',
  },
  {
    id: 'custom-prices',
    label: 'Custom local material prices',
    hint: 'Use your supplier’s actual prices, not generic defaults.',
  },
  {
    id: 'multi-area',
    label: 'Multi-area / whole-house aggregation',
    hint: 'Total a whole house’s drywall, paint or decking in one quote.',
  },
  {
    id: 'cut-list',
    label: 'Cut lists for lumber and sheet goods',
    hint: 'Optimized cut diagrams to minimize waste.',
  },
  {
    id: 'crew-share',
    label: 'Share a job with your crew',
    hint: 'Send the foreman a link to the same live estimate.',
  },
  {
    id: 'ai-helper',
    label: 'AI helper — describe the job in plain English',
    hint: 'Type "10×12 patio with a 4-inch slab" and the calculator fills itself in.',
  },
];

export default function WaitlistPage() {
  return (
    <div>
      <header>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-light">
          BuildCalcPro
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight">
          Join the waitlist
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-ink-dim">
          The free calculators stay free, forever. BuildCalcPro adds
          heavy-duty features for serious DIYers and pros who want more than a
          one-shot estimate. Vote on what gets built first — the most-requested
          features ship first, and waitlist members get launch-day pricing.
        </p>
      </header>

      <WaitlistForm features={FEATURES} />

      <section className="mt-8 rounded-2xl border border-line bg-surface-1 p-4 text-sm leading-relaxed text-ink-dim">
        <p className="font-bold text-ink">What stays free?</p>
        <p className="mt-1.5">
          Every calculator currently on the site, every long-tail guide, the
          offline PWA, and the no-signup experience. BuildCalcPro is purely
          additive — we will never paywall the existing math.
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}

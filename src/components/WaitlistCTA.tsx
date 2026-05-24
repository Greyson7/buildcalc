'use client';

import Link from 'next/link';
import { ArrowRightIcon } from './icons';
import { trackWaitlistClick } from '@/lib/analytics';

/**
 * Small banner card that sits inside calculator result panels, inviting
 * visitors to vote on upcoming Pro features. Links to /waitlist where the
 * actual email + feature-vote form lives — keeps the calculator page focused
 * on the result, and keeps form state out of every module.
 *
 * `source` identifies which calculator the click came from, so the Plausible
 * funnel can see which calculators drive the most waitlist intent.
 */
export function WaitlistCTA({ source }: { source: string }) {
  return (
    <div className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-light">
        Coming in BuildCalcPro
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">
        Save jobs, export estimates as PDF, set custom local material prices.
        Vote on what to build first.
      </p>
      <Link
        href="/waitlist/"
        onClick={() => trackWaitlistClick(source)}
        className="tap mt-3 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-surface-0 active:bg-brand-dark"
      >
        Join the waitlist
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}

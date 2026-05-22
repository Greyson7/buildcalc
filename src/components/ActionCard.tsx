'use client';

import type { ReactNode } from 'react';

import { trackAffiliateClick } from '@/lib/analytics';

/**
 * ActionCard — the monetization surface at the bottom of every module.
 *
 * Affiliate tool recommendations only: static outbound links, no forms and
 * no data collection (works offline / inside a Capacitor WebView). Every
 * link is `rel="sponsored"` and sits under a clear affiliate disclosure.
 *
 * To swap a product, change a ToolItem's `url` — see lib/affiliate.ts.
 *
 * Each link fires a Plausible "Affiliate Click" event (see lib/analytics.ts)
 * tagged with the host `module` and product name — this is the site's
 * primary conversion event. Analytics is a no-op offline, so the outbound
 * navigation is never blocked or delayed.
 */

export interface ToolItem {
  name: string;
  detail: string;
  /** Full outbound affiliate URL — build with amazon() or a partner link. */
  url: string;
  icon: ReactNode;
}

export function ActionCard({
  module,
  items,
}: {
  /** Calculator this card sits in — tags the "Affiliate Click" event. */
  module: string;
  items: ToolItem[];
}) {
  return (
    <section className="card p-4">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-bold">Tools for this job</h3>
        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
          Sponsored
        </span>
      </div>
      <p className="mt-0.5 text-[11px] leading-snug text-ink-faint">
        Gear we&apos;d reach for on this job. As an Amazon Associate, BuildCalc
        earns from qualifying purchases — at no extra cost to you.
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {items.map((t) => (
          <a
            key={t.name}
            href={t.url}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={() => trackAffiliateClick(module, t.name)}
            className="tap flex flex-col items-center gap-1.5 rounded-2xl border border-line bg-surface-2 p-3 text-center transition-colors hover:border-brand/40 active:bg-surface-3"
          >
            <span className="text-brand">{t.icon}</span>
            <span className="text-xs font-bold leading-tight">{t.name}</span>
            <span className="text-[10px] leading-tight text-ink-faint">
              {t.detail}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

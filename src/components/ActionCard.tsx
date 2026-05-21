import type { ReactNode } from 'react';

/**
 * ActionCard — the monetization surface at the bottom of every module.
 *
 * One variant only: affiliate tool recommendations with static outbound
 * links. No forms, no data collection — nothing that needs a backend, so it
 * works offline and inside a Capacitor WebView unchanged.
 */

export interface ToolItem {
  name: string;
  detail: string;
  /** Search query for the retailer link. */
  query: string;
  icon: ReactNode;
}

/**
 * Affiliate groundwork: this is the single place a real affiliate program's
 * deep-link format / tracking tag gets wired in later.
 */
function toolUrl(query: string): string {
  return `https://www.homedepot.com/s/${encodeURIComponent(query)}`;
}

export function ActionCard({
  title,
  items,
}: {
  title: string;
  items: ToolItem[];
}) {
  return (
    <section className="card p-4">
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-sm font-bold">{title}</h3>
        <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
          Affiliate
        </span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {items.map((t) => (
          <a
            key={t.name}
            href={toolUrl(t.query)}
            target="_blank"
            rel="noopener noreferrer"
            className="tap flex flex-col items-center gap-1.5 rounded-2xl border border-line bg-surface-2 p-3 text-center active:bg-surface-3"
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

import type { ReactNode } from 'react';

/**
 * ActionCard — the monetization surface at the bottom of every module.
 *
 * Affiliate tool recommendations only: static outbound links, no forms and
 * no data collection (works offline / inside a Capacitor WebView). Every
 * link is `rel="sponsored"` and sits under a clear affiliate disclosure.
 *
 * To swap a product, change a ToolItem's `url` — see lib/affiliate.ts.
 */

export interface ToolItem {
  name: string;
  detail: string;
  /** Full outbound affiliate URL — build with amazon() or a partner link. */
  url: string;
  icon: ReactNode;
}

export function ActionCard({ items }: { items: ToolItem[] }) {
  return (
    <section className="card p-4">
      <h3 className="text-sm font-bold">Recommended Tools</h3>
      <p className="mt-0.5 text-[11px] leading-snug text-ink-faint">
        Affiliate links — BuildCalc may earn a commission, at no extra cost to
        you.
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {items.map((t) => (
          <a
            key={t.name}
            href={t.url}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="tap flex flex-col items-center gap-1.5 rounded-2xl border border-line bg-surface-2 p-3 text-center active:bg-surface-3"
          >
            <span className="text-brand">{t.icon}</span>
            <span className="text-xs font-bold leading-tight">{t.name}</span>
            <span className="text-[10px] leading-tight text-ink-faint">
              {t.detail}
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-ink-faint/70">
              Ad
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

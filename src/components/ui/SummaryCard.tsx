import type { ReactNode } from 'react';

type Tone = 'default' | 'brand' | 'good' | 'warn' | 'bad';

const TONE: Record<Tone, string> = {
  default: 'text-ink',
  brand: 'text-brand-light',
  good: 'text-ok',
  warn: 'text-warn',
  bad: 'text-bad',
};

/** Scrollable results container — outputs as a clean list, never paginated. */
export function SummaryCard({
  title,
  icon,
  children,
}: {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="card overflow-hidden">
      {title && (
        <header className="flex items-center gap-2 border-b border-line px-4 py-3">
          {icon}
          <h2 className="text-sm font-bold tracking-tight">{title}</h2>
        </header>
      )}
      <div className="divide-y divide-line/70">{children}</div>
    </section>
  );
}

/** A single label → value result line. `big` highlights headline numbers. */
export function SummaryRow({
  label,
  value,
  hint,
  tone = 'default',
  big = false,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  tone?: Tone;
  big?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <div className="min-w-0">
        <div className="text-sm font-medium text-ink-dim">{label}</div>
        {hint && <div className="text-xs text-ink-faint">{hint}</div>}
      </div>
      <div
        className={`selectable shrink-0 text-right font-mono font-bold ${
          big ? 'text-2xl' : 'text-base'
        } ${TONE[tone]}`}
      >
        {value}
      </div>
    </div>
  );
}

/** A pass/fail compliance line — used for building-code checks. */
export function CheckRow({
  label,
  detail,
  pass,
}: {
  label: string;
  detail: string;
  pass: boolean;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span
        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ${
          pass ? 'bg-ok/15 text-ok' : 'bg-bad/15 text-bad'
        }`}
      >
        {pass ? '✓' : '!'}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-xs text-ink-faint">{detail}</div>
      </div>
    </div>
  );
}

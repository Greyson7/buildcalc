'use client';

import { BrandMark } from './icons';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

/** Sticky top bar: brand mark + live connectivity status. */
export function AppHeader() {
  const online = useOnlineStatus();

  return (
    <header
      className="sticky top-0 z-20 border-b border-line bg-surface-0/85 backdrop-blur-md"
      style={{ paddingTop: 'var(--safe-top)' }}
    >
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-surface-2 text-brand">
            <BrandMark className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <div className="text-[15px] font-extrabold tracking-tight">
              BuildCalc
            </div>
            <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-ink-faint">
              Construction Tools
            </div>
          </div>
        </div>

        <span
          className={`flex items-center gap-1.5 rounded-pill border px-2.5 py-1 text-[11px] font-semibold ${
            online
              ? 'border-line text-ink-dim'
              : 'border-warn/40 bg-warn/10 text-warn'
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              online ? 'bg-ok' : 'bg-warn'
            }`}
          />
          {online ? 'Online' : 'Offline'}
        </span>
      </div>
    </header>
  );
}

'use client';

import { useEffect } from 'react';
import { useCalculatorStore } from '@/store/useCalculatorStore';

/**
 * One-time client bootstrap, mounted once in the root layout:
 *  - restores persisted calculator inputs after mount
 *  - registers the offline-first service worker
 *
 * Renders nothing.
 */
export function ClientBoot() {
  useEffect(() => {
    // Restore saved inputs (deferred to avoid a static-render hydration clash).
    void useCalculatorStore.persist.rehydrate();

    // Progressive enhancement — the app works without it, better with it.
    if ('serviceWorker' in navigator) {
      const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
      navigator.serviceWorker
        .register(`${base}/sw.js`, { scope: `${base}/` })
        .catch(() => {
          /* offline support unavailable — non-fatal */
        });
    }
  }, []);

  return null;
}

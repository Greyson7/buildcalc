/**
 * analytics.ts — thin wrapper over Plausible custom events.
 *
 * Plausible is privacy-first and cookieless, so the app needs no consent
 * popup. The script is loaded deferred (see components/Analytics.tsx) and is
 * only present when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set, so this is a no-op
 * otherwise — including offline.
 */

declare global {
  interface Window {
    plausible?: ((
      event: string,
      options?: { props?: Record<string, string> },
    ) => void) & { q?: unknown[] };
  }
}

/** Fire a custom analytics event. Safe to call anywhere — never throws. */
export function track(event: string, props?: Record<string, string>): void {
  if (typeof window === 'undefined') return;
  try {
    window.plausible?.(event, props ? { props } : undefined);
  } catch {
    /* analytics must never break the app */
  }
}

/**
 * Record which module the visitor opened first this session (user journey).
 * Fires "First Module" once per browser session.
 */
export function trackFirstModule(module: string): void {
  if (typeof window === 'undefined') return;
  try {
    if (sessionStorage.getItem('buildcalc-first-module')) return;
    sessionStorage.setItem('buildcalc-first-module', module);
  } catch {
    /* sessionStorage blocked — still send the event once per load */
  }
  track('First Module', { module });
}

/** Fire the per-module "Calculate" event a single time. */
export function trackCalculate(module: string): void {
  track('Calculate', { module });
}

/**
 * Record a click on an outbound affiliate ("Recommended Tools") link — the
 * site's primary conversion event. `module` is the calculator it was clicked
 * from and `product` is the tool's display name, so Plausible can break the
 * "Affiliate Click" goal down by both.
 */
export function trackAffiliateClick(module: string, product: string): void {
  track('Affiliate Click', { module, product });
}

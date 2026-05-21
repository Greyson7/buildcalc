'use client';

import Script from 'next/script';

/**
 * Privacy-first analytics via Plausible — cookieless, no consent banner
 * needed. Loaded deferred (`afterInteractive`) so it has zero impact on
 * first paint, and only when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is configured.
 *
 * Plausible is a different origin, so the service worker passes its
 * requests straight through — they simply fail silently when offline and
 * never affect the app.
 */
export function Analytics() {
  // Defaults to the production domain; override (or set empty) via env.
  const domain =
    process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? 'buildprocalc.com';
  if (!domain) return null;

  return (
    <>
      {/* Queue stub so track() works even before the script finishes loading. */}
      <Script id="plausible-init" strategy="afterInteractive">
        {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
      </Script>
      <Script
        id="plausible"
        defer
        data-domain={domain}
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from './icons';

/**
 * Personalized hello for visitors arriving from a QR-code sticker
 * (utm_source=qr-sticker). Pins the answer path right at the top of a guide
 * article so a busy in-store scanner doesn't have to scroll the long-form
 * content to reach the calculator. Renders nothing for organic / search
 * arrivals, who get the full guide unchanged.
 */
export function StickerWelcome({
  href,
  buttonLabel,
  description,
}: {
  href: string;
  buttonLabel: string;
  description: string;
}) {
  const [show, setShow] = useState(false);

  // Read the UTM source after mount — keeps the SSR HTML identical for every
  // visitor (no hydration mismatch), then reveals the banner only when the
  // QR-sticker tag is present.
  useEffect(() => {
    try {
      const source =
        new URLSearchParams(window.location.search).get('utm_source') ?? '';
      if (source.includes('qr-sticker')) setShow(true);
    } catch {
      /* URLSearchParams unsupported — no-op. */
    }
  }, []);

  if (!show) return null;

  return (
    <div className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-light">
        From your sticker
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">
        {description}
      </p>
      <Link
        href={href}
        className="tap mt-3 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-surface-0 active:bg-brand-dark"
      >
        {buttonLabel}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}

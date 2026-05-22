import Link from 'next/link';

// A Google Form URL or a mailto: — override with NEXT_PUBLIC_FEEDBACK_URL.
const FEEDBACK_URL =
  process.env.NEXT_PUBLIC_FEEDBACK_URL ||
  'https://docs.google.com/forms/d/e/1FAIpQLScB5YuDw075VGzb7RbP-MIMIKO97c5_oOo2ZvtucJyH_-twFw/viewform';

/** Site-wide footer — legal links, the planning-only disclaimer, copyright. */
export function SiteFooter() {
  const external = !FEEDBACK_URL.startsWith('mailto:');

  return (
    <footer className="mt-10 border-t border-line pt-5 text-center">
      <nav className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-semibold text-ink-dim">
        <Link href="/terms" className="inline-block py-1 active:text-brand">
          Terms of Service
        </Link>
        <span aria-hidden="true" className="text-ink-faint">
          ·
        </span>
        <Link href="/privacy" className="inline-block py-1 active:text-brand">
          Privacy Policy
        </Link>
        <span aria-hidden="true" className="text-ink-faint">
          ·
        </span>
        <a
          href={FEEDBACK_URL}
          {...(external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          className="inline-block py-1 active:text-brand"
        >
          Feedback
        </a>
      </nav>

      <p className="mx-auto mt-3 max-w-md px-2 text-[11px] leading-relaxed text-ink-faint">
        BuildCalc provides estimates for planning purposes only. Always verify
        results with a qualified professional and your local building code
        before purchasing materials or starting construction.
      </p>
      <p className="mt-2 text-[11px] text-ink-faint">
        © 2026 BuildCalc · As an Amazon Associate, BuildCalc earns from
        qualifying purchases.
      </p>
    </footer>
  );
}

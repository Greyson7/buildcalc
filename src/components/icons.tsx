/** Shared inline SVG icons — no icon-font dependency, crisp at any size. */

type IconProps = { className?: string };

/** Solid stepped-staircase brand glyph (matches the PWA icon). */
export function BrandMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M116 396V324h72v-72h72v-72h72v-72h72v288z"
      />
    </svg>
  );
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

// --- Navigation -----------------------------------------------------------

export function HomeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v9a1 1 0 001 1h12a1 1 0 001-1v-9" />
    </svg>
  );
}

export function StairsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M3 21v-4h5v-4h5V9h5V5h3" />
    </svg>
  );
}

export function ConcreteIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M3 8l9-4 9 4-9 4-9-4z" />
      <path d="M3 8v6l9 4 9-4V8" />
      <path d="M12 12v6" />
    </svg>
  );
}

export function QuickMathIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect
        x="4"
        y="3"
        width="16"
        height="18"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="8"
        y1="8"
        x2="16"
        y2="8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g fill="currentColor">
        <circle cx="9" cy="13" r="1.25" />
        <circle cx="15" cy="13" r="1.25" />
        <circle cx="9" cy="17.3" r="1.25" />
        <circle cx="15" cy="17.3" r="1.25" />
      </g>
    </svg>
  );
}

// --- Generic --------------------------------------------------------------

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function RulerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M3 9l6-6 12 12-6 6z" />
      <path d="M8 8l1.5 1.5M11 5l2.5 2.5M14 11l1.5 1.5M5 12l2.5 2.5" />
    </svg>
  );
}

// --- Tool icons (ActionCard recommendations) ------------------------------

export function SquareIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M6 3v13a2 2 0 002 2h13" />
      <path d="M11 18v-3M15 18v-3" />
    </svg>
  );
}

export function SawIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <circle cx="11" cy="13" r="7" />
      <circle cx="11" cy="13" r="1.6" />
      <path d="M16 8l4.5-4.5" />
    </svg>
  );
}

export function TapeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M3 13a6 6 0 016-6h4a6 6 0 010 12H6a3 3 0 01-3-3z" />
      <circle cx="9" cy="13" r="2.5" />
      <path d="M19 16l2 3h-4z" />
    </svg>
  );
}

export function TrowelIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M14 4l5 5" />
      <path d="M16.5 6.5l-12 7 6 6 7-12" />
    </svg>
  );
}

export function BucketIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M5 8h14l-1.6 11.2a1 1 0 01-1 .8H7.6a1 1 0 01-1-.8z" />
      <path d="M7 8a5 3 0 0110 0" />
    </svg>
  );
}

export function LevelIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <rect x="2" y="9" width="20" height="6" rx="1.5" />
      <circle cx="12" cy="12" r="1.7" />
      <path d="M7 11v2M17 11v2" />
    </svg>
  );
}

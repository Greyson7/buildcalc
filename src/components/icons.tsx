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

export function HammerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M3 21l7.5-7.5" />
      <path d="M8 9l5-5 7 7-5 5z" />
      <path d="M10.5 6.5l5 5" />
    </svg>
  );
}

export function KnifeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M5 19l9-9 4-4 1 1-4 4-9 9H6a1 1 0 01-1-1z" />
    </svg>
  );
}

export function DrillIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M3 7h12v6H8l-5-3z" />
      <path d="M9 13v3a2 2 0 002 2h2" />
      <path d="M15 9h5l1-1v4l-1-1h-5" />
    </svg>
  );
}

export function ScrewIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M9 4h6" />
      <path d="M12 4v11l-2 4" />
      <path d="M9.5 8h5M9.5 11h5" />
    </svg>
  );
}

export function PencilIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M4 20l4-1L19 8l-3-3L5 16l-1 4z" />
      <path d="M14 7l3 3" />
    </svg>
  );
}

export function ClampIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M15 4H8a4 4 0 00-4 4v8a4 4 0 004 4h7" />
      <path d="M15 7v10" />
      <path d="M15 12h5" />
    </svg>
  );
}

export function ChalkLineIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M5 4h7a4 4 0 014 4v2a4 4 0 01-4 4H9" />
      <path d="M9 14l-4 6" />
      <path d="M13 6l4-2" />
    </svg>
  );
}

export function RollerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <rect x="3" y="4" width="14" height="7" rx="2" />
      <path d="M17 7.5h2a2 2 0 012 2V12a2 2 0 01-2 2h-7" />
      <path d="M12 14v2a1 1 0 01-1 1h-1v4" />
    </svg>
  );
}

export function BrushIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M9 3h6v8H9z" />
      <path d="M9 11h6l-1 4H10z" />
      <path d="M11 15l-1 6h4l-1-6" />
    </svg>
  );
}

// --- Roadmap module icons -------------------------------------------------

export function RoofIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M2 14L12 5l10 9" />
      <path d="M6 13.5L12 8l6 5.5" />
    </svg>
  );
}

export function DeckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3 10h18M3 14h18" />
    </svg>
  );
}

export function AreaIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <rect x="5" y="8" width="14" height="11" rx="1.5" />
      <path d="M5 4.5h14" />
      <path d="M5 3v3M19 3v3" />
    </svg>
  );
}

export function GravelIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M3 20h18" />
      <path d="M4.5 20c1.5-8 13.5-8 15 0" />
      <circle cx="9" cy="16" r="1.3" />
      <circle cx="14.5" cy="14.5" r="1.3" />
      <circle cx="12" cy="18" r="1.3" />
    </svg>
  );
}

export function DrywallIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M12 4v16M3 12h18" />
    </svg>
  );
}

export function RakeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M3 6h18" />
      <path d="M6 6v3M9 6v3M12 6v3M15 6v3M18 6v3" />
      <path d="M12 6l-3 14" />
    </svg>
  );
}

// --- UI glyphs ------------------------------------------------------------

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function ChatIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M4 5h16v11H9l-4 4V5z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </svg>
  );
}

export function ShareIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M12 14V4M8.5 7.5L12 4l3.5 3.5" />
      <path d="M6 12v7a1 1 0 001 1h10a1 1 0 001-1v-7" />
    </svg>
  );
}

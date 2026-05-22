'use client';

import { motion } from 'framer-motion';
import type { DeckingResult } from '@/lib/decking';

/*
 * Top-down deck preview. Horizontal seams suggest the run of deck boards; the
 * chip carries the exact board count. Re-renders live; framer-motion runs the
 * entrance only.
 */
const VW = 360;
const VH = 230;

export function DeckingDiagram({ result }: { result: DeckingResult }) {
  if (!result.valid) {
    return (
      <div className="card grid h-[220px] place-items-center px-6 text-center">
        <p className="text-sm text-ink-faint">
          Enter the deck size to preview the board layout.
        </p>
      </div>
    );
  }

  const x0 = 46;
  const y0 = 30;
  const w = VW - 2 * x0;
  const h = VH - 88;

  // Cap the drawn seams so a wide deck reads cleanly without clutter.
  const seams = Math.min(Math.max(result.boardRows - 1, 0), 19);
  const lines = Array.from(
    { length: seams },
    (_, i) => y0 + ((i + 1) / (seams + 1)) * h,
  );

  const chipText = `${result.boardsNeeded} boards`;
  const chipW = chipText.length * 6.4 + 16;

  return (
    <motion.div
      className="card overflow-hidden"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <h2 className="text-sm font-bold">Deck Preview</h2>
        <span className="text-xs font-semibold text-ink-faint">
          {result.boardRows} rows · {result.joistCount} joists
        </span>
      </div>

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full"
        role="img"
        aria-label={`Deck layout — ${result.boardsNeeded} deck boards across ${result.boardRows} rows.`}
      >
        {/* Deck surface */}
        <rect
          x={x0}
          y={y0}
          width={w}
          height={h}
          rx={4}
          fill="#ff7a1a"
          fillOpacity="0.14"
          stroke="#ff7a1a"
          strokeWidth="2"
        />
        {/* Board seams */}
        {lines.map((y, i) => (
          <line
            key={i}
            x1={x0}
            y1={y}
            x2={x0 + w}
            y2={y}
            stroke="#ff7a1a"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
        ))}
        {/* Board-count chip */}
        <rect
          x={VW / 2 - chipW / 2}
          y={y0 + h + 16}
          width={chipW}
          height={18}
          rx={9}
          fill="#ff7a1a"
        />
        <text
          x={VW / 2}
          y={y0 + h + 25}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="11"
          fontWeight="800"
          fontFamily="ui-monospace, monospace"
          fill="#0c0f14"
        >
          {chipText}
        </text>
      </svg>
    </motion.div>
  );
}

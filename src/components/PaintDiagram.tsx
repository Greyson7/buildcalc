'use client';

import { motion } from 'framer-motion';
import type { PaintResult } from '@/lib/paint';

/*
 * Front-on wall preview. The large rectangle is the wall surface; the small
 * rectangles inside it stand in for the doors and windows subtracted from the
 * paintable area. The chip carries the exact gallon count. Re-renders live;
 * framer-motion runs the entrance only.
 */
const VW = 360;
const VH = 230;

export function PaintDiagram({
  result,
  doors,
  windows,
}: {
  result: PaintResult;
  doors: number;
  windows: number;
}) {
  if (!result.valid) {
    return (
      <div className="card grid h-[220px] place-items-center px-6 text-center">
        <p className="text-sm text-ink-faint">
          Enter the room size to preview the paintable wall.
        </p>
      </div>
    );
  }

  const x0 = 46;
  const y0 = 30;
  const w = VW - 2 * x0;
  const h = VH - 88;

  // Cap the drawn openings so a busy room still reads cleanly.
  const drawnDoors = Math.min(Math.max(doors, 0), 4);
  const drawnWindows = Math.min(Math.max(windows, 0), 6);

  // Doors sit on the floor line; windows float at mid-wall height.
  const doorW = 26;
  const doorH = h * 0.55;
  const winW = 30;
  const winH = h * 0.32;

  const doorRects = Array.from({ length: drawnDoors }, (_, i) => ({
    x: x0 + 14 + i * (doorW + 12),
    y: y0 + h - doorH,
  }));
  const windowRects = Array.from({ length: drawnWindows }, (_, i) => ({
    x: x0 + w - 14 - winW - i * (winW + 12),
    y: y0 + h * 0.22,
  }));

  const chipText = `${result.gallons} gal`;
  const chipW = chipText.length * 6.4 + 16;

  return (
    <motion.div
      className="card overflow-hidden"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <h2 className="text-sm font-bold">Wall Preview</h2>
        <span className="text-xs font-semibold text-ink-faint">
          {doors} door{doors === 1 ? '' : 's'} · {windows} window
          {windows === 1 ? '' : 's'}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full"
        role="img"
        aria-label={`Wall layout — ${result.gallons} gallons of paint, doors and windows subtracted.`}
      >
        {/* Wall surface */}
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
        {/* Door openings */}
        {doorRects.map((d, i) => (
          <rect
            key={`door-${i}`}
            x={d.x}
            y={d.y}
            width={doorW}
            height={doorH}
            rx={2}
            fill="#0c0f14"
            fillOpacity="0.35"
            stroke="#ff7a1a"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
        ))}
        {/* Window openings */}
        {windowRects.map((wn, i) => (
          <rect
            key={`window-${i}`}
            x={wn.x}
            y={wn.y}
            width={winW}
            height={winH}
            rx={2}
            fill="#0c0f14"
            fillOpacity="0.35"
            stroke="#ff7a1a"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
        ))}
        {/* Gallon-count chip */}
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

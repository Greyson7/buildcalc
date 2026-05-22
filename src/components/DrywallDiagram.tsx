'use client';

import { motion } from 'framer-motion';
import type { DrywallResult } from '@/lib/drywall';

/*
 * Wall-elevation preview. The rectangle is divided into a grid of panels to
 * suggest how full sheets tile the surface; the chip carries the exact sheet
 * count. Re-renders live; framer-motion runs the entrance only.
 */
const VW = 360;
const VH = 230;

export function DrywallDiagram({ result }: { result: DrywallResult }) {
  if (!result.valid) {
    return (
      <div className="card grid h-[220px] place-items-center px-6 text-center">
        <p className="text-sm text-ink-faint">
          Enter the room size to preview the sheet layout.
        </p>
      </div>
    );
  }

  const x0 = 46;
  const y0 = 30;
  const w = VW - 2 * x0;
  const h = VH - 88;

  // Lay the panels in a tidy grid sized to the sheet count, capped so a big
  // room still reads cleanly without clutter.
  const panels = Math.min(Math.max(result.sheets, 1), 24);
  const cols = Math.min(panels, 6);
  const rows = Math.ceil(panels / cols);

  const vSeams = Array.from(
    { length: cols - 1 },
    (_, i) => x0 + ((i + 1) / cols) * w,
  );
  const hSeams = Array.from(
    { length: rows - 1 },
    (_, i) => y0 + ((i + 1) / rows) * h,
  );

  const chipText = `${result.sheets} sheets`;
  const chipW = chipText.length * 6.4 + 16;

  return (
    <motion.div
      className="card overflow-hidden"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <h2 className="text-sm font-bold">Sheet Preview</h2>
        <span className="text-xs font-semibold text-ink-faint">
          {result.totalAreaSqFt.toFixed(0)} ft² · {result.screws} screws
        </span>
      </div>

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full"
        role="img"
        aria-label={`Drywall layout — ${result.sheets} sheets covering ${result.totalAreaSqFt.toFixed(0)} square feet.`}
      >
        {/* Drywall surface */}
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
        {/* Vertical sheet seams */}
        {vSeams.map((x, i) => (
          <line
            key={`v${i}`}
            x1={x}
            y1={y0}
            x2={x}
            y2={y0 + h}
            stroke="#ff7a1a"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
        ))}
        {/* Horizontal sheet seams */}
        {hSeams.map((y, i) => (
          <line
            key={`h${i}`}
            x1={x0}
            y1={y}
            x2={x0 + w}
            y2={y}
            stroke="#ff7a1a"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
        ))}
        {/* Sheet-count chip */}
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

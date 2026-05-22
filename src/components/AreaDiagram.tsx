'use client';

import { motion } from 'framer-motion';
import type { AreaResult } from '@/lib/area';

/*
 * Proportional area preview. The rectangle is scaled to the length-vs-width
 * ratio so a long room reads long; the chip carries the exact square footage.
 * Re-renders live; framer-motion runs the entrance only.
 */
const VW = 360;
const VH = 220;

export function AreaDiagram({
  lengthIn,
  widthIn,
  result,
}: {
  lengthIn: number;
  widthIn: number;
  result: AreaResult;
}) {
  if (!result.valid) {
    return (
      <div className="card grid h-[220px] place-items-center px-6 text-center">
        <p className="text-sm text-ink-faint">
          Enter a length and width to preview the area.
        </p>
      </div>
    );
  }

  // Fit the rectangle inside a padded box while keeping the L:W proportions.
  const boxW = VW - 92;
  const boxH = VH - 84;
  const ratio = widthIn / lengthIn;
  let w = boxW;
  let h = boxW * ratio;
  if (h > boxH) {
    h = boxH;
    w = boxH / ratio;
  }
  const x0 = (VW - w) / 2;
  const y0 = 26 + (boxH - h) / 2;

  const chipText = `${result.areaSqFt.toFixed(0)} ft²`;
  const chipW = chipText.length * 6.4 + 16;

  return (
    <motion.div
      className="card overflow-hidden"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <h2 className="text-sm font-bold">Area Preview</h2>
        <span className="text-xs font-semibold text-ink-faint">
          {result.areaSqYd.toFixed(1)} yd²
        </span>
      </div>

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full"
        role="img"
        aria-label={`Rectangular area — ${result.areaSqFt.toFixed(0)} square feet.`}
      >
        {/* Area surface */}
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
        {/* Square-footage chip */}
        <rect
          x={VW / 2 - chipW / 2}
          y={VH - 36}
          width={chipW}
          height={18}
          rx={9}
          fill="#ff7a1a"
        />
        <text
          x={VW / 2}
          y={VH - 27}
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

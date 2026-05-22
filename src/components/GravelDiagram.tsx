'use client';

import { motion } from 'framer-motion';
import type { GravelResult } from '@/lib/gravel';

/*
 * Top-down area preview. The rectangle suggests the footprint to be covered;
 * the chip carries the exact cubic-yard volume. Re-renders live; framer-motion
 * runs the entrance only.
 */
const VW = 360;
const VH = 230;

export function GravelDiagram({
  lengthIn,
  widthIn,
  depthIn,
  result,
}: {
  lengthIn: number;
  widthIn: number;
  depthIn: number;
  result: GravelResult;
}) {
  if (!result.valid) {
    return (
      <div className="card grid h-[220px] place-items-center px-6 text-center">
        <p className="text-sm text-ink-faint">
          Enter length, width and depth to preview the area.
        </p>
      </div>
    );
  }

  // Fit the footprint into the drawing area, preserving its aspect ratio.
  const maxFoot = Math.max(lengthIn, widthIn);
  const base = 200;
  const w = Math.max(60, (lengthIn / maxFoot) * base);
  const h = Math.max(44, (widthIn / maxFoot) * base);
  const x0 = (VW - w) / 2;
  const y0 = 28;

  const chipText = `${result.cubicYards.toFixed(1)} yd³`;
  const chipW = chipText.length * 6.4 + 16;

  return (
    <motion.div
      className="card overflow-hidden"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <h2 className="text-sm font-bold">Coverage Preview</h2>
        <span className="text-xs font-semibold text-ink-faint">
          {result.tons.toFixed(2)} tons
        </span>
      </div>

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full"
        role="img"
        aria-label={`Gravel coverage area — ${result.cubicYards.toFixed(
          1,
        )} cubic yards, ${result.tons.toFixed(2)} tons.`}
      >
        {/* Coverage area */}
        <rect
          x={x0}
          y={y0}
          width={w}
          height={h}
          rx={4}
          fill="#ff7a1a"
          fillOpacity="0.16"
          stroke="#ff7a1a"
          strokeWidth="2"
        />
        {/* Volume chip */}
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

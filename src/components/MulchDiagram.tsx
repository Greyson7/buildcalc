'use client';

import { motion } from 'framer-motion';
import type { MulchResult } from '@/lib/mulch';

/*
 * Top-down planting-bed preview. The footprint rectangle scales to the
 * length:width ratio; the chip carries the exact cubic yards.
 */
const VW = 360;
const VH = 230;

export function MulchDiagram({
  lengthIn,
  widthIn,
  result,
}: {
  lengthIn: number;
  widthIn: number;
  result: MulchResult;
}) {
  if (!result.valid) {
    return (
      <div className="card grid h-[220px] place-items-center px-6 text-center">
        <p className="text-sm text-ink-faint">
          Enter the bed length, width and mulch depth to preview the area.
        </p>
      </div>
    );
  }

  // Scale the rectangle to the L:W ratio, clamped so a long-and-thin bed
  // still reads as a bed and not a hairline.
  const maxSide = Math.max(lengthIn, widthIn);
  const baseW = 260;
  const baseH = 120;
  const w = Math.max(80, Math.min(baseW, (lengthIn / maxSide) * baseW));
  const h = Math.max(40, Math.min(baseH, (widthIn / maxSide) * baseH));
  const x0 = (VW - w) / 2;
  const y0 = 36;

  const chipText = `${result.cubicYards.toFixed(2)} yd³`;
  const chipW = chipText.length * 6.4 + 16;

  // A scatter of wood-chip flecks for texture.
  const flecks: Array<[number, number]> = [
    [0.18, 0.3],
    [0.42, 0.55],
    [0.7, 0.32],
    [0.3, 0.72],
    [0.6, 0.78],
    [0.85, 0.6],
  ];

  return (
    <motion.div
      className="card overflow-hidden"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <h2 className="text-sm font-bold">Bed Preview</h2>
        <span className="text-xs font-semibold text-ink-faint">
          {result.bags} × {result.bagSize} cu ft bags
        </span>
      </div>

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full"
        role="img"
        aria-label={`Mulch bed — ${result.cubicYards.toFixed(2)} cubic yards.`}
      >
        {/* Bed surface */}
        <rect
          x={x0}
          y={y0}
          width={w}
          height={h}
          rx={6}
          fill="#ff7a1a"
          fillOpacity="0.18"
          stroke="#ff7a1a"
          strokeWidth="2"
        />
        {/* Wood-chip flecks */}
        {flecks.map(([fx, fy], i) => (
          <path
            key={i}
            d={`M${x0 + fx * w} ${y0 + fy * h}h6`}
            stroke="#ff7a1a"
            strokeOpacity="0.55"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
        {/* Yardage chip below the bed */}
        <rect
          x={VW / 2 - chipW / 2}
          y={y0 + h + 18}
          width={chipW}
          height={18}
          rx={9}
          fill="#ff7a1a"
        />
        <text
          x={VW / 2}
          y={y0 + h + 27}
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

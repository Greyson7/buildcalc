'use client';

import { motion } from 'framer-motion';
import type { RoofingResult } from '@/lib/roofing';

/*
 * Gable-profile roof preview. The roof triangle's rise scales with the pitch,
 * so a steeper pitch visibly climbs; the chip carries the exact square count.
 * Re-renders live; framer-motion runs the entrance only.
 */
const VW = 360;
const VH = 220;

export function RoofingDiagram({
  pitch,
  result,
}: {
  pitch: number;
  result: RoofingResult;
}) {
  if (!result.valid) {
    return (
      <div className="card grid h-[220px] place-items-center px-6 text-center">
        <p className="text-sm text-ink-faint">
          Enter a footprint and pitch to preview the roof.
        </p>
      </div>
    );
  }

  const cx = VW / 2;
  const runHalf = 116;
  const wallY = 168;
  const wallH = 38;
  const rise = Math.min(116, Math.max(5, (pitch / 12) * runHalf));
  const ridgeY = wallY - rise;
  const leftX = cx - runHalf;
  const rightX = cx + runHalf;

  const chipText = `${result.squares.toFixed(1)} squares`;
  const chipW = chipText.length * 6.4 + 16;
  const chipY = (ridgeY + wallY) / 2;

  return (
    <motion.div
      className="card overflow-hidden"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <h2 className="text-sm font-bold">Roof Preview</h2>
        <span className="text-xs font-semibold text-ink-faint">
          {pitch}/12 pitch
        </span>
      </div>

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full"
        role="img"
        aria-label={`Gable roof at ${pitch} in 12 pitch — ${result.squares.toFixed(
          1,
        )} roofing squares.`}
      >
        {/* Walls */}
        <rect
          x={leftX}
          y={wallY}
          width={runHalf * 2}
          height={wallH}
          fill="#252d3a"
          stroke="#3a4658"
          strokeWidth="1.5"
        />
        {/* Roof planes */}
        <polygon
          points={`${leftX},${wallY} ${cx},${ridgeY} ${rightX},${wallY}`}
          fill="#ff7a1a"
          fillOpacity="0.18"
          stroke="#ff7a1a"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Ridge tick down the centre */}
        <line
          x1={cx}
          y1={ridgeY}
          x2={cx}
          y2={wallY}
          stroke="#ff7a1a"
          strokeOpacity="0.3"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {/* Squares chip on the roof face */}
        <rect
          x={cx - chipW / 2}
          y={chipY - 9}
          width={chipW}
          height={18}
          rx={9}
          fill="#ff7a1a"
        />
        <text
          x={cx}
          y={chipY + 1}
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

'use client';

import { motion } from 'framer-motion';
import { formatFeetInches, formatInches } from '@/lib/imperial';
import type { StairResult } from '@/lib/stairs';

/*
 * Dynamic 2D staircase diagram. Uniform scale on both axes, so the drawn
 * slope equals the real stair angle. Re-renders instantly on every keystroke;
 * framer-motion handles only the one-time entrance so live edits stay snappy.
 */

const W = 380;
const H = 280;
const PAD = { l: 56, r: 32, t: 30, b: 52 };

type ChipTone = 'brand' | 'blue' | 'dim';

function Chip({
  cx,
  cy,
  text,
  tone = 'brand',
  rotate = 0,
}: {
  cx: number;
  cy: number;
  text: string;
  tone?: ChipTone;
  rotate?: number;
}) {
  const w = text.length * 6.2 + 14;
  const h = 18;
  const bg = tone === 'brand' ? '#ff7a1a' : tone === 'blue' ? '#3b9eff' : '#252d3a';
  const fg = tone === 'dim' ? '#dfe5ee' : '#0c0f14';
  return (
    <g transform={rotate ? `rotate(${rotate} ${cx} ${cy})` : undefined}>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={9} fill={bg} />
      <text
        x={cx}
        y={cy + 0.5}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="11"
        fontWeight="800"
        fontFamily="ui-monospace, monospace"
        fill={fg}
      >
        {text}
      </text>
    </g>
  );
}

export function StairDiagram({ result }: { result: StairResult }) {
  if (!result.valid) {
    return (
      <div className="card grid h-[232px] place-items-center px-6 text-center">
        <p className="text-sm text-ink-faint">
          Enter a total rise to generate the staircase layout.
        </p>
      </div>
    );
  }

  const {
    numRisers,
    numTreads,
    riserHeight,
    treadDepth,
    totalRun,
    totalRise,
    stringerLength,
    angle,
  } = result;

  const scale = Math.min(
    (W - PAD.l - PAD.r) / totalRun,
    (H - PAD.t - PAD.b) / totalRise,
  );
  const oX = PAD.l;
  const oY = H - PAD.b;
  const sx = (x: number) => oX + x * scale;
  const sy = (y: number) => oY - y * scale;

  // Walking-line vertices: up a riser, across a tread, repeat.
  const walk: Array<[number, number]> = [[0, 0]];
  let wx = 0;
  let wy = 0;
  for (let k = 0; k < numRisers; k++) {
    wy += riserHeight;
    walk.push([wx, wy]);
    if (k < numRisers - 1) {
      wx += treadDepth;
      walk.push([wx, wy]);
    }
  }
  const walkPts = walk.map(([x, y]) => `${sx(x)},${sy(y)}`).join(' ');
  const silhouette = `${walkPts} ${sx(totalRun)},${sy(0)}`;

  const topX = sx(totalRun);
  const topY = sy(totalRise);

  // Angle arc at the origin.
  const arcR = 24;
  const arcEndX = oX + arcR * Math.cos((angle * Math.PI) / 180);
  const arcEndY = oY - arcR * Math.sin((angle * Math.PI) / 180);

  // Callout anchors: top riser (top-right), first tread (bottom-left).
  const lastRiserMidY = (sy(totalRise - riserHeight) + topY) / 2;

  return (
    <motion.div
      className="card overflow-hidden"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <h2 className="text-sm font-bold">Live Layout</h2>
        <span className="text-xs font-semibold text-ink-faint">
          {numRisers} risers · {numTreads} treads
        </span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label={`Staircase with ${numRisers} risers at ${formatInches(
          riserHeight,
        )} and ${numTreads} treads at ${formatInches(treadDepth)}.`}
      >
        <defs>
          <marker
            id="bc-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="4"
            refY="4"
            orient="auto"
          >
            <path d="M1 1 L7 4 L1 7 Z" fill="#8b97a8" />
          </marker>
          <linearGradient id="bc-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ff7a1a" stopOpacity="0.32" />
            <stop offset="1" stopColor="#ff7a1a" stopOpacity="0.06" />
          </linearGradient>
        </defs>

        {/* Ground & upper floor */}
        <line
          x1={oX - 16}
          y1={oY}
          x2={topX + 18}
          y2={oY}
          stroke="#39465a"
          strokeWidth="2"
        />
        <line
          x1={topX}
          y1={topY}
          x2={topX + 18}
          y2={topY}
          stroke="#39465a"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Stringer — structural diagonal */}
        <line
          x1={oX}
          y1={oY}
          x2={topX}
          y2={topY}
          stroke="#3b9eff"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Step mass + walking line */}
        <polygon points={silhouette} fill="url(#bc-fill)" />
        <polyline
          points={walkPts}
          fill="none"
          stroke="#ff7a1a"
          strokeWidth="2.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Angle arc */}
        <path
          d={`M ${oX + arcR} ${oY} A ${arcR} ${arcR} 0 0 0 ${arcEndX} ${arcEndY}`}
          fill="none"
          stroke="#8b97a8"
          strokeWidth="1.3"
        />
        <text
          x={oX + arcR + 8}
          y={oY - 8}
          fontSize="10"
          fontWeight="700"
          fill="#9aa7b8"
        >
          {angle.toFixed(1)}&#176;
        </text>

        {/* Total Rise dimension (left) */}
        <line x1={oX} y1={oY} x2={oX - 30} y2={oY} stroke="#3a4658" strokeWidth="1" />
        <line
          x1={oX}
          y1={topY}
          x2={oX - 30}
          y2={topY}
          stroke="#3a4658"
          strokeWidth="1"
        />
        <line
          x1={oX - 30}
          y1={oY}
          x2={oX - 30}
          y2={topY}
          stroke="#8b97a8"
          strokeWidth="1.4"
          markerStart="url(#bc-arrow)"
          markerEnd="url(#bc-arrow)"
        />
        <Chip
          cx={oX - 30}
          cy={(oY + topY) / 2}
          text={formatFeetInches(totalRise)}
          tone="dim"
          rotate={-90}
        />

        {/* Total Run dimension (bottom) */}
        <line x1={oX} y1={oY} x2={oX} y2={oY + 30} stroke="#3a4658" strokeWidth="1" />
        <line
          x1={topX}
          y1={oY}
          x2={topX}
          y2={oY + 30}
          stroke="#3a4658"
          strokeWidth="1"
        />
        <line
          x1={oX}
          y1={oY + 30}
          x2={topX}
          y2={oY + 30}
          stroke="#8b97a8"
          strokeWidth="1.4"
          markerStart="url(#bc-arrow)"
          markerEnd="url(#bc-arrow)"
        />
        <Chip
          cx={(oX + topX) / 2}
          cy={oY + 30}
          text={formatFeetInches(totalRun)}
          tone="dim"
        />

        {/* Stringer length */}
        <Chip
          cx={sx(totalRun * 0.66)}
          cy={sy(totalRise * 0.22)}
          text={formatFeetInches(stringerLength)}
          tone="blue"
        />

        {/* Riser height callout — top riser */}
        <line
          x1={topX}
          y1={sy(totalRise - riserHeight)}
          x2={topX}
          y2={topY}
          stroke="#ffb454"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <Chip
          cx={topX - 27}
          cy={lastRiserMidY}
          text={formatInches(riserHeight)}
          tone="brand"
        />

        {/* Tread depth callout — first tread */}
        <line
          x1={oX}
          y1={sy(riserHeight)}
          x2={sx(treadDepth)}
          y2={sy(riserHeight)}
          stroke="#ffb454"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <Chip
          cx={sx(treadDepth / 2)}
          cy={sy(riserHeight) - 14}
          text={formatInches(treadDepth)}
          tone="brand"
        />
      </svg>
    </motion.div>
  );
}

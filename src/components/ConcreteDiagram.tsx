'use client';

import { motion } from 'framer-motion';
import type { ConcreteResult } from '@/lib/concrete';
import { formatFeetInches } from '@/lib/imperial';

/*
 * Oblique-projection slab/footing preview. Dimensions are clamped so the box
 * always reads as a solid even for a thin slab; the chips carry the exact
 * numbers. Re-renders live; framer-motion runs the entrance only.
 */

const VW = 380;
const VH = 240;

function Chip({
  cx,
  cy,
  text,
  tone = 'brand',
}: {
  cx: number;
  cy: number;
  text: string;
  tone?: 'brand' | 'dim';
}) {
  const w = text.length * 6.2 + 14;
  const h = 18;
  const bg = tone === 'brand' ? '#ff7a1a' : '#252d3a';
  const fg = tone === 'brand' ? '#0c0f14' : '#dfe5ee';
  return (
    <g>
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

export function ConcreteDiagram({
  lengthIn,
  widthIn,
  depthIn,
  result,
}: {
  lengthIn: number;
  widthIn: number;
  depthIn: number;
  result: ConcreteResult;
}) {
  if (!(lengthIn > 0 && widthIn > 0 && depthIn > 0)) {
    return (
      <div className="card grid h-[220px] place-items-center px-6 text-center">
        <p className="text-sm text-ink-faint">
          Enter length, width and depth to preview the pour.
        </p>
      </div>
    );
  }

  const maxFoot = Math.max(lengthIn, widthIn);
  const base = 168;
  const Lp = Math.max(48, (lengthIn / maxFoot) * base);
  const Wd = Math.max(34, (widthIn / maxFoot) * base);
  const ox = Wd * 0.75;
  const oy = -Wd * 0.42;
  // Thickness is clamped so even a 4" slab stays a readable solid.
  const Dp = Math.min(60, Math.max(24, (depthIn / maxFoot) * base * 1.1));

  // Reserve a left margin for the depth dimension.
  const x0 = Math.max(60, (VW - Lp - ox) / 2);
  const y0 = 172;

  const BL: [number, number] = [x0, y0];
  const BR: [number, number] = [x0 + Lp, y0];
  const TR: [number, number] = [x0 + Lp, y0 - Dp];
  const TL: [number, number] = [x0, y0 - Dp];
  const TLb: [number, number] = [TL[0] + ox, TL[1] + oy];
  const TRb: [number, number] = [TR[0] + ox, TR[1] + oy];
  const BRb: [number, number] = [BR[0] + ox, BR[1] + oy];

  const poly = (pts: Array<[number, number]>) =>
    pts.map((p) => `${p[0]},${p[1]}`).join(' ');

  const depthDimX = x0 - 28;

  return (
    <motion.div
      className="card overflow-hidden"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <h2 className="text-sm font-bold">Pour Preview</h2>
        <span className="text-xs font-semibold text-ink-faint">
          {result.bagSize} lb · {result.bags} bags
        </span>
      </div>

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full"
        role="img"
        aria-label={`Concrete pour ${formatFeetInches(lengthIn)} long, ${formatFeetInches(
          widthIn,
        )} wide, ${formatFeetInches(depthIn)} deep.`}
      >
        <defs>
          <marker
            id="cc-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="4"
            refY="4"
            orient="auto"
          >
            <path d="M1 1 L7 4 L1 7 Z" fill="#8b97a8" />
          </marker>
        </defs>

        {/* Box faces: side, top, front */}
        <polygon
          points={poly([BR, TR, TRb, BRb])}
          fill="#ff7a1a"
          fillOpacity="0.10"
          stroke="#ff7a1a"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
        <polygon
          points={poly([TL, TR, TRb, TLb])}
          fill="#ff7a1a"
          fillOpacity="0.28"
          stroke="#ff7a1a"
          strokeOpacity="0.7"
          strokeWidth="1.5"
        />
        <polygon
          points={poly([BL, BR, TR, TL])}
          fill="#ff7a1a"
          fillOpacity="0.16"
          stroke="#ff7a1a"
          strokeOpacity="0.85"
          strokeWidth="1.8"
        />

        {/* Volume on the top face */}
        <Chip
          cx={(TL[0] + TRb[0]) / 2}
          cy={(TL[1] + TRb[1]) / 2}
          text={`${result.cubicYards.toFixed(2)} yd³`}
          tone="brand"
        />

        {/* Length — below the front edge */}
        <line x1={BL[0]} y1={y0 + 9} x2={BL[0]} y2={y0 + 26} stroke="#3a4658" strokeWidth="1" />
        <line x1={BR[0]} y1={y0 + 9} x2={BR[0]} y2={y0 + 26} stroke="#3a4658" strokeWidth="1" />
        <line
          x1={BL[0]}
          y1={y0 + 22}
          x2={BR[0]}
          y2={y0 + 22}
          stroke="#8b97a8"
          strokeWidth="1.4"
          markerStart="url(#cc-arrow)"
          markerEnd="url(#cc-arrow)"
        />
        <Chip
          cx={(BL[0] + BR[0]) / 2}
          cy={y0 + 22}
          text={formatFeetInches(lengthIn)}
          tone="dim"
        />

        {/* Depth — dimension line in the reserved left margin */}
        <line x1={BL[0]} y1={BL[1]} x2={depthDimX} y2={BL[1]} stroke="#3a4658" strokeWidth="1" />
        <line x1={TL[0]} y1={TL[1]} x2={depthDimX} y2={TL[1]} stroke="#3a4658" strokeWidth="1" />
        <line
          x1={depthDimX}
          y1={BL[1]}
          x2={depthDimX}
          y2={TL[1]}
          stroke="#8b97a8"
          strokeWidth="1.4"
          markerStart="url(#cc-arrow)"
          markerEnd="url(#cc-arrow)"
        />
        <Chip
          cx={depthDimX}
          cy={(BL[1] + TL[1]) / 2}
          text={formatFeetInches(depthIn)}
          tone="dim"
        />

        {/* Width — top-back oblique edge */}
        <Chip
          cx={(TR[0] + TRb[0]) / 2 + 16}
          cy={(TR[1] + TRb[1]) / 2 - 5}
          text={formatFeetInches(widthIn)}
          tone="dim"
        />
      </svg>
    </motion.div>
  );
}

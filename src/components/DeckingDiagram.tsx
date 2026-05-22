'use client';

import { motion } from 'framer-motion';
import type { DeckingResult, DeckSectionInput } from '@/lib/decking';

/*
 * Top-down deck preview. A single section shows the rectangle with board
 * seams; multiple sections render side by side, scaled by their own area, so
 * the user can see they all add up. The chip carries the exact board count.
 */
const VW = 360;
const VH = 230;

export function DeckingDiagram({
  sections,
  result,
}: {
  sections: DeckSectionInput[];
  result: DeckingResult;
}) {
  if (!result.valid) {
    return (
      <div className="card grid h-[220px] place-items-center px-6 text-center">
        <p className="text-sm text-ink-faint">
          Enter at least one section&apos;s length and width to preview the deck.
        </p>
      </div>
    );
  }

  const validSections = sections.filter((s) => s.length > 0 && s.width > 0);
  const isMulti = validSections.length > 1;

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
          {isMulti
            ? `${result.sectionCount} sections · ${result.joistCount} joists`
            : `${result.boardRows} rows · ${result.joistCount} joists`}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full"
        role="img"
        aria-label={`Deck layout — ${result.boardsNeeded} boards across ${result.sectionCount} ${
          isMulti ? 'sections' : 'section'
        }.`}
      >
        {isMulti ? (
          <MultiSections sections={validSections} />
        ) : (
          <SingleSection rowCount={result.boardRows} />
        )}

        {/* Board-count chip */}
        <rect
          x={VW / 2 - chipW / 2}
          y={VH - 30}
          width={chipW}
          height={18}
          rx={9}
          fill="#ff7a1a"
        />
        <text
          x={VW / 2}
          y={VH - 21}
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

function SingleSection({ rowCount }: { rowCount: number }) {
  const x0 = 46;
  const y0 = 30;
  const w = VW - 2 * x0;
  const h = VH - 92;

  // Cap drawn seams so a wide deck reads cleanly without clutter.
  const seams = Math.min(Math.max(rowCount - 1, 0), 19);
  const lines = Array.from(
    { length: seams },
    (_, i) => y0 + ((i + 1) / (seams + 1)) * h,
  );

  return (
    <>
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
    </>
  );
}

function MultiSections({ sections }: { sections: DeckSectionInput[] }) {
  const canvasX = 24;
  const canvasY = 36;
  const canvasW = VW - 2 * canvasX;
  const canvasH = VH - 92;

  const cols = sections.length;
  const gap = 8;
  const colW = (canvasW - gap * (cols - 1)) / cols;

  return (
    <>
      {sections.map((s, i) => {
        // Each section is drawn as its own little rectangle, preserving its
        // own length:width aspect ratio. The user provides dimensions, not
        // a spatial arrangement, so we lay them out left-to-right rather
        // than pretend to know how they fit together as an L.
        const aspect = s.width / s.length; // canvas height / canvas width
        let boxW = colW;
        let boxH = colW * aspect;
        if (boxH > canvasH) {
          boxH = canvasH;
          boxW = canvasH / aspect;
        }
        const x = canvasX + i * (colW + gap) + (colW - boxW) / 2;
        const y = canvasY + (canvasH - boxH) / 2;
        // Slight opacity variation so neighbouring sections read as distinct.
        const op = 0.14 + (i % 2) * 0.06;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={boxW}
              height={boxH}
              rx={4}
              fill="#ff7a1a"
              fillOpacity={op}
              stroke="#ff7a1a"
              strokeWidth="2"
            />
            <text
              x={x + boxW / 2}
              y={y + boxH / 2 + 4}
              textAnchor="middle"
              fontSize="12"
              fontWeight="800"
              fontFamily="ui-monospace, monospace"
              fill="#ff7a1a"
            >
              {i + 1}
            </text>
          </g>
        );
      })}
    </>
  );
}

'use client';

import { useEffect, useMemo, useRef } from 'react';
import { formatFeetInches, formatInches } from '@/lib/imperial';
import { calculateStairs } from '@/lib/stairs';
import { trackCalculate, trackFirstModule } from '@/lib/analytics';
import { amazon } from '@/lib/affiliate';
import { useCalculatorStore } from '@/store/useCalculatorStore';
import { ActionCard } from '@/components/ActionCard';
import { StairDiagram } from '@/components/StairDiagram';
import { SawIcon, SquareIcon, TapeIcon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { FractionalInput } from '@/components/ui/FractionalInput';
import { SliderField } from '@/components/ui/SliderField';
import { CheckRow, SummaryCard, SummaryRow } from '@/components/ui/SummaryCard';

// Sticky offset: pin flush below the 56px header (+ device safe-area inset).
const STICKY_TOP = 'calc(56px + var(--safe-top))';

const INPUT_HELP =
  'Enter whole feet and inches with the number pad, then tap a fraction chip for the 1/16" part. Example: 5\' 4-3/8" is 5 ft, 4 in, then the 3/8 chip.';

// Swap a product by changing the amazon() argument (ASIN or search), or
// drop in an industry-partner URL directly.
const STAIR_TOOLS = [
  {
    name: 'Framing Square',
    detail: 'Lay out stringers',
    url: amazon('framing square'),
    icon: <SquareIcon className="h-6 w-6" />,
  },
  {
    name: 'Circular Saw',
    detail: 'Cut the notches',
    url: amazon('circular saw'),
    icon: <SawIcon className="h-6 w-6" />,
  },
  {
    name: 'Tape Measure',
    detail: '25 ft, magnetic',
    url: amazon('25 ft tape measure'),
    icon: <TapeIcon className="h-6 w-6" />,
  },
];

export function StairsCalculator() {
  const stairs = useCalculatorStore((s) => s.stairs);
  const setStairs = useCalculatorStore((s) => s.setStairs);
  const resetStairs = useCalculatorStore((s) => s.resetStairs);

  // Analytics — first module of the session, and a one-time "Calculate" event.
  useEffect(() => trackFirstModule('Stairs'), []);
  const calcFired = useRef(false);
  const updateStairs = (patch: Parameters<typeof setStairs>[0]) => {
    setStairs(patch);
    if (!calcFired.current) {
      calcFired.current = true;
      trackCalculate('Stairs');
    }
  };

  const result = useMemo(() => calculateStairs(stairs), [stairs]);

  // A Total Run mathematically locks the geometry — it overrides Target Tread.
  const runLocked = stairs.totalRun > 0;
  const failCount = result.valid
    ? result.checks.filter((c) => !c.pass).length
    : 0;
  const checkTitle = !result.valid
    ? 'Code Check'
    : failCount === 0
      ? 'Code Check — All Clear'
      : `Code Check — ${failCount} issue${failCount > 1 ? 's' : ''}`;

  return (
    <div>
      <header>
        <h1 className="text-xl font-extrabold tracking-tight">Stair Calculator</h1>
        <p className="text-sm text-ink-dim">
          Lay out a code-compliant staircase with a live diagram.
        </p>
      </header>

      <div className="mt-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
        {/* Visual — sticky near the top so it updates while you edit below.
            pt-2 keeps an opaque strip above the card so nothing peeks through. */}
        <div
          className="sticky z-10 bg-surface-0 pb-4 pt-2 lg:order-2 lg:pb-0 lg:pt-0"
          style={{ top: STICKY_TOP }}
        >
          <StairDiagram result={result} />
        </div>

        {/* Inputs */}
        <div className="space-y-4 lg:order-1">
          <section className="card space-y-5 p-4">
            <p className="text-xs leading-relaxed text-ink-dim">
              <span className="font-bold text-ink">Total Rise</span> is required.
              Add a <span className="font-bold text-ink">Total Run</span> to lock
              the exact geometry — otherwise the targets below size the stairs.
            </p>

            <FractionalInput
              label="Total Rise"
              valueInches={stairs.totalRise}
              onChange={(v) => updateStairs({ totalRise: v })}
              hint="Required — finished floor to finished floor."
              help={INPUT_HELP}
            />
            <FractionalInput
              label="Total Run"
              optional
              valueInches={stairs.totalRun}
              onChange={(v) => updateStairs({ totalRun: v })}
              hint={
                runLocked
                  ? 'Locking the geometry — tread depth is set from this.'
                  : 'Optional — leave blank to size the run from targets.'
              }
            />
            <SliderField
              label="Target Riser Height"
              value={stairs.targetRiser}
              min={5}
              max={8.25}
              onChange={(v) => updateStairs({ targetRiser: v })}
              display={(v) => formatInches(v)}
              hint="Guideline — sets how many risers the rise is divided into."
            />
            <SliderField
              label="Target Tread Depth"
              value={stairs.targetTread}
              min={8}
              max={14}
              disabled={runLocked}
              onChange={(v) => updateStairs({ targetTread: v })}
              display={(v) => formatInches(v)}
              hint={
                runLocked
                  ? 'Overridden — tread depth is locked by Total Run.'
                  : 'Guideline — used when no Total Run is given.'
              }
            />
            <SliderField
              label="Tread Thickness"
              value={stairs.treadThickness}
              min={0.5}
              max={2}
              onChange={(v) => updateStairs({ treadThickness: v })}
              display={(v) => formatInches(v)}
              hint="Finished tread stock — dropped from the bottom stringer cut."
            />
          </section>

          <Button variant="ghost" fullWidth onClick={resetStairs}>
            Reset to defaults
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="mt-5 space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        <SummaryCard title="Cut List">
          <SummaryRow
            label="Number of risers"
            value={result.valid ? result.numRisers : '—'}
            big
            tone="brand"
          />
          <SummaryRow
            label="Actual riser height"
            value={result.valid ? formatInches(result.riserHeight) : '—'}
            hint={result.valid ? `${result.riserHeight.toFixed(3)}" decimal` : undefined}
          />
          <SummaryRow
            label="Bottom riser cut"
            value={result.valid ? formatInches(result.bottomRiserCut) : '—'}
            hint="Riser height − tread thickness (stringer drop)"
            tone="brand"
          />
          <SummaryRow
            label="Number of treads"
            value={result.valid ? result.numTreads : '—'}
            big
            tone="brand"
          />
          <SummaryRow
            label="Actual tread depth"
            value={result.valid ? formatInches(result.treadDepth) : '—'}
            hint={
              result.valid
                ? runLocked
                  ? 'Total run ÷ treads'
                  : `${result.treadDepth.toFixed(3)}" decimal`
                : undefined
            }
          />
          <SummaryRow
            label="Total run"
            value={result.valid ? formatFeetInches(result.totalRun) : '—'}
          />
          <SummaryRow
            label="Stringer length"
            value={result.valid ? formatFeetInches(result.stringerLength) : '—'}
            hint="Per stringer — measured along the slope"
          />
          <SummaryRow
            label="Stair angle"
            value={result.valid ? `${result.angle.toFixed(1)}°` : '—'}
          />
        </SummaryCard>

        <SummaryCard title={checkTitle}>
          {result.valid ? (
            result.checks.map((c) => (
              <CheckRow
                key={c.label}
                label={c.label}
                detail={c.detail}
                pass={c.pass}
              />
            ))
          ) : (
            <div className="px-4 py-6 text-center text-sm text-ink-faint">
              Enter a total rise to run code checks.
            </div>
          )}
        </SummaryCard>
      </div>

      {/* Monetization surface */}
      <div className="mt-4">
        <ActionCard items={STAIR_TOOLS} />
      </div>

      <p className="mt-4 px-1 text-xs text-ink-faint">
        Code checks reference IRC R311.7 residential limits. Always confirm
        against your local building code before cutting.
      </p>
    </div>
  );
}

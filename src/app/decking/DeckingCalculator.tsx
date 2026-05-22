'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { formatCurrency } from '@/lib/concrete';
import { calculateDecking } from '@/lib/decking';
import type { LengthUnit } from '@/lib/imperial';
import { trackCalculate, trackFirstModule } from '@/lib/analytics';
import { amazon } from '@/lib/affiliate';
import { useCalculatorStore } from '@/store/useCalculatorStore';
import { ActionCard } from '@/components/ActionCard';
import { DeckingDiagram } from '@/components/DeckingDiagram';
import { StarterHint } from '@/components/StarterHint';
import { DrillIcon, ScrewIcon, SquareIcon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { NumberField } from '@/components/ui/NumberField';
import { Segmented } from '@/components/ui/Segmented';
import { SliderField } from '@/components/ui/SliderField';
import { SummaryCard, SummaryRow } from '@/components/ui/SummaryCard';
import { UnitField } from '@/components/ui/UnitField';

// Sticky offset: pin flush below the 56px header (+ device safe-area inset).
const STICKY_TOP = 'calc(56px + var(--safe-top))';

const PLAN_UNITS: LengthUnit[] = ['ft', 'in', 'yd'];

const BOARD_WIDTHS = [
  { label: '5-1/2"', value: 5.5 },
  { label: '3-1/2"', value: 3.5 },
];
const BOARD_GAPS = [
  { label: '1/8"', value: 0.125 },
  { label: '3/16"', value: 0.1875 },
  { label: '1/4"', value: 0.25 },
];
const BOARD_LENGTHS = [
  { label: "8'", value: 96 },
  { label: "10'", value: 120 },
  { label: "12'", value: 144 },
  { label: "16'", value: 192 },
  { label: "20'", value: 240 },
];
const JOIST_SPACINGS = [
  { label: '12" OC', value: 12 },
  { label: '16" OC', value: 16 },
  { label: '24" OC', value: 24 },
];

// Swap a product by changing the amazon() argument (ASIN or search), or
// drop in an industry-partner URL directly.
const DECKING_TOOLS = [
  {
    name: 'Cordless Drill',
    detail: 'Drive the boards',
    url: amazon('cordless drill driver'),
    icon: <DrillIcon className="h-6 w-6" />,
  },
  {
    name: 'Deck Screws',
    detail: 'Coated, exterior',
    url: amazon('exterior deck screws'),
    icon: <ScrewIcon className="h-6 w-6" />,
  },
  {
    name: 'Speed Square',
    detail: 'Mark square cuts',
    url: amazon('speed square'),
    icon: <SquareIcon className="h-6 w-6" />,
  },
];

export function DeckingCalculator() {
  const decking = useCalculatorStore((s) => s.decking);
  const setDecking = useCalculatorStore((s) => s.setDecking);
  const resetDecking = useCalculatorStore((s) => s.resetDecking);

  // Display units are a view concern — kept local; values persist as inches.
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>('ft');
  const [widthUnit, setWidthUnit] = useState<LengthUnit>('ft');

  // Analytics — first module of the session, and a one-time "Calculate" event.
  useEffect(() => trackFirstModule('Decking'), []);
  const calcFired = useRef(false);
  const [touched, setTouched] = useState(false);
  const updateDecking = (patch: Parameters<typeof setDecking>[0]) => {
    setDecking(patch);
    setTouched(true);
    if (!calcFired.current) {
      calcFired.current = true;
      trackCalculate('Decking');
    }
  };
  const updateSection = (
    i: number,
    patch: Partial<{ length: number; width: number }>,
  ) => {
    const sections = decking.sections.map((s, idx) =>
      idx === i ? { ...s, ...patch } : s,
    );
    updateDecking({ sections });
  };
  const addSection = () => {
    if (decking.sections.length >= 6) return;
    updateDecking({
      sections: [...decking.sections, { length: 144, width: 144 }],
    });
  };
  const removeSection = (i: number) => {
    if (decking.sections.length <= 1) return;
    updateDecking({
      sections: decking.sections.filter((_, idx) => idx !== i),
    });
  };

  const result = useMemo(() => calculateDecking(decking), [decking]);

  return (
    <div>
      <header>
        <h1 className="text-xl font-extrabold tracking-tight">
          Decking Calculator
        </h1>
        <p className="text-sm text-ink-dim">
          Deck boards, joists and screws for any rectangular deck.
        </p>
      </header>

      <div className="mt-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
        {/* Visual — sticky near the top so it updates while you edit below. */}
        <div
          className="mb-4 lg:mb-0 lg:sticky lg:z-10 lg:bg-surface-0 lg:order-2"
          style={{ top: STICKY_TOP }}
        >
          <DeckingDiagram sections={decking.sections} result={result} />
        </div>

        {/* Inputs */}
        <div className="space-y-4 lg:order-1">
          {!touched && <StarterHint />}
          <section className="card space-y-3 p-4">
            <p className="text-xs leading-relaxed text-ink-dim">
              <span className="font-bold text-ink">Length</span> runs the way
              the boards lay; joists run across the{' '}
              <span className="font-bold text-ink">width</span>. For an
              L-shape or any compound deck, add another section.
            </p>
            {decking.sections.map((s, i) => (
              <div
                key={i}
                className="space-y-4 rounded-2xl bg-surface-2 p-3.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
                    Section {i + 1}
                  </span>
                  {decking.sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(i)}
                      className="tap text-xs font-semibold text-ink-dim active:text-bad"
                      aria-label={`Remove section ${i + 1}`}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <UnitField
                  label="Length"
                  valueInches={s.length}
                  unit={lengthUnit}
                  units={PLAN_UNITS}
                  onValueChange={(v) => updateSection(i, { length: v })}
                  onUnitChange={setLengthUnit}
                />
                <UnitField
                  label="Width"
                  valueInches={s.width}
                  unit={widthUnit}
                  units={PLAN_UNITS}
                  onValueChange={(v) => updateSection(i, { width: v })}
                  onUnitChange={setWidthUnit}
                />
              </div>
            ))}
            {decking.sections.length < 6 && (
              <Button variant="ghost" fullWidth onClick={addSection}>
                + Add Section
              </Button>
            )}
          </section>

          <section className="card space-y-5 p-4">
            <Segmented
              label="Board Width"
              options={BOARD_WIDTHS}
              value={decking.boardWidth}
              onChange={(v) => updateDecking({ boardWidth: v })}
            />
            <Segmented
              label="Board Gap"
              options={BOARD_GAPS}
              value={decking.boardGap}
              onChange={(v) => updateDecking({ boardGap: v })}
            />
            <Segmented
              label="Board Length"
              options={BOARD_LENGTHS}
              value={decking.boardLength}
              onChange={(v) => updateDecking({ boardLength: v })}
            />
            <Segmented
              label="Joist Spacing"
              options={JOIST_SPACINGS}
              value={decking.joistSpacing}
              onChange={(v) => updateDecking({ joistSpacing: v })}
            />
            <SliderField
              label="Waste Factor"
              value={decking.wastePct}
              min={0}
              max={25}
              step={1}
              onChange={(v) => updateDecking({ wastePct: Math.round(v) })}
              display={(v) => `${v}%`}
              hint="Extra for cuts, offcuts and the odd warped board — 10% is typical."
            />
          </section>

          <section className="card p-4">
            <NumberField
              label="Price per Board"
              prefix="$"
              placeholder="—"
              value={decking.pricePerBoard}
              onChange={(v) => updateDecking({ pricePerBoard: v })}
              hint="Optional — price of one full-length deck board."
            />
          </section>

          <Button variant="ghost" fullWidth onClick={resetDecking}>
            Reset to defaults
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="mt-5 space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        <SummaryCard title="Estimate">
          <SummaryRow
            label="Deck boards"
            big
            tone="brand"
            value={result.valid ? result.boardsNeeded : '—'}
            hint={
              result.valid
                ? `${decking.boardLength / 12} ft boards · ${decking.wastePct}% waste included`
                : undefined
            }
          />
          <SummaryRow
            label="Board rows"
            value={result.valid ? result.boardRows : '—'}
            hint="Rows of decking across the width"
          />
          <SummaryRow
            label="Decking length"
            value={result.valid ? `${result.deckingLinearFt.toFixed(0)} ft` : '—'}
            hint="Total linear feet, waste included"
          />
          <SummaryRow
            label="Joists"
            big
            tone="brand"
            value={result.valid ? result.joistCount : '—'}
            hint={result.valid ? `${decking.joistSpacing}" on-center` : undefined}
          />
          <SummaryRow
            label="Joist material"
            value={result.valid ? `${result.joistLinearFt.toFixed(0)} ft` : '—'}
            hint="Total linear feet of joist stock"
          />
          <SummaryRow
            label="Deck screws"
            value={result.valid ? `≈ ${result.screws.toLocaleString()}` : '—'}
            hint="About 3.5 screws per square foot"
          />
          <SummaryRow
            label="Deck area"
            value={result.valid ? `${result.deckAreaSqFt.toFixed(0)} ft²` : '—'}
          />
        </SummaryCard>

        <SummaryCard title="Live Material Cost">
          {result.valid && result.cost != null ? (
            <SummaryRow
              label="Decking (by board)"
              big
              tone="good"
              value={formatCurrency(result.cost)}
              hint={`${result.boardsNeeded} boards ordered`}
            />
          ) : (
            <div className="px-4 py-6 text-center text-sm text-ink-faint">
              Add a price per board to see a live cost estimate.
            </div>
          )}
        </SummaryCard>
      </div>

      {/* Monetization surface */}
      <div className="mt-4">
        <ActionCard module="Decking" items={DECKING_TOOLS} />
      </div>

      <p className="mt-4 px-1 text-xs text-ink-faint">
        Covers decking boards, joists and screws. Beams, posts and footings
        depend on your span and local code — confirm those separately.
      </p>
    </div>
  );
}

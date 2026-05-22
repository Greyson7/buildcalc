'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { formatCurrency } from '@/lib/concrete';
import { calculateDrywall } from '@/lib/drywall';
import type { LengthUnit } from '@/lib/imperial';
import { trackCalculate, trackFirstModule } from '@/lib/analytics';
import { amazon } from '@/lib/affiliate';
import { useCalculatorStore } from '@/store/useCalculatorStore';
import { ActionCard } from '@/components/ActionCard';
import { DrywallDiagram } from '@/components/DrywallDiagram';
import { StarterHint } from '@/components/StarterHint';
import { DrillIcon, KnifeIcon, SquareIcon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { NumberField } from '@/components/ui/NumberField';
import { Segmented } from '@/components/ui/Segmented';
import { SliderField } from '@/components/ui/SliderField';
import { SummaryCard, SummaryRow } from '@/components/ui/SummaryCard';
import { UnitField } from '@/components/ui/UnitField';

// Sticky offset: pin flush below the 56px header (+ device safe-area inset).
const STICKY_TOP = 'calc(56px + var(--safe-top))';

const PLAN_UNITS: LengthUnit[] = ['ft', 'in'];

const SURFACES = [
  { label: 'Walls only', value: 'walls' },
  { label: 'Walls + ceiling', value: 'both' },
];
const SHEET_SIZES = [
  { label: '4×8', value: 32 },
  { label: '4×10', value: 40 },
  { label: '4×12', value: 48 },
];

/** Map a sheet's square footage to its nominal panel size label. */
function sheetLabelFor(sheetSqFt: number): string {
  if (sheetSqFt === 40) return '4×10';
  if (sheetSqFt === 48) return '4×12';
  return '4×8';
}

// Swap a product by changing the amazon() argument (ASIN or search), or
// drop in an industry-partner URL directly.
const DRYWALL_TOOLS = [
  {
    name: 'Drywall T-Square',
    detail: 'Score full sheets',
    url: amazon('drywall t-square'),
    icon: <SquareIcon className="h-6 w-6" />,
  },
  {
    name: 'Screw Gun',
    detail: 'Set screws to depth',
    url: amazon('drywall screw gun'),
    icon: <DrillIcon className="h-6 w-6" />,
  },
  {
    name: 'Taping Knife',
    detail: 'Mud the joints',
    url: amazon('drywall taping knife'),
    icon: <KnifeIcon className="h-6 w-6" />,
  },
];

export function DrywallCalculator() {
  const drywall = useCalculatorStore((s) => s.drywall);
  const setDrywall = useCalculatorStore((s) => s.setDrywall);
  const resetDrywall = useCalculatorStore((s) => s.resetDrywall);

  // Display units are a view concern — kept local; values persist as inches.
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>('ft');
  const [widthUnit, setWidthUnit] = useState<LengthUnit>('ft');
  const [heightUnit, setHeightUnit] = useState<LengthUnit>('ft');

  // Analytics — first module of the session, and a one-time "Calculate" event.
  useEffect(() => trackFirstModule('Drywall'), []);
  const calcFired = useRef(false);
  const [touched, setTouched] = useState(false);
  const updateDrywall = (patch: Parameters<typeof setDrywall>[0]) => {
    setDrywall(patch);
    setTouched(true);
    if (!calcFired.current) {
      calcFired.current = true;
      trackCalculate('Drywall');
    }
  };

  const result = useMemo(() => calculateDrywall(drywall), [drywall]);

  const sheetLabel = sheetLabelFor(drywall.sheetSqFt);

  return (
    <div>
      <header>
        <h1 className="text-xl font-extrabold tracking-tight">
          Drywall Calculator
        </h1>
        <p className="text-sm text-ink-dim">
          Sheets and screws for walls and ceilings.
        </p>
      </header>

      <div className="mt-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
        {/* Visual — sticky near the top so it updates while you edit below. */}
        <div
          className="sticky z-10 bg-surface-0 pb-4 pt-2 lg:order-2 lg:pb-0 lg:pt-0"
          style={{ top: STICKY_TOP }}
        >
          <DrywallDiagram result={result} />
        </div>

        {/* Inputs */}
        <div className="space-y-4 lg:order-1">
          {!touched && <StarterHint />}
          <section className="card space-y-5 p-4">
            <p className="text-xs leading-relaxed text-ink-dim">
              Enter the{' '}
              <span className="font-bold text-ink">room length and width</span>{' '}
              along the floor, then the ceiling height — drywall wraps all four
              walls, plus the ceiling if you include it.
            </p>
            <UnitField
              label="Room Length"
              valueInches={drywall.length}
              unit={lengthUnit}
              units={PLAN_UNITS}
              onValueChange={(v) => updateDrywall({ length: v })}
              onUnitChange={setLengthUnit}
            />
            <UnitField
              label="Room Width"
              valueInches={drywall.width}
              unit={widthUnit}
              units={PLAN_UNITS}
              onValueChange={(v) => updateDrywall({ width: v })}
              onUnitChange={setWidthUnit}
            />
            <UnitField
              label="Ceiling Height"
              valueInches={drywall.height}
              unit={heightUnit}
              units={PLAN_UNITS}
              onValueChange={(v) => updateDrywall({ height: v })}
              onUnitChange={setHeightUnit}
            />
          </section>

          <section className="card space-y-5 p-4">
            <Segmented
              label="Surfaces"
              options={SURFACES}
              value={drywall.includeCeiling ? 'both' : 'walls'}
              onChange={(v) =>
                updateDrywall({ includeCeiling: v === 'both' })
              }
            />
            <Segmented
              label="Sheet Size"
              options={SHEET_SIZES}
              value={drywall.sheetSqFt}
              onChange={(v) => updateDrywall({ sheetSqFt: v })}
            />
            <SliderField
              label="Waste Factor"
              value={drywall.wastePct}
              min={0}
              max={25}
              step={1}
              onChange={(v) => updateDrywall({ wastePct: Math.round(v) })}
              display={(v) => `${v}%`}
              hint="Extra for cuts, offcuts and the odd damaged sheet — 10% is typical."
            />
          </section>

          <section className="card p-4">
            <NumberField
              label="Price per Sheet"
              prefix="$"
              placeholder="—"
              value={drywall.pricePerSheet}
              onChange={(v) => updateDrywall({ pricePerSheet: v })}
              hint="Optional — price of one full drywall sheet."
            />
          </section>

          <Button variant="ghost" fullWidth onClick={resetDrywall}>
            Reset to defaults
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="mt-5 space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        <SummaryCard title="Estimate">
          <SummaryRow
            label="Drywall sheets"
            big
            tone="brand"
            value={result.valid ? result.sheets : '—'}
            hint={
              result.valid
                ? `${sheetLabel} · incl. ${drywall.wastePct}% waste`
                : undefined
            }
          />
          <SummaryRow
            label="Drywall screws"
            big
            tone="brand"
            value={result.valid ? result.screws : '—'}
            hint="32 screws per sheet"
          />
          <SummaryRow
            label="Wall area"
            value={result.valid ? `${result.wallAreaSqFt.toFixed(0)} ft²` : '—'}
          />
          <SummaryRow
            label="Ceiling area"
            value={
              result.valid ? `${result.ceilingAreaSqFt.toFixed(0)} ft²` : '—'
            }
          />
          <SummaryRow
            label="Total area"
            value={
              result.valid ? `${result.totalAreaSqFt.toFixed(0)} ft²` : '—'
            }
          />
        </SummaryCard>

        <SummaryCard title="Live Material Cost">
          {result.valid && result.cost != null ? (
            <SummaryRow
              label="Drywall (by sheet)"
              big
              tone="good"
              value={formatCurrency(result.cost)}
              hint={`${result.sheets} sheets ordered`}
            />
          ) : (
            <div className="px-4 py-6 text-center text-sm text-ink-faint">
              Add a price per sheet to see a live cost estimate.
            </div>
          )}
        </SummaryCard>
      </div>

      {/* Monetization surface */}
      <div className="mt-4">
        <ActionCard module="Drywall" items={DRYWALL_TOOLS} />
      </div>

      <p className="mt-4 px-1 text-xs text-ink-faint">
        Covers drywall sheets and screws. Joint compound and tape depend on
        your finish level — estimate those separately.
      </p>
    </div>
  );
}

'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { formatCurrency } from '@/lib/concrete';
import type { LengthUnit } from '@/lib/imperial';
import { calculateRoofing } from '@/lib/roofing';
import { trackCalculate, trackFirstModule } from '@/lib/analytics';
import { amazon } from '@/lib/affiliate';
import { useCalculatorStore } from '@/store/useCalculatorStore';
import { ActionCard } from '@/components/ActionCard';
import { RoofingDiagram } from '@/components/RoofingDiagram';
import { StarterHint } from '@/components/StarterHint';
import { ChalkLineIcon, HammerIcon, KnifeIcon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { NumberField } from '@/components/ui/NumberField';
import { SliderField } from '@/components/ui/SliderField';
import { Stepper } from '@/components/ui/Stepper';
import { SummaryCard, SummaryRow } from '@/components/ui/SummaryCard';
import { UnitField } from '@/components/ui/UnitField';

// Sticky offset: pin flush below the 56px header (+ device safe-area inset).
const STICKY_TOP = 'calc(56px + var(--safe-top))';

const PLAN_UNITS: LengthUnit[] = ['ft', 'in', 'yd'];

// Swap a product by changing the amazon() argument (ASIN or search), or
// drop in an industry-partner URL directly.
const ROOFING_TOOLS = [
  {
    name: 'Roofing Nailer',
    detail: 'Drive the shingles',
    url: amazon('roofing nailer'),
    icon: <HammerIcon className="h-6 w-6" />,
  },
  {
    name: 'Utility Knife',
    detail: 'Hook-blade cuts',
    url: amazon('roofing hook blade utility knife'),
    icon: <KnifeIcon className="h-6 w-6" />,
  },
  {
    name: 'Chalk Line',
    detail: 'Snap your courses',
    url: amazon('chalk line reel'),
    icon: <ChalkLineIcon className="h-6 w-6" />,
  },
];

export function RoofingCalculator() {
  const roofing = useCalculatorStore((s) => s.roofing);
  const setRoofing = useCalculatorStore((s) => s.setRoofing);
  const resetRoofing = useCalculatorStore((s) => s.resetRoofing);

  // Display units are a view concern — kept local; values persist as inches.
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>('ft');
  const [widthUnit, setWidthUnit] = useState<LengthUnit>('ft');

  // Analytics — first module of the session, and a one-time "Calculate" event.
  useEffect(() => trackFirstModule('Roofing'), []);
  const calcFired = useRef(false);
  const [touched, setTouched] = useState(false);
  const updateRoofing = (patch: Parameters<typeof setRoofing>[0]) => {
    setRoofing(patch);
    setTouched(true);
    if (!calcFired.current) {
      calcFired.current = true;
      trackCalculate('Roofing');
    }
  };

  const result = useMemo(() => calculateRoofing(roofing), [roofing]);

  return (
    <div>
      <header>
        <h1 className="text-xl font-extrabold tracking-tight">
          Roofing Calculator
        </h1>
        <p className="text-sm text-ink-dim">
          Roof area, shingle squares and bundles from a footprint and pitch.
        </p>
      </header>

      <div className="mt-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
        {/* Visual — sticky near the top so it updates while you edit below. */}
        <div
          className="mb-4 lg:mb-0 lg:sticky lg:z-10 lg:bg-surface-0 lg:order-2"
          style={{ top: STICKY_TOP }}
        >
          <RoofingDiagram pitch={roofing.pitch} result={result} />
        </div>

        {/* Inputs */}
        <div className="space-y-4 lg:order-1">
          {!touched && <StarterHint />}
          <section className="card space-y-5 p-4">
            <p className="text-xs leading-relaxed text-ink-dim">
              Enter the{' '}
              <span className="font-bold text-ink">footprint the roof covers</span>{' '}
              — the building length and width, including eave overhangs — then
              set the pitch.
            </p>
            <UnitField
              label="Footprint Length"
              valueInches={roofing.length}
              unit={lengthUnit}
              units={PLAN_UNITS}
              onValueChange={(v) => updateRoofing({ length: v })}
              onUnitChange={setLengthUnit}
            />
            <UnitField
              label="Footprint Width"
              valueInches={roofing.width}
              unit={widthUnit}
              units={PLAN_UNITS}
              onValueChange={(v) => updateRoofing({ width: v })}
              onUnitChange={setWidthUnit}
            />
            <Stepper
              label="Roof Pitch"
              value={roofing.pitch}
              min={0}
              max={18}
              onChange={(v) => updateRoofing({ pitch: v })}
              suffix="/ 12"
            />
            <SliderField
              label="Waste Factor"
              value={roofing.wastePct}
              min={0}
              max={25}
              step={1}
              onChange={(v) => updateRoofing({ wastePct: Math.round(v) })}
              display={(v) => `${v}%`}
              hint="Extra for starter course, ridge cap and hip/valley cuts — 10–15% is typical."
            />
          </section>

          <section className="card p-4">
            <NumberField
              label="Price per Square"
              prefix="$"
              placeholder="—"
              value={roofing.pricePerSquare}
              onChange={(v) => updateRoofing({ pricePerSquare: v })}
              hint="Optional — material or installed cost per roofing square."
            />
          </section>

          <Button variant="ghost" fullWidth onClick={resetRoofing}>
            Reset to defaults
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="mt-5 space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        <SummaryCard title="Estimate">
          <SummaryRow
            label="Roofing squares"
            big
            tone="brand"
            value={result.valid ? result.squares.toFixed(1) : '—'}
            hint={
              result.valid
                ? `${result.roofAreaSqFt.toFixed(0)} ft² of roof surface`
                : undefined
            }
          />
          <SummaryRow
            label="Shingle bundles"
            big
            tone="brand"
            value={result.valid ? result.bundles : '—'}
            hint={
              result.valid
                ? `3 bundles per square · ${roofing.wastePct}% waste included`
                : undefined
            }
          />
          <SummaryRow
            label="Underlayment rolls"
            value={result.valid ? result.underlaymentRolls : '—'}
            hint="Synthetic — about 10 squares per roll"
          />
          <SummaryRow
            label="Roof area"
            value={result.valid ? `${result.roofAreaSqFt.toFixed(0)} ft²` : '—'}
            hint={
              result.valid
                ? `${result.roofAreaNetSqFt.toFixed(0)} ft² before ${roofing.wastePct}% waste`
                : undefined
            }
          />
          <SummaryRow
            label="Slope"
            value={result.valid ? `${result.pitchAngle.toFixed(1)}°` : '—'}
            hint={
              result.valid
                ? `${roofing.pitch}/12 pitch · ${result.pitchMultiplier.toFixed(3)}× area`
                : undefined
            }
          />
        </SummaryCard>

        <SummaryCard title="Live Material Cost">
          {result.valid && result.cost != null ? (
            <SummaryRow
              label="Shingles (by square)"
              big
              tone="good"
              value={formatCurrency(result.cost)}
              hint={`${result.squares.toFixed(1)} squares ordered`}
            />
          ) : (
            <div className="px-4 py-6 text-center text-sm text-ink-faint">
              Add a price per square to see a live cost estimate.
            </div>
          )}
        </SummaryCard>
      </div>

      {/* Monetization surface */}
      <div className="mt-4">
        <ActionCard module="Roofing" items={ROOFING_TOOLS} />
      </div>

      <p className="mt-4 px-1 text-xs text-ink-faint">
        Estimates assume every roof plane shares one pitch. Order one extra
        bundle, and confirm against a supplier take-off before buying.
      </p>
    </div>
  );
}

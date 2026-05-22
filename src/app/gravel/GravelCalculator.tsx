'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { formatCurrency } from '@/lib/concrete';
import { calculateGravel } from '@/lib/gravel';
import type { LengthUnit } from '@/lib/imperial';
import { trackCalculate, trackFirstModule } from '@/lib/analytics';
import { amazon } from '@/lib/affiliate';
import { useCalculatorStore } from '@/store/useCalculatorStore';
import { ActionCard } from '@/components/ActionCard';
import { GravelDiagram } from '@/components/GravelDiagram';
import { StarterHint } from '@/components/StarterHint';
import { BucketIcon, HammerIcon, TrowelIcon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { NumberField } from '@/components/ui/NumberField';
import { SliderField } from '@/components/ui/SliderField';
import { SummaryCard, SummaryRow } from '@/components/ui/SummaryCard';
import { UnitField } from '@/components/ui/UnitField';

// Sticky offset: pin flush below the 56px header (+ device safe-area inset).
const STICKY_TOP = 'calc(56px + var(--safe-top))';

const PLAN_UNITS: LengthUnit[] = ['ft', 'in', 'yd'];
const DEPTH_UNITS: LengthUnit[] = ['in', 'ft'];

// Swap a product by changing the amazon() argument (ASIN or search), or
// drop in an industry-partner URL directly.
const GRAVEL_TOOLS = [
  {
    name: 'Wheelbarrow',
    detail: 'Haul the load',
    url: amazon('wheelbarrow'),
    icon: <BucketIcon className="h-6 w-6" />,
  },
  {
    name: 'Garden Shovel',
    detail: 'Move material',
    url: amazon('round point shovel'),
    icon: <TrowelIcon className="h-6 w-6" />,
  },
  {
    name: 'Hand Tamper',
    detail: 'Compact the base',
    url: amazon('hand tamper'),
    icon: <HammerIcon className="h-6 w-6" />,
  },
];

export function GravelCalculator() {
  const gravel = useCalculatorStore((s) => s.gravel);
  const setGravel = useCalculatorStore((s) => s.setGravel);
  const resetGravel = useCalculatorStore((s) => s.resetGravel);

  // Display units are a view concern — kept local; values persist as inches.
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>('ft');
  const [widthUnit, setWidthUnit] = useState<LengthUnit>('ft');
  const [depthUnit, setDepthUnit] = useState<LengthUnit>('in');

  // Analytics — first module of the session, and a one-time "Calculate" event.
  useEffect(() => trackFirstModule('Gravel'), []);
  const calcFired = useRef(false);
  const [touched, setTouched] = useState(false);
  const updateGravel = (patch: Parameters<typeof setGravel>[0]) => {
    setGravel(patch);
    setTouched(true);
    if (!calcFired.current) {
      calcFired.current = true;
      trackCalculate('Gravel');
    }
  };

  const result = useMemo(() => calculateGravel(gravel), [gravel]);

  return (
    <div>
      <header>
        <h1 className="text-xl font-extrabold tracking-tight">
          Gravel Calculator
        </h1>
        <p className="text-sm text-ink-dim">
          Cubic yards, tons and cost for gravel, stone or sand.
        </p>
      </header>

      <div className="mt-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
        {/* Visual — sticky near the top so it updates while you edit below. */}
        <div
          className="mb-4 lg:mb-0 lg:sticky lg:z-10 lg:bg-surface-0 lg:order-2"
          style={{ top: STICKY_TOP }}
        >
          <GravelDiagram
            lengthIn={gravel.length}
            widthIn={gravel.width}
            depthIn={gravel.depth}
            result={result}
          />
        </div>

        {/* Inputs */}
        <div className="space-y-4 lg:order-1">
          {!touched && <StarterHint />}
          <section className="card space-y-5 p-4">
            <UnitField
              label="Length"
              valueInches={gravel.length}
              unit={lengthUnit}
              units={PLAN_UNITS}
              onValueChange={(v) => updateGravel({ length: v })}
              onUnitChange={setLengthUnit}
            />
            <UnitField
              label="Width"
              valueInches={gravel.width}
              unit={widthUnit}
              units={PLAN_UNITS}
              onValueChange={(v) => updateGravel({ width: v })}
              onUnitChange={setWidthUnit}
            />
            <UnitField
              label="Depth"
              valueInches={gravel.depth}
              unit={depthUnit}
              units={DEPTH_UNITS}
              onValueChange={(v) => updateGravel({ depth: v })}
              onUnitChange={setDepthUnit}
            />
            <SliderField
              label="Waste Factor"
              value={gravel.wastePct}
              min={0}
              max={25}
              step={1}
              onChange={(v) => updateGravel({ wastePct: Math.round(v) })}
              display={(v) => `${v}%`}
              hint="Order a little extra for spreading and compaction — about 10% is typical."
            />
          </section>

          <section className="card p-4">
            <NumberField
              label="Price per Ton"
              prefix="$"
              placeholder="—"
              value={gravel.pricePerTon}
              onChange={(v) => updateGravel({ pricePerTon: v })}
              hint="Optional — delivered or pickup cost per ton of material."
            />
          </section>

          <Button variant="ghost" fullWidth onClick={resetGravel}>
            Reset to defaults
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="mt-5 space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        <SummaryCard title="Estimate">
          <SummaryRow
            label="Gravel needed"
            big
            tone="brand"
            value={result.valid ? `${result.tons.toFixed(2)} tons` : '—'}
            hint={
              result.valid
                ? `${result.cubicYards.toFixed(2)} yd³ incl. ${gravel.wastePct}% waste`
                : undefined
            }
          />
          <SummaryRow
            label="Cubic yards"
            big
            tone="brand"
            value={result.valid ? `${result.cubicYards.toFixed(2)} yd³` : '—'}
            hint={
              result.valid
                ? `${result.cubicYardsNet.toFixed(2)} yd³ before waste`
                : undefined
            }
          />
          <SummaryRow
            label="Volume"
            value={result.valid ? `${result.cubicFeet.toFixed(1)} ft³` : '—'}
          />
        </SummaryCard>

        <SummaryCard title="Live Material Cost">
          {result.valid && result.cost != null ? (
            <SummaryRow
              label="Gravel (by ton)"
              big
              tone="good"
              value={formatCurrency(result.cost)}
              hint={`${result.tons.toFixed(2)} tons ordered`}
            />
          ) : (
            <div className="px-4 py-6 text-center text-sm text-ink-faint">
              Add a price per ton to see a live cost estimate.
            </div>
          )}
        </SummaryCard>
      </div>

      {/* Monetization surface */}
      <div className="mt-4">
        <ActionCard module="Gravel" items={GRAVEL_TOOLS} />
      </div>

      <p className="mt-4 px-1 text-xs text-ink-faint">
        Gravel weight varies by material and moisture; about 1.4 tons per cubic
        yard is a typical average — confirm with your supplier.
      </p>
    </div>
  );
}

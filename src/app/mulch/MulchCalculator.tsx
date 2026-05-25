'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { formatCurrency } from '@/lib/concrete';
import { calculateMulch } from '@/lib/mulch';
import { trackCalculate, trackFirstModule } from '@/lib/analytics';
import { amazon } from '@/lib/affiliate';
import { useCalculatorStore } from '@/store/useCalculatorStore';
import { ActionCard } from '@/components/ActionCard';
import { MulchDiagram } from '@/components/MulchDiagram';
import { StarterHint } from '@/components/StarterHint';
import { ChalkLineIcon, RakeIcon, TrowelIcon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { FractionalInput } from '@/components/ui/FractionalInput';
import { NumberField } from '@/components/ui/NumberField';
import { Segmented } from '@/components/ui/Segmented';
import { SliderField } from '@/components/ui/SliderField';
import { SummaryCard, SummaryRow } from '@/components/ui/SummaryCard';

// Sticky offset: pin flush below the 56px header (+ device safe-area inset).
const STICKY_TOP = 'calc(56px + var(--safe-top))';

const BAG_OPTIONS = [
  { label: '2 cu ft', value: 2 },
  { label: '3 cu ft', value: 3 },
];

// Swap a product by changing the amazon() argument (ASIN or search), or
// drop in an industry-partner URL directly.
const MULCH_TOOLS = [
  {
    name: 'Bow Rake',
    detail: 'Spread the mulch',
    url: amazon('bow rake landscape'),
    icon: <RakeIcon className="h-6 w-6" />,
  },
  {
    name: 'Garden Edger',
    detail: 'Crisp bed lines',
    url: amazon('manual garden edger half moon'),
    icon: <TrowelIcon className="h-6 w-6" />,
  },
  {
    name: 'Landscape Fabric',
    detail: 'Block weeds first',
    url: amazon('landscape fabric weed barrier'),
    icon: <ChalkLineIcon className="h-6 w-6" />,
  },
];

export function MulchCalculator() {
  const mulch = useCalculatorStore((s) => s.mulch);
  const setMulch = useCalculatorStore((s) => s.setMulch);
  const resetMulch = useCalculatorStore((s) => s.resetMulch);

  // Analytics — first module of the session, and a one-time "Calculate" event.
  useEffect(() => trackFirstModule('Mulch'), []);
  const calcFired = useRef(false);
  const [touched, setTouched] = useState(false);
  const updateMulch = (patch: Parameters<typeof setMulch>[0]) => {
    setMulch(patch);
    setTouched(true);
    if (!calcFired.current) {
      calcFired.current = true;
      trackCalculate('Mulch');
    }
  };

  const result = useMemo(() => calculateMulch(mulch), [mulch]);
  const hasPrice = result.costByYard != null || result.costByBag != null;

  return (
    <div>
      <header>
        <h1 className="text-xl font-extrabold tracking-tight">
          Mulch Calculator
        </h1>
        <p className="text-sm text-ink-dim">
          Cubic yards and bags of mulch for any flower bed or landscape area.
        </p>
      </header>

      <div className="mt-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
        {/* Visual — sticky near the top so it updates while you edit below. */}
        <div
          className="mb-4 lg:mb-0 lg:sticky lg:z-10 lg:bg-surface-0 lg:order-2"
          style={{ top: STICKY_TOP }}
        >
          <MulchDiagram
            lengthIn={mulch.length}
            widthIn={mulch.width}
            result={result}
          />
        </div>

        {/* Inputs */}
        <div className="space-y-4 lg:order-1">
          {!touched && <StarterHint />}
          <section className="card space-y-5 p-4">
            <p className="text-xs leading-relaxed text-ink-dim">
              Enter the bed{' '}
              <span className="font-bold text-ink">length and width</span> along
              the ground, then the{' '}
              <span className="font-bold text-ink">depth</span> of mulch — 2 to
              4 inches is typical.
            </p>
            <FractionalInput
              label="Bed Length"
              valueInches={mulch.length}
              onChange={(v) => updateMulch({ length: v })}
            />
            <FractionalInput
              label="Bed Width"
              valueInches={mulch.width}
              onChange={(v) => updateMulch({ width: v })}
            />
            <FractionalInput
              label="Mulch Depth"
              valueInches={mulch.depth}
              onChange={(v) => updateMulch({ depth: v })}
            />
            <SliderField
              label="Waste Factor"
              value={mulch.wastePct}
              min={0}
              max={20}
              step={1}
              onChange={(v) => updateMulch({ wastePct: Math.round(v) })}
              display={(v) => `${v}%`}
              hint="A small allowance for settling and uneven coverage — 5–10% is typical."
            />
          </section>

          <section className="card space-y-5 p-4">
            <Segmented
              label="Bag Size"
              options={BAG_OPTIONS}
              value={mulch.bagSize}
              onChange={(v) => updateMulch({ bagSize: v })}
            />
            <div className="grid grid-cols-2 gap-3">
              <NumberField
                label="Price / yd³"
                prefix="$"
                placeholder="—"
                value={mulch.pricePerYard}
                onChange={(v) => updateMulch({ pricePerYard: v })}
              />
              <NumberField
                label="Price / bag"
                prefix="$"
                placeholder="—"
                value={mulch.pricePerBag}
                onChange={(v) => updateMulch({ pricePerBag: v })}
              />
            </div>
          </section>

          <Button variant="ghost" fullWidth onClick={resetMulch}>
            Reset to defaults
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="mt-5 space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        <SummaryCard title="Estimate">
          <SummaryRow
            label="Mulch needed"
            big
            tone="brand"
            value={result.valid ? `${result.cubicYards.toFixed(2)} yd³` : '—'}
            hint={
              result.valid
                ? `${result.cubicYardsNet.toFixed(2)} yd³ before ${mulch.wastePct}% waste`
                : undefined
            }
          />
          <SummaryRow
            label="Volume"
            value={result.valid ? `${result.cubicFeet.toFixed(1)} ft³` : '—'}
          />
          <SummaryRow
            label={`${result.bagSize} cu ft bags`}
            big
            tone="brand"
            value={result.valid ? result.bags : '—'}
            hint={
              result.valid ? `Waste (${mulch.wastePct}%) folded in` : undefined
            }
          />
        </SummaryCard>

        <SummaryCard title="Live Material Cost">
          {hasPrice ? (
            <>
              {result.costByYard != null && (
                <SummaryRow
                  label="Bulk (by yd³)"
                  big
                  tone="good"
                  value={formatCurrency(result.costByYard)}
                  hint={`${result.cubicYards.toFixed(2)} yd³ ordered`}
                />
              )}
              {result.costByBag != null && (
                <SummaryRow
                  label="Bagged (by bag)"
                  big
                  tone="good"
                  value={formatCurrency(result.costByBag)}
                  hint={`${result.bags} × ${result.bagSize} cu ft bags`}
                />
              )}
            </>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-ink-faint">
              Add a price per yd³ or per bag to see a live cost estimate.
            </div>
          )}
        </SummaryCard>
      </div>

      {/* Monetization surface */}
      <div className="mt-4">
        <ActionCard module="Mulch" items={MULCH_TOOLS} />
      </div>

      <p className="mt-4 px-1 text-xs text-ink-faint">
        Mulch settles after the first rain — 3 inches drops closer to 2-1/2 in
        a week. Order a little extra and freshen up next season.
      </p>
    </div>
  );
}

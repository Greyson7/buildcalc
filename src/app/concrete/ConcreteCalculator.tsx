'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { type BagSize, calculateConcrete, formatCurrency } from '@/lib/concrete';
import { trackCalculate, trackFirstModule } from '@/lib/analytics';
import { amazon } from '@/lib/affiliate';
import { useCalculatorStore } from '@/store/useCalculatorStore';
import { ActionCard } from '@/components/ActionCard';
import { ConcreteDiagram } from '@/components/ConcreteDiagram';
import { StarterHint } from '@/components/StarterHint';
import { WaitlistCTA } from '@/components/WaitlistCTA';
import { BucketIcon, LevelIcon, TrowelIcon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { FractionalInput } from '@/components/ui/FractionalInput';
import { NumberField } from '@/components/ui/NumberField';
import { Segmented } from '@/components/ui/Segmented';
import { Stepper } from '@/components/ui/Stepper';
import { SummaryCard, SummaryRow } from '@/components/ui/SummaryCard';

const STICKY_TOP = 'calc(56px + var(--safe-top))';

const SHAPE_OPTIONS = [
  { label: 'Slab / Footing', value: 'slab' as const },
  { label: 'Round Column', value: 'round' as const },
];
const BAG_OPTIONS = [
  { label: '60 lb', value: 60 as BagSize },
  { label: '80 lb', value: 80 as BagSize },
];
const WASTE_PRESETS = [0, 5, 10, 15];

// Swap a product by changing the amazon() argument (ASIN or search), or
// drop in an industry-partner URL directly.
const CONCRETE_TOOLS = [
  {
    name: 'Bull Float',
    detail: 'Finish the slab',
    url: amazon('bull float concrete'),
    icon: <TrowelIcon className="h-6 w-6" />,
  },
  {
    name: 'Mixing Tub',
    detail: 'Mix the bags',
    url: amazon('concrete mixing tub'),
    icon: <BucketIcon className="h-6 w-6" />,
  },
  {
    name: '4 ft Level',
    detail: 'Screed it flat',
    url: amazon('4 ft level'),
    icon: <LevelIcon className="h-6 w-6" />,
  },
];

export function ConcreteCalculator() {
  const concrete = useCalculatorStore((s) => s.concrete);
  const setConcrete = useCalculatorStore((s) => s.setConcrete);
  const resetConcrete = useCalculatorStore((s) => s.resetConcrete);

  // Analytics — first module of the session, and a one-time "Calculate" event.
  useEffect(() => trackFirstModule('Concrete'), []);
  const calcFired = useRef(false);
  const [touched, setTouched] = useState(false);
  const updateConcrete = (patch: Parameters<typeof setConcrete>[0]) => {
    setConcrete(patch);
    setTouched(true);
    if (!calcFired.current) {
      calcFired.current = true;
      trackCalculate('Concrete');
    }
  };

  const result = useMemo(() => calculateConcrete(concrete), [concrete]);
  const hasPrice = result.costByYard != null || result.costByBag != null;

  return (
    <div>
      <header>
        <h1 className="text-xl font-extrabold tracking-tight">
          Concrete Calculator
        </h1>
        <p className="text-sm text-ink-dim">
          Volume, bag count and live cost for slabs &amp; footings.
        </p>
      </header>

      <div className="mt-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
        {/* Visual — sticky near the top so it updates while you edit below.
            pt-2 keeps an opaque strip above the card so nothing peeks through. */}
        <div
          className="mb-4 lg:mb-0 lg:sticky lg:z-10 lg:bg-surface-0 lg:order-2"
          style={{ top: STICKY_TOP }}
        >
          <ConcreteDiagram
            shape={concrete.shape}
            lengthIn={concrete.length}
            widthIn={concrete.width}
            depthIn={concrete.depth}
            diameterIn={concrete.diameter}
            result={result}
          />
        </div>

        {/* Inputs */}
        <div className="space-y-4 lg:order-1">
          {!touched && <StarterHint />}
          <section className="card space-y-5 p-4">
            <Segmented
              label="Shape"
              options={SHAPE_OPTIONS}
              value={concrete.shape}
              onChange={(v) => {
                // Auto-swap a slab-thickness depth for a footing-height depth
                // when the user toggles to round (and back), so the result
                // stays in a sensible range instead of asking for a 4" column
                // or a four-foot-thick slab.
                const patch: Partial<typeof concrete> = { shape: v };
                if (v === 'round' && concrete.depth < 12) patch.depth = 48;
                if (v === 'slab' && concrete.depth > 12) patch.depth = 4;
                updateConcrete(patch);
              }}
            />
            {concrete.shape === 'slab' ? (
              <>
                <FractionalInput
                  label="Length"
                  valueInches={concrete.length}
                  onChange={(v) => updateConcrete({ length: v })}
                />
                <FractionalInput
                  label="Width"
                  valueInches={concrete.width}
                  onChange={(v) => updateConcrete({ width: v })}
                />
                <FractionalInput
                  label="Depth / Thickness"
                  valueInches={concrete.depth}
                  onChange={(v) => updateConcrete({ depth: v })}
                />
              </>
            ) : (
              <>
                <FractionalInput
                  label="Diameter"
                  valueInches={concrete.diameter}
                  onChange={(v) => updateConcrete({ diameter: v })}
                />
                <FractionalInput
                  label="Column Height"
                  valueInches={concrete.depth}
                  onChange={(v) => updateConcrete({ depth: v })}
                />
              </>
            )}
            <Stepper
              label={
                concrete.shape === 'round'
                  ? 'Identical Footings'
                  : 'Identical Pours'
              }
              value={concrete.count}
              min={1}
              max={99}
              onChange={(v) => updateConcrete({ count: v })}
              suffix={
                concrete.shape === 'round'
                  ? concrete.count === 1
                    ? 'footing'
                    : 'footings'
                  : concrete.count === 1
                    ? 'pour'
                    : 'pours'
              }
            />

            {/* Waste factor — quick presets plus a slider for custom values */}
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <label className="field-label">Waste Factor</label>
                <span className="font-mono text-sm font-bold text-brand-light">
                  {concrete.wastePct}%
                </span>
              </div>
              <div className="mt-1.5 flex gap-1.5">
                {WASTE_PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => updateConcrete({ wastePct: p })}
                    className={`tap flex-1 rounded-xl text-sm font-bold ${
                      concrete.wastePct === p
                        ? 'bg-brand text-surface-0'
                        : 'bg-surface-2 text-ink-dim active:bg-surface-3'
                    }`}
                  >
                    {p}%
                  </button>
                ))}
              </div>
              <input
                type="range"
                className="range mt-1 w-full"
                min={0}
                max={25}
                step={1}
                value={concrete.wastePct}
                onChange={(e) =>
                  updateConcrete({ wastePct: Math.round(Number(e.target.value)) })
                }
                aria-label="Custom waste factor"
              />
              <p className="text-xs text-ink-faint">
                Extra ordered for spillage and uneven subgrade — folded into
                every total below.
              </p>
            </div>
          </section>

          <section className="card space-y-5 p-4">
            <Segmented
              label="Bag Size"
              options={BAG_OPTIONS}
              value={concrete.bagSize}
              onChange={(v) => updateConcrete({ bagSize: v })}
            />
            <div className="grid grid-cols-2 gap-3">
              <NumberField
                label="Price / yd³"
                prefix="$"
                placeholder="—"
                value={concrete.pricePerYard}
                onChange={(v) => updateConcrete({ pricePerYard: v })}
              />
              <NumberField
                label="Price / bag"
                prefix="$"
                placeholder="—"
                value={concrete.pricePerBag}
                onChange={(v) => updateConcrete({ pricePerBag: v })}
              />
            </div>
          </section>

          <Button variant="ghost" fullWidth onClick={resetConcrete}>
            Reset to defaults
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="mt-5 space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        <SummaryCard title="Estimate">
          <SummaryRow
            label="Concrete needed"
            big
            tone="brand"
            value={result.valid ? `${result.cubicYards.toFixed(2)} yd³` : '—'}
            hint={
              result.valid
                ? `${result.cubicYardsNet.toFixed(2)} yd³ before ${concrete.wastePct}% waste`
                : undefined
            }
          />
          <SummaryRow
            label="Volume"
            value={result.valid ? `${result.cubicFeet.toFixed(1)} ft³` : '—'}
          />
          <SummaryRow
            label={`${result.bagSize} lb bags`}
            big
            tone="brand"
            value={result.valid ? result.bags : '—'}
            hint={
              result.valid
                ? `${result.premixWeightLbs.toLocaleString()} lb of dry mix (incl. ${concrete.wastePct}% waste)`
                : undefined
            }
          />
        </SummaryCard>

        <SummaryCard title="Live Material Cost">
          {hasPrice ? (
            <>
              {result.costByYard != null && (
                <SummaryRow
                  label="Ready-mix (by yd³)"
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
                  hint={`${result.bags} × ${result.bagSize} lb bags`}
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
        <ActionCard module="Concrete" items={CONCRETE_TOOLS} />
      </div>

      <div className="mt-4">
        <WaitlistCTA source="concrete" />
      </div>

      <p className="mt-4 px-1 text-xs text-ink-faint">
        Bag yields use manufacturer averages (80 lb ≈ 0.60 ft³, 60 lb ≈ 0.45
        ft³). Order a full bag extra for safety.
      </p>
    </div>
  );
}

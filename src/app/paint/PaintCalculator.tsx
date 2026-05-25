'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { formatCurrency } from '@/lib/concrete';
import { calculatePaint } from '@/lib/paint';
import { trackCalculate, trackFirstModule } from '@/lib/analytics';
import { amazon } from '@/lib/affiliate';
import { useCalculatorStore } from '@/store/useCalculatorStore';
import { ActionCard } from '@/components/ActionCard';
import { PaintDiagram } from '@/components/PaintDiagram';
import { StarterHint } from '@/components/StarterHint';
import { BrushIcon, RollerIcon, TapeIcon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { FractionalInput } from '@/components/ui/FractionalInput';
import { NumberField } from '@/components/ui/NumberField';
import { Segmented } from '@/components/ui/Segmented';
import { Stepper } from '@/components/ui/Stepper';
import { SummaryCard, SummaryRow } from '@/components/ui/SummaryCard';

// Sticky offset: pin flush below the 56px header (+ device safe-area inset).
const STICKY_TOP = 'calc(56px + var(--safe-top))';

// Coverage presets — a gallon of interior paint covers 350–400 sq ft per coat.
const COVERAGE_OPTIONS = [
  { label: '350 ft²', value: 350 },
  { label: '400 ft²', value: 400 },
];

// Swap a product by changing the amazon() argument (ASIN or search), or
// drop in an industry-partner URL directly.
const PAINT_TOOLS = [
  {
    name: 'Paint Roller',
    detail: 'Cover walls fast',
    url: amazon('paint roller kit'),
    icon: <RollerIcon className="h-6 w-6" />,
  },
  {
    name: 'Paint Brush',
    detail: 'Cut in the edges',
    url: amazon('angled sash paint brush'),
    icon: <BrushIcon className="h-6 w-6" />,
  },
  {
    name: "Painter's Tape",
    detail: 'Mask clean lines',
    url: amazon('painters tape'),
    icon: <TapeIcon className="h-6 w-6" />,
  },
];

export function PaintCalculator() {
  const paint = useCalculatorStore((s) => s.paint);
  const setPaint = useCalculatorStore((s) => s.setPaint);
  const resetPaint = useCalculatorStore((s) => s.resetPaint);

  // Analytics — first module of the session, and a one-time "Calculate" event.
  useEffect(() => trackFirstModule('Paint'), []);
  const calcFired = useRef(false);
  const [touched, setTouched] = useState(false);
  const updatePaint = (patch: Parameters<typeof setPaint>[0]) => {
    setPaint(patch);
    setTouched(true);
    if (!calcFired.current) {
      calcFired.current = true;
      trackCalculate('Paint');
    }
  };

  const result = useMemo(() => calculatePaint(paint), [paint]);

  return (
    <div>
      <header>
        <h1 className="text-xl font-extrabold tracking-tight">
          Paint Calculator
        </h1>
        <p className="text-sm text-ink-dim">
          How many gallons to paint a room — doors and windows subtracted.
        </p>
      </header>

      <div className="mt-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
        {/* Visual — sticky near the top so it updates while you edit below. */}
        <div
          className="mb-4 lg:mb-0 lg:sticky lg:z-10 lg:bg-surface-0 lg:order-2"
          style={{ top: STICKY_TOP }}
        >
          <PaintDiagram
            result={result}
            doors={paint.doors}
            windows={paint.windows}
          />
        </div>

        {/* Inputs */}
        <div className="space-y-4 lg:order-1">
          {!touched && <StarterHint />}
          <section className="card space-y-5 p-4">
            <p className="text-xs leading-relaxed text-ink-dim">
              Enter the{' '}
              <span className="font-bold text-ink">room dimensions</span> — the
              length, width and ceiling height — then set the number of coats,
              doors and windows.
            </p>
            <FractionalInput
              label="Room Length"
              valueInches={paint.length}
              onChange={(v) => updatePaint({ length: v })}
            />
            <FractionalInput
              label="Room Width"
              valueInches={paint.width}
              onChange={(v) => updatePaint({ width: v })}
            />
            <FractionalInput
              label="Ceiling Height"
              valueInches={paint.height}
              onChange={(v) => updatePaint({ height: v })}
            />
            <Stepper
              label="Coats"
              value={paint.coats}
              min={1}
              max={5}
              onChange={(v) => updatePaint({ coats: v })}
            />
            <Stepper
              label="Doors"
              value={paint.doors}
              min={0}
              max={20}
              onChange={(v) => updatePaint({ doors: v })}
            />
            <Stepper
              label="Windows"
              value={paint.windows}
              min={0}
              max={20}
              onChange={(v) => updatePaint({ windows: v })}
            />
            <Segmented
              label="Coverage per Gallon"
              options={COVERAGE_OPTIONS}
              value={paint.coverage}
              onChange={(v) => updatePaint({ coverage: v })}
            />
          </section>

          <section className="card p-4">
            <NumberField
              label="Price per Gallon"
              prefix="$"
              placeholder="—"
              value={paint.pricePerGallon}
              onChange={(v) => updatePaint({ pricePerGallon: v })}
              hint="Optional — material cost per gallon of paint."
            />
          </section>

          <Button variant="ghost" fullWidth onClick={resetPaint}>
            Reset to defaults
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="mt-5 space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        <SummaryCard title="Estimate">
          <SummaryRow
            label="Paint needed"
            big
            tone="brand"
            value={result.valid ? `${result.gallons} gal` : '—'}
            hint={
              result.valid
                ? `${result.gallonsExact.toFixed(1)} gal exact · ${
                    paint.coats
                  } coat${paint.coats > 1 ? 's' : ''}`
                : undefined
            }
          />
          <SummaryRow
            label="Wall area"
            value={
              result.valid ? `${result.wallAreaSqFt.toFixed(0)} ft²` : '—'
            }
          />
          <SummaryRow
            label="Surface to paint"
            value={
              result.valid ? `${result.paintableSqFt.toFixed(0)} ft²` : '—'
            }
            hint="openings and coats included"
          />
        </SummaryCard>

        <SummaryCard title="Live Material Cost">
          {result.valid && result.cost != null ? (
            <SummaryRow
              label="Paint (by gallon)"
              big
              tone="good"
              value={formatCurrency(result.cost)}
              hint={`${result.gallons} gallons ordered`}
            />
          ) : (
            <div className="px-4 py-6 text-center text-sm text-ink-faint">
              Add a price per gallon to see a live cost estimate.
            </div>
          )}
        </SummaryCard>
      </div>

      {/* Monetization surface */}
      <div className="mt-4">
        <ActionCard module="Paint" items={PAINT_TOOLS} />
      </div>

      <p className="mt-4 px-1 text-xs text-ink-faint">
        Coverage varies with surface texture and color change; one gallon
        typically covers 350–400 sq ft per coat.
      </p>
    </div>
  );
}

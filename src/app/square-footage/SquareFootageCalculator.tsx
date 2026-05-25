'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { calculateArea } from '@/lib/area';
import { trackCalculate, trackFirstModule } from '@/lib/analytics';
import { amazon } from '@/lib/affiliate';
import { useCalculatorStore } from '@/store/useCalculatorStore';
import { ActionCard } from '@/components/ActionCard';
import { AreaDiagram } from '@/components/AreaDiagram';
import { StarterHint } from '@/components/StarterHint';
import { LevelIcon, PencilIcon, RulerIcon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { FractionalInput } from '@/components/ui/FractionalInput';
import { Stepper } from '@/components/ui/Stepper';
import { SummaryCard, SummaryRow } from '@/components/ui/SummaryCard';

// Sticky offset: pin flush below the 56px header (+ device safe-area inset).
const STICKY_TOP = 'calc(56px + var(--safe-top))';

// Swap a product by changing the amazon() argument (ASIN or search), or
// drop in an industry-partner URL directly.
const AREA_TOOLS = [
  {
    name: 'Measuring Wheel',
    detail: 'Pace off big areas',
    url: amazon('measuring wheel'),
    icon: <RulerIcon className="h-6 w-6" />,
  },
  {
    name: 'Estimating Pad',
    detail: 'Sketch the layout',
    url: amazon('graph paper estimating pad'),
    icon: <PencilIcon className="h-6 w-6" />,
  },
  {
    name: 'Laser Level',
    detail: 'Square your lines',
    url: amazon('laser level'),
    icon: <LevelIcon className="h-6 w-6" />,
  },
];

export function SquareFootageCalculator() {
  const area = useCalculatorStore((s) => s.area);
  const setArea = useCalculatorStore((s) => s.setArea);
  const resetArea = useCalculatorStore((s) => s.resetArea);

  // Analytics — first module of the session, and a one-time "Calculate" event.
  useEffect(() => trackFirstModule('Square Footage'), []);
  const calcFired = useRef(false);
  const [touched, setTouched] = useState(false);
  const updateArea = (patch: Parameters<typeof setArea>[0]) => {
    setArea(patch);
    setTouched(true);
    if (!calcFired.current) {
      calcFired.current = true;
      trackCalculate('Square Footage');
    }
  };

  const result = useMemo(() => calculateArea(area), [area]);

  const count = Math.max(1, Math.floor(area.count || 1));

  return (
    <div>
      <header>
        <h1 className="text-xl font-extrabold tracking-tight">
          Square Footage Calculator
        </h1>
        <p className="text-sm text-ink-dim">
          Total area in square feet, square yards, square meters and acres.
        </p>
      </header>

      <div className="mt-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
        {/* Visual — sticky near the top so it updates while you edit below. */}
        <div
          className="mb-4 lg:mb-0 lg:sticky lg:z-10 lg:bg-surface-0 lg:order-2"
          style={{ top: STICKY_TOP }}
        >
          <AreaDiagram
            lengthIn={area.length}
            widthIn={area.width}
            result={result}
          />
        </div>

        {/* Inputs */}
        <div className="space-y-4 lg:order-1">
          {!touched && <StarterHint />}
          <section className="card space-y-5 p-4">
            <p className="text-xs leading-relaxed text-ink-dim">
              Enter the{' '}
              <span className="font-bold text-ink">
                length and width of the area
              </span>{' '}
              you are measuring — a room, a yard or any flat rectangle.
            </p>
            <FractionalInput
              label="Length"
              valueInches={area.length}
              onChange={(v) => updateArea({ length: v })}
            />
            <FractionalInput
              label="Width"
              valueInches={area.width}
              onChange={(v) => updateArea({ width: v })}
            />
            <Stepper
              label="Identical Areas"
              value={area.count}
              min={1}
              max={99}
              onChange={(v) => updateArea({ count: v })}
              suffix={count === 1 ? 'area' : 'areas'}
            />
          </section>

          <Button variant="ghost" fullWidth onClick={resetArea}>
            Reset to defaults
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="mt-5">
        <SummaryCard title="Area">
          <SummaryRow
            label="Total area"
            big
            tone="brand"
            value={result.valid ? `${result.areaSqFt.toFixed(1)} ft²` : '—'}
            hint={
              result.valid
                ? `${count} identical area${count === 1 ? '' : 's'}`
                : undefined
            }
          />
          <SummaryRow
            label="Square yards"
            value={result.valid ? `${result.areaSqYd.toFixed(2)} yd²` : '—'}
            hint="9 square feet per square yard"
          />
          <SummaryRow
            label="Square meters"
            value={result.valid ? `${result.areaSqM.toFixed(2)} m²` : '—'}
            hint="1 ft² = 0.0929 m²"
          />
          <SummaryRow
            label="Acres"
            value={result.valid ? result.acres.toFixed(4) : '—'}
            hint="43,560 square feet per acre"
          />
          <SummaryRow
            label="Perimeter (per area)"
            value={result.valid ? `${result.perimeterFt.toFixed(1)} ft` : '—'}
            hint="Edge length around one area"
          />
        </SummaryCard>
      </div>

      {/* Monetization surface */}
      <div className="mt-4">
        <ActionCard module="Square Footage" items={AREA_TOOLS} />
      </div>

      <p className="mt-4 px-1 text-xs text-ink-faint">
        Square footage assumes a true rectangle. For an L-shaped or irregular
        space, split it into rectangles and add the results, or measure each
        section as its own identical area.
      </p>
    </div>
  );
}

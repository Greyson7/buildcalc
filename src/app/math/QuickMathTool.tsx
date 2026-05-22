'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { formatFeetInches } from '@/lib/imperial';
import {
  CONVERSIONS,
  OPERATORS,
  computeDimensional,
  type Operator,
} from '@/lib/quickmath';
import { trackCalculate, trackFirstModule } from '@/lib/analytics';
import { amazon } from '@/lib/affiliate';
import { ActionCard } from '@/components/ActionCard';
import { LevelIcon, SquareIcon, TapeIcon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { FractionalInput } from '@/components/ui/FractionalInput';
import { Segmented } from '@/components/ui/Segmented';

const INPUT_HELP =
  'Enter whole feet and inches with the number pad, then tap a fraction chip for the 1/16" part. Example: 5\' 4-3/8" is 5 ft, 4 in, then the 3/8 chip.';

// Swap a product by changing the amazon() argument (ASIN or search), or
// drop in an industry-partner URL directly.
const MATH_TOOLS = [
  {
    name: 'Tape Measure',
    detail: '25 ft, magnetic',
    url: amazon('25 ft tape measure'),
    icon: <TapeIcon className="h-6 w-6" />,
  },
  {
    name: 'Framing Square',
    detail: 'Mark & check',
    url: amazon('framing square'),
    icon: <SquareIcon className="h-6 w-6" />,
  },
  {
    name: '4 ft Level',
    detail: 'Keep it true',
    url: amazon('4 ft level'),
    icon: <LevelIcon className="h-6 w-6" />,
  },
];

const OP_OPTIONS = OPERATORS.map((o) => ({ label: o, value: o }));

/** Keep digits and a single decimal point. */
function cleanDecimal(s: string): string {
  const t = s.replace(/[^\d.]/g, '');
  const dot = t.indexOf('.');
  return dot === -1 ? t : t.slice(0, dot + 1) + t.slice(dot + 1).replace(/\./g, '');
}

function trimNum(n: number, decimals: number): string {
  if (!Number.isFinite(n) || n === 0) return '';
  const f = 10 ** decimals;
  return String(Math.round(n * f) / f);
}

export function QuickMathTool() {
  useEffect(() => trackFirstModule('Quick Math'), []);

  return (
    <div>
      <header>
        <h1 className="text-xl font-extrabold tracking-tight">Quick Math</h1>
        <p className="text-sm text-ink-dim">
          Fraction-accurate dimensional math and one-tap job-site conversions.
        </p>
      </header>

      <div className="mt-4 space-y-5 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6 lg:space-y-0">
        <DimensionalCalculator />
        <QuickConversions />
      </div>

      <div className="mt-4">
        <ActionCard items={MATH_TOOLS} />
      </div>
    </div>
  );
}

function DimensionalCalculator() {
  // Defaults demonstrate 12' 4" − 3 5/8".
  const [a, setA] = useState(148);
  const [b, setB] = useState(3.625);
  const [op, setOp] = useState<Operator>('−');

  const calcFired = useRef(false);
  const fireCalc = () => {
    if (!calcFired.current) {
      calcFired.current = true;
      trackCalculate('Quick Math');
    }
  };

  const res = useMemo(() => computeDimensional(a, op, b), [a, op, b]);

  let big: string;
  let sub: string;
  if (res.kind === 'length') {
    big = formatFeetInches(res.value);
    sub = `${res.value.toFixed(2)} in · ${(res.value / 12).toFixed(3)} ft`;
  } else if (res.kind === 'area') {
    const sqft = res.value / 144;
    big = `${sqft.toFixed(2)} sq ft`;
    sub = `${(sqft / 9).toFixed(3)} sq yd · ${Math.round(res.value).toLocaleString()} sq in`;
  } else if (!Number.isFinite(res.value)) {
    big = '—';
    sub = 'Cannot divide by zero';
  } else {
    big = res.value.toFixed(3);
    sub = `${Math.floor(res.value)} whole — e.g. joist bays in the span`;
  }

  return (
    <section className="card space-y-4 p-4">
      <h2 className="text-sm font-bold">Dimensional Calculator</h2>

      <FractionalInput
        label="Value A"
        valueInches={a}
        onChange={(v) => {
          setA(v);
          fireCalc();
        }}
        help={INPUT_HELP}
      />

      <Segmented
        label="Operation"
        options={OP_OPTIONS}
        value={op}
        onChange={(v) => {
          setOp(v);
          fireCalc();
        }}
      />

      <FractionalInput
        label="Value B"
        valueInches={b}
        onChange={(v) => {
          setB(v);
          fireCalc();
        }}
      />

      <div className="rounded-2xl bg-surface-2 p-4">
        <div className="field-label">Result</div>
        <div className="mt-1 selectable break-words font-mono text-3xl font-extrabold text-brand">
          {big}
        </div>
        <div className="mt-1 text-xs text-ink-faint">{sub}</div>
      </div>

      {res.kind === 'length' && Number.isFinite(res.value) && (
        <Button variant="ghost" fullWidth onClick={() => setA(res.value)}>
          Use result as Value A
        </Button>
      )}

      <p className="text-xs text-ink-faint">
        + and − give a length · × gives an area · ÷ gives a count. Results round
        to the nearest 1/16&quot;.
      </p>
    </section>
  );
}

function QuickConversions() {
  const [convId, setConvId] = useState(CONVERSIONS[0].id);
  const [raw, setRaw] = useState('');
  const [side, setSide] = useState<'L' | 'R'>('L');

  const conv = CONVERSIONS.find((c) => c.id === convId) ?? CONVERSIONS[0];
  const num = parseFloat(raw) || 0;
  const leftVal = side === 'L' ? raw : trimNum(conv.toLeft(num), conv.decimals);
  const rightVal = side === 'R' ? raw : trimNum(conv.toRight(num), conv.decimals);

  return (
    <section className="card space-y-3 p-4">
      <h2 className="text-sm font-bold">Quick Conversions</h2>

      <select
        value={convId}
        onChange={(e) => {
          setConvId(e.target.value);
          setRaw('');
          setSide('L');
        }}
        className="h-touch w-full rounded-2xl border border-line bg-surface-2 px-3 text-sm font-bold text-ink outline-none focus:border-brand"
      >
        {CONVERSIONS.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </select>

      <ConvInput
        value={leftVal}
        unit={conv.leftUnit}
        onChange={(v) => {
          setRaw(v);
          setSide('L');
        }}
      />
      <div className="text-center text-lg leading-none text-ink-faint">⇅</div>
      <ConvInput
        value={rightVal}
        unit={conv.rightUnit}
        onChange={(v) => {
          setRaw(v);
          setSide('R');
        }}
      />

      <p className="text-xs text-ink-faint">{conv.hint}</p>
    </section>
  );
}

function ConvInput({
  value,
  unit,
  onChange,
}: {
  value: string;
  unit: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex h-touch items-center rounded-2xl border border-line bg-surface-2 px-3.5 focus-within:border-brand">
      <input
        type="text"
        inputMode="decimal"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        enterKeyHint="done"
        aria-label={unit}
        value={value}
        placeholder="0"
        onFocus={(e) => e.currentTarget.select()}
        onChange={(e) => onChange(cleanDecimal(e.target.value))}
        className="min-w-0 flex-1 bg-transparent text-lg font-bold outline-none"
      />
      <span className="ml-2 shrink-0 text-sm font-semibold text-ink-faint">
        {unit}
      </span>
    </div>
  );
}

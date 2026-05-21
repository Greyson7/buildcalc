'use client';

import { useEffect, useRef, useState } from 'react';
import {
  SIXTEENTHS,
  formatFeetInches,
  fromInputParts,
  toInputParts,
} from '@/lib/imperial';

interface Props {
  label: string;
  /** Canonical value in inches. */
  valueInches: number;
  onChange: (inches: number) => void;
  hint?: string;
  /** When true, a 0 value reads as "Auto" instead of 0" (optional fields). */
  optional?: boolean;
}

const toInt = (s: string): number => {
  const n = parseInt(s.replace(/\D/g, ''), 10);
  return Number.isFinite(n) ? n : 0;
};
const partText = (n: number): string => (n ? String(n) : '');

/**
 * The fractional input system: feet + inches via the native numeric pad, and
 * a thumb-friendly chip keypad for the fraction (every 1/16"). No QWERTY, no
 * decimal-to-fraction guesswork — what you tap is exactly what gets built.
 */
export function FractionalInput({
  label,
  valueInches,
  onChange,
  hint,
  optional,
}: Props) {
  const parts = toInputParts(valueInches);
  const fraction = parts.fraction;

  const [feetText, setFeetText] = useState(() => partText(parts.feet));
  const [inchText, setInchText] = useState(() => partText(parts.inches));
  const emitted = useRef(valueInches);

  // Resync the editable fields when the value changes from outside.
  useEffect(() => {
    if (Math.abs(valueInches - emitted.current) > 1e-6) {
      const p = toInputParts(valueInches);
      setFeetText(partText(p.feet));
      setInchText(partText(p.inches));
      emitted.current = valueInches;
    }
  }, [valueInches]);

  const emit = (f: string, i: string, frac: number) => {
    const inches = fromInputParts(toInt(f), toInt(i), frac);
    emitted.current = inches;
    onChange(inches);
  };

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <label className="field-label">{label}</label>
        <span className="selectable font-mono text-sm font-bold text-brand-light">
          {valueInches > 0
            ? formatFeetInches(valueInches)
            : optional
              ? 'Auto'
              : '0"'}
        </span>
      </div>

      {/* Feet + whole inches — numeric pad only */}
      <div className="mt-1.5 flex gap-2">
        <NumPart
          label={label}
          value={feetText}
          unit="ft"
          onChange={(v) => {
            setFeetText(v);
            emit(v, inchText, fraction);
          }}
        />
        <NumPart
          label={label}
          value={inchText}
          unit="in"
          onChange={(v) => {
            setInchText(v);
            emit(feetText, v, fraction);
          }}
        />
      </div>

      {/* Fraction keypad — every sixteenth, one tap */}
      <div className="no-scrollbar mt-2 flex gap-1.5 overflow-x-auto pb-1">
        {SIXTEENTHS.map((f) => {
          const active = Math.abs(f.value - fraction) < 1e-6;
          return (
            <button
              key={f.label}
              type="button"
              onClick={() => emit(feetText, inchText, f.value)}
              className={`tap shrink-0 rounded-xl px-2 text-sm font-bold ${
                active
                  ? 'bg-brand text-surface-0'
                  : 'bg-surface-2 text-ink-dim active:bg-surface-3'
              }`}
              style={{ minWidth: 48 }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {hint && <p className="mt-1 text-xs text-ink-faint">{hint}</p>}
    </div>
  );
}

function NumPart({
  label,
  value,
  unit,
  onChange,
}: {
  label: string;
  value: string;
  unit: 'ft' | 'in';
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        enterKeyHint="done"
        aria-label={`${label} — ${unit === 'ft' ? 'feet' : 'inches'}`}
        value={value}
        placeholder="0"
        // Select-all on focus so a tap lets you immediately overtype.
        onFocus={(e) => e.currentTarget.select()}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
        className="h-touch w-full rounded-2xl border border-line bg-surface-2 pl-3.5 pr-9 text-lg font-bold text-ink outline-none focus:border-brand"
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-ink-faint">
        {unit}
      </span>
    </div>
  );
}

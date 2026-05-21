'use client';

import { useEffect, useRef, useState } from 'react';
import { fromInches, toInches, type LengthUnit } from '@/lib/imperial';

interface Props {
  label: string;
  /** Canonical value in inches. */
  valueInches: number;
  unit: LengthUnit;
  units: ReadonlyArray<LengthUnit>;
  onValueChange: (inches: number) => void;
  onUnitChange: (unit: LengthUnit) => void;
  hint?: string;
}

function clean(s: string): string {
  const t = s.replace(/[^\d.]/g, '');
  const dot = t.indexOf('.');
  return dot === -1 ? t : t.slice(0, dot + 1) + t.slice(dot + 1).replace(/\./g, '');
}

/** Show the canonical inches value in `unit`, trimmed of float noise. */
function display(inches: number, unit: LengthUnit): string {
  const v = fromInches(inches, unit);
  if (!v) return '';
  return String(Math.round(v * 1000) / 1000);
}

/**
 * Number field with an inline unit selector — lets a slab be entered as
 * "20 ft" while its depth is entered as "4 in". All values are stored in the
 * canonical inch base, so switching units restates the same physical length.
 */
export function UnitField({
  label,
  valueInches,
  unit,
  units,
  onValueChange,
  onUnitChange,
  hint,
}: Props) {
  const [text, setText] = useState(() => display(valueInches, unit));
  const emitted = useRef(valueInches);

  // Resync when the value changes from outside (reset / restore).
  useEffect(() => {
    if (Math.abs(valueInches - emitted.current) > 1e-6) {
      setText(display(valueInches, unit));
      emitted.current = valueInches;
    }
  }, [valueInches, unit]);

  const handleText = (raw: string) => {
    const t = clean(raw);
    setText(t);
    const inches = toInches(parseFloat(t) || 0, unit);
    emitted.current = inches;
    onValueChange(inches);
  };

  const handleUnit = (u: LengthUnit) => {
    if (u === unit) return;
    onUnitChange(u);
    setText(display(valueInches, u)); // same length, restated in the new unit
    emitted.current = valueInches;
  };

  return (
    <div>
      <label className="field-label">{label}</label>
      <div className="mt-1.5 flex gap-2">
        <input
          type="text"
          inputMode="decimal"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="done"
          aria-label={label}
          value={text}
          placeholder="0"
          onFocus={(e) => e.currentTarget.select()}
          onChange={(e) => handleText(e.target.value)}
          className="h-touch min-w-0 flex-1 rounded-2xl border border-line bg-surface-2 px-3.5 text-lg font-bold outline-none focus:border-brand"
        />
        <div className="flex gap-1 rounded-2xl bg-surface-2 p-1">
          {units.map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => handleUnit(u)}
              className={`tap min-w-[48px] rounded-xl px-1 text-sm font-bold ${
                u === unit
                  ? 'bg-brand text-surface-0'
                  : 'text-ink-dim active:bg-surface-3'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>
      {hint && <p className="mt-1 text-xs text-ink-faint">{hint}</p>}
    </div>
  );
}

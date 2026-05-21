'use client';

interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}

/** Big −/+ stepper for small integer counts — no keyboard needed. */
export function Stepper({
  label,
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  suffix,
}: Props) {
  const set = (v: number) => onChange(Math.min(max, Math.max(min, v)));

  return (
    <div>
      <label className="field-label">{label}</label>
      <div className="mt-1.5 flex items-stretch gap-2">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          onClick={() => set(value - step)}
          disabled={value <= min}
          className="tap grid w-14 place-items-center rounded-2xl border border-line bg-surface-2 text-2xl font-bold text-ink active:bg-surface-3 disabled:opacity-30"
        >
          −
        </button>
        <div className="card flex flex-1 items-center justify-center text-lg font-bold">
          {value}
          {suffix && <span className="ml-1 text-sm text-ink-faint">{suffix}</span>}
        </div>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          onClick={() => set(value + step)}
          disabled={value >= max}
          className="tap grid w-14 place-items-center rounded-2xl border border-line bg-surface-2 text-2xl font-bold text-ink active:bg-surface-3 disabled:opacity-30"
        >
          +
        </button>
      </div>
    </div>
  );
}

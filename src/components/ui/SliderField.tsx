'use client';

interface Props {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  /** Renders the live value (e.g. as a formatted imperial string). */
  display: (value: number) => string;
  hint?: string;
  /** Greys out and locks the slider — used when another input overrides it. */
  disabled?: boolean;
}

/** Labelled range slider with a live formatted readout. */
export function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step = 0.0625,
  display,
  hint,
  disabled = false,
}: Props) {
  return (
    <div className={disabled ? 'opacity-55' : undefined}>
      <div className="flex items-baseline justify-between gap-2">
        <label className="field-label">{label}</label>
        <span className="selectable font-mono text-sm font-bold text-brand-light">
          {display(value)}
        </span>
      </div>
      <input
        type="range"
        className="range mt-1 w-full"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-label={label}
      />
      {hint && <p className="text-xs text-ink-faint">{hint}</p>}
    </div>
  );
}

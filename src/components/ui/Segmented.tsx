'use client';

interface Option<T> {
  label: string;
  value: T;
}

interface Props<T> {
  options: ReadonlyArray<Option<T>>;
  value: T;
  onChange: (value: T) => void;
  label?: string;
  className?: string;
}

/** Segmented control — replaces toggle buttons / radio groups. Touch-first. */
export function Segmented<T extends string | number>({
  options,
  value,
  onChange,
  label,
  className = '',
}: Props<T>) {
  return (
    <div className={className}>
      {label && <label className="field-label">{label}</label>}
      <div
        className={`flex gap-1 rounded-2xl bg-surface-2 p-1 ${label ? 'mt-1.5' : ''}`}
      >
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={String(o.value)}
              type="button"
              onClick={() => onChange(o.value)}
              className={`tap flex-1 rounded-xl px-3 py-2 text-sm font-bold ${
                active
                  ? 'bg-brand text-surface-0'
                  : 'text-ink-dim active:bg-surface-3'
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

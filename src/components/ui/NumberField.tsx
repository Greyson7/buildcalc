'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  hint?: string;
}

/** Keep only digits and a single decimal point. */
function clean(s: string): string {
  const t = s.replace(/[^\d.]/g, '');
  const dot = t.indexOf('.');
  return dot === -1 ? t : t.slice(0, dot + 1) + t.slice(dot + 1).replace(/\./g, '');
}

/**
 * Plain decimal field — nullable so an empty optional input (e.g. an unset
 * price) stays empty rather than collapsing to 0. Triggers the decimal pad.
 */
export function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  placeholder = '0',
  hint,
}: Props) {
  const [text, setText] = useState(() => (value == null ? '' : String(value)));
  const emitted = useRef(value);

  useEffect(() => {
    if (value !== emitted.current) {
      setText(value == null ? '' : String(value));
      emitted.current = value;
    }
  }, [value]);

  const handle = (raw: string) => {
    const t = clean(raw);
    setText(t);
    const parsed = t === '' ? null : parseFloat(t);
    const safe = parsed == null || Number.isNaN(parsed) ? null : parsed;
    emitted.current = safe;
    onChange(safe);
  };

  return (
    <div>
      <label className="field-label">{label}</label>
      <div className="mt-1.5 flex h-touch items-center rounded-2xl border border-line bg-surface-2 px-3.5 focus-within:border-brand">
        {prefix && (
          <span className="mr-1 text-base font-bold text-ink-faint">{prefix}</span>
        )}
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
          placeholder={placeholder}
          onFocus={(e) => e.currentTarget.select()}
          onChange={(e) => handle(e.target.value)}
          className="min-w-0 flex-1 bg-transparent text-lg font-bold outline-none"
        />
        {suffix && (
          <span className="ml-1 text-sm font-semibold text-ink-faint">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-ink-faint">{hint}</p>}
    </div>
  );
}

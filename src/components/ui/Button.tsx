import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'ghost' | 'danger';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand text-surface-0 active:bg-brand-dark',
  ghost: 'border border-line bg-surface-2 text-ink active:bg-surface-3',
  danger: 'border border-bad/40 bg-bad/10 text-bad active:bg-bad/20',
};

/** Touch-first button — 48px min target, press feedback, no hover state. */
export function Button({
  variant = 'primary',
  fullWidth,
  className = '',
  ...rest
}: Props) {
  return (
    <button
      className={`tap inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold ${
        VARIANTS[variant]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    />
  );
}

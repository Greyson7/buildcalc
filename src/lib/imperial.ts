/**
 * imperial.ts — Imperial (feet / inches / fraction) parsing & formatting.
 *
 * The whole app works in ONE canonical unit internally: decimal inches.
 * Everything the user types is parsed to inches; everything displayed is
 * formatted from inches. Keeping all math in a single base unit avoids the
 * rounding drift that plagues older construction-calculator apps.
 */

/** Denominator the UI snaps fractions to (1/16"). */
export const DEFAULT_DENOMINATOR = 16;

export type LengthUnit = 'in' | 'ft' | 'yd' | 'mm' | 'cm' | 'm';

/** Inches per unit — multiply a value in `unit` by this to get inches. */
export const INCHES_PER: Record<LengthUnit, number> = {
  in: 1,
  ft: 12,
  yd: 36,
  mm: 1 / 25.4,
  cm: 1 / 2.54,
  m: 1000 / 25.4,
};

/** Human labels for unit pickers. */
export const UNIT_LABEL: Record<LengthUnit, string> = {
  in: 'in',
  ft: 'ft',
  yd: 'yd',
  mm: 'mm',
  cm: 'cm',
  m: 'm',
};

/** Greatest common divisor (iterative, abs, never returns 0). */
export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

function fractionLabel(num: number, den: number): string {
  if (num === 0) return '0';
  const g = gcd(num, den);
  return `${num / g}/${den / g}`;
}

/** Every sixteenth from 0 to 15/16 — drives the fraction chip keypad. */
export const SIXTEENTHS: ReadonlyArray<{ label: string; value: number }> =
  Array.from({ length: 16 }, (_, i) => ({
    label: fractionLabel(i, 16),
    value: i / 16,
  }));

/**
 * Parse a free-form imperial string into decimal inches.
 *
 * Understands, in any combination:
 *   5' 4 3/8"   ·   5ft 4in   ·   5'   ·   4 3/8   ·   3/8"   ·   64.375   ·   5.5'
 *
 * A bare number with no unit marker is treated as inches.
 * Returns 0 for empty / unparseable input.
 */
export function parseImperial(input: string | number | null | undefined): number {
  if (input == null) return 0;
  if (typeof input === 'number') return Number.isFinite(input) ? input : 0;

  let str = input.toString().trim().toLowerCase();
  if (!str) return 0;

  const negative = str.startsWith('-');
  if (negative) str = str.slice(1).trim();

  let inches = 0;

  // Feet — a number immediately followed by ', ft or feet.
  const feet = str.match(/(\d*\.?\d+)\s*(?:'|ft\b|feet\b)/);
  if (feet) {
    inches += parseFloat(feet[1]) * 12;
    str = str.replace(feet[0], ' ');
  }

  // Strip inch markers so only numbers / fractions remain.
  str = str.replace(/"|''|\binches\b|\binch\b|\bin\b/g, ' ').trim();

  // Fraction  a/b
  const frac = str.match(/(\d+)\s*\/\s*(\d+)/);
  if (frac) {
    const den = parseFloat(frac[2]);
    if (den) inches += parseFloat(frac[1]) / den;
    str = str.replace(frac[0], ' ').trim();
  }

  // Remaining whole or decimal inches.
  const rest = str.match(/\d*\.?\d+/);
  if (rest) inches += parseFloat(rest[0]);

  return negative ? -inches : inches;
}

/** Convert a numeric value expressed in `unit` to canonical inches. */
export function toInches(value: number, unit: LengthUnit): number {
  return value * INCHES_PER[unit];
}

/** Convert canonical inches back into `unit`. */
export function fromInches(inches: number, unit: LengthUnit): number {
  return inches / INCHES_PER[unit];
}

/** Snap a value (inches) to the nearest 1/denominator. */
export function roundToFraction(
  inches: number,
  denominator = DEFAULT_DENOMINATOR,
): number {
  return Math.round(inches * denominator) / denominator;
}

export interface FractionParts {
  negative: boolean;
  whole: number; // whole inches
  numerator: number; // reduced
  denominator: number; // reduced
}

/**
 * Break a decimal inch value into whole inches + a reduced fraction,
 * rounded to the nearest 1/denominator.
 */
export function decimalToFraction(
  value: number,
  denominator = DEFAULT_DENOMINATOR,
): FractionParts {
  const negative = value < 0;
  const ticks = Math.round(Math.abs(value) * denominator);
  const whole = Math.floor(ticks / denominator);
  let numerator = ticks % denominator;
  let den = denominator;
  if (numerator !== 0) {
    const g = gcd(numerator, den);
    numerator /= g;
    den /= g;
  } else {
    den = 1;
  }
  return { negative, whole, numerator, denominator: den };
}

export interface FormatOptions {
  denominator?: number;
  /** Show the feet segment even when it is 0 (e.g. `0' 4"`). */
  forceFeet?: boolean;
  /** 'tick' → 5' 4-3/8"   ·   'word' → 5 ft 4-3/8 in */
  style?: 'tick' | 'word';
}

/**
 * Format decimal inches as a clean imperial string, e.g. `5' 4-3/8"`.
 * Fractions are reduced and snapped to the nearest 1/denominator.
 */
export function formatFeetInches(
  inches: number,
  opts: FormatOptions = {},
): string {
  const {
    denominator = DEFAULT_DENOMINATOR,
    forceFeet = false,
    style = 'tick',
  } = opts;

  const sign = inches < 0 ? '-' : '';
  const ticks = Math.round(Math.abs(inches) * denominator);
  const totalInches = ticks / denominator;

  const feet = Math.floor(totalInches / 12);
  const remInches = totalInches - feet * 12;
  const { whole, numerator, denominator: den } = decimalToFraction(
    remInches,
    denominator,
  );

  const inchText =
    numerator === 0
      ? `${whole}`
      : whole === 0
        ? `${numerator}/${den}`
        : `${whole}-${numerator}/${den}`;

  const ftMark = style === 'tick' ? `'` : ' ft';
  const inMark = style === 'tick' ? `"` : ' in';

  if (feet === 0 && !forceFeet) return `${sign}${inchText}${inMark}`;
  if (remInches === 0) return `${sign}${feet}${ftMark}`;
  return `${sign}${feet}${ftMark} ${inchText}${inMark}`;
}

/** Format inches without ever rolling into feet, e.g. `64-3/8"`. */
export function formatInches(
  inches: number,
  denominator = DEFAULT_DENOMINATOR,
): string {
  const sign = inches < 0 ? '-' : '';
  const { whole, numerator, denominator: den } = decimalToFraction(
    Math.abs(inches),
    denominator,
  );
  if (numerator === 0) return `${sign}${whole}"`;
  if (whole === 0) return `${sign}${numerator}/${den}"`;
  return `${sign}${whole}-${numerator}/${den}"`;
}

/**
 * Decompose inches into editable { feet, inches, fraction } parts for the
 * FractionalInput widget. `fraction` is a 0–<1 decimal snapped to the grid.
 */
export function toInputParts(
  inches: number,
  denominator = DEFAULT_DENOMINATOR,
): { feet: number; inches: number; fraction: number } {
  const ticks = Math.round(Math.abs(inches) * denominator);
  const ticksPerFoot = denominator * 12;
  const feet = Math.floor(ticks / ticksPerFoot);
  const rem = ticks - feet * ticksPerFoot;
  const wholeInches = Math.floor(rem / denominator);
  const fraction = (rem % denominator) / denominator;
  return { feet, inches: wholeInches, fraction };
}

/** Re-assemble { feet, inches, fraction } parts into canonical inches. */
export function fromInputParts(
  feet: number,
  inches: number,
  fraction: number,
): number {
  return (feet || 0) * 12 + (inches || 0) + (fraction || 0);
}

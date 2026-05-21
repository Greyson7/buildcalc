/**
 * quickmath.ts — Dimensional arithmetic + quick industry conversions.
 *
 * Lengths are decimal inches (the app's canonical unit).
 */

export type Operator = '+' | '−' | '×' | '÷';

export const OPERATORS: Operator[] = ['+', '−', '×', '÷'];

export type DimKind = 'length' | 'area' | 'ratio';

export interface DimResult {
  kind: DimKind;
  /** length → inches · area → square inches · ratio → unitless. */
  value: number;
}

/**
 * Apply an operator to two lengths (both in inches).
 *  +  −  →  a length
 *  ×      →  an area (square inches) — length × length
 *  ÷      →  a unitless ratio / count (e.g. bays = span ÷ spacing)
 */
export function computeDimensional(
  aInches: number,
  op: Operator,
  bInches: number,
): DimResult {
  switch (op) {
    case '+':
      return { kind: 'length', value: aInches + bInches };
    case '−':
      return { kind: 'length', value: aInches - bInches };
    case '×':
      return { kind: 'area', value: aInches * bInches };
    case '÷':
      return { kind: 'ratio', value: bInches !== 0 ? aInches / bInches : NaN };
  }
}

export interface Conversion {
  id: string;
  label: string;
  leftUnit: string;
  rightUnit: string;
  /** left value → right value */
  toRight: (left: number) => number;
  /** right value → left value */
  toLeft: (right: number) => number;
  /** decimal places to display */
  decimals: number;
  hint: string;
}

/** One-tap industry conversions for the Quick Math scratchpad. */
export const CONVERSIONS: Conversion[] = [
  {
    id: 'area',
    label: 'Square Feet ↔ Acres',
    leftUnit: 'sq ft',
    rightUnit: 'acres',
    toRight: (v) => v / 43560,
    toLeft: (v) => v * 43560,
    decimals: 4,
    hint: '1 acre = 43,560 sq ft',
  },
  {
    id: 'volume',
    label: 'Cubic Feet ↔ Cubic Yards',
    leftUnit: 'cu ft',
    rightUnit: 'cu yd',
    toRight: (v) => v / 27,
    toLeft: (v) => v * 27,
    decimals: 3,
    hint: '1 cubic yard = 27 cubic feet',
  },
  {
    id: 'metric',
    label: 'Millimeters ↔ Inches',
    leftUnit: 'mm',
    rightUnit: 'in',
    toRight: (v) => v / 25.4,
    toLeft: (v) => v * 25.4,
    decimals: 4,
    hint: '1 inch = 25.4 mm',
  },
  {
    id: 'pitch',
    label: 'Roof Pitch (X/12) ↔ Degrees',
    leftUnit: '/12',
    rightUnit: '°',
    toRight: (rise) => (Math.atan(rise / 12) * 180) / Math.PI,
    toLeft: (deg) => Math.tan((deg * Math.PI) / 180) * 12,
    decimals: 2,
    hint: 'Pitch is rise per 12" of run',
  },
];

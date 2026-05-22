/**
 * area.ts — Square-footage estimator for a simple rectangular area.
 *
 * Dimensions come in as decimal inches (the app's canonical unit). One model
 * covers any flat rectangle — a room, a yard, a slab footprint — and an
 * optional count repeats it for several identical areas in one take-off.
 */

export interface AreaInput {
  length: number; // inches — area length
  width: number; // inches — area width
  count: number; // identical areas
}

export interface AreaResult {
  valid: boolean;
  areaSqFt: number; // total area, square feet — count included
  areaSqYd: number; // total area, square yards
  areaSqM: number; // total area, square meters
  acres: number; // total area, acres
  perimeterFt: number; // perimeter of one area, feet
}

/** Square feet in one square yard. */
export const SQFT_PER_SQYD = 9;
/** Square feet in one acre. */
export const SQFT_PER_ACRE = 43560;
/** Square meters in one square foot. */
export const SQM_PER_SQFT = 0.09290304;

const EMPTY: AreaResult = {
  valid: false,
  areaSqFt: 0,
  areaSqYd: 0,
  areaSqM: 0,
  acres: 0,
  perimeterFt: 0,
};

/** Compute total area, in several units, from a rectangle's length and width. */
export function calculateArea(input: AreaInput): AreaResult {
  const { length, width } = input;

  if (!(length > 0) || !(width > 0)) return { ...EMPTY };

  const count = Math.max(1, Math.floor(input.count || 1));

  const areaSqIn = length * width * count;
  const areaSqFt = areaSqIn / 144;
  const areaSqYd = areaSqFt / SQFT_PER_SQYD;
  const areaSqM = areaSqFt * SQM_PER_SQFT;
  const acres = areaSqFt / SQFT_PER_ACRE;
  const perimeterFt = (2 * (length + width)) / 12;

  return {
    valid: true,
    areaSqFt,
    areaSqYd,
    areaSqM,
    acres,
    perimeterFt,
  };
}

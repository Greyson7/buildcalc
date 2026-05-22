/**
 * paint.ts — Interior paint estimator for a single room.
 *
 * Room dimensions come in as decimal inches (the app's canonical unit).
 *
 * Wall area is the perimeter times the ceiling height; doors and windows are
 * subtracted at flat-rate openings, and the net wall is multiplied by the
 * coat count before being divided by the per-gallon coverage.
 */

export interface PaintInput {
  length: number; // inches — room length
  width: number; // inches — room width
  height: number; // inches — ceiling height
  coats: number;
  doors: number;
  windows: number;
  coverage: number; // square feet covered per gallon
  pricePerGallon?: number | null;
}

export interface PaintResult {
  valid: boolean;
  wallAreaSqFt: number; // gross wall area, before openings
  netWallSqFt: number; // wall area after doors and windows
  paintableSqFt: number; // net wall area times the coat count
  gallonsExact: number; // unrounded gallons of paint
  gallons: number; // whole gallons to buy, rounded up
  cost: number | null;
}

/** Square feet subtracted per standard door opening. */
export const DOOR_SQFT = 21;
/** Square feet subtracted per standard window opening. */
export const WINDOW_SQFT = 15;

const EMPTY: PaintResult = {
  valid: false,
  wallAreaSqFt: 0,
  netWallSqFt: 0,
  paintableSqFt: 0,
  gallonsExact: 0,
  gallons: 0,
  cost: null,
};

/** Compute paintable wall area, gallons of paint and live material cost. */
export function calculatePaint(input: PaintInput): PaintResult {
  const { length, width, height } = input;

  if (!(length > 0) || !(width > 0) || !(height > 0)) return { ...EMPTY };

  const wallAreaSqFt = (2 * (length + width) * height) / 144;
  const openingsSqFt =
    Math.max(0, input.doors) * DOOR_SQFT +
    Math.max(0, input.windows) * WINDOW_SQFT;
  const netWallSqFt = Math.max(0, wallAreaSqFt - openingsSqFt);

  const coats = Math.max(1, input.coats || 1);
  const coverage = input.coverage > 0 ? input.coverage : 350;

  const paintableSqFt = netWallSqFt * coats;
  const gallonsExact = paintableSqFt / coverage;
  const gallons = Math.ceil(gallonsExact);

  const cost =
    input.pricePerGallon != null && input.pricePerGallon > 0
      ? gallons * input.pricePerGallon
      : null;

  return {
    valid: true,
    wallAreaSqFt,
    netWallSqFt,
    paintableSqFt,
    gallonsExact,
    gallons,
    cost,
  };
}

/**
 * drywall.ts — Drywall sheet + screw estimator for a rectangular room.
 *
 * Room dimensions come in as decimal inches (the app's canonical unit). The
 * model wraps drywall around all four walls and, optionally, the ceiling,
 * then converts the surface area into whole sheets and the screws to hang
 * them.
 */

export interface DrywallInput {
  length: number; // inches — room length
  width: number; // inches — room width
  height: number; // inches — ceiling height
  includeCeiling: boolean;
  sheetSqFt: number; // area of one drywall sheet
  /** Extra ordered for cuts, offcuts and damaged sheets, percent. */
  wastePct: number;
  pricePerSheet?: number | null;
}

export interface DrywallResult {
  valid: boolean;
  wallAreaSqFt: number; // area of all four walls
  ceilingAreaSqFt: number; // ceiling area (0 when not included)
  totalAreaSqFt: number; // walls plus ceiling
  sheets: number; // whole drywall sheets, waste included, rounded up
  screws: number; // drywall screws, 32 per sheet
  cost: number | null;
}

/** Drywall screws used to hang one sheet (16" framing, field + edges). */
export const SCREWS_PER_SHEET = 32;

const EMPTY: DrywallResult = {
  valid: false,
  wallAreaSqFt: 0,
  ceilingAreaSqFt: 0,
  totalAreaSqFt: 0,
  sheets: 0,
  screws: 0,
  cost: null,
};

/** Compute drywall sheets, screws and live material cost for a room. */
export function calculateDrywall(input: DrywallInput): DrywallResult {
  const { length, width, height } = input;

  if (!(length > 0) || !(width > 0) || !(height > 0)) return { ...EMPTY };

  const wastePct = Math.max(0, input.wastePct || 0);
  const factor = 1 + wastePct / 100;
  const sheet = input.sheetSqFt > 0 ? input.sheetSqFt : 32;

  const wallAreaSqFt = (2 * (length + width) * height) / 144;
  const ceilingAreaSqFt = input.includeCeiling ? (length * width) / 144 : 0;
  const totalAreaSqFt = wallAreaSqFt + ceilingAreaSqFt;

  const sheets = Math.ceil((totalAreaSqFt * factor) / sheet);
  const screws = sheets * SCREWS_PER_SHEET;

  const cost =
    input.pricePerSheet != null && input.pricePerSheet > 0
      ? sheets * input.pricePerSheet
      : null;

  return {
    valid: true,
    wallAreaSqFt,
    ceilingAreaSqFt,
    totalAreaSqFt,
    sheets,
    screws,
    cost,
  };
}

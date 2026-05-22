/**
 * roofing.ts — Roofing material estimator for a sloped roof.
 *
 * Footprint dimensions come in as decimal inches (the app's canonical unit);
 * pitch is a plain number — rise in inches per 12" of horizontal run.
 *
 * For any roof whose planes share a single pitch — gable, hip or shed — the
 * sloped surface area equals the horizontal footprint area times the pitch
 * multiplier, so one model covers all three common roof types.
 */

export interface RoofingInput {
  length: number; // inches — footprint length the roof covers (incl. overhang)
  width: number; // inches — footprint width
  pitch: number; // rise per 12" of run (e.g. 6 = 6/12)
  /** Extra ordered for starter, ridge cap and hip/valley cuts, percent. */
  wastePct: number;
  pricePerSquare?: number | null;
}

export interface RoofingResult {
  valid: boolean;
  footprintSqFt: number;
  pitchMultiplier: number; // sloped length per unit of horizontal run
  pitchAngle: number; // degrees from horizontal
  roofAreaNetSqFt: number; // sloped area before waste
  roofAreaSqFt: number; // sloped area with waste — what you buy
  squares: number; // roofing squares (100 sq ft each), waste included
  bundles: number; // shingle bundles, 3 per square, rounded up
  underlaymentRolls: number; // synthetic rolls (~10 squares each), rounded up
  cost: number | null;
}

/** Shingle bundles per roofing square (3-tab and most architectural). */
export const BUNDLES_PER_SQUARE = 3;
/** Square feet in one roofing "square". */
export const SQUARE_SQFT = 100;
/** Coverage of one synthetic underlayment roll, in squares (~1,000 sq ft). */
export const UNDERLAYMENT_SQUARES_PER_ROLL = 10;

const EMPTY: RoofingResult = {
  valid: false,
  footprintSqFt: 0,
  pitchMultiplier: 1,
  pitchAngle: 0,
  roofAreaNetSqFt: 0,
  roofAreaSqFt: 0,
  squares: 0,
  bundles: 0,
  underlaymentRolls: 0,
  cost: null,
};

/** Sloped length per unit of run: √(pitch² + 12²) ÷ 12. */
export function pitchMultiplier(pitch: number): number {
  return Math.sqrt(pitch * pitch + 144) / 12;
}

/** Compute roof area, shingle bundles and underlayment from footprint + pitch. */
export function calculateRoofing(input: RoofingInput): RoofingResult {
  const { length, width, pitch } = input;
  const wastePct = Math.max(0, input.wastePct || 0);

  if (!(length > 0) || !(width > 0) || !(pitch >= 0)) return { ...EMPTY };

  const footprintSqFt = (length / 12) * (width / 12);
  const mult = pitchMultiplier(pitch);
  const pitchAngle = (Math.atan(pitch / 12) * 180) / Math.PI;

  const roofAreaNetSqFt = footprintSqFt * mult;
  const factor = 1 + wastePct / 100;
  const roofAreaSqFt = roofAreaNetSqFt * factor;

  const squares = roofAreaSqFt / SQUARE_SQFT;
  const bundles = Math.ceil(squares * BUNDLES_PER_SQUARE);
  const underlaymentRolls = Math.ceil(squares / UNDERLAYMENT_SQUARES_PER_ROLL);

  const cost =
    input.pricePerSquare != null && input.pricePerSquare > 0
      ? squares * input.pricePerSquare
      : null;

  return {
    valid: true,
    footprintSqFt,
    pitchMultiplier: mult,
    pitchAngle,
    roofAreaNetSqFt,
    roofAreaSqFt,
    squares,
    bundles,
    underlaymentRolls,
    cost,
  };
}

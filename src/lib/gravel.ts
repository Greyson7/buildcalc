/**
 * gravel.ts — Gravel / stone / sand volume + tonnage estimating.
 *
 * All dimensions in are decimal inches (the app's canonical unit).
 */

export interface GravelInput {
  length: number; // inches
  width: number; // inches
  depth: number; // inches
  /** Extra ordered for spillage / over-excavation, percent (e.g. 10). */
  wastePct: number;
  pricePerTon?: number | null;
}

export interface GravelResult {
  valid: boolean;
  cubicFeet: number; // net volume
  cubicYardsNet: number; // without waste
  cubicYards: number; // with waste — what you order
  tons: number; // weight of gravel ordered, waste included
  cost: number | null;
}

/**
 * Weight of crushed gravel / stone per cubic yard, in tons (typical
 * average — varies with material and moisture).
 */
export const GRAVEL_TONS_PER_CUBIC_YARD = 1.4;

const EMPTY: GravelResult = {
  valid: false,
  cubicFeet: 0,
  cubicYardsNet: 0,
  cubicYards: 0,
  tons: 0,
  cost: null,
};

/** Compute gravel volume, tonnage and live material cost. */
export function calculateGravel(input: GravelInput): GravelResult {
  const { length, width, depth } = input;
  const wastePct = Math.max(0, input.wastePct || 0);

  if (!(length > 0) || !(width > 0) || !(depth > 0)) {
    return EMPTY;
  }

  // in³ → ft³ (÷1728) → yd³ (÷27)
  const cubicFeet = (length * width * depth) / 1728;
  const cubicYardsNet = cubicFeet / 27;
  const factor = 1 + wastePct / 100;
  const cubicYards = cubicYardsNet * factor;

  const tons = cubicYards * GRAVEL_TONS_PER_CUBIC_YARD;

  const cost =
    input.pricePerTon != null && input.pricePerTon > 0
      ? tons * input.pricePerTon
      : null;

  return {
    valid: true,
    cubicFeet,
    cubicYardsNet,
    cubicYards,
    tons,
    cost,
  };
}

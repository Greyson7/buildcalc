/**
 * mulch.ts — Mulch volume + bag estimator.
 *
 * Bed dimensions are decimal inches (the app's canonical unit). Mulch sells
 * both bulk (by the cubic yard) and bagged — most retail bags hold 2 cubic
 * feet, with 3 cubic foot "jumbo" available — so the calculator returns both
 * a yardage and a bag count from one set of dimensions.
 */

export interface MulchInput {
  length: number; // inches — bed length
  width: number; // inches — bed width
  depth: number; // inches — mulch depth (2–4" is typical)
  /** Extra ordered for settling and gaps, percent. */
  wastePct: number;
  /** Cubic feet per bag — 2 for standard, 3 for jumbo. */
  bagSize: number;
  pricePerYard?: number | null;
  pricePerBag?: number | null;
}

export interface MulchResult {
  valid: boolean;
  cubicFeet: number; // net
  cubicYardsNet: number; // before waste
  cubicYards: number; // with waste — what bulk you order
  bagSize: number; // echoed back for the result label / cost line
  bags: number; // whole bags, waste included, rounded up
  costByYard: number | null;
  costByBag: number | null;
}

const EMPTY: MulchResult = {
  valid: false,
  cubicFeet: 0,
  cubicYardsNet: 0,
  cubicYards: 0,
  bagSize: 2,
  bags: 0,
  costByYard: null,
  costByBag: null,
};

/** Compute mulch volume, bag count and live material cost. */
export function calculateMulch(input: MulchInput): MulchResult {
  const { length, width, depth } = input;
  const wastePct = Math.max(0, input.wastePct || 0);
  const bagSize = input.bagSize > 0 ? input.bagSize : 2;

  if (!(length > 0) || !(width > 0) || !(depth > 0)) {
    return { ...EMPTY, bagSize };
  }

  // in³ → ft³ (÷1728) → yd³ (÷27)
  const cubicFeet = (length * width * depth) / 1728;
  const cubicYardsNet = cubicFeet / 27;
  const factor = 1 + wastePct / 100;
  const cubicYards = cubicYardsNet * factor;
  const bags = Math.ceil((cubicFeet * factor) / bagSize);

  const costByYard =
    input.pricePerYard != null && input.pricePerYard > 0
      ? cubicYards * input.pricePerYard
      : null;
  const costByBag =
    input.pricePerBag != null && input.pricePerBag > 0
      ? bags * input.pricePerBag
      : null;

  return {
    valid: true,
    cubicFeet,
    cubicYardsNet,
    cubicYards,
    bagSize,
    bags,
    costByYard,
    costByBag,
  };
}

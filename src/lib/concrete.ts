/**
 * concrete.ts — Concrete slab / footing volume + bag estimating.
 *
 * All dimensions in are decimal inches (the app's canonical unit).
 */

export type BagSize = 40 | 50 | 60 | 80;

export interface ConcreteInput {
  shape: 'slab' | 'round';
  length: number; // inches (slab)
  width: number; // inches (slab)
  depth: number; // inches — slab thickness or round-column height
  diameter: number; // inches (round)
  /** Quantity of identical pours (e.g. 6 footings). */
  count: number;
  /** Extra ordered for spillage / over-excavation, percent (e.g. 10). */
  wastePct: number;
  bagSize: BagSize;
  pricePerYard?: number | null;
  pricePerBag?: number | null;
}

export interface ConcreteResult {
  valid: boolean;
  cubicFeet: number; // net, all pours
  cubicYardsNet: number; // without waste
  cubicYards: number; // with waste — what you order
  bags: number; // whole bags, waste included, rounded up
  bagSize: number;
  premixWeightLbs: number; // total dry mix weight for the bag route
  costByYard: number | null;
  costByBag: number | null;
}

/**
 * Yield of mixed concrete per bag, in cubic feet (manufacturer typical —
 * Quikrete / Sakrete concrete mix).
 */
export const BAG_YIELD_CUFT: Record<BagSize, number> = {
  40: 0.3,
  50: 0.375,
  60: 0.45,
  80: 0.6,
};

const EMPTY: ConcreteResult = {
  valid: false,
  cubicFeet: 0,
  cubicYardsNet: 0,
  cubicYards: 0,
  bags: 0,
  bagSize: 80,
  premixWeightLbs: 0,
  costByYard: null,
  costByBag: null,
};

/** Compute concrete volume, bag count and live material cost. */
export function calculateConcrete(input: ConcreteInput): ConcreteResult {
  const { shape, length, width, depth, diameter, bagSize } = input;
  const count = Math.max(1, Math.floor(input.count || 1));
  const wastePct = Math.max(0, input.wastePct || 0);

  let cubicFeet: number;
  if (shape === 'round') {
    // Round footing / column / sonotube — cylinder volume.
    if (!(diameter > 0) || !(depth > 0)) {
      return { ...EMPTY, bagSize };
    }
    // π × r² × h (in³) ÷ 1728 → ft³
    const radius = diameter / 2;
    cubicFeet = ((Math.PI * radius * radius * depth) / 1728) * count;
  } else {
    if (!(length > 0) || !(width > 0) || !(depth > 0)) {
      return { ...EMPTY, bagSize };
    }
    // in³ → ft³ (÷1728) → yd³ (÷27)
    cubicFeet = ((length * width * depth) / 1728) * count;
  }
  const cubicYardsNet = cubicFeet / 27;
  const factor = 1 + wastePct / 100;
  const cubicYards = cubicYardsNet * factor;

  const yieldCuft = BAG_YIELD_CUFT[bagSize] ?? BAG_YIELD_CUFT[80];
  const bags = Math.ceil((cubicFeet * factor) / yieldCuft);
  const premixWeightLbs = bags * bagSize;

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
    bags,
    bagSize,
    premixWeightLbs,
    costByYard,
    costByBag,
  };
}

/** Format a number as USD currency. */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
}

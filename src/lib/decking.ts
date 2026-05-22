/**
 * decking.ts — Deck board and joist estimator with multi-section support.
 *
 * Footprint dimensions are decimal inches (the app's canonical unit). Each
 * section's boards run along its length; joists run across the width, spaced
 * on-center along the length. Multi-section sums treat every section as if
 * it were framed on its own — for a real L-shape some joists may overlap at
 * the corner, so the joist total is intentionally on the conservative side.
 */

export interface DeckSectionInput {
  length: number; // inches
  width: number; // inches
}

export interface DeckingInput {
  sections: DeckSectionInput[];
  boardWidth: number; // inches — deck board face width
  boardGap: number; // inches — gap between boards
  boardLength: number; // inches — length of boards purchased
  joistSpacing: number; // inches — on-center joist spacing
  /** Extra ordered for cuts and waste, percent. */
  wastePct: number;
  pricePerBoard?: number | null;
}

export interface DeckingResult {
  valid: boolean;
  sectionCount: number;
  deckAreaSqFt: number;
  boardRows: number; // total rows across all sections
  deckingLinearFt: number; // total decking run, with waste, in feet
  boardsNeeded: number; // physical boards to buy
  joistCount: number; // sum across sections (independent framing)
  joistLinearFt: number; // total joist material, in feet
  screws: number; // approximate deck screws
  cost: number | null;
}

/** Deck screws per square foot of decking (~2 per joist crossing). */
export const SCREWS_PER_SQFT = 3.5;

const EMPTY: DeckingResult = {
  valid: false,
  sectionCount: 0,
  deckAreaSqFt: 0,
  boardRows: 0,
  deckingLinearFt: 0,
  boardsNeeded: 0,
  joistCount: 0,
  joistLinearFt: 0,
  screws: 0,
  cost: null,
};

/** Compute deck board count, joist count and fasteners across all sections. */
export function calculateDecking(input: DeckingInput): DeckingResult {
  const { boardLength, joistSpacing } = input;
  const boardWidth = input.boardWidth > 0 ? input.boardWidth : 5.5;
  const boardGap = Math.max(0, input.boardGap || 0);
  const wastePct = Math.max(0, input.wastePct || 0);

  // At least one section must have both dimensions set.
  const validSections = (input.sections || []).filter(
    (s) => s.length > 0 && s.width > 0,
  );
  if (
    validSections.length === 0 ||
    !(boardLength > 0) ||
    !(joistSpacing > 0)
  ) {
    return { ...EMPTY };
  }

  let deckAreaSqIn = 0;
  let boardRowsTotal = 0;
  let deckingRunIn = 0;
  let joistCount = 0;
  let joistLengthIn = 0;

  for (const s of validSections) {
    deckAreaSqIn += s.length * s.width;
    const rows = Math.ceil(s.width / (boardWidth + boardGap));
    boardRowsTotal += rows;
    deckingRunIn += rows * s.length;
    const joists = Math.floor(s.length / joistSpacing) + 1;
    joistCount += joists;
    joistLengthIn += joists * s.width;
  }

  const deckAreaSqFt = deckAreaSqIn / 144;
  const factor = 1 + wastePct / 100;
  const deckingLinearFt = (deckingRunIn * factor) / 12;
  const boardsNeeded = Math.ceil((deckingRunIn * factor) / boardLength);
  const joistLinearFt = joistLengthIn / 12;
  const screws = Math.ceil(deckAreaSqFt * SCREWS_PER_SQFT);

  const cost =
    input.pricePerBoard != null && input.pricePerBoard > 0
      ? boardsNeeded * input.pricePerBoard
      : null;

  return {
    valid: true,
    sectionCount: validSections.length,
    deckAreaSqFt,
    boardRows: boardRowsTotal,
    deckingLinearFt,
    boardsNeeded,
    joistCount,
    joistLinearFt,
    screws,
    cost,
  };
}

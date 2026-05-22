/**
 * decking.ts — Deck board and joist estimator.
 *
 * Footprint dimensions are decimal inches (the app's canonical unit). Deck
 * boards run along the deck length; joists run across the width, spaced
 * on-center along the length.
 */

export interface DeckingInput {
  length: number; // inches — deck length (boards run this way)
  width: number; // inches — deck width
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
  deckAreaSqFt: number;
  boardRows: number; // rows of decking across the width
  deckingLinearFt: number; // total decking run, with waste, in feet
  boardsNeeded: number; // physical boards to buy
  joistCount: number;
  joistLinearFt: number; // total joist material, in feet
  screws: number; // approximate deck screws
  cost: number | null;
}

/** Deck screws per square foot of decking (~2 per joist crossing). */
export const SCREWS_PER_SQFT = 3.5;

const EMPTY: DeckingResult = {
  valid: false,
  deckAreaSqFt: 0,
  boardRows: 0,
  deckingLinearFt: 0,
  boardsNeeded: 0,
  joistCount: 0,
  joistLinearFt: 0,
  screws: 0,
  cost: null,
};

/** Compute deck board count, joist count and fasteners. */
export function calculateDecking(input: DeckingInput): DeckingResult {
  const { length, width, boardLength, joistSpacing } = input;
  const boardWidth = input.boardWidth > 0 ? input.boardWidth : 5.5;
  const boardGap = Math.max(0, input.boardGap || 0);
  const wastePct = Math.max(0, input.wastePct || 0);

  if (
    !(length > 0) ||
    !(width > 0) ||
    !(boardLength > 0) ||
    !(joistSpacing > 0)
  ) {
    return { ...EMPTY };
  }

  const deckAreaSqFt = (length / 12) * (width / 12);

  // Rows of decking needed to cover the width, board gap included.
  const boardRows = Math.ceil(width / (boardWidth + boardGap));

  // Total run of decking, plus waste, converted to feet.
  const deckingRunIn = boardRows * length;
  const factor = 1 + wastePct / 100;
  const deckingLinearFt = (deckingRunIn * factor) / 12;
  const boardsNeeded = Math.ceil((deckingRunIn * factor) / boardLength);

  // Joists run across the width, spaced on-center along the length.
  const joistCount = Math.floor(length / joistSpacing) + 1;
  const joistLinearFt = (joistCount * width) / 12;

  const screws = Math.ceil(deckAreaSqFt * SCREWS_PER_SQFT);

  const cost =
    input.pricePerBoard != null && input.pricePerBoard > 0
      ? boardsNeeded * input.pricePerBoard
      : null;

  return {
    valid: true,
    deckAreaSqFt,
    boardRows,
    deckingLinearFt,
    boardsNeeded,
    joistCount,
    joistLinearFt,
    screws,
    cost,
  };
}

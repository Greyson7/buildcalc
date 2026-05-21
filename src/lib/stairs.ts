/**
 * stairs.ts — Stair layout maths.
 *
 * All lengths in/out are decimal inches (the app's canonical unit).
 * Code checks reference IRC R311.7 residential stair limits.
 */
import { formatInches } from './imperial';

export interface StairInput {
  /** Floor-to-floor vertical height. */
  totalRise: number;
  /** Horizontal span available. 0 = derive run from the target tread depth. */
  totalRun: number;
  /** Desired riser height — drives how many risers are used. */
  targetRiser: number;
  /** Desired tread depth — used when no total run is given. */
  targetTread: number;
  /** Finished tread material thickness — drives the bottom stringer drop. */
  treadThickness: number;
}

export interface CodeCheck {
  label: string;
  pass: boolean;
  detail: string;
}

export interface StairResult {
  valid: boolean;
  totalRise: number; // inches — echoed back for the diagram
  numRisers: number;
  riserHeight: number; // inches — finished (floor to floor / risers)
  /**
   * Bottom riser notch cut on the stringer = riserHeight − treadThickness.
   * "Dropping the stringer" by one tread thickness keeps every *finished*
   * step equal once the treads are installed.
   */
  bottomRiserCut: number;
  numTreads: number;
  treadDepth: number; // inches
  totalRun: number; // inches (derived when not supplied)
  stringerLength: number; // inches — hypotenuse of rise & run
  angle: number; // degrees from horizontal
  checks: CodeCheck[];
}

/** IRC R311.7 residential limits. */
export const STAIR_CODE = {
  maxRiser: 7.75, // 7-3/4"
  minTread: 10, // 10"
  comfortLow: 24, // 2R + T ideal band
  comfortHigh: 25,
  angleLow: 30, // comfortable slope band (degrees)
  angleHigh: 37,
} as const;

const EMPTY: StairResult = {
  valid: false,
  totalRise: 0,
  numRisers: 0,
  riserHeight: 0,
  bottomRiserCut: 0,
  numTreads: 0,
  treadDepth: 0,
  totalRun: 0,
  stringerLength: 0,
  angle: 0,
  checks: [],
};

/**
 * Compute a full stair layout from a rise and target dimensions.
 *
 * Risers are whole units, so the exact riser height is `totalRise / n`.
 * The tread count is `risers − 1` (the top "tread" is the upper floor).
 */
export function calculateStairs(input: StairInput): StairResult {
  const { totalRise, targetRiser, targetTread } = input;
  const treadThickness = Math.max(0, input.treadThickness || 0);

  if (!(totalRise > 0) || !(targetRiser > 0)) return { ...EMPTY };

  const numRisers = Math.max(1, Math.round(totalRise / targetRiser));
  const riserHeight = totalRise / numRisers;
  const numTreads = Math.max(1, numRisers - 1);
  const bottomRiserCut = Math.max(0, riserHeight - treadThickness);

  let totalRun = input.totalRun;
  let treadDepth: number;
  if (totalRun > 0) {
    treadDepth = totalRun / numTreads;
  } else {
    treadDepth = targetTread > 0 ? targetTread : STAIR_CODE.minTread;
    totalRun = treadDepth * numTreads;
  }

  const stringerLength = Math.hypot(totalRise, totalRun);
  const angle = (Math.atan2(totalRise, totalRun) * 180) / Math.PI;
  const sum2RT = 2 * riserHeight + treadDepth;

  // Two IRC code limits, an always-satisfied uniformity note, and two
  // comfort guidelines. Code items are what fail a real inspection.
  const checks: CodeCheck[] = [
    {
      label: 'Max riser height',
      pass: riserHeight <= STAIR_CODE.maxRiser + 1e-6,
      detail: `Actual ${formatInches(riserHeight)} · IRC R311.7.5 limit 7-3/4"`,
    },
    {
      label: 'Min tread depth',
      pass: treadDepth >= STAIR_CODE.minTread - 1e-6,
      detail: `Actual ${formatInches(treadDepth)} · IRC R311.7.5 limit 10"`,
    },
    {
      label: 'Riser consistency',
      pass: true,
      detail: `All ${numRisers} risers equal · within the 3/8" code tolerance`,
    },
    {
      label: 'Comfort · 2 × riser + tread',
      pass: sum2RT >= STAIR_CODE.comfortLow && sum2RT <= STAIR_CODE.comfortHigh,
      detail: `${sum2RT.toFixed(2)}" · ideal range 24"–25"`,
    },
    {
      label: 'Comfort · stair slope',
      pass: angle >= STAIR_CODE.angleLow && angle <= STAIR_CODE.angleHigh,
      detail: `${angle.toFixed(1)}° · comfortable range 30°–37°`,
    },
  ];

  return {
    valid: true,
    totalRise,
    numRisers,
    riserHeight,
    bottomRiserCut,
    numTreads,
    treadDepth,
    totalRun,
    stringerLength,
    angle,
    checks,
  };
}

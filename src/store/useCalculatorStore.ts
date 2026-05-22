'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { BagSize } from '@/lib/concrete';

/**
 * Single client-side store for every calculator. Inputs are kept in the app's
 * canonical unit (decimal inches; price as plain numbers) so any module can
 * read another's values without conversion. Persisted to localStorage so a
 * job-site reload — online or offline — never loses the user's numbers.
 *
 * No web-server APIs are touched: this is Capacitor-safe as-is.
 */

export interface StairState {
  totalRise: number; // inches
  totalRun: number; // inches (0 = derive from target tread)
  targetRiser: number; // inches
  targetTread: number; // inches
  treadThickness: number; // inches — finished tread material
}

export interface ConcreteState {
  length: number; // inches
  width: number; // inches
  depth: number; // inches
  count: number;
  wastePct: number;
  bagSize: BagSize;
  pricePerYard: number | null;
  pricePerBag: number | null;
}

export interface RoofingState {
  length: number; // inches — footprint length the roof covers
  width: number; // inches — footprint width
  pitch: number; // rise per 12" of run
  wastePct: number;
  pricePerSquare: number | null;
}

export interface DeckingState {
  length: number; // inches — deck length (boards run this way)
  width: number; // inches — deck width
  boardWidth: number; // inches — deck board face width
  boardGap: number; // inches — gap between boards
  boardLength: number; // inches — length of boards purchased
  joistSpacing: number; // inches — on-center joist spacing
  wastePct: number;
  pricePerBoard: number | null;
}

export interface GravelState {
  length: number; // inches
  width: number; // inches
  depth: number; // inches
  wastePct: number;
  pricePerTon: number | null;
}

export interface PaintState {
  length: number; // inches — room length
  width: number; // inches — room width
  height: number; // inches — ceiling height
  coats: number;
  doors: number;
  windows: number;
  coverage: number; // square feet covered per gallon
  pricePerGallon: number | null;
}

export interface DrywallState {
  length: number; // inches — room length
  width: number; // inches — room width
  height: number; // inches — ceiling height
  includeCeiling: boolean;
  sheetSqFt: number; // area of one drywall sheet
  wastePct: number;
  pricePerSheet: number | null;
}

export interface AreaState {
  length: number; // inches
  width: number; // inches
  count: number; // identical areas
}

export interface MulchState {
  length: number; // inches
  width: number; // inches
  depth: number; // inches
  wastePct: number;
  bagSize: number; // cubic feet per bag (2 cu ft retail, 3 cu ft jumbo)
  pricePerYard: number | null;
  pricePerBag: number | null;
}

interface CalculatorStore {
  stairs: StairState;
  concrete: ConcreteState;
  roofing: RoofingState;
  decking: DeckingState;
  gravel: GravelState;
  paint: PaintState;
  drywall: DrywallState;
  area: AreaState;
  mulch: MulchState;
  setStairs: (patch: Partial<StairState>) => void;
  setConcrete: (patch: Partial<ConcreteState>) => void;
  setRoofing: (patch: Partial<RoofingState>) => void;
  setDecking: (patch: Partial<DeckingState>) => void;
  setGravel: (patch: Partial<GravelState>) => void;
  setPaint: (patch: Partial<PaintState>) => void;
  setDrywall: (patch: Partial<DrywallState>) => void;
  setArea: (patch: Partial<AreaState>) => void;
  setMulch: (patch: Partial<MulchState>) => void;
  resetStairs: () => void;
  resetConcrete: () => void;
  resetRoofing: () => void;
  resetDecking: () => void;
  resetGravel: () => void;
  resetPaint: () => void;
  resetDrywall: () => void;
  resetArea: () => void;
  resetMulch: () => void;
}

export const STAIR_DEFAULTS: StairState = {
  totalRise: 109, // 9' 1"
  totalRun: 0,
  targetRiser: 7.5, // 7-1/2"
  targetTread: 10.5, // 10-1/2"
  treadThickness: 1, // 1"
};

export const CONCRETE_DEFAULTS: ConcreteState = {
  length: 240, // 20'
  width: 120, // 10'
  depth: 4, // 4" — depth defaults to inches in the UI
  count: 1,
  wastePct: 5, // industry-standard starting allowance
  bagSize: 80,
  pricePerYard: null,
  pricePerBag: null,
};

export const ROOFING_DEFAULTS: RoofingState = {
  length: 480, // 40'
  width: 360, // 30'
  pitch: 6, // 6/12 — a common residential pitch
  wastePct: 12, // typical shingle waste allowance
  pricePerSquare: null,
};

export const DECKING_DEFAULTS: DeckingState = {
  length: 192, // 16'
  width: 144, // 12'
  boardWidth: 5.5, // a nominal 6" deck board is 5-1/2" wide
  boardGap: 0.1875, // 3/16" spacing
  boardLength: 192, // 16' boards
  joistSpacing: 16, // 16" on-center
  wastePct: 10, // typical decking waste allowance
  pricePerBoard: null,
};

export const GRAVEL_DEFAULTS: GravelState = {
  length: 240, // 20'
  width: 120, // 10'
  depth: 3, // 3" — depth defaults to inches in the UI
  wastePct: 10,
  pricePerTon: null,
};

export const PAINT_DEFAULTS: PaintState = {
  length: 144, // 12'
  width: 144, // 12'
  height: 96, // 8' ceiling
  coats: 2,
  doors: 1,
  windows: 2,
  coverage: 350, // square feet per gallon — typical for one coat
  pricePerGallon: null,
};

export const DRYWALL_DEFAULTS: DrywallState = {
  length: 144, // 12'
  width: 144, // 12'
  height: 96, // 8' ceiling
  includeCeiling: true,
  sheetSqFt: 32, // a 4x8 sheet
  wastePct: 10,
  pricePerSheet: null,
};

export const AREA_DEFAULTS: AreaState = {
  length: 144, // 12'
  width: 120, // 10'
  count: 1,
};

export const MULCH_DEFAULTS: MulchState = {
  length: 240, // 20'
  width: 120, // 10'
  depth: 3, // 3" — typical mulch depth (2–4")
  wastePct: 5,
  bagSize: 2, // 2 cu ft — standard retail bag
  pricePerYard: null,
  pricePerBag: null,
};

// localStorage is unavailable during the static build — fall back to a no-op.
const safeStorage = createJSONStorage(() =>
  typeof window !== 'undefined'
    ? window.localStorage
    : {
        getItem: () => null,
        setItem: () => undefined,
        removeItem: () => undefined,
      },
);

export const useCalculatorStore = create<CalculatorStore>()(
  persist(
    (set) => ({
      stairs: { ...STAIR_DEFAULTS },
      concrete: { ...CONCRETE_DEFAULTS },
      roofing: { ...ROOFING_DEFAULTS },
      decking: { ...DECKING_DEFAULTS },
      gravel: { ...GRAVEL_DEFAULTS },
      paint: { ...PAINT_DEFAULTS },
      drywall: { ...DRYWALL_DEFAULTS },
      area: { ...AREA_DEFAULTS },
      mulch: { ...MULCH_DEFAULTS },
      setStairs: (patch) => set((s) => ({ stairs: { ...s.stairs, ...patch } })),
      setConcrete: (patch) =>
        set((s) => ({ concrete: { ...s.concrete, ...patch } })),
      setRoofing: (patch) =>
        set((s) => ({ roofing: { ...s.roofing, ...patch } })),
      setDecking: (patch) =>
        set((s) => ({ decking: { ...s.decking, ...patch } })),
      setGravel: (patch) => set((s) => ({ gravel: { ...s.gravel, ...patch } })),
      setPaint: (patch) => set((s) => ({ paint: { ...s.paint, ...patch } })),
      setDrywall: (patch) =>
        set((s) => ({ drywall: { ...s.drywall, ...patch } })),
      setArea: (patch) => set((s) => ({ area: { ...s.area, ...patch } })),
      setMulch: (patch) => set((s) => ({ mulch: { ...s.mulch, ...patch } })),
      resetStairs: () => set({ stairs: { ...STAIR_DEFAULTS } }),
      resetConcrete: () => set({ concrete: { ...CONCRETE_DEFAULTS } }),
      resetRoofing: () => set({ roofing: { ...ROOFING_DEFAULTS } }),
      resetDecking: () => set({ decking: { ...DECKING_DEFAULTS } }),
      resetGravel: () => set({ gravel: { ...GRAVEL_DEFAULTS } }),
      resetPaint: () => set({ paint: { ...PAINT_DEFAULTS } }),
      resetDrywall: () => set({ drywall: { ...DRYWALL_DEFAULTS } }),
      resetArea: () => set({ area: { ...AREA_DEFAULTS } }),
      resetMulch: () => set({ mulch: { ...MULCH_DEFAULTS } }),
    }),
    {
      name: 'buildcalc-state',
      version: 2,
      storage: safeStorage,
      // Deep-merge so a future field added to a nested slice inherits its
      // default instead of coming back undefined from older saved state.
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<CalculatorStore>;
        return {
          ...current,
          stairs: { ...current.stairs, ...(p.stairs ?? {}) },
          concrete: { ...current.concrete, ...(p.concrete ?? {}) },
          roofing: { ...current.roofing, ...(p.roofing ?? {}) },
          decking: { ...current.decking, ...(p.decking ?? {}) },
          gravel: { ...current.gravel, ...(p.gravel ?? {}) },
          paint: { ...current.paint, ...(p.paint ?? {}) },
          drywall: { ...current.drywall, ...(p.drywall ?? {}) },
          area: { ...current.area, ...(p.area ?? {}) },
          mulch: { ...current.mulch, ...(p.mulch ?? {}) },
        };
      },
      // Rehydrate manually after mount (see ClientBoot) so the first client
      // render matches the static HTML and React never warns.
      skipHydration: true,
    },
  ),
);

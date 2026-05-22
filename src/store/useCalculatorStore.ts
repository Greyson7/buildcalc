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

interface CalculatorStore {
  stairs: StairState;
  concrete: ConcreteState;
  roofing: RoofingState;
  decking: DeckingState;
  setStairs: (patch: Partial<StairState>) => void;
  setConcrete: (patch: Partial<ConcreteState>) => void;
  setRoofing: (patch: Partial<RoofingState>) => void;
  setDecking: (patch: Partial<DeckingState>) => void;
  resetStairs: () => void;
  resetConcrete: () => void;
  resetRoofing: () => void;
  resetDecking: () => void;
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
      setStairs: (patch) => set((s) => ({ stairs: { ...s.stairs, ...patch } })),
      setConcrete: (patch) =>
        set((s) => ({ concrete: { ...s.concrete, ...patch } })),
      setRoofing: (patch) =>
        set((s) => ({ roofing: { ...s.roofing, ...patch } })),
      setDecking: (patch) =>
        set((s) => ({ decking: { ...s.decking, ...patch } })),
      resetStairs: () => set({ stairs: { ...STAIR_DEFAULTS } }),
      resetConcrete: () => set({ concrete: { ...CONCRETE_DEFAULTS } }),
      resetRoofing: () => set({ roofing: { ...ROOFING_DEFAULTS } }),
      resetDecking: () => set({ decking: { ...DECKING_DEFAULTS } }),
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
        };
      },
      // Rehydrate manually after mount (see ClientBoot) so the first client
      // render matches the static HTML and React never warns.
      skipHydration: true,
    },
  ),
);

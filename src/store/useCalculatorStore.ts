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

interface CalculatorStore {
  stairs: StairState;
  concrete: ConcreteState;
  setStairs: (patch: Partial<StairState>) => void;
  setConcrete: (patch: Partial<ConcreteState>) => void;
  resetStairs: () => void;
  resetConcrete: () => void;
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
      setStairs: (patch) => set((s) => ({ stairs: { ...s.stairs, ...patch } })),
      setConcrete: (patch) =>
        set((s) => ({ concrete: { ...s.concrete, ...patch } })),
      resetStairs: () => set({ stairs: { ...STAIR_DEFAULTS } }),
      resetConcrete: () => set({ concrete: { ...CONCRETE_DEFAULTS } }),
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
        };
      },
      // Rehydrate manually after mount (see ClientBoot) so the first client
      // render matches the static HTML and React never warns.
      skipHydration: true,
    },
  ),
);

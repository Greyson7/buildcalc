import type { Config } from 'tailwindcss';

/**
 * Job-site palette. Dark by default (no toggle) — high contrast so it stays
 * readable in direct sunlight, with a safety-orange primary action colour
 * and a "blueprint blue" for diagram measurement lines.
 */
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#f1f4f8', dim: '#9aa7b8', faint: '#5f6b7d' },
        surface: { 0: '#0c0f14', 1: '#13171f', 2: '#1c222d', 3: '#252d3a' },
        line: '#2a3340',
        brand: { DEFAULT: '#ff7a1a', light: '#ff9242', dark: '#e0610a' },
        blueprint: '#3b9eff',
        ok: '#34d399',
        warn: '#fbbf24',
        bad: '#f87171',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      // Minimum touch target mandated by the mobile-strict UI spec.
      minWidth: { touch: '48px' },
      minHeight: { touch: '48px' },
      borderRadius: { card: '1.1rem', pill: '999px' },
      boxShadow: {
        lift: '0 8px 28px -8px rgba(0,0,0,0.6)',
        glow: '0 0 0 1px rgba(255,122,26,0.4), 0 6px 22px -6px rgba(255,122,26,0.35)',
      },
      keyframes: {
        'pop-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: { 'pop-in': 'pop-in 0.18s ease-out' },
    },
  },
  plugins: [],
};

export default config;

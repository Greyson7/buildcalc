'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRightIcon,
  ConcreteIcon,
  QuickMathIcon,
  StairsIcon,
} from '@/components/icons';
import { InstallPrompt } from '@/components/InstallPrompt';

const MODULES = [
  {
    href: '/stairs',
    title: 'Stair Calculator',
    desc: 'Risers, treads, stringer cut list and a live, code-checked diagram.',
    Icon: StairsIcon,
  },
  {
    href: '/concrete',
    title: 'Concrete Estimator',
    desc: 'Cubic yards, bag counts and live material cost for any pour.',
    Icon: ConcreteIcon,
  },
  {
    href: '/math',
    title: 'Quick Math',
    desc: 'Fraction-accurate dimensional math and fast job-site conversions.',
    Icon: QuickMathIcon,
  },
];

const FEATURES = [
  ['Offline', 'No signal needed'],
  ['1/16" precise', 'True fractions'],
  ['Code-aware', 'IRC checks'],
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="pt-2">
        <h1 className="text-[26px] font-extrabold leading-tight tracking-tight">
          Build it right,
          <br />
          <span className="text-brand">the first time.</span>
        </h1>
        <p className="mt-2 text-sm text-ink-dim">
          Fast, modern construction math — fractional inputs, live diagrams and
          building-code checks. Works fully offline on the job site.
        </p>
      </section>

      <section className="space-y-3">
        {MODULES.map((m, i) => (
          <motion.div
            key={m.href}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.05 + i * 0.07, ease: 'easeOut' }}
          >
            <Link
              href={m.href}
              className="tap card flex items-center gap-4 p-4 active:bg-surface-2"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand/10 text-brand">
                <m.Icon className="h-7 w-7" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-bold">{m.title}</span>
                <span className="block text-sm text-ink-dim">{m.desc}</span>
              </span>
              <ArrowRightIcon className="h-5 w-5 shrink-0 text-ink-faint" />
            </Link>
          </motion.div>
        ))}
      </section>

      <section className="grid grid-cols-3 gap-2">
        {FEATURES.map(([title, sub]) => (
          <div key={title} className="card px-2 py-3 text-center">
            <div className="text-sm font-bold text-brand-light">{title}</div>
            <div className="text-[11px] text-ink-faint">{sub}</div>
          </div>
        ))}
      </section>

      <InstallPrompt />

      <p className="px-1 text-center text-xs text-ink-faint">
        BuildCalc runs entirely on your device. Add it to your home screen for a
        full-screen, offline app.
      </p>
    </div>
  );
}

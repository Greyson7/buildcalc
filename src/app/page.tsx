'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRightIcon,
  ConcreteIcon,
  DeckIcon,
  QuickMathIcon,
  RoofIcon,
  StairsIcon,
} from '@/components/icons';
import { InstallPrompt } from '@/components/InstallPrompt';
import { SiteFooter } from '@/components/SiteFooter';

const MODULES = [
  {
    href: '/stairs',
    title: 'Stair Calculator',
    desc: 'Even risers, the right tread depth and a stringer cut list — checked against code.',
    Icon: StairsIcon,
  },
  {
    href: '/concrete',
    title: 'Concrete Estimator',
    desc: 'How much to order — cubic yards, bags and cost for slabs, footings and posts.',
    Icon: ConcreteIcon,
  },
  {
    href: '/math',
    title: 'Quick Math',
    desc: 'Add and subtract feet, inches and fractions, plus instant unit conversions.',
    Icon: QuickMathIcon,
  },
];

const COMING_SOON = [
  { title: 'Roofing', Icon: RoofIcon },
  { title: 'Decking', Icon: DeckIcon },
];

const FEATURES = [
  ['Free', 'No account'],
  ['No install', 'Runs in browser'],
  ['Offline', 'No signal needed'],
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="pt-2">
        <h1 className="text-[26px] font-extrabold leading-tight tracking-tight">
          The math your phone
          <br />
          <span className="text-brand">calculator can&apos;t do.</span>
        </h1>
        <p className="mt-2 text-sm text-ink-dim">
          Add feet, inches and fractions, lay out stairs to code, size up a
          concrete pour — free, right in your browser. No app to install, no
          sign-up.
        </p>
      </section>

      <InstallPrompt />

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

        {/* Roadmap — active development signal, not yet tappable */}
        <div className="pt-1">
          <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            More on the way
          </p>
          <div className="grid grid-cols-2 gap-3">
            {COMING_SOON.map((m) => (
              <div
                key={m.title}
                aria-disabled="true"
                className="card flex items-center gap-3 p-3.5 opacity-55"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-ink-faint">
                  <m.Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-bold">{m.title}</div>
                  <span className="mt-0.5 inline-block rounded-pill bg-surface-3 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-ink-dim">
                    Coming soon
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card p-4">
        <h2 className="text-base font-extrabold tracking-tight">
          Why not just use a phone calculator?
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">
          A phone calculator works in plain decimals. It can&apos;t add
          5 ft 7 in to 2 ft 10-1/2 in, tell you how many 80 lb bags fill a
          footing, or flag a stair riser that fails code. BuildCalc is built for
          the measurements construction actually uses — feet, inches and
          sixteenths — so the numbers come out right the first time.
        </p>
      </section>

      <section className="grid grid-cols-3 gap-2">
        {FEATURES.map(([title, sub]) => (
          <div key={title} className="card px-2 py-3 text-center">
            <div className="text-sm font-bold text-brand-light">{title}</div>
            <div className="text-[11px] text-ink-faint">{sub}</div>
          </div>
        ))}
      </section>

      <SiteFooter />
    </div>
  );
}

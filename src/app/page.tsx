'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRightIcon,
  ChatIcon,
  ConcreteIcon,
  DeckIcon,
  QuickMathIcon,
  RoofIcon,
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

const COMING_SOON = [
  { title: 'Roofing', Icon: RoofIcon },
  { title: 'Decking', Icon: DeckIcon },
];

const FEATURES = [
  ['Offline', 'No signal needed'],
  ['1/16" precise', 'True fractions'],
  ['Code-aware', 'IRC checks'],
];

// A Google Form URL or a mailto: — override with NEXT_PUBLIC_FEEDBACK_URL.
const FEEDBACK_URL =
  process.env.NEXT_PUBLIC_FEEDBACK_URL ||
  'mailto:greyson.goodwin12@gmail.com?subject=BuildCalc%20Feedback';

export default function HomePage() {
  const feedbackExternal = !FEEDBACK_URL.startsWith('mailto:');

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

      <section className="grid grid-cols-3 gap-2">
        {FEATURES.map(([title, sub]) => (
          <div key={title} className="card px-2 py-3 text-center">
            <div className="text-sm font-bold text-brand-light">{title}</div>
            <div className="text-[11px] text-ink-faint">{sub}</div>
          </div>
        ))}
      </section>

      <footer className="space-y-3 pt-1 text-center">
        <a
          href={FEEDBACK_URL}
          {...(feedbackExternal
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          className="tap inline-flex items-center gap-2 rounded-pill border border-line px-4 py-2 text-sm font-semibold text-ink-dim active:bg-surface-2"
        >
          <ChatIcon className="h-4 w-4" />
          Feedback / report a bug
        </a>
        <p className="px-1 text-xs text-ink-faint">
          BuildCalc runs entirely on your device. Add it to your home screen for
          a full-screen, offline app.
        </p>
      </footer>
    </div>
  );
}

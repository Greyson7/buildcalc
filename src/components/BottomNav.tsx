'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AreaIcon,
  ConcreteIcon,
  DeckIcon,
  DrywallIcon,
  GravelIcon,
  HomeIcon,
  QuickMathIcon,
  RollerIcon,
  RoofIcon,
  StairsIcon,
} from './icons';

const TABS = [
  { href: '/', label: 'Home', Icon: HomeIcon },
  { href: '/math', label: 'Math', Icon: QuickMathIcon },
  { href: '/stairs', label: 'Stairs', Icon: StairsIcon },
  { href: '/concrete', label: 'Concrete', Icon: ConcreteIcon },
  { href: '/roofing', label: 'Roofing', Icon: RoofIcon },
  { href: '/decking', label: 'Decking', Icon: DeckIcon },
  { href: '/square-footage', label: 'Area', Icon: AreaIcon },
  { href: '/gravel', label: 'Gravel', Icon: GravelIcon },
  { href: '/drywall', label: 'Drywall', Icon: DrywallIcon },
  { href: '/paint', label: 'Paint', Icon: RollerIcon },
] as const;

/** Strip a trailing slash so `/stairs/` matches the `/stairs` tab href. */
function normalize(path: string): string {
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

/**
 * Persistent bottom tab bar. Lives in the thumb zone, full-width touch
 * targets, no hover dependency — built for one-handed use on a phone.
 */
export function BottomNav() {
  const pathname = normalize(usePathname() || '/');

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface-1/95 backdrop-blur-md"
      style={{ paddingBottom: 'var(--safe-bottom)' }}
    >
      <div className="mx-auto flex max-w-3xl items-stretch overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className="tap flex shrink-0 grow basis-[4.25rem] flex-col items-center justify-center gap-1 py-2.5"
            >
              <Icon
                className={`h-6 w-6 ${active ? 'text-brand' : 'text-ink-faint'}`}
              />
              <span
                className={`text-[11px] font-semibold ${
                  active ? 'text-brand' : 'text-ink-faint'
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

'use client';

import { useCallback, useEffect, useState } from 'react';
import { BrandMark, CloseIcon, ShareIcon } from './icons';

/** The `beforeinstallprompt` event — typed minimally for what we use. */
interface InstallEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'buildcalc-install-dismissed';

/**
 * A polite, one-time "Add to Home Screen" banner.
 *
 *  - Chromium: uses the native `beforeinstallprompt` → one-tap Install.
 *  - iOS Safari: no programmatic prompt, so it shows the Share-sheet steps.
 *  - Hidden once installed or dismissed (remembered in localStorage).
 */
export function InstallPrompt() {
  const [deferred, setDeferred] = useState<InstallEvent | null>(null);
  const [mode, setMode] = useState<'none' | 'prompt' | 'ios'>('none');

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* private mode — fine, banner just reappears next visit */
    }
    setMode('none');
  }, []);

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as { standalone?: boolean }).standalone === true;
    if (standalone) return;

    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
    } catch {
      /* ignore */
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as InstallEvent);
      setMode('prompt');
    };
    const onInstalled = () => dismiss();

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);

    // iOS gets no beforeinstallprompt — show manual steps instead.
    if (/iphone|ipad|ipod/i.test(navigator.userAgent)) setMode('ios');

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, [dismiss]);

  if (mode === 'none') return null;

  return (
    <section className="card flex items-center gap-3 border-brand/30 bg-brand/10 p-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand">
        {mode === 'ios' ? (
          <ShareIcon className="h-5 w-5" />
        ) : (
          <BrandMark className="h-4 w-4" />
        )}
      </span>

      <div className="min-w-0 flex-1">
        <div className="text-sm font-bold">Add BuildCalc to your home screen</div>
        <div className="text-xs text-ink-dim">
          {mode === 'ios'
            ? 'Tap the Share button, then “Add to Home Screen”.'
            : 'Full-screen and fully offline — installs in a tap.'}
        </div>
      </div>

      {mode === 'prompt' && (
        <button
          type="button"
          onClick={async () => {
            await deferred?.prompt();
            await deferred?.userChoice;
            dismiss();
          }}
          className="tap shrink-0 rounded-xl bg-brand px-3.5 text-sm font-bold text-surface-0 active:bg-brand-dark"
        >
          Install
        </button>
      )}

      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-ink-faint active:bg-surface-2"
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </section>
  );
}

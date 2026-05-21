'use client';

import { useEffect, useState } from 'react';

/** The `beforeinstallprompt` event — typed minimally for what we use. */
interface InstallEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * Shows an "Install" card only when the browser reports the PWA is
 * installable. Renders nothing otherwise (e.g. already installed, or iOS,
 * which has no programmatic prompt).
 */
export function InstallPrompt() {
  const [deferred, setDeferred] = useState<InstallEvent | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as InstallEvent);
    };
    const onInstalled = () => setDone(true);
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (!deferred || done) return null;

  return (
    <section className="card flex items-center gap-3 border-brand/30 bg-brand/10 p-4">
      <div className="min-w-0 flex-1">
        <div className="text-sm font-bold">Install BuildCalc</div>
        <div className="text-xs text-ink-dim">
          Add it to your home screen — full-screen and offline.
        </div>
      </div>
      <button
        type="button"
        onClick={async () => {
          await deferred.prompt();
          await deferred.userChoice;
          setDeferred(null);
        }}
        className="tap rounded-2xl bg-brand px-4 py-2 text-sm font-bold text-surface-0"
      >
        Install
      </button>
    </section>
  );
}

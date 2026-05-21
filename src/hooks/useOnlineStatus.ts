'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks browser connectivity. Starts optimistically `true` so the server /
 * static render and the first client render agree (no hydration mismatch),
 * then corrects on mount and on every online/offline event.
 */
export function useOnlineStatus(): boolean {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener('online', sync);
    window.addEventListener('offline', sync);
    return () => {
      window.removeEventListener('online', sync);
      window.removeEventListener('offline', sync);
    };
  }, []);

  return online;
}

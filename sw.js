/*
 * BuildCalc service worker — offline-first.
 *
 * The whole calculator runs client-side, so once the shell + JS bundles are
 * cached the app is fully usable on a job site with zero cellular service.
 *
 * The SW is served from <base>/sw.js, so its own path yields the base path —
 * this keeps it correct whether deployed at "/" or at a GitHub Pages subpath.
 */
const VERSION = 'v2';
const BASE = self.location.pathname.replace(/\/sw\.js$/, '');
const CACHE = `buildcalc-${VERSION}`;

const APP_SHELL = [
  `${BASE}/`,
  `${BASE}/stairs/`,
  `${BASE}/concrete/`,
  `${BASE}/math/`,
  `${BASE}/manifest.webmanifest`,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
      // Never let a single missing asset block activation.
      .catch(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Page navigations: network-first so a fresh deploy lands, with a cached
  // fallback (and finally the app shell) when offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
          return res;
        })
        .catch(() =>
          caches
            .match(request)
            .then((hit) => hit || caches.match(`${BASE}/`)),
        ),
    );
    return;
  }

  // Static assets (JS/CSS/fonts/images): cache-first, populate on miss.
  event.respondWith(
    caches.match(request).then(
      (hit) =>
        hit ||
        fetch(request)
          .then((res) => {
            if (res && res.ok && res.type === 'basic') {
              const copy = res.clone();
              caches.open(CACHE).then((cache) => cache.put(request, copy));
            }
            return res;
          })
          .catch(() => hit),
    ),
  );
});

// Lets the page activate a waiting SW immediately after an update.
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

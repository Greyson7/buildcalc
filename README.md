# BuildCalc

A modern, offline-first **builder & construction calculator** — stair layouts,
concrete volume, and a precise imperial (feet / inches / fraction) input system.
Built as a mobile-first PWA that also wraps cleanly into a native iOS/Android
app via Capacitor.

## Why it's different

No skeuomorphic button grid. BuildCalc is a clean web tool: intuitive forms,
fraction chips, live SVG diagrams, and scrollable result cards. Dark by default
for sunlight readability on the job site.

## Tech

- **Next.js 15** (App Router, fully static export)
- **Tailwind CSS** — job-site dark palette
- **framer-motion** — transitions
- **Zustand** — client-only state, persisted to `localStorage`
- **PWA** — service worker, offline-first; all math runs on the client

## Develop

```bash
npm install
npm run dev         # http://localhost:3000
```

## Build

```bash
npm run build       # static site -> ./out
```

## Deploy

The static export is published to GitHub Pages from the `gh-pages` branch:

```bash
# Linux/macOS
NEXT_PUBLIC_BASE_PATH=/buildcalc npm run build
# Windows PowerShell
$env:NEXT_PUBLIC_BASE_PATH = '/buildcalc'; npm run build
```

`NEXT_PUBLIC_BASE_PATH` is set to the repo name so asset URLs resolve under
the project Pages path. The contents of `out/` are then pushed to the
`gh-pages` branch, which Pages serves.

## Capacitor (native roadmap)

The build is a self-contained static bundle with zero server dependency, so the
`out/` directory drops straight into a Capacitor `webDir`. State is client-only
and no web-server-specific APIs are used.

---

`unit-converter.html` in the repo root is the original single-file prototype,
kept for reference. The app above supersedes it.

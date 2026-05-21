# BuildCalc

**Live: https://buildprocalc.com**

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

## Configuration

Build-time environment variables — see [`.env.example`](.env.example):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BASE_PATH` | `/buildcalc` for a Pages project site; empty for a domain root |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for `<link canonical>` / Open Graph |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Enables deferred, cookieless analytics when set |
| `NEXT_PUBLIC_FEEDBACK_URL` | Google Form URL or `mailto:` for the feedback link |

## Deploy

The static export is published to GitHub Pages from the `gh-pages` branch and
served at the custom domain **buildprocalc.com** (apex). `public/CNAME` keeps
the domain bound, and the in-code defaults are production-correct, so:

```bash
npm run build              # production build -> ./out
# then publish ./out to the gh-pages branch
```

DNS: the apex `A` records point at GitHub Pages (185.199.108–111.153,
Cloudflare proxy off) and `www` is a `CNAME` to `greyson7.github.io`.

The service worker derives its scope from its own URL and the web manifest
uses relative paths, so the same build also works at a subpath if
`NEXT_PUBLIC_BASE_PATH` is ever set.

## Capacitor (native roadmap)

The build is a self-contained static bundle with zero server dependency, so the
`out/` directory drops straight into a Capacitor `webDir`. State is client-only
and no web-server-specific APIs are used.

---

`unit-converter.html` in the repo root is the original single-file prototype,
kept for reference. The app above supersedes it.

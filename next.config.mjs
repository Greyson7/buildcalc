// Base path lets the same build serve from a GitHub Pages project URL
// (https://user.github.io/<repo>/) or from the root of a custom domain /
// Capacitor WebView. The deploy workflow sets NEXT_PUBLIC_BASE_PATH; local
// dev leaves it empty so the app serves from "/".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Fully static bundle — no Node server at runtime. This is what makes the
  // app deployable to GitHub Pages AND wrappable by Capacitor unchanged.
  output: 'export',

  // GitHub Pages serves directories, so emit /stairs/index.html etc.
  trailingSlash: true,

  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,

  // next/image optimisation needs a server; disable it for the static export.
  images: { unoptimized: true },
};

export default nextConfig;

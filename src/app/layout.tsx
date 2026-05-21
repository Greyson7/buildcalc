import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@/components/Analytics';
import { AppHeader } from '@/components/AppHeader';
import { BottomNav } from '@/components/BottomNav';
import { ClientBoot } from '@/components/ClientBoot';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Next does not prefix basePath onto metadata icon/manifest hrefs, so do it
// here. Empty in local dev; "/buildcalc" for the GitHub Pages build.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Canonical origin for metadata. Defaults to the production domain;
// override with NEXT_PUBLIC_SITE_URL for staging builds.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://buildprocalc.com';

const description =
  'Offline-first stair, concrete and imperial calculators. A fast, modern job-site tool — not a skeuomorphic button grid.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'BuildCalc — Construction Calculator',
  description,
  applicationName: 'BuildCalc',
  manifest: `${basePath}/manifest.webmanifest`,
  alternates: { canonical: '/' },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'BuildCalc',
  },
  openGraph: {
    type: 'website',
    siteName: 'BuildCalc',
    title: 'BuildCalc — Construction Calculator',
    description,
    url: '/',
  },
  icons: {
    icon: `${basePath}/favicon.png`,
    apple: `${basePath}/apple-touch-icon.png`,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#0c0f14',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  // Locks the app like a native screen — no pinch / double-tap zoom.
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="min-h-[100dvh]">
        <ClientBoot />
        <Analytics />
        <AppHeader />
        <main
          className="mx-auto w-full max-w-3xl px-4 pt-4"
          style={{
            paddingBottom: 'calc(var(--nav-h) + var(--safe-bottom) + 16px)',
          }}
        >
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}

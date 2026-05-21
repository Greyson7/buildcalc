import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppHeader } from '@/components/AppHeader';
import { BottomNav } from '@/components/BottomNav';
import { ClientBoot } from '@/components/ClientBoot';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BuildCalc — Construction Calculator',
  description:
    'Offline-first stair, concrete and imperial calculators. A fast, modern job-site tool — not a skeuomorphic button grid.',
  applicationName: 'BuildCalc',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'BuildCalc',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
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

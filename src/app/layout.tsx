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
  'Free online construction calculators for stairs, concrete and feet-inch-fraction math. Works right in your browser — no app, no sign-up, works offline.';

// Google Search Console verification token (URL-prefix property method).
// Leave unset when verifying via a DNS TXT record instead.
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

// Structured data describing the app — helps search engines and rich results.
const webAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'BuildCalc',
  url: siteUrl,
  description,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'BuildCalc — Free Construction Calculator',
    template: '%s · BuildCalc',
  },
  description,
  applicationName: 'BuildCalc',
  manifest: `${basePath}/manifest.webmanifest`,
  alternates: { canonical: '/' },
  verification: gscVerification ? { google: gscVerification } : undefined,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'BuildCalc',
  },
  openGraph: {
    type: 'website',
    siteName: 'BuildCalc',
    title: 'BuildCalc — Free Construction Calculator',
    description,
    url: '/',
    images: [
      {
        url: `${basePath}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'BuildCalc — free construction calculators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuildCalc — Free Construction Calculator',
    description,
    images: [`${basePath}/og-image.png`],
  },
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: 'any' },
      { url: `${basePath}/favicon.png`, type: 'image/png', sizes: '96x96' },
    ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
        />
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

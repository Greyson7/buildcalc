import type { Metadata } from 'next';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How BuildCalc handles your information — no account, no personal data collected, privacy-first cookieless analytics.',
  alternates: { canonical: '/privacy/' },
};

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: '1. Overview',
    p: [
      `This Privacy Policy explains how BuildCalc (buildprocalc.com) handles information when you use the website and its calculators (the "Service"). BuildCalc is built to be privacy-respecting: it does not require an account and collects no personal information from you.`,
    ],
  },
  {
    h: '2. Information You Enter',
    p: [
      `The calculators run entirely in your browser. The dimensions, prices, and other values you enter are processed on your device and saved only in your browser's local storage, on your device, so your inputs are still there when you return. These values are never transmitted to or stored by BuildCalc.`,
    ],
  },
  {
    h: '3. Analytics',
    p: [
      `BuildCalc uses Plausible Analytics, a privacy-focused analytics service, to understand general, aggregate use of the Service. Plausible does not use cookies and does not collect or store personal information. It records anonymous, aggregated data such as page views, approximate country, device type, and referring site.`,
      `Because no cookies and no personal data are used, no cookie-consent banner is required.`,
    ],
  },
  {
    h: '4. Affiliate Links',
    p: [
      `The Service contains affiliate links to third-party retailers, including Amazon. When you click an affiliate link, the destination site may set its own cookies and collect information in accordance with its own privacy policy. BuildCalc does not control, and is not responsible for, the data practices of those third parties.`,
    ],
  },
  {
    h: '5. Offline Storage',
    p: [
      `To work offline, the Service uses a service worker that caches its files on your device. This cache holds only the app's own files and your local settings — no personal information — and remains on your device.`,
    ],
  },
  {
    h: "6. Children's Privacy",
    p: [
      `The Service is intended for a general audience and is not directed to children under 13. BuildCalc does not knowingly collect personal information from children.`,
    ],
  },
  {
    h: '7. Changes to This Policy',
    p: [
      `We may update this Privacy Policy from time to time. The "Last updated" date above reflects the current version.`,
    ],
  },
  {
    h: '8. Contact',
    p: [
      `Questions about this Privacy Policy can be sent through the feedback link in the site footer.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div>
      <header>
        <h1 className="text-xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="mt-1 text-sm text-ink-dim">Last updated: May 2026</p>
      </header>

      <div className="mt-6 space-y-6">
        {SECTIONS.map((s) => (
          <section key={s.h}>
            <h2 className="text-base font-bold">{s.h}</h2>
            <div className="mt-1.5 space-y-2 text-sm leading-relaxed text-ink-dim">
              {s.p.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <SiteFooter />
    </div>
  );
}

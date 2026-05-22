import type { Metadata } from 'next';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The Terms of Service for BuildCalc — how the construction calculators may be used, and the disclaimers and limitations that apply.',
  alternates: { canonical: '/terms/' },
};

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: '1. Agreement to These Terms',
    p: [
      `These Terms of Service ("Terms") govern your access to and use of BuildCalc — the website at buildprocalc.com, together with its calculators, tools, and content (the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.`,
    ],
  },
  {
    h: '2. What BuildCalc Provides',
    p: [
      `BuildCalc is a free online tool that provides construction-related calculations and estimates, including stair layouts, concrete volume and quantities, and dimensional math. The Service is intended for general informational and preliminary planning purposes only.`,
    ],
  },
  {
    h: '3. Estimates Only — Not Professional Advice',
    p: [
      `BuildCalc is a calculation aid, not a substitute for professional judgment. It does not provide engineering, architectural, design, legal, or construction advice, and your use of it does not create any professional relationship.`,
      `All results are estimates. They may not account for your specific site conditions, materials, structural requirements, local code amendments, or the code edition currently adopted in your area. Before purchasing materials, cutting, or beginning any construction, you must independently verify all results and have your plans reviewed and approved by a licensed professional and by the building authority having jurisdiction in your location.`,
      `Building codes referenced in the Service (such as the International Residential Code) are cited for general guidance only, may be summarized or simplified, and may differ from the code in force where you are.`,
    ],
  },
  {
    h: '4. No Warranties',
    p: [
      `The Service is provided "as is" and "as available," without warranties of any kind, whether express or implied. To the fullest extent permitted by law, BuildCalc disclaims all warranties, including any implied warranties of accuracy, completeness, reliability, merchantability, fitness for a particular purpose, and non-infringement.`,
      `We do not warrant that the Service will be uninterrupted or error-free, or that any calculation is accurate, complete, or suitable for your project.`,
    ],
  },
  {
    h: '5. Your Responsibilities',
    p: [
      `You are solely responsible for: (a) independently checking and verifying every result before relying on it; (b) confirming compliance with all applicable building codes, ordinances, and permit and inspection requirements; (c) the design, structural adequacy, safety, and workmanship of any project; and (d) all decisions, purchases, and work undertaken in connection with your use of the Service.`,
    ],
  },
  {
    h: '6. Limitation of Liability',
    p: [
      `To the maximum extent permitted by applicable law, BuildCalc and its owner, operators, and contributors will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for any loss of profits, revenue, data, or goodwill, or for any property damage, personal injury, construction defect, or material or financial loss, arising out of or relating to your use of — or inability to use — the Service or any reliance on its calculations, even if advised of the possibility of such damages.`,
      `To the maximum extent permitted by law, the total aggregate liability of BuildCalc and its owner for all claims relating to the Service will not exceed one hundred U.S. dollars (US$100).`,
      `Some jurisdictions do not allow the exclusion or limitation of certain damages, so some of the above limitations may not apply to you.`,
    ],
  },
  {
    h: '7. Indemnification',
    p: [
      `You agree to indemnify, defend, and hold harmless BuildCalc and its owner, operators, and contributors from and against any claims, demands, damages, liabilities, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or related to your use of the Service, your projects, your reliance on any calculation, or your violation of these Terms or any applicable law.`,
    ],
  },
  {
    h: '8. Affiliate Links & Recommendations',
    p: [
      `The Service contains affiliate links, including links provided through the Amazon Associates Program. If you click an affiliate link and make a purchase, BuildCalc may earn a commission at no additional cost to you. Product recommendations are provided for convenience only and do not constitute an endorsement, warranty, or guarantee of any product or seller.`,
    ],
  },
  {
    h: '9. Third-Party Links',
    p: [
      `The Service may link to third-party websites and resources that BuildCalc does not control. We are not responsible for the content, products, policies, or practices of any third-party site, and your use of them is at your own risk and subject to their terms.`,
    ],
  },
  {
    h: '10. Intellectual Property',
    p: [
      `The Service, including its design, text, graphics, and software, is owned by BuildCalc and protected by applicable intellectual-property laws. You may use the Service for your personal and business estimating needs, but you may not copy, redistribute, or create derivative works from it without prior written permission.`,
    ],
  },
  {
    h: '11. Changes to the Service and These Terms',
    p: [
      `We may modify, suspend, or discontinue any part of the Service at any time without notice. We may also update these Terms from time to time; the "Last updated" date above reflects the most recent version. Your continued use of the Service after changes take effect constitutes acceptance of the revised Terms.`,
    ],
  },
  {
    h: '12. Governing Law',
    p: [
      `These Terms are governed by the laws of the State of [Your State], United States, without regard to its conflict-of-law principles. Any dispute arising from these Terms or the Service will be subject to the exclusive jurisdiction of the state and federal courts located in [Your State].`,
    ],
  },
  {
    h: '13. Contact',
    p: [
      `Questions about these Terms can be sent through the feedback link in the site footer.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <div>
      <header>
        <h1 className="text-xl font-extrabold tracking-tight">
          Terms of Service
        </h1>
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

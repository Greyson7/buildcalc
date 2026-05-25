import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-many-bags-of-concrete-for-a-4x4-post/';
const TITLE = 'How Many Bags of Concrete for a 4x4 Post?';
const DESCRIPTION =
  'A standard 4x4 fence post in a 9-inch hole 24 inches deep takes about 1 bag of 50 lb fast-setting concrete — or 2 bags of 60 lb standard mix. Hole-size chart, deck-post depths, and the cylinder math.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: ROUTE },
  openGraph: {
    title: `${TITLE} · BuildCalc`,
    description: DESCRIPTION,
    url: ROUTE,
    type: 'article',
    images: ['/og-image.png'],
  },
};

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: TITLE,
  description: DESCRIPTION,
  mainEntityOfPage: `https://buildprocalc.com${ROUTE}`,
  author: { '@type': 'Organization', name: 'BuildCalc' },
  publisher: { '@type': 'Organization', name: 'BuildCalc' },
};

const FAQ: QA[] = [
  {
    q: 'How deep should a 4x4 fence post be set?',
    a: 'At least one-third of the above-grade post height, with 24 inches as a common minimum for a 6 ft fence. In freezing climates, set the bottom of the hole below the frost line — usually 36 to 48 inches in the upper US and Canada. The post needs to brace against frost heave, not just gravity.',
  },
  {
    q: 'How wide should the post hole be?',
    a: 'About 3 times the post width. For a 4×4 post, that is 9 to 12 inches in diameter. Wider holes use more concrete but give better lateral resistance, which matters more for gate posts and corner posts than for line posts.',
  },
  {
    q: 'How many bags of concrete per fence post?',
    a: 'For a 9 inch hole 24 inches deep: 1 bag of 50 lb fast-setting concrete (Quikrete or Sakrete), or 2 bags of 60 lb standard mix. For a 12 inch hole 30 inches deep (typical gate or corner post): 2 bags of fast-set, or 3 bags of 60 lb standard.',
  },
  {
    q: 'Should I use fast-setting or regular concrete?',
    a: 'Fast-setting wins for fence posts — it sets in 20 to 40 minutes versus 24 hours, you can move on to the next post without bracing, and the bag is sized to one post hole. Use regular mix only if you are setting dozens of posts and want to pour them all in one batch from a mixer.',
  },
  {
    q: 'How much concrete do I need for 20 fence posts?',
    a: 'Roughly 20 bags of 50 lb fast-setting concrete for a 6 ft fence (1 bag per post in a 9 in × 24 in hole), or about 40 bags of 60 lb standard concrete. Add 2 to 4 extra bags for corner and gate posts that take a wider, deeper hole.',
  },
  {
    q: 'Do you wet the mix or pour the bag in dry?',
    a: 'Quikrete Fast-Setting Concrete is designed to pour in dry, then add water on top — that is the right method. Standard mix needs to be wet-mixed in a wheelbarrow or mixer before going in the hole. Read the bag label; dry-pour standard concrete is a common mistake that produces weak, crumbly footings.',
  },
];

const ROWS = [
  { hole: '9″ dia × 24″ deep', cuFt: '0.71', fastSet50: 1, std60: 2, std80: 2, use: 'Standard line post, 6 ft fence' },
  { hole: '10″ dia × 30″ deep', cuFt: '1.09', fastSet50: 2, std60: 3, std80: 2, use: 'Heavier line post or 8 ft fence' },
  { hole: '12″ dia × 30″ deep', cuFt: '1.79', fastSet50: 3, std60: 4, std80: 3, use: 'Gate post or corner post' },
  { hole: '12″ dia × 42″ deep', cuFt: '2.42', fastSet50: 4, std60: 6, std80: 5, use: 'Deep-frost-line post' },
];

export default function ConcreteBags4x4PostGuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/concrete/"
          buttonLabel="Calculate for your post"
          description="The chart below covers common 4×4 post holes. Tap here for any other diameter or depth — the round-column mode handles every footing size."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Concrete
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Bags of Concrete for a 4×4 Post?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The short answer is one bag of fast-setting concrete per typical
            line post — but corner posts, gate posts and frost-line posts all
            change the count. Here is the chart and the cylinder math behind
            it.
          </p>
        </header>

        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> a standard 4×4
            fence-line post in a{' '}
            <span className="font-bold text-brand-light">9 in × 24 in hole</span>{' '}
            needs about{' '}
            <span className="font-bold text-brand-light">1 bag of 50 lb fast-set</span>{' '}
            (Quikrete or Sakrete) or 2 bags of 60 lb standard mix. Gate and
            corner posts need 2 to 3 bags of fast-set.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            By hole size
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Hole diameter and depth set the concrete volume — the post itself
            displaces a small amount (3.5 × 3.5 in) which is subtracted in the
            counts below.
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left">
                  <th className="px-3 py-2 font-bold">Hole</th>
                  <th className="px-3 py-2 font-bold">ft³</th>
                  <th className="px-3 py-2 font-bold">50 lb fast-set</th>
                  <th className="px-3 py-2 font-bold">60 lb std</th>
                  <th className="px-3 py-2 font-bold">80 lb std</th>
                  <th className="px-3 py-2 font-bold">Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROWS.map((r) => (
                  <tr key={r.hole}>
                    <td className="px-3 py-2 font-mono font-bold text-ink">
                      {r.hole}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.cuFt}
                    </td>
                    <td className="px-3 py-2 font-mono font-bold text-brand-light">
                      {r.fastSet50}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.std60}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.std80}
                    </td>
                    <td className="px-3 py-2 text-xs text-ink-dim">
                      {r.use}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            Counts assume a 4×4 nominal post (3.5 × 3.5 in actual) and include
            normal waste. Round up.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            For a 9 inch diameter hole 24 inches deep with a 4×4 post inside:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Hole volume</span> = π × r²
              × h = π × 4.5² × 24 = 1,527 cubic inches ={' '}
              <span className="font-mono font-bold text-ink">0.88 ft³</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Subtract the post</span> =
              3.5 × 3.5 × 24 = 294 cubic inches ={' '}
              <span className="font-mono font-bold text-ink">0.17 ft³</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Net concrete</span> = 0.88 −
              0.17 ={' '}
              <span className="font-mono font-bold text-ink">0.71 ft³</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Bag count.</span> A 50 lb
              fast-set bag yields about 0.375 ft³, so 0.71 ÷ 0.375 = 1.9 →
              round to 2 if the hole runs full, but 1 bag covers the typical
              hole well because contractors leave a slight crown above grade.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Deck posts vs. fence posts
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Deck post footings are bigger because they carry live load from
            above. A typical 6×6 deck post sits in a 12 inch diameter, 4 ft
            deep sonotube — that is 3.14 ft³ of concrete per footing, or about
            6 bags of 80 lb. For a 4×4 deck post in a 10 inch sonotube at 4 ft,
            figure 4 bags of 80 lb.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Fence posts are pure bracing — they carry their own weight, the
            fence panels and wind load. Most local codes do not even require a
            permit, so the diameter and depth come from rule of thumb (3× post
            width, below frost line) not engineering tables.
          </p>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate for your own post
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            The chart above covers standard hole sizes. For any other diameter
            or depth — including sonotubes and bigger 6×6 deck-post footings —
            BuildCalc&apos;s round-column mode handles the cylinder math and
            subtracts the post displacement automatically.
          </p>
          <Link
            href="/concrete/"
            className="tap mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-surface-0 active:bg-brand-dark"
          >
            Open the concrete calculator →
          </Link>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">FAQ</h2>
          <div className="mt-3">
            <Faq items={FAQ} />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Related guides
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-ink-dim">
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-fence-post/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a fence post?
              </Link>{' '}
              — general fence-post overview, all post sizes.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-sonotube/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a sonotube?
              </Link>{' '}
              — deck footings and column piers.
            </li>
            <li>
              <Link
                href="/how-many-bags-of-concrete-for-a-10x10-slab/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a 10×10 slab?
              </Link>{' '}
              — flat-slab math for a small patio.
            </li>
          </ul>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      </article>

      <SiteFooter />
    </>
  );
}

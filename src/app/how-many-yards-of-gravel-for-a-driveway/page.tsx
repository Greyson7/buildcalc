import type { Metadata } from 'next';
import Link from 'next/link';
import { Faq, type QA } from '@/components/Faq';
import { SiteFooter } from '@/components/SiteFooter';
import { StickerWelcome } from '@/components/StickerWelcome';

const ROUTE = '/how-many-yards-of-gravel-for-a-driveway/';
const TITLE = 'How Many Yards of Gravel for a Driveway?';
const DESCRIPTION =
  'A typical 12 × 40 ft gravel driveway at 4 inches deep needs about 6 cubic yards of gravel (~8 tons). Full math, layered base build, and the gravel types that actually compact well.';

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
    q: 'How many yards of gravel do I need for a driveway?',
    a: 'For a 12 × 40 ft driveway at 4 inches deep, you need about 5.93 cubic yards of gravel (roughly 8 tons). Double the length and you need 12 yards; double the depth (8 in) and you need 12 yards.',
  },
  {
    q: 'How many tons of gravel are in a cubic yard?',
    a: 'Most crushed stone and gravel weighs 2,700 to 2,800 lb per cubic yard — call it 1.35 tons per yard. Pea gravel is lighter at ~2,800 lb/yd³; crushed limestone is ~2,700 lb/yd³. A 6-yard driveway is about 8 tons.',
  },
  {
    q: 'What type of gravel is best for a driveway?',
    a: 'A two-layer build is standard: 4 inches of #57 or 3/4 inch clean crushed stone on the bottom for drainage, topped with 2 inches of crusher run (a mix of stone dust and 3/4 inch stone) that compacts to a hard wearing surface. Pea gravel looks nice but does not compact — it shifts under tires.',
  },
  {
    q: 'How deep should a gravel driveway be?',
    a: '6 to 8 inches total for a residential driveway: 4 inches of base stone + 2 to 4 inches of crusher-run topping. On clay or wet soil, dig down further and add a geotextile fabric layer before the stone to keep the gravel from sinking into the mud.',
  },
  {
    q: 'How much does a gravel driveway cost?',
    a: 'For a 12 × 40 ft driveway: 6 yards delivered crushed stone at $30 to $50 per yard = $180 to $300, plus delivery $50 to $150 = $230 to $450. Installation by a contractor (grading, geofabric, two-layer install, compaction) is typically $1 to $3 per sq ft = $500 to $1,500 for the same driveway.',
  },
  {
    q: 'How do I keep gravel from spreading and rutting?',
    a: 'Three things: edge restraint (landscape timbers, paver edge, or concrete curbs), proper crown (1/4 inch per foot — center higher than edges so water sheds), and the right top layer (crusher run with dust, not clean pea gravel). Re-grade and add fresh stone every 2 to 3 years.',
  },
];

const ROWS = [
  { size: '10 × 20 ft', depth: '4"', cuYd: '2.5', tons: '3.4' },
  { size: '12 × 40 ft', depth: '4"', cuYd: '5.9', tons: '8.0' },
  { size: '12 × 40 ft', depth: '6"', cuYd: '8.9', tons: '12.0' },
  { size: '16 × 40 ft', depth: '4"', cuYd: '7.9', tons: '10.7' },
  { size: '20 × 40 ft', depth: '4"', cuYd: '9.9', tons: '13.3' },
  { size: '20 × 60 ft', depth: '6"', cuYd: '22.2', tons: '30.0' },
];

export default function GravelDrivewayGuidePage() {
  return (
    <>
      <article className="space-y-7">
        <StickerWelcome
          href="/gravel/"
          buttonLabel="Calculate for your driveway"
          description="Tap here to enter length, width and depth — BuildCalc returns cubic yards, tons and live cost for crushed stone, pea gravel or river rock."
        />
        <header>
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
            BuildCalc Guides · Gravel
          </p>
          <h1 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            How Many Yards of Gravel for a Driveway?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Gravel driveways are 10x cheaper than concrete or asphalt — but
            only when you order the right amount of the right gravel. Here is
            the math, the layer plan, and how to avoid the rutting problem.
          </p>
        </header>

        <aside className="rounded-2xl border border-brand/35 bg-brand/10 p-4">
          <p className="text-sm leading-relaxed text-ink">
            <span className="font-bold">Quick answer:</span> a 12 × 40 ft
            driveway at 4 inches deep needs{' '}
            <span className="font-bold text-brand-light">~6 cubic yards</span>{' '}
            of gravel (about 8 tons). For a proper two-layer build, order 4
            yards of #57 base + 2 yards of crusher-run topping.
          </p>
        </aside>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">The math</h2>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Cubic feet</span> = length ×
              width × depth (in feet). 12 × 40 × (4 ÷ 12) ={' '}
              <span className="font-mono font-bold text-ink">160 ft³</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Cubic yards</span> = 160 ÷
              27 = <span className="font-mono font-bold text-ink">5.93 yd³</span>.
            </li>
            <li>
              <span className="font-bold text-ink">Tons</span> = yd³ × ~1.35.
              5.93 × 1.35 ={' '}
              <span className="font-mono font-bold text-ink">~8 tons</span> for
              crushed stone.
            </li>
            <li>
              <span className="font-bold text-ink">Order amount</span>: round
              up to the supplier&apos;s minimum increment. Most yards sell in
              0.5 or 1 yd³ increments — order 6 yd³.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            By driveway size
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Common driveway dimensions at the two most common depths.
          </p>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-surface-2 text-left">
                  <th className="px-3 py-2 font-bold">Driveway</th>
                  <th className="px-3 py-2 font-bold">Depth</th>
                  <th className="px-3 py-2 font-bold">Yards</th>
                  <th className="px-3 py-2 font-bold">Tons</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {ROWS.map((r, i) => (
                  <tr key={`${r.size}-${r.depth}-${i}`}>
                    <td className="px-3 py-2 font-mono font-bold text-ink">
                      {r.size}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.depth}
                    </td>
                    <td className="px-3 py-2 font-mono font-bold text-brand-light">
                      {r.cuYd}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink-dim">
                      {r.tons}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-ink-faint">
            Tons assume crushed stone at ~2,700 lb/yd³. Order 0.5 to 1 yd³
            extra for compaction settling.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            The two-layer build
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            A driveway that lasts gets built in layers, each one with a job:
          </p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">Geotextile fabric</span>{' '}
              (optional but recommended on clay) — separates the soil from the
              stone so gravel does not sink into mud.
            </li>
            <li>
              <span className="font-bold text-ink">Base layer</span>: 4 inches
              of #57 or 3/4 inch clean crushed stone. Drains well, locks
              together when compacted, supports loads.
            </li>
            <li>
              <span className="font-bold text-ink">Top layer</span>: 2 inches
              of crusher run (3/4 inch stone with dust). Compacts to a hard,
              uniform driving surface.
            </li>
            <li>
              <span className="font-bold text-ink">Compact each layer</span>{' '}
              with a vibratory plate compactor or roller before adding the
              next.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-extrabold tracking-tight">
            Common gravel types
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
            <li>
              <span className="font-bold text-ink">#57 stone</span>: 3/4 inch
              clean crushed limestone or granite. Drains well, locks together,
              standard for base layers and french drains.
            </li>
            <li>
              <span className="font-bold text-ink">Crusher run (CR-6, ABC)</span>:
              3/4 inch stone with fine dust. Compacts hard. The top-layer
              choice for driveways.
            </li>
            <li>
              <span className="font-bold text-ink">Pea gravel</span>: 3/8 inch
              rounded river stone. Looks nice, terrible for driveways — never
              compacts, shifts under tires.
            </li>
            <li>
              <span className="font-bold text-ink">River rock</span>: 1 to 3
              inch rounded stone. Decorative only, not structural.
            </li>
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-lg font-extrabold tracking-tight">
            Calculate for your own driveway
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Length, width and depth — BuildCalc returns yards, tons and price
            per yard. Works for driveways, patios, french drains and shed
            bases.
          </p>
          <Link
            href="/gravel/"
            className="tap mt-4 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-bold text-surface-0 active:bg-brand-dark"
          >
            Open the gravel calculator →
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
                href="/how-many-bags-of-concrete-for-a-driveway/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many bags of concrete for a driveway?
              </Link>{' '}
              — for upgrading from gravel to concrete.
            </li>
            <li>
              <Link
                href="/how-many-cubic-feet-in-a-cubic-yard/"
                className="font-semibold text-brand-light underline-offset-2 hover:underline"
              >
                How many cubic feet in a cubic yard?
              </Link>{' '}
              — the conversion behind every gravel order.
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

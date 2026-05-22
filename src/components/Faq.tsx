/**
 * Faq — a native <details> accordion plus matching FAQPage JSON-LD.
 *
 * One data source drives both the visible Q&A and the structured data, so
 * Google can surface the questions as rich results. Pure server component,
 * no JS needed — the accordion is native HTML.
 */

export interface QA {
  q: string;
  a: string;
}

export function Faq({ items }: { items: QA[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };

  return (
    <>
      <div className="card divide-y divide-line/70">
        {items.map((i) => (
          <details key={i.q} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 text-sm font-semibold [&::-webkit-details-marker]:hidden">
              <span>{i.q}</span>
              <span className="shrink-0 text-lg leading-none text-ink-faint transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="px-4 pb-4 text-sm leading-relaxed text-ink-dim">
              {i.a}
            </p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

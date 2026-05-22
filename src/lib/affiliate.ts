/**
 * affiliate.ts — outbound affiliate links.
 *
 * Two partners to start: Amazon Associates and one industry partner.
 * Keep it simple — every ActionCard tool item just carries a full `url`:
 *   - Amazon product/search → build it with amazon()
 *   - Industry partner       → drop their affiliate URL straight in
 *
 * Every rendered affiliate link uses rel="sponsored" and sits under a
 * visible affiliate disclosure (see components/ActionCard.tsx).
 */

/**
 * Amazon Associates tracking tag. Set NEXT_PUBLIC_AMAZON_TAG to the real
 * Associates tag at build time; this is a placeholder until then.
 */
const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || 'buildprocalc-20';

/**
 * Build a tagged Amazon affiliate URL.
 *
 * Pass a 10-character ASIN for a specific product, or any phrase for a
 * search results page. To swap a product, just change the string.
 *
 *   amazon('B07ABCDEFG')   → a specific product
 *   amazon('framing square') → a search
 */
export function amazon(asinOrSearch: string): string {
  const isAsin = /^[A-Z0-9]{10}$/.test(asinOrSearch);
  const base = isAsin
    ? `https://www.amazon.com/dp/${asinOrSearch}`
    : `https://www.amazon.com/s?k=${encodeURIComponent(asinOrSearch)}`;
  return `${base}${base.includes('?') ? '&' : '?'}tag=${AMAZON_TAG}`;
}

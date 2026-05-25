import type { MetadataRoute } from 'next';

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://buildprocalc.com'
).replace(/\/+$/, '');

// Required so the route is emitted as a static file under `output: export`.
export const dynamic = 'force-static';

const ROUTES: { path: string; priority: number }[] = [
  { path: '/', priority: 1 },
  { path: '/stairs/', priority: 0.8 },
  { path: '/concrete/', priority: 0.8 },
  { path: '/math/', priority: 0.8 },
  { path: '/roofing/', priority: 0.8 },
  { path: '/decking/', priority: 0.8 },
  { path: '/square-footage/', priority: 0.8 },
  { path: '/gravel/', priority: 0.8 },
  { path: '/drywall/', priority: 0.8 },
  { path: '/paint/', priority: 0.8 },
  { path: '/mulch/', priority: 0.8 },
  { path: '/how-many-bags-of-concrete-for-a-10x10-slab/', priority: 0.7 },
  { path: '/how-to-calculate-stair-stringers/', priority: 0.7 },
  { path: '/how-much-paint-for-a-12x12-room/', priority: 0.7 },
  { path: '/how-many-bags-of-concrete-for-a-fence-post/', priority: 0.7 },
  { path: '/how-many-bundles-of-shingles-for-1000-sq-ft/', priority: 0.7 },
  { path: '/how-many-cubic-yards-of-mulch-for-1000-sq-ft/', priority: 0.7 },
  { path: '/how-many-bags-of-concrete-for-an-8x10-slab/', priority: 0.7 },
  { path: '/how-many-bags-of-concrete-for-a-12x12-slab/', priority: 0.7 },
  { path: '/how-many-bags-of-concrete-for-a-16x20-slab/', priority: 0.7 },
  { path: '/how-many-bags-of-concrete-for-a-20x20-slab/', priority: 0.7 },
  { path: '/how-many-bags-of-concrete-for-a-hot-tub-pad/', priority: 0.7 },
  { path: '/how-many-bags-of-concrete-for-a-4x4-post/', priority: 0.7 },
  { path: '/how-many-bags-of-concrete-for-a-sonotube/', priority: 0.7 },
  { path: '/how-many-bags-of-concrete-for-a-driveway/', priority: 0.7 },
  { path: '/how-many-bags-of-concrete-in-a-yard/', priority: 0.7 },
  { path: '/how-many-bags-of-concrete-for-a-12x16-slab/', priority: 0.7 },
  { path: '/how-many-cubic-feet-in-a-cubic-yard/', priority: 0.7 },
  { path: '/how-much-paint-for-a-10x10-room/', priority: 0.7 },
  { path: '/how-many-sheets-of-drywall-for-a-12x12-room/', priority: 0.7 },
  { path: '/how-many-yards-of-gravel-for-a-driveway/', priority: 0.7 },
  { path: '/how-many-deck-screws-per-board/', priority: 0.7 },
  { path: '/how-many-stair-stringers-do-i-need/', priority: 0.7 },
  { path: '/how-many-bags-of-mulch-in-a-yard/', priority: 0.7 },
  { path: '/what-is-the-actual-size-of-a-2x4/', priority: 0.7 },
  { path: '/how-to-figure-roof-pitch/', priority: 0.7 },
  { path: '/how-many-square-feet-in-an-acre/', priority: 0.7 },
  { path: '/terms/', priority: 0.3 },
  { path: '/privacy/', priority: 0.3 },
];

/** Generates /sitemap.xml at build time (static export). */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }));
}

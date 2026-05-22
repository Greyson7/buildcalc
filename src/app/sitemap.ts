import type { MetadataRoute } from 'next';

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://buildprocalc.com'
).replace(/\/+$/, '');

// Required so the route is emitted as a static file under `output: export`.
export const dynamic = 'force-static';

/** Generates /sitemap.xml at build time (static export). */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ['/', '/stairs/', '/concrete/', '/math/'].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));
}

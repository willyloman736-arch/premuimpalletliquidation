import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { getPalettes } from '@/data/palettes';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const palettes = await getPalettes();

  const staticRoutes: { path: string; priority: number }[] = [
    { path: '', priority: 1 },
    { path: '/palettes', priority: 0.9 },
    { path: '/about', priority: 0.6 },
    { path: '/contact', priority: 0.6 },
    { path: '/legal/cgu', priority: 0.3 },
    { path: '/legal/cgv', priority: 0.3 },
    { path: '/legal/privacy', priority: 0.3 },
    { path: '/legal/cookies', priority: 0.3 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    changeFrequency: 'weekly',
    priority,
  }));

  const paletteEntries: MetadataRoute.Sitemap = palettes.map((p) => ({
    url: `${site.url}/palette/${p.id}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticEntries, ...paletteEntries];
}

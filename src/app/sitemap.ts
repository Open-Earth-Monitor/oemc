import type { MetadataRoute } from 'next';

import axios from 'axios';

import { absoluteUrl } from '@/lib/seo';

import type { Geostory } from '@/types/geostories';
import type { Monitor } from '@/types/monitors';

// Revalidate the sitemap daily so newly published monitors/geostories appear.
export const revalidate = 86400;

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
  { url: absoluteUrl('/explore'), changeFrequency: 'weekly', priority: 0.9 },
  { url: absoluteUrl('/disclaimer'), changeFrequency: 'yearly', priority: 0.2 },
  { url: absoluteUrl('/usage-stats'), changeFrequency: 'weekly', priority: 0.3 },
];

const toLastModified = (date?: string): Date | undefined => {
  if (!date) return undefined;
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  let monitors: Monitor[] = [];
  let geostories: Geostory[] = [];

  if (apiUrl) {
    try {
      const [monitorsRes, geostoriesRes] = await Promise.allSettled([
        axios.get<Monitor[]>(`${apiUrl}/monitors`),
        axios.get<Geostory[]>(`${apiUrl}/geostories`),
      ]);
      if (monitorsRes.status === 'fulfilled') monitors = monitorsRes.value.data ?? [];
      if (geostoriesRes.status === 'fulfilled') geostories = geostoriesRes.value.data ?? [];
    } catch {
      // Network failure: fall back to static routes only rather than failing the build.
    }
  }

  const monitorRoutes: MetadataRoute.Sitemap = monitors.map((monitor) => ({
    url: absoluteUrl(`/explore/monitor/${monitor.id}`),
    lastModified: toLastModified(monitor.date_created),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const geostoryRoutes: MetadataRoute.Sitemap = geostories.map((geostory) => ({
    url: absoluteUrl(`/explore/geostory/${geostory.id}`),
    lastModified: toLastModified(geostory.date_created),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...STATIC_ROUTES, ...monitorRoutes, ...geostoryRoutes];
}

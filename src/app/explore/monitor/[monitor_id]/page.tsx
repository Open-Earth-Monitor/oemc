import { cache } from 'react';

import type { Metadata } from 'next';

import axios from 'axios';

import { SITE_NAME, absoluteUrl, serializeJsonLd, truncateForMeta } from '@/lib/seo';

import type { Monitor } from '@/types/monitors';

import MonitorPageComponent from '@/components/monitors/page';

type Props = {
  params: Promise<{ monitor_id: string }>;
};

// Cached so generateMetadata and the page render share a single request.
const getMonitor = cache(async (monitorId: string): Promise<Monitor | null> => {
  try {
    const { data } = await axios.get<Monitor[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/monitors/monitor_id=${monitorId}`
    );
    return data?.[0] ?? null;
  } catch {
    return null;
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { monitor_id } = await params;
  const monitor = await getMonitor(monitor_id);

  if (!monitor) return { title: 'Monitor not found' };

  const canonical = `/explore/monitor/${monitor_id}`;
  const description = truncateForMeta(monitor.description);

  return {
    title: monitor.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      siteName: SITE_NAME,
      title: monitor.title,
      description,
      url: absoluteUrl(canonical),
    },
    twitter: {
      card: 'summary_large_image',
      title: monitor.title,
      description,
    },
  };
}

export default async function ExploreMonitorMapPage({ params }: Props) {
  const { monitor_id } = await params;
  const monitor = await getMonitor(monitor_id);

  const jsonLd = monitor && {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: monitor.title,
    description: truncateForMeta(monitor.description, 5000),
    url: absoluteUrl(`/explore/monitor/${monitor_id}`),
    ...(monitor.author && { creator: { '@type': 'Organization', name: monitor.author } }),
    ...(monitor.date_created && { dateCreated: monitor.date_created }),
    ...(monitor.coverage && { spatialCoverage: monitor.coverage }),
    isAccessibleForFree: true,
  };

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      )}
      <MonitorPageComponent monitor_id={monitor_id} />
    </>
  );
}

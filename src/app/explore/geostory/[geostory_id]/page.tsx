import { cache } from 'react';

import type { Metadata } from 'next';

import axios from 'axios';

import { SITE_NAME, absoluteUrl, serializeJsonLd, truncateForMeta } from '@/lib/seo';

import type { Geostory } from '@/types/geostories';

import { getGeostoryImageUrl } from '@/hooks/geostories';

import GeostoryPageComponent from '@/components/geostories/page';

type Props = {
  params: Promise<{ geostory_id: string }>;
};

// Cached so generateMetadata and the page render share a single request.
const getGeostory = cache(async (geostoryId: string): Promise<Geostory | null> => {
  try {
    const { data } = await axios.get<Geostory[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/geostories?geostory_id=${geostoryId}`
    );
    return data?.[0] ?? null;
  } catch {
    return null;
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { geostory_id } = await params;
  const geostory = await getGeostory(geostory_id);

  if (!geostory) return { title: 'Geostory not found' };

  const canonical = `/explore/geostory/${geostory_id}`;
  const description = truncateForMeta(geostory.description);
  const image = getGeostoryImageUrl(geostory.id);

  return {
    title: geostory.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      siteName: SITE_NAME,
      title: geostory.title,
      description,
      url: absoluteUrl(canonical),
      images: [{ url: image, alt: geostory.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: geostory.title,
      description,
      images: [image],
    },
  };
}

export default async function ExploreGeostoryMapPage({ params }: Props) {
  const { geostory_id } = await params;
  const geostory = await getGeostory(geostory_id);

  const jsonLd = geostory && {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: geostory.title,
    description: truncateForMeta(geostory.description, 5000),
    url: absoluteUrl(`/explore/geostory/${geostory_id}`),
    image: getGeostoryImageUrl(geostory.id),
    ...(geostory.author && { author: { '@type': 'Person', name: geostory.author } }),
    ...(geostory.date_created && { datePublished: geostory.date_created }),
    publisher: { '@type': 'Organization', name: SITE_NAME },
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
      <GeostoryPageComponent geostory_id={geostory_id} />
    </>
  );
}

import type { Metadata } from 'next';

import axios from 'axios';

import type { Geostory } from '@/types/geostories';

import GeostoryPageComponent from '@/components/geostories/page';

type Props = {
  params: Promise<{ geostory_id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { geostory_id } = await params;
  try {
    const geostoryData = await axios
      .get<Geostory[]>(`${process.env.NEXT_PUBLIC_API_URL}/geostories?geostory_id=${geostory_id}`)
      .then((r) => r.data);

    if (!geostoryData?.length) return { title: 'Geostory not found' };

    return {
      title: `${geostoryData[0].title} - Open Earth Monitor Cyberinfrastructure`,
    };
  } catch {
    return { title: 'Geostory' };
  }
}

export default async function ExploreGeostoryMapPage({ params }: Props) {
  const { geostory_id } = await params;
  return <GeostoryPageComponent geostory_id={geostory_id} />;
}

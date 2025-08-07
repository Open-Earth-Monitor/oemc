import axios from 'axios';
import type { Metadata } from 'next';

import type { Geostory } from '@/types/geostories';
import GeostoryPageComponent from '@/components/geostories/page';

type Props = {
  params: { geostory_id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.geostory_id;

  const geostoryData = await axios
    .get<Geostory[]>(`${process.env.NEXT_PUBLIC_API_URL}/geostories?geostory_id=${id}`)
    .then((response) => response.data);

  if (!geostoryData?.length) {
    return { title: 'Geostory not found' };
  }

  return {
    title: `${geostoryData[0].title} - Open Earth Monitor Cyberinfrastructure`,
  };
}

export default async function ExploreGeostoryMapPage({ params }: Props) {
  const { geostory_id } = params;

  return <GeostoryPageComponent geostory_id={geostory_id} />;
}

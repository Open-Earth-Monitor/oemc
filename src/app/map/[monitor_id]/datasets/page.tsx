import type { Metadata } from 'next';

import type { Monitor } from '@/types/monitors';

import DatasetPageComponent from '@/components/datasets/page';

type Props = {
  params: { monitor_id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.monitor_id;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/monitors/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return { title: 'Monitor not found' };
  }

  const monitorData = (await res.json()) as Monitor[];

  if (!monitorData?.length) {
    return { title: 'Monitor not found' };
  }

  return {
    title: `${monitorData[0].title} - Open Earth Monitor Cyberinfrastructure`,
  };
}

export default function DatasetsPage({ params }: Props) {
  return <DatasetPageComponent monitor_id={params.monitor_id} />;
}

import type { Metadata } from 'next';

import axios from 'axios';

import type { Monitor } from '@/types/monitors';

import MonitorPageComponent from '@/components/monitors/page';

type Props = {
  params: Promise<{ monitor_id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { monitor_id } = await params;
  try {
    const monitorData = await axios
      .get<Monitor[]>(`${process.env.NEXT_PUBLIC_API_URL}/monitors/monitor_id=${monitor_id}`)
      .then((response) => response.data);

    if (!monitorData?.length) return { title: 'Monitor not found' };

    return {
      title: `${monitorData[0].title} - Open Earth Monitor Cyberinfrastructure`,
    };
  } catch {
    return { title: 'Monitor' };
  }
}

export default async function ExploreMonitorMapPage({ params }: Props) {
  const { monitor_id } = await params;
  return <MonitorPageComponent monitor_id={monitor_id} />;
}

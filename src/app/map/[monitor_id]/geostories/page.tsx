import axios from 'axios';
import type { Metadata, NextPage } from 'next';

import type { Monitor } from '@/types/monitors';

import MonitorGeostoriesPage from '@/components/monitors/geostories-page';

type Props = {
  params: { monitor_id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.monitor_id;

  // fetch data
  const monitorData = await axios
    .get<Monitor[]>(`${process.env.NEXT_PUBLIC_API_URL}monitors/${id}`)
    .then((response) => response.data);

  return {
    title: `Geostories of ${monitorData[0].title} - Open Earth Monitor Cyberinfrastructure`,
  };
}

const GeostoriesPage: NextPage<{ params: { monitor_id: string } }> = ({ params }) => {
  return <MonitorGeostoriesPage monitor_id={params.monitor_id} />;
};

export default GeostoriesPage;

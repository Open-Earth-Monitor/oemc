import axios from 'axios';
import type { Metadata, NextPage } from 'next';

import type { Monitor } from '@/types/monitors';

import DatasetPageComponent from '@/components/datasets/page';

type Props = {
  params: { monitor_id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.monitor_id;

  // fetch data
  const monitorData = await axios
    .get<Monitor[]>(`${process.env.NEXT_PUBLIC_API_URL}/monitors/${id}`)
    .then((response) => response.data);

  if (!monitorData?.length) return { title: 'Monitor not found' };

  return {
    title: `${monitorData[0].title} - Open Earth Monitor Cyberinfrastructure pruebassss`,
  };
}

const DatasetsPage: NextPage<{ params: { monitor_id: string } }> = ({ params: { monitor_id } }) => {
  return <DatasetPageComponent monitor_id={monitor_id} />;
};

export default DatasetsPage;

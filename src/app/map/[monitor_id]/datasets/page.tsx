'use client';

import type { NextPage } from 'next';

import { useMonitorLayers } from '@/hooks/monitors';

import DatasetCard from '@/components/datasets/card';
import Loading from '@/components/loading';

const DatasetsPage: NextPage<{ params: { monitor_id: string } }> = ({ params: { monitor_id } }) => {
  const { data, isLoading, isFetched, isError } = useMonitorLayers({ monitor_id });

  return (
    <div>
      {isLoading && <Loading />}
      {isFetched && !isError && (
        <ul className="space-y-6 text-secondary-500" data-testid="datasets-list">
          {data.map((dataset) => (
            <li key={dataset.layer_id}>
              <DatasetCard {...dataset} id={dataset.layer_id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DatasetsPage;

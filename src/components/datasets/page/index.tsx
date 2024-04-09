'use client';

import { redirect } from 'next/navigation';

import { useMonitorLayers } from '@/hooks/monitors';

import DatasetCard from '@/components/datasets/card';
import Loading from '@/components/loading';

const DatasetsPage: React.FC<{ monitor_id: string }> = ({ monitor_id }) => {
  const { data, error, isLoading, isFetched, isError } = useMonitorLayers({ monitor_id });

  if (error?.code === '400') return redirect('/not-found');

  return (
    <div>
      {isLoading && <Loading />}
      {isFetched && !isError && (
        <ul className="space-y-6" data-testid="datasets-list">
          {data.map((dataset, index) => {
            return (
              <li key={dataset.layer_id}>
                <DatasetCard {...dataset} id={dataset.layer_id} defaultActive={index === 0} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DatasetsPage;

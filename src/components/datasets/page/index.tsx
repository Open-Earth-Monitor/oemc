'use client';

import { useEffect } from 'react';

import { redirect } from 'next/navigation';

import { useMonitorLayers } from '@/hooks/monitors';
import { useSyncLayersSettings } from '@/hooks/sync-query';

import DatasetCard from '@/components/datasets/card';
import Loading from '@/components/loading';

const DatasetsPage: React.FC<{ monitor_id: string }> = ({ monitor_id }) => {
  const { data, error, isLoading, isFetched, isError } = useMonitorLayers({ monitor_id });
  const [layers, setLayers] = useSyncLayersSettings();

  // Only at beginning set the first layer
  useEffect(() => {
    if (data?.length && !layers?.length) {
      void setLayers([
        {
          id: data[0].layer_id,
          opacity: 1,
          date: data[0].range?.[0]?.value,
        },
      ]);
    }
  }, [data, layers?.length, setLayers]);

  if (error?.code === '400') return redirect('/not-found');

  return (
    <div>
      {isLoading && <Loading />}
      {isFetched && !isError && (
        <ul className="space-y-6" data-testid="datasets-list">
          {data.map((dataset, index) => {
            return (
              <li key={dataset.layer_id}>
                <DatasetCard {...dataset} id={dataset.layer_id} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DatasetsPage;

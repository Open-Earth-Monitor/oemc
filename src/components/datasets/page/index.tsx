'use client';

import { useEffect } from 'react';

import { redirect } from 'next/navigation';

import { useMonitorLayers } from '@/hooks/monitors';
import { useSyncLayersSettings } from '@/hooks/sync-query';

import DatasetCard from '@/components/datasets/card';
import Loading from '@/components/loading';

const DatasetsPage: React.FC<{ monitor_id: string }> = ({ monitor_id }) => {
  const { data, error, isLoading, isError } = useMonitorLayers({ monitor_id });
  const [layers, setLayers] = useSyncLayersSettings();

  // Only at beginning set the first layer
  useEffect(() => {
    if (data?.length && !layers) {
      void setLayers(
        [
          {
            id: data[0].layer_id,
            opacity: 1,
            date: data[0].range?.[0]?.value,
          },
        ],
        // Required to load layer on navigation
        { shallow: false }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error?.code === '400') return redirect('/not-found');

  return (
    <div>
      {isLoading && <Loading />}
      {data?.length && !isError && (
        <ul className="space-y-6" data-testid="datasets-list">
          {data.map((dataset) => {
            return (
              <li key={dataset.layer_id}>
                <DatasetCard {...dataset} id={dataset.layer_id} isGeostory={false} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default DatasetsPage;

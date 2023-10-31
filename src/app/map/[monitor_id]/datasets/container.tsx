'use client';

import { FC } from 'react';

import { notFound } from 'next/navigation';

import { useMonitorLayers } from '@/hooks/monitors';

import DatasetCard from '@/components/datasets/card';
import Loading from '@/components/loading';

const DatasetsContainer: FC<{ params: { monitor_id: string } }> = ({ params: { monitor_id } }) => {
  const { data, isLoading, isFetched, isError, status } = useMonitorLayers({ monitor_id });
  if (status === 'error') return notFound();

  return (
    <div>
      {isLoading && <Loading />}
      {isFetched && !isError && (
        <ul className="space-y-6 text-secondary-500" data-testid="datasets-list">
          {data.map((dataset, index) => (
            <li key={dataset.layer_id}>
              <DatasetCard {...dataset} id={dataset.layer_id} active={index === 0} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DatasetsContainer;

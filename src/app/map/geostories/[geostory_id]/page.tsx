'use client';

import type { NextPage } from 'next';

import { useGeostoryLayers } from '@/hooks/geostories';

import DatasetCard from '@/components/datasets/card';
import GeostoryHead from '@/components/geostories/header';
import Loading from '@/components/loading';

const GeostoryPage: NextPage<{ params: { geostory_id: string } }> = ({
  params: { geostory_id },
}) => {
  const { data, isLoading, isFetched, isError } = useGeostoryLayers({ geostory_id });

  return (
    <div className="space-y-6">
      <GeostoryHead geostoryId={geostory_id} />

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
    </div>
  );
};

export default GeostoryPage;

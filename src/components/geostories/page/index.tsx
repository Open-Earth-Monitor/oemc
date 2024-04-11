'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { HiArrowLeft } from 'react-icons/hi';

import { useGeostoryParsed, useGeostoryLayers } from '@/hooks/geostories';
import { useSyncLayersSettings, useSyncCompareLayersSettings } from '@/hooks/sync-query';

import DatasetCard from '@/components/datasets/card';
import GeostoryHeader from '@/components/geostories/header';
import Loading from '@/components/loading';

const GeostoryPage: React.FC<{ geostory_id: string }> = ({ geostory_id }) => {
  const { data: geostory, isLoading: isLoadingGeostory } = useGeostoryParsed({ geostory_id });
  const { data, isLoading, isFetched, isError } = useGeostoryLayers({ geostory_id });
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();

  const opacity = layers?.[0]?.opacity;

  // Only show layers with position right
  const geostoryLayers = data?.filter(({ position }) => position === 'right');

  useEffect(() => {
    const comparisonLayer = data?.find(({ position }) => position === 'left');
    if (opacity && comparisonLayer && !compareLayers) {
      void setCompareLayers([{ id: comparisonLayer.layer_id, opacity }]);
    }
  }, [compareLayers, data, opacity, setCompareLayers]);

  useEffect(() => {
    if (data?.length && !layers?.length) {
      void setLayers([
        {
          id: geostoryLayers[0].layer_id,
          opacity: 1,
          date: geostoryLayers[0].range?.[0]?.value,
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setLayers]);

  return (
    <div className="space-y-6">
      <div className="divide-y divide-secondary-900">
        {geostory?.monitors?.[0].id && (
          <Link
            href={`/map/${geostory.monitors[0].id}/geostories`}
            className="sticky top-0 z-10 block space-x-3 bg-brand-500 pb-8 font-bold"
            data-testid="back-to-monitor"
            style={{ color: geostory.color }}
          >
            <HiArrowLeft className="inline-block h-6 w-6" />
            <span data-testid="monitor-title-back-btn">Back to {geostory.monitors[0].title}.</span>
          </Link>
        )}
        {isLoadingGeostory && <Loading />}
        {geostory && !isLoadingGeostory && <GeostoryHeader {...geostory} color={geostory.color} />}
      </div>
      <div>
        {isLoading && <Loading />}

        {isFetched && !isError && (
          <ul className="space-y-6" data-testid="datasets-list">
            {geostoryLayers.map((dataset) => (
              <li key={dataset.layer_id}>
                <DatasetCard {...dataset} type="geostory" id={dataset.layer_id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GeostoryPage;

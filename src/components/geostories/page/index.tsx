'use client';

import { useEffect, useMemo } from 'react';

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

  // Only show layers with position right
  const geostoryLayers = useMemo(
    () => data?.filter(({ position }) => position === 'right'),
    [data]
  );
  const comparisonLayer = useMemo(() => data?.find(({ position }) => position === 'left'), [data]);

  useEffect(() => {
    if (geostoryLayers && !layers) {
      void setLayers(
        [
          {
            id: geostoryLayers[0].layer_id,
            opacity: 1,
            date: geostoryLayers[0].range?.[0]?.value,
          },
        ],
        { shallow: false }
      );

      if (!compareLayers && comparisonLayer) {
        void setCompareLayers([{ id: comparisonLayer.layer_id, opacity: 1 }], { shallow: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geostoryLayers, comparisonLayer]);

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
                <DatasetCard {...dataset} type="geostory" id={dataset.layer_id} isGeostory />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GeostoryPage;

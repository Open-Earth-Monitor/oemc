'use client';

import { useEffect, useMemo } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { HiArrowLeft } from 'react-icons/hi';

import { useGeostoryParsed, useGeostoryLayers } from '@/hooks/geostories';
import { useSyncLayersSettings, useSyncCompareLayersSettings } from '@/hooks/sync-query';

import DatasetCard from '@/components/datasets/card';
import GeostoryHeader from '@/components/geostories/header';
import Loading from '@/components/loading';
import { ScrollArea } from '@/components/ui/scroll-area';

const Map = dynamic(() => import('@/components/map/geostory-map'), { ssr: false });

const GeostoryPage: React.FC<{ geostory_id: string }> = ({ geostory_id }) => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();

  const { data: geostoryData, isLoading: isGeostoryLoading } = useGeostoryParsed({ geostory_id });
  const { data: layersData, isLoading: isLayersLoading } = useGeostoryLayers({ geostory_id });

  // Only show layers with position right
  const geostoryLayers = useMemo(
    () => layersData?.filter(({ position }) => position === 'right'),
    [layersData]
  );
  const comparisonLayer = useMemo(
    () => layersData?.find(({ position }) => position === 'left'),
    [layersData]
  );

  useEffect(() => {
    if (geostoryLayers?.length && !layers) {
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

      if (comparisonLayer && !compareLayers) {
        void setCompareLayers([{ id: comparisonLayer.layer_id, opacity: 1 }], { shallow: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geostoryLayers, comparisonLayer]);

  return (
    <>
      <section className="md:[30vw] absolute bottom-3 left-3 top-[82px] z-40 w-[526px] overflow-hidden bg-brand-500">
        <ScrollArea className="h-full w-full p-7.5" type="auto">
          <div className="space-y-6">
            <div className="divide-y divide-secondary-900">
              {geostoryData?.monitors?.[0].id && (
                <Link
                  href={`/map/${geostoryData.monitors[0].id}/geostories`}
                  className="sticky top-0 z-10 block space-x-3 bg-brand-500 pb-8 font-bold"
                  data-testid="back-to-monitor"
                  style={{ color: geostoryData.color }}
                >
                  <HiArrowLeft className="inline-block h-6 w-6" />
                  <span data-testid="monitor-title-back-btn">
                    Back to {geostoryData.monitors[0].title}.
                  </span>
                </Link>
              )}
              {isGeostoryLoading && <Loading />}
              {geostoryData && !isGeostoryLoading && (
                <GeostoryHeader {...geostoryData} color={geostoryData.color} />
              )}
            </div>
            <div>
              {isLayersLoading && <Loading />}

              {!!layersData?.length && !isLayersLoading && (
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
        </ScrollArea>
      </section>
      {geostoryData && !isGeostoryLoading && (
        <Map
          geostoryData={geostoryData}
          layerData={geostoryLayers?.[0]}
          compareLayerData={comparisonLayer}
        />
      )}
    </>
  );
};

export default GeostoryPage;

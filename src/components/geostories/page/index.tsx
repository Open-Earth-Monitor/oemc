'use client';

import { useEffect, useMemo } from 'react';

import dynamic from 'next/dynamic';

import { useGeostoryParsed, useGeostoryLayers } from '@/hooks/geostories';
import { useSyncLayersSettings, useSyncCompareLayersSettings } from '@/hooks/sync-query';

import Loading from '@/components/loading';
import Header from '@/components/header';

const Map = dynamic(() => import('@/components/map/geostory-map'), { ssr: false });

const GeostoryPage: React.FC<{ geostory_id: string }> = ({ geostory_id }) => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();

  const { data: geostoryData, isLoading: isGeostoryLoading } = useGeostoryParsed({ geostory_id });
  const { data: layersData } = useGeostoryLayers({ geostory_id });

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
      {isGeostoryLoading && (
        <div className="h-screen w-screen items-center justify-center py-24">
          <Loading />
        </div>
      )}
      <Header />
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

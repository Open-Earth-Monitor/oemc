'use client';

import { useEffect, useMemo } from 'react';

import { useGeostoryParsed, useGeostoryLayers } from '@/hooks/geostories';
import { useSyncLayersSettings, useSyncCompareLayersSettings } from '@/hooks/sync-query';

import MobileExploreToolbar from '@/containers/explore/toolbar/mobile/toolbar';
import BackToMonitorsAndGeostories from '@/containers/sidebar/back-monitors-geostories-button';

import GeostoriesView from '@/components/geostories/view';
import Loading from '@/components/loading';
import { Sidebar, SidebarTrigger } from '@/components/ui/sidebar';

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
      <div className="relative hidden md:block">
        <Sidebar className="w-96 bg-black-400 px-9 py-12">
          <div className="font-satoshi">
            <BackToMonitorsAndGeostories />
            {isGeostoryLoading ? (
              <Loading />
            ) : (
              <GeostoriesView data={geostoryData} geostoryLayers={geostoryLayers} />
            )}
          </div>
        </Sidebar>
        <div className="w-full">
          <div className="absolute left-0 top-0 h-screen w-screen overflow-hidden">
            {/* Map + Trigger */}

            <SidebarTrigger />
          </div>
        </div>
      </div>
      <MobileExploreToolbar>
        {isGeostoryLoading ? (
          <Loading />
        ) : (
          <GeostoriesView data={geostoryData} geostoryLayers={geostoryLayers} />
        )}
      </MobileExploreToolbar>
    </>
  );
};

export default GeostoryPage;

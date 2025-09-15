'use client';

import { useEffect, useMemo } from 'react';

import { useGeostoryParsed, useGeostoryLayers } from '@/hooks/geostories';
import { useSyncLayersSettings, useSyncCompareLayersSettings } from '@/hooks/sync-query';

import MobileExploreToolbar from '@/containers/explore/toolbar/mobile/toolbar';
import BackToMonitorsAndGeostories from '@/containers/sidebar/back-monitors-geostories-button';

import GeostoriesView from '@/components/geostories/view';
import Loading from '@/components/loading';
import CardHeader from '@/components/sidebar/card-header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sidebar, SidebarTrigger } from '@/components/ui/sidebar';

const GeostoryPage: React.FC<{ geostory_id: string }> = ({ geostory_id }) => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();

  const { data: geostoryData, isLoading: isGeostoryLoading } = useGeostoryParsed({ geostory_id });
  const { data: layersData } = useGeostoryLayers({ geostory_id });

  // Only show layers with position right
  const geostoryLayers = useMemo(
    () => layersData?.filter(({ position }) => position === 'right' || !position),
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

      if (comparisonLayer && compareLayers) {
        void setCompareLayers([{ id: comparisonLayer.layer_id, opacity: 1 }], { shallow: false });
      }
    }
  }, [geostoryLayers, comparisonLayer, compareLayers, layers, setCompareLayers, setLayers]);

  return (
    <>
      <div className="relative hidden md:block">
        <Sidebar className="w-96 overflow-y-auto bg-black-400 px-9 py-12">
          <ScrollArea>
            <div className="font-satoshi">
              <div className="sticky top-0 z-10 gap-2 bg-black-400 pb-4">
                <BackToMonitorsAndGeostories />
                {!isGeostoryLoading && <CardHeader type="geostory" {...geostoryData} />}
              </div>
              {isGeostoryLoading ? (
                <Loading />
              ) : (
                <GeostoriesView
                  data={geostoryData}
                  geostoryLayers={geostoryLayers}
                  comparisonLayer={comparisonLayer}
                />
              )}
            </div>
          </ScrollArea>
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
          <GeostoriesView
            data={geostoryData}
            geostoryLayers={geostoryLayers}
            comparisonLayer={comparisonLayer}
          />
        )}
      </MobileExploreToolbar>
    </>
  );
};

export default GeostoryPage;

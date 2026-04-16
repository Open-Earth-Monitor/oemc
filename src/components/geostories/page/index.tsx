'use client';

import { useEffect, useMemo } from 'react';

import { useAtom, useAtomValue } from 'jotai';

import cn from '@/lib/classnames';

import { histogramVisibilityAtom, regionsBannerVisibilityAtom } from '@/app/store';

import { useGeostoryParsed, useGeostoryLayers } from '@/hooks/geostories';
import { useSyncLayersSettings, useSyncCompareLayersSettings } from '@/hooks/sync-query';

import MobileExploreToolbar from '@/containers/explore/toolbar/mobile/toolbar';
import BackToMonitorsAndGeostories from '@/containers/sidebar/back-monitors-geostories-button';

import GeostoriesView from '@/components/geostories/view';
import Loading from '@/components/loading';
import GeostoryHeader from '@/components/sidebar/geostory/header';
import RegionsBanner from '@/components/sidebar/regions-banner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sidebar, SidebarTrigger } from '@/components/ui/sidebar';

const GeostoryPage: React.FC<{ geostory_id: string }> = ({ geostory_id }) => {
  const isRegionsBannerVisible = useAtomValue(regionsBannerVisibilityAtom);
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();
  const [isHistogramActive] = useAtom(histogramVisibilityAtom);

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
  }, [geostoryLayers, comparisonLayer, compareLayers, setCompareLayers, setLayers, layers]);

  const baseLayers = useMemo(() => {
    if (!geostoryLayers?.length && comparisonLayer) return [comparisonLayer];
    if (geostoryLayers?.length) return geostoryLayers;
  }, [geostoryLayers, comparisonLayer]);

  return (
    <>
      <div className="relative hidden md:block">
        <Sidebar
          className={cn('w-[448px] bg-black-400 px-9 py-12', isRegionsBannerVisible && 'pb-28')}
        >
          <div className="flex h-full min-h-0 flex-col font-satoshi">
            <div className="sticky top-0 z-20 bg-black-400 pb-4">
              <BackToMonitorsAndGeostories />

              <div className="relative -left-9 w-[calc(100%+80px)]">
                {!isGeostoryLoading && <GeostoryHeader {...geostoryData} />}
              </div>
            </div>

            <ScrollArea className={cn({ 'min-h-0 flex-1': true, 'pb-10': isHistogramActive })}>
              {isGeostoryLoading ? (
                <Loading />
              ) : (
                <GeostoriesView
                  data={geostoryData}
                  geostoryLayers={baseLayers}
                  comparisonLayer={comparisonLayer}
                />
              )}
            </ScrollArea>
          </div>
          {isRegionsBannerVisible && <RegionsBanner />}
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
            geostoryLayers={baseLayers}
            comparisonLayer={comparisonLayer}
          />
        )}
      </MobileExploreToolbar>
    </>
  );
};

export default GeostoryPage;

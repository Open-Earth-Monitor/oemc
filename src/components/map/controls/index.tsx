import { useState, useMemo, FC, useCallback, ChangeEvent } from 'react';

import { useMediaQuery } from 'react-responsive';

import { useSetAtom } from 'jotai';
import { Extent } from 'ol/extent';
import { fromLonLat } from 'ol/proj';
import { RControl } from 'rlayers';

import { cn } from '@/lib/classnames';
import { mobile, tablet } from '@/lib/media-queries';

import { regionsLayerVisibilityAtom } from '@/app/store';

import { useDebounce } from '@/hooks/datasets';
import { useOpenStreetMapsLocations } from '@/hooks/openstreetmaps';
import { useSyncBboxSettings, useSyncCompareLayersSettings } from '@/hooks/sync-query';

import LocationSearchComponent from '@/components/location-search';
import BasemapControl from '@/components/map/controls/basemaps';
import BookmarkControl from '@/components/map/controls/bookmark';
import CompareRegionsStatistics from '@/components/map/controls/compare-regions';
import ShareControl from '@/components/map/controls/share';
import SwipeControl from '@/components/map/controls/swipe';

type ControlsProps = {
  className?: string;
  mapRef?: React.RefObject<any>;
  layerRightRef?: React.RefObject<any>;
  layerLeftRef?: React.RefObject<any>;
  data?: any;
  isLoading?: boolean;
};

interface ClickEvent {
  bbox?: Extent;
}

export const Controls: FC<ControlsProps> = ({
  className,
  mapRef,
  layerLeftRef,
  layerRightRef,
  data,
  isLoading = false,
}: ControlsProps) => {
  // Media queries
  const isMobile = useMediaQuery(mobile);
  const isTablet = useMediaQuery(tablet);
  const isDesktop = !isMobile && !isTablet;

  // Jotai atoms
  const setIsRegionsLayerActive = useSetAtom(regionsLayerVisibilityAtom);

  // Compare layer from the URL
  const [compareLayers] = useSyncCompareLayersSettings();
  const compareLayerId = compareLayers?.[0]?.id;
  const [locationSearch, setLocationSearch] = useState('');
  const [, setBbox] = useSyncBboxSettings();
  const isCompareLayerActive = useMemo(() => !!compareLayerId, [compareLayerId]);

  const debouncedSearchValue = useDebounce(locationSearch, 500);

  const handleLocationSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setLocationSearch(e.target.value);
    },
    [setLocationSearch]
  );

  const {
    data: locationData = [],
    isLoading: isLoadingLocationData = false,
    isFetching: isFetchingLocationData = false,
  } = useOpenStreetMapsLocations(
    {
      q: debouncedSearchValue,
      format: 'json',
    },
    {
      enabled: debouncedSearchValue !== '' && debouncedSearchValue.length >= 2,
      select: (data) => data,
    }
  );
  const OPTIONS = useMemo(() => {
    if (!Array.isArray(locationData)) return [];
    return locationData.map((d) => ({
      value: d.place_id ?? undefined,
      label: d.display_name ?? '',
      // transforming bbox from "nominatim" to "overpass" and to "ESPG:3857 projection"
      bbox: [
        ...fromLonLat([+d.boundingbox[2], +d.boundingbox[0]]),
        ...fromLonLat([+d.boundingbox[3], +d.boundingbox[1]]),
      ] as Extent,
    }));
  }, [locationData]);

  const handleClick = useCallback(
    (e: ClickEvent) => {
      if (mapRef?.current) {
        const view = mapRef.current.ol.getView();
        const padding = isDesktop ? [150, 0, 0, 300] : [150, 0, 0, 50];
        view?.fit(e.bbox, {
          duration: 2000,
          ...(!isMobile && { padding }),
        });
      }

      // Center the map
      setBbox(e.bbox);
    },
    // TO - DO - review dependencies mapREf setBbox
    [isDesktop, isMobile, mapRef, setBbox]
  );

  const handleRegionsLayer = useCallback(() => {
    setIsRegionsLayerActive((prev) => !prev);
  }, [setIsRegionsLayerActive]);
  return (
    <div
      className={cn({
        'absolute right-5 top-[222px] z-40 flex flex-col space-y-1.5 sm:top-1/2 sm:-translate-y-[50%]':
          true,
        [className]: !!className,
      })}
    >
      <LocationSearchComponent
        locationSearch={locationSearch}
        OPTIONS={OPTIONS}
        handleLocationSearchChange={handleLocationSearchChange}
        handleClick={handleClick}
        isLoading={isLoadingLocationData}
        isFetching={isFetchingLocationData}
        isMobile={isMobile}
        className="absolute right-0 top-[-134px]"
      />

      <RControl.RZoom className="ol-zoom" key="ol-zoom" zoomOutLabel="-" zoomInLabel="+" />

      <div
        className={cn({
          'absolute top-4 flex w-full flex-col items-end justify-end space-y-1.5 sm:top-[-26px]':
            true,
        })}
      >
        <CompareRegionsStatistics isMobile={isMobile} onClick={handleRegionsLayer} />
        <BasemapControl isMobile={isMobile} />
        <BookmarkControl isMobile={isMobile} />
        <ShareControl isMobile={isMobile} />
      </div>
      {isCompareLayerActive && data && !isLoading && (
        <SwipeControl layerLeft={layerLeftRef} layerRight={layerRightRef} />
      )}
    </div>
  );
};
export default Controls;

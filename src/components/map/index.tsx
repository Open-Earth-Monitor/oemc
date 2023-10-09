'use client';

import { useEffect, useState, useCallback, FC } from 'react';

import ReactMapGL, { MapProvider, ViewState, ViewStateChangeEvent } from 'react-map-gl';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import MapLibreGL from 'maplibre-gl';

import { DEFAULT_VIEWPORT, MAP_STYLE } from './constants';
import Controls from './controls';
import BookmarkControl from './controls/bookmark';
import ShareControl from './controls/share';
import ZoomControl from './controls/zoom';
import LayerManager from './layer-manager';
import Legend from './legend';
import type { CustomMapProps, ExplicitViewState } from './types';

const CustomMap: FC<CustomMapProps> = ({
  // * if no id is passed, react-map-gl will store the map reference in a 'default' key:
  // * https://github.com/visgl/react-map-gl/blob/ecb27c8d02db7dd09d8104e8c2011bda6aed4b6f/src/components/use-map.tsx#L18
  id = 'oemc-map',
  initialViewState = DEFAULT_VIEWPORT,
}: CustomMapProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  /**
   * STATE
   */
  const [localViewState, setLocalViewState] = useState<Partial<ViewState> | ExplicitViewState>({
    longitude: searchParams.get('longitude')
      ? Number(searchParams.get('longitude'))
      : initialViewState.longitude,
    latitude: searchParams.get('latitude')
      ? Number(searchParams.get('latitude'))
      : initialViewState.latitude,
    zoom: searchParams.get('zoom') ? Number(searchParams.get('zoom')) : initialViewState.zoom,
  });
  const [nextSearchParams, setNextSearchParams] = useState<string>(searchParams.toString());
  const [currentPathname, setCurrentPathname] = useState<string>(pathname);

  const handleMapMove = useCallback<(e: ViewStateChangeEvent) => void>(({ viewState }) => {
    setLocalViewState(viewState);
  }, []);

  /**
   * Remove all params from the URL but not the viewport params
   */
  const cleanUpLayers = useCallback(() => {
    const nextSearchParams = new URLSearchParams({
      longitude: localViewState.longitude?.toString(),
      latitude: localViewState.latitude?.toString(),
      zoom: localViewState.zoom?.toString(),
    });
    setNextSearchParams(nextSearchParams.toString());
  }, [localViewState.latitude, localViewState.longitude, localViewState.zoom]);

  /**
   * Update the URL when the user stops moving the map
   */
  const handleUpdateUrl = useCallback(() => {
    const originalSearchParams = new URLSearchParams(searchParams.toString());
    const nextSearchParams = new URLSearchParams({
      longitude: localViewState.longitude?.toString(),
      latitude: localViewState.latitude?.toString(),
      zoom: localViewState.zoom?.toString(),
    });
    originalSearchParams.forEach((value, key) => {
      if (!nextSearchParams.has(key)) {
        nextSearchParams.set(key, value);
      }
    });
    setNextSearchParams(nextSearchParams.toString());
  }, [searchParams, localViewState.longitude, localViewState.latitude, localViewState.zoom]);

  /**
   * Update the viewport state when the URL pathname, and search params changes
   */
  useEffect(() => {
    if (currentPathname !== pathname) {
      setCurrentPathname(pathname);
      cleanUpLayers();
    } else if (!nextSearchParams || nextSearchParams === '') {
      cleanUpLayers();
    } else {
      router.replace(`${pathname}?${nextSearchParams.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, nextSearchParams, router, currentPathname]);

  return (
    <div className="relative z-0 h-full w-full">
      <MapProvider>
        <ReactMapGL
          id={id}
          {...localViewState}
          mapLib={MapLibreGL}
          onMove={handleMapMove}
          onMoveEnd={handleUpdateUrl}
          mapStyle={MAP_STYLE}
          attributionControl={false}
        >
          <LayerManager layers={['raster']} />
          <Controls className="absolute bottom-3 left-[554px]">
            <ZoomControl />
            <BookmarkControl />
            <ShareControl />
          </Controls>
          <Legend />
        </ReactMapGL>
      </MapProvider>
    </div>
  );
};

export default CustomMap;

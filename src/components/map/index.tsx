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
  const [nextSearchParams, setNewSearchParams] = useState<string>(searchParams.toString());

  const handleMapMove = useCallback<(e: ViewStateChangeEvent) => void>(({ viewState }) => {
    setLocalViewState(viewState);
  }, []);

  /**
   * Update the URL when the user stops moving the map
   */
  const handleUpdateUrl = useCallback(() => {
    const nextSearchParams = new URLSearchParams({
      longitude: localViewState.longitude?.toString() ?? DEFAULT_VIEWPORT.longitude.toString(),
      latitude: localViewState.latitude?.toString() ?? DEFAULT_VIEWPORT.latitude.toString(),
      zoom: localViewState.zoom?.toString() ?? DEFAULT_VIEWPORT.zoom.toString(),
    });
    setNewSearchParams(nextSearchParams.toString());
  }, [localViewState.longitude, localViewState.latitude, localViewState.zoom]);

  /**
   * Update the viewport state when the URL pathname, and search params changes
   */
  useEffect(() => {
    router.replace(`${pathname}?${nextSearchParams.toString()}`);
  }, [pathname, nextSearchParams, router]);

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
          <Controls>
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

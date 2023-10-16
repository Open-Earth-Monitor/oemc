'use client';

import React, { useState, FC, useCallback, useEffect, useRef } from 'react';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import { MapBrowserEvent } from 'ol';
import { RLayerWMS, RMap, RLayerTile, RControl } from 'rlayers';
import { RView } from 'rlayers/RMap';

import { useLayerParsedSource } from '@/hooks/layers';
import { useURLayerParams } from '@/hooks/url-params';

import { DEFAULT_VIEWPORT } from './constants';
// map controls
import Controls from './controls';
import BookmarkControl from './controls/bookmark';
import ShareControl from './controls/share';
import Legend from './legend';
import type { CustomMapProps } from './types';

const Map: FC<CustomMapProps> = ({ initialViewState = DEFAULT_VIEWPORT }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const parsedCenterParam = searchParams
    .get('center')
    ?.split(',')
    .map((coord) => Number(coord));

  /**
   * STATE
   */
  const [localViewState, setLocalViewState] = useState<RView>({
    center: searchParams.get('center') ? parsedCenterParam : initialViewState.center,
    zoom: searchParams.get('zoom') ? Number(searchParams.get('zoom')) : initialViewState.zoom,
  });
  const [nextSearchParams, setNextSearchParams] = useState<string>(searchParams.toString());
  const [currentPathname, setCurrentPathname] = useState<string>(pathname);

  const handleMapMove = useCallback<
    (e: MapBrowserEvent<UIEvent & { frameState: { viewState: RView } }>) => void
  >((e) => {
    setLocalViewState(e.frameState.viewState);
  }, []);

  /**
   * Remove all params from the URL but not the viewport params
   */
  const cleanUpLayers = useCallback(() => {
    const nextSearchParams = new URLSearchParams({
      center: localViewState.center?.toString(),
      zoom: localViewState.zoom?.toString(),
    });
    setNextSearchParams(nextSearchParams.toString());
  }, [localViewState?.center, localViewState?.zoom]);

  /**
   * Update the URL when the user stops moving the map
   */
  const handleUpdateUrl = useCallback(() => {
    const originalSearchParams = new URLSearchParams(searchParams.toString());
    const nextSearchParams = new URLSearchParams({
      center: localViewState.center?.toString(),
      zoom: localViewState.zoom?.toString(),
    });
    originalSearchParams.forEach((value, key) => {
      if (!nextSearchParams.has(key)) {
        nextSearchParams.set(key, value);
      }
    });
    setNextSearchParams(nextSearchParams.toString());
  }, [searchParams, localViewState]);

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
  const { layerId, layerOpacity, date } = useURLayerParams();
  const { data } = useLayerParsedSource(
    {
      layer_id: layerId,
    },
    {
      enabled: !!layerId,
    }
  );

  const { gs_base_wms, gs_name, range } = data || {};
  const mapRef = useRef();
  return (
    <>
      <RMap
        width="100%"
        height="100%"
        className="relative"
        initial={DEFAULT_VIEWPORT}
        onChange={handleUpdateUrl}
        onMoveEnd={handleMapMove}
        view={[localViewState, handleUpdateUrl]}
        ref={mapRef}
        noDefaultControls
      >
        <RLayerTile
          properties={{ label: 'Basemap' }}
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attributions="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />
        <RLayerWMS
          properties={{ label: gs_name, opacity: layerOpacity, date, range }}
          url={gs_base_wms}
          params={{
            FORMAT: 'image/png',
            WIDTH: 256,
            HEIGHT: 256,
            SERVICE: 'WMS',
            VERSION: '1.3.0',
            REQUEST: 'GetMap',
            TRANSPARENT: true,
            LAYERS: gs_name,
            DIM_DATE: date,
            CRS: 'EPSG:3857',
            BBOX: 'bbox-epsg-3857',
          }}
        />

        <Controls className="absolute bottom-3 left-[554px] z-50">
          <RControl.RZoom />
          <BookmarkControl />
          <ShareControl />
        </Controls>
        <Legend />
      </RMap>
    </>
  );
};

export default Map;

'use client';

import React, { useMemo, useState, FC, useCallback, useEffect } from 'react';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import { MapBrowserEvent } from 'ol';
import { RLayerWMS, RMap, RLayerTile, RControl } from 'rlayers';
import { RView } from 'rlayers/RMap';

import { useLayerParsedSource } from '@/hooks/layers';
import {
  useSyncLayersSettings,
  useSyncCompareLayersSettings,
  useSyncCenterSettings,
  useSyncZoomSettings,
} from '@/hooks/sync-query';

import { DEFAULT_VIEWPORT } from './constants';
// map controls
import Controls from './controls';
import BookmarkControl from './controls/bookmark';
import ShareControl from './controls/share';
import SwipeControl from './controls/swipe';
import Legend from './legend';
import type { CustomMapProps } from './types';

const Map: FC<CustomMapProps> = ({ initialViewState = DEFAULT_VIEWPORT }) => {
  const searchParams = useSearchParams();
  const [layers] = useSyncLayersSettings();
  const [center, setCenter] = useSyncCenterSettings();
  const [zoom, setZoom] = useSyncZoomSettings();
  const layerId = useMemo(() => layers?.[0]?.id, [layers]);
  const layerOpacity = layers?.[0]?.opacity;
  const date = layers?.[0]?.date;
  const [, setNextSearchParams] = useState<string>(searchParams.toString());
  const [compareLayers] = useSyncCompareLayersSettings();
  const compareLayerId = compareLayers?.[0]?.id;
  const compareDate = compareLayers?.[0]?.date;

  const [, setIsCompareActive] = useState<boolean>(false);

  useEffect(() => {
    if (!!compareLayerId) {
      setIsCompareActive(true);
    } else {
      setIsCompareActive(false);
    }
  }, [compareLayers]); // // activates map at first render

  /**
   * Local viewport state
   */
  const [localViewState, setLocalViewState] = useState<RView>({
    center: center ? center : initialViewState.center,
    zoom: zoom ? Number(zoom) : initialViewState.zoom,
  });

  /**
   * Get the layer source from the API
   */
  const { data } = useLayerParsedSource(
    {
      layer_id: layerId,
    },
    {
      enabled: !!layerId,
    }
  );
  const { gs_base_wms, gs_name, range } = data || {};

  /**
   * Update the local viewport state when the user moves the map
   */
  const handleMapMove = useCallback<
    (e: MapBrowserEvent<UIEvent & { frameState: { viewState: RView } }>) => void
  >((e) => {
    setLocalViewState(e.frameState.viewState);
  }, []);

  /**
   * Update the URL when the user stops moving the map
   */
  const handleUpdateUrl = useCallback(() => {
    const originalSearchParams = new URLSearchParams(searchParams.toString());
    const nextSearchParams = new URLSearchParams({
      center: JSON.stringify(localViewState.center),
      zoom: localViewState.zoom?.toString(),
    });
    originalSearchParams.forEach((value, key) => {
      if (!nextSearchParams.has(key)) {
        nextSearchParams.set(key, value);
      }
    });
    setNextSearchParams(nextSearchParams.toString());
    void setCenter(localViewState.center);
    void setZoom(localViewState.zoom.toString());
  }, [searchParams, localViewState, setCenter, setZoom]);

  const sharedViewportSettings = {
    ...(center && { center }),
    ...(zoom && { zoom }),
  };

  const initialViewport = sharedViewportSettings ?? DEFAULT_VIEWPORT;

  return (
    <>
      <RMap
        width="100%"
        height="100%"
        className="relative"
        initial={initialViewport as RView}
        onChange={handleUpdateUrl}
        onMoveEnd={handleMapMove}
        view={[localViewState, handleUpdateUrl]}
        noDefaultControls
      >
        <RLayerTile
          properties={{ label: 'Basemap' }}
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attributions="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />

        {layerId && (
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
        )}

        {!!compareLayers?.[0]?.id && (
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
              DIM_DATE: compareDate || date,
              CRS: 'EPSG:3857',
              BBOX: 'bbox-epsg-3857',
            }}
          />
        )}

        <Controls className="absolute bottom-3 left-[554px] z-50">
          <RControl.RZoom />
          <BookmarkControl />
          <ShareControl />
          {!!compareLayers?.[0]?.id && <SwipeControl />}
        </Controls>
        {!!layerId && <Legend />}
      </RMap>
    </>
  );
};

export default Map;

'use client';

import React, { useMemo, FC, useCallback } from 'react';

import { MapBrowserEvent } from 'ol';
import { RLayerTileWMS, RMap, RLayerTile, RControl } from 'rlayers';
import { RView } from 'rlayers/RMap';

import { useLayerParsedSource } from '@/hooks/layers';
import {
  useSyncLayersSettings,
  useSyncCompareLayersSettings,
  useSyncCenterSettings,
  useSyncZoomSettings,
} from '@/hooks/sync-query';

import Attributions from './attributions';
import { DEFAULT_VIEWPORT } from './constants';
// map controls
import Controls from './controls';
import BookmarkControl from './controls/bookmark';
import ShareControl from './controls/share';
import SwipeControl from './controls/swipe';
import Legend from './legend';
import type { CustomMapProps } from './types';

const Map: FC<CustomMapProps> = ({ initialViewState = DEFAULT_VIEWPORT, isGeostory = false }) => {
  const [layers] = useSyncLayersSettings();
  const [center, setCenter] = useSyncCenterSettings();
  const [zoom, setZoom] = useSyncZoomSettings();

  // Layer from the URL
  const layerId = layers?.[0]?.id;
  const opacity = layers?.[0]?.opacity; // shared with the compare layer
  const date = layers?.[0]?.date;
  const isLayerActive = useMemo(() => !!layerId, [layerId]);

  // Compare layer from the URL
  const [compareLayers] = useSyncCompareLayersSettings();
  const compareLayerId = compareLayers?.[0]?.id;
  const compareDate = compareLayers?.[0]?.date;
  const isCompareLayerActive = useMemo(() => !!compareLayerId, [compareLayerId]);

  /**
   * Initial viewport from the URL or the default one
   */
  const initialViewport = {
    center: center ? center : initialViewState.center,
    zoom: zoom ? Number(zoom) : initialViewState.zoom,
  } satisfies RView;

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
   * Update the URL when the user stops moving the map
   */
  const handleMapMove = useCallback<
    (e: MapBrowserEvent<UIEvent & { frameState: { viewState: RView } }>) => void
  >(
    (e) => {
      const { center, zoom } = e.frameState.viewState;

      void setCenter(center);
      void setZoom(zoom.toString());
    },
    [setCenter, setZoom]
  );

  return (
    <>
      <RMap
        width="100%"
        height="100%"
        className="relative"
        initial={initialViewport}
        view={[initialViewport, null] as [RView, (view: RView) => void]}
        onMoveEnd={handleMapMove}
        noDefaultControls
      >
        <RLayerTile
          properties={{ label: 'Basemap' }}
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attributions="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />

        {layerId && (
          <RLayerTileWMS
            properties={{ label: gs_name, opacity, date, range }}
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

        {isCompareLayerActive && (
          <RLayerTileWMS
            properties={{ label: gs_name, opacity, date: compareDate, range }}
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
              DIM_DATE: compareDate,
              CRS: 'EPSG:3857',
              BBOX: 'bbox-epsg-3857',
            }}
          />
        )}

        <RLayerTile
          zIndex={100}
          url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        />

        <Controls className="absolute bottom-3 left-[554px] z-50 flex flex-col">
          <RControl.RZoom zoomOutLabel="-" zoomInLabel="+" />
          <BookmarkControl />
          <ShareControl />
          {isCompareLayerActive && <SwipeControl />}
        </Controls>
        {isLayerActive && <Legend isGeostory={isGeostory} />}
        <Attributions className="absolute bottom-3 left-[620px] z-50" />
      </RMap>
    </>
  );
};

export default Map;

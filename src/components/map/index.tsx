'use client';

import React, { useMemo, FC, useCallback, useEffect, useRef, useState } from 'react';

import { useParams } from 'next/navigation';

import axios from 'axios';
import type { MapBrowserEvent } from 'ol';
import ol from 'ol';
import TileWMS from 'ol/source/TileWMS';
import { RLayerWMS, RMap, RLayerTile, RControl } from 'rlayers';
import { RView } from 'rlayers/RMap';

import { useGeostory } from '@/hooks/geostories';
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
import MapTooltip from './tooltip';
import type { CustomMapProps } from './types';

const Map: FC<CustomMapProps> = ({ initialViewState = DEFAULT_VIEWPORT, isGeostory = false }) => {
  const mapRef: React.MutableRefObject<{
    map: ol.Map;
    ol: {
      getView: () => ol.View;
    };
  }> = useRef<null>(null);

  const layerRightRef = useRef(null);
  const layerLeftRef = useRef(null);
  const [tooltipPosition, setTooltipPosition] = useState<[number, number]>(null);
  const [tooltipValue, setTooltipValue] = useState<number>(null);
  const [layers] = useSyncLayersSettings();
  const [center, setCenter] = useSyncCenterSettings();
  const [zoom, setZoom] = useSyncZoomSettings();
  const { geostory_id } = useParams();
  const { data: geostory, isLoading: isLoadingGeostory } = useGeostory(
    { geostory_id: geostory_id as string },
    { enabled: isGeostory }
  );

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
  const { gs_base_wms, gs_name, range, title, unit } = data || {};

  /* Interactivity */
  const wmsSource = useMemo(() => {
    return new TileWMS({
      url: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
      params: { LAYERS: gs_name, TILED: true },
      serverType: 'geoserver',
      crossOrigin: 'anonymous',
    });
  }, [gs_name]);

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

  const handleSingleClick = useCallback(
    (e: MapBrowserEvent<UIEvent>) => {
      setTooltipValue(null);
      setTooltipPosition([e.pixel[0], e.pixel[1]]);
      const olMap: ol.Map = mapRef?.current?.map as unknown as ol.Map;
      const resolution = olMap?.getView()?.getResolution();
      // const resolution = mapRef?.current?.getView().getResolution() as number;
      const url = wmsSource.getFeatureInfoUrl(e.coordinate, resolution, 'EPSG:3857', {
        INFO_FORMAT: 'application/json',
      });
      axios
        .get<{ features: { properties: Record<string, number> }[] }>(url)
        .then(({ data }) => {
          const value = Object.values(data.features[0].properties)?.[0];
          setTooltipValue(value);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [wmsSource]
  );

  useEffect(() => {
    if (geostory && !isLoadingGeostory && geostory?.geostory_bbox && mapRef?.current) {
      // TO-DO: remove split once the API is fixed
      mapRef?.current?.ol
        ?.getView()
        ?.fit((geostory?.geostory_bbox as unknown as string).split(',').map(Number));
    }
  }, [geostory, isLoadingGeostory]);

  useEffect(() => {
    // Reset tooltip value whenever layerId changes
    setTooltipValue(null);
  }, [layerId]);

  return (
    <>
      <RMap
        ref={mapRef as unknown as React.RefObject<null>}
        projection="EPSG:3857"
        width="100%"
        height="100%"
        className="relative"
        initial={initialViewport}
        view={[initialViewport, null] as [RView, (view: RView) => void]}
        onMoveEnd={handleMapMove}
        onSingleClick={handleSingleClick}
        noDefaultControls
      >
        <RLayerTile
          properties={{ label: 'Basemap' }}
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attributions="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />

        {layerId && (
          <RLayerWMS
            ref={layerLeftRef}
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
          <RLayerWMS
            ref={layerRightRef}
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
          {isCompareLayerActive && (
            <SwipeControl layerLeft={layerLeftRef} layerRight={layerRightRef} />
          )}
        </Controls>
        {isLayerActive && <Legend isGeostory={isGeostory} />}
        <Attributions className="absolute bottom-3 left-[620px] z-50" />

        {/* Interactivity */}
        {tooltipPosition && typeof tooltipValue === 'number' && (
          <MapTooltip
            setTooltipPosition={setTooltipPosition}
            tooltipPosition={tooltipPosition}
            tooltipValue={tooltipValue}
            title={title}
            unit={unit}
          />
        )}
      </RMap>
    </>
  );
};

export default Map;

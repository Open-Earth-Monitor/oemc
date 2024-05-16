'use client';

import React, { useMemo, FC, useCallback, useEffect, useRef, useState } from 'react';

import axios from 'axios';
import type { MapBrowserEvent } from 'ol';
import ol from 'ol';
import type { Coordinate } from 'ol/coordinate';
import TileWMS from 'ol/source/TileWMS';
import { RLayerWMS, RMap, RLayerTile, RControl } from 'rlayers';
import { RView } from 'rlayers/RMap';

import type { GeostoryParsed } from '@/types/geostories';
import type { LayerParsed } from '@/types/layers';

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
import MapTooltip from './geostory-tooltip';
import Legend from './legend';
import type { CustomMapProps } from './types';

interface FeatureProperties {
  [key: string]: number;
}

interface Feature {
  properties: FeatureProperties;
}

interface FeatureInfoResponse {
  features: Feature[];
}

type TooltipInfo = {
  position: [number, number] | null;
  coordinate: Coordinate;
  leftData: {
    title: string;
    date: string;
    value: number;
  };
  rightData: {
    title: string;
    date: string;
    value: number;
  };
};

type GeostoryMapProps = CustomMapProps & {
  geostoryData: GeostoryParsed;
  layerData: LayerParsed;
  compareLayerData: LayerParsed;
};

const Map: FC<GeostoryMapProps> = ({
  initialViewState = DEFAULT_VIEWPORT,
  geostoryData,
  layerData,
  compareLayerData,
}) => {
  // const { map: mapRef } = useOL();
  const mapRef: React.MutableRefObject<{
    map: ol.Map;
    ol: {
      getView: () => ol.View;
    };
  }> = useRef<null>(null);

  const layerRightRef = useRef(null);
  const layerLeftRef = useRef(null);
  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo>({
    position: null,
    coordinate: null,
    leftData: {
      date: null,
      title: null,
      value: null,
    },
    rightData: {
      date: null,
      title: null,
      value: null,
    },
  });
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
  const compareOpacity = compareLayers?.[0]?.opacity;
  const compareDate = compareLayers?.[0]?.date;
  const isCompareLayerActive = useMemo(() => !!compareLayerId, [compareLayerId]);
  /**
   * Initial viewport from the URL or the default one
   */
  const initialViewport = {
    center: center ? center : initialViewState.center,
    zoom: zoom ? Number(zoom) : initialViewState.zoom,
  } satisfies RView;

  /* Interactivity */
  const wmsSource = useMemo(() => {
    return new TileWMS({
      url: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
      params: {
        position: layerLeftRef,
        name: layerData?.gs_name,
        LAYERS: layerData?.gs_name,
        TILED: true,
      },
      serverType: 'geoserver',
      crossOrigin: 'anonymous',
    });
  }, [layerData?.gs_name]);

  const wmsCompareSource = useMemo(() => {
    return new TileWMS({
      url: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
      params: {
        position: layerRightRef,
        name: compareLayerData?.gs_name,
        LAYERS: compareLayerData?.gs_name,
        TILED: true,
      },
      serverType: 'geoserver',
      crossOrigin: 'anonymous',
    });
  }, [compareLayerData?.gs_name]);

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

  const fetchTooltipValue = useCallback(
    async (coordinate: Coordinate) => {
      const resolution = mapRef.current?.ol.getView()?.getResolution();
      if (!resolution) return;

      const urlLeft = wmsSource.getFeatureInfoUrl(coordinate, resolution, 'EPSG:3857', {
        INFO_FORMAT: 'application/json',
        DIM_DATE: date,
        LAYERS: layerData.gs_name,
      });

      let valueLeft: number | null = null;
      let valueRight: number | null = null;

      try {
        const responseLeft = await axios.get<FeatureInfoResponse>(urlLeft);
        if (responseLeft.data.features.length > 0 && responseLeft.data.features[0].properties) {
          const properties = responseLeft.data.features[0].properties;
          valueLeft = Object.values(properties)[0];
        }

        const urlRight = wmsCompareSource.getFeatureInfoUrl(coordinate, resolution, 'EPSG:3857', {
          INFO_FORMAT: 'application/json',
          LAYERS: compareLayerData.gs_name,
        });
        const responseRight = await axios.get<FeatureInfoResponse>(urlRight);
        if (responseRight.data.features.length > 0 && responseRight.data.features[0].properties) {
          const properties = responseRight.data.features[0].properties;
          valueRight = Object.values(properties)[0];
        }

        setTooltipInfo((prev) => ({
          ...prev,
          leftData: {
            title: layerData.title,
            date,
            value: valueLeft,
          },
          rightData: {
            title: compareLayerData.title,
            date: compareDate || '',
            value: valueRight,
          },
        }));
      } catch {
        setTooltipInfo((prev) => ({
          ...prev,
          leftData: {
            title: '',
            date: '',
            value: null,
          },
          rightData: {
            title: '',
            date: '',
            value: null,
          },
        }));
      }
    },
    [
      date,
      compareDate,
      wmsSource,
      wmsCompareSource,
      compareLayerData,
      isCompareLayerActive,
      layerData,
    ]
  );

  useEffect(() => {
    if (tooltipInfo.position) {
      void fetchTooltipValue(tooltipInfo.coordinate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tooltipInfo.position]);

  const handleSingleClick = useCallback(
    (e: MapBrowserEvent<UIEvent>) => {
      const newTooltipInfo: TooltipInfo = {
        ...tooltipInfo,
        coordinate: e.coordinate,
        position: [e.pixel[0], e.pixel[1]],
      };
      setTooltipInfo({ ...newTooltipInfo });
    },
    [setTooltipInfo, tooltipInfo]
  );

  const handleCloseTooltip = useCallback(() => {
    const newTooltipInfo = { ...tooltipInfo, value: null, position: null };
    setTooltipInfo(newTooltipInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Center to the geostory bbox
  useEffect(() => {
    if (geostoryData?.geostory_bbox && mapRef && !center) {
      // TO-DO: remove split once the API is fixed
      mapRef?.current?.ol
        ?.getView()
        ?.fit((geostoryData?.geostory_bbox as unknown as string).split(',').map(Number));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geostoryData?.geostory_bbox]);

  useEffect(() => {
    // Reset tooltip value whenever layerId changes
    const newTooltipInfo = { ...tooltipInfo, value: null, position: null };
    setTooltipInfo(newTooltipInfo);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layerId, compareLayerId]);

  // Update tooltip value when the layer changes and it's already open
  useEffect(() => {
    if (tooltipInfo.position) {
      void fetchTooltipValue(tooltipInfo.coordinate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <>
      <RMap
        ref={mapRef as unknown as React.RefObject<null>}
        projection="EPSG:3857"
        width="100%"
        height="100%"
        className="relative"
        initial={initialViewport}
        // view={[initialViewport, null] as [RView, (view: RView) => void]}
        onMoveEnd={handleMapMove}
        onSingleClick={handleSingleClick}
        noDefaultControls
      >
        <RLayerTile
          properties={{ label: 'Basemap' }}
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attributions="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />

        {layerData && layerId && (
          <RLayerWMS
            ref={layerLeftRef}
            properties={{ label: layerData.gs_name, date }}
            url={layerData.gs_base_wms}
            opacity={opacity}
            params={{
              FORMAT: 'image/png',
              WIDTH: 256,
              HEIGHT: 256,
              SERVICE: 'WMS',
              VERSION: '1.3.0',
              REQUEST: 'GetMap',
              TRANSPARENT: true,
              LAYERS: layerData.gs_name,
              DIM_DATE: date,
              CRS: 'EPSG:3857',
              BBOX: 'bbox-epsg-3857',
              NAME: layerData.gs_name,
              ID: layerId,
            }}
          />
        )}

        {compareLayerData && compareLayerId && (
          <RLayerWMS
            ref={layerRightRef}
            properties={{ label: compareLayerData.gs_name }}
            url={compareLayerData.gs_base_wms}
            opacity={compareOpacity}
            params={{
              FORMAT: 'image/png',
              WIDTH: 256,
              HEIGHT: 256,
              SERVICE: 'WMS',
              VERSION: '1.3.0',
              REQUEST: 'GetMap',
              TRANSPARENT: true,
              LAYERS: compareLayerData.gs_name,
              CRS: 'EPSG:3857',
              BBOX: 'bbox-epsg-3857',
              NAME: compareLayerData.gs_name,
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
          {isCompareLayerActive && layerData && compareLayerData && (
            <SwipeControl layerLeft={layerLeftRef} layerRight={layerRightRef} />
          )}
        </Controls>
        {isLayerActive && <Legend isGeostory />}
        <Attributions className="absolute bottom-3 left-[620px] z-50" />

        {/* Interactivity */}
        {layerData && <MapTooltip onCloseTooltip={handleCloseTooltip} {...tooltipInfo} />}
      </RMap>
    </>
  );
};

export default Map;

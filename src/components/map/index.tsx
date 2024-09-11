'use client';

import React, { useMemo, FC, useCallback, useEffect, useRef, useState, ChangeEvent } from 'react';

import { useMediaQuery } from 'react-responsive';

import axios from 'axios';
import type { MapBrowserEvent } from 'ol';
import ol from 'ol';
import type { Coordinate } from 'ol/coordinate';
import { fromLonLat } from 'ol/proj';
import TileWMS from 'ol/source/TileWMS';
import { RLayerWMS, RMap, RLayerTile, RControl } from 'rlayers';
import { RView } from 'rlayers/RMap';

import cn from '@/lib/classnames';
import { mobile, tablet } from '@/lib/media-queries';

import { useDebounce } from '@/hooks/datasets';
import { useLayerParsedSource } from '@/hooks/layers';
import { useOpenStreetMapsLocations } from '@/hooks/openstreetmaps';
import {
  useSyncLayersSettings,
  useSyncCompareLayersSettings,
  useSyncCenterSettings,
  useSyncZoomSettings,
} from '@/hooks/sync-query';

import LocationSearchComponent from '@/components/location-search';
import WebTraffic from '@/components/web-traffic';

import Attributions from './attributions';
import { DEFAULT_VIEWPORT } from './constants';
// map controls
import Controls from './controls';
import BookmarkControl from './controls/bookmark';
import ShareControl from './controls/share';
import SwipeControl from './controls/swipe';
import Legend from './legend';
import MapTooltip from './tooltip';
import type { CustomMapProps, MonitorTooltipInfo, Bbox } from './types';

interface FeatureProperties {
  [key: string]: number;
}

interface Feature {
  properties: FeatureProperties;
}

interface FeatureInfoResponse {
  features: Feature[];
}

interface ClickEvent {
  bbox?: Bbox;
}

const TooltipInitialState = {
  position: null,
  coordinate: null,
  leftData: {
    date: null,
    title: null,
    value: null,
    range: [],
    rangeLabels: [],
    isComparable: false,
  },
  rightData: {
    date: null,
    title: null,
    value: null,
  },
};

const Map: FC<CustomMapProps> = ({ initialViewState = DEFAULT_VIEWPORT }) => {
  const [locationSearch, setLocationSearch] = useState('');
  const isMobile = useMediaQuery(mobile);
  const isTablet = useMediaQuery(tablet);
  const isDesktop = !isMobile && !isTablet;

  const debouncedSearchValue = useDebounce(locationSearch, 500);

  const mapRef: React.MutableRefObject<{
    map: ol.Map;
    ol: {
      getView: () => ol.View;
    };
  }> = useRef<null>(null);

  const layerRightRef = useRef(null);
  const layerLeftRef = useRef(null);
  const [tooltipInfo, setTooltipInfo] = useState<MonitorTooltipInfo>(TooltipInitialState);
  const [layers] = useSyncLayersSettings();
  const [center, setCenter] = useSyncCenterSettings();
  const [zoom, setZoom] = useSyncZoomSettings();

  // Layer from the URL
  const layerId = layers?.[0]?.id;
  const opacity = layers?.[0]?.opacity || 1; // shared with the compare layer
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
  const { data, isLoading } = useLayerParsedSource(
    {
      layer_id: layerId,
    },
    {
      enabled: !!layerId,
    }
  );
  const { gs_base_wms, gs_name, title, unit, range, range_labels } = data || {};

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

  const fetchTooltipValue = useCallback(
    async (coordinate) => {
      setTooltipInfo((prev) => ({ ...prev, value: null }));
      const resolution = mapRef.current?.ol.getView()?.getResolution();
      if (!resolution) return;
      const urlLeft = wmsSource.getFeatureInfoUrl(
        coordinate as Coordinate,
        resolution,
        'EPSG:3857',
        {
          INFO_FORMAT: 'application/json',
          DIM_DATE: date,
          LAYERS: gs_name,
        }
      );

      let valueLeft: number | null = null;
      let valueRight: number | null = null;

      try {
        const responseLeft = await axios.get<FeatureInfoResponse>(urlLeft);
        valueLeft = responseLeft.data.features[0]?.properties
          ? Object.values(responseLeft.data.features[0].properties)[0]
          : null;
        if (compareDate) {
          const urlRight = wmsSource.getFeatureInfoUrl(
            coordinate as Coordinate,
            resolution,
            'EPSG:3857',
            {
              INFO_FORMAT: 'application/json',
              DIM_DATE: compareDate,
              LAYERS: gs_name,
            }
          );
          const responseRight = await axios.get<FeatureInfoResponse>(urlRight);
          valueRight = responseRight.data.features[0]?.properties
            ? Object.values(responseRight.data.features[0].properties)[0]
            : null;
        }

        setTooltipInfo((prev) => ({
          ...prev,
          leftData: {
            title,
            date,
            value: valueLeft,
            unit,
            range,
            rangeLabels: range_labels,
            isComparable: range?.length > 1 && !!compareDate,
          },
          rightData: { title, date: compareDate, value: valueRight, unit },
        }));
      } catch {
        setTooltipInfo((prev) => ({ ...prev, value: null }));
      }
    },
    [date, compareDate, gs_name, title, wmsSource, unit, range, range_labels]
  );

  const handleSingleClick = useCallback(
    (e: MapBrowserEvent<UIEvent>) => {
      const newTooltipInfo: MonitorTooltipInfo = {
        ...tooltipInfo,
        leftData: {
          ...tooltipInfo.leftData,
          value: null,
        },
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
  }, [date, tooltipInfo.position, compareDate]);

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
      ] as Bbox,
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
    },
    [isDesktop, isMobile]
  );

  return (
    <>
      <RMap
        ref={mapRef as unknown as React.RefObject<null>}
        projection="EPSG:3857"
        width="100%"
        height="100%"
        className="relative"
        initial={initialViewport}
        onMoveEnd={handleMapMove}
        onSingleClick={handleSingleClick}
        noDefaultControls
      >
        <RLayerTile
          properties={{ label: 'Basemap' }}
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attributions="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        />

        {data && !isLoading && (
          <RLayerWMS
            ref={layerLeftRef}
            properties={{ label: gs_name, date }}
            url={gs_base_wms}
            opacity={opacity}
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

        {compareDate && data && !isLoading && (
          <RLayerWMS
            ref={layerRightRef}
            properties={{ label: gs_name, date: compareDate }}
            url={gs_base_wms}
            opacity={opacity}
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
            visible={isCompareLayerActive}
          />
        )}

        <RLayerTile
          zIndex={100}
          url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        />

        <Controls>
          <LocationSearchComponent
            locationSearch={locationSearch}
            OPTIONS={OPTIONS}
            handleLocationSearchChange={handleLocationSearchChange}
            handleClick={handleClick}
            isLoading={isLoadingLocationData}
            isFetching={isFetchingLocationData}
            isMobile={isMobile}
          />
          {!isMobile && (
            <RControl.RZoom className="ol-zoom" key="ol-zoom" zoomOutLabel="-" zoomInLabel="+" />
          )}

          <div
            className={cn({
              'absolute flex w-full flex-col items-end justify-end space-y-1.5': true,
              'top-12': isMobile,
              'top-[108px]': !isMobile,
            })}
          >
            {/* <WebTraffic isMobile={isMobile} /> */}
            <BookmarkControl isMobile={isMobile} />
            <ShareControl isMobile={isMobile} />
          </div>
          {isCompareLayerActive && data && !isLoading && (
            <SwipeControl layerLeft={layerLeftRef} layerRight={layerRightRef} />
          )}
        </Controls>

        {isLayerActive && <Legend />}
        <Attributions className="absolute bottom-0 z-40 sm:left-auto sm:right-3 lg:bottom-3 lg:left-[620px]" />

        {/* Interactivity */}
        {data && <MapTooltip onCloseTooltip={handleCloseTooltip} {...tooltipInfo} />}
      </RMap>
    </>
  );
};

export default Map;

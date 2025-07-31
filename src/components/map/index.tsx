'use client';

import { useState, useRef, useMemo, FC, useCallback, useEffect } from 'react';

import axios from 'axios';
import type { MapBrowserEvent } from 'ol';
import ol from 'ol';
import type { Coordinate } from 'ol/coordinate';
import { fromLonLat, toLonLat } from 'ol/proj';
import TileWMS from 'ol/source/TileWMS';
import { RLayerWMS, RMap, RLayerTile, RControl } from 'rlayers';

import { useParams } from 'next/navigation';

import { useAtom, useSetAtom } from 'jotai';
import { useLayer, useLayerParsedSource } from '@/hooks/layers';
import { useMonitors } from '@/hooks/monitors';
import {
  useSyncLayersSettings,
  useSyncCompareLayersSettings,
  useSyncBboxSettings,
  useSyncBasemapSettings,
} from '@/hooks/sync-query';

import {
  compareFunctionalityAtom,
  coordinateAtom,
  histogramVisibilityAtom,
  lonLatAtom,
  nutsDataParamsCompareAtom,
  regionsLayerVisibilityAtom,
} from '@/app/store';
import { Size } from 'ol/size';
import Attributions from './attributions';
import { DEFAULT_VIEWPORT, InitialViewport } from './constants';

// map controls
import Controls from './controls';
import MapTooltip from './tooltip';
import Legend from './legend';

import type { CustomMapProps, MonitorTooltipInfo } from './types';

import type { FeatureInfoResponse } from './types';
import { getHistogramData } from '../../lib/utils';

import { Extent } from 'ol/extent';
import BasemapControl from './controls/basemaps';
import BasemapLayer from './basemap';
import Histogram from '@/containers/histogram';

interface ClickEvent {
  bbox?: Extent;
}

const TooltipInitialState = {
  position: null,
  coordinate: null,
  leftData: {
    id: null,
    date: null,
    title: null,
    value: null,
    range: [],
    rangeLabels: [],
    isComparable: false,
  },
  rightData: {
    id: null,
    date: null,
    title: null,
    value: null,
  },
};

const Map: FC<CustomMapProps> = ({ initialViewState = DEFAULT_VIEWPORT }) => {
  const [locationSearch, setLocationSearch] = useState('');
  const [isRegionsLayerActive, setIsRegionsLayerActive] = useAtom(regionsLayerVisibilityAtom);

  const [isHistogramActive, isHistogramVisibility] = useAtom(histogramVisibilityAtom);
  const [basemap] = useSyncBasemapSettings();
  const setNutsDataParamsCompare = useSetAtom(nutsDataParamsCompareAtom);
  const [compareFunctionalityInfo, setCompareFunctionalityInfo] = useAtom(compareFunctionalityAtom);
  const [bbox, setBbox] = useSyncBboxSettings();
  const [nutsProperties, setNutsProperties] = useState(null);
  const [compareNutsProperties, setCompareNutsProperties] = useState(null);
  const setCoordinate = useSetAtom(coordinateAtom);

  const [lonLat, setLonLat] = useAtom(lonLatAtom);
  const params = useParams();
  const monitorId = params.monitor_id as string;

  const { data: monitorsData } = useMonitors();
  const monitorData = monitorsData?.find((d) => d.id === monitorId);
  const debouncedSearchValue = useDebounce(locationSearch, 500);
  const mapRef: React.MutableRefObject<{
    map: ol.Map;
    ol: {
      getView: () => ol.View;
      getSize: () => Size;
      getPixelFromCoordinate: (coordinate: Coordinate) => [number, number];
    };
  }> = useRef<null>(null);

  const layerRightRef = useRef(null);
  const layerLeftRef = useRef(null);
  const nutsLayer = useRef(null);

  const [tooltipInfo, setTooltipInfo] = useState<MonitorTooltipInfo>(TooltipInitialState);
  const [layers] = useSyncLayersSettings();

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

  const { data: compareData } = useLayer({ layer_id: compareLayerId });

  // bbox that come defined in the monitor itself
  const predefinedBbox = monitorData?.monitor_bbox;

  // check URL in case the site has been shared, if not get predefined bbox if not use the default one
  const monitorBbox = useMemo(() => {
    if (bbox) return bbox;
    if (predefinedBbox) return predefinedBbox;
    return initialViewState.bbox;
  }, [bbox, predefinedBbox, initialViewState.bbox]);

  /**
   * Initial viewport from the URL or the default one
   */
  const initialViewport = {
    zoom: initialViewState.zoom,
    center: initialViewState.center,
    bbox: monitorBbox,
  } satisfies InitialViewport;

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
  const handleMapMove = useCallback(() => {
    if (!mapRef.current) return;

    const map = mapRef.current.ol;
    const mapSize = map.getSize();

    if (!mapSize) return;

    const bbox = map.getView().calculateExtent(mapSize);

    setBbox(bbox);
  }, [setBbox]);

  const handleMapDrag = useCallback(() => {
    if (!mapRef.current) return;

    const map = mapRef.current.ol;
    // Ensure tooltip position updates only if we have a coordinate
    if (tooltipInfo.coordinate) {
      const updatedPixelPosition = map.getPixelFromCoordinate(tooltipInfo.coordinate);

      setTooltipInfo((prev) => ({
        ...prev,
        position: updatedPixelPosition, // Updated pixel position
      }));
    }
  }, [setTooltipInfo, tooltipInfo.coordinate]);

  const wmsNutsSource = useMemo(() => {
    return new TileWMS({
      url: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
      params: {
        TILED: true,
        ID: true,
        name: 'oem:NUTS_RG_01M_2021_3035',
        LAYERS: 'oem:NUTS_RG_01M_2021_3035',
      },
      serverType: 'geoserver',
      crossOrigin: 'anonymous',
    });
  }, []);

  const fetchTooltipValue = useCallback(
    async (coordinate) => {
      setCoordinate(coordinate);
      const resolution = mapRef.current?.ol.getView()?.getResolution();
      if (!resolution) return;
      const NUTS_layer = wmsNutsSource?.getFeatureInfoUrl(
        coordinate as Coordinate,
        resolution,
        'EPSG:3857',
        {
          INFO_FORMAT: 'application/json',
          LAYERS: 'oem:NUTS_RG_01M_2021_3035',
        }
      );
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

      let valueLeft: number | string | null = null;
      let valueRight: number | string | null = null;

      try {
        const responseLeft = await axios.get<FeatureInfoResponse>(urlLeft);
        const NUTS_layer_response = await axios.get<FeatureInfoResponse>(NUTS_layer);
        const properties = responseLeft.data.features[0].properties;

        valueLeft = properties ? Object.values(properties)[0] : null;
        const nutProperties = NUTS_layer_response.data.features[0].properties;

        setNutsProperties(nutProperties);
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
            // This info is coming from the API instead of the layer, as requested
            id: layerId,
            title,
            date,
            value: valueLeft,
            unit,
            range,
            rangeLabels: range_labels,
            isComparable: range?.length > 1 && !!compareDate,
          },
          rightData: {
            id: compareLayerId,
            title,
            date: compareDate,
            value: valueRight,
            unit: compareData?.unit,
          },
        }));
      } catch {
        setTooltipInfo((prev) => ({ ...prev, value: null }));
      }
    },
    [date, compareDate, gs_name, title, wmsSource, unit, range, range_labels, wmsNutsSource]
  );

  const handleSingleClick = useCallback(
    (e: MapBrowserEvent<UIEvent>) => {
      if (compareFunctionalityInfo) {
        const resolution = e.map.getView()?.getResolution();
        getHistogramData(wmsNutsSource, e.coordinate, resolution, layerId).then((data) => {
          setNutsDataParamsCompare(data?.nutsDataParams);
          setCompareFunctionalityInfo(false);
          setCompareNutsProperties(data?.properties);
        });
        return;
      }

      setNutsDataParamsCompare({ NUTS_ID: '', LAYER_ID: '' });
      setCompareNutsProperties(null);
      const coordinatedToDegrees = toLonLat(e.coordinate);
      setLonLat(coordinatedToDegrees);

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
    [setTooltipInfo, tooltipInfo, compareFunctionalityInfo]
  );

  const handleCloseTooltip = useCallback(() => {
    const newTooltipInfo = { ...tooltipInfo, value: null, position: null };
    setTooltipInfo(newTooltipInfo);
    isHistogramVisibility(false);
    setNutsDataParamsCompare({ NUTS_ID: '', LAYER_ID: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegionsLayer = useCallback(() => {
    setIsRegionsLayerActive((prev) => !prev);
  }, [setIsRegionsLayerActive]);

  useEffect(() => {
    if (monitorBbox && mapRef) {
      setBbox(monitorBbox);
      mapRef?.current?.ol?.getView()?.fit(monitorBbox);
    }
  }, [monitorBbox]);

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
    [isDesktop, isMobile]
  );

  const layerData = useLayer({ layer_id: layerId });

  return (
    <RMap
      ref={mapRef as unknown as React.RefObject<null>}
      projection="EPSG:3857"
      width="100%"
      height="100%"
      className="relative"
      initial={initialViewport}
      onMoveEnd={handleMapMove}
      onPointerDrag={handleMapDrag}
      onSingleClick={handleSingleClick}
      noDefaultControls
    >
      <BasemapLayer />

      {isRegionsLayerActive && (
        <RLayerWMS
          ref={nutsLayer}
          properties={{ label: 'NUTS' }}
          url="https://geoserver.earthmonitor.org/geoserver/oem/wms"
          opacity={0.2}
          params={{
            FORMAT: 'image/png',
            WIDTH: 768,
            HEIGHT: 566,
            SERVICE: 'WMS',
            VERSION: '1.1.0',
            REQUEST: 'GetMap',
            TRANSPARENT: true,
            LAYERS: 'oem:NUTS_RG_01M_2021_3035',
            SRS: 'EPSG:3857', // Changing projection to EPSG:3857 (for WMS 1.1.0)
            BBOX: [-20037508.34, -20037508.34, 20037508.34, 20037508.34], // BBOX for EPSG:3857 (World extent)
            NAME: 'NUTS',
          }}
        />
      )}

      {data && !isLoading && isLayerActive && (
        <RLayerWMS
          ref={layerLeftRef}
          properties={{ label: gs_name, date }}
          url={gs_base_wms}
          opacity={opacity ?? 1}
          params={{
            FORMAT: 'image/png',
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

      {compareDate && data && !isLoading && isCompareLayerActive && (
        <RLayerWMS
          ref={layerRightRef}
          properties={{ label: gs_name, date: compareDate }}
          url={gs_base_wms}
          opacity={opacity ?? 1}
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

      {basemap === 'world_imagery' && (
        <RLayerTile
          zIndex={100}
          url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
        />
      )}

      <Controls>
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

        {isLayerActive && <Legend />}
        <Attributions className="absolute bottom-0 z-40 sm:left-auto sm:right-3 lg:bottom-3 lg:left-[620px]" />
        {/* {layerData && isHistogramActive ? (
          !isRegionsLayerActive ? (
            <PointHistogram
              onCloseTooltip={handleCloseTooltip}
              layerId={layerId}
              compareLayerId={compareLayerId}
              isRegionsLayerActive={isRegionsLayerActive}
              {...tooltipInfo}
            />
          ) : (
            <RegionsHistogram
              onCloseTooltip={handleCloseTooltip}
              layerId={layerId}
              compareLayerId={compareLayerId}
              onCompareClose={() => {
                setNutsDataParamsCompare({ NUTS_ID: '', LAYER_ID: '' });
                setCompareNutsProperties(null);
              }}
              {...tooltipInfo}
              nutsProperties={nutsProperties}
              compareNutProperties={compareNutsProperties}
            />
          )
        ) : null} */}
      </RMap>
      {/* Interactivity */}
      {data && (
        <MapTooltip
          {...tooltipInfo}
          nutsProperties={nutsProperties}
          onCloseTooltip={handleCloseTooltip}
        />
      )}
    </RMap>
  );
};

export default Map;

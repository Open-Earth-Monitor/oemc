'use client';

import { useMemo, FC, useCallback, useEffect, useRef, useState, ChangeEvent } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useMediaQuery } from 'react-responsive';

import axios from 'axios';
import type { MapBrowserEvent } from 'ol';
import ol from 'ol';
import { Size } from 'ol/size';
import type { Coordinate } from 'ol/coordinate';
import { fromLonLat, toLonLat } from 'ol/proj';
import TileWMS from 'ol/source/TileWMS';
import { RLayerWMS, RMap, RLayerTile, RControl } from 'rlayers';

import { cn } from '@/lib/classnames';
import { mobile, tablet } from '@/lib/media-queries';

import { useDebounce } from '@/hooks/datasets';
import { useOpenStreetMapsLocations } from '@/hooks/openstreetmaps';
import {
  useSyncLayersSettings,
  useSyncCompareLayersSettings,
  useSyncBboxSettings,
  useSyncBasemapSettings,
  useSyncBasemapLabelsSettings,
} from '@/hooks/sync-query';

import {
  coordinateAtom,
  lonLatAtom,
  regionsLayerVisibilityAtom,
  histogramLayerLeftVisibilityAtom,
  nutsDataParamsCompareAtom,
  compareFunctionalityAtom,
} from '@/app/store';

import LocationSearchComponent from '@/components/location-search';

import GeostoryContent from '../geostories/content';

import Attributions from './attributions';
import { DEFAULT_VIEWPORT } from './constants';
// map controls
import Controls from './controls';
import BookmarkControl from './controls/bookmark';
import ShareControl from './controls/share';
import SwipeControl from './controls/swipe';
import MapTooltip from './geostory-tooltip';
import { Legend } from './legend';
import type { GeostoryMapProps, GeostoryTooltipInfo, FeatureInfoResponse } from './types';
import PointHistogram from './stats/point-histogram';
import RegionsHistogram from './stats/region-histogram';
import CompareRegionsStatistics from './controls/compare-regions';
import { getHistogramData } from './utils';

import { Extent } from 'ol/extent';
import { InitialViewport } from './constants';
import BasemapControl from './controls/basemaps';
import BasemapLayer from './basemap';
import { RView } from 'rlayers/RMap';
import { LABELS } from './controls/basemaps/constants';

interface ClickEvent {
  bbox?: Extent;
}

const Map: FC<GeostoryMapProps> = ({
  initialViewState = DEFAULT_VIEWPORT,
  geostoryData,
  layerData,
  compareLayerData,
}) => {
  const [basemap] = useSyncBasemapSettings();
  const [locationSearch, setLocationSearch] = useState('');
  const isMobile = useMediaQuery(mobile);
  const isTablet = useMediaQuery(tablet);
  const isDesktop = !isMobile && !isTablet;
  const [leftLayerHistogramVisibility, setLeftLayerHistogramVisibility] = useAtom(
    histogramLayerLeftVisibilityAtom
  );

  const setCoordinate = useSetAtom(coordinateAtom);

  const [isRegionsLayerActive, setIsRegionsLayerActive] = useAtom(regionsLayerVisibilityAtom);
  const [lonLat, setLonLat] = useAtom(lonLatAtom);

  const debouncedSearchValue = useDebounce(locationSearch, 500);

  // const { map: mapRef } = useOL();
  const mapRef: React.MutableRefObject<{
    map: ol.Map;
    ol: {
      getView: () => ol.View;
      getSize: () => Size;
      getPixelFromCoordinate: (coordinate: Coordinate) => [number, number];
    };
  }> = useRef<null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const pointCoordinates = fromLonLat([2.1734, 41.3851]);
  const layerRightRef = useRef(null);
  const layerLeftRef = useRef(null);
  const nutsLayer = useRef(null);

  const TooltipInitialState = {
    position: null,
    coordinate: null,
    leftData: {
      id: null,
      date: null,
      title: null,
      value: null,
    },
    rightData: {
      id: null,
      date: null,
      title: null,
      value: null,
    },
  };
  const [tooltipInfo, setTooltipInfo] = useState<GeostoryTooltipInfo>(TooltipInitialState);
  const [layers] = useSyncLayersSettings();
  const [bbox, setBbox] = useSyncBboxSettings();
  const [nutsProperties, setNutsProperties] = useState(null);
  const [compareNutsProperties, setCompareNutsProperties] = useState(null);
  const setNutsDataParamsCompare = useSetAtom(nutsDataParamsCompareAtom);
  const [compareFunctionalityInfo, setCompareFunctionalityInfo] = useAtom(compareFunctionalityAtom);

  // Layer from the URL
  const layerId = layers?.[0]?.id;
  const opacity = layers?.[0]?.opacity || 1; // shared with the compare layer
  const date = layers?.[0]?.date;
  const isLayerActive = useMemo(() => !!layerId, [layerId]);

  // Compare layer from the URL
  const [compareLayers] = useSyncCompareLayersSettings();
  const compareLayerId = compareLayers?.[0]?.id;
  const compareOpacity = compareLayers?.[0]?.opacity;
  const compareDate = compareLayers?.[0]?.date;
  const isCompareLayerActive = useMemo(() => !!compareLayerId, [compareLayerId]);
  const [activeLabels] = useSyncBasemapLabelsSettings();

  // bbox that come defined in the geostory
  const predefinedBbox = geostoryData?.geostory_bbox;

  // check URL in case the site has been shared, if not get predefined bbox if not use the default one
  const geostoryBbox = useMemo(() => {
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
    bbox: geostoryBbox,
  } satisfies InitialViewport;

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

  /**
   * Update the URL when the user stops moving the map
   */
  const handleMapMove = useCallback(() => {
    if (!mapRef.current) return;

    const map = mapRef.current.ol;
    const mapSize = map.getSize();

    if (!mapSize) return;

    const bbox = map.getView().calculateExtent(mapSize);

    // Ensure tooltip position updates only if we have a coordinate
    if (tooltipInfo.coordinate) {
      const updatedPixelPosition = map.getPixelFromCoordinate(tooltipInfo.coordinate);

      setTooltipInfo((prev) => ({
        ...prev,
        position: updatedPixelPosition, // Updated pixel position
      }));
    }

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

  const fetchTooltipValue = useCallback(
    async (coordinate) => {
      setCoordinate(coordinate);
      const resolution = mapRef.current?.ol.getView()?.getResolution();
      // setResolution(resolution);
      if (!resolution || !coordinate) return;

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
          LAYERS: layerData?.gs_name,
        }
      );

      const urlRight = wmsCompareSource?.getFeatureInfoUrl(
        coordinate as Coordinate,
        resolution,
        'EPSG:3857',
        {
          INFO_FORMAT: 'application/json',
          LAYERS: compareLayerData?.gs_name,
        }
      );

      let valueLeft: number | string | null;
      let valueRight: number | string | null;
      try {
        const responseLeft = await axios.get<FeatureInfoResponse>(urlLeft);
        const NUTS_layer_response = await axios.get<FeatureInfoResponse>(NUTS_layer);

        const nutProperties = NUTS_layer_response?.data?.features?.[0]?.properties;
        if (nutProperties) {
          setNutsProperties(nutProperties);
        }

        if (responseLeft.data.features?.length > 0 && responseLeft.data.features[0].properties) {
          const properties = responseLeft.data.features[0].properties;
          valueLeft = Object.values(properties)[0];
        }

        if (compareLayerData) {
          const responseRight = await axios.get<FeatureInfoResponse>(urlRight);
          if (
            responseRight.data.features?.length > 0 &&
            responseRight.data.features[0].properties
          ) {
            const properties = responseRight.data.features[0].properties;
            valueRight = Object.values(properties)[0];
          }
        }

        setTooltipInfo((prev) => {
          return {
            ...prev,
            leftData: {
              // This info is coming from the API instead of the layer, as requested
              id: layerId,
              title: layerData?.title,
              date,
              unit: layerData?.unit,
              value: valueLeft,
              isComparable: layerData?.range?.length > 1,
            },
            rightData: {
              id: compareLayerId,
              title: compareLayerData?.title,
              date: compareDate || '',
              unit: compareLayerData?.unit,
              value: valueRight,
            },
          };
        });
      } catch {
        setTooltipInfo((prev) => ({
          ...prev,
          leftData: {
            id: null,
            title: '',
            date: '',
            value: null,
            unit: null,
          },
          rightData: {
            id: null,
            title: '',
            date: '',
            value: null,
            unit: null,
          },
        }));
      }
    },
    [date, compareDate, wmsSource, wmsCompareSource, compareLayerData, layerData]
  );

  // Update tooltip value when the layer changes and it's already open
  useEffect(() => {
    if (tooltipInfo.position) {
      void fetchTooltipValue(tooltipInfo.coordinate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tooltipInfo.position, tooltipInfo.coordinate, date]);

  const handleSingleClick = useCallback(
    (e: MapBrowserEvent<UIEvent>) => {
      if (compareFunctionalityInfo) {
        const resolution = e.map.getView()?.getResolution();
        getHistogramData(wmsNutsSource, e.coordinate, resolution, layerId).then((data) => {
          setTooltipInfo((prev) => {
            return {
              ...prev,
              compareNutProperties: data.properties,
            };
          });
          setCompareNutsProperties(data?.properties);
          setNutsDataParamsCompare(data?.nutsDataParams);
          setCompareFunctionalityInfo(false);
        });
        return;
      }

      setNutsDataParamsCompare({ NUTS_ID: '', LAYER_ID: '' });
      setCompareNutsProperties(null);
      const coordinatedToDegrees = toLonLat(e.coordinate);
      setLonLat(coordinatedToDegrees);

      const newTooltipInfo: GeostoryTooltipInfo = {
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
    setLeftLayerHistogramVisibility(false);
    setNutsDataParamsCompare({ NUTS_ID: '', LAYER_ID: '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (geostoryBbox && mapRef) {
      setBbox(geostoryBbox);
      mapRef?.current?.ol?.getView()?.fit(geostoryBbox);
    }
  }, [geostoryBbox]);

  useEffect(() => {
    // Reset tooltip value whenever layerId changes
    const newTooltipInfo = { ...tooltipInfo, value: null, position: null };
    setTooltipInfo(newTooltipInfo);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layerId, compareLayerId]);

  const handleLocationSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setLocationSearch(e.target.value);
    },
    [setLocationSearch]
  );

  const {
    data: locationData = [],
    isLoading = false,
    isFetching = false,
  } = useOpenStreetMapsLocations(
    {
      q: debouncedSearchValue,
      format: 'json',
    },
    {
      enabled: debouncedSearchValue !== '' && debouncedSearchValue.length >= 2,
      select: (data) => {
        return data;
      },
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

  const handleRegionsLayer = useCallback(() => {
    setIsRegionsLayerActive((prev) => !prev);
  }, [setIsRegionsLayerActive]);

  const mapZoom = useMemo(() => mapRef.current?.ol.getView()?.getZoom() as RView['zoom'], [mapRef]);
  const mapCenter = useMemo(
    () => mapRef.current?.ol.getView()?.getCenter() as RView['center'],
    [mapRef]
  );

  const labelUrl = useMemo(
    () => LABELS.find((label) => activeLabels === label.id)?.url,
    [activeLabels]
  );

  return (
    <>
      <RMap
        ref={mapRef as unknown as React.RefObject<null>}
        projection="EPSG:3857"
        width="100%"
        height="100%"
        className="relative"
        initial={{
          center: mapCenter ?? initialViewport.center,
          zoom: mapZoom ?? initialViewport.zoom,
        }}
        onMoveEnd={handleMapMove}
        onPointerDrag={handleMapDrag}
        onSingleClick={handleSingleClick}
        noDefaultControls
      >
        <BasemapLayer />

        {layerData && layerId && (
          <RLayerWMS
            ref={layerLeftRef}
            properties={{ label: layerData?.gs_name, date }}
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
              LAYERS: layerData?.gs_name,
              DIM_DATE: date,
              CRS: 'EPSG:3857',
              BBOX: 'bbox-epsg-3857',
              NAME: layerData?.gs_name,
              ID: layerId,
            }}
          />
        )}

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

        <RLayerTile zIndex={100} url={labelUrl} />

        <Controls>
          <LocationSearchComponent
            locationSearch={locationSearch}
            OPTIONS={OPTIONS}
            handleLocationSearchChange={handleLocationSearchChange}
            handleClick={handleClick}
            isLoading={isLoading}
            isFetching={isFetching}
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
            <CompareRegionsStatistics isMobile={isMobile} onClick={handleRegionsLayer} />
            <BasemapControl isMobile={isMobile} />
            <BookmarkControl isMobile={isMobile} />
            <ShareControl isMobile={isMobile} />
          </div>

          {isCompareLayerActive && layerData && compareLayerData && (
            <SwipeControl layerLeft={layerLeftRef} layerRight={layerRightRef} />
          )}
        </Controls>

        {isMobile && (
          <div className="absolute bottom-0 left-0 right-0 z-[700] h-[58px] bg-brand-500 px-1 py-2 sm:hidden">
            <GeostoryContent />
            {isLayerActive && <Legend isGeostory />}
          </div>
        )}

        {!isMobile && (
          <div>
            <GeostoryContent />
            {isLayerActive && <Legend isGeostory />}
          </div>
        )}

        <Attributions className="absolute z-40 sm:bottom-0 sm:left-auto sm:right-3 lg:bottom-3 lg:left-[620px]" />
        {layerData && leftLayerHistogramVisibility && !isRegionsLayerActive && (
          <PointHistogram
            onCloseTooltip={handleCloseTooltip}
            layerId={layerId}
            compareLayerId={compareLayerId}
            {...tooltipInfo}
          />
        )}

        {layerData && leftLayerHistogramVisibility && isRegionsLayerActive && (
          <RegionsHistogram
            onCloseTooltip={handleCloseTooltip}
            layerId={layerId}
            compareLayerId={compareLayerId}
            onCompareClose={() => {
              setNutsDataParamsCompare({ NUTS_ID: '', LAYER_ID: '' });
              setCompareNutsProperties(null);
            }}
            {...tooltipInfo}
            compareNutProperties={compareNutsProperties}
            nutsProperties={nutsProperties}
          />
        )}
        {/* Interactivity */}
        {layerData && (
          <MapTooltip
            onCloseTooltip={handleCloseTooltip}
            {...tooltipInfo}
            nutsProperties={nutsProperties}
          />
        )}
      </RMap>
    </>
  );
};

export default Map;

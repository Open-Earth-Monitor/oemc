'use client';

import { useMemo, FC, useCallback, useEffect, useRef, useState, ChangeEvent } from 'react';

import { useMediaQuery } from 'react-responsive';

import axios from 'axios';
import type { MapBrowserEvent } from 'ol';
import ol from 'ol';
import type { Coordinate } from 'ol/coordinate';
import { fromLonLat } from 'ol/proj';
import TileWMS from 'ol/source/TileWMS';
import { RLayerWMS, RMap, RLayerTile, RControl } from 'rlayers';
import { RView } from 'rlayers/RMap';

import { cn } from '@/lib/classnames';
import { mobile, tablet } from '@/lib/media-queries';

import { useDebounce } from '@/hooks/datasets';
import { useOpenStreetMapsLocations } from '@/hooks/openstreetmaps';
import {
  useSyncLayersSettings,
  useSyncCompareLayersSettings,
  useSyncCenterSettings,
  useSyncZoomSettings,
} from '@/hooks/sync-query';

import LocationSearchComponent from '@/components/location-search';
import WebTraffic from '@/components/web-traffic';

import GeostoryContent from '../geostories/content';

import Attributions from './attributions';
import { DEFAULT_VIEWPORT } from './constants';
// map controls
import Controls from './controls';
import BookmarkControl from './controls/bookmark';
import ShareControl from './controls/share';
import SwipeControl from './controls/swipe';
import MapTooltip from './geostory-tooltip';
import Legend from './legend';
import type { GeostoryMapProps, GeostoryTooltipInfo, FeatureInfoResponse, Bbox } from './types';
import { useRegionsData } from '@/hooks/regions';
import { useLayer } from '@/hooks/layers';

interface ClickEvent {
  bbox?: Bbox;
}

const Map: FC<GeostoryMapProps> = ({
  initialViewState = DEFAULT_VIEWPORT,
  geostoryData,
  layerData,
  compareLayerData,
}) => {
  const [locationSearch, setLocationSearch] = useState('');
  const isMobile = useMediaQuery(mobile);
  const isTablet = useMediaQuery(tablet);
  const isDesktop = !isMobile && !isTablet;

  const debouncedSearchValue = useDebounce(locationSearch, 500);

  // const { map: mapRef } = useOL();
  const mapRef: React.MutableRefObject<{
    map: ol.Map;
    ol: {
      getView: () => ol.View;
    };
  }> = useRef<null>(null);

  const layerRightRef = useRef(null);
  const layerLeftRef = useRef(null);

  const TooltipInitialState = {
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
  };
  const [tooltipInfo, setTooltipInfo] = useState<GeostoryTooltipInfo>(TooltipInitialState);
  const [layers] = useSyncLayersSettings();
  const [center, setCenter] = useSyncCenterSettings();
  const [zoom, setZoom] = useSyncZoomSettings();
  const [lonLat, setLonLat] = useState<Coordinate | null>(null);

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

  const compareLayerInfo = useLayer(
    { layer_id: compareLayerId },
    { enabled: isCompareLayerActive }
  );
  const layerInfo = useLayer({ layer_id: layerId }, { enabled: isLayerActive });

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
    async (coordinate) => {
      const resolution = mapRef.current?.ol.getView()?.getResolution();
      if (!resolution) return;

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

      const urlRight = wmsCompareSource.getFeatureInfoUrl(
        coordinate as Coordinate,
        resolution,
        'EPSG:3857',
        {
          INFO_FORMAT: 'application/json',
          LAYERS: compareLayerData?.gs_name,
        }
      );

      let valueLeft: number | null;
      let valueRight: number | null;
      try {
        const responseLeft = await axios.get<FeatureInfoResponse>(urlLeft);
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

        setTooltipInfo((prev) => ({
          ...prev,
          leftData: {
            // This info is coming from the API instead of the layer, as requested
            title: layerData?.title,
            date,
            unit: layerData?.unit,
            value: valueLeft,
            isComparable: layerData?.range?.length > 1,
          },
          rightData: {
            title: compareLayerData?.title,
            date: compareDate || '',
            unit: compareLayerData?.unit,
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
            unit: null,
          },
          rightData: {
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

  useEffect(() => {
    if (tooltipInfo.position) {
      void fetchTooltipValue(tooltipInfo.coordinate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tooltipInfo.position, tooltipInfo.coordinate]);

  const layerPointInfoPayload = {
    lon: lonLat?.[0] || 0,
    lat: lonLat?.[1] || 0,
    coll: 'nightlights_500m', // layerData?.srv_path?.replace(/\/$/, ''), // remove trailing slash
    regex: 'nightlights.average_viirs.v21_m_500m_s_.*_go_epsg4326_v20230823.tif', // layerData?.regex,
  };
  const compareLayerPointInfo = useRegionsData(layerPointInfoPayload);

  const data = useRegionsData(layerPointInfoPayload);
  const handleSingleClick = useCallback(
    (e: MapBrowserEvent<UIEvent>) => {
      setLonLat(e.coordinate);

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
    [setTooltipInfo, tooltipInfo]
  );

  const handleCloseTooltip = useCallback(() => {
    const newTooltipInfo = { ...tooltipInfo, value: null, position: null };
    setTooltipInfo(newTooltipInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Center to the geostory bbox
  useEffect(() => {
    if (geostoryData?.geostory_bbox && mapRef) {
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

      // Center the map
      const [minLon, minLat, maxLon, maxLat] = e.bbox;
      const centerLon = (minLon + maxLon) / 2;
      const centerLat = (minLat + maxLat) / 2;
      setCenter([centerLon, centerLat]);
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
            {/* <WebTraffic isMobile={isMobile} /> */}
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

        {/* Interactivity */}
        {layerData && <MapTooltip onCloseTooltip={handleCloseTooltip} {...tooltipInfo} />}
      </RMap>
    </>
  );
};

export default Map;

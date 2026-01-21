'use client';

import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useParams, usePathname } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import type { MapBrowserEvent } from 'ol';
import ol from 'ol';
import type { Coordinate } from 'ol/coordinate';
import { toLonLat } from 'ol/proj';
import { Size } from 'ol/size';
import TileWMS from 'ol/source/TileWMS';
import { RLayerTile, RLayerWMS, RMap } from 'rlayers';

import { getHistogramData } from '@/lib/utils';
import { fetchFeatureInfo, getFeatureInfoUrl, firstPropertyValue } from '@/lib/wms';

import {
  coordinateAtom,
  lonLatAtom,
  nutsDataParamsAtom,
  nutsDataParamsCompareAtom,
  nutsDataResponseAtom,
  regionsLayerVisibilityAtom,
  compareFunctionalityAtom,
  timeSeriesPlaybackAtom,
  nutsDataResponseCompareAtom,
} from '@/app/store';

import { useGeostory, useGeostoryLayers } from '@/hooks/geostories';
import { useLayer, useLayerParsedSource } from '@/hooks/layers';
import { useMonitor, useMonitorLayers } from '@/hooks/monitors';
import {
  useSyncBasemapLabelsSettings,
  useSyncBasemapSettings,
  useSyncBboxSettings,
  useSyncCompareLayersSettings,
  useSyncLayersSettings,
  useSyncSwipeControlPosition,
} from '@/hooks/sync-query';

import { LABELS } from '@/components/map/controls/basemaps/constants';
import type { CustomMapProps, MonitorTooltipInfo } from '@/components/map/types';

import Attributions from './attributions';
import BasemapLayer from './basemap';
import {
  DEFAULT_VIEWPORT,
  InitialViewport,
  TOOLTIP_INITIAL_STATE,
  WMS_INFO_FORMAT,
  WMS_CRS,
  NUTS_INITIAL_STATE,
} from './constants';
// map controls
import Controls from './controls';
import Legend from './legend';
import MapTooltip from './tooltip';
// import { Nut } from 'lucide-react';
import NutsLayer from './layers/nuts';

// import proj4 from 'proj4';
// import { register } from 'ol/proj/proj4';
// import { get as getProjection } from 'ol/proj';

// proj4.defs(
//   'EPSG:3413',
//   '+proj=stere +lat_0=90 +lat_ts=70 +lon_0=-45 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs'
// );
// register(proj4);

// const proj3413 = getProjection('EPSG:3413')!;
// proj3413.setExtent([-3314693.24, -3314693.24, 3314693.24, 3314693.24]);

function buildWmsSource(url: string, layerName: string) {
  return new TileWMS({
    url,
    params: { LAYERS: layerName, TILED: true },
    serverType: 'geoserver',
    crossOrigin: 'anonymous',
  });
}

const Map: FC<CustomMapProps> = ({ initialViewState = DEFAULT_VIEWPORT }) => {
  const [isCompareMode, setIsCompareMode] = useAtom(compareFunctionalityAtom);
  const [position] = useSyncSwipeControlPosition();
  const [tooltipSide, setTooltipSide] = useState<'left' | 'right'>('left');

  const isRegionsLayerActive = useAtomValue(regionsLayerVisibilityAtom);

  const setNutsDataParams = useSetAtom(nutsDataParamsAtom);
  const setNutsDataParamsCompare = useSetAtom(nutsDataParamsCompareAtom);

  const setNutsDataResponse = useSetAtom(nutsDataResponseAtom);
  const setCompareNutsProperties = useSetAtom(nutsDataResponseCompareAtom);

  const setPlaying = useSetAtom(timeSeriesPlaybackAtom);

  const [activeLabels] = useSyncBasemapLabelsSettings();
  const [basemap] = useSyncBasemapSettings();
  const [bbox, setBbox] = useSyncBboxSettings();

  const setCoordinate = useSetAtom(coordinateAtom);
  const setLonLat = useSetAtom(lonLatAtom);

  // URL info
  const params = useParams();
  const pathname = usePathname();
  const match = pathname.match(/^\/explore\/(geostory|monitor)(?:\/|$)/);
  const type = match?.[1] as 'monitor' | 'geostory' | undefined;
  const monitorId = params.monitor_id as string;

  const { data: monitorData } = useMonitor(
    { monitor_id: params.monitor_id as string },
    { enabled: type === 'monitor' && !!monitorId }
  );
  const {
    data: geostoryData,
    isLoading: isLoadingGeostory,
    isFetched: isFetchedGeostory,
  } = useGeostory(
    { geostory_id: params.geostory_id as string },
    { enabled: type === 'geostory' && !!params.geostory_id }
  );

  const geostoryLayers = geostoryData?.layers;
  const layerPositionLeft = useMemo(
    () => geostoryLayers?.find((l) => l.position === 'left'),
    [geostoryLayers]
  );
  const layerPositionRight = useMemo(
    () => geostoryLayers?.find((l) => l.position === 'right'),
    [geostoryLayers]
  );

  const isComparativeGeostory = useMemo(() => {
    if (isFetchedGeostory && !isLoadingGeostory) {
      return geostoryData.layers?.length === 2 && layerPositionLeft && layerPositionRight;
    }
  }, [geostoryData, isFetchedGeostory, isLoadingGeostory, layerPositionLeft, layerPositionRight]);

  // monitors and geostories layer should get just layers with position right (layers for left are managed by URL or compare trigger)
  const { data: monitorLayer, isLoading: isLoadingMonitorLayer } = useMonitorLayers(
    { monitor_id: params.monitor_id as string },
    {
      enabled: type === 'monitor' && !!monitorId,
      select: (layers) => layers.filter((l) => l.position === 'right')[0] ?? undefined,
    }
  );
  const { data: geostoryLayer, isLoading: isLoadingGeostoryLayer } = useGeostoryLayers(
    { geostory_id: params.geostory_id as string },
    {
      enabled: type === 'geostory' && !!params.geostory_id,
      select: (layers) => layers.filter((l) => l.position === 'right')[0] ?? undefined,
    }
  );

  const dataMeta = useMemo(() => {
    if (type === 'monitor') return monitorData;
    if (type === 'geostory') return geostoryData;
    return null;
  }, [type, monitorData, geostoryData]);

  // bbox
  const predefinedBbox =
    type === 'monitor' ? monitorData?.monitor_bbox : geostoryData?.geostory_bbox;

  const mapRef: React.MutableRefObject<{
    map: ol.Map;
    ol: {
      getView: () => ol.View;
      getSize: () => Size;
      getPixelFromCoordinate: (coordinate: Coordinate) => [number, number];
    };
  }> = useRef(null as unknown as any);

  const layerLeftRef = useRef(null);
  const layerRightRef = useRef(null);

  const [tooltipInfo, setTooltipInfo] = useState<MonitorTooltipInfo>(TOOLTIP_INITIAL_STATE);

  const [layers, setLayers] = useSyncLayersSettings();
  const layerId = layers?.[0]?.id;
  const opacity = layers?.[0]?.opacity;
  const date = layers?.[0]?.date;
  const isLayerActive = !!layerId;
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();
  const compareLayerId = compareLayers?.[0]?.id;
  const compareDate = compareLayers?.[0]?.date;
  const isCompareLayerActive = !!compareLayerId;

  const { data: compareData } = useLayer({ layer_id: compareLayerId });

  const {
    gs_name: compareGsName,
    gs_base_wms: compareGsBaseWms,
    title: compareTitle,
  } = compareData || {};

  // initial viewport
  const dataBbox = useMemo(
    () => predefinedBbox || bbox || initialViewState.bbox,
    [bbox, predefinedBbox, initialViewState.bbox]
  );
  const initialViewport = {
    zoom: initialViewState.zoom,
    center: initialViewState.center,
    bbox: dataBbox,
  } satisfies InitialViewport;

  const { data: layerFromURL, isLoading } = useLayerParsedSource(
    { layer_id: layerId },
    { enabled: !!layerId }
  );

  const layerData = useMemo(() => {
    if (layerFromURL && !isLoading) return layerFromURL;
    if (type === 'monitor' && !isLoadingMonitorLayer) return monitorLayer;
    if (type === 'geostory' && !isLoadingGeostoryLayer) return geostoryLayer;
    return undefined;
  }, [
    layerFromURL,
    monitorLayer,
    geostoryLayer,
    type,
    isLoading,
    isLoadingMonitorLayer,
    isLoadingGeostoryLayer,
  ]);

  const { gs_base_wms, gs_name, title, unit, range, range_labels } = layerData || {};

  // Interactivity
  const wmsMain = useMemo(() => {
    if (!gs_name) return null;
    return buildWmsSource(
      gs_base_wms || 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
      gs_name
    );
  }, [gs_base_wms, gs_name]);

  const wmsMainCompare = useMemo(() => {
    if (!compareGsName) return null;
    return buildWmsSource(
      compareGsBaseWms || 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
      compareGsName
    );
  }, [compareGsBaseWms, compareGsName]);

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

  const handleMapMove = useCallback(() => {
    if (!mapRef.current) return;
    const map = mapRef.current.ol;
    const mapSize = map.getSize();
    if (!mapSize) return;
    const nextBbox = map.getView().calculateExtent(mapSize);
    setBbox(nextBbox);
  }, [setBbox]);

  const handleMapDrag = useCallback(() => {
    if (!mapRef.current) return;
    if (!tooltipInfo.coordinate) return;
    const map = mapRef.current.ol;
    const updatedPixel = map.getPixelFromCoordinate(tooltipInfo.coordinate);
    setTooltipInfo((prev) => ({ ...prev, position: updatedPixel }));
  }, [tooltipInfo.coordinate]);

  const handleSingleClick = useCallback(
    (e: MapBrowserEvent<UIEvent>): void => {
      const lonlat = toLonLat(e.coordinate);
      setPlaying(false);
      setLonLat(lonlat);
      setCoordinate(e.coordinate);

      const swipePixelX = position.x * e.map.getSize()?.[0];
      const side = e.pixel[0] < swipePixelX ? 'left' : 'right';
      setTooltipSide(side);
      setTooltipInfo((prev) => ({
        ...prev,
        leftData: { ...prev.leftData, value: null },
        coordinate: e.coordinate,
        position: [e.pixel[0], e.pixel[1]],
      }));

      void (async () => {
        try {
          const resolution = e.map.getView()?.getResolution();

          if (!isRegionsLayerActive) {
            setNutsDataParams(NUTS_INITIAL_STATE);
            setNutsDataParamsCompare(NUTS_INITIAL_STATE);
            return;
          }

          const res = await getHistogramData(wmsNutsSource, e.coordinate, resolution, layerId);
          if (isCompareMode) {
            const res = await getHistogramData(
              wmsNutsSource,
              e.coordinate,
              resolution,
              compareLayerId
            );
            const next = res?.nutsDataParams ?? NUTS_INITIAL_STATE;
            setNutsDataParamsCompare({ ...next });
          } else {
            setNutsDataParams(res.nutsDataParams ?? NUTS_INITIAL_STATE);
            setNutsDataParamsCompare(NUTS_INITIAL_STATE);
          }
        } catch (err) {
          console.error(err);
        }
      })();
    },
    [
      isRegionsLayerActive,
      isCompareMode,
      wmsNutsSource,
      layerId,
      setNutsDataParams,
      setNutsDataParamsCompare,
      setLonLat,
      setCoordinate,
      setTooltipInfo,
      setPlaying,
    ]
  );

  const handleCloseTooltip = useCallback(() => {
    setTooltipInfo((prev) => ({ ...prev, position: null }));
    setNutsDataParamsCompare({ NUTS_ID: '', LAYER_ID: '' });
  }, [setNutsDataParamsCompare]);

  useEffect(() => {
    if (!dataBbox || !mapRef?.current) return;
    setBbox(dataBbox);
    mapRef.current.ol.getView()?.fit(dataBbox);
  }, [dataBbox, setBbox]);

  useEffect(() => {
    setTooltipInfo((prev) => ({ ...prev, position: null }));
  }, [layerId, compareLayerId]);

  // activates timeseries and comparative mode if geostory is comparative and just the first time
  // after that, the user should manage timeseries and comparative mode
  useEffect(() => {
    if (isComparativeGeostory) {
      setIsCompareMode(true);
      setCompareLayers([
        {
          id: layerPositionLeft?.layer_id,
          ...(!!layerPositionLeft?.range && { date: layerPositionLeft?.range[0] }),
          opacity: 1,
        },
      ]);
      setLayers([
        {
          id: layerPositionRight?.layer_id,
          ...(!!layerPositionRight?.range && { date: layerPositionRight?.range[0] }),
          opacity: 1,
        },
      ]);
      setBbox(geostoryData?.geostory_bbox || undefined);
    }
  }, [layerId, geostoryData, isComparativeGeostory]); // eslint-disable-line react-hooks/exhaustive-deps

  const resolution = mapRef.current?.ol.getView?.()?.getResolution?.();

  const leftUrl = useMemo(() => {
    if (!wmsMain || !resolution || !tooltipInfo.coordinate || !gs_name) return undefined;
    return getFeatureInfoUrl(wmsMain, tooltipInfo.coordinate, resolution, gs_name, date);
  }, [wmsMain, resolution, tooltipInfo.coordinate, gs_name, date]);

  const rightUrl = useMemo(() => {
    if (!wmsMainCompare || !resolution || !tooltipInfo.coordinate || !compareGsName)
      return undefined;
    return getFeatureInfoUrl(
      wmsMainCompare,
      tooltipInfo.coordinate,
      resolution,
      compareGsName,
      compareDate
    );
  }, [wmsMainCompare, compareDate, resolution, tooltipInfo.coordinate, compareGsName]);

  const nutsUrl = useMemo(() => {
    if (!wmsNutsSource || !resolution || !tooltipInfo.coordinate) return undefined;
    return wmsNutsSource.getFeatureInfoUrl(tooltipInfo.coordinate, resolution, WMS_CRS, {
      INFO_FORMAT: WMS_INFO_FORMAT,
      LAYERS: 'oem:NUTS_RG_01M_2021_3035',
    });
  }, [wmsNutsSource, resolution, tooltipInfo.coordinate]);

  const qLeft = useQuery({
    queryKey: ['gfi-left', layerId, date, tooltipInfo.coordinate?.[0], tooltipInfo.coordinate?.[1]],
    queryFn: ({ signal }) => fetchFeatureInfo(leftUrl, signal),
    enabled: Boolean(leftUrl && tooltipInfo.position),
    staleTime: 30_000,
  });

  const qRight = useQuery({
    queryKey: [
      'gfi-right',
      compareLayerId,
      compareDate,
      tooltipInfo.coordinate?.[0],
      tooltipInfo.coordinate?.[1],
    ],
    queryFn: ({ signal }) => fetchFeatureInfo(rightUrl, signal),
    enabled: Boolean(rightUrl && tooltipInfo.position),
    staleTime: 30_000,
  });

  const qNuts = useQuery({
    queryKey: ['gfi-nuts', tooltipInfo.coordinate?.[0], tooltipInfo.coordinate?.[1]],
    queryFn: ({ signal }) => fetchFeatureInfo(nutsUrl, signal),
    enabled: Boolean(isRegionsLayerActive && nutsUrl && tooltipInfo.position),
    staleTime: 60_000,
  });

  useEffect(() => {
    if (!tooltipInfo.position) return;

    const vLeft = firstPropertyValue(qLeft.data);
    const vRight = firstPropertyValue(qRight.data);
    const nutsProps = qNuts.data?.features?.[0]?.properties ?? null;
    if (nutsProps && !isCompareMode) setNutsDataResponse(nutsProps);
    if (nutsProps && isCompareMode) setCompareNutsProperties(nutsProps);

    setTooltipInfo((prev) => ({
      ...prev,
      leftData: {
        id: layerId ?? null,
        title: title ?? null,
        date: date ?? null,
        value: vLeft,
        unit: unit ?? compareData?.unit ?? null,
        range: range ?? [],
        rangeLabels: range_labels ?? [],
        isComparable: (range?.length ?? 0) > 1 && !!compareDate,
      },
      rightData: {
        id: compareLayerId ?? null,
        title: compareTitle ?? null,
        date: compareDate ?? null,
        value: vRight,
        unit: compareData?.unit ?? unit ?? null,
      },
    }));
  }, [
    tooltipInfo.position,
    qLeft.data,
    qRight.data,
    qNuts.data,
    setNutsDataResponse,
    layerId,
    compareLayerId,
    title,
    compareTitle,
    date,
    compareDate,
    unit,
    compareData?.unit,
    range,
    range_labels,
    isCompareLayerActive,
    isCompareMode,
    setCompareNutsProperties,
  ]);

  /* ----- Labels basemap ----- */
  const labelUrl = useMemo(
    () => LABELS.find((label) => activeLabels === label.id)?.url,
    [activeLabels]
  );

  return (
    <div className="relative h-full w-full">
      <RMap
        ref={mapRef as unknown as React.RefObject<any>}
        projection="EPSG:3413"
        width="100%"
        height="100%"
        className="relative"
        initial={{ ...initialViewport, center: [0, 0] }}
        onMoveEnd={handleMapMove}
        onPointerDrag={handleMapDrag}
        onSingleClick={handleSingleClick}
        noDefaultControls
      >
        <BasemapLayer />

        {!isLoading && isLayerActive && !!gs_name && (
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
              CRS: WMS_CRS,
              BBOX: 'bbox-epsg-3857',
            }}
          />
        )}

        {!isLoading && isCompareLayerActive && !!compareGsName && (
          <RLayerWMS
            ref={layerRightRef}
            properties={{ label: compareGsName, date: compareDate }}
            url={compareGsBaseWms}
            opacity={opacity ?? 1}
            params={{
              FORMAT: 'image/png',
              SERVICE: 'WMS',
              VERSION: '1.3.0',
              REQUEST: 'GetMap',
              TRANSPARENT: true,
              LAYERS: compareGsName,
              // DIM_DATE: compareDate,
              CRS: WMS_CRS,
              BBOX: 'bbox-epsg-3857',
            }}
            visible={isCompareLayerActive}
          />
        )}

        {isRegionsLayerActive && <NutsLayer />}

        {basemap === 'world_imagery' && (
          <RLayerTile
            zIndex={100}
            url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
          />
        )}

        <RLayerTile zIndex={100} url={labelUrl} />

        <Controls
          mapRef={mapRef}
          layerLeftRef={layerLeftRef}
          layerRightRef={layerRightRef}
          data={dataMeta}
          isLoading={isLoading}
        />

        {isLayerActive && <Legend />}
        <Attributions className="absolute bottom-0 z-40 sm:left-auto sm:right-3 lg:bottom-3 lg:left-[620px]" />
      </RMap>

      {/* Interactivity */}
      {dataMeta && (
        <MapTooltip
          {...tooltipInfo}
          data={tooltipSide === 'left' ? tooltipInfo.leftData : tooltipInfo.rightData}
          onCloseTooltip={handleCloseTooltip}
        />
      )}
    </div>
  );
};

export default Map;

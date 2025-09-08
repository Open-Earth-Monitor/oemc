'use client';

import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useParams, usePathname } from 'next/navigation';

import { useQuery, useQueryClient } from '@tanstack/react-query';
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
  histogramVisibilityAtom,
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

function buildWmsSource(url: string, layerName: string) {
  return new TileWMS({
    url,
    params: { LAYERS: layerName, TILED: true },
    serverType: 'geoserver',
    crossOrigin: 'anonymous',
  });
}

const Map: FC<CustomMapProps> = ({ initialViewState = DEFAULT_VIEWPORT }) => {
  const queryClient = useQueryClient();
  const [isCompareMode, setIsCompareMode] = useAtom(compareFunctionalityAtom);
  // const [, setNutsDataResponse] = useAtom(nutsDataResponseAtom);
  const isRegionsLayerActive = useAtomValue(regionsLayerVisibilityAtom);
  const setHistogramVisible = useSetAtom(histogramVisibilityAtom);

  const setNutsDataParams = useSetAtom(nutsDataParamsAtom);
  const setNutsDataParamsCompare = useSetAtom(nutsDataParamsCompareAtom);

  const [nutsProperties, setNutsDataResponse] = useAtom(nutsDataResponseAtom);
  const [nutsPropertiesCompare, setCompareNutsProperties] = useAtom(nutsDataResponseCompareAtom);

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
  const { data: geostoryData } = useGeostory(
    { geostory_id: params.geostory_id as string },
    { enabled: type === 'geostory' && !!params.geostory_id }
  );

  const monitorLayer = useMonitorLayers(
    { monitor_id: params.monitor_id as string },
    { enabled: type === 'monitor' && !!monitorId }
  );
  const geostoryLayer = useGeostoryLayers(
    { geostory_id: params.geostory_id as string },
    { enabled: type === 'geostory' && !!params.geostory_id }
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
  const nutsLayer = useRef(null);

  const [tooltipInfo, setTooltipInfo] = useState<MonitorTooltipInfo>(TOOLTIP_INITIAL_STATE);

  const [layers] = useSyncLayersSettings();
  const layerId = layers?.[0]?.id;
  const opacity = layers?.[0]?.opacity;
  const date = layers?.[0]?.date;
  const isLayerActive = !!layerId;
  const [compareLayers] = useSyncCompareLayersSettings();
  const compareLayerId = compareLayers?.[0]?.id;
  const compareDate = compareLayers?.[0]?.date;
  const isCompareLayerActive = !!compareLayerId;

  const { data: compareData } = useLayer({ layer_id: compareLayerId });

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
    if (layerFromURL) return layerFromURL;
    if (type === 'monitor') return monitorLayer?.data?.[0];
    if (type === 'geostory') return geostoryLayer?.data?.[0];
    return undefined;
  }, [layerFromURL, monitorLayer, geostoryLayer, type]);

  const { gs_base_wms, gs_name, title, unit, range, range_labels } = layerData || {};

  // Interactivity
  const wmsMain = useMemo(() => {
    if (!gs_name) return null;
    return buildWmsSource(
      gs_base_wms || 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
      gs_name
    );
  }, [gs_base_wms, gs_name]);

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
          const next = res?.nutsDataParams ?? NUTS_INITIAL_STATE;
          if (isCompareMode) {
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

  const resolution = mapRef.current?.ol.getView?.()?.getResolution?.();

  const leftUrl = useMemo(() => {
    if (!wmsMain || !resolution || !tooltipInfo.coordinate || !gs_name) return undefined;
    return getFeatureInfoUrl(wmsMain, tooltipInfo.coordinate, resolution, gs_name, date);
  }, [wmsMain, resolution, tooltipInfo.coordinate, gs_name, date]);

  const rightUrl = useMemo(() => {
    if (!wmsMain || !compareDate || !resolution || !tooltipInfo.coordinate || !gs_name)
      return undefined;
    return getFeatureInfoUrl(wmsMain, tooltipInfo.coordinate, resolution, gs_name, compareDate);
  }, [wmsMain, compareDate, resolution, tooltipInfo.coordinate, gs_name]);

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
        title: title ?? null,
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
    date,
    compareDate,
    unit,
    compareData?.unit,
    range,
    range_labels,
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

        {dataMeta && !isLoading && isLayerActive && gs_name && (
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

        {compareDate && dataMeta && !isLoading && isCompareLayerActive && gs_name && (
          <RLayerWMS
            ref={layerRightRef}
            properties={{ label: gs_name, date: compareDate }}
            url={gs_base_wms}
            opacity={opacity ?? 1}
            params={{
              FORMAT: 'image/png',
              SERVICE: 'WMS',
              VERSION: '1.3.0',
              REQUEST: 'GetMap',
              TRANSPARENT: true,
              LAYERS: gs_name,
              DIM_DATE: compareDate,
              CRS: WMS_CRS,
              BBOX: 'bbox-epsg-3857',
            }}
            visible={isCompareLayerActive}
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
              SERVICE: 'WMS',
              VERSION: '1.1.0',
              REQUEST: 'GetMap',
              TRANSPARENT: true,
              LAYERS: 'oem:NUTS_RG_01M_2021_3035',
              SRS: WMS_CRS, // WMS 1.1.0
              BBOX: [-20037508.34, -20037508.34, 20037508.34, 20037508.34],
              NAME: 'NUTS',
            }}
          />
        )}

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
      {dataMeta && <MapTooltip {...tooltipInfo} onCloseTooltip={handleCloseTooltip} />}
    </div>
  );
};

export default Map;

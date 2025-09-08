import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import type { Geostory } from '@/types/geostories';
import type { Layer, LayerParsed } from '@/types/layers';
import type { Monitor, MonitorParsed } from '@/types/monitors';

import { THEMES_COLORS, DEFAULT_COLOR } from '@/constants/themes';

import { parseBBox } from '@/utils/bbox';
import API from 'services/api';

type UseParams = {
  monitor_id?: string;
};

const DEFAULT_QUERY_OPTIONS = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: false,
  staleTime: Infinity,
};

export function useMonitor(
  params: UseParams,
  queryOptions?: UseQueryOptions<Monitor, AxiosError, MonitorParsed>
) {
  const { monitor_id } = params;
  const fetchMonitor = () =>
    API.request({
      method: 'GET',
      url: `/monitors/${monitor_id}`,
      ...queryOptions,
    }).then((response: AxiosResponse<Monitor[]>) => response.data[0]);
  return useQuery(['monitor', params], fetchMonitor, {
    // ...DEFAULT_QUERY_OPTIONS,
    select: (data) => ({
      ...data,
      color: THEMES_COLORS[data.theme].base || DEFAULT_COLOR,
      colorOpacity: THEMES_COLORS[data.theme].light || DEFAULT_COLOR,
      monitor_bbox: parseBBox(data.monitor_bbox, 'monitor'),
    }),
    ...queryOptions,
  });
}

const fetchMonitors = () =>
  API.request({
    method: 'GET',
    url: '/monitors',
  }).then((response: AxiosResponse<Monitor[]>) => response.data);
export function useMonitors(
  queryOptions?: UseQueryOptions<Monitor[], AxiosError, MonitorParsed[]>
) {
  return useQuery(['monitors'], fetchMonitors, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) =>
      data.map((monitor) => ({
        ...monitor,
        monitor_bbox: parseBBox(monitor.monitor_bbox, 'monitor'),
        color: THEMES_COLORS[monitor.theme].base || DEFAULT_COLOR,
        colorOpacity: THEMES_COLORS[monitor.theme].light || DEFAULT_COLOR,
      })),
    ...queryOptions,
  });
}

export function useMonitorLayers(
  params: UseParams,
  queryOptions?: UseQueryOptions<Layer[], AxiosError, LayerParsed[]>
) {
  const { monitor_id } = params;

  const fetchMonitorLayers = () =>
    API.request({
      method: 'GET',
      url: `/monitors/${monitor_id}/layers`,
      ...queryOptions,
    }).then((response: AxiosResponse<Layer[]>) => response.data);

  return useQuery(['monitor-layers', params], fetchMonitorLayers, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (layers) => {
      return layers.flatMap((layer) => {
        const toParsed = (l: Layer): LayerParsed => {
          return {
            ...l,
            range:
              l.range?.map((r, i) => ({
                value: r,
                label: l.range_labels?.[i] ?? null,
              })) ?? [],
          };
        };

        const parsedExtraLayers =
          Array.isArray(layer.extra_lyrs) && layer.extra_lyrs.length > 0
            ? layer.extra_lyrs.map(toParsed)
            : [];

        const includeBaseLayer = !Array.isArray(layer.extra_lyrs) || layer.extra_lyrs.length === 0;

        return [...(includeBaseLayer ? [toParsed(layer)] : []), ...parsedExtraLayers];
      });
    },
    ...queryOptions,
  });
}

export function useMonitorGeostories(
  params: UseParams,
  queryOptions?: UseQueryOptions<Geostory[], AxiosError>
) {
  const { monitor_id } = params;
  const fetchMonitorGeostories = () =>
    API.request({
      method: 'GET',
      url: `/monitors/${monitor_id}/geostories`,
      ...queryOptions,
    }).then((response: AxiosResponse<Geostory[]>) => response.data);
  return useQuery(['monitors-geostories', params], fetchMonitorGeostories, {
    ...DEFAULT_QUERY_OPTIONS,
    ...queryOptions,
  });
}

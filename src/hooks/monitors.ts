import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import type { Geostory } from '@/types/geostories';
import type { Layer, LayerParsed } from '@/types/layers';
import type { Monitor, MonitorParsed } from '@/types/monitors';

import { THEMES_COLORS, DEFAULT_COLOR } from '@/constants/themes';

import { parseBBox } from '@/utils/bbox';
import { normalizeLayers } from '@/utils/layers';
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

export function useMonitorLayers<TData = LayerParsed[]>(
  params: UseParams,
  queryOptions?: Omit<UseQueryOptions<Layer[], Error, TData>, 'select'> & {
    // remove when API improves response
    select?: (data: LayerParsed[]) => TData;
  }
) {
  const { monitor_id } = params;

  const fetchMonitorLayers = () =>
    API.request({
      method: 'GET',
      url: `/monitors/${monitor_id}/layers`,
    }).then((response: AxiosResponse<Layer[]>) => response.data);

  // remove this part when API improves and adds extra_lyrs directly to the response
  const { select: externalSelect, ...rest } = queryOptions ?? {};

  return useQuery<Layer[], Error, TData>(['monitor-layers', params], fetchMonitorLayers, {
    ...DEFAULT_QUERY_OPTIONS,
    ...rest,
    select: (raw: Layer[]) => {
      const normalized = normalizeLayers(raw);
      return externalSelect ? externalSelect(normalized) : (normalized as unknown as TData);
    },
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

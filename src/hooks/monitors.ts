import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import type { Geostory } from '@/types/geostories';
import type { Layer, LayerParsed } from '@/types/layers';
import type { Monitor, MonitorParsed } from '@/types/monitors';

import API from 'services/api';

type UseParams = {
  monitor_id?: string;
};

import { THEMES_COLORS } from '@/constants/themes';

const DEFAULT_COLOR = 'hsla(0, 0%, 79%, 1)';

const DEFAULT_QUERY_OPTIONS = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: false,
  staleTime: Infinity,
};

export function useMonitor(
  params: UseParams,
  queryOptions?: UseQueryOptions<Monitor, Error, MonitorParsed>
) {
  const { monitor_id } = params;
  const fetchMonitor = () =>
    API.request({
      method: 'GET',
      url: `/monitors/${monitor_id}`,
      ...queryOptions,
    }).then((response: AxiosResponse<Monitor[]>) => response.data[0]);
  return useQuery(['monitor', params], fetchMonitor, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) => ({
      ...data,
      color: THEMES_COLORS[data.theme].base || DEFAULT_COLOR,
      colorOpacity: THEMES_COLORS[data.theme].light || DEFAULT_COLOR,
    }),
    ...queryOptions,
  });
}

export function useMonitors(queryOptions?: UseQueryOptions<Monitor[], Error, MonitorParsed[]>) {
  const fetchMonitors = () =>
    API.request({
      method: 'GET',
      url: '/monitors',
      ...queryOptions,
    }).then((response: AxiosResponse<Monitor[]>) => response.data);
  return useQuery(['monitors'], fetchMonitors, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) => {
      return data.map((monitor) => ({
        ...monitor,
        color: THEMES_COLORS[monitor.theme].base || DEFAULT_COLOR,
        colorOpacity: THEMES_COLORS[monitor.theme].light || DEFAULT_COLOR,
      }));
    },
    ...queryOptions,
  });
}

export function useMonitorLayers(
  params: UseParams,
  queryOptions?: UseQueryOptions<Layer[], Error, LayerParsed[]>
) {
  const { monitor_id } = params;
  const fetchMonitorLayers = () =>
    API.request({
      method: 'GET',
      url: `/monitors/${monitor_id}/layers`,
      ...queryOptions,
    }).then((response: AxiosResponse<Layer[]>) => response.data);
  return useQuery(['monitor-datasets', params], fetchMonitorLayers, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) =>
      data.map((d) => ({
        ...d,
        gs_style: JSON.parse(d?.gs_style || null) as LayerParsed['gs_style'],
        range: d?.range?.map((r, index) => ({
          value: r,
          label: d?.range_labels[index],
        })),
      })),
    ...queryOptions,
  });
}

export function useMonitorGeostories(
  params: UseParams,
  queryOptions?: UseQueryOptions<Geostory[], Error>
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
    select: (data) => data,
    ...queryOptions,
  });
}

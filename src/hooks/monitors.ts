import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import type { GeoStory } from '@/types/geostories';
import type { Layer, LayerParsed } from '@/types/layers';
import type { Monitor, MonitorParsed } from '@/types/monitors';

import API from 'services/api';

type UseParams = {
  monitor_id?: string;
};

const COLORS = {
  m1: 'hsla(209, 94%, 87%, 1)',
  m2: 'hsla(133, 97%, 85%, 1)',
  m3: 'hsla(29, 77%, 78%, 1)',
  m4: 'hsla(8, 100%, 76%, 1)',
  m5: 'hsla(133, 97%, 85%, 1)',
  m6: 'hsla(254, 78%, 87%, 1)',
  m7: 'hsla(60, 100%, 95%, 1)',
  m8: 'hsla(60, 90%, 84%, 1)',
} satisfies { [key: string]: string };
const COLORS_OPACITY = {
  m1: 'hsla(209, 94%, 87%, 0.2)',
  m2: 'hsla(133, 97%, 85%, 0.2)',
  m3: 'hsla(29, 77%, 78%, 0.2)',
  m4: 'hsla(8, 100%, 76%, 0.2)',
  m5: 'hsla(133, 97%, 85%, 0.2)',
  m6: 'hsla(254, 78%, 87%, 0.2)',
  m7: 'hsla(60, 100%, 95%, 0.2)',
  m8: 'hsla(60, 90%, 84%, 0.2)',
} satisfies { [key: string]: string };

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
      color: COLORS[data.id] as string,
      colorOpacity: COLORS_OPACITY[data.id] as string,
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
        color: COLORS[monitor.id] as string,
        colorOpacity: COLORS_OPACITY[monitor.id] as string,
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
  queryOptions?: UseQueryOptions<GeoStory[], Error>
) {
  const { monitor_id } = params;
  const fetchMonitorGeostories = () =>
    API.request({
      method: 'GET',
      url: `/monitors/${monitor_id}/geostories`,
      ...queryOptions,
    }).then((response: AxiosResponse<GeoStory[]>) => response.data);
  return useQuery(['monitors-geostories', params], fetchMonitorGeostories, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) => data,
    ...queryOptions,
  });
}

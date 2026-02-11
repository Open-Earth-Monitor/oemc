import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import type { Geostory } from '@/types/geostories';
import type { Layer, LayerParsed } from '@/types/layers';
import type { Monitor, MonitorParsed } from '@/types/monitors';

import { THEMES_COLORS, DEFAULT_COLOR } from '@/constants/themes';

import { parseBBox } from '@/utils/bbox';
import API from 'services/api';
import { usePathname } from 'next/navigation';
import path from 'path';

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
  const pathname = usePathname();
  const monitorId = pathname?.split('/')[2] || params.monitor_id;
  const fetchMonitorLayers = async (): Promise<Layer[]> => {
    const response = await API.request<Layer[]>({
      method: 'GET',
      url: `/monitors/${monitorId}/layers`,
    });
    return response.data;
  };

  return useQuery(['monitor-datasets', params], fetchMonitorLayers, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) =>
      data
        .flatMap((layer) =>
          Array.isArray(layer.extra_lyrs) ? [layer, ...layer.extra_lyrs] : [layer]
        )
        .filter((l) => !l.extra_lyrs)
        .map((d) => ({
          ...d,
          range:
            d?.range?.map((r, i) => ({
              value: r,
              label: d.range_labels?.[i] ?? null,
            })) ?? [],
        })),
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

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import type { Geostory } from '@/types/geostories';
import type { Layer, LayerParsed } from '@/types/layers';
import type { Monitor, MonitorParsed } from '@/types/monitors';

import API from 'services/api';

type UseParams = {
  type?: 'monitors' | 'geostories';
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
export function useMonitorsAndGeostories(
  params?: UseParams,
  queryOptions?: UseQueryOptions<(Monitor & Geostory)[], Error>
) {
  console.log(params, 'params');
  const fetchMonitorAndGeostories = () =>
    API.request({
      method: 'GET',
      url: '/monitors-and-geostories',
      params,
      ...queryOptions,
    }).then((response: AxiosResponse<(Monitor & Geostory)[]>) => response.data);
  return useQuery(['monitor-and-geostories', params], fetchMonitorAndGeostories, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) => data,
    ...queryOptions,
  });
}

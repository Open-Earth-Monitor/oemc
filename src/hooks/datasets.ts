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

const COLORS = (<{ [key: string]: string }>{
  m1: 'hsla(209, 94%, 87%, 1)',
  m2: 'hsla(133, 97%, 85%, 1)',
  m3: 'hsla(29, 77%, 78%, 1)',
  m4: 'hsla(8, 100%, 76%, 1)',
  m5: 'hsla(133, 97%, 85%, 1)',
  m6: 'hsla(254, 78%, 87%, 1)',
  m7: 'hsla(60, 100%, 95%, 1)',
  m8: 'hsla(60, 90%, 84%, 1)',
}) satisfies { [key: string]: string };
const COLORS_GEOSTORIES = (<{ [key: string]: string }>{
  g1: 'hsla(209, 94%, 87%, 1)',
  g2: 'hsla(133, 97%, 85%, 1)',
  g3: 'hsla(29, 77%, 78%, 1)',
  g4: 'hsla(8, 100%, 76%, 1)',
  g5: 'hsla(133, 97%, 85%, 1)',
  g6: 'hsla(254, 78%, 87%, 1)',
  g7: 'hsla(60, 100%, 95%, 1)',
  g8: 'hsla(60, 90%, 84%, 1)',
}) satisfies { [key: string]: string };
const COLORS_OPACITY = (<{ [key: string]: string }>{
  g1: '#012E65',
  g2: '#2c4319',
  g3: '#735637',
  g4: 'hsla(8, 100%, 76%, 0.2)',
  g5: 'hsla(133, 97%, 85%, 0.2)',
  g6: 'hsla(254, 78%, 87%, 0.2)',
  g7: 'hsla(60, 100%, 95%, 0.2)',
  g8: 'hsla(60, 90%, 84%, 0.2)',
}) satisfies { [key: string]: string };

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
  const fetchMonitorAndGeostories = () =>
    API.request({
      method: 'GET',
      url: '/monitors-and-geostories',
      params,
      ...queryOptions,
    }).then((response: AxiosResponse<(Monitor & Geostory)[]>) => response.data);
  return useQuery(['monitor-and-geostories', params], fetchMonitorAndGeostories, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) =>
      data?.map((d) => ({
        ...d,
        color: COLORS[d.id] || COLORS_GEOSTORIES[d.id],
        ...(COLORS_OPACITY[d.id] && { headColor: COLORS_OPACITY[d.id] }),
      })),

    ...queryOptions,
  });
}

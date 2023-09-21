import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import API from 'services/api';

import type { MonitorTypes, MonitorColorTypes } from '../types/datasets';
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

export function useMonitor(
  params: UseParams,
  queryOptions?: UseQueryOptions<MonitorTypes, Error, MonitorColorTypes>
) {
  const fetchMonitors = () =>
    API.request({
      method: 'GET',
      url: '/monitors',
      params,
      ...queryOptions,
    }).then((response: AxiosResponse<{ monitors: MonitorTypes[] }>) =>
      response.data.monitors.find((monitor) => monitor.id === params.monitor_id)
    );
  return useQuery(['monitor', params], fetchMonitors, {
    select: (data) => ({
      ...data,
      color: COLORS[data.id] as string,
      colorOpacity: COLORS_OPACITY[data.id] as string,
    }),
    ...queryOptions,
  });
}

export function useMonitors(
  queryOptions?: UseQueryOptions<MonitorTypes[], Error, MonitorColorTypes[]>
) {
  const fetchMonitors = () =>
    API.request({
      method: 'GET',
      url: '/monitors',
      ...queryOptions,
    }).then((response: AxiosResponse<{ monitors: MonitorTypes[] }>) => response.data.monitors);
  return useQuery(['monitors'], fetchMonitors, {
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

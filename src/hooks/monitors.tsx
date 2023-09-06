import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import API from 'services/api';

import type { MonitorTypes } from '../types/datasets';

export function useMonitors(queryOptions?: UseQueryOptions<MonitorTypes[], Error>) {
  const fetchMonitors = () =>
    API.request({
      method: 'GET',
      url: '/monitors',
      ...queryOptions,
    }).then((response: AxiosResponse<{ monitors: MonitorTypes[] }>) => response.data.monitors);
  return useQuery(['layer'], fetchMonitors, {
    select: (data) => {
      return data;
    },
    ...queryOptions,
  });
}

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import API from 'services/api';

import type { MonitorTypes } from './types';

export function useMonitors(queryOptions?: UseQueryOptions<MonitorTypes[], Error>) {
  const fetchMonitors = () =>
    API.request({
      method: 'GET',
      url: '/monitors',
      ...queryOptions,
    }).then((response: AxiosResponse<MonitorTypes[]>) => response.data);
  return useQuery(['layer'], fetchMonitors, {
    select: (data) => data,
    ...queryOptions,
  });
}

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import API from 'services/api';

import type { MonitorTypes } from '../types/datasets';
type UseParams = {
  monitor_id?: string;
};

export function useMonitor(
  params: UseParams,
  queryOptions?: UseQueryOptions<MonitorTypes, Error, MonitorTypes>
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
    placeholderData: {
      id: '',
      title: '',
      description: '',
      geostories: [],
    },
    select: (data) => data,
    ...queryOptions,
  });
}

export function useMonitors(queryOptions?: UseQueryOptions<MonitorTypes[], Error>) {
  const fetchMonitors = () =>
    API.request({
      method: 'GET',
      url: '/monitors',
      ...queryOptions,
    }).then((response: AxiosResponse<{ monitors: MonitorTypes[] }>) => response.data.monitors);
  return useQuery(['monitors'], fetchMonitors, {
    select: (data) => {
      return data;
    },
    ...queryOptions,
  });
}

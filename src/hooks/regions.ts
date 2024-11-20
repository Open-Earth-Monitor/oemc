import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import API from 'services/api';

type UseParams = {
  lon: number;
  lat: number;
  layer_id: string;
};

type RegionData = {
  label: string;
  layer_id: string;
  value: number;
};

const DEFAULT_QUERY_OPTIONS = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: false,
  staleTime: Infinity,
};

export function usePointData(
  params: UseParams,
  queryOptions?: UseQueryOptions<RegionData[], AxiosError, RegionData[]>
) {
  const fetchRegionData = () =>
    API.request({
      method: 'GET',
      url: '/point-query',
      params,
      ...queryOptions,
    })
      .then((response: AxiosResponse<RegionData[]>) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error fetching region data:', error);
      });

  return useQuery(['region-data', params], fetchRegionData, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) => data,
    ...queryOptions,
  });
}

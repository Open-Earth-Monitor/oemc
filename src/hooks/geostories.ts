import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import API from 'services/api';

import type { LayerTypes, GeostoryTypes, LayerParsedRangeTypes } from '../types/datasets';

type UseParams = {
  geostory_id?: string;
};

export function useGeostory(
  params: UseParams,
  queryOptions?: UseQueryOptions<GeostoryTypes, Error>
) {
  const fetchGeostory = () =>
    API.request({
      method: 'GET',
      url: '/geostories',
      params,
      ...queryOptions,
    }).then((response: AxiosResponse<GeostoryTypes[]>) => response.data[0]);
  return useQuery(['geostories', params], fetchGeostory, {
    select: (data) => data,
    ...queryOptions,
  });
}

export function useGeostoryLayers(
  params: UseParams,
  queryOptions?: UseQueryOptions<LayerTypes[], Error, LayerParsedRangeTypes[]>
) {
  const { geostory_id } = params;
  const fetchGeostoryLayers = () =>
    API.request({
      method: 'GET',
      url: `/geostories/${geostory_id}/layers`,
      ...queryOptions,
    }).then((response: AxiosResponse<LayerTypes[]>) => response.data);
  return useQuery(['geostory-datasets', params], fetchGeostoryLayers, {
    select: (data) =>
      data.map((d) => ({
        ...d,
        range: d?.range?.map((r) => ({
          label: r.substring(0, 4),
          value: r,
        })),
      })),
    ...queryOptions,
  });
}

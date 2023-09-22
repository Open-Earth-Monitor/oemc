import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import API from 'services/api';

import type { UseParamsOptions, LayerTypes } from '../types/datasets';

export function useLayers(queryOptions?: UseQueryOptions<LayerTypes[], Error>) {
  const fetchLayer = () =>
    API.request({
      method: 'GET',
      url: '/layers',
      ...queryOptions,
    }).then((response: AxiosResponse<LayerTypes[]>) => response.data);
  return useQuery(['layer'], fetchLayer, {
    select: (data) => data.map((layer) => ({ ...layer, range: layer.range[0] })),
    ...queryOptions,
  });
}

export function useLayerSource(
  params?: UseParamsOptions,
  queryOptions?: UseQueryOptions<LayerTypes, Error>
) {
  const fetchLayer = () =>
    API.request({
      method: 'GET',
      url: `/layers`,
      params,
      ...queryOptions,
    }).then((response: AxiosResponse<LayerTypes[]>) => response.data[0]);

  return useQuery(['layer', params], fetchLayer, {
    select: (data) => ({
      ...data,
      range: data?.range?.[0] || null,
    }),
    ...queryOptions,
  });
}

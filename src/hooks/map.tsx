import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import API from 'services/api';

import type { UseParamsOptions, LayerTypes, LayerParsedRangeTypes } from '../types/datasets';

export function useLayers(
  queryOptions?: UseQueryOptions<LayerTypes[], Error, LayerParsedRangeTypes[]>
) {
  const fetchLayer = () =>
    API.request({
      method: 'GET',
      url: '/layers',
      ...queryOptions,
    }).then((response: AxiosResponse<LayerTypes[]>) => response.data);
  return useQuery(['layer'], fetchLayer, {
    select: (data) =>
      data.map((d) => ({
        ...d,
        range: d?.range?.map((r) => ({
          value: r.substring(0, 4),
          label: r,
        })),
      })),
    ...queryOptions,
  });
}

export function useLayerSource(
  params?: UseParamsOptions,
  queryOptions?: UseQueryOptions<LayerTypes, Error, LayerParsedRangeTypes>
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
      range: data?.range?.map((r) => ({
        value: r.substring(0, 4),
        label: r,
      })),
    }),
    ...queryOptions,
  });
}

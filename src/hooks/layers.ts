import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import type { UseParamsOptions, LayerTypes, LayerParsedRangeTypes } from '@/types/datasets';

import API from 'services/api';

const DEFAULT_QUERY_OPTIONS = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: false,
  staleTime: Infinity,
};

export function useLayers(
  queryOptions?: UseQueryOptions<LayerTypes[], Error, LayerParsedRangeTypes[]>
) {
  const fetchLayer = () =>
    API.request({
      method: 'GET',
      url: '/layers',
      ...queryOptions,
    }).then((response: AxiosResponse<LayerTypes[]>) => response.data);
  return useQuery(['layers'], fetchLayer, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) =>
      data.map((d) => ({
        ...d,
        range: d?.range?.map((r, index) => ({
          value: r,
          label: d?.range_labels[index],
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
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) => ({
      ...data,
      range: data?.range?.map((r, index) => ({
        value: r,
        label: data?.range_labels[index],
      })),
    }),
    ...queryOptions,
  });
}

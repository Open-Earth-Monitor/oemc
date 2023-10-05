import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import type { Layer, LayerParsed } from '@/types/layers';

import API from 'services/api';

const DEFAULT_QUERY_OPTIONS = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: false,
  staleTime: Infinity,
};

type UseParamsOptions = Readonly<{
  layer_id: string;
}>;

export function useLayers(queryOptions?: UseQueryOptions<Layer[], Error, LayerParsed[]>) {
  const fetchLayer = () =>
    API.request({
      method: 'GET',
      url: '/layers',
      ...queryOptions,
    }).then((response: AxiosResponse<Layer[]>) => response.data);
  return useQuery(['layers'], fetchLayer, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) =>
      data.map((d) => ({
        ...d,
        gs_style: JSON.parse(d?.gs_style || null) as LayerParsed['gs_style'],
        range: d?.range?.map((r, index) => ({
          value: r,
          label: d?.range_labels[index],
        })),
      })),
    ...queryOptions,
  });
}

export function useLayerParsedSource(
  params?: UseParamsOptions,
  queryOptions?: UseQueryOptions<Layer, Error, LayerParsed>
) {
  const fetchLayer = () =>
    API.request({
      method: 'GET',
      url: `/layers`,
      params,
      ...queryOptions,
    }).then((response: AxiosResponse<Layer[]>) => response.data[0]);

  return useQuery(['layer', params], fetchLayer, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) => ({
      ...data,
      gs_style: JSON.parse(data?.gs_style || null) as LayerParsed['gs_style'],
      range: data?.range?.map((r, index) => ({
        value: r,
        label: data?.range_labels[index],
      })),
    }),
    ...queryOptions,
  });
}

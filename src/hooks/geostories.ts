import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import type { GeoStory } from '@/types/geostories';
import type { Layer, LayerParsed } from '@/types/layers';

import API from 'services/api';

type UseParams = {
  geostory_id?: string;
};

const DEFAULT_QUERY_OPTIONS = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: false,
  staleTime: Infinity,
};

export function useGeostory(params: UseParams, queryOptions?: UseQueryOptions<GeoStory, Error>) {
  const fetchGeostory = () =>
    API.request({
      method: 'GET',
      url: '/geostories',
      params,
      ...queryOptions,
    }).then((response: AxiosResponse<GeoStory[]>) => response.data[0]);
  return useQuery(['geostories', params], fetchGeostory, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) => data,
    ...queryOptions,
  });
}

export function useGeostoryLayers(
  params: UseParams,
  queryOptions?: UseQueryOptions<Layer[], Error, LayerParsed[]>
) {
  const { geostory_id } = params;
  const fetchGeostoryLayers = () =>
    API.request({
      method: 'GET',
      url: `/geostories/${geostory_id}/layers`,
      ...queryOptions,
    }).then((response: AxiosResponse<Layer[]>) => response.data);
  return useQuery(['geostory-layers', params], fetchGeostoryLayers, {
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

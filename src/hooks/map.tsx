import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import API from 'services/api';

import type { UseParamsOptions, LayerTypes } from './types';

export function useLayers(queryOptions?: UseQueryOptions<LayerTypes[], Error>) {
  const fetchLayer = () =>
    API.request({
      method: 'GET',
      url: '/layers',
      ...queryOptions,
    }).then((response: AxiosResponse<LayerTypes[]>) => response.data);
  return useQuery(['layer'], fetchLayer, {
    select: (data) => data,
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
      params: {
        ...params,
      },
      ...queryOptions,
    }).then((response: AxiosResponse<LayerTypes[]>) =>
      response.data.find((d) => d.layer_id === params?.layer_id)
    );
  return useQuery(['layer', params], fetchLayer, {
    placeholderData: {
      gs_base_wms: '',
      gs_name: '',
      range: '',
    },
    select: (data) => ({
      ...data,
      range: data?.range?.split(',')[0],
    }),
    ...queryOptions,
  });
}

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import API from 'services/api';

import type { UseParamsOptions, FakeDataTypes } from './types';

export function useLayers(
  params?: UseParamsOptions,
  queryOptions?: UseQueryOptions<FakeDataTypes[], Error>
) {
  const fetchLayer = () =>
    API.request({
      method: 'GET',
      url: '/layers',
      // params: {
      //   ...params,
      // },
      ...queryOptions,
    }).then((response: AxiosResponse<FakeDataTypes[]>) => response.data);
  return useQuery(['layer', params], fetchLayer, {
    select: (data) => data,
    ...queryOptions,
  });
}

export function useLayerSource(
  params?: UseParamsOptions,
  routeAPIparams?: UseParamsOptions, // TODO: remove this when API gets ready
  queryOptions?: UseQueryOptions<FakeDataTypes, Error>
) {
  const { layer_id } = routeAPIparams;
  const fetchLayer = () =>
    API.request({
      method: 'GET',
      url: `/layers/${layer_id}`, // TODO: remove route when API gets ready
      // params: {
      //   ...params, // TODO: add back when API gets ready
      // },
      ...queryOptions,
    }).then((response: AxiosResponse<FakeDataTypes>) => response.data);
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

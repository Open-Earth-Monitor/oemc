import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import type { Layer, LayerParsed } from '@/types/layers';

import { isValidJSON } from '@/utils/json';
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
      data.map((d) => {
        const isLegendValid = isValidJSON(d?.gs_style);
        return {
          ...d,
          gs_style: isLegendValid
            ? (JSON.parse(d?.gs_style || null) as LayerParsed['gs_style'])
            : [],
          range: d?.range?.map((r, index) => ({
            value: r,
            label: d?.range_labels?.[index] || null,
          })),
        };
      }),
    ...queryOptions,
  });
}

export function useLayer(
  params: { layer_id: string },
  queryOptions?: UseQueryOptions<Layer, Error, LayerParsed>
) {
  const fetchLayer = () =>
    API.request({
      method: 'GET',
      url: '/layers',
      params,
      ...queryOptions,
    }).then((response: AxiosResponse<Layer[]>) => response.data[0]);
  return useQuery(['layer', params], fetchLayer, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) => {
      const isLegendValid = isValidJSON(data?.gs_style);
      return {
        ...data,
        gs_style: isLegendValid
          ? (JSON.parse(data?.gs_style || null) as LayerParsed['gs_style'])
          : [],
        range: data?.range?.map((r, index) => ({
          value: r,
          label: data?.range_labels?.[index] || null,
        })),
      };
    },
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
    select: (data) => {
      const isLegendValid = isValidJSON(data?.gs_style);
      return {
        ...data,
        gs_style: isLegendValid
          ? (JSON.parse(data?.gs_style || null) as LayerParsed['gs_style'])
          : [],
        range: data?.range?.map((r, index) => ({
          value: r,
          label: data?.range_labels?.[index] || null,
        })),
      };
    },
    ...queryOptions,
  });
}

export function useNutsLayerData(
  params: { NUTS_ID: string; LAYER_ID: string },
  queryOptions?: UseQueryOptions<
    {
      dataset: {
        avg: number;
        label: string;
        max: number;
        min: number;
      }[];
    },
    Error
  >
) {
  const fetchNutsLayerData = () => {
    return API.request({
      method: 'GET',
      url: '/stats',
      params,
    }).then((response) => {
      return response.data;
    });
  };

  return useQuery(['region-stats', params], fetchNutsLayerData, {
    ...DEFAULT_QUERY_OPTIONS,
    ...queryOptions,
  });
}

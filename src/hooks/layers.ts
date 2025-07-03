import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

import type { Layer, LayerParsed } from '@/types/layers';

import type {
  LegendGraphicResponse,
  UseLegendGraphicOptions,
  LegendProps,
} from '@/components/map/legend/types';

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
        return {
          ...d,
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
      return {
        ...data,
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
      return {
        ...data,
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

export function useLegendGraphic({ gs_base_wms, gs_name }: UseLegendGraphicOptions) {
  const url = `${gs_base_wms}?VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=${gs_name}&format=application/json`;

  return useQuery<LegendProps>({
    queryKey: ['legend-graphic', gs_name],
    queryFn: async () => {
      const res = await axios.get<LegendGraphicResponse>(url);
      const colormap = res.data?.Legend?.[0]?.rules?.[0]?.symbolizers?.[0]?.Raster?.colormap;

      return {
        entries: colormap?.entries ?? [],
        type: colormap?.type ?? 'unknown',
      };
    },
    enabled: !!gs_base_wms && !!gs_name,
    staleTime: 1000 * 60 * 10,
  });
}

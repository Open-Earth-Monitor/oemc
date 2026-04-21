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

export function useLayer<TData = LayerParsed>(
  params: { layer_id: string; compare?: boolean },
  queryOptions?: UseQueryOptions<Layer, Error, TData>
) {
  const fetchLayer = () =>
    API.request({
      method: 'GET',
      url: '/layers',
      params,
    }).then((response: AxiosResponse<Layer[]>) => response.data[0]);

  return useQuery<Layer, Error, TData>(['layer', params], fetchLayer, {
    ...DEFAULT_QUERY_OPTIONS,
    select: ((data: Layer) => {
      const parsedData: LayerParsed = {
        ...data,
        range: data?.range?.map((r, index) => ({
          value: r,
          label: data?.range_labels?.[index] || null,
        })),
      };

      return parsedData as TData;
    }) as (data: Layer) => TData,
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
    }).then((response: AxiosResponse<Layer[]>) => {
      return response.data[0];
    });

  return useQuery(['layer-parsed', params], fetchLayer, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (layer) => {
      const transformLayer = (l: Layer): LayerParsed => ({
        ...l,
        range: l?.range?.map((r, index) => ({
          value: r,
          label: l?.range_labels?.[index] || null,
        })),
      });

      const parsed = transformLayer(layer);

      // También transforma extra_lyrs si existen
      if (layer?.extra_lyrs && Array.isArray(layer.extra_lyrs)) {
        parsed.extra_lyrs = layer.extra_lyrs.map(transformLayer);
      }

      return parsed;
    },
    ...queryOptions,
  });
}

function toNumberOrNull(val: unknown): number | null {
  if (val === null || val === undefined) return null;
  if (typeof val === 'string' && val.toUpperCase() === 'NO DATA') return null;
  const n = Number(val);
  return Number.isFinite(n) ? n : null;
}

export function useNutsLayerData(
  params: { NUTS_ID?: string; LAYER_ID?: string; key: 'regular' | 'compare' } | undefined,
  queryOptions?: UseQueryOptions<
    {
      dataset?: { avg: number | null; label: string; max: number | null; min: number | null }[];
      layer_id?: string;
      error?: string;
    },
    Error
  >
) {
  const NUTS_ID = params?.NUTS_ID ?? '';
  const LAYER_ID = params?.LAYER_ID ?? '';

  return useQuery({
    queryKey: ['region-stats', NUTS_ID, LAYER_ID, params.key],
    queryFn: async ({ queryKey }) => {
      const [, id, layer] = queryKey as [string, string, string];
      const res = await API.request({
        method: 'GET',
        url: '/stats',
        params: { NUTS_ID: id, LAYER_ID: layer },
      });
      const data = res.data;
      if (data?.dataset) {
        data.dataset = data.dataset.map((d: Record<string, unknown>) => ({
          ...d,
          avg: toNumberOrNull(d.avg),
          min: toNumberOrNull(d.min),
          max: toNumberOrNull(d.max),
        }));
      }
      return data;
    },
    enabled: Boolean(NUTS_ID && LAYER_ID) && (queryOptions?.enabled ?? true),
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

export function cleanLayer(layer: Omit<Layer, 'extra_lyrs'>): LayerParsed {
  return {
    ...layer,
    range: (layer.range ?? []).map((r, i) => ({
      value: r,
      label: layer.range_labels?.[i] ?? null,
    })),
  };
}

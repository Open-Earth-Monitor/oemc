import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import type { Geostory, GeostoryParsed } from '@/types/geostories';
import type { Layer, LayerParsed } from '@/types/layers';

import { Theme, THEMES_COLORS } from '@/constants/themes';

import { cleanLayer } from '@/hooks/layers';

import { parseBBox } from '@/utils/bbox';
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

const getColor = (ready: boolean, theme: Theme, themeType: 'base' | 'dark' | 'light') => {
  if (!ready) return 'hsla(0, 0%, 79%, 1)';
  return THEMES_COLORS[theme][themeType] || THEMES_COLORS.Unknown[themeType];
};

export function useGeostory(params: UseParams, queryOptions?: UseQueryOptions<Geostory, Error>) {
  const fetchGeostory = () =>
    API.request({
      method: 'GET',
      url: '/geostories',
      params,
      ...queryOptions,
    }).then((response: AxiosResponse<Geostory[]>) => response.data[0]);
  return useQuery(['geostories', params], fetchGeostory, {
    ...DEFAULT_QUERY_OPTIONS,
    ...queryOptions,
  });
}

export function useGeostoryParsed(
  params: UseParams,
  queryOptions?: UseQueryOptions<Geostory, Error, GeostoryParsed>
) {
  const fetchGeostory = () =>
    API.request({
      method: 'GET',
      url: '/geostories',
      params,
      ...queryOptions,
    }).then((response: AxiosResponse<Geostory[]>) => response.data[0]);
  return useQuery(['geostories-parsed', params], fetchGeostory, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) => ({
      ...data,
      geostory_bbox: parseBBox(data.geostory_bbox, 'geostory'),
      color: getColor(data.ready, data.theme, 'base'),
    }),
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
    select: (layers) => {
      const flattenAndCleanLayers = layers.flatMap((layer) => {
        const { extra_lyrs = [], ...baseLayer } = layer;

        const cleanedBase = cleanLayer(baseLayer);
        const cleanedExtras = extra_lyrs.map(cleanLayer);

        return [cleanedBase, ...cleanedExtras];
      });

      return flattenAndCleanLayers;
    },
    ...queryOptions,
  });
}

export function useGeostories(queryOptions?: UseQueryOptions<Geostory[], Error>) {
  const fetchGeostories = () =>
    API.request({
      method: 'GET',
      url: '/geostories',
      ...queryOptions,
    }).then((response: AxiosResponse<Geostory[]>) => response.data);
  return useQuery(['geostories'], fetchGeostories, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) =>
      data.map((d) => ({ ...d, geostory_bbox: parseBBox(d.geostory_bbox, 'geostory') })),
    ...queryOptions,
  });
}

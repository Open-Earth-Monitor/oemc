import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import type { Geostory, GeostoryParsed } from '@/types/geostories';
import type { Layer, LayerParsed } from '@/types/layers';

import { Theme, THEMES_COLORS } from '@/constants/themes';

import { parseBBox } from '@/utils/bbox';
import { normalizeLayers } from '@/utils/layers';
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

export function useGeostoryLayers<TData = LayerParsed[]>(
  params: UseParams,
  queryOptions?: Omit<UseQueryOptions<Layer[], Error, TData>, 'select'> & {
    // remove when API improves response
    select?: (data: LayerParsed[]) => TData;
  }
) {
  const { geostory_id } = params;

  const fetchGeostoryLayers = () =>
    API.request({
      method: 'GET',
      url: `/geostories/${geostory_id}/layers`,
    }).then((response: AxiosResponse<Layer[]>) => response.data);

  // remove this part when API improves and adds extra_lyrs directly to the response
  const { select: externalSelect, ...rest } = queryOptions ?? {};

  return useQuery<Layer[], Error, TData>(['geostory-layers', params], fetchGeostoryLayers, {
    ...DEFAULT_QUERY_OPTIONS,
    ...rest,
    select: (raw: Layer[]) => {
      const normalized = normalizeLayers(raw);
      return externalSelect ? externalSelect(normalized) : (normalized as unknown as TData);
    },
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

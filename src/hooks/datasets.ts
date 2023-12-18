import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import type {
  MonitorsAndGeostories,
  MonitorsAndGeostoriesParsed,
  MonitorsAndGeostoriesPaginated,
  MonitorsAndGeostoriesPaginatedParsed,
} from '@/types/monitors-and-geostories';

import { THEMES_COLORS } from '@/constants/themes';

import API from 'services/api';

type UseParams = {
  type?: 'monitors' | 'geostories' | 'all';
  page?: number;
  monitor_id?: string;
  pagination?: boolean;
  sort_by?: 'title' | 'date';
};

const DEFAULT_QUERY_OPTIONS = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: false,
  staleTime: Infinity,
};

export function useMonitorsAndGeostories(
  params?: UseParams,
  queryOptions?: UseQueryOptions<MonitorsAndGeostories, Error, MonitorsAndGeostoriesParsed>
) {
  const fetchMonitorAndGeostories = () =>
    API.request<MonitorsAndGeostories>({
      method: 'GET',
      url: '/monitors-and-geostories',
      params,
      ...queryOptions,
    }).then((response) => response.data);

  return useQuery(['monitor-and-geostories', params], fetchMonitorAndGeostories, {
    ...DEFAULT_QUERY_OPTIONS,
    ...queryOptions,
    select: (data): MonitorsAndGeostoriesParsed =>
      data.map((d) => ({
        ...d,
        color: THEMES_COLORS[d.theme].base || THEMES_COLORS.Unknown.base,
        colorHead: THEMES_COLORS[d.theme].dark || THEMES_COLORS.Unknown.dark,
        colorOpacity: THEMES_COLORS[d.theme].light || THEMES_COLORS.Unknown.light,
      })),
  });
}

export function useMonitorsAndGeostoriesPaginated(
  params?: UseParams,
  queryOptions?: UseQueryOptions<
    MonitorsAndGeostoriesPaginated,
    Error,
    MonitorsAndGeostoriesPaginatedParsed
  >
) {
  const fetchMonitorAndGeostories = () =>
    API.request<MonitorsAndGeostoriesPaginated>({
      method: 'GET',
      url: '/monitors-and-geostories',
      params: { ...params, pagination: true },
      ...queryOptions,
    }).then((response) => response.data);

  return useQuery(['monitor-and-geostories', params], fetchMonitorAndGeostories, {
    ...DEFAULT_QUERY_OPTIONS,
    ...queryOptions,
    select: (data): MonitorsAndGeostoriesPaginatedParsed => ({
      ...data,
      data: data['monitors and geostories'].map((d) => ({
        ...d,
        color: THEMES_COLORS[d.theme].base || THEMES_COLORS.Unknown.base,
        colorHead: THEMES_COLORS[d.theme].dark || THEMES_COLORS.Unknown.dark,
        colorOpacity: THEMES_COLORS[d.theme].light || THEMES_COLORS.Unknown.light,
      })),
    }),
  });
}

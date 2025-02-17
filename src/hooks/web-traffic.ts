import { useQuery, useQueries, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { sortBy } from 'lodash';
import API from 'services/api';

import { THEMES_COLORS, DEFAULT_COLOR } from '@/constants/themes';

type TrackingType = 'geostory_id' | 'monitor_id' | 'layer_id';

type TrackingData = Partial<Record<TrackingType, string | string[]>>;

type WebTrafficResponseData = {
  monitors: { monitor_id: string; counter: number }[];
  geostories: { geostory_id: string; counter: number }[];
};

const DEFAULT_QUERY_OPTIONS = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: false,
  staleTime: Infinity,
};

export function useGetWebTraffic(
  queryOptions?: UseQueryOptions<WebTrafficResponseData, AxiosError, WebTrafficResponseData>
) {
  // Step 1: Fetch usage stats to get top 5 geostory and monitor IDs
  const fetchWebTraffic = () =>
    API.request({
      method: 'GET',
      url: '/usage-stats',
    }).then((response) => response.data);

  const webTrafficQuery = useQuery<WebTrafficResponseData, AxiosError, WebTrafficResponseData>(
    ['web-traffic'],
    fetchWebTraffic,
    {
      ...DEFAULT_QUERY_OPTIONS,
      select: (data) => ({
        geostories: sortBy(data.geostories, 'counter').slice(0, 5), // Get top
        monitors: sortBy(data.monitors, 'counter').slice(0, 5),
      }),
      ...queryOptions,
    }
  );

  const fetchAllGeostories = () =>
    API.request({
      method: 'GET',
      url: `/geostories`, // Fetch all geostories
    }).then((response) => response.data);

  const allGeostoriesQuery = useQuery(['geostories'], fetchAllGeostories, {
    enabled: !!webTrafficQuery.data?.geostories.length, // Only fetch if topGeostoryIds is available
    select: (allGeostories) => {
      const topGeostoryIds =
        webTrafficQuery.data.geostories.map(({ geostory_id }) => geostory_id) || [];
      // Filter geostories by the top 5 most visited IDs and return their titles
      return allGeostories
        .filter((geostory) => topGeostoryIds.includes(geostory.id))
        .map((geostory) => geostory.title);
    },
    ...queryOptions,
  });

  // Step 3: Fetch monitor details for top 5 monitors
  const fetchMonitor = (monitor_id: string) =>
    API.request({
      method: 'GET',
      url: `/monitors/${monitor_id}`,
    }).then((response) => response.data);

  const monitorsQueries = useQueries({
    queries:
      webTrafficQuery.data?.monitors.map(({ monitor_id }) => ({
        queryKey: ['monitor', monitor_id],
        queryFn: () => fetchMonitor(monitor_id),
        enabled: !!monitor_id, // Only enable if monitor_id exists
      })) || [],
  });

  const isLoadingMonitors =
    webTrafficQuery.isLoading || monitorsQueries.some((query) => query.isLoading);

  const isLoadingGeostories = webTrafficQuery.isLoading || allGeostoriesQuery.isLoading;

  const geostoriesInfo = allGeostoriesQuery.data;
  const monitorsInfo = monitorsQueries.map((query) => {
    return {
      theme: query.data?.[0]?.theme,
      title: query.data?.[0]?.title,
      color: THEMES_COLORS[query?.data?.[0]?.theme]?.base || DEFAULT_COLOR,
    };
  });

  return {
    isLoadingGeostories,
    isLoadingMonitors,
    geostoriesInfo,
    monitorsInfo,
  };
}

export function usePostWebTraffic(data: TrackingData, queryOptions?: UseQueryOptions) {
  return API.request({
    method: 'POST',
    url: '/usage-stats',
    headers: { 'Content-Type': 'application/json' },
    data,
  }).catch((error) => {
    console.error('Error posting web traffic', error);
  });
}

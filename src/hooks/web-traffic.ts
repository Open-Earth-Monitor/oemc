import { useQuery, useQueries, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import API from 'services/api';

import { THEMES_COLORS, DEFAULT_COLOR } from '@/constants/themes';

type TrackingType = 'geostory_id' | 'monitor_id' | 'layer_id';

type TrackingData = Partial<Record<TrackingType, string | string[]>>;

type TrafficCountData = [string, number];

type WebTrafficData = {
  geostories: TrafficCountData[];
  monitors: TrafficCountData[];
};

type WebTrafficResponseData = {
  topMonitorIds: string[];
  topGeostoryIds: string[];
};

const DEFAULT_QUERY_OPTIONS = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: false,
  staleTime: Infinity,
};

const getTopFive = (group: TrafficCountData[]) => {
  // Sort the group by the second element in descending order
  return group
    .sort((a, b) => b[1] - a[1]) // Sort by the second element (number)
    .slice(0, 5) // Get the top 5
    .map((item) => item[0]); // Return only the first element (e.g., 'g2', 'm2')
};

export function useGetWebTraffic(
  queryOptions?: UseQueryOptions<WebTrafficData, AxiosError, WebTrafficResponseData>
) {
  // Step 1: Fetch usage stats to get top 5 geostory and monitor IDs
  const fetchWebTraffic = () =>
    API.request({
      method: 'GET',
      url: '/usage-stats',
    }).then((response) => response.data);

  const webTrafficQuery = useQuery<WebTrafficData, AxiosError, WebTrafficResponseData>(
    ['web-traffic'],
    fetchWebTraffic,
    {
      ...DEFAULT_QUERY_OPTIONS,
      select: (data: WebTrafficData) => ({
        topGeostoryIds: getTopFive(data.geostories), // Get top 5 geostory IDs
        topMonitorIds: getTopFive(data.monitors), // Get top 5 monitor IDs
      }),
      ...queryOptions,
    }
  );

  // Step 2: Fetch all geostories and filter by top 5 most visited IDs
  const fetchAllGeostories = () =>
    API.request({
      method: 'GET',
      url: `/geostories`, // Fetch all geostories
    }).then((response) => response.data);

  const allGeostoriesQuery = useQuery(['geostories'], fetchAllGeostories, {
    enabled: !!webTrafficQuery.data?.topGeostoryIds, // Only fetch if topGeostoryIds is available
    select: (allGeostories) => {
      const topGeostoryIds = webTrafficQuery.data?.topGeostoryIds || [];
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
      webTrafficQuery.data?.topMonitorIds.map((monitor_id) => ({
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
      theme: query.data?.theme,
      title: query.data?.title,
      color: THEMES_COLORS[query?.data?.theme]?.base || DEFAULT_COLOR,
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

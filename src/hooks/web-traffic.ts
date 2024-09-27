import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import API from 'services/api';

type TrackingType = 'geostories' | 'monitors' | 'layers';

type TrackingData = Partial<Record<TrackingType, string | string[]>>;

type TrafficCountData = [string, number];

type WebTrafficData = {
  geostories: TrafficCountData[];
  layers: TrafficCountData[];
  monitors: TrafficCountData[];
};

const DEFAULT_QUERY_OPTIONS = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: false,
  staleTime: Infinity,
};

const fake_response = {
  geostories: [
    ['g2', 0],
    ['g3', 3],
    ['g4', 0],
    ['g5', 0],
    ['g6', 0],
    ['g7', 5],
    ['g8', 0],
    ['g9', 0],
    ['g10', 9],
    ['g1', 0],
  ],
  layers: [
    ['l1', 1],
    ['l4', 0],
    ['l9', 0],
    ['l6', 10],
    ['l7', 0],
    ['l8', 20],
    ['l5', 0],
    ['l10', 0],
    ['l11', 0],
    ['l3', 0],
  ],
  monitors: [
    ['m2', 230],
    ['m3', 0],
    ['m4', 450],
    ['m5', 0],
    ['m6', 0],
    ['m7', 80],
    ['m8', 90],
    ['m9', 0],
    ['m10', 0],
    ['m1', 0],
  ],
};

const getTopFive = (group) => {
  // Sort the group by the second element in descending order
  return group
    .sort((a, b) => b[1] - a[1]) // Sort by the second element (number)
    .slice(0, 5) // Get the top 5
    .map((item) => item[0]); // Return only the first element (e.g., 'g2', 'm2')
};

export function useGetWebTraffic(
  queryOptions?: UseQueryOptions<WebTrafficData, AxiosError, WebTrafficData>
) {
  const fetchWebTraffic = () =>
    API.request({
      method: 'GET',
      url: '/usage-stats',
      ...queryOptions,
    }).then((response: AxiosResponse<WebTrafficData>) => {
      return fake_response;
    });
  return useQuery(['web-traffic'], fetchWebTraffic, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) => {
      return {
        geostories: getTopFive(data.geostories),
        layers: getTopFive(data.layers),
        monitors: getTopFive(data.monitors),
      };
    },
    ...queryOptions,
  });
}

export function usePostWebTraffic(data: TrackingData[], queryOptions?: UseQueryOptions) {
  console.info(data);

  // return API.request({
  //   method: 'POST',
  //   url: '/usage-stats',
  //   headers: { 'Content-Type': 'application/json' },
  //   data,
  // });
}

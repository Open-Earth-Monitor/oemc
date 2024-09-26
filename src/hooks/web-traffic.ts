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
    ['g3', 0],
    ['g4', 0],
    ['g5', 0],
    ['g6', 0],
    ['g7', 0],
    ['g8', 0],
    ['g9', 0],
    ['g10', 0],
    ['g1', 0],
  ],
  layers: [
    ['l1', 1],
    ['l4', 0],
    ['l9', 0],
    ['l6', 0],
    ['l7', 0],
    ['l8', 0],
    ['l5', 0],
    ['l10', 0],
    ['l11', 0],
    ['l3', 0],
  ],
  monitors: [
    ['m2', 0],
    ['m3', 0],
    ['m4', 0],
    ['m5', 0],
    ['m6', 0],
    ['m7', 0],
    ['m8', 0],
    ['m9', 0],
    ['m10', 0],
    ['m1', 0],
  ],
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
      return data;
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

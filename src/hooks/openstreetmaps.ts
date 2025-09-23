import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Extent } from 'ol/extent';

import { APIOpenStreetMapLocation } from 'services/api';

export type Location = {
  boundingbox: Extent;
  place_id: number;
  display_name: string;
  name: string;
};

const DEFAULT_QUERY_OPTIONS = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: false,
  staleTime: Infinity,
};
export function useOpenStreetMapsLocations(
  params?: unknown,
  queryOptions?: UseQueryOptions<Location[], Error>
) {
  const fetchOpenStreetMapsLocation = () =>
    APIOpenStreetMapLocation.request({
      method: 'GET',
      url: '/search',
      params,
    }).then((response: AxiosResponse<Location[]>) => response.data);
  return useQuery(['open-street-maps-location', params], fetchOpenStreetMapsLocation, {
    ...DEFAULT_QUERY_OPTIONS,
    ...queryOptions,
  });
}

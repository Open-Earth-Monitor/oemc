import { CancelledError, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse, CanceledError } from 'axios';
import { getCenter } from 'ol/extent';
import { fromLonLat, toLonLat } from 'ol/proj';
import View from 'ol/View';

import API from 'services/api';

type UseParams = {
  lon: number;
  lat: number;
  layer_id: string;
};

type RegionData = {
  label: string;
  layer_id: string;
  value: number;
  unit?: string;
};

const DEFAULT_QUERY_OPTIONS = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: false,
  staleTime: Infinity,
};

export function usePointData(
  params: UseParams,
  queryOptions?: UseQueryOptions<RegionData[], AxiosError, RegionData[]>
) {
  const fetchRegionData = ({ signal }: { signal?: AbortSignal }) =>
    API.request({
      method: 'GET',
      url: '/point-query',
      params,
      signal,
      ...queryOptions,
    })
      .then((response: AxiosResponse<RegionData[] | string>) => {
        // example - Soil moisture index 12,5km resolution HSAF ASCAT h121 over Europe ( layer_id: l25)
        // we could find it in geostory "Drought at high resolution in Europe" (geostory_id: g5)

        if (typeof response.data === 'string') {
          return JSON.parse(response.data.replace(/\bNaN\b/g, 'null'));
        }
        return response.data;
      })
      .catch((error: CanceledError<unknown> | AxiosError) => {
        console.error('Error fetching region data:', error);
      });

  return useQuery(['region-data', params], fetchRegionData, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) => data,
    ...queryOptions,
  });
}

export function getBboxFromMap(map) {
  const view = map?.getView();
  const extent = view.calculateExtent(map.getSize());
  const bbox = [toLonLat([extent[0], extent[1]]), toLonLat([extent[2], extent[3]])];

  return bbox;
}

export function getCenterAndZoomFromBbox(bbox, mapSize) {
  // Convert BBOX a EPSG:3857
  const bbox3857 = bbox.map((coord, i) =>
    i % 2 === 0 ? fromLonLat([coord, bbox[i + 1]])[0] : fromLonLat([bbox[i - 1], coord])[1]
  );

  // Get center of the BBOX
  const center = getCenter(bbox3857);

  // Get view from the center
  const view = new View({
    center: center,
    projection: 'EPSG:3857',
  });

  // Adjust view to fit the BBOX
  view.fit(bbox3857, { size: mapSize });

  return {
    center: toLonLat(center), // Convertir a EPSG:4326
    zoom: view.getZoom(),
  };
}

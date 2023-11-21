import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import type { Geostory } from '@/types/geostories';
import type { Theme } from '@/types/global';
import type { Monitor } from '@/types/monitors';

import API from 'services/api';

type UseParams = {
  type?: 'monitors' | 'geostories' | 'all';
  monitor_id?: string;
  sort_by?: 'title' | 'date' | 'theme';
};

type DEFAULT_THEME_TYPES = {
  [key in Theme]: {
    label: string;
    color: string;
    icon: string;
    background: string;
  };
};

export const DEFAULT_THEME_OPTIONS: DEFAULT_THEME_TYPES = {
  'Land Cover and Land Use': {
    label: 'Land cover and land use',
    color: 'hsla(133, 97%, 85%, 1)',
    icon: '/images/svgs/theme-icons/forest.svg',
    background: '/images/landing/geostories-backgrounds/forest.jpg',
  },
  Biodiversity: {
    label: 'Biodiversity',
    color: 'hsla(60, 90%, 84%, 1)',
    icon: '/images/svgs/theme-icons/biodiversity.svg',
    background: '/images/landing/geostories-backgrounds/biodiversity.jpg',
  },
  'Buildings and Settlements': {
    label: 'Buildings and settlements',
    color: 'hsla(8, 100%, 76%, 1)',
    icon: '/images/svgs/theme-icons/agriculture.svg',
    background: '/images/landing/geostories-backgrounds/agriculture.jpg',
  },
  Water: {
    label: 'Water',
    color: 'hsla(209, 94%, 87%, 1)',
    icon: '/images/svgs/theme-icons/water.svg',
    background: '/images/landing/geostories-backgrounds/water.jpg',
  },
  Climate: {
    label: 'Climate',
    color: 'hsla(254, 78%, 87%, 1)',
    icon: '/images/svgs/theme-icons/climate.svg',
    background: '/images/landing/geostories-backgrounds/climate.jpg',
  },
  'Population Distribution': {
    label: 'Population distribution',
    color: 'hsla(209, 94%, 87%, 1)',
    icon: '/images/svgs/theme-icons/forest.svg',
    background: '/images/landing/geostories-backgrounds/climate.jpg',
  },
  'Geology and Soils': {
    label: 'Geology and soils',
    color: 'hsla(60, 100%, 95%, 1)',
    icon: '/images/svgs/theme-icons/soils.svg',
    background: '/images/landing/geostories-backgrounds/soils.jpg',
  },
} satisfies DEFAULT_THEME_TYPES;

const COLORS_OPACITY = (<{ [key: string]: string }>{
  g1: '#012E65',
  g2: '#2c4319',
  g3: '#735637',
  g4: 'hsla(8, 100%, 76%, 0.2)',
  g5: 'hsla(133, 97%, 85%, 0.2)',
  g6: 'hsla(254, 78%, 87%, 0.2)',
  g7: 'hsla(60, 100%, 95%, 0.2)',
  g8: 'hsla(60, 90%, 84%, 0.2)',
}) satisfies { [key: string]: string };

const DEFAULT_QUERY_OPTIONS = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: false,
  staleTime: Infinity,
};
export function useMonitorsAndGeostories(
  params?: UseParams,
  queryOptions?: UseQueryOptions<(Monitor | Geostory)[], Error>
) {
  const fetchMonitorAndGeostories = () =>
    API.request({
      method: 'GET',
      url: '/monitors-and-geostories',
      params,
      ...queryOptions,
    }).then(
      (
        response: AxiosResponse<
          (Monitor | (Geostory & { label: string; color: string; image: string; icon: string }))[]
        >
      ) => response.data
    );
  return useQuery(['monitor-and-geostories', params], fetchMonitorAndGeostories, {
    ...DEFAULT_QUERY_OPTIONS,
    select: (data) =>
      data?.map((d) => {
        return {
          ...d,
          ...DEFAULT_THEME_OPTIONS[d.theme],
          ...(COLORS_OPACITY[d.id] && { headColor: COLORS_OPACITY[d.id] }),
        };
      }),

    ...queryOptions,
  });
}

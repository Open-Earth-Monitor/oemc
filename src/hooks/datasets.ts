import { useEffect, useState } from 'react';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import type {
  MonitorsAndGeostories,
  MonitorsAndGeostoriesParsed,
  MonitorsAndGeostoriesPaginated,
  MonitorsAndGeostoriesPaginatedParsed,
} from '@/types/monitors-and-geostories';

import { Theme, THEMES_COLORS } from '@/constants/themes';

import API from 'services/api';

const getColor = (ready: boolean, theme: Theme, themeType: 'base' | 'dark' | 'light') => {
  if (!ready) return 'hsla(0, 0%, 79%, 1)';
  return THEMES_COLORS[theme][themeType] || THEMES_COLORS.Unknown[themeType];
};

// type DataObject = {
//   label: string;
//   layer_id: string;
//   value: number;
// };

type UseParams = {
  type?: 'monitors' | 'geostories' | 'all';
  page?: number;
  theme?: Theme[];
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

const columns = ['id', 'label', 'value'];

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
  const { theme, ...restParams } = params || { theme: undefined };
  const themeQuery = theme && theme.length > 0 ? `${theme.join(',')}` : '';
  const fetchMonitorAndGeostories = () =>
    API.request<MonitorsAndGeostoriesPaginated>({
      method: 'GET',
      url: '/monitors-and-geostories',
      params: {
        ...(theme && theme.length > 0 && { theme: themeQuery }),
        ...restParams,
        pagination: true,
      },
      ...queryOptions,
    }).then((response) => response.data);

  return useQuery(['monitor-and-geostories', params], fetchMonitorAndGeostories, {
    ...DEFAULT_QUERY_OPTIONS,
    keepPreviousData: true,
    ...queryOptions,
    select: (data): MonitorsAndGeostoriesPaginatedParsed => ({
      ...data,
      data: data['monitors and geostories'].map((d) => ({
        ...d,
        color: getColor(d.ready, d.theme, 'base'),
        colorHead: getColor(d.ready, d.theme, 'dark'),
        colorOpacity: getColor(d.ready, d.theme, 'light'),
      })),
    }),
  });
}

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);
  return debouncedValue;
};

// // Function to generate CSV content from data
// function generateCSVContent(data: DataObject): string {
//   // Get the columns from the csvTypeMapping

//   // Create the CSV header row
//   const headerRow = columns.join(',') + '\n';

//   if (Object.keys(data).length === 0) {
//     // If no data, return header and a default row with empty values
//     const emptyRow = columns.map(() => '').join(',');
//     return headerRow + emptyRow;
//   }

//   // Create the CSV rows from the data
//   const rows = Object.keys(data)
//     .map((country) => {
//       const row: { [key: string]: string } = { country_id: country };
//       columns.forEach((col) => ({
//         id: data.layer_id,
//         label: data.label,
//         value: data.value.toString(),
//       }));
//     })
//     .join('\n');

//   // Combine the header and rows into a single CSV string
//   return headerRow + rows;
// }

// // Function to download a CSV file
// export function downloadCSV(data: DataObject, filename: string = 'data.csv'): void {
//   // Generate CSV content
//   const csvContent = generateCSVContent(data);

//   // Create a Blob from the CSV content
//   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

//   // Create a link element
//   const link = document.createElement('a');

//   // Create a URL for the Blob and set it as the href attribute
//   const url = URL.createObjectURL(blob);
//   link.setAttribute('href', url);
//   link.setAttribute('download', filename);

//   // Append the link to the document body and trigger the download
//   document.body.appendChild(link);
//   link.click();

//   // Clean up by removing the link and revoking the URL
//   document.body.removeChild(link);
//   URL.revokeObjectURL(url);
// }

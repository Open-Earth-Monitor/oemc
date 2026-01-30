import { useQueryState } from 'next-usequerystate';
import { parseAsJson, parseAsBoolean } from 'next-usequerystate/parsers';
import { Extent } from 'ol/extent';

import type { CategoryId } from '@/constants/categories';

type LayerSettings = {
  id: string;
  opacity: number;
  date?: string;
};

export const useSyncLayersSettings = () => useQueryState('layers', parseAsJson<LayerSettings[]>());
export const useSyncCompareLayersSettings = () =>
  useQueryState('compareLayers', parseAsJson<LayerSettings[]>());

export const useSyncBboxSettings = () => useQueryState('bbox', parseAsJson<Extent>());

// swipe control position, this should not be on the URL but currently we have no global state,
// if the app grows and evolves in a way to consider the use of a global state, move this there
export const useSyncSwipeControlPosition = () =>
  useQueryState(
    'sp',
    parseAsJson<{ side: 'left' | 'right'; x: number }>().withDefault({ side: 'left', x: 0.5 })
  );

export const useSyncSidebarState = () =>
  useQueryState('sidebar-open', parseAsBoolean.withDefault(true));

export const useSyncBasemapSettings = () =>
  useQueryState(
    'basemap',
    parseAsJson<'world_imagery' | 'gray_scale'>().withDefault('world_imagery')
  );

// API category comes as "theme" from the backend but we use "category" in the URL for clarity
export type CategoryQueryParam = CategoryId[] | 'All';
export const useSyncCategories = () =>
  useQueryState<CategoryQueryParam>('categories', parseAsJson<CategoryQueryParam>());

//  Filter view in monitors, geostories or everything
export const useSyncDatasetType = () =>
  useQueryState('datasetType', parseAsJson<'all' | 'monitors' | 'geostories'>().withDefault('all'));

export const useSyncBasemapLabelsSettings = () =>
  useQueryState(
    'basemap-labels',
    parseAsJson<'dark' | 'light' | 'no-label'>().withDefault('light')
  );

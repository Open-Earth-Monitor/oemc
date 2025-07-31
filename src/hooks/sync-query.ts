import { useQueryState } from 'next-usequerystate';
import { parseAsJson, parseAsInteger, parseAsBoolean } from 'next-usequerystate/parsers';
import { Extent } from 'ol/extent';

import type { Theme } from '@/constants/themes';

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
export const useSwipeControlPosition = () => useQueryState('sp', parseAsInteger.withDefault(0.5));

export const useSyncSidebarState = () =>
  useQueryState('sidebar-open', parseAsBoolean.withDefault(true));

export const useSyncBasemapSettings = () =>
  useQueryState(
    'basemap',
    parseAsJson<'world_imagery' | 'Esri_WorldGrayCanvas'>().withDefault('world_imagery')
  );
export type ThemeQueryParam = Theme[] | [] | Theme;
export const useSyncTheme = () =>
  useQueryState<ThemeQueryParam>('theme', parseAsJson<ThemeQueryParam>());

//  Filter view in monitors, geostories or everything
export const useSyncDatasetType = () =>
  useQueryState('datasetType', parseAsJson<'all' | 'monitors' | 'geostories'>().withDefault('all'));

export const useSyncBasemapLabelsSettings = () =>
  useQueryState(
    'basemap-labels',
    parseAsJson<'dark' | 'light' | 'no-label'>().withDefault('light')
  );

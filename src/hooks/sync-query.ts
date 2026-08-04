import { useQueryState } from 'next-usequerystate';
import { parseAsJson, parseAsBoolean } from 'next-usequerystate/server';
import { Extent } from 'ol/extent';

import type { CategoryId } from '@/constants/categories';

import type { BasemapProps, LabelProps } from '@/components/map/controls/basemaps/constants';

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

// The ids come from the basemap list itself: repeating the union here let it
// drift, so a basemap added to the list was unreachable from the URL.
// Defaults to the open Sentinel-2 imagery rather than the unlicensed Esri one.
export const useSyncBasemapSettings = () =>
  useQueryState('basemap', parseAsJson<BasemapProps['id']>().withDefault('s2cloudless'));

// API category comes as "theme" from the backend but we use "category" in the URL for clarity
export type CategoryQueryParam = CategoryId[] | 'All';
export const useSyncCategories = () =>
  useQueryState<CategoryQueryParam>('categories', parseAsJson<CategoryQueryParam>());

//  Filter view in monitors, geostories or everything
export const useSyncDatasetType = () =>
  useQueryState('datasetType', parseAsJson<'all' | 'monitors' | 'geostories'>().withDefault('all'));

// `dark` is the light-text-on-dark-halo variant, which is what reads over the
// default satellite imagery. Switching to the gray basemap wants `light`.
export const useSyncBasemapLabelsSettings = () =>
  useQueryState('basemap-labels', parseAsJson<LabelProps['id']>().withDefault('dark'));

// On by default: imagery carries no borders of its own, so without this the
// default map has nothing separating one country from the next.
export const useSyncBoundariesSettings = () =>
  useQueryState('boundaries', parseAsBoolean.withDefault(true));

export const useSyncSearchGeostoriesGlobe = () =>
  useQueryState('search', parseAsJson<string>().withDefault(''));

export const useSyncMediaFilter = () =>
  useQueryState('mediaFilter', parseAsJson<string[]>().withDefault(['social-media']));

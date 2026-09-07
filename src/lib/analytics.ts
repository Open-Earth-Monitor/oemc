import { usePlausible } from 'next-plausible';

import { ALL_CATEGORY, type CategoryId } from '@/constants/categories';

import type { BasemapProps, LabelProps } from '@/components/map/controls/basemaps/constants';

/** Mirrors the shape stored by `useSyncDatasetType`. */
export type DatasetType = 'all' | 'monitors' | 'geostories';

/**
 * Where in the UI the interaction happened. Kept as a closed union so the same
 * surface is always reported under the same name and the Plausible breakdown
 * stays comparable over time.
 */
export type EventSource =
  | 'landing-globe'
  | 'landing-globe-dialog'
  | 'landing-globe-mobile'
  | 'geostories-page'
  | 'monitors-page'
  | 'monitor-geostories'
  | 'explore-sidebar'
  | 'explore-mobile'
  | 'map-controls'
  | 'map-tooltip'
  | 'geostory-map-tooltip';

/**
 * Every custom event the app sends, with the custom properties it carries.
 * Passing this to `usePlausible` makes both event names and props type-checked
 * at the call site.
 */
export type AnalyticsEvents = {
  'Geostory Open': {
    geostory_id: string;
    title: string;
    source: EventSource;
  };
  'Monitor Open': {
    monitor_id: string;
    title: string;
    source: EventSource;
  };
  'Layer Activate': {
    layer_id: string;
    title: string;
    parent_type: 'monitor' | 'geostory';
  };
  /**
   * A category was selected. Clearing a category is not reported, so the
   * breakdown reads as interest per category rather than raw toggle volume.
   */
  'Category Filter': {
    category: CategoryId | typeof ALL_CATEGORY.id;
    source: EventSource;
  };
  /** The monitors / geostories / all switch changed. */
  'Dataset Type Filter': {
    dataset_type: DatasetType;
    source: EventSource;
  };
  /**
   * A histogram was opened from a map tooltip. `histogram_type` distinguishes
   * the two buttons, which are mutually exclusive: the point one shows while
   * the regions layer is off, the region one while it is on.
   */
  'Histogram Open': {
    histogram_type: 'point' | 'region';
    layer_id: string;
    source: EventSource;
  };
  /**
   * The regions (NUTS) overlay was switched on. Switching it off is not
   * reported, matching the layer events.
   */
  'Regions Layer Activate': {
    source: EventSource;
  };
  /** The country boundaries overlay was switched on. Never fires on switch-off. */
  'Boundaries Layer Activate': {
    source: EventSource;
  };
  /** The basemap was changed. Only fires on an actual change. */
  'Basemap Change': {
    basemap: BasemapProps['id'];
    source: EventSource;
  };
  /** The map label overlay was changed. Only fires on an actual change. */
  'Map Labels Change': {
    labels: LabelProps['id'];
    source: EventSource;
  };
  /**
   * A recent publication card was opened. `publication_source` separates the two
   * feeds so the breakdown shows which library people actually follow through on.
   */
  'Publication Open': {
    publication_source: 'zenodo' | 'zotero';
    title: string;
    source: EventSource;
  };
  /** A live feed card was followed through to the post on Mastodon. */
  'Post Open': {
    post_id: string;
    url: string;
    source: EventSource;
  };
};

/**
 * Typed Plausible event sender.
 *
 * Only usable from client components. Calls made before the Plausible script
 * finishes loading are queued by the init snippet that `PlausibleProvider`
 * injects, so no event is lost on a fast click.
 */
export const useTrackEvent = () => usePlausible<AnalyticsEvents>();

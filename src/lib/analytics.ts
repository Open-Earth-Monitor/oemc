import { usePlausible } from 'next-plausible';

/**
 * Where in the UI the interaction happened. Kept as a closed union so the same
 * surface is always reported under the same name and the Plausible breakdown
 * stays comparable over time.
 */
export type EventSource =
  | 'landing-globe'
  | 'landing-globe-dialog'
  | 'geostories-page'
  | 'monitors-page'
  | 'monitor-geostories'
  | 'explore-sidebar';

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
};

/**
 * Typed Plausible event sender.
 *
 * Only usable from client components. Calls made before the Plausible script
 * finishes loading are queued by the init snippet that `PlausibleProvider`
 * injects, so no event is lost on a fast click.
 */
export const useTrackEvent = () => usePlausible<AnalyticsEvents>();

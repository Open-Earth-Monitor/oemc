import { fromLonLat } from 'ol/proj';
import { RView } from 'rlayers/RMap';

import type { Extent } from 'ol/extent';

export type InitialViewport = {
  bbox: Extent;
  center: RView['center'];
  zoom: RView['zoom'];
};

/**
 * EUROPE viewport
 */
export const DEFAULT_VIEWPORT: InitialViewport = {
  bbox: [-12.5, 35.4729, 32.5, 58.0858],
  center: fromLonLat([10, 48]),
  zoom: 5,
};

export const DEFAULT_BBOX: Extent = [-173.488154, -60.809359, 164.011846, 67.836775];

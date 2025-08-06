import type { Extent } from 'ol/extent';
import { fromLonLat } from 'ol/proj';
import { RView } from 'rlayers/RMap';

export type InitialViewport = {
  bbox: Extent;
  center: RView['center'];
  zoom: RView['zoom'];
};

/**
 * EUROPE viewport
 */
export const DEFAULT_VIEWPORT: InitialViewport = {
  bbox: [-1391493.6349, 4228333.5219, 3617883.4508, 7985363.0743],
  center: fromLonLat([10, 48]),
  zoom: 5,
};

export const DEFAULT_BBOX: Extent = [-173.488154, -60.809359, 164.011846, 67.836775];

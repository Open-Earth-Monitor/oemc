import { fromLonLat } from 'ol/proj';
import { RView } from 'rlayers/RMap';

import type { Bbox } from '@/components/map/types';

/**
 * EUROPE viewport
 */
export const DEFAULT_VIEWPORT: RView = {
  center: fromLonLat([10, 48]),
  zoom: 5,
};

export const DEFAULT_BBOX: Bbox = [-173.488154, -60.809359, 164.011846, 67.836775];

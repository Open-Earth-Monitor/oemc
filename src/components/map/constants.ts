import type { Extent } from 'ol/extent';
import { fromLonLat } from 'ol/proj';
import { RView } from 'rlayers/RMap';

import type { MonitorTooltipInfo } from '@/components/map/types';

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

export const NUTS_INITIAL_STATE = {
  NUTS_ID: null,
  LAYER_ID: null,
};
export const WMS_INFO_FORMAT = 'application/json';
export const WMS_CRS = 'EPSG:3857';

export const TOOLTIP_INITIAL_STATE: MonitorTooltipInfo = {
  position: null,
  coordinate: null,
  leftData: {
    id: null,
    date: null,
    title: null,
    value: null,
    range: [],
    rangeLabels: [],
    isComparable: false,
  },
  rightData: {
    id: null,
    date: null,
    title: null,
    value: null,
  },
};

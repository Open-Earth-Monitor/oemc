import { Bbox } from 'ol/extent';
import type { RMapProps } from 'rlayers/RMap';
import type { RView } from 'rlayers/RMap';

import type { GeostoryParsed } from '@/types/geostories';
import type { LayerDateRange, LayerParsed } from '@/types/layers';

import { InitialViewport } from './constants';

export interface CustomMapProps extends Omit<RMapProps, 'initial'> {
  /** A function that returns the map instance */
  children?: (map: RMapProps) => unknown;

  /** Custom css class for styling */
  className?: string;

  /** An object that defines center, zoom level and optional resolution in meters per pixel of the map*/
  /** Zoom level, 0 is the whole world, 28 is maximum resolution */
  /** When resolution is set, it takes precedence over the zoom level  */

  viewState?: { bbox: Bbox };
  initialViewState?: InitialViewport;
  initial?: { bbox: Bbox };

  /** An string that defines the rotation axis */
  constrainedAxis?: 'x' | 'y';

  /** A function that exposes the viewport */
  onMapViewStateChange?: (viewstate: { bbox: Bbox }) => void;

  isGeostory?: boolean;
}

export type GeostoryTooltipInfo = {
  position: [number, number] | null;
  coordinate: Coordinate;
  leftData: {
    id: string;
    title: string;
    date: string;
    value: string | number;
    unit?: string;
    range?: LayerDateRange[];
    rangeLabels?: string[];
  };
  rightData: {
    id: string;
    title: string;
    date: string;
    value: string | number;
    unit?: string;
    range?: LayerDateRange[];
    rangeLabels?: string[];
  };
};

export type MonitorTooltipInfo = {
  position: [number, number] | null;
  coordinate: Coordinate;
  leftData: {
    id: string;
    title: string;
    date: string;
    unit?: string;
    value: string | number | null;
    range: LayerDateRange[];
    rangeLabels: string[];
    isComparable?: boolean;
  };
  rightData: {
    id: string;
    title: string;
    date: string;
    value: string | number;
    unit?: string;
  };
};

interface FeatureProperties {
  [key: string]: number | string;
  NUTS_NAME: string;
  NAME_LATN: string;
  CNTR_CODE: string;
}

interface Feature {
  properties: FeatureProperties;
}

export interface FeatureInfoResponse {
  features: Feature[];
}

export type GeostoryMapProps = CustomMapProps & {
  geostoryData: GeostoryParsed;
  layerData: LayerParsed;
  compareLayerData: LayerParsed;
};

export type NutsProperties = {
  CNTR_CODE: string;
  NAME_LATN: string;
  NUTS_NAME: string;
};

export type NutsDataset = {
  avg: number;
  label: string;
  max: number;
  min: number;
};

export type NuqsData = {
  dataset: NutsDataset[];
};

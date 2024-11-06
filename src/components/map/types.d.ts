import type { RMapProps } from 'rlayers/RMap';
import type { RView } from 'rlayers/RMap';

import type { GeostoryParsed } from '@/types/geostories';
import type { LayerDateRange, LayerParsed } from '@/types/layers';

export type Bbox = [number, number, number, number];

export interface CustomMapProps extends Omit<RMapProps, 'initial'> {
  /** A function that returns the map instance */
  children?: (map: RMapProps) => unknown;

  /** Custom css class for styling */
  className?: string;

  /** An object that defines center, zoom level and optional resolution in meters per pixel of the map*/
  /** Zoom level, 0 is the whole world, 28 is maximum resolution */
  /** When resolution is set, it takes precedence over the zoom level  */

  viewState?: Partial<RView>;
  initialViewState?: Partial<RView>;
  initial?: Partial<RView>;

  /** An string that defines the rotation axis */
  constrainedAxis?: 'x' | 'y';

  /** A function that exposes the viewport */
  onMapViewStateChange?: (viewstate: Partial<RView>) => void;

  isGeostory?: boolean;
}

export type ExplicitViewState = Pick<RView, 'center' | 'zoom'>;

export type GeostoryTooltipInfo = {
  position: [number, number] | null;
  coordinate: Coordinate;
  leftData: {
    id: string;
    title: string;
    date: string;
    value: number;
    unit?: string;
  };
  rightData: {
    id: string;
    title: string;
    date: string;
    value: number;
    unit?: string;
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
    value: number | null;
    range: LayerDateRange[];
    rangeLabels: string[];
    isComparable?: boolean;
  };
  rightData: {
    id: string;
    title: string;
    date: string;
    value: number;
    unit?: string;
  };
};

interface FeatureProperties {
  [key: string]: number | string;
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

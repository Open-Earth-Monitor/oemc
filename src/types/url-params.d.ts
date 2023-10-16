import type { Coordinate } from 'ol/coordinate';

export type LayerSearchParams = {
  id: string;
  opacity: number;
  date?: number | string;
};

export type MapSearchParams = {
  center: Coordinate;
  zoom: number;
  layers?: LayerSearchParams[];
};

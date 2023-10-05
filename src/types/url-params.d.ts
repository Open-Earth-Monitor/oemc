export type LayerSearchParams = {
  id: string;
  opacity: number;
  date?: number | string;
};

export type MapSearchParams = {
  latitude: number;
  longitude: number;
  zoom: number;
  layers?: LayerSearchParams[];
};

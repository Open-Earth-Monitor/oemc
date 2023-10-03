export type LayersSearchParam = {
  id: string;
  opacity: number;
  date?: number | string;
};

export type SearchParamsTypes = {
  latitude: number;
  longitude: number;
  zoom: number;
  layers?: LayersSearchParam[];
};

export default SearchParamsTypes;

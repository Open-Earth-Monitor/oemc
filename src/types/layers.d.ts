export type LayerDateRange = { value: string; label: string };

export type LegendStyle = { color: string; label: string };

export type Layer = {
  gs_base_wms: string;
  gs_name: string;
  gs_dimension: string;
  gs_style: string;
  range: string[] | null;
  author: string | null;
  coverage: string;
  description: string;
  download_url: string;
  filename: string;
  geo_story: string;
  layer_id: string;
  license: string;
  location_query_url: string;
  metadata_url: string;
  monitor: string;
  polygon_query_url: string;
  range_labels: string[] | null;
  regex: string;
  srv_path: string;
  theme: string;
  title: string;
  unit: string;
  use_case: string;
};

export type LayerParsed = Omit<Layer, 'gs_style' | 'range'> & {
  gs_style: LegendStyle[] | null;
  range: LayerDateRange[] | null;
};

// TO-DO: remove this type
export type UseParamsOptions = Readonly<{
  layer_id: string;
}>;

export type LayerDateRange = { value: string; label: string };

export type LegendStyle = { color: string; label: string };

export type Layer = {
  gs_base_wms: string;
  gs_name: string;
  gs_dimension: string;
  gs_style: LegendStyle[];
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
  monitor_id: string;
  polygon_query_url: string;
  range_labels: string[] | null;
  regex: string;
  srv_path: string;
  theme: string;
  title: string;
  unit: string;
  use_case: string;
  position: 'left' | 'right';
  value_society: string;
  data_meaning: string;
  usage_examples: string;
};

export type LayerParsed = Omit<Layer, 'range'> & {
  range: LayerDateRange[] | null;
};

// TO-DO: remove this type
export type UseParamsOptions = Readonly<{
  layer_id: string;
}>;

type LegendEntry = {
  label: string;
  color: string;
  opacity?: string;
  quantity?: string;
};

type Colormap = {
  type: 'ramp' | 'intervals' | string;
  entries: LegendEntry[];
};

export type ParsedLegend = {
  entries: LegendEntry[];
  type: Colormap['type'];
};

export type LegendGraphicResponse = {
  Legend: Array<{
    rules: Array<{
      symbolizers: Array<{
        Raster: {
          colormap: Colormap;
        };
      }>;
    }>;
  }>;
};

export type UseLegendGraphicOptions = {
  gs_base_wms?: string;
  gs_name?: string;
};

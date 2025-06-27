export interface LegendProps {
  entries: LegendEntry[];
  type: Colormap['type'];
}

export type LegendTypeItem = {
  value: string;
  color: string;
};

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

export type LegendItem = {
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

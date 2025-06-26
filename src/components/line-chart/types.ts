export interface DataPoint {
  x: string | number;
  y: number;
  unit?: string;
}

export interface TooltipData extends DataPoint {
  region?: string;
  compare?: Omit<TooltipData, 'compare'> & { tooltipTop: number };
}

export interface LineChartProps {
  data: {
    title?: string;
    data: DataPoint[];
  };
  dataCompare?: {
    title?: string;
    data: DataPoint[];
  };
}

export interface LegendProps {
  className?: string;
  onChangeOrder?: (id: string[]) => void;
}

export type LegendTypeItem = {
  value: string;
  color: string;
};

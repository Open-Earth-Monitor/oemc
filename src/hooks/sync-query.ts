import { useQueryState } from 'next-usequerystate';
import { parseAsJson } from 'next-usequerystate/parsers';

type LayerSettings = {
  id: string;
  opacity: number;
  date?: string;
};

export const useSyncLayersSettings = () => useQueryState('layers', parseAsJson<LayerSettings[]>());
export const useSyncCompareLayersSettings = () =>
  useQueryState('compareLayers', parseAsJson<LayerSettings[]>());

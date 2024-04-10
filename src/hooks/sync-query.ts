import { useQueryState } from 'next-usequerystate';
import { parseAsJson } from 'next-usequerystate/parsers';
import { Coordinate } from 'ol/coordinate';

type LayerSettings = {
  id: string;
  opacity: number;
  date?: string;
};

export const useSyncLayersSettings = () => useQueryState('layers', parseAsJson<LayerSettings[]>());
export const useSyncCompareLayersSettings = () =>
  useQueryState('compareLayers', parseAsJson<LayerSettings[]>());
export const useSyncCenterSettings = () => useQueryState('center', parseAsJson<Coordinate>());
export const useSyncZoomSettings = () => useQueryState('zoom');

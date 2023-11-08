import { useQueryState } from 'next-usequerystate';
import { c } from 'next-usequerystate/dist/parsers-fd455cd5';
import { parseAsJson, parseAsInteger, parseAsString } from 'next-usequerystate/parsers';
import { Coordinate } from 'ol/coordinate';

type LayerSettings = {
  id: string;
  opacity: number;
  date?: string;
};

export const useSyncLayersSettings = () => useQueryState('layers', parseAsJson<LayerSettings[]>());
export const useSyncCompareLayersSettings = () =>
  useQueryState('compareLayers', parseAsJson<LayerSettings[]>());
export const useSyncViewportSettings = () => useQueryState('viewport');
export const useSyncCenterSettings = () => useQueryState('center', parseAsJson<Coordinate>());
export const useSyncZoomSettings = () => useQueryState('zoom');

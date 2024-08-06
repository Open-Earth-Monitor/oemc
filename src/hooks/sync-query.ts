import { useQueryState } from 'next-usequerystate';
import { parseAsJson, parseAsInteger, parseAsBoolean } from 'next-usequerystate/parsers';
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

// swipe control position, this should not be on the URL but currently we have no global state,
// if the app grows and evolves in a way to consider the use of a global state, move this there
export const useSwipeControlPosition = () => useQueryState('sp', parseAsInteger.withDefault(0.5));

export const useSyncSidebarState = () =>
  useQueryState('sidebar-open', parseAsBoolean.withDefault(true));

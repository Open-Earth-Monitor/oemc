import { useEffect } from 'react';

import type { Control } from 'ol/control';
import Swipe from 'ol-ext/control/Swipe';
import { useOL } from 'rlayers';

import 'ol-ext/dist/ol-ext.css';
import { useSyncLayersSettings, useSyncCompareLayersSettings } from '@/hooks/sync-query';

let swipeControl: Control | null = null; // control instance

const SwipeControl = () => {
  const { map } = useOL();

  const [layersUrl] = useSyncLayersSettings();
  const [layersUrlCompare] = useSyncCompareLayersSettings();

  useEffect(() => {
    const layers = map.getAllLayers();
    // const layersKeys = map.getKeys();

    if (layers.length && layers[1] && layers[2] && !swipeControl) {
      console.log('SwipeControl', layers[1], layers[2]);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      swipeControl = new Swipe({ layers: [layers[1]], rightLayers: [layers[2]] }) as Control;
      map.addControl(swipeControl);
    }
    return () => {
      if (swipeControl) {
        map.removeControl(swipeControl);
        swipeControl = null;
      }
    };
  }, [map, layersUrl, layersUrlCompare]);

  return null;
};

export default SwipeControl;

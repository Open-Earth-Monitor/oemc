import { useEffect, useState } from 'react';

import type { Control } from 'ol/control';
import type BaseEvent from 'ol/events/Event';
import Swipe from 'ol-ext/control/Swipe';
import { useOL } from 'rlayers';

import 'ol-ext/dist/ol-ext.css';
import { useSyncLayersSettings, useSyncCompareLayersSettings } from '@/hooks/sync-query';

let swipeControl: Control | null = null; // control instance

const SwipeControl = () => {
  const [position, setPosition] = useState<number>(0.5);
  const { map } = useOL();

  const [layersUrl] = useSyncLayersSettings();
  const [layersUrlCompare] = useSyncCompareLayersSettings();

  useEffect(() => {
    const layers = map.getAllLayers();

    if (layers.length && layers[1] && layers[2] && !swipeControl) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      swipeControl = new Swipe({
        layers: [layers[1]],
        rightLayers: [layers[2]],
        position,
      }) as Control;
      map.addControl(swipeControl);
      swipeControl.addEventListener('moving', (e: BaseEvent & { position: number[] }) => {
        setPosition(e.position[0]);
      });
    }
    return () => {
      if (swipeControl) {
        map.removeControl(swipeControl);
        swipeControl = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, layersUrl, layersUrlCompare]);

  return null;
};

export default SwipeControl;

import { useCallback, useEffect, useState } from 'react';

import type BaseEvent from 'ol/events/Event';
import Swipe from 'ol-ext/control/Swipe';
import { useOL } from 'rlayers';

import 'ol-ext/dist/ol-ext.css';
import { useSyncLayersSettings, useSyncCompareLayersSettings } from '@/hooks/sync-query';

const swipeControl = new Swipe();

const SwipeControl = () => {
  const [position, setPosition] = useState<number>(0.5);
  const { map } = useOL();
  const [layersUrl] = useSyncLayersSettings();
  const [layersUrlCompare] = useSyncCompareLayersSettings();
  const handleMoving = useCallback((e: BaseEvent & { position: number[] }) => {
    setPosition(e.position[0]);
  }, []);

  useEffect(() => {
    const layers = map.getAllLayers();
    if (layers.length && layers[1] && layers[2]) {
      swipeControl.setProperties({ position });
      swipeControl.addLayer([layers[2]], true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layersUrl, layersUrlCompare]);

  useEffect(() => {
    map.addControl(swipeControl);
    swipeControl.addEventListener('moving', handleMoving);

    return () => {
      map.removeControl(swipeControl);
      swipeControl.removeEventListener('moving', handleMoving);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default SwipeControl;

'use client';
import { useCallback, useEffect } from 'react';

import type BaseEvent from 'ol/events/Event';
import Swipe from 'ol-ext/control/Swipe';
import { RLayerWMS, useOL } from 'rlayers';

import 'ol-ext/dist/ol-ext.css';
import {
  useSyncLayersSettings,
  useSyncCompareLayersSettings,
  useSwipeControlPosition,
} from '@/hooks/sync-query';

const swipeControl = new Swipe();

const SwipeControl: React.FC<{
  layerLeft: React.RefObject<RLayerWMS>;
  layerRight: React.RefObject<RLayerWMS>;
}> = ({ layerLeft, layerRight }) => {
  const [position, setPosition] = useSwipeControlPosition();

  const { map } = useOL();
  const [layersUrl] = useSyncLayersSettings();
  const [layersUrlCompare] = useSyncCompareLayersSettings();
  const handleMoving = useCallback(
    (e: BaseEvent & { position: number[] }) => {
      void setPosition(e.position[0]);
    },
    [setPosition]
  );

  useEffect(() => {
    if (layerLeft && layerRight) {
      swipeControl.setProperties({ position });
      swipeControl.addLayer([layerLeft?.current?.ol], false);
      swipeControl.addLayer([layerRight?.current?.ol], true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layersUrl, layersUrlCompare]);

  useEffect(() => {
    map?.addControl(swipeControl);
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

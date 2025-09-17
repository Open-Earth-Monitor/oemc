'use client';

import { useCallback, useEffect, useRef } from 'react';

import type BaseEvent from 'ol/events/Event';
import Swipe from 'ol-ext/control/Swipe';
import { RLayerWMS, useOL } from 'rlayers';
import 'ol-ext/dist/ol-ext.css';

import {
  useSyncLayersSettings,
  useSyncCompareLayersSettings,
  useSyncSwipeControlPosition,
} from '@/hooks/sync-query';

const SwipeControl: React.FC<{
  layerLeft: React.RefObject<RLayerWMS>;
  layerRight: React.RefObject<RLayerWMS>;
}> = ({ layerLeft, layerRight }) => {
  const { map } = useOL();

  const [position, setPosition] = useSyncSwipeControlPosition();
  const [layersUrl] = useSyncLayersSettings();
  const [layersUrlCompare] = useSyncCompareLayersSettings();

  const swipeRef = useRef<Swipe | null>(null);

  // The "moving" event provides a numeric position (0..1)
  const handleMoving = useCallback(
    (e: BaseEvent & { position: number }) => {
      const x = e.position[0]; // horizontal fraction (0..1)
      const side = x >= 0.5 ? 'right' : 'left'; // 1 = right half, 0 = left half
      setPosition({ side, x });
    },
    [setPosition]
  );

  useEffect(() => {
    if (!swipeRef.current) {
      swipeRef.current = new Swipe({ position: position.x }); // initial position
    }
    return () => {
      swipeRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!map || !swipeRef.current) return;

    const swipe = swipeRef.current;
    map.addControl(swipe);

    (swipe as any).on('moving', handleMoving);

    return () => {
      (swipe as any).un('moving', handleMoving);
      try {
        map.removeControl(swipe);
      } catch {}
    };
  }, [map, handleMoving]);

  // Sync the left/right layers whenever their refs or URLs change
  useEffect(() => {
    const swipe = swipeRef.current;
    const left = layerLeft?.current?.ol;
    const right = layerRight?.current?.ol;
    if (!swipe || !left || !right) return;

    // Optionally clear previous layers before adding new ones
    // swipe.set('left', []); swipe.set('right', []);

    // Add layers to each side of the swipe
    swipe.addLayer([left], false); // false => left side
    swipe.addLayer([right], true); // true  => right side
  }, [layerLeft, layerRight, layersUrl, layersUrlCompare]);

  // Update the swipe position whenever external state changes
  useEffect(() => {
    const swipe = swipeRef.current;
    if (!swipe) return;
    swipe.setProperties({ position: [position.x, 0] });
  }, [position]);

  return null;
};

export default SwipeControl;

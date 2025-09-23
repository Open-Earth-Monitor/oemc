import { useCallback, useEffect } from 'react';

import type BaseEvent from 'ol/events/Event';
import Swipe from 'ol-ext/control/Swipe';
import { RLayerWMS, useOL } from 'rlayers';

import 'ol-ext/dist/ol-ext.css';
import { useSyncSwipeControlPosition } from '@/hooks/sync-query';

const swipeControl = new Swipe();

const SwipeControl: React.FC<{
  layerLeft: React.RefObject<RLayerWMS>;
  layerRight: React.RefObject<RLayerWMS>;
}> = ({ layerLeft, layerRight }) => {
  const [position, setPosition] = useSyncSwipeControlPosition();

  const { map } = useOL();

  const handleMoving = useCallback(
    (e: BaseEvent & { position: number[] }) => {
      const side = e.position[0] > 0.5 ? 'right' : 'left';
      void setPosition({ side, x: e.position[0] });
    },
    [setPosition]
  );

  useEffect(() => {
    if (layerLeft && layerRight) {
      const numericPos = position.side === 'left' ? position.x : 1 - position.x;
      swipeControl.setProperties({ position: numericPos });

      // swipeControl.setProperties({ position: numericPos });
      // Boolean indicates if the layer is on the right side
      swipeControl.addLayer([layerLeft?.current?.ol], false);
      swipeControl.addLayer([layerRight?.current?.ol], true);
    } else {
      swipeControl.removeLayer([layerLeft?.current?.ol]);
      swipeControl.removeLayer([layerRight?.current?.ol]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layerLeft, layerRight]);

  useEffect(() => {
    map?.addControl(swipeControl);
    swipeControl.addEventListener('moving', handleMoving);

    return () => {
      map.removeControl(swipeControl);
      swipeControl.removeEventListener('moving', handleMoving);
    };
  }, [handleMoving, map]);

  return null;
};

export default SwipeControl;

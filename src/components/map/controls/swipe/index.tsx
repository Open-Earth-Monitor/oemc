import { useCallback, useEffect, useRef } from 'react';

import type BaseEvent from 'ol/events/Event';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import Swipe from 'ol-ext/control/Swipe';
import { useOL } from 'rlayers';

import 'ol-ext/dist/ol-ext.css';
import { useSyncSidebarState, useSyncSwipeControlPosition } from '@/hooks/sync-query';

const SwipeControl: React.FC<{
  olLayerLeft?: TileLayer<TileWMS> | null;
  olLayerRight?: TileLayer<TileWMS> | null;
}> = ({ olLayerLeft, olLayerRight }) => {
  const [position, setPosition] = useSyncSwipeControlPosition();
  const [sidebarOpen] = useSyncSidebarState();
  const { map } = useOL();
  const swipeRef = useRef<Swipe | null>(null);
  const sidebarOpenRef = useRef(sidebarOpen);
  sidebarOpenRef.current = sidebarOpen;

  const handleMoving = useCallback(
    (e: BaseEvent & { position: number[] }) => {
      const side = e.position[0] > 0.5 ? 'right' : 'left';
      void setPosition({ side, x: e.position[0] });
    },
    [setPosition]
  );

  // Create swipe control once, persist across layer changes
  useEffect(() => {
    if (!map) return;

    const swipe = new Swipe();
    swipeRef.current = swipe;

    // Center swipe on visible map area (sidebar overlaps left side)
    const mapWidth = map.getTargetElement()?.clientWidth || window.innerWidth;
    const sidebarPx = sidebarOpenRef.current ? 536 : 48; // 28rem + 88px or 3rem
    const visibleCenter = Math.min(0.9, Math.max(0.1, sidebarPx / (2 * mapWidth) + 0.5));
    swipe.setProperties({ position: visibleCenter });
    void setPosition({ side: 'left', x: visibleCenter });

    map.addControl(swipe);
    swipe.addEventListener('moving', handleMoving);

    return () => {
      swipe.removeEventListener('moving', handleMoving);
      (swipe as any).removeLayers();
      map.removeControl(swipe);
      swipeRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, handleMoving]);

  // Update layers when they change — swipe control stays
  useEffect(() => {
    const swipe = swipeRef.current;
    if (!swipe) return;

    (swipe as any).removeLayers();

    if (olLayerLeft && olLayerRight) {
      swipe.addLayer(olLayerLeft, false);
      swipe.addLayer(olLayerRight, true);
    }
  }, [olLayerLeft, olLayerRight]);

  return null;
};

export default SwipeControl;

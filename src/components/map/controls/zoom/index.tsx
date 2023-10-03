import { FC, useCallback, MouseEvent } from 'react';

import { useMap } from 'react-map-gl';

import { LuPlus, LuMinus } from 'react-icons/lu';

import { cn } from '@/lib/classnames';

import { CONTROL_BUTTON_STYLES, CONTROL_ICON_STYLES } from '@/components/map/controls/constants';

import type { ZoomControlProps } from './types';

export const ZoomControl: FC<ZoomControlProps> = ({
  mapId = 'current',
  className,
}: ZoomControlProps) => {
  const { [mapId]: mapRef } = useMap();
  const zoom = mapRef?.getZoom();
  const minZoom = mapRef?.getMinZoom();
  const maxZoom = mapRef?.getMaxZoom();

  const increaseZoom = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!mapRef) return null;

      mapRef.zoomIn();
    },
    [mapRef]
  );

  const decreaseZoom = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!mapRef) return null;

      mapRef.zoomOut();
    },
    [mapRef]
  );

  return (
    <div
      className={cn({
        'inline-flex flex-col rounded-sm': true,
        [className]: !!className,
      })}
    >
      <button
        className={cn(CONTROL_BUTTON_STYLES.default, 'rounded-b-none')}
        aria-label="Zoom in"
        type="button"
        disabled={zoom >= maxZoom}
        onClick={increaseZoom}
      >
        <LuPlus className={CONTROL_ICON_STYLES.default} />
      </button>
      <button
        className={cn(CONTROL_BUTTON_STYLES.default, 'rounded-t-none')}
        aria-label="Zoom out"
        type="button"
        disabled={zoom <= minZoom}
        onClick={decreaseZoom}
      >
        <LuMinus className={CONTROL_ICON_STYLES.default} />
      </button>
    </div>
  );
};

export default ZoomControl;

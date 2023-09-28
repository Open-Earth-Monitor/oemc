import { FC, useCallback, MouseEvent } from 'react';

import { useMap } from 'react-map-gl';

import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineMinus } from 'react-icons/ai';

import { cn } from '@/lib/classnames';

import { CONTROL_BUTTON_STYLES } from '@/components/map/controls/constants';

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
        className={cn({
          'cursor-pointer rounded-t-sm bg-brand-400 p-1 active:bg-white active:text-brand-500 disabled:cursor-default disabled:opacity-50':
            true,
          'hover:bg-brand-200 active:bg-gray-600': zoom < maxZoom,
        })}
        aria-label="Zoom in"
        type="button"
        disabled={zoom >= maxZoom}
        onClick={increaseZoom}
      >
        <AiOutlinePlus className={CONTROL_BUTTON_STYLES.default} />
      </button>
      <button
        className={cn({
          'rounded-b-sm bg-brand-400 p-1 active:bg-white  active:text-brand-500 disabled:cursor-default disabled:opacity-50':
            true,
          'hover:bg-brand-200 active:bg-gray-600': zoom > minZoom,
        })}
        aria-label="Zoom out"
        type="button"
        disabled={zoom <= minZoom}
        onClick={decreaseZoom}
      >
        <AiOutlineMinus className={CONTROL_BUTTON_STYLES.default} />
      </button>
    </div>
  );
};

export default ZoomControl;

import { FC, useCallback, MouseEvent } from 'react';

import { useMap } from 'react-map-gl';

import { PlusIcon } from '@heroicons/react/20/solid';
import { MinusIcon } from '@heroicons/react/20/solid';
import cx from 'clsx';

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
      className={cx({
        'inline-flex flex-col rounded-sm bg-brand-500 p-1 text-secondary-500': true,
        [className]: !!className,
      })}
    >
      <button
        className={cx({
          ' disabled:cursor-default disabled:opacity-50': true,
          'hover:bg-gray-700 active:bg-gray-600': zoom < maxZoom,
        })}
        aria-label="Zoom in"
        type="button"
        disabled={zoom >= maxZoom}
        onClick={increaseZoom}
      >
        <PlusIcon className="text-secondary-500" />
      </button>
      <button
        className={cx({
          'disabled:cursor-default disabled:opacity-50': true,
          'hover:bg-gray-700 active:bg-gray-600': zoom > minZoom,
        })}
        aria-label="Zoom out"
        type="button"
        disabled={zoom <= minZoom}
        onClick={decreaseZoom}
      >
        <MinusIcon className="text-secondary-500" />
      </button>
    </div>
  );
};

export default ZoomControl;

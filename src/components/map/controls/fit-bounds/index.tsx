import { FC, useCallback, MouseEvent } from 'react';

import { useMap } from 'react-map-gl';

import cx from 'clsx';

import Icon from 'components/icon';
import FIT_BOUNDS_SVG from 'svgs/map/fit-bounds.svg?sprite';

import type { FitBoundsControlProps } from './types';

export const FitBoundsControl: FC<FitBoundsControlProps> = ({
  mapId = 'current',
  bounds,
  className,
}: FitBoundsControlProps) => {
  const { [mapId]: mapRef } = useMap();

  const handleFitBoundsChange = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      const { bbox, options } = bounds;
      if (!mapRef) return null;

      mapRef.fitBounds(
        [
          [bbox[0], bbox[1]],
          [bbox[2], bbox[3]],
        ],
        options
      );
    },
    [mapRef, bounds]
  );

  return (
    <button
      aria-label="Fit to bounds"
      className={cx({
        'rounded-sm bg-brand-500 p-1 text-secondary-500 disabled:cursor-default disabled:opacity-50':
          true,
        'hover:bg-gray-700 active:bg-gray-600': !!bounds,
        [className]: !!className,
      })}
      type="button"
      disabled={!bounds}
      onClick={handleFitBoundsChange}
    >
      <Icon icon={FIT_BOUNDS_SVG} />
    </button>
  );
};

export default FitBoundsControl;

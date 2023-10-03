import { FC, useCallback, MouseEvent } from 'react';

import { useMap } from 'react-map-gl';

import { HiOutlineMapPin } from 'react-icons/hi2';

import { CONTROL_BUTTON_STYLES, CONTROL_ICON_STYLES } from '@/components/map/controls/constants';

import type { FitBoundsControlProps } from './types';
export const FitBoundsControl: FC<FitBoundsControlProps> = ({
  mapId = 'current',
  bounds,
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
      className={CONTROL_BUTTON_STYLES.default}
      type="button"
      disabled={!bounds}
      onClick={handleFitBoundsChange}
    >
      <HiOutlineMapPin className={CONTROL_ICON_STYLES.default} />
    </button>
  );
};

export default FitBoundsControl;

import { useCallback, useEffect, useState } from 'react';

import { IoMdEyeOff } from 'react-icons/io';
import { IoMdEye } from 'react-icons/io';
import { useDebounce } from 'usehooks-ts';

import { cn } from '@/lib/classnames';

import { useURLayerParams, useURLParams } from '@/hooks/url-params';

export const LayerVisibility = () => {
  const { updateSearchParam } = useURLParams();
  const { layerId, layerOpacity, date } = useURLayerParams();

  const [isLayerVisible, setLayerVisibility] = useState<boolean>(layerOpacity > 0);
  const debouncedVisibility = useDebounce<boolean>(isLayerVisible, 250);

  const onToggleLayerVisibility = useCallback(() => {
    setLayerVisibility(!isLayerVisible);
  }, [isLayerVisible]);

  useEffect(() => {
    updateSearchParam({ layers: [{ id: layerId, opacity: isLayerVisible ? 1 : 0, date }] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedVisibility]);

  return (
    <button
      data-testid="layer-visibility"
      data-active={isLayerVisible}
      type="button"
      className="flex items-center justify-center"
      onClick={onToggleLayerVisibility}
      aria-label="Toggle layer visibility"
    >
      {isLayerVisible ? (
        <IoMdEye
          className={cn({
            'h-4 w-4 text-secondary-500': true,
            'text-secondary-700': !isLayerVisible,
          })}
        />
      ) : (
        <IoMdEyeOff
          className={cn({
            'h-4 w-4 text-secondary-500': true,
            'text-secondary-700': !isLayerVisible,
          })}
        />
      )}
    </button>
  );
};

export default LayerVisibility;

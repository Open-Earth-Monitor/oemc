import { useCallback, useMemo } from 'react';

import { IoMdEyeOff } from 'react-icons/io';
import { IoMdEye } from 'react-icons/io';

import { cn } from '@/lib/classnames';

import { useURLayerParams, useURLParams } from '@/hooks/url-params';

export const LayerVisibility = () => {
  const { updateSearchParam } = useURLParams();
  const { layerId, layerOpacity, date } = useURLayerParams();

  const isLayerVisible = useMemo(() => !!layerOpacity && layerOpacity > 0, [layerOpacity]);

  const onToggleLayerVisibility = useCallback(() => {
    updateSearchParam({
      layers: [{ id: layerId, opacity: isLayerVisible ? 0 : 1, date }],
    });
  }, [date, isLayerVisible, layerId, updateSearchParam]);

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
            'h-4 w-4': true,
            'text-gray-600': !isLayerVisible,
          })}
        />
      ) : (
        <IoMdEyeOff
          className={cn({
            'h-4 w-4': true,
            'text-gray-600': !isLayerVisible,
          })}
        />
      )}
    </button>
  );
};

export default LayerVisibility;

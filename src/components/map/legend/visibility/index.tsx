import { useCallback, useMemo } from 'react';

import { IoMdEyeOff } from 'react-icons/io';
import { IoMdEye } from 'react-icons/io';

import { cn } from '@/lib/classnames';

import { useSyncLayersSettings } from '@/hooks/sync-query';

import { IconTooltip } from '@/components/ui/tooltip';

export const LayerVisibility = () => {
  const [layers, setLayers] = useSyncLayersSettings();
  const layerOpacity = layers?.[0]?.opacity;

  const isLayerVisible = useMemo(() => !!layerOpacity && layerOpacity > 0, [layerOpacity]);

  const onToggleLayerVisibility = useCallback(() => {
    void setLayers((prevState) => [{ ...prevState?.[0], opacity: isLayerVisible ? 0 : 1 }]);
  }, [isLayerVisible, setLayers]);

  return (
    <IconTooltip label={isLayerVisible ? 'Hide layer' : 'Show layer'}>
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
              'h-5 w-5': true,
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
    </IconTooltip>
  );
};

export default LayerVisibility;

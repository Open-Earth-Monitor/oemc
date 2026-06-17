import { useCallback, useMemo } from 'react';

import { IoMdEyeOff } from 'react-icons/io';
import { IoMdEye } from 'react-icons/io';

import { useSyncLayersSettings } from '@/hooks/sync-query';

export const LayerVisibility = () => {
  const [layers, setLayers] = useSyncLayersSettings();
  const layerOpacity = layers?.[0]?.opacity;

  const isLayerVisible = useMemo(() => !!layerOpacity && layerOpacity > 0, [layerOpacity]);

  const onToggleLayerVisibility = useCallback(() => {
    void setLayers((prevState) => [{ ...prevState?.[0], opacity: isLayerVisible ? 0 : 1 }]);
  }, [isLayerVisible, setLayers]);

  return (
    <button
      data-testid="layer-visibility"
      data-active={isLayerVisible}
      type="button"
      className="flex items-center justify-center"
      onClick={onToggleLayerVisibility}
      aria-label="Toggle layer visibility"
      title={isLayerVisible ? 'Hide layer' : 'Show layer'}
    >
      {isLayerVisible ? (
        <IoMdEye className="h-5 w-5 text-gray-600 transition-colors hover:text-secondary-500" />
      ) : (
        <IoMdEyeOff className="h-5 w-5 text-gray-600 transition-colors hover:text-secondary-500" />
      )}
    </button>
  );
};

export default LayerVisibility;

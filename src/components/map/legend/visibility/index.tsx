import { useCallback, useEffect, useState } from 'react';

import { useRouter, usePathname } from 'next/navigation';

import { IoMdEyeOff } from 'react-icons/io';
import { IoMdEye } from 'react-icons/io';

import { cn } from '@/lib/classnames';

import { useURLayerParams } from '@/hooks';

export const LayerVisibility = () => {
  const [isLayerVisible, setLayerVisibility] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const { layerId, layerOpacity, layerYear } = useURLayerParams();

  const onToggleLayerVisibility = useCallback(() => {
    const encodedLayers = decodeURIComponent(
      JSON.stringify({
        id: layerId,
        opacity: isLayerVisible ? 0 : layerOpacity > 0 ? layerOpacity : 1,
        ...(layerYear && { layerYear }),
      })
    );
    const url = `${pathname}/?layers=[${encodedLayers}]`;
    return router.replace(url);
  }, [isLayerVisible, layerId, pathname, router, layerOpacity, layerYear]);

  useEffect(() => {
    setLayerVisibility(layerOpacity > 0);
  }, [layerOpacity]);

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
            'text-secondary-900': !isLayerVisible,
          })}
        />
      ) : (
        <IoMdEyeOff
          className={cn({
            'h-4 w-4 text-secondary-500': true,
            'text-secondary-900': !isLayerVisible,
          })}
        />
      )}
    </button>
  );
};

export default LayerVisibility;

import { useCallback, useState } from 'react';

import { useRouter, usePathname } from 'next/navigation';

import { cn } from '@/lib/classnames';

import { useURLayerParams } from '@/hooks';
import Icon from 'components/icon';
import HIDE_SVG from 'svgs/map/hide.svg?sprite';

export const LayerVisibility = () => {
  const [isLayerVisible, setLayerVisibility] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const { layerId, layerOpacity } = useURLayerParams();

  const onToggleLayerVisibility = useCallback(() => {
    const encodedLayers = decodeURIComponent(
      JSON.stringify({
        id: layerId,
        opacity: isLayerVisible ? 0 : layerOpacity > 0 ? layerOpacity : 1,
      })
    );
    setLayerVisibility(!isLayerVisible);
    const url = `${pathname}/?layers=[${encodedLayers}]`;
    return router.replace(url);
  }, [isLayerVisible, layerId, pathname, router, layerOpacity]);

  return (
    <button
      type="button"
      className="flex items-center justify-center"
      onClick={onToggleLayerVisibility}
      aria-label="Toggle layer visibility"
    >
      <Icon
        icon={HIDE_SVG}
        className={cn({
          'h-4 w-4 text-secondary-500': true,
          'text-secondary-900': !isLayerVisible,
        })}
      />
    </button>
  );
};

export default LayerVisibility;

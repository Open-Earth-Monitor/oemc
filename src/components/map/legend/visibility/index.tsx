import { useCallback, useState, useMemo } from 'react';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { cn } from '@/lib/classnames';

import type { LayerSettingTypes } from '@//types/layers';

import Icon from 'components/icon';
import HIDE_SVG from 'svgs/map/hide.svg?sprite';

export const LayerVisibility = () => {
  const [isLayerVisible, setLayerVisibility] = useState(true);
  const params = useSearchParams();
  const pathname = usePathname();
  const layerParams = params.get('layers');
  const router = useRouter();
  const layerParamsParsed = useMemo<null | LayerSettingTypes[]>(() => {
    if (layerParams === null) return null;
    else return JSON.parse(layerParams) as LayerSettingTypes[];
  }, [layerParams]);

  const layerId = useMemo<LayerSettingTypes['id']>(
    () => layerParamsParsed?.[0]?.id,
    [layerParamsParsed]
  );

  const layerOpacity = useMemo<LayerSettingTypes['opacity']>(
    () => layerParamsParsed?.[0]?.opacity,
    [layerParamsParsed]
  );

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

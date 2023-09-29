import { useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

import type { LayerSettingTypes } from '@/types/layers';
export function useURLayerParams() {
  const params = useSearchParams();
  const layerParams = params.get('layers');

  const layersParamsParsed = useMemo<null | LayerSettingTypes[]>(() => {
    if (layerParams === null) return null;
    else return JSON.parse(layerParams) as LayerSettingTypes[];
  }, [layerParams]);
  const layerId = useMemo<LayerSettingTypes['id']>(
    () => layersParamsParsed?.[0]?.id,
    [layersParamsParsed]
  );
  const layerOpacity = useMemo<LayerSettingTypes['opacity']>(
    () => layersParamsParsed?.[0]?.opacity,
    [layersParamsParsed]
  );

  const date = useMemo<LayerSettingTypes['date']>(
    () => layersParamsParsed?.[0]?.date,
    [layersParamsParsed]
  );

  return {
    layerId,
    layerOpacity,
    date,
  };
}

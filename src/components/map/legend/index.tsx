import { useCallback, useState, useId, useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

import type { LayerSettingTypes } from '@//types/layers';

import { useLayerSource } from '@/hooks/map';

import OpacitySetting from './opacity';
import RemoveLayer from './remove';
import LayerVisibility from './visibility';

export const Legend = () => {
  const [active, setActive] = useState(true);
  const params = useSearchParams();
  const layerParams = params.get('layers');
  const layerParamsParsed = useMemo<null | LayerSettingTypes[]>(() => {
    if (layerParams === null) return null;
    else return JSON.parse(layerParams) as LayerSettingTypes[];
  }, [layerParams]);

  const layerId = useMemo<LayerSettingTypes['id']>(
    () => layerParamsParsed?.[0]?.id,
    [layerParamsParsed]
  );

  const { data } = useLayerSource({ layer_id: layerId }, { enabled: !!layerId });
  const { title } = data;

  const id = useId();

  const onToggleActive = useCallback(() => {
    setActive(!active);
  }, [active]);

  return (
    <div className="inter absolute bottom-16 right-10 z-50 flex grow flex-col px-5 py-1 text-xs text-secondary-500">
      {layerId && (
        <div className="rounded-sm border border-secondary-500 bg-brand-500">
          <button
            type="button"
            aria-expanded={active}
            aria-controls={id}
            className="relative flex w-full items-center space-x-2 px-5 py-1.5 text-xs uppercase text-white"
            onClick={onToggleActive}
          >
            <span>Legend</span>
          </button>
        </div>
      )}
      {active && layerId && (
        <div className="relative flex justify-between space-x-4 rounded-sm bg-brand-500 px-5 py-2.5 text-xs text-secondary-500">
          {/* <div className="overflow-y-auto overflow-x-hidden">
            <SortableList onChangeOrder={onChangeOrder}>{children}</SortableList>
          </div> */}
          <p>{title}</p>
          <div className="flex space-x-2 divide-x divide-secondary-900">
            <div className="flex space-x-2">
              <OpacitySetting />
              <LayerVisibility />
            </div>
            <RemoveLayer className="pl-2" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Legend;

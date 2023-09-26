import { useCallback, useState, useId } from 'react';

import { cn } from '@/lib/classnames';

import { useLayerSource } from '@/hooks/map';

import { useURLayerParams } from '@/hooks';

import OpacitySetting from './opacity';
import RemoveLayer from './remove';
import LayerVisibility from './visibility';
export const Legend = () => {
  const [active, setActive] = useState(false);
  const { layerId } = useURLayerParams();
  const { data } = useLayerSource({ layer_id: layerId }, { enabled: !!layerId });
  const id = useId();

  const onToggleActive = useCallback(() => {
    setActive(!active);
  }, [active]);
  const { title } = data ?? {};
  return (
    <div
      className="font-inter absolute bottom-3 right-3 z-50 flex grow flex-col text-xs text-secondary-500"
      data-testid="map-legend"
    >
      {layerId && (
        <div
          className={cn({
            'rounded-sm border border-secondary-500 bg-brand-500 px-5 py-2': true,
            'border border-secondary-500': active,
          })}
        >
          <button
            type="button"
            aria-expanded={active}
            aria-controls={id}
            className="relative flex w-full items-center space-x-2 text-xs uppercase text-white hover:bg-brand-400"
            onClick={onToggleActive}
            data-testid="map-legend-toggle-button"
          >
            <span>Legend</span>
          </button>
        </div>
      )}
      {active && layerId && (
        <div
          className="relative flex items-center justify-between space-x-4 rounded-sm bg-brand-500 px-4 py-3 text-xs text-secondary-500"
          data-testid="map-legend-item"
        >
          <p data-testid="map-legend-item-title">{title}</p>
          <div
            className="flex space-x-2 divide-x divide-secondary-900"
            data-testid="map-legend-item-toolbar"
          >
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

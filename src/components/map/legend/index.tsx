import { cn } from '@/lib/classnames';

import { useLayerParsedSource } from '@/hooks/layers';
import { useURLayerParams } from '@/hooks/url-params';

import OpacitySetting from './opacity';
import RemoveLayer from './remove';
import LayerVisibility from './visibility';

const LEGEND_BUTTON_STYLES =
  'text-center text-xs uppercase rounded font-medium grow px-2 h-[34px] py-1 tracking-wide text-white hover:bg-secondary-500 hover:text-brand-500 disabled:opacity-50 disabled:cursor-not-allowed';

export const Legend = () => {
  const { layerId } = useURLayerParams();
  const { data } = useLayerParsedSource({ layer_id: layerId }, { enabled: !!layerId });
  const { title } = data ?? {};

  return (
    <div
      className="absolute bottom-3 right-3 z-10 space-y-1 font-inter text-xs text-secondary-500"
      data-testid="map-legend"
    >
      {layerId && (
        <div className="flex rounded-md border border-secondary-500 bg-brand-500">
          <button
            type="button"
            className={cn(LEGEND_BUTTON_STYLES, 'bg-secondary-500 text-brand-500')}
            data-testid="map-legend-toggle-button"
          >
            Layer
          </button>
          <button className={LEGEND_BUTTON_STYLES} disabled>
            Compare
          </button>
        </div>
      )}
      {data && layerId && (
        <div
          className="relative flex min-h-[34px] items-center justify-between space-x-4 rounded-sm border border-gray-600 bg-brand-500 px-4 py-3 text-secondary-500"
          data-testid="map-legend-item"
        >
          <div data-testid="map-legend-item-title" className="text-xs font-bold">
            {title}
          </div>
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

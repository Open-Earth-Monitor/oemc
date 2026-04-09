import { useMemo } from 'react';

import { unescapeHtml } from '@/lib/format';

import { LayerParsed, ParsedLegend } from '@/types/layers';

import { RampLegend } from '@/components/map/legend/types/gradient';
import { IntervalsLegend } from '@/components/map/legend/types/intervals';
import TimeSeriesSameLayer from '@/components/timeseries-layer';
import { useSyncCompareLayersSettings, useSyncLayersSettings } from '@/hooks/sync-query';
import TimeSeriesComparativeLayers from '@/components/timeseries-comparative-layers';
import { useLayer } from '@/hooks/layers';

export const LegendGraphic: React.FC<{
  dataLayer: LayerParsed;
  dataLegend: ParsedLegend;
}> = ({ dataLayer, dataLegend }) => {
  const { entries, type } = dataLegend || {};
  const { gs_style, unit, range, layer_id } = dataLayer || {};
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();

  // Only show layers with position right
  // const geostoryLayers = useMemo(
  //   () => layersData?.filter(({ position }) => position === 'right' || !position),
  //   [layersData]
  // );

  const layerId = useMemo(() => layers?.[0]?.id, [layers]);
  const comparisonLayerId = useMemo(() => compareLayers?.[0]?.id, [compareLayers]);

  const { data: baseLayerData } = useLayer(
    {
      layer_id: layer_id,
    },
    {
      enabled: !!layer_id,
    }
  );

  const { data: comparisonLayerData } = useLayer(
    {
      layer_id: comparisonLayerId || '',
    },
    {
      enabled: !!comparisonLayerId,
    }
  );
  return (
    <div>
      {type === 'intervals' && <IntervalsLegend entries={entries} />}
      {type === 'ramp' && <RampLegend entries={entries} />}
      {type !== 'intervals' && type !== 'ramp' && gs_style && gs_style?.length > 8 && (
        <div className="flex flex-col space-y-1 p-2">
          <div className="absolute left-0 right-0 top-0 h-10 bg-gradient-to-t from-transparent via-black-500 to-black-500" />

          {gs_style?.map(({ color, label }) => (
            <div
              key={label}
              className="flex items-baseline space-x-2"
              data-testid="dataset-legend-item"
            >
              <div
                className="h-2 w-2"
                style={{
                  backgroundColor: color,
                }}
              />
              <div className="text-left text-xs text-gray-600">{label}</div>
            </div>
          ))}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black-500 via-transparent to-transparent" />
        </div>
      )}
      {type !== 'intervals' && type !== 'ramp' && gs_style && gs_style?.length <= 8 && (
        <div className="flex">
          {gs_style?.map(({ color, label }) => (
            <div key={label} className="grow space-y-2" data-testid="dataset-legend-item">
              <div
                className="h-2 w-full"
                style={{
                  backgroundColor: color,
                }}
              />
              <div className="text-center text-xs">{unescapeHtml(label)}</div>
            </div>
          ))}
        </div>
      )}
      {unit && (
        <div title={unit} className="w-full text-right text-xs text-gray-600">
          {unit}
        </div>
      )}

      {/* {range && !!range.length && (
        // same layer compared
        <TimeSeriesSameLayer
          layerId={layer_id}
          range={range}
          isActive={true}
          defaultActive={true}
          autoPlay={true}
          comparisonLayer={null}
        />
      )}
      {!!comparisonLayerId && (
        <TimeSeriesComparativeLayers layerId={comparisonLayerId} range={range} isActive={true} />
      )} */}
    </div>
  );
};

export default LegendGraphic;

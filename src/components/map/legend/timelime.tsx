import { useMemo } from 'react';

import TimeSeriesSameLayer from '@/components/timeseries-layer';

import { useSyncCompareLayersSettings, useSyncLayersSettings } from '@/hooks/sync-query';
import TimeSeriesComparativeLayers from '@/components/timeseries-comparative-layers';
import { useLayer } from '@/hooks/layers';

export const LegendTimeseries: React.FC = () => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();

  const baseLayerId = useMemo(() => layers?.[0]?.id, [layers]);
  const comparisonLayerId = useMemo(() => compareLayers?.[0]?.id, [compareLayers]);

  const { data: baseLayerData } = useLayer(
    {
      layer_id: baseLayerId,
    },
    {
      enabled: !!baseLayerId,
    }
  );

  const { data: comparisonLayerData } = useLayer(
    {
      layer_id: comparisonLayerId,
    },
    {
      enabled: !!comparisonLayerId,
    }
  );

  const mainLayer = useMemo(() => {
    if (!baseLayerData && !comparisonLayerData) return null;
    if (!baseLayerData && !!comparisonLayerData) return comparisonLayerData;
    return baseLayerData;
  }, [baseLayerData, comparisonLayerData]);
  console.log({ mainLayer, comparisonLayerData, baseLayerData });
  return (
    <div>
      {baseLayerData?.range && !!baseLayerData.range.length && (
        <TimeSeriesSameLayer
          layerId={mainLayer?.layer_id || ''}
          range={mainLayer?.range}
          isActive={true}
          defaultActive={true}
          autoPlay={true}
          comparisonLayer={comparisonLayerData || null}
        />
      )}
    </div>
  );
};

export default LegendTimeseries;

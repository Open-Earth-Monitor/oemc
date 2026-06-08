import { useMemo } from 'react';

import { usePathname } from 'next/navigation';

import { useGeostory } from '@/hooks/geostories';
import { useLayer } from '@/hooks/layers';
import { useMonitor } from '@/hooks/monitors';
import { useSyncCompareLayersSettings, useSyncLayersSettings } from '@/hooks/sync-query';

import TimeSeriesComparativeLayers from '@/components/timeseries-comparative-layers';
import TimeSeriesSameLayer from '@/components/timeseries-layer';

export const LegendTimeseries: React.FC = () => {
  const [layers] = useSyncLayersSettings();
  const [compareLayers] = useSyncCompareLayersSettings();

  const isGeostory = usePathname().startsWith('/explore/geostory');

  const datasetId = usePathname().split('/')[3];

  useGeostory({ geostory_id: datasetId }, { enabled: isGeostory && !!datasetId });

  useMonitor({ monitor_id: datasetId }, { enabled: !isGeostory && !!datasetId });

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
      compare: true,
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

  const isSameLayer = useMemo(
    () => baseLayerData?.position === comparisonLayerData?.position,
    [baseLayerData, comparisonLayerData]
  );

  return (
    <div className="w-full overflow-hidden">
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

      {!!comparisonLayerId && !isSameLayer && (
        <TimeSeriesComparativeLayers
          layerId={comparisonLayerId}
          range={mainLayer?.range}
          isActive={true}
          hideTimeline={!!baseLayerData?.range?.length}
        />
      )}
    </div>
  );
};

export default LegendTimeseries;

import { useMemo } from 'react';

import TimeSeriesSameLayer from '@/components/timeseries-layer';

import { useSyncCompareLayersSettings, useSyncLayersSettings } from '@/hooks/sync-query';
import TimeSeriesComparativeLayers from '@/components/timeseries-comparative-layers';
import { useLayer } from '@/hooks/layers';
import { useParams, usePathname } from 'next/navigation';
import { useGeostory } from '@/hooks/geostories';
import { useMonitor } from '@/hooks/monitors';

export const LegendTimeseries: React.FC = () => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();

  const isGeostory = usePathname().startsWith('/explore/geostory');

  const datasetId = usePathname().split('/')[3];

  const { data: geostoryData } = useGeostory(
    { geostory_id: datasetId },
    { enabled: isGeostory && !!datasetId }
  );

  const { data: monitorData } = useMonitor(
    { monitor_id: datasetId },
    { enabled: !isGeostory && !!datasetId }
  );

  const datasetData = isGeostory ? geostoryData : monitorData;

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
        />
      )}
    </div>
  );
};

export default LegendTimeseries;

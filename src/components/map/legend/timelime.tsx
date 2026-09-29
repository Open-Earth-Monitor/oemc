import { useMemo } from 'react';

import { usePathname } from 'next/navigation';

import { useGeostoryLayers } from '@/hooks/geostories';
import { useLayer } from '@/hooks/layers';
import { useMonitorLayers } from '@/hooks/monitors';
import { useSyncCompareLayersSettings, useSyncLayersSettings } from '@/hooks/sync-query';

import TimeSeriesComparativeLayers, {
  PairedLayerToggle,
} from '@/components/timeseries-comparative-layers';
import TimeSeriesSameLayer from '@/components/timeseries-layer';

export const LegendTimeseries: React.FC = () => {
  const [layers] = useSyncLayersSettings();
  const [compareLayers] = useSyncCompareLayersSettings();

  const isGeostory = usePathname().startsWith('/explore/geostory');

  const datasetId = usePathname().split('/')[3];

  const baseLayerId = useMemo(() => layers?.[0]?.id, [layers]);
  const comparisonLayerId = useMemo(() => compareLayers?.[0]?.id, [compareLayers]);

  // The layer a monitor or geostory pairs with the active one on the map's
  // left side. Read from the dataset itself, not from the URL, so the pairing
  // survives the comparison being closed and can be reopened.
  const { data: monitorPairedLayer } = useMonitorLayers(
    { monitor_id: datasetId },
    {
      enabled: !isGeostory && !!datasetId,
      select: (data) => data.find(({ position }) => position === 'left') ?? null,
    }
  );
  const { data: geostoryPairedLayer } = useGeostoryLayers(
    { geostory_id: datasetId },
    {
      enabled: isGeostory && !!datasetId,
      select: (data) => data.find(({ position }) => position === 'left') ?? null,
    }
  );
  const pairedLayerId = (isGeostory ? geostoryPairedLayer : monitorPairedLayer)?.layer_id;
  const hasPairedLayer = !!pairedLayerId && pairedLayerId !== baseLayerId;

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

  const hasBaseRange = !!baseLayerData?.range?.length;

  return (
    <div className="w-full overflow-hidden">
      {hasBaseRange && (
        <TimeSeriesSameLayer
          layerId={mainLayer?.layer_id || ''}
          range={mainLayer?.range}
          isActive={true}
          defaultActive={true}
          autoPlay={true}
          comparisonLayer={comparisonLayerData || null}
          actions={hasPairedLayer ? <PairedLayerToggle layerId={pairedLayerId} /> : null}
        />
      )}

      {!hasBaseRange && hasPairedLayer && (
        <TimeSeriesComparativeLayers
          layerId={pairedLayerId}
          range={mainLayer?.range}
          isActive={true}
        />
      )}
    </div>
  );
};

export default LegendTimeseries;

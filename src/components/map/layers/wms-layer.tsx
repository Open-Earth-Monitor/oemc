import { RLayerWMS } from 'rlayers';

import { useLayerParsedSource } from '@/hooks/layers';
import { useSyncLayersSettings } from '@/hooks/sync-query';

export const RLayerWMSComponent = () => {
  const [layers] = useSyncLayersSettings();
  const { id: layerId, opacity: layerOpacity, date } = layers?.[0] || {};

  const { data } = useLayerParsedSource(
    {
      layer_id: layerId,
    },
    {
      enabled: !!layerId,
    }
  );

  const { gs_base_wms, gs_name, range } = data || {};
  return (
    <RLayerWMS
      properties={{ label: gs_name, opacity: layerOpacity, date, range }}
      url={gs_base_wms}
      params={{
        FORMAT: 'image/png',
        WIDTH: 256,
        HEIGHT: 256,
        SERVICE: 'WMS',
        VERSION: '1.3.0',
        REQUEST: 'GetMap',
        TRANSPARENT: true,
        LAYERS: gs_name,
        DIM_DATE: date,
        CRS: 'EPSG:3857',
        BBOX: 'bbox-epsg-3857',
      }}
    />
  );
};
export default RLayerWMSComponent;

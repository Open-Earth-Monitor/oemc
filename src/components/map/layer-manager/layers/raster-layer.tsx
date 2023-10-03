'use client';

import { Source, Layer } from 'react-map-gl';

import { GeoJSONSourceOptions, RasterLayer, RasterSource } from 'mapbox-gl';

import { useLayerSource } from '@/hooks/layers';
import { useURLayerParams } from '@/hooks/url-params';

import type { LayerComponentProps } from '../types';

export const RasterLayerComponent = ({ beforeId }: LayerComponentProps) => {
  const { layerId, layerOpacity, date } = useURLayerParams();
  const { data, isFetched } = useLayerSource(
    {
      layer_id: layerId,
    },
    {
      enabled: !!layerId,
    }
  );

  const { gs_base_wms, gs_name, range } = data || {};

  const tiles = [
    `${gs_base_wms}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&LAYERS=${gs_name}&DIM_DATE=${date}&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&STYLES=&BBOX={bbox-epsg-3857}`,
  ];

  const LAYER: RasterLayer = {
    id: 'raster-layer',
    type: 'raster',
    paint: {
      'raster-opacity': layerOpacity,
    },
  };
  const SOURCE: RasterSource & GeoJSONSourceOptions = {
    id: 'layer-source',
    type: 'raster',
    tiles: tiles,
    minzoom: 0,
    maxzoom: 12,
  };

  return (
    data && (
      <Source key={`${date}-${layerId}-${date}`} {...SOURCE}>
        {isFetched && (
          <Layer key={range ? `${layerId}-${date}` : layerId} {...LAYER} beforeId={beforeId} />
        )}
      </Source>
    )
  );
};
export default RasterLayerComponent;

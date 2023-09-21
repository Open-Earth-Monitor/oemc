'use client';
import { useMemo } from 'react';

import { Source, Layer } from 'react-map-gl';

import { GeoJSONSourceOptions, RasterLayer, RasterSource } from 'mapbox-gl';

import { useURLayerParams } from 'hooks';
import { useLayerSource } from 'hooks/map';

import type { LayerComponentProps } from '../types';

export const RasterLayerComponent = ({ beforeId }: LayerComponentProps) => {
  const { layerId, layerOpacity } = useURLayerParams();

  const { data, isFetched } = useLayerSource(
    {
      layer_id: layerId,
    },
    {
      enabled: !!layerId,
    }
  );
  const { gs_base_wms, gs_name, range } = data ?? {};

  const tiles = useMemo(
    () => [
      `${gs_base_wms}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&LAYERS=${gs_name}&DIM_DATE=${range}&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&STYLES=&BBOX={bbox-epsg-3857}`,
    ],
    [gs_base_wms, gs_name, range]
  );
  const LAYER: RasterLayer = {
    id: 'raster-layer',
    type: 'raster',
    paint: {
      'raster-opacity': layerOpacity,
    },
  };
  const SOURCE: RasterSource & GeoJSONSourceOptions = useMemo(
    () => ({
      id: 'layer-source',
      type: 'raster',
      tiles,
      minzoom: 0,
      maxzoom: 12,
    }),
    [tiles]
  );

  return (
    SOURCE && (
      <Source key={layerId} {...SOURCE}>
        {isFetched && (
          <Layer key={range ? `${layerId}-${range}` : layerId} {...LAYER} beforeId={beforeId} />
        )}
      </Source>
    )
  );
};
export default RasterLayerComponent;

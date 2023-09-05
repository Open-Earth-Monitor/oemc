'use client';
import { useMemo } from 'react';

import { Source, Layer } from 'react-map-gl';

import { useSearchParams } from 'next/navigation';

import { AnyLayer, GeoJSONSourceOptions, RasterSource } from 'mapbox-gl';

import { useLayerSource } from 'hooks/map';

import type { LayerComponentProps } from '../types';
const LAYER: AnyLayer = {
  id: `example-layer`,
  type: 'raster',
};

const ExampleLayer = ({ beforeId }: LayerComponentProps) => {
  const params = useSearchParams();
  const layersId = params.get('layers');
  const layerId = layersId && layersId.substring(1, layersId.length - 1).split(',')[0];
  const { data, isFetched } = useLayerSource(
    {
      layer_id: layerId,
    },
    {
      layer_id: layerId,
    },
    {
      enabled: !!layerId,
    }
  );

  const { gs_base_wms, gs_name, range } = data;

  const tiles = useMemo(
    () => [
      `${gs_base_wms}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&LAYERS=${gs_name}&DIM_DATE=${range}&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&STYLES=&BBOX={bbox-epsg-3857}`,
    ],
    [gs_base_wms, gs_name, range]
  );

  const SOURCE: RasterSource & GeoJSONSourceOptions = useMemo(() => {
    if (gs_name)
      return {
        id: 'layer-source',
        type: 'raster',
        tiles,
        minzoom: 0,
        maxzoom: 12,
      };
    else null;
  }, [gs_name, tiles]);

  return SOURCE ? (
    <Source {...SOURCE}>{isFetched && <Layer {...LAYER} beforeId={beforeId} />}</Source>
  ) : null;
};
export default ExampleLayer;

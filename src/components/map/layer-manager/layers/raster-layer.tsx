'use client';

import { Source, Layer } from 'react-map-gl';

import { GeoJSONSourceOptions, RasterLayer, RasterSource } from 'mapbox-gl';

import { useURLayerParams } from 'hooks';
import { useLayerSource } from 'hooks/map';

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

  const { gs_base_wms, gs_name, range } = data ?? { range: [{ label: '', value: '' }] };
  const selectedRange = (range?.find((r) => r?.label === date) || range?.[0]) as {
    label: string;
    value: string;
  };

  const tiles = [
    `${gs_base_wms}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&LAYERS=${gs_name}&DIM_DATE=${selectedRange?.label}&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&STYLES=&BBOX={bbox-epsg-3857}`,
  ];

  const LAYER: RasterLayer = {
    id: 'raster-layer',
    type: 'raster',
    paint: {
      'raster-opacity': layerOpacity,
      'raster-fade-duration': 1000,
    },
  };
  const SOURCE: RasterSource & GeoJSONSourceOptions = {
    id: 'layer-source',
    type: 'raster',
    tiles,
    minzoom: 0,
    maxzoom: 12,
  };

  return (
    SOURCE && (
      <Source key={`${selectedRange?.label}-${layerId}-${date}`} {...SOURCE}>
        {isFetched && (
          <Layer
            key={range ? `${layerId}-${selectedRange?.label}` : layerId}
            {...LAYER}
            beforeId={beforeId}
          />
        )}
      </Source>
    )
  );
};
export default RasterLayerComponent;

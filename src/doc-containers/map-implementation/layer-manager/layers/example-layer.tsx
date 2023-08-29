'use client';
import { useEffect, useMemo } from 'react';

import { Source, Layer } from 'react-map-gl';

import { useRouter, usePathname } from 'next/navigation';

import { AnyLayer, GeoJSONSourceOptions, RasterSource } from 'mapbox-gl';

import { useLayerSource } from 'hooks/map';
import { FAKE_DATA } from 'hooks/map';

import type { LayerComponentProps } from '../types';

const LAYER: AnyLayer = {
  id: `example-layer`,
  type: 'raster',
};

const ExampleLayer = ({ beforeId }: LayerComponentProps) => {
  const { data } = useLayerSource({
    layer_id: 'l3',
  });
  const router = useRouter();
  const pathname = usePathname();

  const { gs_base_wms, gs_name, range } = FAKE_DATA;

  useEffect(() => {
    router.replace(`${pathname}/?layers=[l1]`);
  }, [router, pathname]);

  const tiles = useMemo(
    () => [
      `${gs_base_wms}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=true&LAYERS=${gs_name}&DIM_DATE=${range}&WIDTH=256&HEIGHT=256&CRS=EPSG:3857&STYLES=&BBOX={bbox-epsg-3857}`,
    ],
    [gs_base_wms, gs_name, range]
  );
  const SOURCE: RasterSource & GeoJSONSourceOptions = {
    id: 'example-source',
    type: 'raster',
    tiles,
    minzoom: 0,
    maxzoom: 12,
  };

  return (
    <Source {...SOURCE}>
      <Layer {...LAYER} beforeId={beforeId} />
    </Source>
  );
};
export default ExampleLayer;

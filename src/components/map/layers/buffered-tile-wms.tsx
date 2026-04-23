'use client';

import { FC, useEffect, useRef } from 'react';

import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { RLayerTileWMSProps, useOL } from 'rlayers';

import { WMS_CRS } from '../constants';

interface BufferedTileWMSProps extends RLayerTileWMSProps {
  layerName: string;
  date: string | undefined;
  onLayerChange?: (layer: TileLayer<TileWMS> | null) => void;
}

/**
 * WMS tile layer that uses OL's native `updateParams()` for date changes.
 * Old tiles stay visible as interim tiles until new ones load — no blink.
 */
const BufferedTileWMS: FC<BufferedTileWMSProps> = ({
  url,
  params,
  layerName,
  date,
  opacity = 1,
  zIndex = 1,
  visible = true,
  minResolution,
  maxResolution,
  minZoom,
  maxZoom,
  projection,
  attributions,
  cacheSize,
  wrapX,
  properties,
  onLayerChange,
}) => {
  const { map } = useOL();
  const layerRef = useRef<TileLayer<TileWMS> | null>(null);
  const dateRef = useRef(date);
  dateRef.current = date;
  const onLayerChangeRef = useRef(onLayerChange);
  onLayerChangeRef.current = onLayerChange;

  // Create layer + source once; recreate only on url/layerName change
  useEffect(() => {
    if (!map) return;

    const source = new TileWMS({
      url,
      params: {
        FORMAT: 'image/png',
        LAYERS: layerName,
        TILED: true,
        DIM_DATE: dateRef.current,
        CRS: WMS_CRS,
        ...params,
      },
      serverType: 'geoserver',
      crossOrigin: 'anonymous',
      projection,
      attributions,
      cacheSize,
      wrapX,
    });

    const layer = new TileLayer({
      source,
      opacity,
      zIndex,
      visible,
      minResolution,
      maxResolution,
      minZoom,
      maxZoom,
      properties,
    });

    layerRef.current = layer;
    map.addLayer(layer);
    onLayerChangeRef.current?.(layer);

    return () => {
      map.removeLayer(layer);
      layerRef.current = null;
      onLayerChangeRef.current?.(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, url, layerName]);

  // Date change → updateParams keeps old tiles visible until new ones load
  useEffect(() => {
    layerRef.current?.getSource()?.updateParams({ DIM_DATE: date });
  }, [date]);

  useEffect(() => {
    layerRef.current?.setOpacity(opacity);
  }, [opacity]);

  useEffect(() => {
    layerRef.current?.setVisible(visible);
  }, [visible]);

  useEffect(() => {
    layerRef.current?.setZIndex(zIndex);
  }, [zIndex]);

  return null;
};

export default BufferedTileWMS;

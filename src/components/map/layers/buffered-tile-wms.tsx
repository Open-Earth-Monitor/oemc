'use client';

import { FC, useEffect, useRef } from 'react';

import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { useOL } from 'rlayers';

import { WMS_CRS } from '../constants';

interface BufferedTileWMSProps {
  url: string;
  layerName: string;
  date: string | undefined;
  opacity?: number;
  zIndex?: number;
  visible?: boolean;
  onLayerChange?: (layer: TileLayer<TileWMS> | null) => void;
}

/**
 * WMS tile layer that uses OL's native `updateParams()` for date changes.
 * Old tiles stay visible as interim tiles until new ones load — no blink.
 */
const BufferedTileWMS: FC<BufferedTileWMSProps> = ({
  url,
  layerName,
  date,
  opacity = 1,
  zIndex = 1,
  visible = true,
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
      },
      serverType: 'geoserver',
      crossOrigin: 'anonymous',
    });

    const layer = new TileLayer({
      source,
      opacity,
      zIndex,
      visible,
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

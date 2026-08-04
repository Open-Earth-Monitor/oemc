'use client';

import { useMemo } from 'react';

import { createXYZ } from 'ol/tilegrid';
import type TileGrid from 'ol/tilegrid/TileGrid';
import { RLayerTile } from 'rlayers';

import { useSyncBasemapSettings } from '@/hooks/sync-query';

import { BASEMAPS } from '@/components/map/controls/basemaps/constants';
import VectorStyleLayer from '@/components/map/vector-style-layer';

/**
 * Tile grids are cached per zoom ceiling because rlayers recreates the layer
 * whenever the `tileGrid` prop changes identity — a fresh grid on every render
 * would rebuild the basemap on every render.
 */
const TILE_GRIDS = new Map<number, TileGrid>();

const getTileGrid = (maxZoom?: number) => {
  if (!maxZoom) return undefined;

  if (!TILE_GRIDS.has(maxZoom)) TILE_GRIDS.set(maxZoom, createXYZ({ maxZoom }));

  return TILE_GRIDS.get(maxZoom);
};

const BasemapLayer = () => {
  const [basemap] = useSyncBasemapSettings();
  // `basemap` is a URL param, so it can name a basemap that was renamed or never
  // existed; without the fallback the map throws instead of drawing something.
  const selectedBasemap = useMemo(
    () => BASEMAPS.find((b) => b.id === basemap) ?? BASEMAPS[0],
    [basemap]
  );
  if (selectedBasemap.styleUrl) {
    return (
      <VectorStyleLayer
        styleUrl={selectedBasemap.styleUrl}
        attributions={selectedBasemap.attributions}
      />
    );
  }

  return (
    <RLayerTile
      properties={{ label: 'Basemap' }}
      url={selectedBasemap.url}
      attributions={selectedBasemap.attributions}
      tileGrid={getTileGrid(selectedBasemap.maxZoom)}
    />
  );
};

export default BasemapLayer;

'use client';

import { useMemo } from 'react';

import { RLayerTile } from 'rlayers';

import { useSyncBasemapSettings } from '@/hooks/sync-query';

import { BASEMAPS } from '@/components/map/controls/basemaps/constants';
import VectorStyleLayer from '@/components/map/vector-style-layer';

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
    />
  );
};

export default BasemapLayer;

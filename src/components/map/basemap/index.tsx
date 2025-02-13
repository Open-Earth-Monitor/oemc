'use client';

import { useMemo } from 'react';

import { RLayerTile } from 'rlayers';
import { useSyncBasemapSettings } from '@/hooks/sync-query';
import { BASEMAPS } from '@/components/map/controls/basemaps/constants';

const BasemapLayer = () => {
  const [basemap] = useSyncBasemapSettings();
  const selectedBasemap = useMemo(() => BASEMAPS.find((b) => b.id === basemap), [basemap]);

  return (
    <>
      <RLayerTile
        properties={{ label: 'Basemap' }}
        url={selectedBasemap.url}
        attributions={selectedBasemap.attributions}
      />
    </>
  );
};

export default BasemapLayer;

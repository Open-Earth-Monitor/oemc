'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { CategoryId } from '@/constants/categories';

import { useSyncCategories } from '@/hooks/sync-query';

import Map3D, { type GlobeClickEvent, type FlyTarget } from '@/components/globe';

import { useGeostoryPins } from './geostory-pins';

const DEFAULT_CENTER: [number, number] = [20, 15];

export default function Page() {
  const [categories] = useSyncCategories();
  const allPins = useGeostoryPins();

  const pins = useMemo(() => {
    if (!allPins?.length) return [];
    if (
      !categories ||
      categories === 'All' ||
      !Array.isArray(categories) ||
      categories.length === 0
    )
      return allPins;
    return allPins.filter((p) => (categories as CategoryId[]).includes(p.category as CategoryId));
  }, [allPins, categories]);

  const isInitialMount = useRef(true);
  const [flyToCenter, setFlyToCenter] = useState<FlyTarget | null>(null);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!pins || pins.length === 0) {
      setFlyToCenter({ lonLat: DEFAULT_CENTER, key: `default-${Date.now()}` });
      return;
    }

    if (pins.length === 1) {
      const [lon, lat] = pins[0].coordinates;
      setFlyToCenter({ lonLat: [lon, lat], key: `single-${Date.now()}` });
      return;
    }

    let minLon = Infinity;
    let minLat = Infinity;
    let maxLon = -Infinity;
    let maxLat = -Infinity;
    for (const pin of pins) {
      const [lon, lat] = pin.coordinates;
      if (lon < minLon) minLon = lon;
      if (lat < minLat) minLat = lat;
      if (lon > maxLon) maxLon = lon;
      if (lat > maxLat) maxLat = lat;
    }

    const centerLon = (minLon + maxLon) / 2;
    const centerLat = (minLat + maxLat) / 2;

    setFlyToCenter({
      lonLat: [centerLon, centerLat],
      key: `bounds-${Date.now()}`,
    });
  }, [pins]);

  const handleClick = useCallback((evt: GlobeClickEvent) => {
    if (evt.geostoryId) {
      console.info('Clicked geostory:', evt.geostoryId);
    }
  }, []);

  return (
    <div className="relative h-full w-full">
      <Map3D
        onClick={handleClick}
        pins={pins}
        flyToCenter={flyToCenter}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

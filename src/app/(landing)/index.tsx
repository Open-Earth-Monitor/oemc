'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { CategoryId } from '@/constants/categories';

import { useDebounce } from '@/hooks/datasets';
import { GeostoriesParams, useGeostories } from '@/hooks/geostories';
import { useSyncCategories, useSyncSearchGeostoriesGlobe } from '@/hooks/sync-query';

import Map3D, { type GlobeClickEvent, type FlyTarget } from '@/components/globe';
import GeostoryDialog from '@/components/globe/geostory-dialog';

import { useGeostoryPins } from './geostory-pins';

const DEFAULT_CENTER: [number, number] = [20, 15];

export default function Page() {
  const [searchValue] = useSyncSearchGeostoriesGlobe();
  const [categories] = useSyncCategories();

  const debouncedSearchValue = useDebounce(searchValue, 500);

  // TO - DO: this params object is duplicated with the one in GlobeGeostories, we should unify them and move them to the sync-query hook, but for now we want to keep the geostory pins logic separated from the geostories list logic, so we will keep it here for now, also API should filter by category/theme but currently it does not so we filter on the frontend, when API is ready we can remove the category from the URL and this params object and just rely on the one in GlobeGeostories
  const params: GeostoriesParams = useMemo(
    () => ({
      sort_by: 'title',
      // ...(categories.length > 0 && { theme: categories }),
      ...(debouncedSearchValue !== '' &&
        debouncedSearchValue.length >= 2 && { title: debouncedSearchValue }),
    }),
    [
      // categories,
      debouncedSearchValue,
    ]
  );
  const allPins = useGeostoryPins(params);
  const { data: geostories } = useGeostories({});
  const [selectedGeostoryId, setSelectedGeostoryId] = useState<string | null>(null);

  const selectedGeostory = useMemo(
    () => geostories?.find((g) => g.id === selectedGeostoryId) ?? null,
    [geostories, selectedGeostoryId]
  );

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
      setSelectedGeostoryId(evt.geostoryId);
    } else {
      setSelectedGeostoryId(null);
    }
  }, []);

  return (
    <div className="relative h-full w-full md:flex xl:flex">
      <Map3D
        onClick={handleClick}
        pins={pins}
        flyToCenter={flyToCenter}
        style={{ width: '100%', height: '100%' }}
      />
      <GeostoryDialog
        geostory={selectedGeostory}
        open={!!selectedGeostory}
        onOpenChange={(open) => !open && setSelectedGeostoryId(null)}
      />
    </div>
  );
}

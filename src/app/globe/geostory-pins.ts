import { useMemo } from 'react';

import type { CategoryId } from '@/constants/categories';

import { useGeostories } from '@/hooks/geostories';

export type GeostoryPin = {
  geostory_id: string;
  coordinates: [number, number];
  category: CategoryId | 'Unknown';
};

function isFiniteNumber(n: unknown): n is number {
  return typeof n === 'number' && Number.isFinite(n);
}

function isValidLonLat(lon: number, lat: number) {
  return lon >= -180 && lon <= 180 && lat >= -90 && lat <= 90;
}

function looksLikeWebMercator(x: number, y: number) {
  return Math.abs(x) > 180 || Math.abs(y) > 90;
}

function webMercatorToLonLat(x: number, y: number): [number, number] {
  const lon = (x * 180) / 20037508.34;
  const lat = (Math.atan(Math.exp((y * Math.PI) / 20037508.34)) * 360) / Math.PI - 90;
  return [lon, lat];
}

export function useGeostoryPins(): GeostoryPin[] {
  const { data: geostories } = useGeostories({});

  return useMemo(() => {
    if (!geostories?.length) return [];

    return geostories
      .map((story) => {
        const bbox = (story as any).geostory_bbox as unknown;
        if (!Array.isArray(bbox) || bbox.length !== 4) return null;

        const [minX, minY, maxX, maxY] = bbox;
        if (![minX, minY, maxX, maxY].every(isFiniteNumber)) return null;

        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;

        let lon: number;
        let lat: number;

        if (looksLikeWebMercator(cx, cy)) {
          [lon, lat] = webMercatorToLonLat(cx, cy);
        } else {
          lon = cx;
          lat = cy;
        }

        if (!isValidLonLat(lon, lat)) return null;

        return {
          geostory_id: String((story as any).id),
          coordinates: [lon, lat],
          category: (((story as any).theme ?? 'Unknown') as CategoryId) ?? 'Unknown',
        } satisfies GeostoryPin;
      })
      .filter(Boolean) as GeostoryPin[];
  }, [geostories]);
}

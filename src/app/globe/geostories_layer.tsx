import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import type { FeatureLike } from 'ol/Feature';
import { fromLonLat, toLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import RegularShape from 'ol/style/RegularShape';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

import type { CategoryId } from '@/constants/categories';
import { CATEGORIES_COLORS, DEFAULT_COLOR } from '@/constants/categories';
import { useMemo } from 'react';
import { useGeostories } from '@/hooks/geostories';

const GEOSTORY_PINS_LAYER_ID = 'geostory-pins';

function colorForCategory(category?: CategoryId | 'Unknown') {
  const key = category ?? 'Unknown';
  return CATEGORIES_COLORS[key]?.base ?? DEFAULT_COLOR;
}

export type GeostoryPin = {
  geostory_id: string;
  coordinates: [number, number];
  category: CategoryId | 'Unknown';
};

export function createGeostoryPointsLayer(pins: GeostoryPin[]): VectorLayer<VectorSource> {
  const features: Feature[] = pins.map((p) => {
    const [lon, lat] = p.coordinates;

    const f = new Feature<Point>({
      geometry: new Point(fromLonLat([lon, lat])),
    });

    f.setId(p.geostory_id);
    f.set('geostory_id', p.geostory_id);
    f.set('category', p.category);
    f.set('layerId', GEOSTORY_PINS_LAYER_ID);
    f.set('layerType', 'geostory');
    f.set('lon', lon);
    f.set('lat', lat);

    return f;
  });

  const source = new VectorSource({ features });

  const layer = new VectorLayer({
    source,
    style: (feature: FeatureLike) => {
      const category = (feature.get('category') ?? 'Unknown') as CategoryId | 'Unknown';

      const color = colorForCategory(category);

      return new Style({
        image: new RegularShape({
          points: 4,
          radius: 6,
          angle: Math.PI / 2,
          fill: new Fill({ color }),
          stroke: new Stroke({ color: '#000000', width: 1.5 }),
        }),
      });
    },
    zIndex: 50,
  });

  layer.set('id', GEOSTORY_PINS_LAYER_ID);

  return layer;
}

function isFiniteNumber(n: unknown): n is number {
  return typeof n === 'number' && Number.isFinite(n);
}

function isValidLonLat(lon: number, lat: number) {
  return lon >= -180 && lon <= 180 && lat >= -90 && lat <= 90;
}

function looksLikeWebMercator(x: number, y: number) {
  return Math.abs(x) > 180 || Math.abs(y) > 90;
}

export function useGeostoryPins(): GeostoryPin[] {
  const { data: geostories } = useGeostories();

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
          [lon, lat] = toLonLat([cx, cy]);
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

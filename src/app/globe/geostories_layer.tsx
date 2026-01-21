import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat, toLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import RegularShape from 'ol/style/RegularShape';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

import { THEMES_COLORS } from '@/constants/themes';
import { useMemo } from 'react';
import { useGeostories } from '@/hooks/geostories';

const GEOSTORY_PINS_LAYER_ID = 'geostory-pins';

function colorForCategory(category?: string) {
  return THEMES_COLORS[category as keyof typeof THEMES_COLORS]?.base ?? THEMES_COLORS.Unknown.base;
}

export type GeostoryPin = {
  geostory_id: string;
  coordinates: [number, number]; // [lon, lat]
  category: string;
};

export function createGeostoryPointsLayer(pins: GeostoryPin[]) {
  const source = new VectorSource({
    features: pins.map((p) => {
      const [lon, lat] = p.coordinates;

      const f = new Feature({
        geometry: new Point(fromLonLat([lon, lat])), // OL expects EPSG:3857 coords for the map
        geostory_id: p.geostory_id,
        category: p.category,
      });

      f.setId(p.geostory_id);

      // ✅ Store layer info on the feature (works even when OL doesn't provide "layer" in hits)
      f.set('layerId', GEOSTORY_PINS_LAYER_ID);
      f.set('layerType', 'geostory');

      // Optional: keep original lon/lat around (useful for Cesium camera/flyTo)
      f.set('lon', lon);
      f.set('lat', lat);

      return f;
    }),
  });

  const layer = new VectorLayer({
    source,
    style: (feature) => {
      const category = String(feature.get('category') ?? '');
      const color = colorForCategory(category);

      return new Style({
        image: new RegularShape({
          points: 4,
          radius: 6,
          angle: Math.PI / 2,
          fill: new Fill({ color }),
          stroke: new Stroke({
            color: '#000000',
            width: 1.5,
          }),
        }),
      });
    },
    zIndex: 50,
  });

  // ✅ Tag the layer too (handy for debugging and future logic)
  layer.set('id', GEOSTORY_PINS_LAYER_ID);

  return layer;
}

/**
 * Returns pins as lon/lat.
 * - Uses bbox center
 * - Supports bbox coming either as lon/lat OR as EPSG:3857 meters (converted via toLonLat)
 */

function isFiniteNumber(n: unknown): n is number {
  return typeof n === 'number' && Number.isFinite(n);
}

function isValidLonLat(lon: number, lat: number) {
  return lon >= -180 && lon <= 180 && lat >= -90 && lat <= 90;
}

// Heuristic: WebMercator meters are usually far outside lon/lat ranges
function looksLikeWebMercator(x: number, y: number) {
  // WebMercator x ~ [-20037508, 20037508], y same order of magnitude
  return Math.abs(x) > 180 || Math.abs(y) > 90;
}

export function useGeostoryPins(): GeostoryPin[] {
  const { data: geostories } = useGeostories();

  return useMemo(() => {
    if (!geostories?.length) return [];

    return geostories
      .map((story) => {
        const bbox = story.geostory_bbox;
        if (!Array.isArray(bbox) || bbox.length !== 4) return null;

        const [minX, minY, maxX, maxY] = bbox;
        if (![minX, minY, maxX, maxY].every(isFiniteNumber)) return null;

        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;

        let lon: number;
        let lat: number;

        // ✅ If bbox is already lon/lat, don't convert
        if (looksLikeWebMercator(cx, cy)) {
          [lon, lat] = toLonLat([cx, cy]); // from EPSG:3857 -> lon/lat
        } else {
          lon = cx;
          lat = cy;
        }

        if (!isValidLonLat(lon, lat)) return null;

        return {
          geostory_id: String(story.id),
          coordinates: [lon, lat],
          category: String(story.theme ?? 'Unknown'),
        } satisfies GeostoryPin;
      })
      .filter(Boolean) as GeostoryPin[];
  }, [geostories]);
}

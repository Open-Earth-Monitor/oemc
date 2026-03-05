'use client';

import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';

type Pin = {
  id: string;
  coordinates: [number, number];
  category: string;
};

const COLORS: Record<string, string> = {
  agriculture: '#FF4F71',
  forest: '#19C37C',
  water: '#6E8DFF',
  'climate & health': '#E44CFF',
  soil: '#F1642E',
  biodiversity: '#FCB84B',
  default: '#6B7280',
};
export function PinsLayer({ pins }: { pins: Pin[] }) {
  const source = new VectorSource({
    features: pins
      .filter((p) => Number.isFinite(p.coordinates[0]) && Number.isFinite(p.coordinates[1]))
      .map((p) => {
        const f = new Feature({
          geometry: new Point(fromLonLat(p.coordinates)),
        });
        f.setId(p.id);
        f.set('category', p.category?.toLowerCase?.() ?? '');
        return f;
      }),
  });

  return new VectorLayer({
    source,
    zIndex: 50,
    style: (feature) => {
      const cat = String(feature.get('category') ?? '').toLowerCase();
      const color = COLORS[cat] ?? COLORS.default;
      return new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({ color }),
          stroke: new Stroke({ color: '#ffffff', width: 2 }),
        }),
      });
    },
  });
}

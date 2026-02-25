import { boundingExtent } from 'ol/extent';
import { toLonLat } from 'ol/proj';

export function getPinsRectangleDegrees(pinsLayer: any) {
  const src = pinsLayer?.getSource?.();
  if (!src) return null;

  const features = src.getFeatures();
  if (!features?.length) return null;

  const coords = features.map((f: any) => f.getGeometry?.()?.getCoordinates?.()).filter(Boolean);

  if (!coords.length) return null;

  const extent = boundingExtent(coords);

  const minLonLat = toLonLat([extent[0], extent[1]]); // [minX,minY]
  const maxLonLat = toLonLat([extent[2], extent[3]]); // [maxX,maxY]

  const west = Math.min(minLonLat[0], maxLonLat[0]);
  const south = Math.min(minLonLat[1], maxLonLat[1]);
  const east = Math.max(minLonLat[0], maxLonLat[0]);
  const north = Math.max(minLonLat[1], maxLonLat[1]);

  return { west, south, east, north };
}

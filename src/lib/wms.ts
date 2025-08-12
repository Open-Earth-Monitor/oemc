import axios from 'axios';
import TileWMS from 'ol/source/TileWMS';
import type { Coordinate } from 'ol/coordinate';

import type { FeatureInfoResponse } from '@/components/map/types';
import { WMS_CRS, WMS_INFO_FORMAT } from '@/components/map/constants';

export function buildWmsSource(url: string, layerName: string) {
  return new TileWMS({
    url,
    params: { LAYERS: layerName, TILED: true },
    serverType: 'geoserver',
    crossOrigin: 'anonymous',
  });
}

export function getFeatureInfoUrl(
  source: TileWMS,
  coord: Coordinate,
  resolution: number,
  layerName: string,
  dimDate?: string
) {
  return source.getFeatureInfoUrl(coord, resolution, WMS_CRS, {
    INFO_FORMAT: WMS_INFO_FORMAT,
    LAYERS: layerName,
    ...(dimDate ? { DIM_DATE: dimDate } : {}),
  });
}

export async function fetchFeatureInfo(url?: string, signal?: AbortSignal) {
  if (!url) return null;
  const { data } = await axios.get<FeatureInfoResponse>(url, { signal });
  return data ?? null;
}

export function firstPropertyValue(resp: FeatureInfoResponse | null) {
  const props = resp?.features?.[0]?.properties;
  if (!props) return null;
  const vals = Object.values(props);
  return vals.length ? (vals[0] as number | string) : null;
}

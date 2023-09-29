import { MapboxStyle } from 'react-map-gl';

import { ExplicitViewState } from './types';

export const MAP_STYLE = {
  version: 8,
  name: 'Custom',
  metadata: {},
  center: [0, 0],
  zoom: 2,
  bearing: 0,
  pitch: 0,
  sources: {
    basemap: {
      type: 'raster',
      tiles: [
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      ],
      tileSize: 256,
      attribution:
        'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    },
  },
  layers: [
    {
      id: 'basemap',
      source: 'basemap',
      type: 'raster',
      paint: {
        'raster-contrast': 0.2,
        'raster-saturation': -0.2,
      },
    },
    {
      id: 'custom-layers',
      type: 'background',
      paint: { 'background-color': 'pink', 'background-opacity': 0 },
    },
  ],
} satisfies MapboxStyle;

/**
 * EUROPE viewport
 */
export const DEFAULT_VIEWPORT: ExplicitViewState = {
  longitude: 10,
  latitude: 48,
  zoom: 4,
};

import { MapboxStyle } from 'react-map-gl';

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
      tiles: ['https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  },
  layers: [
    {
      id: 'basemap',
      source: 'basemap',
      type: 'raster',
    },
    {
      id: 'custom-layers',
      type: 'background',
      paint: { 'background-color': 'pink', 'background-opacity': 0 },
    },
  ],
} satisfies MapboxStyle;

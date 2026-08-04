export type BasemapProps = {
  id: 'world_imagery' | 'gray_scale';
  label: string;
  attributions: string;
  /** XYZ raster template. Null on vector basemaps, which are drawn from `styleUrl`. */
  url: string | null;
  /**
   * MapLibre style document. Its presence is what makes a basemap a vector one:
   * colours, fonts and which features appear at which zoom all come from here,
   * so this is the file to edit (in Maputnik) to restyle the map.
   */
  styleUrl?: string;
  thumb: string;
};

export type LabelProps = {
  id: 'dark' | 'light' | 'no-label';
  label: string;
  attributions: string;
  url: string;
  thumb: string;
};

export const BASEMAPS: BasemapProps[] = [
  {
    id: 'gray_scale',
    label: 'Gray scale',
    // Required by OpenFreeMap; the tiles are OSM data built with OpenMapTiles.
    attributions:
      '<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> © <a href="https://www.openmaptiles.org/" target="_blank">OpenMapTiles</a> Data from <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    url: null,
    // Our own copy of OpenFreeMap's Positron style, with all 19 `symbol` layers
    // removed: this basemap draws no labels, so the labels overlay in map
    // settings is the only thing putting place names on the map. Edit this file
    // (Maputnik opens it directly) to change colours or bring labels back.
    styleUrl: '/basemaps/oemc.json',
    thumb: '',
  },
  {
    id: 'world_imagery',
    label: 'Satellite',
    attributions:
      'Tiles &copy; <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer" target="_blank">Esri</a> &mdash; Source: Esri, Maxar, Earthstar Geographics, USDA FSA, USGS, Aerogrid, IGN, IGP, and the GIS User Community',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    thumb: 'https://ecodatacube.eu/images/osm_overview.png',
  },
];

export const LABELS: LabelProps[] = [
  {
    id: 'dark',
    label: 'Dark',
    // CARTO Dark Matter labels-only overlay — OSM data, CC BY open license
    attributions:
      '© <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions" target="_blank">CARTO</a>',
    url: 'https://basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png',
    thumb: '',
  },
  {
    id: 'light',
    label: 'Light',
    // CARTO Voyager labels-only overlay — cleaner/minimal, fewer sea/ocean translations
    attributions:
      '© <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions" target="_blank">CARTO</a>',
    url: 'https://basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png',
    thumb: 'https://ecodatacube.eu/images/osm_overview.png',
  },
  {
    id: 'no-label',
    label: 'Hide labels',
    attributions: null,
    url: null,
    thumb: null,
  },
];

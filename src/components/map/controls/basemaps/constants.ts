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
  /**
   * MapLibre style document holding only the text layers. Null on `no-label`,
   * which draws nothing. Same deal as the basemap: edit the file to restyle.
   */
  styleUrl: string | null;
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

/**
 * Both overlays are the same 11 text layers from `oemc.json`'s parent style,
 * recoloured to read against a light or a dark map. Sprite icons (highway
 * shields, town dots) are deliberately left out: text alone stays legible over
 * satellite imagery as well as over the gray basemap.
 */
export const LABELS: LabelProps[] = [
  {
    id: 'dark',
    label: 'Dark',
    // Light text on a dark halo — for satellite imagery.
    attributions:
      '<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> © <a href="https://www.openmaptiles.org/" target="_blank">OpenMapTiles</a> Data from <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    styleUrl: '/basemaps/labels-dark.json',
    thumb: '',
  },
  {
    id: 'light',
    label: 'Light',
    // Gray text on a white halo — for the gray scale basemap.
    attributions:
      '<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> © <a href="https://www.openmaptiles.org/" target="_blank">OpenMapTiles</a> Data from <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
    styleUrl: '/basemaps/labels-light.json',
    thumb: '',
  },
  {
    id: 'no-label',
    label: 'Hide labels',
    attributions: null,
    styleUrl: null,
    thumb: null,
  },
];

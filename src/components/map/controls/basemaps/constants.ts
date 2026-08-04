export type BasemapProps = {
  id: 'world_imagery' | 'gray_scale' | 'blue_marble';
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
  /**
   * Deepest zoom the tile host actually serves. Beyond it the last level is
   * stretched; without it the imagery would simply vanish as the user keeps
   * zooming, because the requests 404.
   */
  maxZoom?: number;
  /**
   * Which labels overlay reads over this basemap. Used until the user picks one
   * themselves — dark labels over the light gray basemap are white-on-white.
   */
  defaultLabels: LabelProps['id'];
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

/**
 * National borders plus subnational ones (states, provinces, regions), which is
 * what Esri's reference overlay used to draw over the satellite basemap. Drawn
 * as a white line over a dark casing so it reads over imagery and the gray
 * basemap alike, the same approach the label styles take with their halo; the
 * subnational lines are thinner and dimmer so national borders still lead.
 */
export const BOUNDARIES = {
  attributions:
    '<a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> © <a href="https://www.openmaptiles.org/" target="_blank">OpenMapTiles</a> Data from <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
  styleUrl: '/basemaps/boundaries.json',
} as const;

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
    // Near-white basemap: the dark-text label variant is the readable one.
    defaultLabels: 'light',
    thumb: '',
  },
  {
    id: 'world_imagery',
    label: 'Satellite (Esri)',
    attributions:
      'Tiles &copy; <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer" target="_blank">Esri</a> &mdash; Source: Esri, Maxar, Earthstar Geographics, USDA FSA, USGS, Aerogrid, IGN, IGP, and the GIS User Community',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    defaultLabels: 'dark',
    thumb: 'https://ecodatacube.eu/images/osm_overview.png',
  },
  {
    id: 'blue_marble',
    label: 'Blue Marble',
    // NASA imagery is public domain; GIBS needs no key and asks only for credit.
    attributions:
      'Imagery courtesy <a href="https://www.earthdata.nasa.gov/engage/open-data-services-software/earthdata-developer-portal/gibs-api" target="_blank">NASA EOSDIS GIBS</a> &mdash; Blue Marble Next Generation',
    // A static composite: no TIME dimension, no clouds, no date to keep current.
    url: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_NextGeneration/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpeg',
    // 500 m imagery; GIBS publishes this one to level 8 and 404s above it.
    maxZoom: 8,
    // Light text over a dark halo is what reads over imagery.
    defaultLabels: 'dark',
    thumb: '',
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

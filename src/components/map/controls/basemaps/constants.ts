export type BasemapProps = {
  id: 'world_imagery' | 'gray_scale';
  label: string;
  attributions: string;
  url: string;
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
  // {
  //   id: 'world_imagery',
  //   label: 'Satellite',
  //   attributions:
  //     'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  //   url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  //   thumb: '',
  // },
  // {
  //   id: 'gray_scale',
  //   label: 'Gray scale',
  //   attributions: '© OpenStreetMap contributors, © CartoDB',
  //   url: 'https://basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
  //   thumb: 'https://ecodatacube.eu/images/osm_overview.png',
  // },
  // {
  //   id: 'world_imagery',
  //   label: 'Satellite',
  //   attributions: '© OpenStreetMap contributors',
  //   url: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
  //   thumb: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/OpenStreetMap_Mapnik_Sample.png',
  // },

  {
    id: 'gray_scale',
    label: 'Gray scale',
    attributions:
      '© <a href="https://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions" target="_blank">CARTO</a>',
    url: 'https://basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
    thumb: 'https://carto.com/help/images/building-maps/basemaps/light_all.png',
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

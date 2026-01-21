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

  // {
  //   id: 'gray_scale',
  //   label: 'Gray scale',
  //   attributions: '© OpenStreetMap contributors © Carto',
  //   url: 'https://basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
  //   thumb: 'https://carto.com/help/images/building-maps/basemaps/light_all.png',
  // },

  // {
  //   id: 'world_imagery',
  //   label: 'Satellite',
  //   attributions: '© OpenStreetMap contributors © Carto',
  //   url: 'https://basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
  //   thumb: 'https://carto.com/help/images/building-maps/basemaps/dark_all.png',
  // },

  // {
  //   id: 'gray_scale',
  //   label: 'Gray scale',
  //   attributions: 'Map tiles by Stamen Design, © OpenStreetMap contributors',
  //   url: 'https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
  //   thumb: 'https://stamen-tiles.a.ssl.fastly.net/toner/4/2/5.png',
  // },

  // {
  //   id: 'world_imagery',
  //   label: 'Satellite',
  //   attributions: 'Map tiles by Stamen Design, © OpenStreetMap contributors',
  //   url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png',
  //   thumb: 'https://stamen-tiles.a.ssl.fastly.net/terrain/4/2/5.png',
  // },

  // {
  //   id: 'gray_scale',
  //   label: 'Gray scale',
  //   attributions: '© OpenStreetMap contributors © Wikimedia',
  //   url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
  //   thumb: 'https://maps.wikimedia.org/osm-intl/4/8/5.png',
  // },

  {
    id: 'world_imagery',
    label: 'Satellite',
    attributions: '© OpenStreetMap contributors, SRTM | OpenTopoMap',
    url: 'https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
    thumb: 'https://opentopomap.org/img/preview.png',
  },
];

export const LABELS: LabelProps[] = [
  {
    id: 'dark',
    label: 'Dark',
    attributions:
      'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places_Alternate/MapServer/tile/{z}/{y}/{x}',
    thumb: '',
  },
  {
    id: 'light',
    label: 'Light',
    attributions: '© OpenStreetMap contributors, © CartoDB',
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
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

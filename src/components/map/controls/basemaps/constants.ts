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
  {
    id: 'world_imagery',
    label: 'Satellite',
    attributions:
      'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    thumb: '',
  },
  {
    id: 'gray_scale',
    label: 'Gray scale',
    attributions: '© OpenStreetMap contributors, © CartoDB',
    url: 'https://basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
    thumb: 'https://ecodatacube.eu/images/osm_overview.png',
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

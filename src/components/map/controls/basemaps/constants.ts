type Basemap = {
  id: 'world_imagery' | 'gray_scale';
  label: string;
  attributions: string;
  url: string;
  thumb: string;
};

export const BASEMAPS: Basemap[] = [
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

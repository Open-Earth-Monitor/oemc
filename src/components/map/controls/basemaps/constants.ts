type Basemap = {
  id: 'world_imagery' | 'Esri_WorldGrayCanvas';
  label: string;
  attributions: string;
  url: string;
  thumb: string;
};

export const BASEMAPS: Basemap[] = [
  {
    id: 'world_imagery',
    label: 'World Imagery',
    attributions:
      'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    thumb: '',
  },
  {
    id: 'Esri_WorldGrayCanvas',
    label: 'Gray scale',
    attributions: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    thumb: 'https://ecodatacube.eu/images/osm_overview.png',
  },
];

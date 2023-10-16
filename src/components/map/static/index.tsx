'use client';

import { FC } from 'react';

import { RMap, RControl, RLayerTile } from 'rlayers';

import { DEFAULT_VIEWPORT } from '../constants';

const StaticMap: FC = () => (
  <div className="relative h-full w-full">
    <RMap
      width="100%"
      height="100%"
      className="relative"
      initial={DEFAULT_VIEWPORT}
      noDefaultControls
    >
      <RControl.RAttribution />
      <RLayerTile
        properties={{ label: 'Basemap' }}
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attributions="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      />
    </RMap>
  </div>
);

export default StaticMap;

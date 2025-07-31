import { FC } from 'react';

import { RMap, RControl, RLayerTile } from 'rlayers';

import { BookmarkControl } from '@/components/map/controls/bookmark';

import { DEFAULT_VIEWPORT } from '../constants';

const StaticMapComponent: FC = () => (
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
    <div className="absolute bottom-3 left-3 top-auto z-50">
      <BookmarkControl />
    </div>
  </RMap>
);

export default StaticMapComponent;

'use client';

import ReactMapGL from 'react-map-gl';

import MapLibreGL from 'maplibre-gl';

import { DEFAULT_VIEWPORT, MAP_STYLE } from './constants';
import Controls from './controls';
import BookmarkControl from './controls/bookmark';

const MAP_ID = 'oemc-static-map';

const StaticMap: React.FC<{ mapId?: string }> = ({ mapId = MAP_ID }) => {
  return (
    <div className="relative h-full w-full">
      <ReactMapGL
        id={mapId}
        mapLib={MapLibreGL}
        initialViewState={DEFAULT_VIEWPORT}
        mapStyle={MAP_STYLE}
      >
        <Controls>
          <BookmarkControl />
        </Controls>
      </ReactMapGL>
    </div>
  );
};

export default StaticMap;

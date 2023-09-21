'use client';

import { useCallback, useState } from 'react';

import { ViewState, MapProvider } from 'react-map-gl';
import { Layer } from 'react-map-gl';

import { usePathname } from 'next/navigation';

import { useDebounce } from 'usehooks-ts';

import Map from '@/components/map';
// Controls
import Controls from '@/components/map/controls';
// import BookmarkControl from '@/components/map/controls/bookmark';
import FitBoundsControl from '@/components/map/controls/fit-bounds';
import ShareControl from '@/components/map/controls/share';
import ZoomControl from '@/components/map/controls/zoom';
import Legend from '@/components/map/legend';
import { Bbox } from '@/components/map/types';

// Map
import LayerManager from './layer-manager';

const DEFAULT_BBOX: Bbox = [-173.488154, -60.809359, 164.011846, 67.836775];
const MAX_ZOOM = 20;
const DEFAULT_BOUNDS = {
  bbox: DEFAULT_BBOX,
  options: {
    padding: 100,
    duration: 1000,
  },
};

const INITIAL_VIEW_STATE = {
  bounds: DEFAULT_BBOX,
  fitBoundsOptions: {
    padding: 100,
  },
  maxZoom: 9,
  minZoom: 2,
};

const MapImplementation = () => {
  const [viewState, setViewState] = useState<Partial<ViewState>>({});
  const pathname = usePathname();
  const monitorId = pathname.split('/')[2];
  const debouncedViewStateValue = useDebounce<Partial<ViewState>>(viewState, 250);

  const handleViewState = useCallback((vw: ViewState) => {
    setViewState(vw);
  }, []);

  return (
    <MapProvider>
      <div className="absolute bottom-0 left-0 top-0 w-screen">
        <Map
          maxZoom={MAX_ZOOM}
          bounds={DEFAULT_BOUNDS}
          initialViewState={INITIAL_VIEW_STATE}
          viewState={debouncedViewStateValue}
          // mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
          onMapViewStateChange={handleViewState}
          mapStyle={'https://demotiles.maplibre.org/style.json'}
        >
          {() => (
            <>
              {/* This custom-layers layer serves as a separator to order
              all the layers on the layer manager above the default map layers */}
              <Layer
                id="custom-layers"
                type="background"
                paint={{
                  'background-color': '#000',
                  'background-opacity': 0,
                }}
              />
              <LayerManager layers={['raster']} />
              {!!monitorId && (
                <Controls>
                  <ZoomControl />
                  <FitBoundsControl bounds={DEFAULT_BOUNDS} />
                  {/* <BookmarkControl bounds={DEFAULT_BOUNDS} /> */}
                  <ShareControl />
                </Controls>
              )}
              <Legend />
            </>
          )}
        </Map>
      </div>
    </MapProvider>
  );
};

export default MapImplementation;

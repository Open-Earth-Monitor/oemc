'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { Feature } from 'ol';
import type { MapBrowserEvent } from 'ol';
import type { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

import type { CategoryId } from '@/constants/categories';

import { useSyncCategories } from '@/hooks/sync-query';

import Map3D, {
  type Map3DHandle,
  type Map3DClickEvent,
  type CesiumClickEvent,
} from '@/components/globe';

import { createGeostoryPointsLayer, useGeostoryPins } from './geostories_layer';

export default function Page() {
  const [categories] = useSyncCategories();
  const allPins = useGeostoryPins();
  const pins = useMemo(() => {
    if (!allPins?.length) return [];
    if (
      !categories ||
      categories === 'All' ||
      !Array.isArray(categories) ||
      categories.length === 0
    )
      return allPins;
    return allPins.filter((p) => (categories as CategoryId[]).includes(p.category as CategoryId));
  }, [allPins, categories]);

  const controllerRef = useRef<Map3DHandle | null>(null);
  const [ready, setReady] = useState(false);
  const isInitialMountRef = useRef(true);

  const pinsLayer: VectorLayer<VectorSource<Feature<Point>>, Feature<Point>> | null =
    useMemo(() => {
      if (!pins?.length) return null;
      const layer = createGeostoryPointsLayer(pins) as VectorLayer<
        VectorSource<Feature<Point>>,
        Feature<Point>
      >;
      layer.set('id', 'geostory-pins');
      return layer;
    }, [pins]);

  const onReady = useCallback((m: Map3DHandle) => {
    controllerRef.current = m;
    setReady(true);
  }, []);

  const isCesiumClick = (evt: Map3DClickEvent): evt is CesiumClickEvent =>
    'type' in evt && evt.type === 'cesium-click';

  const handleClick = useCallback((evt: Map3DClickEvent) => {
    const map = controllerRef.current?.getMap();
    if (!map) return;

    if (isCesiumClick(evt)) {
      const geostoryId =
        evt.geostoryId ?? evt.olFeature?.get('geostory_id') ?? evt.olFeature?.getId();

      if (geostoryId) {
        console.info('Clicked geostory (3D):', geostoryId);
      }
      return;
    }

    const olEvt = evt as MapBrowserEvent<PointerEvent>;
    if (!olEvt?.pixel) return;

    map.forEachFeatureAtPixel(
      olEvt.pixel,
      (feature) => {
        const geostoryId = feature.get('geostory_id');
        if (geostoryId) {
          console.info('Clicked feature (2D):', geostoryId);
        }
        return true;
      },
      { hitTolerance: 6 }
    );
  }, []);

  // Fly to filtered geostories when category filter changes
  useEffect(() => {
    if (!ready || !controllerRef.current) return;

    // Skip the very first render so the default globe view shows
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      return;
    }

    if (!pins || pins.length === 0) {
      controllerRef.current.flyToDefault();
      return;
    }

    if (pins.length === 1) {
      const [lon, lat] = pins[0].coordinates;
      const padding = 2;
      controllerRef.current.flyToBounds([
        lon - padding,
        lat - padding,
        lon + padding,
        lat + padding,
      ]);
      return;
    }

    let minLon = Infinity;
    let minLat = Infinity;
    let maxLon = -Infinity;
    let maxLat = -Infinity;
    for (const pin of pins) {
      const [lon, lat] = pin.coordinates;
      if (lon < minLon) minLon = lon;
      if (lat < minLat) minLat = lat;
      if (lon > maxLon) maxLon = lon;
      if (lat > maxLat) maxLat = lat;
    }

    const padLon = Math.max((maxLon - minLon) * 0.1, 1);
    const padLat = Math.max((maxLat - minLat) * 0.1, 1);

    controllerRef.current.flyToBounds([
      minLon - padLon,
      minLat - padLat,
      maxLon + padLon,
      maxLat + padLat,
    ]);
  }, [pins, ready]);

  return (
    <div className="relative h-full w-full">
      <Map3D
        start3D={true}
        onReady={onReady}
        onClick={handleClick}
        layers={!!pinsLayer ? [pinsLayer] : []}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

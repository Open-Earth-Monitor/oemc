'use client';

import React, { useCallback, useMemo, useState } from 'react';
import Map3D, { type Map3DHandle, Map3DClickEvent } from '@/components/globe';
import { createGeostoryPointsLayer, useGeostoryPins } from './geostories_layer';
import type { Feature } from 'ol';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import type { Point } from 'ol/geom';
import type { MapBrowserEvent } from 'ol';

export default function Page() {
  const pins = useGeostoryPins();
  const [controller, setController] = useState<Map3DHandle | null>(null);

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
  const handleClick = useCallback(
    (evt: Map3DClickEvent) => {
      const map = controller?.getMap();
      if (!map) return;

      // --- 3D (Cesium) click payload ---
      if ((evt as any)?.type === 'cesium-click') {
        const picked = (evt as any).picked;
        const billboard = picked?.primitive;
        const billboardId = billboard?.id;
        // console.log('Picked billboard id:', evt, evt.geostoryId);
        const geostoryId =
          (evt as any).primitive?.olFeature?.id ??
          // 1) si el wrapper ya lo pusiera (por si acaso)
          (evt as any).geostoryId ??
          // 2) entity.id (a veces se usa para guardar el id “lógico”)
          picked?.id?.geostoryId ??
          // 3) Cesium Entity -> properties
          picked?.id?.properties?.geostory_id?.getValue?.() ??
          picked?.id?.properties?.geostoryId?.getValue?.() ??
          // 4) primitive.id (cuando pick devuelve un Primitive con id custom)
          picked?.primitive?.id?.geostoryId ??
          picked?.primitive?.id?.geostory_id ??
          // 5) primitive.id.properties (si el id es un Entity-like)
          picked?.primitive?.id?.properties?.geostory_id?.getValue?.() ??
          picked?.primitive?.id?.properties?.geostoryId?.getValue?.();

        if (geostoryId) {
          console.log('Clicked geostory (3D):', geostoryId);
        } else {
          console.log('3D click (no geostory picked):', picked);
        }
        return;
      }

      // --- 2D (OpenLayers) click event ---
      const olEvt = evt as MapBrowserEvent<any>;
      if (!olEvt?.pixel) {
        console.log('Click event has no evt.pixel (not an OL click):', evt);
        return;
      }

      let hit = false;

      map.forEachFeatureAtPixel(
        olEvt.pixel,
        (feature) => {
          hit = true;
          console.log('Clicked feature (2D):', {
            layerId: feature.get('layerId'),
            geostoryId: feature.get('geostory_id'),
          });
          return true;
        },
        { hitTolerance: 6 }
      );

      if (!hit) console.log('No feature hit at pixel', olEvt.pixel);
    },
    [controller]
  );

  return (
    <div className="relative h-full w-full">
      <Map3D
        start3D={true}
        onReady={(m) => {
          setController(m);
        }}
        onClick={handleClick}
        layers={!!pinsLayer ? [pinsLayer] : []}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

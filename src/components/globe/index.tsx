'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import 'ol/ol.css';
import 'cesium/Build/Cesium/Widgets/widgets.css';

import * as Cesium from 'cesium';
import { Feature, MapBrowserEvent, MapEvent } from 'ol';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import XYZ from 'ol/source/XYZ';
import View from 'ol/View';
import OLCesium from 'olcs';

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';

export type Map3DHandle = {
  getMap: () => Map | null;
  enable3D: (enabled: boolean) => void;
  is3DEnabled: () => boolean;
  getCesiumScene: () => any | null;
};

type CesiumClickEvent = {
  type: 'cesium-click';
  picked?: any; // Cesium pick result
  position?: any;
};

export type Map3DClickEvent = MapBrowserEvent<any> | CesiumClickEvent;

type Props = {
  start3D?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onReady?: (handle: Map3DHandle) => void;

  /**
   * Click:
   * - 2D: OL click event
   * - 3D: { type:'cesium-click', geostoryId?, picked, movement }
   */
  onClick?: (evt: Map3DClickEvent) => void;

  layers?: VectorLayer<VectorSource<Feature<Point>>, Feature<Point>>[];
  globePadding?: number;
  initialCenter?: [number, number];
};

const applyFog = (scene: Cesium.Scene) => {
  scene.fog.enabled = true;

  // Cesium fog density is usually a very small number.
  // Start here and tweak.
  scene.fog.density = 0.00012;

  // Prevent the horizon from getting too dark
  scene.fog.minimumBrightness = 0.25;
};

export default function Map3D({
  onReady,
  onClick,
  start3D = true,
  style,
  className,
  layers = [],
  globePadding = 1.08,
  initialCenter = [20, 15],
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const olCesiumRef = useRef<any>(null);
  const cesiumClickHandlerRef = useRef<any>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const [cesiumEnabled, setCesiumEnabled] = useState(false);

  const enable3D = useCallback((enabled: boolean) => {
    const ol3d = olCesiumRef.current;
    if (!ol3d) return;

    ol3d.setEnabled(enabled);
    setCesiumEnabled(enabled);
    (mapRef.current as any)?.renderSync?.();
  }, []);

  const is3DEnabled = useCallback(() => {
    return !!olCesiumRef.current?.getEnabled?.();
  }, []);

  const getCesiumScene = useCallback(() => {
    return olCesiumRef.current?.getCesiumScene?.() ?? null;
  }, []);

  const handle: Map3DHandle = useMemo(
    () => ({
      getMap: () => mapRef.current,
      enable3D,
      is3DEnabled,
      getCesiumScene,
    }),
    [enable3D, is3DEnabled, getCesiumScene]
  );

  const syncLayers = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    const current = map.getLayers().getArray();
    for (const lyr of layers) {
      if (!current.includes(lyr)) map.addLayer(lyr);
    }
    (map as any).renderSync?.();
  }, [layers]);

  const fitGlobeToViewport = useCallback(() => {
    const scene = olCesiumRef.current?.getCesiumScene?.();
    if (!scene) return;

    scene.fog.enabled = true;

    // Cesium fog density is usually a very small number.
    // Start here and tweak.
    scene.fog.density = 0.0007;

    // Prevent the horizon from getting too dark
    scene.fog.minimumBrightness = 0.25;
    const camera = scene.camera;
    const canvas = scene.canvas;

    const width = canvas?.clientWidth || 0;
    const height = canvas?.clientHeight || 0;
    if (!width || !height) return;

    const R = Cesium.Ellipsoid.WGS84.maximumRadius;

    const frustum: any = camera.frustum;
    const fovy = frustum?.fovy;
    if (!fovy) return;

    const aspect = width / height;
    const fovx = 2 * Math.atan(Math.tan(fovy / 2) * aspect);
    const minFov = Math.min(fovy, fovx);

    const distanceFromCenter = (R / Math.sin(minFov / 2)) * globePadding;

    const heightAboveEllipsoid = Math.max(distanceFromCenter - R, 10_000);

    const [lon, lat] = initialCenter;

    camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(lon, lat, heightAboveEllipsoid),
      orientation: {
        heading: 0,
        pitch: -Math.PI / 2,
        roll: 0,
      },
    });

    camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  }, [globePadding, initialCenter]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) return;

    (globalThis as any).Cesium = Cesium;
    (Cesium as any).buildModuleUrl?.setBaseUrl?.('/cesium/');

    const map = new Map({
      target: containerRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://a.tile.opentopomap.org/{z}/{x}/{y}.png',
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection: 'EPSG:3857',
      }),
      controls: [],
    });

    mapRef.current = map;

    const ol3d = new OLCesium({ map });
    olCesiumRef.current = ol3d;

    onReady?.(handle);

    ol3d.setEnabled(true);
    setCesiumEnabled(true);

    const scene = ol3d.getCesiumScene?.();
    if (scene) {
      const ctrl = scene.screenSpaceCameraController;
      ctrl.enableZoom = true;
      ctrl.enableRotate = true;
      ctrl.enableTilt = true;
      ctrl.enableTranslate = true;

      fitGlobeToViewport();
      requestAnimationFrame(() => fitGlobeToViewport());

      if (onClick) {
        const h = new (Cesium as any).ScreenSpaceEventHandler(scene.canvas);
        cesiumClickHandlerRef.current = h;

        h.setInputAction((movement: any) => {
          const pos = movement?.position ?? movement?.endPosition;
          if (!pos) return;

          const picked = scene.pick(pos);
          if (!picked) return;

          const olFeature =
            picked?.primitive?.olFeature ??
            picked?.primitive?.id?.olFeature ??
            picked?.id?.olFeature;
          const geostoryId = olFeature?.getProperties()?.geostory_id;
          console.log(olFeature, geostoryId);

          onClick({
            type: 'cesium-click',
            olFeature,
            geostoryId,
            picked,
            movement,
          });
        }, (Cesium as any).ScreenSpaceEventType.LEFT_CLICK);
      }

      // Refit en resize
      resizeObserverRef.current = new ResizeObserver(() => {
        if (ol3d.getEnabled?.()) requestAnimationFrame(() => fitGlobeToViewport());
      });
      resizeObserverRef.current.observe(containerRef.current);
    }

    (map as any).renderSync?.();
    requestAnimationFrame(() => (map as any).renderSync?.());

    return () => {
      cesiumClickHandlerRef.current?.destroy?.();
      cesiumClickHandlerRef.current = null;

      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;

      olCesiumRef.current?.setEnabled(false);
      olCesiumRef.current = null;

      map.setTarget(undefined);
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onReady, onClick, start3D, fitGlobeToViewport]);

  useEffect(() => {
    syncLayers();
  }, [syncLayers]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        ...style,
        visibility: start3D && !cesiumEnabled ? 'hidden' : 'visible',
      }}
    />
  );
}

'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import 'ol/ol.css';
import 'cesium/Build/Cesium/Widgets/widgets.css';

import * as Cesium from 'cesium';
import { Feature, MapBrowserEvent } from 'ol';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import XYZ from 'ol/source/XYZ';
import View from 'ol/View';
import OLCesium from 'olcs';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Point } from 'ol/geom';

const DEFAULT_CENTER: [number, number] = [20, 15];

export type Map3DHandle = {
  getMap: () => Map | null;
  enable3D: (enabled: boolean) => void;
  is3DEnabled: () => boolean;
  getCesiumScene: () => any | null;
  getViewer?: () => any | null;
  flyToBounds: (extent: [number, number, number, number]) => void;
  flyToDefault: () => void;
};

export type CesiumClickEvent = {
  type: 'cesium-click';
  picked?: any;
  position?: { cartesian: any; lonLat: [number, number] | null };
  olFeature?: Feature<any>;
  geostoryId?: string | number;
  movement?: any;
};

export type Map3DClickEvent = MapBrowserEvent<any> | CesiumClickEvent;

type Props = {
  start3D?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onReady?: (handle: Map3DHandle) => void;
  onClick?: (evt: Map3DClickEvent) => void;
  layers?: VectorLayer<VectorSource<Feature<Point>>, Feature<Point>>[];
  globePadding?: number;
  initialCenter?: [number, number];
};

const MARGIN_X_DESKTOP = 50;
const MARGIN_Y_DESKTOP = 200;

function computeFullGlobeHeight(scene: any, globePadding: number): number | null {
  const camera = scene.camera;
  const canvas = scene.canvas;

  const width = (canvas?.clientWidth ?? 0) - MARGIN_X_DESKTOP;
  const height = (canvas?.clientHeight ?? 0) - MARGIN_Y_DESKTOP;
  if (!width || !height) return null;

  const R = Cesium.Ellipsoid.WGS84.maximumRadius;
  const frustum: any = camera.frustum;
  const fovy = frustum?.fovy;
  if (!fovy) return null;

  const aspect = width / height;
  const fovx = 2 * Math.atan(Math.tan(fovy / 2) * aspect);
  const minFov = Math.min(fovy, fovx);

  const distanceFromCenter = (R / Math.sin(minFov / 2)) * globePadding;
  return Math.max(distanceFromCenter - R, 10_000);
}

export default function Map3D({
  onReady,
  onClick,
  start3D = true,
  style,
  className,
  layers = [],
  globePadding = 1.3,
  initialCenter = DEFAULT_CENTER,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const olCesiumRef = useRef<any>(null);
  const cesiumClickHandlerRef = useRef<any>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const hasResizedOnceRef = useRef(false);

  const onReadyRef = useRef(onReady);
  const onClickRef = useRef(onClick);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    onClickRef.current = onClick;
  }, [onClick]);

  const [cesiumEnabled, setCesiumEnabled] = useState(false);

  const enable3D = useCallback((enabled: boolean) => {
    const ol3d = olCesiumRef.current;
    if (!ol3d) return;

    ol3d.setEnabled(enabled);
    setCesiumEnabled(enabled);
  }, []);

  const is3DEnabled = useCallback(() => {
    return !!olCesiumRef.current?.getEnabled?.();
  }, []);

  const getCesiumScene = useCallback(() => {
    return olCesiumRef.current?.getCesiumScene?.() ?? null;
  }, []);

  const fitGlobeToViewport = useCallback(() => {
    const scene = olCesiumRef.current?.getCesiumScene?.();
    if (!scene) return;

    scene.fog.enabled = true;
    scene.fog.density = 0.0007;
    scene.fog.minimumBrightness = 0.25;

    const heightAboveEllipsoid = computeFullGlobeHeight(scene, globePadding);
    if (heightAboveEllipsoid === null) return;

    const [lon, lat] = initialCenter;

    scene.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(lon, lat, heightAboveEllipsoid),
      orientation: {
        heading: 0,
        pitch: -Math.PI / 2,
        roll: 0,
      },
    });

    scene.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  }, [globePadding, initialCenter]);

  const flyToDefault = useCallback(() => {
    const scene = olCesiumRef.current?.getCesiumScene?.();
    if (!scene) return;

    scene.camera.cancelFlight();

    const heightAboveEllipsoid = computeFullGlobeHeight(scene, globePadding);
    if (heightAboveEllipsoid === null) return;

    const [lon, lat] = DEFAULT_CENTER;

    scene.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(lon, lat, heightAboveEllipsoid),
      orientation: {
        heading: 0,
        pitch: -Math.PI / 2,
        roll: 0,
      },
      duration: 1.5,
    });
  }, [globePadding]);

  const flyToBounds = useCallback(
    (extent: [number, number, number, number]) => {
      const scene = olCesiumRef.current?.getCesiumScene?.();
      if (!scene) return;

      scene.camera.cancelFlight();

      const heightAboveEllipsoid = computeFullGlobeHeight(scene, globePadding);
      if (heightAboveEllipsoid === null) return;

      const [west, south, east, north] = extent;
      const centerLon = (west + east) / 2;
      const centerLat = (south + north) / 2;

      scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(centerLon, centerLat, heightAboveEllipsoid),
        orientation: {
          heading: 0,
          pitch: -Math.PI / 2,
          roll: 0,
        },
        duration: 1.5,
      });
    },
    [globePadding]
  );

  const handle: Map3DHandle = useMemo(
    () => ({
      getMap: () => mapRef.current,
      enable3D,
      is3DEnabled,
      getCesiumScene,
      flyToBounds,
      flyToDefault,
    }),
    [enable3D, is3DEnabled, getCesiumScene, flyToBounds, flyToDefault]
  );

  // Layer synchronization: diff the OL map's layers against the layers prop
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const group = map.getLayers();
    const current = group.getArray();

    // Remove layers no longer in props (skip base tile layer at index 0)
    for (let i = current.length - 1; i >= 1; i--) {
      const lyr = current[i];
      if (!layers.includes(lyr as any)) {
        group.removeAt(i);
      }
    }

    // Add layers from props that are not yet on the map
    for (const lyr of layers) {
      if (!current.includes(lyr)) {
        group.push(lyr);
      }
    }
  }, [layers]);

  // Mount-only initialization
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
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attributions: '&copy; Esri &mdash; Esri, Earthstar Geographics',
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

    ol3d.setEnabled(true);
    setCesiumEnabled(true);

    const scene = ol3d.getCesiumScene?.();
    if (scene) {
      const ctrl = scene.screenSpaceCameraController;
      ctrl.enableZoom = false;
      ctrl.enableRotate = true;
      ctrl.enableTilt = true;
      ctrl.enableTranslate = true;

      scene.backgroundColor = Cesium.Color.fromCssColorString('#09131d');
      scene.skyBox = undefined;

      // Atmospheric limb glow
      if (!scene.skyAtmosphere) {
        scene.skyAtmosphere = new Cesium.SkyAtmosphere();
      }
      scene.skyAtmosphere.show = true;
      scene.skyAtmosphere.perFragmentAtmosphere = true;
      scene.skyAtmosphere.hueShift = 0.0;
      scene.skyAtmosphere.saturationShift = 0.4;
      scene.skyAtmosphere.brightnessShift = -0.9;
      scene.skyAtmosphere.atmosphereLightIntensity = 0.0;

      scene.globe.showGroundAtmosphere = true;

      // Directional light from top-left; follows camera so shadow stays at bottom-right
      scene.globe.enableLighting = true;
      scene.light = new Cesium.DirectionalLight({
        direction: new Cesium.Cartesian3(0.5, -0.5, -0.7),
      });
      scene.preRender.addEventListener(() => {
        const cam = scene.camera;
        const lightDir = new Cesium.Cartesian3(
          cam.right.x * 0.5 - cam.up.x * 0.7 + cam.direction.x * 0.5,
          cam.right.y * 0.5 - cam.up.y * 0.7 + cam.direction.y * 0.5,
          cam.right.z * 0.5 - cam.up.z * 0.7 + cam.direction.z * 0.5
        );
        Cesium.Cartesian3.normalize(lightDir, lightDir);
        scene.light.direction = lightDir;
      });

      fitGlobeToViewport();
      requestAnimationFrame(() => fitGlobeToViewport());

      cesiumClickHandlerRef.current = new Cesium.ScreenSpaceEventHandler(scene.canvas);
      cesiumClickHandlerRef.current.setInputAction((movement: any) => {
        const pos = movement?.position ?? movement?.endPosition;
        if (!pos) return;

        const picked = scene.pick(pos);

        const ray = scene.camera.getPickRay(pos);
        const cartesian = ray ? scene.globe.pick(ray, scene) : null;

        let lonLat: [number, number] | null = null;
        if (cartesian) {
          const c = Cesium.Cartographic.fromCartesian(cartesian);
          lonLat = [Cesium.Math.toDegrees(c.longitude), Cesium.Math.toDegrees(c.latitude)];
        }

        const olFeature =
          picked?.primitive?.olFeature ?? picked?.primitive?.id?.olFeature ?? picked?.id?.olFeature;

        const geostoryId = olFeature?.getProperties?.()?.geostory_id;

        onClickRef.current?.({
          type: 'cesium-click',
          picked,
          movement,
          olFeature,
          geostoryId,
          position: { cartesian, lonLat },
        });
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      // Only refit on first resize after mount
      resizeObserverRef.current = new ResizeObserver(() => {
        if (!hasResizedOnceRef.current && ol3d.getEnabled?.()) {
          hasResizedOnceRef.current = true;
          requestAnimationFrame(() => fitGlobeToViewport());
        }
      });
      resizeObserverRef.current.observe(containerRef.current);
    }

    onReadyRef.current?.(handle);

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
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        ...style,
      }}
    />
  );
}

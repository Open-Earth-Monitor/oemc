'use client';

import { useCallback, useEffect, useRef } from 'react';

import * as Cesium from 'cesium';
import { useCesium } from 'resium';

const MARGIN_X_DESKTOP = 50;
const MARGIN_Y_DESKTOP = 200;

export function computeFullGlobeHeight(scene: Cesium.Scene, globePadding: number): number | null {
  const camera = scene.camera;
  const canvas = scene.canvas;

  const width = (canvas?.clientWidth ?? 0) - MARGIN_X_DESKTOP;
  const height = (canvas?.clientHeight ?? 0) - MARGIN_Y_DESKTOP;
  if (!width || !height) return null;

  const R = Cesium.Ellipsoid.WGS84.maximumRadius;
  const frustum = camera.frustum as Cesium.PerspectiveFrustum;
  const fovy = frustum?.fovy;
  if (!fovy) return null;

  const aspect = width / height;
  const fovx = 2 * Math.atan(Math.tan(fovy / 2) * aspect);
  const minFov = Math.min(fovy, fovx);

  const distanceFromCenter = (R / Math.sin(minFov / 2)) * globePadding;
  return Math.max(distanceFromCenter - R, 10_000);
}

type Props = {
  globePadding: number;
  initialCenter: [number, number];
};

export default function CameraConstraints({ globePadding, initialCenter }: Props) {
  const { scene } = useCesium();
  const hasSetInitialView = useRef(false);

  const fitGlobeToViewport = useCallback(() => {
    if (!scene) return;

    scene.fog.enabled = true;
    scene.fog.density = 0.0007;
    scene.fog.minimumBrightness = 0.25;

    const heightAboveEllipsoid = computeFullGlobeHeight(scene, globePadding);
    if (heightAboveEllipsoid === null) return;

    const [lon, lat] = initialCenter;
    scene.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(lon, lat, heightAboveEllipsoid),
      orientation: { heading: 0, pitch: -Math.PI / 2, roll: 0 },
    });
    scene.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  }, [scene, globePadding, initialCenter]);

  useEffect(() => {
    if (!scene) return;

    const ctrl = scene.screenSpaceCameraController;
    ctrl.enableZoom = false;
    ctrl.enableRotate = true;
    ctrl.enableTilt = true;
    ctrl.enableTranslate = true;

    if (!hasSetInitialView.current) {
      fitGlobeToViewport();
      requestAnimationFrame(() => fitGlobeToViewport());
      hasSetInitialView.current = true;
    }
  }, [scene, fitGlobeToViewport]);

  return null;
}

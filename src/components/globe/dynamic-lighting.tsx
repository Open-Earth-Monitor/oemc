'use client';

import { useEffect } from 'react';

import * as Cesium from 'cesium';
import { useCesium } from 'resium';

export default function DynamicLighting() {
  const { scene } = useCesium();

  useEffect(() => {
    if (!scene) return;

    scene.light = new Cesium.DirectionalLight({
      direction: new Cesium.Cartesian3(0, 0, -1),
      intensity: 5.0,
    });

    const onPreRender = () => {
      const cam = scene.camera;
      // Light comes from upper-left relative to camera, creating dramatic
      // shadow on the bottom-right of the globe. The offset from cam.direction
      // ensures the dark/light boundary is clearly visible.
      const lightDir = new Cesium.Cartesian3(
        cam.right.x * 0.5 - cam.up.x * 0.7 + cam.direction.x * 0.5,
        cam.right.y * 0.5 - cam.up.y * 0.7 + cam.direction.y * 0.5,
        cam.right.z * 0.5 - cam.up.z * 0.7 + cam.direction.z * 0.5
      );
      Cesium.Cartesian3.normalize(lightDir, lightDir);
      (scene.light as Cesium.DirectionalLight).direction = lightDir;
    };

    scene.preRender.addEventListener(onPreRender);

    return () => {
      if (!scene.isDestroyed()) {
        scene.preRender.removeEventListener(onPreRender);
      }
    };
  }, [scene]);

  return null;
}

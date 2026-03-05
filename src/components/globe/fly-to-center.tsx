'use client';

import { useEffect, useState } from 'react';

import * as Cesium from 'cesium';
import { CameraFlyTo, useCesium } from 'resium';

import { computeFullGlobeHeight } from './camera-constraints';

type Props = {
  lonLat: [number, number];
  flyKey: string;
  globePadding: number;
};

export default function FlyToCenter({ lonLat, flyKey, globePadding }: Props) {
  const { scene } = useCesium();
  const [destination, setDestination] = useState<Cesium.Cartesian3 | null>(null);

  useEffect(() => {
    if (!scene) return;
    const height = computeFullGlobeHeight(scene, globePadding);
    if (height === null) return;
    setDestination(Cesium.Cartesian3.fromDegrees(lonLat[0], lonLat[1], height));
  }, [scene, lonLat, globePadding]);

  if (!destination) return null;

  return (
    <CameraFlyTo
      key={flyKey}
      destination={destination}
      orientation={{ heading: 0, pitch: -Math.PI / 2, roll: 0 }}
      duration={1.5}
    />
  );
}

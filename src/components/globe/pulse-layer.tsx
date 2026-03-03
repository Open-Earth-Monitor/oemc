'use client';

import { useEffect, useRef } from 'react';

import * as Cesium from 'cesium';
import { useCesium } from 'resium';

import type { GeostoryPin } from '@/app/globe/geostory-pins';

import { colorForCategory, createPulseDiamondDataUrl } from './diamond-pin';
import { cesiumColorFromCss, phaseOffsetFromId, pulseColor, pulseScale } from './pulse-animation';

type PulseBillboard = {
  billboard: Cesium.Billboard;
  baseColor: Cesium.Color;
  phaseOffset: number;
};

type Props = {
  pins: GeostoryPin[];
};

/**
 * Imperatively managed pulse layer that renders a BillboardCollection
 * with per-frame animation (scale + opacity) for each geostory pin.
 *
 * Each pin gets a companion diamond billboard that scales up (1x -> 3x)
 * while fading out (60% -> 0% opacity) on a 1.5s cycle, staggered by pin ID.
 */
export default function PulseLayer({ pins }: Props) {
  const { scene } = useCesium();
  const collectionRef = useRef<Cesium.BillboardCollection | null>(null);
  const billboardsRef = useRef<PulseBillboard[]>([]);

  useEffect(() => {
    if (!scene) return;

    const collection = new Cesium.BillboardCollection({ scene });
    scene.primitives.add(collection);
    collectionRef.current = collection;

    return () => {
      if (!scene.isDestroyed()) {
        scene.primitives.remove(collection);
      }
      collectionRef.current = null;
      billboardsRef.current = [];
    };
  }, [scene]);

  // Sync billboards with pins
  useEffect(() => {
    const collection = collectionRef.current;
    if (!collection) return;

    collection.removeAll();

    const entries: PulseBillboard[] = [];

    for (const pin of pins) {
      const cssColor = colorForCategory(pin.category);
      const imageUrl = createPulseDiamondDataUrl(cssColor);
      const baseColor = cesiumColorFromCss(cssColor);
      const offset = phaseOffsetFromId(pin.geostory_id);

      const billboard = collection.add({
        position: Cesium.Cartesian3.fromDegrees(pin.coordinates[0], pin.coordinates[1]),
        image: imageUrl,
        width: 12,
        height: 12,
        scale: 1.0,
        color: new Cesium.Color(baseColor.red, baseColor.green, baseColor.blue, 0.6),
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
      });

      entries.push({ billboard, baseColor, phaseOffset: offset });
    }

    billboardsRef.current = entries;
  }, [pins]);

  // Per-frame animation via preRender listener
  useEffect(() => {
    if (!scene) return;

    const onPreRender = () => {
      const now = performance.now();
      for (const entry of billboardsRef.current) {
        const s = pulseScale(now, entry.phaseOffset);
        const c = pulseColor(entry.baseColor, now, entry.phaseOffset);
        entry.billboard.scale = s;
        entry.billboard.color = c;
      }
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

'use client';

import React, { useCallback, useMemo, useRef } from 'react';

import 'cesium/Build/Cesium/Widgets/widgets.css';

import * as Cesium from 'cesium';
import {
  BillboardGraphics,
  Entity,
  Globe,
  ImageryLayer,
  Scene,
  ScreenSpaceEvent,
  ScreenSpaceEventHandler,
  SkyAtmosphere,
  Viewer,
} from 'resium';

import type { GeostoryPin } from '@/app/globe/geostory-pins';

import CameraConstraints from './camera-constraints';
import { colorForCategory, createDiamondDataUrl } from './diamond-pin';
import DynamicLighting from './dynamic-lighting';
import FlyToCenter from './fly-to-center';
import PulseLayer from './pulse-layer';

if (typeof window !== 'undefined') {
  (window as any).CESIUM_BASE_URL = '/cesium/';
  Cesium.Ion.defaultAccessToken = undefined;
}

const esriImageryProvider = new Cesium.UrlTemplateImageryProvider({
  url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  credit: new Cesium.Credit(
    'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer" target="_blank">Esri</a>'
  ),
});

const DEFAULT_CENTER: [number, number] = [20, 15];
const DARK_NAVY = Cesium.Color.fromCssColorString('#09131d');

export type GlobeClickEvent = {
  type: 'globe-click';
  geostoryId?: string;
  position?: { lonLat: [number, number] | null };
};

export type FlyTarget = {
  lonLat: [number, number];
  key: string;
};

type Props = {
  style?: React.CSSProperties;
  className?: string;
  onClick?: (evt: GlobeClickEvent) => void;
  pins?: GeostoryPin[];
  flyToCenter?: FlyTarget | null;
  globePadding?: number;
  initialCenter?: [number, number];
};

export default function Map3D({
  onClick,
  style,
  className,
  pins = [],
  flyToCenter = null,
  globePadding = 1.3,
  initialCenter = DEFAULT_CENTER,
}: Props) {
  const pinImages = useMemo(() => {
    const map = new Map<string, string>();
    for (const pin of pins) {
      const color = colorForCategory(pin.category);
      if (!map.has(color)) {
        map.set(color, createDiamondDataUrl(color));
      }
    }
    return map;
  }, [pins]);

  const entityClickedRef = useRef(false);

  const handleEntityClick = useCallback(
    (geostoryId: string) => {
      entityClickedRef.current = true;
      onClick?.({ type: 'globe-click', geostoryId });
    },
    [onClick]
  );

  const handleGlobeClick = useCallback(() => {
    if (entityClickedRef.current) {
      entityClickedRef.current = false;
      return;
    }
    onClick?.({
      type: 'globe-click',
      position: { lonLat: null },
    });
  }, [onClick]);

  return (
    <div
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%', ...style }}
    >
      <Viewer
        full
        animation={false}
        baseLayer={false}
        baseLayerPicker={false}
        fullscreenButton={false}
        geocoder={false}
        homeButton={false}
        infoBox={false}
        navigationHelpButton={false}
        sceneModePicker={false}
        selectionIndicator={false}
        timeline={false}
        skyBox={false}
      >
        <ImageryLayer imageryProvider={esriImageryProvider} />
        <Scene backgroundColor={DARK_NAVY} />
        <Globe
          enableLighting
          showGroundAtmosphere
          atmosphereHueShift={0.1}
          atmosphereSaturationShift={0.4}
          atmosphereBrightnessShift={-0.1}
        />
        <SkyAtmosphere
          show
          perFragmentAtmosphere
          hueShift={0.1}
          saturationShift={0.4}
          brightnessShift={-0.1}
          atmosphereLightIntensity={5.0}
        />
        <DynamicLighting />
        <CameraConstraints globePadding={globePadding} initialCenter={initialCenter} />

        {flyToCenter && (
          <FlyToCenter
            lonLat={flyToCenter.lonLat}
            flyKey={flyToCenter.key}
            globePadding={globePadding}
          />
        )}

        <ScreenSpaceEventHandler>
          <ScreenSpaceEvent
            type={Cesium.ScreenSpaceEventType.LEFT_CLICK}
            action={handleGlobeClick}
          />
        </ScreenSpaceEventHandler>

        <PulseLayer pins={pins} />

        {pins.map((pin) => {
          const color = colorForCategory(pin.category);
          const image = pinImages.get(color)!;
          return (
            <Entity
              key={pin.geostory_id}
              position={Cesium.Cartesian3.fromDegrees(pin.coordinates[0], pin.coordinates[1])}
              onClick={() => handleEntityClick(pin.geostory_id)}
            >
              <BillboardGraphics image={image} width={12} height={12} />
            </Entity>
          );
        })}
      </Viewer>
    </div>
  );
}

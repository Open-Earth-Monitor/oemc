'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
  useCesium,
  Viewer,
} from 'resium';

import cn from '@/lib/classnames';

import type { GeostoryPin } from '@/app/(landing)/geostory-pins';

import CameraConstraints from './camera-constraints';
import CesiumAttribution from './cesium-attribution';
import { colorForCategory, createDiamondDataUrl } from './diamond-pin';
import DynamicLighting from './dynamic-lighting';
import FlyToCenter from './fly-to-center';
import GlobeReady from './globe-ready';
import PulseLayer from './pulse-layer';

if (typeof window !== 'undefined') {
  (window as Window & { CESIUM_BASE_URL?: string }).CESIUM_BASE_URL = '/cesium/';
  Cesium.Ion.defaultAccessToken = undefined;
}

const esriImageryProvider = new Cesium.UrlTemplateImageryProvider({
  url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  credit: new Cesium.Credit(
    'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer" target="_blank">Esri</a>'
  ),
});

const DEFAULT_CENTER: [number, number] = [20, 15];
const TRANSPARENT = new Cesium.Color(0, 0, 0, 0);
const CONTEXT_OPTIONS = {
  webgl: { alpha: true, premultipliedAlpha: false },
};

export type GlobeClickEvent = {
  type: 'globe-click';
  geostoryId?: string;
  position?: { lonLat: [number, number] | null };
};

type HoverState = { title: string; x: number; y: number } | null;

function GlobePinInteraction({
  pinTitles,
  onHover,
  onClick,
}: {
  pinTitles: Map<string, string>;
  onHover: (state: HoverState) => void;
  onClick?: (evt: GlobeClickEvent) => void;
}) {
  const { scene } = useCesium();
  // Pin armed by the previous tap/hover; on touch a second tap of the same pin opens it.
  const activePinId = useRef<string | null>(null);
  // Touch devices have no pointer-leave, so auto-dismiss the tooltip after a tap.
  const touchTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isTouch = useRef(false);

  const pickId = useCallback(
    (position: Cesium.Cartesian2) => {
      const picked = scene?.pick(position);
      if (picked) {
        if (typeof picked.id === 'string') return picked.id;
        if (picked.id instanceof Cesium.Entity && typeof picked.id.id === 'string')
          return picked.id.id;
      }
      return undefined;
    },
    [scene]
  );

  const handleMove = useCallback(
    (evt: { endPosition: Cesium.Cartesian2 } | { position: Cesium.Cartesian2 }) => {
      if (!scene || isTouch.current) return; // touch handled on click, not hover
      const endPosition = 'endPosition' in evt ? evt.endPosition : evt.position;
      const id = pickId(endPosition);
      const title = id ? pinTitles.get(id) : undefined;
      scene.canvas.style.cursor = title ? 'pointer' : '';
      activePinId.current = title ? id! : null;
      onHover(title ? { title, x: endPosition.x, y: endPosition.y } : null);
    },
    [scene, pickId, pinTitles, onHover]
  );

  const handleClick = useCallback(
    (evt: { position: Cesium.Cartesian2 }) => {
      if (!scene) return;
      const id = pickId(evt.position);

      // Empty globe — clear tooltip and deselect.
      if (!id) {
        clearTimeout(touchTimeout.current);
        activePinId.current = null;
        onHover(null);
        onClick?.({ type: 'globe-click', position: { lonLat: null } });
        return;
      }

      // Mouse: hover already revealed the title, so a click opens immediately.
      // Touch: open only on the second tap of the already-armed pin.
      if (!isTouch.current || activePinId.current === id) {
        clearTimeout(touchTimeout.current);
        activePinId.current = null;
        onHover(null);
        scene.canvas.style.cursor = '';
        onClick?.({ type: 'globe-click', geostoryId: id });
        return;
      }

      // First tap — arm the pin and show its tooltip without opening.
      const title = pinTitles.get(id);
      activePinId.current = id;
      if (title) onHover({ title, x: evt.position.x, y: evt.position.y });
      clearTimeout(touchTimeout.current);
      touchTimeout.current = setTimeout(() => {
        activePinId.current = null;
        onHover(null);
      }, 2000);
    },
    [scene, pickId, pinTitles, onHover, onClick]
  );

  useEffect(() => {
    if (!scene) return;
    const canvas = scene.canvas;
    const onPointerDown = (e: PointerEvent) => {
      isTouch.current = e.pointerType === 'touch';
    };
    canvas.addEventListener('pointerdown', onPointerDown, { passive: true });
    return () => {
      clearTimeout(touchTimeout.current);
      canvas.removeEventListener('pointerdown', onPointerDown);
    };
  }, [scene]);

  return (
    <ScreenSpaceEventHandler>
      <ScreenSpaceEvent type={Cesium.ScreenSpaceEventType.MOUSE_MOVE} action={handleMove} />
      <ScreenSpaceEvent type={Cesium.ScreenSpaceEventType.LEFT_CLICK} action={handleClick} />
    </ScreenSpaceEventHandler>
  );
}

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

  const pinTitles = useMemo(() => {
    const map = new Map<string, string>();
    for (const pin of pins) {
      if (pin.title) map.set(pin.geostory_id, pin.title);
    }
    return map;
  }, [pins]);

  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const handleGlobeReady = useCallback(() => setIsGlobeReady(true), []);

  const [hover, setHover] = useState<HoverState>(null);

  return (
    <div
      className={cn(
        'relative h-full w-full transition-opacity duration-1000 ease-out',
        isGlobeReady ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={style}
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
        orderIndependentTranslucency={false}
        contextOptions={CONTEXT_OPTIONS}
      >
        <ImageryLayer imageryProvider={esriImageryProvider} />
        <Scene backgroundColor={TRANSPARENT} />
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
        <GlobeReady onReady={handleGlobeReady} />
        <DynamicLighting />
        <CameraConstraints globePadding={globePadding} initialCenter={initialCenter} />

        {flyToCenter && (
          <FlyToCenter
            lonLat={flyToCenter.lonLat}
            flyKey={flyToCenter.key}
            globePadding={globePadding}
          />
        )}

        <GlobePinInteraction pinTitles={pinTitles} onHover={setHover} onClick={onClick} />

        <PulseLayer pins={pins} />

        {pins.map((pin) => {
          const color = colorForCategory(pin.category);
          const image = pinImages.get(color)!;
          return (
            <Entity
              key={pin.geostory_id}
              id={pin.geostory_id}
              position={Cesium.Cartesian3.fromDegrees(pin.coordinates[0], pin.coordinates[1])}
            >
              <BillboardGraphics image={image} width={12} height={12} />
            </Entity>
          );
        })}

        <CesiumAttribution />
      </Viewer>

      {hover && (
        <div
          className="pointer-events-none absolute z-10 max-w-xs -translate-x-1/2 -translate-y-full rounded bg-secondary-900/90 px-2 py-1 text-xs font-medium text-white-500 shadow-md"
          style={{ left: hover.x, top: hover.y - 12 }}
        >
          {hover.title}
        </div>
      )}
    </div>
  );
}

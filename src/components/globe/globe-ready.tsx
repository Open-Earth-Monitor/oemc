'use client';

import { useEffect, useRef } from 'react';

import { useCesium } from 'resium';

type Props = {
  onReady: () => void;
};

export default function GlobeReady({ onReady }: Props) {
  const { scene } = useCesium();
  const firedRef = useRef(false);

  useEffect(() => {
    if (!scene || firedRef.current) return;

    const globe = scene.globe;
    const removeListener = globe.tileLoadProgressEvent.addEventListener((remaining: number) => {
      if (remaining === 0 && !firedRef.current) {
        firedRef.current = true;
        onReady();
        removeListener();
      }
    });

    return removeListener;
  }, [scene, onReady]);

  return null;
}

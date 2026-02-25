'use client';

import { useEffect } from 'react';

import * as Cesium from 'cesium';
import { useCesium } from 'resium';

const ESRI_URL =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';

export default function Basemap() {
  const { viewer } = useCesium();

  useEffect(() => {
    if (!viewer) return;

    const provider = new Cesium.UrlTemplateImageryProvider({
      url: ESRI_URL,
      credit: new Cesium.Credit('&copy; Esri &mdash; Esri, Earthstar Geographics'),
    });

    const layer = viewer.imageryLayers.addImageryProvider(provider, 0);

    return () => {
      if (!viewer.isDestroyed()) {
        viewer.imageryLayers.remove(layer);
      }
    };
  }, [viewer]);

  return null;
}

'use client';

import { useRef } from 'react';

import { RLayerWMS } from 'rlayers';

import { WMS_CRS } from '../constants';

const NutsLayer = () => {
  const nutsLayer = useRef(null);
  return (
    <RLayerWMS
      ref={nutsLayer}
      properties={{ label: 'NUTS' }}
      url="https://geoserver.earthmonitor.org/geoserver/oem/wms"
      opacity={0.2}
      params={{
        FORMAT: 'image/png',
        SERVICE: 'WMS',
        VERSION: '1.1.0',
        REQUEST: 'GetMap',
        TRANSPARENT: true,
        LAYERS: 'oem:NUTS_RG_01M_2021_3035',
        SRS: WMS_CRS, // WMS 1.1.0
        BBOX: [-20037508.34, -20037508.34, 20037508.34, 20037508.34],
        NAME: 'NUTS',
      }}
    />
  );
};

export default NutsLayer;

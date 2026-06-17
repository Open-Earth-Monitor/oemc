'use client';

import dynamic from 'next/dynamic';

// OpenLayers / rlayers touch `document` at render time, so the map must never be
// server-rendered. Loading it client-only avoids the SSR "document is not defined"
// crash and the resulting client-render fallback.
const Map = dynamic(() => import('@/components/map/index'), { ssr: false });

export default Map;

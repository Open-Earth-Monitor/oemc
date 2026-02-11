'use client';

import dynamic from 'next/dynamic';

const StaticMap = dynamic(() => import('@/components/map/static'), {
  ssr: false,
});

const StaticMapContainer = () => <StaticMap />;

export default StaticMapContainer;

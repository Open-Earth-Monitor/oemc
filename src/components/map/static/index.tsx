'use client';

import dynamic from 'next/dynamic';

import { FC } from 'react';

const StaticMapComponent = dynamic(() => import('@/components/map/static'), {
  ssr: false,
});

const StaticMap: FC = () => (
  <div className="relative h-full w-full">
    <StaticMapComponent />
  </div>
);

export default StaticMap;

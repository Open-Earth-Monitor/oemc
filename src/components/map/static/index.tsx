'use client';

import { FC } from 'react';

import dynamic from 'next/dynamic';

const StaticMapComponent = dynamic(() => import('@/components/map/static'), {
  ssr: false,
});

const StaticMap: FC = () => (
  <div className="relative h-full w-full">
    <StaticMapComponent />
  </div>
);

export default StaticMap;

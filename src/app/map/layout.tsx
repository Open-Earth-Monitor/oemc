import { FC, ReactNode } from 'react';

import type { Metadata } from 'next';

import Header from '@/components/header';
import Map from '@/doc-containers/map-implementation';
export const metadata: Metadata = {
  title: 'Map - Open-Earth-Monitor Cyberinfrastructure',
  description: '...',
};

const MapLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="relative h-full w-full flex-1">
        {children}
        <Map />
      </div>
    </div>
  );
};

export default MapLayout;

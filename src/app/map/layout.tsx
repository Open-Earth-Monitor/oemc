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
    <div className="absolute bottom-0 left-0 top-[58px] w-full flex-1">
      {children}
      <Map />
    </div>
  );
};

export default MapLayout;

import type { FC, ReactNode } from 'react';

import type { Metadata } from 'next';

import Header from '@/components/header';
import Map from '@/doc-containers/map-implementation';
export const metadata: Metadata = {
  title: 'Map - Open-Earth-Monitor Cyberinfrastructure',
  description: '...',
};

const MapLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex h-screen w-screen flex-col">
    <Header />
    <main className="relative h-full w-full flex-1">
      <aside className="md:[30vw] absolute bottom-3 left-5 top-3 z-50 w-[526px] overflow-y-auto bg-brand-500 p-7.5">
        {children}
      </aside>
      <Map />
    </main>
  </div>
);

export default MapLayout;

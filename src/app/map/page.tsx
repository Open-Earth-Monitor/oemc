import type { Metadata } from 'next';

import Sidebar from '@/containers/sidebar';

import Header from '@/components/header';
import Map from '@/doc-containers/map-implementation';
export const metadata: Metadata = {
  title: 'Map - Open-Earth-Monitor Cyberinfrastructure',
  description: '...',
};

const MapPage: React.FC = () => (
  <div className="flex h-screen w-screen flex-col">
    <Header />
    <main className="relative h-full w-full flex-1">
      <Sidebar />

      <Map />
    </main>
  </div>
);

export default MapPage;

import type { Metadata } from 'next';

import Sidebar from '@/containers/sidebar';

import Map from '@/doc-containers/map-implementation';
export const metadata: Metadata = {
  title: 'Map - Open-Earth-Monitor Cyberinfrastructure',
  description: '...',
};

const MapPage: React.FC = () => (
  <main className="relative flex h-screen w-screen flex-1">
    <Sidebar />

    <Map />
  </main>
);

export default MapPage;

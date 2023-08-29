import type { Metadata } from 'next';

import Sidebar from '@/containers/sidebar';

import Map from '@/doc-containers/map-implementation';
export const metadata: Metadata = {
  title: 'Map - Open-Earth-Monitor Cyberinfrastructure',
  description: '...',
};

const MapPage: React.FC = () => (
  <div className="flex h-screen w-screen">
    <Sidebar />
    <Map />
  </div>
);

export default MapPage;

import type { Metadata } from 'next';

import MonitorsDirectory from '@/components/monitors-directory';
export const metadata: Metadata = {
  title: 'Map - Open-Earth-Monitor Cyberinfrastructure',
  description: '...',
};

const MapPage: React.FC = () => <MonitorsDirectory />;

export default MapPage;

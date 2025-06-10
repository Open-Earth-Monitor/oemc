import type { NextPage } from 'next';

import MapSidebar from '@/components/sidebar';

const MapSidebarPage: NextPage = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <MapSidebar />
    </div>
  );
};

export default MapSidebarPage;

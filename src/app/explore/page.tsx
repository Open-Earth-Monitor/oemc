import type { NextPage } from 'next';

import MapSidebar from '@/components/sidebar';
import SidebarThemeFilters from '@/components/theme-filter/map-sidebar';
import { Sidebar, SidebarTrigger } from '@/components/ui/sidebar';

const MapSidebarPage: NextPage = () => {
  return (
    <div>
      <Sidebar className="left-[88px] w-96 bg-black-400 px-9 py-12">
        <SidebarThemeFilters />
        <div className="flex h-full w-full flex-col">
          <MapSidebar />
        </div>
      </Sidebar>
      <div className="w-full">
        <div className="absolute left-0 top-0 h-screen w-screen overflow-hidden">
          {/* Map + Trigger */}

          <SidebarTrigger />
        </div>
      </div>
    </div>
  );
};

export default MapSidebarPage;

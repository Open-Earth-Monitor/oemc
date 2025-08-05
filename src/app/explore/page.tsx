import type { NextPage } from 'next';

import { SIDEBAR_THEME_FILTERS } from '@/constants/sidebar';

import MapSidebar from '@/components/sidebar';
import SidebarThemeFilters from '@/components/theme-filter/map-sidebar';
import { Sidebar } from '@/components/ui/sidebar';

const MapSidebarPage: NextPage = () => {
  return (
    <div>
      <Sidebar className={`w-96 bg-black-400 px-9 py-12 left-[${SIDEBAR_THEME_FILTERS}px]`}>
        <SidebarThemeFilters />
        <div className="flex h-full w-full flex-col">
          <MapSidebar />
        </div>
      </Sidebar>
    </div>
  );
};

export default MapSidebarPage;

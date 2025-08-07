'use client';

import type { NextPage } from 'next';

import { SIDEBAR_THEME_FILTERS, SIDEBAR_WIDTH } from '@/constants/sidebar';

import MapSidebar from '@/components/sidebar';
import SidebarThemeFilters from '@/components/theme-filter/map-sidebar';
import { Sidebar, useSidebar } from '@/components/ui/sidebar';

const MapSidebarPage: NextPage = () => {
  const { open } = useSidebar();
  const left = open
    ? SIDEBAR_THEME_FILTERS
    : `calc(${SIDEBAR_THEME_FILTERS}px + ${SIDEBAR_WIDTH} * -1)`;

  return (
    <div>
      <Sidebar className="left= w-96 bg-black-400 px-9 py-12" style={{ left }}>
        <SidebarThemeFilters />
        <div className="flex h-full w-full flex-col">
          <MapSidebar />
        </div>
      </Sidebar>
    </div>
  );
};

export default MapSidebarPage;

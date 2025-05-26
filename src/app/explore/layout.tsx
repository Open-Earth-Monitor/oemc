'use client';

import { FC, PropsWithChildren } from 'react';

import Map from '@/components/map';
import SidebarFilters from '@/components/map-sidebar-filters';
import Sidebar from '@/components/sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const ExploreLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="relative">
      <SidebarFilters />
      <SidebarProvider>
        <Sidebar />
        <div className="w-full">
          <div className="absolute left-0 top-0 h-screen w-screen overflow-hidden">
            {/* Map + Trigger */}

            <SidebarTrigger />

            <Map />
          </div>
        </div>
      </SidebarProvider>
    </main>
  );
};

export default ExploreLayout;

import type { Metadata } from 'next';

import Map from '@/components/map';
import SidebarThemeFilters from '@/components/theme-filter/map-sidebar';
import { SidebarProvider, SidebarTrigger, Sidebar } from '@/components/ui/sidebar';

import MapHeader from '@/containers/explore/header';

export const metadata: Metadata = {
  title: 'Explore',
  description: 'Explore our Monitors & Geostories',
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <SidebarThemeFilters />
      <SidebarProvider>
        <Sidebar className="w-96 bg-black-400 px-9 py-12">{children}</Sidebar>
        <div className="w-full">
          <div className="absolute left-0 top-0 h-screen w-screen overflow-hidden">
            {/* Map + Trigger */}

            <SidebarTrigger />
          </div>
        </div>
      </SidebarProvider>
      {/* <MapHeader /> */}
      <div className="absolute left-0 top-0 h-screen w-screen overflow-hidden">
        <Map />
      </div>
    </div>
  );
}

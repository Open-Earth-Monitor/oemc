import type { Metadata } from 'next';

import MapLogo from '@/containers/explore/logo';

import MainMenuDesktop from '@/components/main-menu/desktop';
import Map from '@/components/map';
import { SidebarProvider, SidebarTrigger, Sidebar } from '@/components/ui/sidebar';

export const metadata: Metadata = {
  title: 'Explore',
  description: 'Explore our Monitors & Geostories',
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <SidebarProvider>
        <Sidebar className="w-96 bg-black-400 px-9 py-12">{children}</Sidebar>
        <div className="absolute left-0 top-0 h-screen w-screen overflow-hidden">
          <MapLogo />
          <SidebarTrigger />
        </div>
      </SidebarProvider>
      <div className="relative">
        <div className="absolute right-5 top-7 z-50">
          <MainMenuDesktop />
        </div>

        <div className="absolute left-0 top-0 h-screen w-screen overflow-hidden">
          <Map />
        </div>
      </div>
    </div>
  );
}

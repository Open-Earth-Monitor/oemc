import type { Metadata } from 'next';

import MainMenuDesktop from '@/components/main-menu/desktop';
import MainMenuMobile from '@/components/main-menu/mobile';
import Map from '@/components/map/index';
import SidebarWrapper from '@/components/sidebar-wrapper';
import { SidebarProvider } from '@/components/ui/sidebar';

export const metadata: Metadata = {
  title: 'Explore',
  description: 'Explore our Monitors & Geostories',
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <SidebarProvider>
        <SidebarWrapper>{children}</SidebarWrapper>
      </SidebarProvider>
      <div className="relative">
        <div className="absolute right-5 top-7 z-50 hidden md:block">
          <MainMenuDesktop />
        </div>
        <MainMenuMobile className="md:hidden" />

        <div className="absolute left-0 top-0 h-screen w-screen overflow-hidden">
          <Map />
        </div>
      </div>
    </div>
  );
}

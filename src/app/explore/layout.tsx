import type { Metadata } from 'next';

import Header from '@/components/header';
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
      <h1 className="sr-only">Explore – Open Earth Monitor</h1>
      <SidebarProvider>
        <SidebarWrapper>{children}</SidebarWrapper>
      </SidebarProvider>
      <div className="relative">
        <div className="absolute left-0 right-0 top-0 z-[1000]">
          <Header />
        </div>
        <div className="absolute left-0 top-0 h-screen w-screen overflow-hidden">
          <Map />
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';

import Map from '@/components/map';
import { SidebarProvider } from '@/components/ui/sidebar';

import MapHeader from '@/containers/explore/header';

export const metadata: Metadata = {
  title: 'Explore',
  description: 'Explore our Monitors & Geostories',
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <SidebarProvider>{children}</SidebarProvider>
      {/* <MapHeader /> */}
      <div className="absolute left-0 top-0 h-screen w-screen overflow-hidden">
        <Map />
      </div>
    </div>
  );
}

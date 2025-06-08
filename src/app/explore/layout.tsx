import Map from '@/components/map';
import SidebarThemeFilters from '@/components/theme-filter/map-sidebar';
import type { Metadata } from 'next';

const metadata: Metadata = {
  title: 'Explore',
  description: 'Explore our Monitors & Geostories',
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative">
      <SidebarThemeFilters />
      {children}

      <div className="absolute left-0 top-0 h-screen w-screen overflow-hidden">
        <Map />
      </div>
    </main>
  );
}

import MapSidebar from '@/components/sidebar';
import SidebarThemeFilters from '@/components/theme-filter/map-sidebar';
import { Sidebar } from '@/components/ui/sidebar';

export default function DesktopExploreToolbar() {
  return (
    <>
      <Sidebar className="left-[88px] w-[448px] bg-black-400 px-8 py-12">
        <SidebarThemeFilters />
        <div className="flex h-full w-full flex-col">
          <MapSidebar />
        </div>
      </Sidebar>
      <div className="w-full">
        <div className="absolute left-0 top-0 h-screen w-screen overflow-hidden">
          {/* Map + Trigger */}

          {/* <SidebarTrigger /> */}
        </div>
      </div>
    </>
  );
}

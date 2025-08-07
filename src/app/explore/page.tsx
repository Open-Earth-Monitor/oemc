'use client';

import type { NextPage } from 'next';

import DesktopExploreToolbar from '@/containers/explore/toolbar/desktop';
import MobileExploreNavbar from '@/containers/explore/toolbar/mobile/nav-bar';

const MapSidebarPage: NextPage = () => {
  return (
    <>
      <div className="hidden md:block">
        <DesktopExploreToolbar />
      </div>
      <div className="block md:hidden">
        <MobileExploreNavbar />
      </div>
    </>
  );
};

export default MapSidebarPage;

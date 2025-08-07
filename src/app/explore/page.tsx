'use client';

import type { NextPage } from 'next';

import DesktopExploreToolbar from '@/containers/explore/toolbar/desktop';
import MobileExploreToolbar from '@/containers/explore/toolbar/mobile';

const MapSidebarPage: NextPage = () => {
  return (
    <>
      <div className="hidden md:block">
        <DesktopExploreToolbar />
      </div>
      <div className="block md:hidden">
        <MobileExploreToolbar />
      </div>
    </>
  );
};

export default MapSidebarPage;

'use client';

import type { NextPage } from 'next';

import DesktopExploreToolbar from '@/containers/explore/toolbar/desktop';

const MapSidebarPage: NextPage = () => {
  return (
    <div className="hidden md:block">
      <DesktopExploreToolbar />
    </div>
  );
};

export default MapSidebarPage;

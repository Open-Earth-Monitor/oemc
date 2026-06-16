'use client';

import { useMediaQuery } from 'react-responsive';

import { mobile } from '@/lib/media-queries';

import SidebarAnchorElements from '@/containers/sidebar-anchor-elements';

import { Sidebar } from '@/components/ui/sidebar';

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery(mobile);
  return (
    <>
      {isMobile && children}
      {!isMobile && (
        <>
          <Sidebar className="w-[448px] overflow-x-hidden bg-black-400 px-8 py-12">
            {children}
          </Sidebar>
          <SidebarAnchorElements />
        </>
      )}
    </>
  );
}

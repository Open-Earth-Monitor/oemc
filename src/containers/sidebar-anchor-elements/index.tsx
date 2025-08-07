'use client';

import MapLogo from '@/containers/explore/logo';

import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';

import { usePathname } from 'next/navigation';

import { SIDEBAR_WIDTH, SIDEBAR_THEME_FILTERS } from '@/constants/sidebar';

const LOGO_PADDING = 10;

export default function SidebarAnchorElements() {
  const { open } = useSidebar();
  const pathname = usePathname();

  // Detect if current route is /explore/monitor/... or /explore/geostory/...
  const isMonitorOrGeostory =
    pathname?.startsWith('/explore/monitor/') || pathname?.startsWith('/explore/geostory/');

  // Adjust `left` depending on sidebar presence
  const left = open
    ? isMonitorOrGeostory
      ? `calc(${SIDEBAR_WIDTH} + ${LOGO_PADDING}px)`
      : `calc(${SIDEBAR_WIDTH} + ${SIDEBAR_THEME_FILTERS}px + ${LOGO_PADDING}px)`
    : isMonitorOrGeostory
    ? `${LOGO_PADDING}px`
    : `calc(${SIDEBAR_THEME_FILTERS}px + ${LOGO_PADDING}px)`;

  return (
    <div
      className="absolute top-0 h-screen w-screen overflow-hidden transition-[left] duration-300 ease-in-out"
      style={{ left }}
    >
      <MapLogo />
      <SidebarTrigger />
    </div>
  );
}

import type { FC, ReactNode } from 'react';

import MonitorContent from '@/components/monitors/content';
import SidebarFilters from '@/components/map-sidebar-filters';
import Map from '@/components/map';

const MonitorLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <MonitorContent>
        <SidebarFilters />
        {children}
      </MonitorContent>
      <Map />
    </>
  );
};

export default MonitorLayout;

import type { FC, ReactNode } from 'react';

import MonitorContent from '@/components/monitors/content';
import SidebarThemeFilters from '@/components/theme-filter/map-sidebar';
import Map from '@/components/map';

const MonitorLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <MonitorContent>
        <SidebarThemeFilters />
        {children}
      </MonitorContent>
      <Map />
    </>
  );
};

export default MonitorLayout;

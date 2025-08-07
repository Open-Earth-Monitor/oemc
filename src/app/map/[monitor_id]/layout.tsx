import type { FC, ReactNode } from 'react';

import Map from '@/components/map';
import MonitorContent from '@/components/monitors/content';

const MonitorLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <MonitorContent>{children}</MonitorContent>
      <Map />
    </>
  );
};

export default MonitorLayout;

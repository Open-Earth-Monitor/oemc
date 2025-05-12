import type { FC, ReactNode } from 'react';

import MonitorContent from '@/components/monitors/content';
import Header from '@/components/header';
import Map from '@/components/map';

const MonitorLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <MonitorContent>{children}</MonitorContent>
      <Map />
    </>
  );
};

export default MonitorLayout;

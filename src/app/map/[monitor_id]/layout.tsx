import { FC, ReactNode } from 'react';

import Map from '@/components/map';
import MonitorCard from '@/components/monitors/card';
import TabsNav from '@/components/tabs-nav';

const MonitorLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <section className="md:[30vw] absolute bottom-3 left-3 top-3 z-40 w-[526px] overflow-y-auto bg-brand-500 p-7.5">
        <div className="space-y-6">
          <MonitorCard />
          <TabsNav />
        </div>
        {children}
      </section>
      <Map />
    </>
  );
};

export default MonitorLayout;

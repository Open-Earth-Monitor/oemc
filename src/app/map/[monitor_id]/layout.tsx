import type { FC, ReactNode } from 'react';

import dynamic from 'next/dynamic';

import MonitorCard from '@/components/monitors/card';
import TabsNav from '@/components/tabs-nav';
import { ScrollArea } from '@/components/ui/scroll-area';

const Map = dynamic(() => import('@/components/map'), { ssr: false });

const MonitorLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <section className="md:[30vw] absolute bottom-3 left-3 top-3 z-40 w-[526px] overflow-hidden bg-brand-500">
        <ScrollArea className="h-full w-full p-7.5" type="auto">
          <div className="space-y-6">
            <MonitorCard />
            <TabsNav />
          </div>
          {children}
        </ScrollArea>
      </section>
      <Map />
    </>
  );
};

export default MonitorLayout;

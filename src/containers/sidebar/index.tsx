'use client';
import { FC } from 'react';

import { useMonitor } from '@/hooks/monitors';

import Loading from '@/components/loading';
import MonitorsList from '@/components/monitors-list';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
export const Sidebar: FC = () => {
  const { data, isLoading, isFetched, isError } = useMonitor({
    monitor_id: 'm1',
  });
  return (
    <aside className="absolute bottom-16 left-5 top-5 z-50 w-[30vw] overflow-y-auto bg-brand-600 p-7.5">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="geostories">Geostories</TabsTrigger>
        </TabsList>
        <TabsContent value="datasets">
          {' '}
          {isLoading && <Loading visible={isLoading} />}
          {isFetched && !isError && <MonitorsList monitor={data} />}
        </TabsContent>
        <TabsContent value="geostories"> </TabsContent>
      </Tabs>
    </aside>
  );
};

export default Sidebar;

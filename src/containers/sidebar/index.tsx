'use client';
import { FC, useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

import { useMonitor, useMonitors } from '@/hooks/monitors';

import Loading from '@/components/loading';
import MonitorDisplay from '@/components/monitors-datasets-display';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export const Sidebar: FC = () => {
  const { data: monitors } = useMonitors();
  const defaultMonitor = monitors?.[0];
  const params = useSearchParams();
  const paramsMonitor = params.get('monitor_id');
  const monitor_id = useMemo<string>(
    () => paramsMonitor || defaultMonitor?.id,
    [paramsMonitor, defaultMonitor]
  );
  const { data, isLoading, isFetched, isError } = useMonitor(
    {
      monitor_id: monitor_id,
    },
    {
      enabled: !!monitor_id,
    }
  );

  return (
    <aside className="absolute bottom-16 left-5 top-5 z-50 w-[30vw] min-w-[526px] overflow-y-auto bg-brand-600 p-7.5">
      <Tabs defaultValue="datasets">
        <TabsList>
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="geostories">Geostories</TabsTrigger>
        </TabsList>
        <TabsContent value="datasets">
          {' '}
          {isLoading && <Loading visible={isLoading} />}
          {isFetched && !isError && <MonitorDisplay monitor={data} />}
        </TabsContent>
        <TabsContent value="geostories"> </TabsContent>
      </Tabs>
    </aside>
  );
};

export default Sidebar;

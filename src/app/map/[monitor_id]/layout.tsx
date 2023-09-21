'use client';
import { useMemo, FC, ReactNode } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { useMonitor, useMonitors } from '@/hooks/monitors';

import MonitorsDirectoryTrigger from '@/components/monitors-directory-trigger';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const MapLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: monitors } = useMonitors();
  const defaultMonitor = monitors?.[0];
  const pathname = usePathname();
  const monitorId = pathname.split('/')[2];
  const tabId = pathname.split('/')[3];

  const router = useRouter();

  const monitor_id = useMemo<string>(
    () => monitorId || defaultMonitor?.id,
    [monitorId, defaultMonitor]
  );
  const { data, isFetched, isError } = useMonitor(
    {
      monitor_id: monitor_id,
    },
    {
      enabled: !!monitor_id,
    }
  );

  const handleTabs = (e: { currentTarget: { id: string } }) =>
    router.push(`/map/${monitor_id}/${e.currentTarget.id}`);

  return (
    <aside className="md:[30vw] absolute bottom-3 left-5 top-3 z-40 w-[526px] space-y-6 overflow-y-auto bg-brand-500 p-7.5">
      <div className="space-y-2 px-6 py-5" style={{ backgroundColor: data?.color }}>
        <MonitorsDirectoryTrigger />
        <div className="space-y-2 text-brand-500">
          <span className="font-inter text-xs">MONITOR</span>
          {isFetched && !isError ? (
            <h1 className="text-5xl">{data.title}</h1>
          ) : (
            <Skeleton className="h-[10px] w-[100px] rounded-sm" />
          )}
          {isFetched && !isError ? (
            <p>{data.description}</p>
          ) : (
            <Skeleton className="h-[5px] w-full rounded-sm py-2" />
          )}
        </div>
      </div>
      <Tabs defaultValue={tabId}>
        <TabsList>
          <TabsTrigger
            onClick={handleTabs}
            id="datasets"
            title="datasets"
            value="datasets"
            className="px-7.5 py-6"
          >
            Datasets
          </TabsTrigger>
          <TabsTrigger
            onClick={handleTabs}
            id="geostories"
            title="geostories"
            value="geostories"
            className="px-7.5 py-6"
          >
            Geostories
          </TabsTrigger>
        </TabsList>
        <TabsContent value="datasets">{children}</TabsContent>
        <TabsContent value="geostories">{children} </TabsContent>
      </Tabs>
    </aside>
  );
};

export default MapLayout;

'use client';
import { useMemo } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LayerTypes } from '@/types/datasets';

import { useMonitor, useMonitors } from '@/hooks/monitors';

import DatasetsList from '@/components/datasets-list';
import Loading from '@/components/loading';
import { buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const MonitorPage: React.FC = () => {
  const { data: monitors } = useMonitors();
  const defaultMonitor = monitors?.[0];
  const pathname = usePathname();
  const monitorId = pathname.split('/')[2];

  const monitor_id = useMemo<string>(
    () => monitorId || defaultMonitor?.id,
    [monitorId, defaultMonitor]
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
    <>
      <div className="space-y-2 bg-secondary-500 p-7.5">
        <Link href="/map" className={buttonVariants({ variant: 'dark' })}>
          Monitors Directory
        </Link>
        <div className=" space-y-2 text-brand-500">
          <span className="inter text-xs">MONITOR</span>
          {isFetched && !isError ? (
            <h2 className="text-5xl">{data.title}</h2>
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
      <Tabs defaultValue="datasets">
        <TabsList>
          <TabsTrigger value="datasets">Datasets</TabsTrigger>
          <TabsTrigger value="geostories">Geostories</TabsTrigger>
        </TabsList>
        <TabsContent value="datasets">
          {' '}
          {isLoading && <Loading visible={isLoading} />}
          {isFetched &&
            !isError &&
            data.geostories.map(({ id, layers }: { id: string; layers: LayerTypes[] }) => (
              <DatasetsList key={id} data={layers} />
            ))}
        </TabsContent>
        <TabsContent value="geostories"> </TabsContent>
      </Tabs>
    </>
  );
};

export default MonitorPage;

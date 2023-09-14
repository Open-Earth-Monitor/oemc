'use client';
import { FC, useMemo, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { LayerTypes } from '@/types/datasets';

import { useMonitor, useMonitors } from '@/hooks/monitors';

import DatasetsList from '@/components/datasets-list';
import Loading from '@/components/loading';
import MonitorsDirectory from '@/components/monitors-directory';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Sidebar: FC = () => {
  const [isMonitorsDirectoryOpen, setMonitorsDirectoryVisibility] = useState(false);
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
    <aside className="md:[30vw] absolute bottom-3 left-5 top-3 z-50 w-[526px] overflow-y-auto bg-brand-500 p-7.5">
      {!isMonitorsDirectoryOpen && (
        <div className="space-y-2 bg-secondary-500 p-7.5">
          <Button variant="dark" onClick={() => setMonitorsDirectoryVisibility(true)}>
            Monitors Directory
          </Button>
          {isLoading && <Loading visible={isLoading} />}
          {isFetched && !isError && (
            <div className=" text-brand-500">
              <span className="inter text-xs">MONITOR</span>
              <h2 className="text-5xl">{data.title}</h2>
              <p>{data.description}</p>
            </div>
          )}
        </div>
      )}
      {isMonitorsDirectoryOpen && <MonitorsDirectory />}
      {!isMonitorsDirectoryOpen && (
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
      )}
    </aside>
  );
};

export default Sidebar;

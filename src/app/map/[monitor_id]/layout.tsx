'use client';
import { FC, ReactNode } from 'react';

import { useParams, usePathname } from 'next/navigation';

import Loading from '@/app/loading';

import { useMonitor } from '@/hooks/monitors';

import Map from '@/containers/map';

import MonitorCard from '@/components/monitors/card';
import TabsNav from '@/components/tabs-nav';

const MonitorLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const params = useParams();
  const pathname = usePathname();
  const monitorId = params?.monitor_id as string;
  const tabId = pathname.split(`${monitorId}/`)[1];

  const { data, isLoading, isFetched, isError } = useMonitor(
    {
      monitor_id: monitorId,
    },
    {
      enabled: !!monitorId,
    }
  );

  return (
    <>
      <section className="md:[30vw] absolute bottom-3 left-3 top-3 z-40 w-[526px] overflow-y-auto bg-brand-500 p-7.5">
        {isLoading && !isFetched && <Loading />}
        {!isLoading && isFetched && (
          <>
            <div className="space-y-6">
              <MonitorCard data={data} isFetched={isFetched} isError={isError} />
              <TabsNav monitorId={monitorId} tabId={tabId} />
            </div>
            {children}
          </>
        )}
      </section>
      <Map />
    </>
  );
};

export default MonitorLayout;

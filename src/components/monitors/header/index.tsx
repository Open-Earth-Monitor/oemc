'use client';

import { FC } from 'react';

import { useParams } from 'next/navigation';

import { useMonitor } from '@/hooks/monitors';

import Loading from '@/components/loading';
import MonitorDialog from '@/components/monitors/dialog';
import MonitorsDirectoryDialog from '@/components/monitors/directory';
import { TAG_STYLE } from '@/styles/constants';

const MonitorHeader: FC = () => {
  const params = useParams();
  const monitorId = params?.monitor_id as string;

  const { data, isLoading, isFetched, isError } = useMonitor(
    {
      monitor_id: monitorId,
    },
    {
      enabled: !!monitorId,
    }
  );

  return (
    <div className="m-1 space-y-6 px-6 py-5" style={{ backgroundColor: data?.color }}>
      {isLoading && !isFetched && <Loading />}
      {!isLoading && isFetched && !isError && (
        <>
          <MonitorsDirectoryDialog />
          <div className="space-y-6 text-brand-500" data-testid="monitor-card">
            <div className="space-y-2">
              <div data-testid="monitor-tag" className={TAG_STYLE}>
                monitor
              </div>
              <h1
                data-testid="monitor-title"
                className="font-satoshi text-3xl font-bold sm:text-5xl"
              >
                {data.title}
              </h1>
            </div>
            {data.description && (
              <p className="hidden sm:block" data-testid="monitor-description">
                {data.description}
              </p>
            )}
            <div className="flex items-center">
              <MonitorDialog {...data} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MonitorHeader;

'use client';

import { FC } from 'react';

import { useParams } from 'next/navigation';

import { useMonitor } from '@/hooks/monitors';

import Loading from '@/components/loading';
import MonitorsDirectoryDialog from '@/components/monitors/dialog';
import { TAG_STYLE } from '@/styles/constants';

const MonitorCard: FC = () => {
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
    <div className="space-y-6 px-6 py-5" style={{ backgroundColor: data?.color }}>
      {isLoading && !isFetched && <Loading />}
      {!isLoading && isFetched && !isError && (
        <>
          <MonitorsDirectoryDialog />
          <div className="space-y-6 text-brand-500" data-testid="monitor-card">
            <div className="space-y-2">
              <div data-testid="monitor-tag" className={TAG_STYLE}>
                {data.entity_type || 'monitor'}
              </div>
              <h1 data-testid="monitor-title" className="font-satoshi text-5xl font-bold">
                {data.title}
              </h1>
            </div>
            {data.description && <p data-testid="monitor-description">{data.description}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default MonitorCard;

'use client';
import { FC } from 'react';

import type { MonitorColorTypes } from '@/types/datasets';

import MonitorsDirectoryDialog from '@/components/monitors/dialog';
import { Skeleton } from '@/components/ui/skeleton';
const MonitorCard: FC<{ data: MonitorColorTypes; isFetched: boolean; isError: boolean }> = ({
  data,
  isFetched,
  isError,
}) => {
  return (
    <div className="space-y-2 px-6 py-5" style={{ backgroundColor: data?.color }}>
      <MonitorsDirectoryDialog />
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
  );
};

export default MonitorCard;

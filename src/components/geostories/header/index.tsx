'use client';
import { FC } from 'react';

import type { GeostoryTypes } from '@/types/datasets';

import { Skeleton } from '@/components/ui/skeleton';
const GeostoryHead: FC<{ data: GeostoryTypes; isFetched: boolean; isError: boolean }> = ({
  data,
  isFetched,
  isError,
}) => {
  return (
    <div className="space-y-2 px-6 py-5">
      <div className="space-y-2 text-secondary-500">
        {/* TODO - get color from API when we get categories */}
        <span className="font-inter text-xs" style={{ color: 'hsl(60, 100%, 95%)' }}>
          GEOSTORY
        </span>
        {isFetched && !isError ? (
          <h1 className="text-3xl font-bold">{data.title}</h1>
        ) : (
          <Skeleton className="h-[10px] w-[100px] rounded-sm" />
        )}
        {isFetched && !isError ? (
          <p className="text-xl font-light">{data.description}</p>
        ) : (
          <Skeleton className="h-[5px] w-full rounded-sm py-2" />
        )}
      </div>
    </div>
  );
};

export default GeostoryHead;

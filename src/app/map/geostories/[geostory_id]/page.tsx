'use client';

import { useMemo } from 'react';

import Link from 'next/link';

import type { NextPage } from 'next';
import { HiArrowLeft } from 'react-icons/hi';

import type { MonitorParsed } from '@/types/monitors';

import { useGeostoryLayers } from '@/hooks/geostories';
import { useMonitors } from '@/hooks/monitors';

import DatasetCard from '@/components/datasets/card';
import GeostoryHead from '@/components/geostories/header';
import Loading from '@/components/loading';

const GeostoryPage: NextPage<{ params: { geostory_id: string } }> = ({
  params: { geostory_id },
}) => {
  const { data, isLoading, isFetched, isError } = useGeostoryLayers({ geostory_id });
  const { data: monitors } = useMonitors();
  const monitor = useMemo<MonitorParsed>(
    () => monitors?.find(({ geostories }) => geostories.map(({ id }) => id === geostory_id)),
    [monitors, geostory_id]
  );

  const { title: monitorTitle, id: monitorId, color } = monitor || {};

  return (
    <div className="space-y-6">
      <div className="divide-y divide-secondary-900">
        {monitorTitle && (
          <Link
            href={`/map/${monitorId}/geostories`}
            className="block space-x-3 pb-8 font-bold"
            data-testid="back-to-monitor"
            style={{ color }}
          >
            <HiArrowLeft className="inline-block h-6 w-6" />
            <span data-testid="monitor-title-back-btn">Back to {monitorTitle}.</span>
          </Link>
        )}
        <GeostoryHead geostoryId={geostory_id} color={color} />
      </div>
      <div>
        {isLoading && <Loading />}

        {isFetched && !isError && (
          <ul className="space-y-6" data-testid="datasets-list">
            {data.map((dataset, index) => (
              <li key={dataset.layer_id}>
                <DatasetCard {...dataset} id={dataset.layer_id} active={index === 0} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GeostoryPage;

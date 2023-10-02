'use client';

import type { NextPage } from 'next';

import { useMonitor, useMonitorGeostories } from '@/hooks/monitors';

import GeostoryCard from '@/components/geostories/card';
import Loading from '@/components/loading';

const GeostoriesPage: NextPage<{ params: { monitor_id: string } }> = ({ params }) => {
  const monitorId = params.monitor_id;

  const { data: monitor } = useMonitor({ monitor_id: monitorId }, { enabled: !!monitorId });
  const { data, isLoading, isFetched, isError } = useMonitorGeostories(
    { monitor_id: monitorId },
    { enabled: !!monitorId }
  );
  const { color } = monitor ?? {};

  return (
    <div>
      {isLoading && <Loading />}
      {isFetched && !isError && (
        <ul className="space-y-6 text-brand-500" data-testid="geostories-list">
          {data.map((geostory) => (
            <li key={geostory.id}>
              <GeostoryCard {...geostory} color={color} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GeostoriesPage;

'use client';

import { redirect } from 'next/navigation';

import { useMonitor, useMonitorGeostories } from '@/hooks/monitors';

import GeostoryItem from '@/components/geostories/item';
import Loading from '@/components/loading';

const GeostoriesPage: React.FC<{ monitor_id: string }> = ({ monitor_id }) => {
  const monitorId = monitor_id;

  const { data: monitor } = useMonitor({ monitor_id: monitorId }, { enabled: !!monitorId });
  const { data, error, isLoading, isFetched, isError } = useMonitorGeostories(
    { monitor_id: monitorId },
    { enabled: !!monitorId }
  );
  const { color } = monitor ?? {};

  if (error?.code === '400') return redirect('/not-found');

  return (
    <div>
      {isLoading && <Loading />}
      {isFetched && !isError && (
        <ul className="space-y-6 text-brand-500" data-testid="geostories-list">
          {data.map((geostory) => (
            <li key={geostory.id}>
              <GeostoryItem {...geostory} color={color} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GeostoriesPage;

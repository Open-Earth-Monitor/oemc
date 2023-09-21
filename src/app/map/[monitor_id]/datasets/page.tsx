'use client';
import { useMemo } from 'react';

import { usePathname } from 'next/navigation';

import { LayerTypes } from '@/types/datasets';

import { useMonitor, useMonitors } from '@/hooks/monitors';

import DatasetsItem from '@/components/datasets-list/datasets-item';
import Loading from '@/components/loading';

const DatasetsPage = () => {
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

  const { geostories } = data ?? { geostories: [] };

  return (
    <>
      {isLoading && <Loading visible={isLoading} />}
      {isFetched &&
        !isError &&
        geostories.map(({ id, layers }: { id: string; layers: LayerTypes[] }) => (
          <ul className="text-secondary-500" key={id}>
            {layers.map(({ layer_id, title, download_url, description, author }) => (
              <DatasetsItem
                key={layer_id}
                id={layer_id}
                title={title}
                download_url={download_url}
                description={description}
                author={author}
              />
            ))}
          </ul>
        ))}
    </>
  );
};

export default DatasetsPage;

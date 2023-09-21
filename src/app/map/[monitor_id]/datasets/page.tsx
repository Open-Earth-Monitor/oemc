'use client';

import { usePathname } from 'next/navigation';

import { useMonitorLayers } from '@/hooks/monitors';

import DatasetsItem from '@/components/datasets-list/datasets-item';
import Loading from '@/components/loading';

const DatasetsPage = () => {
  const pathname = usePathname();
  const monitorId = pathname.split('/')[2];
  const { data, isLoading, isFetched, isError } = useMonitorLayers({ monitor_id: monitorId });

  return (
    <>
      {isLoading && <Loading visible={isLoading} />}
      {isFetched && !isError && (
        <ul className="text-secondary-500">
          {data.map(({ layer_id, title, download_url, description, author }) => (
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
      )}
    </>
  );
};

export default DatasetsPage;

'use client';

import { usePathname } from 'next/navigation';

import { useMonitorLayers } from '@/hooks/monitors';

import DatasetsItem from '@/components/datasets/datasets-item';
import Loading from '@/components/loading';

const DatasetsPage = () => {
  const pathname = usePathname();
  const monitorId = pathname.split('/')[2];
  const { data, isLoading, isFetched, isError } = useMonitorLayers({ monitor_id: monitorId });

  return (
    <div className="m-auto w-full">
      {isLoading && <Loading visible={isLoading} />}
      {isFetched && !isError && (
        <ul className="text-secondary-500" data-testid="datasets-list">
          {data.map(({ layer_id, title, download_url, description, author, range }) => (
            <DatasetsItem
              key={layer_id}
              id={layer_id}
              title={title}
              download_url={download_url}
              description={description}
              author={author}
              range={range}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default DatasetsPage;

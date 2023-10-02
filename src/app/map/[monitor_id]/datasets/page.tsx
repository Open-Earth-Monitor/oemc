'use client';

import { usePathname } from 'next/navigation';

import { useMonitorLayers } from '@/hooks/monitors';

import DatasetCard from '@/components/datasets/card';
import Loading from '@/components/loading';

const DatasetsPage = () => {
  const pathname = usePathname();
  const monitorId = pathname.split('/')[2];
  const { data, isLoading, isFetched, isError } = useMonitorLayers({ monitor_id: monitorId });

  return (
    <div className="m-auto w-full">
      {isLoading && <Loading />}
      {isFetched && !isError && (
        <ul className="space-y-6 text-secondary-500" data-testid="datasets-list">
          {data.map(({ layer_id, title, download_url, description, author, range }) => (
            <li key={layer_id}>
              <DatasetCard
                id={layer_id}
                title={title}
                download_url={download_url}
                description={description}
                author={author}
                range={range}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DatasetsPage;

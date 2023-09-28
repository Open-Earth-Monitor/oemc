'use client';

import { useParams } from 'next/navigation';

import { useGeostory, useGeostoryLayers } from '@/hooks/geostories';

import DatasetItem from '@/components/datasets/datasets-item';
import GeostoryHead from '@/components/geostories/header';
import Loading from '@/components/loading';

const GeostoryPage = () => {
  const urlParams = useParams();
  const geostoryId = urlParams?.geostory_id as string;
  const {
    data: GeostoryData,
    isFetched: GeostoryIsFetched,
    isError: GeostoryIsError,
  } = useGeostory({ geostory_id: geostoryId });
  const { data, isLoading, isFetched, isError } = useGeostoryLayers({ geostory_id: geostoryId });

  return (
    <div className="m-auto w-full space-y-4 divide-y divide-brand-200">
      {isLoading && <Loading />}

      <GeostoryHead data={GeostoryData} isFetched={GeostoryIsFetched} isError={GeostoryIsError} />

      {isFetched && !isError && (
        <ul className="text-secondary-500" data-testid="datasets-list">
          {data.map(({ layer_id, title, download_url, description, author, range }) => (
            <DatasetItem
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

export default GeostoryPage;

import { FC } from 'react';

import type { Geostory } from '@/types/geostories';

import { useGeostory } from '@/hooks/geostories';

import Loading from '@/components/loading';

const GeostoryHead: FC<{ geostoryId: Geostory['id'] }> = ({ geostoryId }) => {
  const { data, isLoading, isFetched, isError } = useGeostory({ geostory_id: geostoryId });

  return (
    <div className="space-y-6 px-6 py-5 text-secondary-500">
      {isLoading && !isFetched && <Loading />}
      {/* TODO - get color from API when we get categories */}
      <div className="text-xs text-secondary-500">GEOSTORY</div>
      {isFetched && !isError && (
        <>
          <h1 className="font-satoshi text-4xl font-bold">{data.title}</h1>
          <p className="text-xl font-light">{data.description}</p>
        </>
      )}
    </div>
  );
};

export default GeostoryHead;

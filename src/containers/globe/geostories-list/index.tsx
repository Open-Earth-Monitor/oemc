'use client';

import Loading from '@/app/loading';

import { useGeostories } from '@/hooks/geostories';
import { useSyncCategories } from '@/hooks/sync-query';

import GeostoryItem from './item';

const GeostoriesList = () => {
  const [categories] = useSyncCategories();
  const { data: geostoriesList } = useGeostories({
    queryOptions: {
      select: (data) => {
        if (!!categories && categories !== 'All')
          return data.filter((d) => categories.includes(d.theme));
        return data;
      },
    },
  });
  const isLoading = false;

  return (
    <>
      <p className="text-xs font-medium text-accent-green">
        {geostoriesList?.length === 1 && `${geostoriesList?.length} Feature Geostory`}
        {geostoriesList?.length > 1 && `${geostoriesList?.length} Featured Geostories`}
      </p>

      <div className="flex flex-col space-y-2.5 overflow-y-auto">
        {isLoading && <Loading />}{' '}
        {!isLoading &&
          geostoriesList?.map((geostory) => <GeostoryItem key={geostory.id} {...geostory} />)}
      </div>
    </>
  );
};

export default GeostoriesList;

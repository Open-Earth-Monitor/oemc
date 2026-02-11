'use client';

import Loading from '@/app/loading';

import GeostoryItem from './item';

const GeostoriesList = ({ geostoriesList, isLoading }) => {
  return (
    <div className="h-full space-y-3 overflow-y-auto">
      <p className="text-xs font-medium text-accent-green">
        {geostoriesList?.length === 1 && `${geostoriesList?.length} Feature Geostory`}
        {geostoriesList?.length > 1 && `${geostoriesList?.length} Featured Geostories`}
      </p>

      <div className="flex min-h-0 flex-1 flex-col space-y-2.5">
        {isLoading && <Loading />}
        {!isLoading &&
          geostoriesList?.map((geostory) => <GeostoryItem key={geostory.id} {...geostory} />)}
      </div>
    </div>
  );
};

export default GeostoriesList;

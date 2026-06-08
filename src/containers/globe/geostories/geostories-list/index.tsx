'use client';

import Loading from '@/app/loading';

import { ScrollArea } from '@/components/ui/scroll-area';

import GeostoryItem from './item';

const FEATURED_GEOSTORIES = [
  'g1',
  'g2',
  'g3',
  'g4',
  'g5',
  'g7',
  'g10',
  'g11',
  'g12',
  'g19',
  'g21',
  'g23',
  'g31',
  'g32',
];

const GeostoriesList = ({ geostoriesList, isLoading }) => {
  const filteredGeostoriesList = geostoriesList?.filter((geostory) =>
    FEATURED_GEOSTORIES.includes(geostory.id)
  );
  return (
    <ScrollArea className="h-full w-full flex-1 lg:max-w-md">
      <div className="space-y-3 pr-8">
        <p
          className="text-xs font-medium text-accent-green"
          data-testid="featured-geostories-count"
        >
          {filteredGeostoriesList?.length === 1 &&
            `${filteredGeostoriesList?.length} Feature Geostory`}
          {filteredGeostoriesList?.length > 1 &&
            `${filteredGeostoriesList?.length} Featured Geostories`}
        </p>

        <div className="flex min-h-0 flex-1 flex-col space-y-2.5">
          {isLoading && <Loading />}
          {!isLoading &&
            filteredGeostoriesList?.length > 0 &&
            filteredGeostoriesList?.map((geostory) => (
              <GeostoryItem key={geostory.id} {...geostory} />
            ))}
          {!isLoading && filteredGeostoriesList?.length === 0 && (
            <p data-testid="no-geostories-found" className="text-sm text-white-500/20">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              We couldn't find any geostories for your search. Try different keywords or remove some
              filters.
            </p>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default GeostoriesList;

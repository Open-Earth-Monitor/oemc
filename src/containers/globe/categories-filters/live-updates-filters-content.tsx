import { LIVE_UPDATES_CONTENT } from '@/constants/live-updates';

import Item from './item-live-updates';

export const LiveUpdatesFiltersContent = () => {
  return (
    <>
      <div className="text-white-500">Filter by: </div>

      <div className="flex flex-wrap gap-4">
        {LIVE_UPDATES_CONTENT.map((category) => (
          <Item key={category.id} {...category} />
        ))}
      </div>
    </>
  );
};

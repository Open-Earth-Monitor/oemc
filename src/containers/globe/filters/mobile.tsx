'use client';

import { cn } from '@/lib/classnames';

import { useSyncSearchGeostoriesGlobe } from '@/hooks/sync-query';

import { FilterPill } from '@/containers/filter-pill';
import { CategoriesFiltersContent } from '@/containers/globe/filters/categories-filters-content';
import GlobeSearch from '@/containers/globe/geostories/geostories-search';

const CategoriesFiltersMobile = ({ className }: { className?: string }) => {
  const [searchValue, setSearchValue] = useSyncSearchGeostoriesGlobe();
  return (
    <div
      className={cn(
        'pointer-events-all relative m-auto flex w-full items-center justify-between space-x-3 border-t border-white-950/20 px-5 py-5',
        className
      )}
    >
      <GlobeSearch
        value={searchValue}
        setValue={setSearchValue}
        size="sm"
        className="max-w-sm flex-1"
      />
      <FilterPill>
        <CategoriesFiltersContent />
      </FilterPill>
    </div>
  );
};

export default CategoriesFiltersMobile;

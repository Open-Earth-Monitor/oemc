'use client';

import { useMemo } from 'react';

import { useDebounce } from '@/hooks/datasets';
import { useGeostories, GeostoriesParams } from '@/hooks/geostories';
import { useSyncCategories, useSyncSearchGeostoriesGlobe } from '@/hooks/sync-query';

import GeostoriesList from '@/containers/globe/geostories/geostories-list';

import GlobeSearch from './geostories-search';

export default function GlobeGeostories() {
  const [searchValue, setSearchValue] = useSyncSearchGeostoriesGlobe();
  const [categories] = useSyncCategories();

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const params: GeostoriesParams = useMemo(
    () => ({
      sort_by: 'title',
      // ...(categories.length > 0 && { theme: categories }),
      ...(debouncedSearchValue !== '' &&
        debouncedSearchValue.length >= 2 && { title: debouncedSearchValue }),
    }),
    [
      // categories,
      debouncedSearchValue,
    ]
  );

  const { data: geostoriesList, isLoading } = useGeostories({
    params,
    queryOptions: {
      select: (data) => {
        if (Array.isArray(categories) && categories.length > 0)
          return data.filter((d) => categories.includes(d.theme));
        return data;
      },
    },
  });

  return (
    <aside className="pointer-events-auto hidden overflow-hidden rounded-2xl bg-brand-500/70 backdrop-blur-sm sm:flex">
      <div className="flex h-[calc(100vh-200px)] flex-col px-5 pb-6 pt-4">
        <GlobeSearch value={searchValue} setValue={setSearchValue} />

        <GeostoriesList geostoriesList={geostoriesList} isLoading={isLoading} />
      </div>
    </aside>
  );
}

'use client';

import { useState, useMemo } from 'react';

import { useDebounce } from '@/hooks/datasets';
import { useGeostories, GeostoriesParams } from '@/hooks/geostories';
import { useSyncCategories } from '@/hooks/sync-query';

import GeostoriesList from '@/containers/globe/geostories/geostories-list';

import GlobeSearch from './geostories-search';

export default function GlobeGeostories() {
  const [searchValue, setSearchValue] = useState<string>('');
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
        if (!!categories && categories !== 'All')
          return data.filter((d) => categories.includes(d.theme));
        return data;
      },
    },
  });

  return (
    <aside className="w-[320px] shrink-0 overflow-hidden">
      <div className="flex h-[calc(100vh-400px)] flex-col px-5 pb-6">
        <GlobeSearch value={searchValue} setValue={setSearchValue} />

        <GeostoriesList geostoriesList={geostoriesList} isLoading={isLoading} />
      </div>
    </aside>
  );
}

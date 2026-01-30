'use client';

import { useState, useMemo } from 'react';

import { type CategoryId } from '@/constants/categories';

import { useDebounce, useMonitorsAndGeostoriesPaginated } from '@/hooks/datasets';
import { useSyncDatasetType } from '@/hooks/sync-query';

import GeostoriesList from '@/containers/globe/geostories/geostories-list';

import GlobeSearch from './geostories-search';

export default function GlobeGeostories() {
  const [searchValue, setSearchValue] = useState<string>('');

  const [activeDatasetType, setActiveDatasetType] = useSyncDatasetType();
  const [activeThemes, setActiveThemes] = useState<CategoryId[] | []>([]);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const params = useMemo(
    () => ({
      type: 'geostory',
      ...(activeThemes.length > 0 && { theme: activeThemes }),
      ...(debouncedSearchValue !== '' &&
        debouncedSearchValue.length >= 2 && { title: debouncedSearchValue }),
    }),
    [activeThemes, debouncedSearchValue]
  );
  const { data, isError, isLoading, isFetching } = useMonitorsAndGeostoriesPaginated(params, {
    keepPreviousData: true,
  });

  return (
    <aside className="w-[320px] shrink-0 overflow-hidden">
      <div className="flex h-[calc(100vh-400px)] flex-col px-5 pb-6">
        <GlobeSearch value={searchValue} setValue={setSearchValue} />

        <GeostoriesList />
      </div>
    </aside>
  );
}

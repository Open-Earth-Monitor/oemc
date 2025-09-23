'use client';

import { useCallback, useState, useMemo } from 'react';

import { scroller } from 'react-scroll';

import { type Theme } from '@/constants/themes';

import { useMonitorsAndGeostoriesPaginated, useDebounce } from '@/hooks/datasets';
import { useSyncDatasetType } from '@/hooks/sync-query';

import type { SortingCriteria, Dataset } from '@/containers/hub/datasets-grid/types';

import GeostoryCard from '@/components/geostories/card';
import Loading from '@/components/loading';
import MonitorCard from '@/components/monitors/card';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import SortBy from '@/components/sort-by';

import FilterByCategories from './filters';
import ThemesFilter from './themes-filter';
import LandingDatasetsGridTitleMobile from './title';

const LandingDatasetsMobile = () => {
  const [counter, setCounter] = useState(0);
  const [page, setPage] = useState(1);
  const [sortingCriteria, setSortingCriteria] = useState<SortingCriteria>('title');
  const [searchValue, setSearchValue] = useState<string>('');

  // activeDatasetType is used to filter the datasets by type (monitors, geostories, or all)
  const [activeDatasetType, setActiveDatasetType] = useSyncDatasetType();
  const [activeThemes, setActiveThemes] = useState<Theme[] | []>([]);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const params = useMemo(
    () => ({
      ...(!!activeDatasetType && activeDatasetType !== 'all' && { type: activeDatasetType }),
      ...(activeThemes.length > 0 && { theme: activeThemes }),
      ...(debouncedSearchValue !== '' &&
        debouncedSearchValue.length >= 2 && { title: debouncedSearchValue }),
      sort_by: sortingCriteria,
      pagination: true,
      page,
    }),
    [activeDatasetType, activeThemes, sortingCriteria, debouncedSearchValue, page]
  );
  const { data, isError, isLoading, isFetching } = useMonitorsAndGeostoriesPaginated(params, {
    keepPreviousData: true,
    onSuccess: () => {
      // avoiding scroll on first render
      if (counter > 0) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        scroller.scrollTo('datasetsGrid', {
          duration: 500,
          delay: 20,
          smooth: 'easeInOutQuint',
        });
      }
      setCounter(counter + 1);
    },
  });

  const handleDatasetTypeFilter = useCallback(
    (id: Dataset) => {
      setActiveDatasetType(id);
      setPage(1);
    },
    [setActiveDatasetType]
  );

  // const handleThemes = useCallback(
  //   (e: React.MouseEvent<Omit<HTMLButtonElement, 'id' & { id: Theme }>>) => {
  //     e.stopPropagation(); // avoid to close the dropdown interacting with the checkbox

  //     const id = e.currentTarget.id as Theme;
  //     const themesUpdate = activeThemes.includes(id)
  //       ? activeThemes.filter((e) => e !== id)
  //       : [id, ...activeThemes];

  //     setActiveThemes(themesUpdate);
  //   },
  //   [activeThemes]
  // );

  const handleSortingCriteria = useCallback(
    (value: SortingCriteria) => setSortingCriteria(value),
    [setSortingCriteria]
  );

  return (
    <div className="container mx-auto w-full px-5 py-8">
      <div className="space-y-10 py-8">
        <LandingDatasetsGridTitleMobile />

        <Search
          placeholder="Search by name, type of dataset..."
          value={searchValue}
          setValue={setSearchValue}
          className="flex h-full w-full flex-1 px-0"
        />
        <div className="space-y-2">
          <FilterByCategories
            active={activeDatasetType}
            handleDatasetTypeChange={handleDatasetTypeFilter}
          />
          <ThemesFilter selectedThemes={activeThemes} setSelectedThemes={setActiveThemes} />
          <SortBy sortingCriteria={sortingCriteria} handleSortingCriteria={handleSortingCriteria} />
        </div>
      </div>

      <div className="min-h-[380px]">
        {!isLoading && !isError && (
          <ul
            id="explore-section"
            className="grid gap-6 py-6 sm:grid-cols-2 lg:grid-cols-4"
            data-testid="datasets-list"
          >
            {data?.data?.map(({ id, ...d }) => (
              <li key={id} data-testid="datasets-card">
                <div className="font-inter">
                  {d.entity_type === 'monitor' && <MonitorCard id={id} {...d} />}
                  {d.entity_type === 'geo_story' && <GeostoryCard id={id} {...d} />}
                </div>
              </li>
            ))}
          </ul>
        )}
        {isFetching && <Loading />}

        {!isLoading && !isError && !!data?.data.length && (
          <Pagination
            page={page}
            setPage={setPage}
            totalItems={data?.count}
            maxLength={6}
            nextPage={data?.next_page}
            previousPage={data?.previous_page}
            numButtons={5}
          />
        )}

        {!isLoading && !isError && !data?.data.length && (
          <div className="flex w-full flex-col justify-center space-y-7 py-56 text-center">
            <div className="m-auto w-full max-w-xl">
              <p className="text-5xl font-bold">No results found.</p>
              <p className="inter font-inter text-secondary-700">
                Sorry, we have searched in our entire database but we couldn’t find any results
                fitting your search criteria.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingDatasetsMobile;

'use client';

import { useCallback, useMemo, useState } from 'react';

import { Element, scroller } from 'react-scroll';

import { PopoverClose } from '@radix-ui/react-popover';
import { XIcon } from 'lucide-react';
import { LuX } from 'react-icons/lu';

import cn from '@/lib/classnames';

import { THEMES, type Theme } from '@/constants/themes';

import { useMonitorsAndGeostoriesPaginated, useDebounce } from '@/hooks/datasets';

import GeostoryCard from '@/components/geostories/card';
import Loading from '@/components/loading';
import MonitorCard from '@/components/monitors/card';
import Pagination from '@/components/pagination';
import Search from '@/components/search';

import { FilterByFormat, SortBy } from './filters';
import type { SortingCriteria, Dataset } from './types';
import LandingDatasetsGridTitle from './title';
import ThemesFilter from './themes-filter';

const LandingDatasets = () => {
  const [counter, setCounter] = useState(0);
  const [page, setPage] = useState(1);
  const [sortingCriteria, setSortingCriteria] = useState<SortingCriteria>('title');
  const [searchValue, setSearchValue] = useState<string>('');
  const [active, setActive] = useState<Dataset>('all');
  const [activeThemes, setActiveThemes] = useState<Theme[]>([]);

  const debouncedSearchValue = useDebounce(searchValue, 500);
  const { data, isError, isLoading, isFetching } = useMonitorsAndGeostoriesPaginated(
    {
      ...(active !== 'all' && { type: active }),
      ...(debouncedSearchValue !== '' &&
        debouncedSearchValue.length >= 2 && { title: debouncedSearchValue }),
      ...(activeThemes.length > 0 && { theme: activeThemes }),
      sort_by: sortingCriteria,
      pagination: true,
      page,
    },
    {
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
    }
  );
  const filteredThemes = useMemo(() => THEMES.filter((theme) => theme !== 'Unknown'), []);

  const handleCategoriesFilter = useCallback(
    (id: Dataset) => {
      setActive(id);
      setPage(1);
    },
    [setActive]
  );

  const handleThemes = useCallback(
    (e: React.MouseEvent<Omit<HTMLButtonElement, 'id' & { id: Theme }>>) => {
      e.stopPropagation(); // avoid to close the dropdown interacting with the checkbox

      const id = e.currentTarget.id as Theme;
      const themesUpdate = activeThemes.includes(id)
        ? activeThemes.filter((e) => e !== id)
        : [id, ...activeThemes];

      setActiveThemes(themesUpdate);
    },
    [activeThemes]
  );

  const handleSortingCriteria = useCallback(
    (value: SortingCriteria) => setSortingCriteria(value),
    [setSortingCriteria]
  );

  return (
    <Element className="relative z-10 -mt-52 w-full bg-black-500" name="datasetsGrid">
      <div className="container mx-auto w-full px-5 py-32">
        <div>
          <LandingDatasetsGridTitle />
        </div>
        <div className="flex h-14">
          <Search
            placeholder="Search by name, type of dataset..."
            value={searchValue}
            setValue={setSearchValue}
            className="flex h-full flex-1 border-b-[0.5px] border-b-secondary-900"
          />
        </div>
        <ThemesFilter />
        <ul
          className={cn(
            'mb-10 flex flex-wrap gap-3 text-secondary-500',
            activeThemes.length && 'mt-3'
          )}
        >
          {activeThemes.map((theme) => (
            <li key={theme} className="rounded-sm bg-secondary-900 px-2 py-0.5">
              <button
                id={theme}
                type="button"
                onClick={handleThemes}
                className="flex items-center space-x-2"
                data-testid={`${theme}-button`}
                aria-label={`Remove ${theme}`}
              >
                <span>{theme}</span>
                <LuX className="h-4 w-4 fill-current" />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-between sm:hidden">
          <div>
            <SortBy
              sortingCriteria={sortingCriteria}
              handleSortingCriteria={handleSortingCriteria}
            />
          </div>
        </div>
        <div className="hidden items-center justify-between sm:flex">
          <div>
            <FilterByFormat active={active} handleCategoriesFilter={handleCategoriesFilter} />
          </div>
          <div>
            <div className="hidden sm:block">
              <SortBy
                sortingCriteria={sortingCriteria}
                handleSortingCriteria={handleSortingCriteria}
              />
            </div>
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
    </Element>
  );
};

export default LandingDatasets;

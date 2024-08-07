'use client';

import { useCallback, useMemo, useState } from 'react';

import { Element, scroller } from 'react-scroll';

import { PopoverClose } from '@radix-ui/react-popover';
import { motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { RxCross2 } from 'react-icons/rx';

import cn from '@/lib/classnames';

import { useMonitorsAndGeostoriesPaginated } from '@/hooks/datasets';

import { THEMES, type Theme } from '@/constants/themes';

import GeostoryCard from '@/components/geostories/card';
import Loading from '@/components/loading';
import MonitorCard from '@/components/monitors/card';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { PopoverContent, PopoverTrigger, Popover } from '../ui/popover';

import { FilterByCategories, FilterByFormat, SortBy } from './filters';
import type { SortingCriteria, Dataset } from './types';

const LandingDatasets = () => {
  const [counter, setCounter] = useState(0);
  const [page, setPage] = useState(1);
  const [sortingCriteria, setSortingCriteria] = useState<SortingCriteria>('title');
  const [searchValue, setSearchValue] = useState<string>('');
  const [active, setActive] = useState<Dataset>('all');
  const [activeThemes, setActiveThemes] = useState<Theme[]>([]);

  const { data, isError, isLoading, isFetching } = useMonitorsAndGeostoriesPaginated(
    {
      ...(active !== 'all' && { type: active }),
      ...(searchValue !== '' && { title: searchValue }),
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
    <Element className="to-bg-brand-500 w-full bg-gradient-to-t from-[#09131D]" name="datasetsGrid">
      <div className="container mx-auto">
        <div className="flex h-14">
          <Search
            placeholder="Search by name, type of dataset..."
            value={searchValue}
            setValue={setSearchValue}
            className="flex h-full flex-1 border-[0.5px] border-secondary-900"
          />
          <div className="hidden sm:block">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger
                className="flex h-14 min-w-[258px] items-center border-[0.5px] border-l-0 border-secondary-900 font-inter"
                data-testid="themes-filter"
              >
                <div className="w-full">
                  {filteredThemes.length === activeThemes.length && 'All categories selected'}
                  {activeThemes.length === 0 && 'Filter by categories'}
                  {activeThemes.length === 1 && activeThemes[0]}
                  {activeThemes.length > 1 &&
                    filteredThemes.length > activeThemes.length &&
                    `${activeThemes[0]} +${activeThemes.length - 1}`}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="align-left flex w-full flex-1 flex-col bg-brand-500 font-inter"
                sideOffset={-1}
              >
                <FilterByCategories activeThemes={activeThemes} handleThemes={handleThemes} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
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
                <RxCross2 className="h-4 w-4 fill-current" />
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
          <Popover modal={false}>
            <PopoverTrigger
              className="border-none py-2.5 underline"
              data-testid="themes-filter-mobile"
            >
              Filters
            </PopoverTrigger>
            <PopoverContent className="min-w-fit bg-brand-500 px-0 py-0 font-inter" sideOffset={-1}>
              <div className="flex justify-end p-5">
                <PopoverClose>
                  <XIcon className="h-4 w-4 text-secondary-500" />
                </PopoverClose>
              </div>
              <Collapsible className="border-y-[0.5px] border-secondary-900">
                <CollapsibleTrigger className="bg-brand-500 py-2 text-secondary-500 hover:bg-brand-500">
                  Filter by categories
                </CollapsibleTrigger>
                <CollapsibleContent className="px-2 pb-2">
                  <FilterByCategories activeThemes={activeThemes} handleThemes={handleThemes} />
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="bg-brand-500 py-2 text-secondary-500 hover:bg-brand-500">
                  Filter by format
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <FilterByFormat active={active} handleCategoriesFilter={handleCategoriesFilter} />
                </CollapsibleContent>
              </Collapsible>
            </PopoverContent>
          </Popover>
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
        {!!data?.total_items && (
          <div data-testid="datasets-result" className="py-5 font-inter text-secondary-700">
            <span data-testid="result-number">{data?.total_items}</span>{' '}
            {data?.total_items === 1 ? 'result' : 'results'}
          </div>
        )}
        <div className="min-h-[380px]">
          {!isLoading && !isError && (
            <ul
              id="explore-section"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              data-testid="datasets-list"
            >
              {data?.data?.map(({ id, ...d }) => (
                <li key={id} data-testid="datasets-card">
                  <motion.div
                    className="overflow-hidden font-inter"
                    whileHover={{
                      translateY: '-10px',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {d.entity_type === 'monitor' && <MonitorCard id={id} {...d} />}
                    {d.entity_type === 'geo_story' && <GeostoryCard id={id} {...d} />}
                  </motion.div>
                </li>
              ))}
            </ul>
          )}
          {isFetching && <Loading />}

          {!isLoading && !isError && !!data?.data.length && (
            <Pagination
              page={page}
              setPage={setPage}
              totalItems={data?.total_items}
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

'use client';

import { useCallback, useMemo, useState } from 'react';

import { Element, scroller } from 'react-scroll';

import { motion } from 'framer-motion';
import { BiCheck } from 'react-icons/bi';

import { useMonitorsAndGeostoriesPaginated } from '@/hooks/datasets';

import { THEMES, type Theme } from '@/constants/themes';

import GeostoryCard from '@/components/geostories/card';
import Loading from '@/components/loading';
import MonitorCard from '@/components/monitors/card';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import { Checkbox, CheckboxIndicator } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TAG_STYLE } from '@/styles/constants';

import { SORTING } from './constants';
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
      // TO-DO: API doesn't support filtering by multiple themes
      ...(activeThemes.length > 0 && { theme: activeThemes[0] }),
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
      // TO-DO: uncomment when API supports filtering by multiple themes
      // const themesUpdate = activeThemes.includes(id)
      //   ? activeThemes.filter((e) => e !== id)
      //   : [id, ...activeThemes];

      if (activeThemes.includes(id)) {
        setActiveThemes([]);
      } else {
        setActiveThemes([id]);
      }
    },
    [activeThemes]
  );

  const handleSortingCriteria = useCallback(
    (value: SortingCriteria) => setSortingCriteria(value),
    [setSortingCriteria]
  );

  return (
    <Element className="w-full" name="datasetsGrid">
      <div className="m-auto max-w-[1200px] pt-10">
        <div className="mb-10 flex h-14">
          <Search
            placeholder="Search by name, type of dataset..."
            value={searchValue}
            setValue={setSearchValue}
            className="flex h-full flex-1 border-[0.5px] border-secondary-900"
          />
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="flex h-full min-w-[258px] items-center border-[0.5px] border-l-0 font-inter">
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
              {filteredThemes.map((theme) => (
                <div
                  key={`menu-item-${theme}`}
                  className="flex w-full flex-1 space-x-4 p-2 text-secondary-500"
                >
                  <Checkbox
                    id={theme}
                    data-testid={`${theme}-checkbox`}
                    onClick={handleThemes}
                    defaultChecked
                    checked={activeThemes.includes(theme)}
                    className="bg-secondary-500 text-brand-500 outline-none ring-0 hover:border-2 hover:border-secondary-500 hover:bg-secondary-900 data-[state=checked]:border-none"
                  >
                    <CheckboxIndicator className="border-none bg-secondary-500 text-brand-500 outline-0 ring-0 hover:bg-secondary-900">
                      <BiCheck className="h-4 w-4 fill-current" />
                    </CheckboxIndicator>
                  </Checkbox>
                  <Label
                    htmlFor={theme}
                    className="flex w-full flex-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {theme}
                  </Label>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <RadioGroup
              defaultValue={active}
              className="flex items-center space-x-10 py-3 font-inter font-medium"
              onValueChange={handleCategoriesFilter}
            >
              <div className="flex items-center space-x-2.5" data-testid="monitors-button-checkbox">
                <RadioGroupItem value="monitors" id="monitors" />
                <Label htmlFor="monitors" className={TAG_STYLE}>
                  monitors
                </Label>
              </div>
              <div
                className="flex items-center space-x-2.5"
                data-testid="geostories-button-checkbox"
              >
                <RadioGroupItem value="geostories" id="geostories" />
                <Label htmlFor="geostories" className={TAG_STYLE}>
                  Geostories
                </Label>
              </div>
              <div className="flex items-center space-x-2.5" data-testid="all-button">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className={TAG_STYLE}>
                  All
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className="flex h-full items-center border-[0.5px] border-secondary-900 px-3 py-2.5 font-inter">
                <div>
                  <span className="w-full">Sort by:</span>{' '}
                  <span className="font-bold capitalize">{sortingCriteria}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-4" sideOffset={-1} alignOffset={0} align="start">
                <RadioGroup
                  defaultValue="title"
                  value={sortingCriteria}
                  className="flex w-full flex-1 font-inter font-medium"
                  onValueChange={handleSortingCriteria}
                >
                  <div className="align-left flex flex-col justify-start space-y-4">
                    {SORTING.map((sort) => (
                      <div
                        key={sort}
                        className="flex items-center space-x-3"
                        data-testid={`${sort}-button`}
                      >
                        <RadioGroupItem value={sort} id={sort} />
                        <Label htmlFor={sort} className="capitalize">
                          {sort}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {!!data?.data?.length && (
          <div data-testid="datasets-result" className="py-5 font-inter text-secondary-700">
            <span data-testid="result-number">{data?.data?.length}</span>{' '}
            {data?.data?.length === 1 ? 'result' : 'results'}
          </div>
        )}
        <div className="min-h-[380px]">
          {!isLoading && !isError && (
            <ul
              id="explore-section"
              className="grid max-w-7xl grid-cols-3 gap-6"
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

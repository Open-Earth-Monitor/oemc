'use client';

import { useCallback, useState } from 'react';

import { BiCheck } from 'react-icons/bi';
// import { FiInfo } from 'react-icons/fi';
// import { HiChevronDown } from 'react-icons/hi2';

import { useMonitorsAndGeostories } from '@/hooks/datasets';

import Card from '@/components/landing-card';
import Loading from '@/components/loading';
import Search from '@/components/search';
import { Checkbox, CheckboxIndicator } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown';
import { Label } from '@/components/ui/label';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TAG_STYLE } from '@/styles/constants';

import { THEMES, SORTING } from './constants';
import type { Theme, SortingCriteria, Dataset } from './types';

const LandingDatasets = () => {
  const [sortingCriteria, setSortingCriteria] = useState<SortingCriteria>('title');
  const [searchValue, setSearchValue] = useState<string>('');
  const [active, setActive] = useState<Dataset>('all');
  const [activeThemes, setActiveThemes] = useState<Theme[]>(THEMES);
  const { data, isFetched, isError, isFetching } = useMonitorsAndGeostories(
    {
      ...(active !== 'all' && { type: active }),
      ...(searchValue !== '' && { title: searchValue }),
      sort_by: sortingCriteria,
    },
    {
      enabled: activeThemes.length > 0,
    }
  );

  const handleCategoriesFilter = useCallback(
    (id: Dataset) => {
      setActive(id);
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
    [setActiveThemes, activeThemes]
  );

  const handleSortingCriteria = useCallback(
    (value: SortingCriteria) => setSortingCriteria(value),
    [setSortingCriteria]
  );

  return (
    <div className="w-full">
      <div className="m-auto max-w-[1200px]  py-10">
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
                {THEMES.length === activeThemes.length && 'All categories selected'}
                {activeThemes.length === 0 && 'No categories selected'}
                {activeThemes.length === 1 && activeThemes[0]}
                {activeThemes.length > 1 &&
                  THEMES.length > activeThemes.length &&
                  `${activeThemes[0]} +${activeThemes.length - 1}`}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="align-left flex w-full flex-1 flex-col bg-brand-500 font-inter"
              sideOffset={-1}
            >
              {THEMES.map((theme) => (
                <DropdownMenuItem
                  key={theme}
                  className="flex w-full flex-1 space-x-4 text-secondary-500"
                >
                  <Checkbox
                    id={theme}
                    data-testid={`${theme}-checkbox`}
                    onClick={handleThemes}
                    defaultChecked
                    checked={activeThemes.includes(theme)}
                    className="border-none bg-secondary-500 text-brand-500 outline-none ring-0"
                  >
                    <CheckboxIndicator className="border-none bg-secondary-500 text-brand-500 outline-0 ring-0">
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
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <RadioGroup
              defaultValue="all"
              className="flex items-center space-x-10 py-3 font-inter font-medium"
              onValueChange={handleCategoriesFilter}
            >
              <div className="flex items-center space-x-2.5" data-testid="monitors-button-checkbox">
                <RadioGroupItem value="monitors" id="monitors" />
                <Label htmlFor="monitors" className={TAG_STYLE}>
                  monitors
                </Label>
                {/* <Popover>
                <PopoverTrigger data-testid="dataset-info-button">
                  <FiInfo className="h-6 w-6 text-secondary-500" title="Show info" />
                </PopoverTrigger>
                <PopoverContent align="center" sideOffset={-80} data-testid="dataset-info-content">
                  <div className="flex flex-col">{info}</div>
                </PopoverContent>
              </Popover> */}
              </div>
              <div
                className="flex items-center space-x-2.5"
                data-testid="geostories-button-checkbox"
              >
                <RadioGroupItem value="geostories" id="geostories" />
                <Label htmlFor="geostories" className={TAG_STYLE}>
                  Geostories
                </Label>
                {/* <Popover>
                <PopoverTrigger data-testid="dataset-info-button">
                  <FiInfo className="h-6 w-6 text-secondary-500" title="Show info" />
                </PopoverTrigger>
                <PopoverContent align="center" sideOffset={-80} data-testid="dataset-info-content">
                  <div className="flex flex-col">{info}</div>
                </PopoverContent>
              </Popover> */}
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
                  <div className="align-left flex flex-col justify-start space-y-2">
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
        {!!data?.length && (
          <div data-testid="datasets-result" className="py-5 font-inter text-secondary-700">
            <span data-testid="result-number">{data?.length}</span>{' '}
            {data?.length === 1 ? 'result' : 'results'}
          </div>
        )}
        <div className="min-h-[380px]">
          {isFetching && <Loading />}
          {isFetched && !isError && (
            <ul
              id="explore-section"
              className="grid max-w-7xl grid-cols-3 gap-6"
              data-testid="datasets-list"
            >
              {data.map(({ id, ...d }) => (
                <li key={id} data-testid="datasets-card">
                  <Card id={id} {...d} />
                </li>
              ))}
            </ul>
          )}
          {isFetched && !isError && !data.length && (
            <div className="flex w-full flex-col justify-center space-y-7 bg-gradient-to-b from-[#08121c] to-[#0a182a] py-56 text-center">
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
    </div>
  );
};

export default LandingDatasets;

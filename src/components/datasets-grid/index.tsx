'use client';

import { useCallback, useState } from 'react';

import { Circle } from 'lucide-react';
import { BiCheck } from 'react-icons/bi';
import { FiInfo } from 'react-icons/fi';

import { useMonitorsAndGeostories } from '@/hooks/datasets';

import Card from '@/components/landing-card';
import Loading from '@/components/loading';
import Search from '@/components/search';
import { DropdownMenu } from '@/components/ui/dropdown';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const LandingDatasets = () => {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [active, setActive] = useState<'monitors' | 'geostories' | 'all'>('monitors');
  const { data, isFetched, isError, isFetching } = useMonitorsAndGeostories(
    {
      ...(active.length === 1 && { type: active }),
      ...(searchValue !== '' && { title: searchValue }),
    },
    { enabled: active.length > 0 }
  );

  const handleCategoriesFilter = useCallback(
    (id: 'monitors' | 'geostories' | 'all') => {
      setActive(id);
    },
    [setActive]
  );

  // const handleThemes = useCallback(
  //   (e: React.MouseEvent<Omit<HTMLButtonElement, 'id' & { id: 'monitors' | 'geostories' }>>) => {
  //     const id = e.currentTarget.id as Theme;
  //     const themesUpdate = activeThemes.includes(id)
  //       ? activeThemes.filter((e) => e !== id)
  //       : [id, ...activeThemes];

  //     setActiveThemes(themesUpdate);
  //   },
  //   [setActiveThemes, activeThemes]
  // );

  return (
    <div className="w-full">
      <div className="m-auto max-w-[1200px]">
        <div>
          <Search
            placeholder="Search by name, type of dataset..."
            value={searchValue}
            setValue={setSearchValue}
          />
          <DropdownMenu />
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroup
            defaultValue="all"
            className="flex items-center space-x-4 py-3 font-inter text-xs font-medium uppercase text-secondary-500"
            onValueChange={handleCategoriesFilter}
          >
            <div className="flex items-center space-x-2" data-testid="monitors-button">
              <RadioGroupItem value="monitors" id="monitors" />
              <Label htmlFor="monitors">monitors</Label>
              <Popover>
                <PopoverTrigger data-testid="dataset-info-button">
                  <FiInfo className="h-6 w-6 text-secondary-500" title="Show info" />
                </PopoverTrigger>
                <PopoverContent align="center" sideOffset={-80} data-testid="dataset-info-content">
                  <div className="flex flex-col">{/* info */}</div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center space-x-2" data-testid="geostories-button">
              <RadioGroupItem value="geostories" id="geostories" />
              <Label htmlFor="geostories">Geostories</Label>
            </div>
            <div className="flex items-center space-x-2" data-testid="all-button">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All</Label>
              <Popover>
                <PopoverTrigger data-testid="dataset-info-button">
                  <FiInfo className="h-6 w-6 text-secondary-500" title="Show info" />
                </PopoverTrigger>
                <PopoverContent align="center" sideOffset={-80} data-testid="dataset-info-content">
                  <div className="flex flex-col">{/* info */}</div>
                </PopoverContent>
              </Popover>
            </div>
          </RadioGroup>
        </div>
        {!!data?.length && (
          <div data-testid="datasets-result" className="py-5 font-inter text-secondary-700">
            <span data-testid="result-number">{data?.length}</span>{' '}
            {data?.length === 1 ? 'result' : 'results'}
          </div>
        )}
        {isFetching && <Loading />}
        {isFetched && !isError && !!data.length && (
          <ul
            id="explore-section"
            className="grid max-w-7xl grid-cols-3 gap-6"
            data-testid="datasets-list"
          >
            {data.map(({ id, ...d }) => (
              <li key={id} className="mb-6" data-testid="datasets-card">
                <Card id={id} {...d} />
              </li>
            ))}
          </ul>
        )}
      </div>
      {isFetched && !isError && !data.length && (
        <div className="flex w-full  flex-col justify-center space-y-7 bg-gradient-to-b from-[#08121c] to-[#0a182a] py-52 text-center">
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
  );
};

export default LandingDatasets;

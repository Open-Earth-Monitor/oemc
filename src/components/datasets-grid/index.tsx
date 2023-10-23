'use client';

import { useCallback, useState } from 'react';

import { FiInfo } from 'react-icons/fi';

import { useMonitorsAndGeostories } from '@/hooks/datasets';

import Card from '@/components/landing-card';
import Loading from '@/components/loading';
import Search from '@/components/search';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu } from '@/components/ui/dropdown';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const LandingDatasets = () => {
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
    (
      e: React.MouseEvent<Omit<HTMLButtonElement, 'id' & { id: 'monitors' | 'geostories' | 'all' }>>
    ) => {
      const id = e.currentTarget.id as 'monitors' | 'geostories' | 'all';
      setActive(id);
    },
    [setActive]
  );

  return (
    <div className="m-auto max-w-[1200px]">
      <div>
        <Search
          placeholder="Search by name, type of dataset..."
          value={searchValue}
          setValue={setSearchValue}
        />
        <DropdownMenu />
      </div>

      <div className=" text-secondary-500 ">
        <div className="flex items-center space-x-4 py-3 font-inter text-xs font-medium uppercase text-secondary-500">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="monitors"
              data-testid="monitors-checkbox"
              checked={active.includes('monitors')}
              defaultChecked
              onClick={handleCategoriesFilter}
            />
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
          <div className="flex items-center space-x-2">
            <Checkbox
              id="geostories"
              data-testid="geostories-checkbox"
              checked={active.includes('geostories')}
              onClick={handleCategoriesFilter}
              // disabled={active.length === 1  && active[0] === 'geostories'}
            />
            <Label htmlFor="geostories">Geostories</Label>
            <Popover>
              <PopoverTrigger data-testid="dataset-info-button">
                <FiInfo className="h-6 w-6 text-secondary-500" title="Show info" />
              </PopoverTrigger>
              <PopoverContent align="center" sideOffset={-80} data-testid="dataset-info-content">
                <div className="flex flex-col">{/* info */}</div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div data-testid="datasets-result" className="py-5 font-inter text-secondary-700">
          <span data-testid="result-number">{!!active.length && data?.length}</span>{' '}
          {!!active?.length && data?.length === 1 && 'result'}
          {!!active?.length && data?.length > 1 && 'results'}
          {!active.length && '0 results'}
        </div>
        <ul
          id="explore-section"
          className="grid max-w-7xl grid-cols-3 gap-6"
          data-testid="datasets-list"
        >
          {isFetching && <Loading />}
          {isFetched &&
            !isError &&
            !!data.length &&
            data.map(({ id, ...d }) => (
              <li key={id} className="mb-6" data-testid="datasets-card">
                <Card id={id} {...d} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default LandingDatasets;

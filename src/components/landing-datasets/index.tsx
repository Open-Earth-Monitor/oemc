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
  const [active, setActive] = useState<('monitors' | 'geostories')[]>(['monitors']);
  const { data, isFetched, isError, isLoading } = useMonitorsAndGeostories({
    ...(active.length === 1 && { type: active[0] }),
    ...(searchValue !== '' && { title: searchValue }),
  });

  const addOrRemoveFromArray = (
    arr: ('monitors' | 'geostories')[],
    value: 'monitors' | 'geostories'
  ) => {
    if (value === 'monitors' || value === 'geostories') {
      if (arr.includes(value)) {
        return arr.filter((item) => item !== value);
      } else {
        return [...arr, value];
      }
    }
    return arr;
  };

  const handleCategoriesFilter = useCallback(
    (e: React.MouseEvent<Omit<HTMLButtonElement, 'id' & { id: 'monitors' | 'geostories' }>>) => {
      const newValue = e.currentTarget.id as 'monitors' | 'geostories';
      setActive((prev) => addOrRemoveFromArray(prev, newValue));
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
              checked={active.includes('monitors')}
              defaultChecked
              // disabled={active.length === 1  && active[0] === 'monitors'}
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

          {/* //Sort */}
        </div>
        <div className="py-5 font-inter text-secondary-700">{data?.length} results</div>
        <ul id="explore-section" className="grid max-w-7xl grid-cols-3 gap-6 ">
          {isLoading && <Loading />}
          {isFetched &&
            !isError &&
            data.map(({ id, ...d }) => (
              <li key={id} className="mb-6">
                {/* {monitor.title} */}
                <Card id={id} {...d} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default LandingDatasets;

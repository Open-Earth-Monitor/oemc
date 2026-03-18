'use client';

import { cn } from '@/lib/classnames';

import { CATEGORIES } from '@/constants/categories';

import { useSyncSearchGeostoriesGlobe } from '@/hooks/sync-query';

import GlobeSearch from '@/containers/globe/geostories/geostories-search';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { FilterSVG } from '@/SVGS/filter';

import Item from './item';

const CategoriesFiltersMobile = ({ className }: { className?: string }) => {
  const [searchValue, setSearchValue] = useSyncSearchGeostoriesGlobe();
  return (
    <div
      className={cn(
        'pointer-events-all relative m-auto flex w-full items-center justify-between space-x-3 border-t border-white-950/20 px-5 py-5',
        className
      )}
    >
      <GlobeSearch
        value={searchValue}
        setValue={setSearchValue}
        size="sm"
        className="max-w-sm flex-1"
        mobile
      />
      <Popover>
        <PopoverTrigger className="flex w-fit items-center space-x-4 rounded-full bg-white-500 px-5 py-2.5 font-satoshi text-sm font-medium hover:bg-accent-green focus:rounded-full disabled:pointer-events-none data-[state=closed]:bg-white-500 data-[state=open]:bg-accent-green">
          <span>Filter</span>
          <FilterSVG className="text-black h-5 w-5" />
        </PopoverTrigger>

        <PopoverContent
          side="bottom"
          align="end"
          sideOffset={8}
          className="w-[100vw] max-w-none space-y-5 rounded-none border-t-0 bg-black-500/70 p-4 pt-5 backdrop-blur-lg"
        >
          <div className="text-white-500">Filter by Geostories by category: </div>

          <div className="flex flex-wrap gap-4">
            {CATEGORIES.map((category) => (
              <Item key={category.id} {...category} theme="plain" />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CategoriesFiltersMobile;

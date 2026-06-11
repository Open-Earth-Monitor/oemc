import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { FilterSVG } from '@/SVGS/filter';

export const FilterPill = ({ children }: { children?: React.ReactNode }) => (
  <Popover>
    <PopoverTrigger className="flex w-fit items-center space-x-4 rounded-full bg-white-500 px-5 py-2.5 font-satoshi text-sm font-medium text-black-500 hover:bg-accent-green focus:rounded-full disabled:pointer-events-none data-[state=closed]:bg-white-500 data-[state=open]:bg-accent-green">
      <span>Filter</span>
      <FilterSVG className="text-black h-5 w-5" />
    </PopoverTrigger>

    <PopoverContent
      side="bottom"
      align="end"
      sideOffset={8}
      className="w-[100vw] max-w-[480px] space-y-5 rounded-none border-0 bg-transparent p-4 pt-5 backdrop-blur-lg"
    >
      {children}
    </PopoverContent>
  </Popover>
);

'use client';

import { Popover } from '@radix-ui/react-popover';

import MainMenuContent from '@/components/main-menu/content';
import MainMenuTrigger from '@/components/main-menu/trigger';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const MainMenuDesktop = () => (
  <Popover>
    <PopoverTrigger
      className="flex items-center space-x-3.5 rounded-full border-black-100 bg-black-300 px-5 py-2.5 font-satoshi"
      data-testid="themes-filter-desktop"
    >
      <MainMenuTrigger />
    </PopoverTrigger>
    <PopoverContent
      className="z-[2000] min-w-fit overflow-hidden border-none bg-secondary-500 px-0 py-2 font-inter text-black-500"
      sideOffset={0}
      align="end"
    >
      <MainMenuContent />
    </PopoverContent>
  </Popover>
);

export default MainMenuDesktop;

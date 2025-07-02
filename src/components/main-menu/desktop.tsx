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
      className="min-w-fit overflow-hidden bg-secondary-500 px-0 py-2 font-inter text-black-500"
      sideOffset={-1}
    >
      <MainMenuContent />
    </PopoverContent>
  </Popover>
);

export default MainMenuDesktop;

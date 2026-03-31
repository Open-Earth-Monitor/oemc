'use client';

import { useState } from 'react';

import { Popover } from '@radix-ui/react-popover';

import MainMenuContent from '@/components/main-menu/content';
import MainMenuTrigger from '@/components/main-menu/trigger';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const MainMenuDesktop = () => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className="flex items-center space-x-3.5 rounded-full border border-black-100 bg-black-300 px-5 py-2.5 font-satoshi hover:bg-black-100"
        data-testid="themes-filter-desktop"
      >
        <MainMenuTrigger open={open} />
      </PopoverTrigger>
      <PopoverContent
        className="b z-[2000] min-w-fit  overflow-hidden border-none bg-secondary-500
    px-0
    py-1
    font-inter
    text-black-500

    data-[state=open]:animate-in
    data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0
    data-[state=open]:fade-in-0
    data-[state=closed]:zoom-out-95
    data-[state=open]:zoom-in-95

    data-[side=bottom]:slide-in-from-top-10
    data-[side=left]:slide-in-from-right-10
    data-[side=right]:slide-in-from-left-10
    data-[side=top]:slide-in-from-bottom-10
        data-[state=closed]:duration-500
    data-[state=open]:duration-500"
        sideOffset={0}
        align="end"
      >
        <MainMenuContent />
      </PopoverContent>
    </Popover>
  );
};

export default MainMenuDesktop;

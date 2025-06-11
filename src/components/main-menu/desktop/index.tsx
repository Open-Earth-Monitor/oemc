'use client';

import { Popover } from '@radix-ui/react-popover';
import { PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LuMenu } from 'react-icons/lu';
import CommunityDropdown from '@/components/main-menu//community-dropdown';
import OtherResourcesLinks from '../menu-links-other-resources';
import NavLinks from '../nav-links';

const MainMenuDesktop = () => (
  <Popover>
    <PopoverTrigger
      className="flex items-center space-x-3.5 rounded-full border-black-100 bg-black-300 px-5 py-2.5 font-satoshi"
      data-testid="themes-filter-desktop"
    >
      <span className="font-medium">Menu</span>
      <LuMenu className="h-6 w-6 text-accent-green" />
    </PopoverTrigger>
    <PopoverContent
      className="min-w-fit overflow-hidden bg-secondary-500 px-0 py-2 font-inter"
      sideOffset={-1}
    >
      <NavLinks />
      <div className="min-w-fit divide-y divide-black-500/10 rounded-b-full bg-secondary-500 pt-0 font-inter">
        <CommunityDropdown />
        <OtherResourcesLinks />
      </div>
    </PopoverContent>
  </Popover>
);

export default MainMenuDesktop;

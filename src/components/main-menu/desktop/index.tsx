'use client';

import { Popover } from '@radix-ui/react-popover';
import { PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { XIcon } from 'lucide-react';
import { LuMenu } from 'react-icons/lu';
import CommunityDropdown from '@/components/main-menu//community-dropdown';
import OtherResourcesLinks from '../menu-links-other-resources';
import NavLinks from '../nav-links';

const MainMenuDesktop = () => (
  <Popover>
    <PopoverTrigger
      className="flex items-center space-x-3.5 rounded-full border-none px-5 py-2.5"
      data-testid="themes-filter-desktop"
    >
      <span className="font-medium">Menu</span>
      <LuMenu className="h-6 w-6 text-accent-green" />
    </PopoverTrigger>
    <PopoverContent className="font-inter min-w-fit bg-secondary-500" sideOffset={-1}>
      <NavLinks />
      <div className="font-inter min-w-fit divide-y divide-yellow-500 bg-secondary-500">
        <CommunityDropdown />
        <OtherResourcesLinks />
      </div>
    </PopoverContent>
  </Popover>
);

export default MainMenuDesktop;

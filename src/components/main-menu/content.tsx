'use client';

import CommunityDropdown from '@/components/main-menu/community-dropdown';
import OtherResourcesLinks from '@/components/main-menu/menu-links-other-resources';
import NavLinks from '@/components/main-menu/nav-links';

const MainMenuContent = () => (
  <div className="px-1">
    <NavLinks />
    <div className="min-w-fit divide-y divide-black-500/10 rounded-b-full bg-secondary-500 pt-0 font-inter">
      <CommunityDropdown />
      <OtherResourcesLinks />
    </div>
  </div>
);

export default MainMenuContent;

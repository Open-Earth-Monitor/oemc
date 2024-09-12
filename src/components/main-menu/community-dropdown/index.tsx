'use client';

import Link from 'next/link';

import cn from '@/lib/classnames';

import { navSubLinksCommunity } from '@/components/main-menu/constants';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown';

const CommunityDropdown = ({ isMobile }: { isMobile?: boolean }) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      className={cn({
        'font-satoshi flex h-full items-center justify-center space-x-4 border-l border-r  border-secondary-900 text-center font-bold transition-colors hover:bg-secondary-900 data-[state=open]:bg-secondary-500 data-[state=open]:text-brand-500 lg:min-w-[180px]':
          !isMobile,
        'font-satoshi flex h-full w-full items-center justify-center border-t-0 py-4 text-center font-bold text-secondary-500 transition-colors first:border-secondary-900 hover:bg-secondary-500 hover:text-brand-500':
          isMobile,
      })}
      classNameContent={cn({ 'justify-center': isMobile })}
    >
      <span>Community</span>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      className="z-[1000] flex w-full min-w-fit flex-col py-2 hover:text-secondary-700 "
      sideOffset={0}
      align="start"
    >
      {navSubLinksCommunity.map(({ name, ...props }) => {
        return (
          <Link
            className={cn({
              'justify-left font-satoshi flex h-full items-center whitespace-nowrap px-8 py-2 text-center font-bold text-secondary-500 transition-colors hover:bg-secondary-900 lg:min-w-[180px]':
                true,
            })}
            key={props.href}
            {...props}
          >
            {name}
          </Link>
        );
      })}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default CommunityDropdown;

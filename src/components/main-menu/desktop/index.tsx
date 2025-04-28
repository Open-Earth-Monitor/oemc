'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/classnames';

import { Popover } from '@radix-ui/react-popover';
import { PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { XIcon } from 'lucide-react';
import { LuMenu } from 'react-icons/lu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import CommunityDropdown from '@/components/main-menu//community-dropdown';
import { navLinks } from '@/components/main-menu/constants';
import { LuArrowBigDown } from 'react-icons/lu';

const MainMenuDesktop = () => {
  const pathname = usePathname();

  return (
    <Popover>
      <PopoverTrigger
        className="flex items-center space-x-3.5 rounded-full border-none px-5 py-2.5"
        data-testid="themes-filter-desktop"
      >
        <span className="font-medium">Menu</span>
        <LuMenu className="h-6 w-6 text-accent-green" />
      </PopoverTrigger>
      <PopoverContent className="font-inter min-w-fit bg-secondary-500 px-0 py-0" sideOffset={-1}>
        <div className="flex justify-end p-5">
          <PopoverClose>
            <XIcon className="h-4 w-4 text-secondary-500" />
          </PopoverClose>
        </div>
        {navLinks.map(({ name, ...props }) => {
          const isActive = `/${pathname.split('/')[1]}` === props.href;
          return (
            <Link
              className={cn(
                'font-satoshi flex h-full items-start justify-start  border-secondary-900 text-center transition-colors hover:bg-secondary-900 lg:min-w-[180px]',
                {
                  'bg-secondary-500 text-brand-500 hover:text-secondary-500': isActive,
                }
              )}
              key={props.href}
              {...props}
            >
              {isActive && <span>·</span>}
              <span>{name}</span>
            </Link>
          );
        })}
        <Collapsible className="border-y-[0.5px] border-secondary-900">
          <CollapsibleTrigger className="py-2  hover:bg-brand-500">
            <span>Community</span>
            <LuArrowBigDown className="h-4 w-4 text-secondary-500" />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-2 pb-2">
            <nav className="flex h-full w-full justify-between" data-testid="main-navigation">
              {navLinks.map(({ name, ...props }) => {
                const isActive = `/${pathname.split('/')[1]}` === props.href;
                return (
                  <Link
                    className={cn(
                      'font-satoshi flex h-full items-center justify-center border-l border-r border-secondary-900 text-center font-bold transition-colors hover:bg-secondary-900 lg:min-w-[180px]',
                      {
                        'bg-secondary-500 text-brand-500 hover:text-secondary-500': isActive,
                      }
                    )}
                    key={props.href}
                    {...props}
                  >
                    {name}
                  </Link>
                );
              })}
              <CommunityDropdown />
            </nav>
          </CollapsibleContent>
        </Collapsible>
      </PopoverContent>
    </Popover>
  );
};

export default MainMenuDesktop;

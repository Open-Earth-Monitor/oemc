'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LuChevronDown } from 'react-icons/lu';

import cn from '@/lib/classnames';

import { navSubLinksCommunity } from '@/components/main-menu/constants';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const CommunityDropdown = () => {
  const pathname = usePathname();
  return (
    <Collapsible>
      <CollapsibleTrigger
        className={cn({
          'mx-0 px-5 py-4 text-2xl': true,
          'font-medium transition-colors hover:bg-black-500 hover:text-white-500  lg:min-w-[180px]':
            true,
        })}
      >
        Community
        <LuChevronDown className="h-5 w-6 font-bold group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="p-0">
        <nav className="flex w-full flex-col" data-testid="community-navigation">
          {navSubLinksCommunity.map(({ name, ...props }) => {
            const isActive = `/${pathname.split('/')[1]}` === props.href;
            return (
              <Link
                className="group rounded-[20px] px-6 py-5 font-medium transition-colors hover:bg-black-500 hover:text-white-500"
                key={props.href}
                {...props}
              >
                {isActive && (
                  <div className="h-2 w-2 rounded-full bg-black-500 group-hover:bg-white-500" />
                )}
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CommunityDropdown;

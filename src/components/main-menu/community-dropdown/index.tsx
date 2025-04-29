'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import cn from '@/lib/classnames';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import { navSubLinksCommunity } from '@/components/main-menu/constants';
import { LuArrowBigDown } from 'react-icons/lu';

const CommunityDropdown = ({ isMobile }: { isMobile?: boolean }) => {
  const pathname = usePathname();
  return (
    <Collapsible>
      <CollapsibleTrigger
        className={cn({
          'mx-0 px-0 text-2xl': true,
          'font-medium transition-colors hover:bg-white-100 data-[state=open]:bg-secondary-500 data-[state=open]:text-brand-500 lg:min-w-[180px]':
            !isMobile,
          'border-t-0 py-4 text-center font-bold text-secondary-500 transition-colors hover:bg-white-100 hover:text-brand-500':
            isMobile,
        })}
      >
        Community
      </CollapsibleTrigger>
      <CollapsibleContent className="py-3">
        <nav className="flex w-full flex-col space-y-6" data-testid="main-navigation">
          {navSubLinksCommunity.map(({ name, ...props }) => {
            const isActive = `/${pathname.split('/')[1]}` === props.href;
            return (
              <Link
                className="space-x-2.5 font-medium transition-colors hover:bg-white-100"
                key={props.href}
                {...props}
              >
                {isActive && <span className="text-xl">·</span>}
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

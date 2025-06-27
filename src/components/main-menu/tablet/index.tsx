'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { DropdownMenu } from '@radix-ui/react-dropdown-menu';

import { cn } from '@/lib/classnames';

import { navLinks, navSubLinksCommunity } from '@/components/main-menu/constants';
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from '@/components/ui/dropdown';

const MainMenuDesktop = () => {
  const pathname = usePathname();
  return (
    <nav className="flex h-full w-full justify-between" data-testid="main-navigation-tablet">
      {navLinks.slice(0, 2).map(({ name, ...props }) => {
        const isActive = `/${pathname.split('/')[1]}` === props.href;
        return (
          <Link
            className={cn(
              'flex h-full min-w-[100px] items-center justify-center border-l border-r border-secondary-900 px-2 text-center font-satoshi font-bold transition-colors hover:bg-secondary-900',
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
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-full min-w-[100px] items-center justify-center border-l border-r border-secondary-900 text-center font-satoshi font-bold transition-colors hover:bg-secondary-900">
          ...
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent
            sideOffset={0}
            side="bottom"
            align="start"
            avoidCollisions
            className="min-w-fit bg-[#09131D]/90"
            style={{ width: 'fit-content' }}
          >
            <div>
              {navSubLinksCommunity.map(({ name, ...props }) => {
                const isActive = `/${pathname.split('/')[1]}` === props.href;
                return (
                  <DropdownMenuItem
                    key={props.href}
                    className={cn(
                      'min-h-[70px] rounded-none border-b border-secondary-900 px-6 text-base text-secondary-500 last-of-type:border-b-0 hover:bg-secondary-900',
                      {
                        'bg-secondary-500 text-brand-500 hover:text-secondary-500': isActive,
                      }
                    )}
                  >
                    <Link
                      className="justify-left flex w-full items-center font-satoshi font-bold"
                      {...props}
                    >
                      {name}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </nav>
  );
};

export default MainMenuDesktop;

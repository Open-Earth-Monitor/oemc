'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/classnames';

import CommunityDropdown from '@/components/main-menu//community-dropdown';
import { navLinks } from '@/components/main-menu/constants';

const MainMenuDesktop = () => {
  const pathname = usePathname();

  return (
    <nav className="flex h-full w-full justify-between" data-testid="main-navigation">
      {navLinks.map(({ name, ...props }) => {
        const isActive = `/${pathname.split('/')[1]}` === props.href;
        return (
          <Link
            className={cn(
              'flex h-full items-center justify-center border-l border-r border-secondary-900 text-center font-satoshi font-bold transition-colors hover:bg-secondary-900 lg:min-w-[180px]',
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
  );
};

export default MainMenuDesktop;

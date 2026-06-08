'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/classnames';

import { navLinks } from '@/components/main-menu/constants';

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <ul
      className="relative flex w-full flex-col gap-1 py-0 text-2xl font-medium"
      data-testid="main-navigation"
    >
      {navLinks.map(({ name, ...props }) => {
        const isActive = `/${pathname.split('/')[1]}` === props.href;
        return (
          <li
            key={props.href}
            className={cn({
              'group/nav-link rounded-3xl px-5 py-4 hover:bg-black-500 hover:text-white-500': true,
            })}
          >
            <Link {...props} className="flex items-center space-x-2.5">
              {isActive && (
                <div className="h-2 w-2 rounded-full bg-black-500 group-hover/nav-link:bg-white-500" />
              )}
              <span>{name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;

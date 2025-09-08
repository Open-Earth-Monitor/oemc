'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/classnames';

import { navLinks } from '@/components/main-menu/constants';

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="relative flex w-full flex-col text-2xl font-medium">
      {navLinks.map(({ name, ...props }) => {
        const isActive = `/${pathname.split('/')[1]}` === props.href;
        return (
          <li
            key={props.href}
            className={cn({
              'decoration px-5 py-4 hover:bg-accent-green': true,
            })}
          >
            <Link {...props} className="flex items-center space-x-2.5">
              <span>{name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;

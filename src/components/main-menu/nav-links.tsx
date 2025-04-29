'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/classnames';

import { navLinks } from '@/components/main-menu/constants';

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="w-full space-y-2 text-2xl font-medium">
      {navLinks.map(({ name, ...props }) => {
        const isActive = `/${pathname.split('/')[1]}` === props.href;
        return (
          <li
            key={props.href}
            className={cn({
              'decoration py-6 hover:bg-white-100': true,
              'list-disc': isActive,
            })}
          >
            <Link {...props} className="space-x-2.5">
              <span>{name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;

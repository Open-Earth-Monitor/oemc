'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/classnames';

import { navLinks } from '@/components/main-menu/constants';

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="w-full overflow-hidden text-2xl font-medium">
      {navLinks.map(({ name, ...props }) => {
        const isActive = `/${pathname.split('/')[1]}` === props.href;
        return (
          <li
            key={props.href}
            className={cn({
              'decoration overflow-hidden px-5 py-4 first:rounded-t-2xl hover:bg-white-100': true,
              'list-inside list-disc': isActive,
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

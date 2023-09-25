'use client';
import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/classnames';

export const navLinks = [
  {
    name: 'Hub',
    href: '/',
    'data-testid': 'hub-link',
  },
  {
    name: 'Map',
    href: '/map',
    'data-testid': 'map-link',
  },
];
const Header: FC = () => {
  const pathname = usePathname();

  return (
    <header className="z-50 w-full border-b border-b-secondary-1000 bg-brand-500">
      <div className="m-auto flex max-w-7xl items-center justify-between">
        <Image
          alt="Open-earth-monitor"
          src="/images/OEM-logo.svg"
          width={130}
          height={35}
          className="inline-flex"
        />
        <nav className="flex justify-between" data-testid="main-navigation">
          {navLinks.map((link) => {
            const isActive = `/${pathname.split('/')[1]}` === link.href;
            return (
              <Link
                className={cn({
                  'min-w-[130px] border border-secondary-1000 py-4 text-center text-secondary-500':
                    true,
                  'bg-secondary-500 text-brand-500': isActive,
                })}
                href={link.href}
                key={link.name}
                data-testid={link['data-testid']}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;

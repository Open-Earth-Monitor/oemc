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
    <header className="z-10 h-[70px] w-full border-b border-b-secondary-900 bg-brand-500/80">
      <div className="m-auto flex flex h-full max-w-[1200px] items-center justify-between">
        <div className="mx-2">
          <Image
            alt="Open-earth-monitor"
            src="/images/OEM-logo.svg"
            width={147}
            height={40}
            className="inline-block"
          />
        </div>
        <nav className="flex h-full justify-between" data-testid="main-navigation">
          {navLinks.map((link) => {
            const isActive = `/${pathname.split('/')[1]}` === link.href;
            return (
              <Link
                className={cn(
                  'flex h-full min-w-[180px] items-center justify-center border-l border-r border-secondary-900 text-center font-satoshi font-bold text-secondary-500 transition-colors hover:bg-secondary-900',
                  {
                    'bg-secondary-500 text-brand-500 hover:text-secondary-500': isActive,
                  }
                )}
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

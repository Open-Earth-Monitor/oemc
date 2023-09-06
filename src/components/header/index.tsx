'use client';
import { FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/classnames';

export const navLinks = [
  {
    name: 'Hub',
    href: '/hub',
  },
  {
    name: 'Map',
    href: '/map',
  },
];
export const Header: FC = () => {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-b-brand-100">
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
            const isActive = pathname === link.href || (pathname === '/' && link.href === '/hub');

            return (
              <Link
                className={cn({
                  'min-w-[130px] border border-brand-100 py-4 text-center text-secondary-200': true,
                  'bg-secondary-200 text-brand-600': isActive,
                })}
                href={link.href}
                key={link.name}
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

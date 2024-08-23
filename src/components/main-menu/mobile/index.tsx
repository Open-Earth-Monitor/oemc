'use client';
import { useCallback, useState, useEffect } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { DialogContent } from '@radix-ui/react-dialog';

import cn from '@/lib/classnames';

import MonitorsDirectory from '@/components/monitors/table';
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const MainMenuMobile = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [menuVisibility, setMenuVisibility] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMapMenu = useCallback(() => {
    setMenuVisibility(!menuVisibility);
  }, [setMenuVisibility, menuVisibility]);

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
    //eslint-disable-next-line
  }, [pathname]);

  return (
    <div>
      <Dialog open={isOpen}>
        <DialogTrigger asChild data-testid="disclaimer-menu-mobile">
          <button
            onClick={handleClick}
            type="button"
            className={`z-[1000] flex h-8 w-8 cursor-pointer flex-col flex-wrap justify-around`}
          >
            <div
              className={`block h-0.5 w-8 origin-[1px] rounded bg-secondary-500 transition-all ${
                isOpen ? 'rotate-45' : 'rotate-0'
              }`}
            />
            <div
              className={`block h-0.5 w-8 origin-[1px] rounded bg-secondary-500 transition-all ${
                isOpen ? 'translate-x-full bg-transparent' : 'translate-x-0'
              }`}
            />
            <div
              className={`block h-0.5 w-8 origin-[1px] rounded bg-secondary-500 transition-all ${
                isOpen ? 'rotate-[-45deg]' : 'rotate-0'
              }`}
            />
          </button>
        </DialogTrigger>
        <DialogContent className="fixed bottom-0 left-0 right-0 top-0 w-screen translate-x-0 transform bg-brand-500 px-0 py-0 text-secondary-500">
          <DialogHeader className="items-end">
            <DialogTitle asChild>
              <div className="flex w-full justify-end p-4">
                <button
                  onClick={handleClick}
                  type="button"
                  className={`flex h-5 w-5 cursor-pointer flex-col flex-wrap justify-around`}
                >
                  <div
                    className={`block h-0.5 w-5 origin-[0.5px] rounded bg-secondary-500 transition-all ${
                      isOpen ? 'rotate-45' : 'rotate-0'
                    }`}
                  />
                  <div
                    className={`block h-0.5 w-5 origin-[0.5px] rounded bg-secondary-500 transition-all ${
                      isOpen ? 'translate-x-full bg-transparent' : 'translate-x-0'
                    }`}
                  />
                  <div
                    className={`block h-0.5 w-5 origin-[0.5px] rounded bg-secondary-500 transition-all ${
                      isOpen ? 'rotate-[-45deg]' : 'rotate-0'
                    }`}
                  />
                </button>
              </div>
            </DialogTitle>
            <DialogDescription asChild>
              <div
                className="flex h-full w-full flex-col divide-y divide-secondary-900"
                data-testid="main-navigation-mobile"
              >
                <Link
                  href="/"
                  className={cn(
                    'flex h-full min-w-[180px] items-center justify-center p-4 text-center font-satoshi font-bold text-secondary-500 transition-colors first:border-t first:border-secondary-900 hover:bg-secondary-500 hover:text-brand-500',
                    {
                      'hover:bg-secondary-500  hover:text-brand-500':
                        `/${pathname.split('/')[1]}` === '/',
                    }
                  )}
                  data-testid="hub-link"
                >
                  Hub
                </Link>
                <button
                  type="button"
                  className="flex h-full min-w-[180px] items-center justify-center p-4 text-center font-satoshi font-bold text-secondary-500 transition-colors first:border-t first:border-secondary-900 hover:bg-secondary-500 hover:text-brand-500"
                  onClick={handleMapMenu}
                >
                  Map
                </button>
                {menuVisibility && (
                  <div className="h-full max-h-[calc(100vh-300px)] overflow-y-auto sm:h-80">
                    <MonitorsDirectory />
                  </div>
                )}
                <Link
                  href="/"
                  className="flex h-full min-w-[180px] items-center justify-center p-4 text-center font-satoshi font-bold text-secondary-500 transition-colors first:border-t first:border-secondary-900 hover:bg-secondary-500 hover:text-brand-500"
                  data-testid="data-catalogue-link"
                  target="_blank"
                >
                  Data Catalogue
                </Link>
                <Link
                  href="https://earthmonitor.org/"
                  className="flex h-full min-w-[180px] items-center justify-center border-y border-secondary-900 p-4 text-center font-satoshi font-bold text-secondary-500 transition-colors hover:bg-secondary-500 hover:text-brand-500"
                  data-testid="project-site-link"
                  target="_blank"
                >
                  Project site
                </Link>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MainMenuMobile;

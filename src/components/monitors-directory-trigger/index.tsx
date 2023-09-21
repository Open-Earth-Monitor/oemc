'use client';

import { useState, useCallback, useEffect, use } from 'react';
import { usePathname } from 'next/navigation';
import { Cross2Icon, Half2Icon } from '@radix-ui/react-icons';

import MonitorsDirectory from '@/components/monitors-directory';
import { buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

const MapPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const monitorId = pathname.split('/')[2];
  const handleModal = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  useEffect(() => setIsOpen(true), []);

  useEffect(() => {
    if (!monitorId) {
      setIsOpen(true);
    }
  }, [monitorId]);

  return (
    <Dialog open={isOpen}>
      {!!monitorId && (
        <DialogTrigger className="w-full">
          <button
            type="button"
            onClick={handleModal}
            className={buttonVariants({ variant: 'dark' })}
          >
            Monitors Directory
          </button>
        </DialogTrigger>
      )}
      <DialogContent className="max-w-90vw p-12">
        <DialogHeader>
          <DialogTitle asChild>
            <div className="divide-x-secondary-500 space-x-6 divide-x py-4">
              <h1 className="inline-block text-5xl">Monitors directory</h1>
              <span className="pl-6 text-2xl">Select one to discover</span>
            </div>
          </DialogTitle>
          <DialogDescription asChild>
            <MonitorsDirectory />
          </DialogDescription>
          {!!monitorId && (
            <DialogClose className="absolute right-10 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <Cross2Icon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MapPage;

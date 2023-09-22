'use client';

import { FC, useCallback } from 'react';

import MonitorsTable from '@/components/monitors/table';
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

const MonitorsDirectoryDialog: FC<{
  isOpen: boolean;
  onClick?: (boolean) => void;
}> = ({ isOpen = false, onClick }) => {
  const handleModal = useCallback(() => onClick(!isOpen), [isOpen, onClick]);
  return (
    <Dialog open={isOpen} defaultOpen={isOpen}>
      {!isOpen && (
        <DialogTrigger className="w-full" asChild>
          <button
            type="button"
            data-testid="monitors-directory-trigger"
            onClick={handleModal}
            className={buttonVariants({ variant: 'dark' })}
          >
            Monitors Directory
          </button>
        </DialogTrigger>
      )}
      <DialogContent className="max-w-90vw p-12">
        <DialogHeader>
          <DialogTitle>
            <div className="divide-x-secondary-500 space-x-6 divide-x py-4">
              <h1 className="inline-block text-5xl">Monitors directory</h1>
              <span className="pl-6 text-2xl">Select one to discover</span>
            </div>
          </DialogTitle>
          <DialogDescription asChild>
            <>
              <MonitorsTable />

              {!!onClick && (
                <DialogClose
                  onClick={handleModal}
                  className="absolute right-10 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                />
              )}
            </>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MonitorsDirectoryDialog;

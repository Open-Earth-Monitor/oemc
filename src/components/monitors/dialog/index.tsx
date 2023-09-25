'use client';

import { FC } from 'react';

import MonitorsTable from '@/components/monitors/table';
import { Button } from '@/components/ui/button';
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
  isOpen?: boolean;
  preventClose?: boolean;
  showTriggerElement?: boolean;
}> = ({ isOpen = false, preventClose = false, showTriggerElement = true }) => {
  return (
    <Dialog defaultOpen={isOpen}>
      {showTriggerElement && (
        <DialogTrigger className="w-full" asChild>
          <Button variant="dark" data-testid="monitors-directory-trigger">
            Monitors Directory
          </Button>
        </DialogTrigger>
      )}
      <DialogContent
        className="max-w-90vw p-12"
        onInteractOutside={(e) => preventClose && e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle asChild>
            <div className="divide-x-secondary-500 space-x-6 divide-x py-4">
              <h1 className="inline-block text-5xl">Monitors directory</h1>
              <span className="pl-6 text-2xl">Select one to discover</span>
            </div>
          </DialogTitle>
          <DialogDescription asChild>
            <>
              <MonitorsTable />
              {!preventClose && (
                <DialogClose className="absolute right-10 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" />
              )}
            </>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MonitorsDirectoryDialog;

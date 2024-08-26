import type { FC } from 'react';

import { useMediaQuery } from 'react-responsive';
import { mobile } from '@/lib/media-queries';
import cn from '@/lib/classnames';

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

const MonitorsDirectoryDialog: FC = () => {
  const isMobile = useMediaQuery(mobile);
  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        <Button
          variant="dark"
          data-testid="monitors-directory-trigger"
          className="text-secondary-500"
        >
          Monitors Directory
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn({
          'z-[1000] sm:max-h-[85vh]': true,
          'h-[calc(100vh-60px)] w-screen max-w-lg': isMobile,
        })}
      >
        <div className="p-2">
          <DialogHeader>
            <DialogTitle asChild>
              <header className="sm:divide-x-secondary-500 text-left sm:divide-x">
                <h1 className="font-satoshi text-4xl font-bold leading-tight text-secondary-500 sm:inline-block sm:pr-6">
                  Monitors directory
                </h1>
                <span className="inline-block sm:pl-6">Select one to discover</span>
              </header>
            </DialogTitle>
            <DialogDescription asChild>
              <div>
                <MonitorsTable />
                <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground sm:right-10 sm:top-6" />
              </div>
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MonitorsDirectoryDialog;

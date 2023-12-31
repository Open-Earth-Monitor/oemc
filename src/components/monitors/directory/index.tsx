import type { FC } from 'react';

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
  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        <Button variant="dark" data-testid="monitors-directory-trigger">
          Monitors Directory
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh]">
        <div className="p-2">
          <DialogHeader>
            <DialogTitle asChild>
              <header className="divide-x-secondary-500 divide-x">
                <h1 className="inline-block pr-6 font-satoshi text-4xl font-bold">
                  Monitors directory
                </h1>
                <span className="inline-block pl-6">Select one to discover</span>
              </header>
            </DialogTitle>
            <DialogDescription asChild>
              <div>
                <MonitorsTable />
                <DialogClose className="absolute right-10 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground" />
              </div>
            </DialogDescription>
          </DialogHeader>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MonitorsDirectoryDialog;

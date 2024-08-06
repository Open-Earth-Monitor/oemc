'use client';
import { PropsWithChildren, useEffect, useState } from 'react';

import { useMediaQuery } from 'react-responsive';

import { PopoverClose } from '@radix-ui/react-popover';
import { ChevronDown, ChevronRight } from 'lucide-react';

import { mobile, tablet } from '@/lib/media-queries';

import { useSyncSidebarState } from '@/hooks/sync-query';

import MonitorHeader from '@/components/monitors/header';
import TabsNav from '@/components/tabs-nav';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const MonitorContent = ({ children }: PropsWithChildren) => {
  const isMobile = useMediaQuery(mobile);
  const isTablet = useMediaQuery(tablet);
  const isDesktop = !isMobile && !isTablet;
  const [open, setOpen] = useSyncSidebarState();
  const [defaultOpen, setDefaultOpen] = useState(false);

  useEffect(() => {
    void setDefaultOpen(true);
  }, []);

  useEffect(() => {
    if (isDesktop) {
      void setOpen(true);
    }
  }, [isDesktop, setOpen]);

  const onOpenChange = () => {
    void setOpen((prev) => !prev);
  };

  return (
    <section className="monitors absolute bottom-0 left-0 z-[55] w-full border-t border-secondary-900 bg-brand-500 p-1 sm:bottom-auto sm:left-4 sm:top-4 sm:w-fit sm:border-0 sm:p-0">
      {/* Desktop */}
      <div className="bottom-3 left-4 z-[60] hidden h-[calc(100vh-28px-70px)] w-fit max-w-fit rounded-none border-none bg-brand-500 px-0 py-0 lg:block">
        <ScrollArea className="h-full max-h-[calc(100vh-28px-70px)] w-[526px] p-7.5" type="auto">
          <div className="w-full space-y-1 sm:space-y-6">
            <MonitorHeader />
            <TabsNav />
          </div>
          {children}
        </ScrollArea>
      </div>

      {/* Tablet */}
      <Sheet onOpenChange={onOpenChange} open={isTablet && defaultOpen && open}>
        <SheetTrigger className="hidden h-[60px] w-12 border-none bg-brand-500 sm:block lg:hidden">
          <ChevronRight className="mx-auto h-6 w-6 text-secondary-500" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bottom-3 left-4 top-auto z-[60] hidden h-[60vh] w-fit max-w-fit rounded-none border-none bg-brand-500 px-0 py-0 sm:block sm:h-[calc(100vh-28px-70px)] lg:hidden"
        >
          <ScrollArea className="h-full max-h-[calc(100vh-28px-70px)] w-[370px] p-7.5" type="auto">
            <div className="w-full space-y-1 sm:space-y-6">
              <MonitorHeader />
              <TabsNav />
            </div>
            {children}
          </ScrollArea>
          <SheetClose className="absolute left-auto right-0 top-0 h-[60px] w-12 translate-x-full border-none bg-brand-500">
            <ChevronDown className="mx-auto h-6 w-6 rotate-90 text-secondary-500" />
          </SheetClose>
        </SheetContent>
      </Sheet>

      <Popover onOpenChange={onOpenChange} open={isMobile && defaultOpen && open}>
        <PopoverTrigger className="z-[60] h-12 w-1/2 bg-secondary-500 font-inter text-sm font-medium uppercase text-brand-500 hover:bg-secondary-900 hover:text-secondary-500 data-[state=open]:bg-secondary-900 data-[state=open]:text-secondary-500 sm:hidden">
          Monitor
        </PopoverTrigger>
        <PopoverContent
          sideOffset={0}
          side="top"
          className="w-screen rounded-none border-none px-0 py-0"
        >
          <PopoverClose className="absolute left-0 top-0 block h-12 w-[60px] -translate-y-full border-none bg-brand-500 focus:text-secondary-500">
            <ChevronDown className="mx-auto h-6 w-6 text-secondary-500" />
          </PopoverClose>
          <ScrollArea className="h-full max-h-[60vh] w-full" type="auto">
            <div className="w-full space-y-1 sm:space-y-6">
              <MonitorHeader />
              <TabsNav />
            </div>
            {children}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </section>
  );
};

export default MonitorContent;

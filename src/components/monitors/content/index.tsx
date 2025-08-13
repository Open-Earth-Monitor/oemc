'use client';
import { PropsWithChildren, useEffect, useState } from 'react';

import { useMediaQuery } from 'react-responsive';

import { PopoverClose } from '@radix-ui/react-popover';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

import { mobile, tablet } from '@/lib/media-queries';

import { useSyncSidebarState } from '@/hooks/sync-query';

import MonitorHeader from '@/components/monitors/header';
import TabsNav from '@/components/tabs-nav';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    <section className="monitors absolute bottom-0 left-0 top-0 z-[55] w-full  bg-brand-500 p-1  sm:w-fit sm:border-0 sm:p-0">
      {/* Desktop and tablet */}

      {!isMobile && (
        <motion.section
          initial={{ x: '-100%' }} // Start hidden and off-screen
          animate={{
            x: open ? 0 : '-100%', // Slide in and out
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }} // Smooth easing
          className="absolute bottom-0 left-0 top-0 z-[55] w-full  bg-brand-500 p-1 sm:w-fit sm:border-0 sm:p-0"
        >
          <div className="relative">
            <button
              type="button"
              onClick={onOpenChange}
              className="absolute -right-12 bottom-0 h-[60px] w-12 border-none bg-brand-500"
            >
              <motion.div
                animate={{
                  rotate: open ? 180 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="mx-auto h-6 w-6 text-secondary-500" />
              </motion.div>
            </button>
            <motion.div
              initial={{ opacity: 1, x: 0 }}
              animate={{
                opacity: open ? 1 : 0,
                x: open ? 0 : '-100%',
                transitionEnd: {
                  display: open ? 'block' : 'none',
                },
              }}
              transition={{ duration: 0.3 }}
              className="bottom-3 left-0 top-auto w-fit max-w-fit rounded-none border-none bg-brand-500 px-0 py-0 sm:block sm:h-[calc(100vh-24px-70px)]"
            >
              <motion.div
                initial={{ opacity: 1, x: 0 }}
                animate={{
                  opacity: open ? 1 : 0,
                  x: open ? 0 : '-100%',
                  transitionEnd: {
                    display: open ? 'block' : 'none',
                  },
                }}
                transition={{ duration: 0.3 }}
                className="bottom-3 left-0 h-[calc(100vh-24px-70px)] w-fit max-w-fit rounded-none border-none bg-brand-500 px-0 py-0 lg:block"
              >
                <ScrollArea className="h-full p-7.5 md:w-[370px] lg:w-[526px]" type="auto">
                  <div className="w-full space-y-1 sm:space-y-6">
                    <MonitorHeader />
                    <TabsNav />
                  </div>
                  {children}
                </ScrollArea>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {isMobile && (
        <Popover onOpenChange={onOpenChange} open={isMobile && defaultOpen && open}>
          <PopoverTrigger className="z-[60] h-12 w-1/2 bg-secondary-500 font-inter text-sm font-medium uppercase text-brand-500 hover:bg-secondary-900 hover:text-secondary-500 data-[state=open]:bg-secondary-900 data-[state=open]:text-secondary-500 sm:hidden">
            Monitor
          </PopoverTrigger>
          <PopoverContent
            sideOffset={0}
            side="top"
            className="w-screen rounded-none border-none px-0 py-0"
          >
            <PopoverClose className="absolute left-0 top-0 z-[60] block h-12 w-[60px] -translate-y-full border-none bg-brand-500 focus:text-secondary-500">
              <ChevronDown className="mx-auto h-6 w-6 text-secondary-500" />
            </PopoverClose>
            <ScrollArea className="z-[60] h-full max-h-[60vh] w-full" type="auto">
              <div className="w-full space-y-1 sm:space-y-6">
                <MonitorHeader />
                <TabsNav />
              </div>
              {children}
            </ScrollArea>
          </PopoverContent>
        </Popover>
      )}
    </section>
  );
};

export default MonitorContent;

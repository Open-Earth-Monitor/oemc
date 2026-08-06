'use client';

import { ChevronDown } from 'lucide-react';

import GlobeLiveUpdates from '@/containers/globe/live-updates/mobile';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { NewsSVG } from '@/SVGS/news';

export const LiveUpdatesGlobeMobile = () => {
  return (
    <Drawer modal={false}>
      <DrawerTrigger
        aria-label="Open live updates feed"
        data-testid="mobile-live-updates-trigger"
        className="focus:text-white data-[s] group/live-trigger shrink-0 rounded-full border border-accent-green p-3 text-accent-green hover:text-white-500 focus:outline-none active:bg-accent-green data-[state=open]:bg-accent-green data-[state=open]:text-white-500"
      >
        <NewsSVG className="h-6 w-6 text-accent-green" />
      </DrawerTrigger>
      {/* The drawer is fixed to the bottom of the viewport, so it has to reserve
          the footer's own height — measured, because the mobile footer stacks
          and is much taller than the desktop one — and scroll within what is
          left instead of running underneath it. The `!` on the caps is needed
          because the drawer primitive sets its own `max-h-[80vh]` behind a
          data-attribute selector, which otherwise outranks them. */}
      <DrawerContent
        data-testid="mobile-live-updates-drawer"
        className="mb-[var(--footer-height,40px)] !max-h-[calc(100dvh-var(--footer-height,40px))] space-y-5 overflow-y-auto bg-black-500 p-5 text-white-500"
      >
        <DrawerHeader className="flex flex-row items-center justify-between p-0">
          <DrawerTitle className="inline-flex text-white-500">
            <p className="font-medium text-white-500">Live feed</p>
          </DrawerTitle>
          <DrawerClose className="group/live-close flex items-center gap-2.5  px-2 py-1 text-sm  focus:outline-none">
            <span>Collapse</span>
            <div className="rounded-full bg-white-950 p-2">
              <ChevronDown className="h-4 w-4 text-accent-green group-hover/live-close:text-white-500 group-focus/live-close:text-white-500" />
            </div>
          </DrawerClose>
        </DrawerHeader>
        <GlobeLiveUpdates />
      </DrawerContent>
    </Drawer>
  );
};

export default LiveUpdatesGlobeMobile;

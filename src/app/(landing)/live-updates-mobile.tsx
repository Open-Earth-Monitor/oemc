'use client';

import { ChevronDown } from 'lucide-react';

import GlobeSocialMedia from '@/containers/globe/social-media/mobile';

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
    <Drawer>
      <DrawerTrigger className="focus:text-white data-[s] group shrink-0 rounded-full border border-accent-green p-3 text-accent-green hover:text-white-500 focus:outline-none active:bg-accent-green data-[state=open]:bg-accent-green data-[state=open]:text-white-500">
        <NewsSVG className="h-6 w-6 text-accent-green" />
      </DrawerTrigger>
      <DrawerContent className="max-h-[calc(100dvh-72px)] space-y-5 bg-black-500 p-5 text-white-500">
        <DrawerHeader className="flex flex-row items-center justify-between p-0">
          <DrawerTitle className="inline-flex text-white-500">
            <p className="font-medium text-white-500">Live feed</p>
          </DrawerTitle>
          <DrawerClose className="flex items-center gap-2.5  px-2 py-1 text-sm  focus:outline-none">
            <span>Collapse</span>
            <div className="rounded-full bg-white-950 p-2">
              <ChevronDown className="h-4 w-4 text-accent-green group-hover:text-white-500 group-focus:text-white-500" />
            </div>
          </DrawerClose>
        </DrawerHeader>
        <GlobeSocialMedia />
      </DrawerContent>
    </Drawer>
  );
};

export default LiveUpdatesGlobeMobile;

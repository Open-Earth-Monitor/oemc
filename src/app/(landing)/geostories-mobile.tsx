'use client';

import { useMemo } from 'react';

import { ChevronDown } from 'lucide-react';

import { useDebounce } from '@/hooks/datasets';
import { GeostoriesParams, useGeostories } from '@/hooks/geostories';
import { useSyncCategories, useSyncSearchGeostoriesGlobe } from '@/hooks/sync-query';

import GeostoriesList from '@/containers/globe/geostories/geostories-list';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { ListSVG } from '@/SVGS/list';

export const GeostoriesGlobeMobile = () => {
  const [searchValue] = useSyncSearchGeostoriesGlobe();
  const [categories] = useSyncCategories();

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const params: GeostoriesParams = useMemo(
    () => ({
      sort_by: 'title',
      // ...(categories.length > 0 && { theme: categories }),
      ...(debouncedSearchValue !== '' &&
        debouncedSearchValue.length >= 2 && { title: debouncedSearchValue }),
    }),
    [
      // categories,
      debouncedSearchValue,
    ]
  );

  const { data: geostoriesList, isLoading } = useGeostories({
    params,
    queryOptions: {
      select: (data) => {
        if (Array.isArray(categories) && categories.length > 0)
          return data.filter((d) => categories.includes(d.theme));
        return data;
      },
    },
  });
  return (
    <Drawer>
      <DrawerTrigger
        aria-label="Open geostories list"
        data-testid="mobile-geostories-trigger"
        className="group shrink-0 rounded-full border border-accent-green p-3 text-accent-green hover:text-white-500 focus:outline-none focus-visible:text-white-500 focus-visible:ring-2 focus-visible:ring-accent-green active:bg-accent-green active:text-white-500 data-[state=open]:bg-accent-green data-[state=open]:text-white-500"
      >
        {/* No colour of its own: it inherits the trigger's, so hover, focus and
            open states actually reach the icon. */}
        <ListSVG className="h-6 w-6" />
      </DrawerTrigger>
      {/* Same sizing as the live feed drawer: clear the footer below and the
          header above, scroll the rest. See `live-updates-mobile.tsx` for the
          numbers and why the caps need `!`. */}
      <DrawerContent
        data-testid="mobile-geostories-drawer"
        className="mb-[var(--footer-height,40px)] !max-h-[calc(100dvh-var(--footer-height,40px)-86px)] space-y-5 overflow-y-auto bg-black-500 p-5 text-white-500 sm:!max-h-[calc(100dvh-var(--footer-height,40px)-106px)]"
      >
        <DrawerHeader className="flex flex-row items-center justify-between p-0">
          <DrawerTitle className="inline-flex text-white-500">Geostories</DrawerTitle>
          <DrawerClose className="group/geostories-close flex items-center gap-2.5  px-2 py-1 text-sm  focus:outline-none">
            <span>Collapse</span>
            <div className=" rounded-full bg-white-950 p-2">
              <ChevronDown className="h-4 w-4 text-accent-green group-hover/geostories-close:text-white-500 group-focus/geostories-close:text-white-500" />
            </div>
          </DrawerClose>
        </DrawerHeader>
        <GeostoriesList geostoriesList={geostoriesList} isLoading={isLoading} />
      </DrawerContent>
    </Drawer>
  );
};

export default GeostoriesGlobeMobile;

'use client';

import { useMemo } from 'react';

import { useDebounce } from '@/hooks/datasets';
import { GeostoriesParams, useGeostories } from '@/hooks/geostories';
import { useSyncCategories, useSyncSearchGeostoriesGlobe } from '@/hooks/sync-query';

import GeostoriesList from '@/containers/globe/geostories/geostories-list';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
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
      <DrawerTrigger className="absolute bottom-60 right-5 shrink-0 rounded-full border border-accent-green p-3 text-accent-green focus:bg-accent-green focus:outline-none active:bg-accent-green">
        <ListSVG className="h-6 w-6 text-accent-green" />
      </DrawerTrigger>
      <DrawerContent className="space-y-5 bg-black-500 p-5 text-white-500">
        <DrawerHeader className="flex flex-row items-center justify-between p-0">
          <DrawerTitle className="inline-flex text-white-500">Geostories</DrawerTitle>
          <DrawerClose>
            <span>Collapse</span>
            <Button>x</Button>
          </DrawerClose>
        </DrawerHeader>
        <GeostoriesList geostoriesList={geostoriesList} isLoading={isLoading} />
        <DrawerFooter>
          <Button>Submit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default GeostoriesGlobeMobile;

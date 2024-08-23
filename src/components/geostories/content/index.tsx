'use client';
import { PropsWithChildren, useEffect, useState, useMemo } from 'react';

import { useMediaQuery } from 'react-responsive';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { PopoverClose } from '@radix-ui/react-popover';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { HiArrowLeft } from 'react-icons/hi';

import { cn } from '@/lib/classnames';
import { mobile, tablet } from '@/lib/media-queries';

import { useGeostoryParsed, useGeostoryLayers } from '@/hooks/geostories';
import {
  useSyncLayersSettings,
  useSyncCompareLayersSettings,
  useSyncSidebarState,
} from '@/hooks/sync-query';

import DatasetCard from '@/components/datasets/card';
import GeostoryHeader from '@/components/geostories/header';
import Loading from '@/components/loading';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const GeostoryContent = ({ children }: PropsWithChildren) => {
  const isMobile = useMediaQuery(mobile);
  const isTablet = useMediaQuery(tablet);
  const isDesktop = !isMobile && !isTablet;
  const [open, setOpen] = useSyncSidebarState();
  const [defaultOpen, setDefaultOpen] = useState(false);

  const params = useParams();
  const geostory_id = params.geostory_id as string;

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

  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();

  const { data: geostoryData, isLoading: isGeostoryLoading } = useGeostoryParsed({ geostory_id });
  const { data: layersData, isLoading: isLayersLoading } = useGeostoryLayers({ geostory_id });

  // Only show layers with position right
  const geostoryLayers = useMemo(
    () => layersData?.filter(({ position }) => position === 'right'),
    [layersData]
  );
  const comparisonLayer = useMemo(
    () => layersData?.find(({ position }) => position === 'left'),
    [layersData]
  );

  useEffect(() => {
    if (geostoryLayers?.length && !layers) {
      void setLayers(
        [
          {
            id: geostoryLayers[0].layer_id,
            opacity: 1,
            date: geostoryLayers[0].range?.[0]?.value,
          },
        ],
        { shallow: false }
      );

      if (comparisonLayer && !compareLayers) {
        void setCompareLayers([{ id: comparisonLayer.layer_id, opacity: 1 }], { shallow: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geostoryLayers, comparisonLayer]);

  return (
    <>
      <div className="relative">
        <section className="absolute bottom-0 left-0 z-[55] w-full border-t border-secondary-900 bg-brand-500 p-1 sm:bottom-auto sm:left-4 sm:top-[82px] sm:w-fit sm:border-0 sm:p-0">
          {/* Desktop */}
          <Sheet onOpenChange={onOpenChange} open={defaultOpen && open}>
            <SheetTrigger
              className={cn({
                'hidden h-[60px] w-12 border-none bg-brand-500': true,
                'sm:block': !open,
                hidden: open,
              })}
            >
              <ChevronRight className="mx-auto h-6 w-6 text-secondary-500" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bottom-3 left-4 top-auto hidden w-fit max-w-fit rounded-none border-none bg-brand-500 px-0 py-0 sm:block sm:h-[calc(100vh-24px-70px)]"
            >
              <div className="bottom-3 left-4 hidden h-[calc(100vh-24px-70px)] w-fit max-w-fit rounded-none border-none bg-brand-500 px-0 py-0 lg:block">
                <ScrollArea className="h-full w-[526px] p-7.5" type="auto">
                  <div className="space-y-6">
                    <div className="divide-y divide-secondary-900">
                      {geostoryData?.monitors?.[0].id && (
                        <Link
                          href={`/map/${geostoryData.monitors[0].id}/geostories`}
                          className="sticky top-0 z-10 block space-x-3 bg-brand-500 pb-8 font-bold"
                          data-testid="back-to-monitor"
                          style={{ color: geostoryData.color }}
                        >
                          <HiArrowLeft className="inline-block h-6 w-6" />
                          <span data-testid="monitor-title-back-btn">
                            Back to {geostoryData.monitors[0].title}.
                          </span>
                        </Link>
                      )}
                      {isGeostoryLoading && <Loading />}
                      {geostoryData && !isGeostoryLoading && (
                        <GeostoryHeader {...geostoryData} color={geostoryData.color} />
                      )}
                    </div>
                    <div>
                      {isLayersLoading && <Loading />}-
                      {!!layersData?.length && !isLayersLoading && (
                        <ul className="space-y-6" data-testid="datasets-list">
                          {geostoryLayers.map((dataset) => (
                            <li key={dataset.layer_id}>
                              <DatasetCard
                                {...dataset}
                                type="geostory"
                                id={dataset.layer_id}
                                isGeostory
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  {children}
                </ScrollArea>
              </div>
              <SheetClose className="absolute left-auto right-0 top-0 h-[60px] w-12 translate-x-full border-none bg-brand-500">
                <ChevronDown className="mx-auto h-6 w-6 rotate-90 text-secondary-500" />
              </SheetClose>
            </SheetContent>
          </Sheet>

          {/* Tablet */}
          <Sheet onOpenChange={onOpenChange} open={isTablet && defaultOpen && open}>
            <SheetTrigger
              className={cn({
                'hidden h-[60px] w-12 border-none bg-brand-500': true,
                hidden: open,
              })}
            >
              <ChevronRight className="mx-auto h-6 w-6 text-secondary-500" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bottom-3 left-4 top-auto z-[60] hidden w-fit max-w-fit rounded-none border-none bg-brand-500 px-0 py-0 sm:block sm:h-[calc(100vh-24px-70px)] lg:hidden"
            >
              <ScrollArea className="h-full w-[370px] p-7.5" type="auto">
                <div className="space-y-6">
                  <div className="divide-y divide-secondary-900">
                    {geostoryData?.monitors?.[0].id && (
                      <Link
                        href={`/map/${geostoryData.monitors[0].id}/geostories`}
                        className="sticky top-0 z-10 block space-x-3 bg-brand-500 pb-8 font-bold"
                        data-testid="back-to-monitor"
                        style={{ color: geostoryData.color }}
                      >
                        <HiArrowLeft className="inline-block h-6 w-6" />
                        <span data-testid="monitor-title-back-btn">
                          Back to {geostoryData.monitors[0].title}.
                        </span>
                      </Link>
                    )}
                    {isGeostoryLoading && <Loading />}
                    {geostoryData && !isGeostoryLoading && (
                      <GeostoryHeader {...geostoryData} color={geostoryData.color} />
                    )}
                  </div>
                  <div>
                    {isLayersLoading && <Loading />}-
                    {!!layersData?.length && !isLayersLoading && (
                      <ul className="space-y-6" data-testid="datasets-list">
                        {geostoryLayers.map((dataset) => (
                          <li key={dataset.layer_id}>
                            <DatasetCard
                              {...dataset}
                              type="geostory"
                              id={dataset.layer_id}
                              isGeostory
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                {children}
              </ScrollArea>
              <SheetClose className="absolute left-auto right-0 top-0 h-[60px] w-12 translate-x-full border-none bg-brand-500">
                <ChevronDown className="mx-auto h-6 w-6 rotate-90 text-secondary-500" />
              </SheetClose>
            </SheetContent>
          </Sheet>
        </section>
      </div>
      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 z-[500] h-[58px] bg-brand-500 px-1 py-2 sm:hidden">
          <Popover onOpenChange={onOpenChange} open={defaultOpen && open}>
            <PopoverTrigger className="absolute bottom-1 h-12 w-1/2 bg-secondary-500 font-inter text-sm font-medium uppercase text-brand-500 hover:bg-secondary-900 hover:text-secondary-500 data-[state=open]:bg-secondary-900 data-[state=open]:text-secondary-500 sm:hidden">
              Geostory
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
                  <div className="space-y-6">
                    <div className="divide-y divide-secondary-900 ">
                      {geostoryData?.monitors?.[0].id && (
                        <Link
                          href={`/map/${geostoryData.monitors[0].id}/geostories`}
                          className="sticky top-0 z-10 block space-x-3 bg-brand-500 p-6 pb-2 font-bold"
                          data-testid="back-to-monitor"
                          style={{ color: geostoryData.color }}
                        >
                          <HiArrowLeft className="inline-block h-6 w-6" />
                          <span data-testid="monitor-title-back-btn">
                            Back to {geostoryData.monitors[0].title}.
                          </span>
                        </Link>
                      )}
                      {isGeostoryLoading && <Loading />}
                      {geostoryData && !isGeostoryLoading && (
                        <GeostoryHeader {...geostoryData} color={geostoryData.color} />
                      )}
                    </div>
                    <div>
                      {isLayersLoading && <Loading />}-
                      {!!layersData?.length && !isLayersLoading && (
                        <ul className="space-y-6" data-testid="datasets-list">
                          {geostoryLayers.map((dataset) => (
                            <li key={dataset.layer_id}>
                              <DatasetCard
                                {...dataset}
                                type="geostory"
                                id={dataset.layer_id}
                                isGeostory
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
                {/* {children} */}
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </>
  );
};

export default GeostoryContent;

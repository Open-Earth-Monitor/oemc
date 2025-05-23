'use client';
import { PropsWithChildren, useEffect, useState, useMemo } from 'react';

import { useMediaQuery } from 'react-responsive';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { PopoverClose } from '@radix-ui/react-popover';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { HiArrowLeft } from 'react-icons/hi';

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
      {/* Desktop and tablet */}
      {!isMobile && (
        <div className="monitors absolute bottom-0 left-0 z-[55] w-full border-t border-secondary-900 bg-brand-500 p-1 sm:left-4 sm:top-[82px] sm:w-fit sm:border-0 sm:p-0">
          <motion.section
            initial={{ x: '-100%' }} // Start hidden and off-screen
            animate={{
              x: open ? 0 : '-100%', // Slide in and out
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }} // Smooth easing
            className="absolute bottom-3 left-0 z-[55] w-full border-t border-secondary-900 bg-brand-500 p-1 sm:left-4 sm:w-fit sm:border-0 sm:p-0"
          >
            {/* Desktop */}
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
                className="bottom-3 left-4 top-auto w-fit max-w-fit rounded-none border-none bg-brand-500 px-0 py-0 sm:block sm:h-[calc(100vh-24px-70px)]"
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
                  className="bottom-3 left-4 h-[calc(100vh-24px-70px)] w-fit max-w-fit rounded-none border-none bg-brand-500 px-0 py-0 lg:block"
                >
                  <ScrollArea className="h-full p-7.5 md:w-[370px] lg:w-[526px]" type="auto">
                    <div className="space-y-6">
                      <div className="divide-y divide-secondary-900">
                        {isGeostoryLoading && <Loading />}
                        {geostoryData && !isGeostoryLoading && (
                          <GeostoryHeader {...geostoryData} color={geostoryData.color} />
                        )}
                      </div>
                      <div>
                        {isLayersLoading && <Loading />}
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
                    <div className="flex flex-col items-start space-y-2 py-6">
                      {geostoryData?.monitors.length && (
                        <div className="py-2">
                          Monitor{geostoryData?.monitors.length > 1 && 's'}:
                        </div>
                      )}
                      {geostoryData?.monitors?.map((monitor) => (
                        <Link
                          href={`/map/${monitor.id}/geostories`}
                          className="font-bold"
                          data-testid="back-to-monitor"
                          style={{ color: geostoryData.color }}
                        >
                          <span data-testid="monitor-title-back-btn">{monitor.title}</span>
                        </Link>
                      ))}
                    </div>
                  </ScrollArea>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>
        </div>
      )}

      {isMobile && (
        <div className="absolute bottom-0 left-0 right-0 z-[700] h-[58px] bg-brand-500 px-1 py-2 sm:hidden">
          <Popover onOpenChange={onOpenChange} open={defaultOpen && open}>
            <PopoverTrigger className="font-inter absolute bottom-1 h-12 w-1/2 bg-secondary-500 text-sm font-medium uppercase text-brand-500 hover:bg-secondary-900 hover:text-secondary-500 data-[state=open]:bg-secondary-900 data-[state=open]:text-secondary-500 sm:hidden">
              Geostory
            </PopoverTrigger>
            <PopoverContent
              sideOffset={0}
              side="top"
              className="w-screen rounded-none border-none p-0 pb-5"
            >
              <PopoverClose className="absolute left-0 top-0 block h-12 w-[60px] -translate-y-full border-none bg-brand-500 focus:text-secondary-500">
                <ChevronDown className="mx-auto h-6 w-6 text-secondary-500" />
              </PopoverClose>
              <ScrollArea className="h-full max-h-[60vh] w-full" type="auto">
                <div className="w-full space-y-1 sm:space-y-6">
                  <div className="space-y-6">
                    <div className="divide-y divide-secondary-900">
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
                  {geostoryData?.monitors.length && (
                    <div className="flex flex-col items-start space-y-2 p-6">
                      <span className="text-secondary-500">
                        {geostoryData?.monitors.length === 1
                          ? 'Related monitor:'
                          : 'Related monitors:'}
                      </span>
                      {geostoryData?.monitors?.[0].id && (
                        <Link
                          href={`/map/${geostoryData.monitors[0].id}/geostories`}
                          className="bg-brand-500 font-bold"
                          data-testid="back-to-monitor"
                          style={{ color: geostoryData.color }}
                        >
                          <span data-testid="monitor-title-back-btn">
                            {geostoryData.monitors[0].title}.
                          </span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </>
  );
};

export default GeostoryContent;

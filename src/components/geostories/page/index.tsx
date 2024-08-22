'use client';

import { useEffect, useMemo, useState } from 'react';

import { useMediaQuery } from 'react-responsive';

import { PopoverClose } from '@radix-ui/react-popover';
import { ChevronDown, ChevronRight } from 'lucide-react';

import { mobile, tablet } from '@/lib/media-queries';

import { useSyncSidebarState } from '@/hooks/sync-query';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { HiArrowLeft } from 'react-icons/hi';

import { useGeostoryParsed, useGeostoryLayers } from '@/hooks/geostories';
import { useSyncLayersSettings, useSyncCompareLayersSettings } from '@/hooks/sync-query';

import DatasetCard from '@/components/datasets/card';
import GeostoryHeader from '@/components/geostories/header';
import Loading from '@/components/loading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import GeostoryContent from '../content';

const Map = dynamic(() => import('@/components/map/geostory-map'), { ssr: false });

const GeostoryPage: React.FC<{ geostory_id: string }> = ({ geostory_id }) => {
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
      {!isMobile && <GeostoryContent />}
      {geostoryData && !isGeostoryLoading && (
        <Map
          geostoryData={geostoryData}
          layerData={geostoryLayers?.[0]}
          compareLayerData={comparisonLayer}
        />
      )}
    </>
  );
};

export default GeostoryPage;

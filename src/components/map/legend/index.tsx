import { useCallback, useState } from 'react';

import { useMediaQuery } from 'react-responsive';

import { PopoverClose } from '@radix-ui/react-popover';

import { cn } from '@/lib/classnames';
import { mobile } from '@/lib/media-queries';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import LegendComponent from './component';
import { useSyncLayersSettings } from '@/hooks/sync-query';
import OpacitySetting from './opacity';
import LayerVisibility from './visibility';
import RemoveLayer from './remove';
import { useLayerParsedSource } from '@/hooks/layers';
import { LuChevronDown } from 'react-icons/lu';

export const Legend: React.FC<{ isGeostory?: boolean }> = ({ isGeostory = false }) => {
  const isMobile = useMediaQuery(mobile);
  const [isOpen, setIsOpen] = useState(true);

  const [layers, setLayers] = useSyncLayersSettings();

  const layerId = layers?.[0]?.id;
  const opacity = layers?.[0]?.opacity;

  const handleOpacity = useCallback(
    (nexOpacity: number) => {
      void setLayers((prevState) => [{ ...prevState?.[0], opacity: nexOpacity }]);
    },
    [setLayers]
  );

  const { data } = useLayerParsedSource({ layer_id: layerId }, { enabled: !!layers?.length });
  const { title } = data ?? {};

  const handleCollapse = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div
      className={cn({
        'm:block absolute bottom-0 right-0 flex w-1/2 justify-end border-t border-secondary-900 bg-brand-500 sm:w-fit sm:space-y-1 sm:border-0 sm:bg-transparent sm:shadow-lg':
          true,
        'z-[700]': isMobile,
        'z-[50]': !isMobile,
      })}
      data-testid="map-legend"
    >
      {/* DESKTOP  */}
      <Collapsible open={isOpen}>
        <CollapsibleTrigger
          className="rounded-b-0 rounded-tr-0 flex rounded-tl-3xl bg-brand-500 text-white-500"
          asChild
        >
          <div
            data-testid="map-legend-toggle-button"
            className="flex items-center gap-2 font-satoshi text-xs font-medium"
          >
            <div
              className="relative flex items-start justify-between space-x-4 text-white-500"
              data-testid="map-legend-item"
            >
              <div data-testid="map-legend-item-title">{title}</div>
              <div
                className="flex space-x-2 divide-x divide-secondary-800"
                data-testid="map-legend-item-toolbar"
              >
                <div className="flex space-x-2">
                  <OpacitySetting defaultValue={opacity} onChange={handleOpacity} />
                  {!isGeostory && <LayerVisibility />}
                </div>
                {!isGeostory && <RemoveLayer className="pl-2" />}
              </div>
            </div>
            <LuChevronDown
              className="h-6 w-6 text-accent-green group-data-[state=closed]:rotate-180"
              onClick={handleCollapse}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="hidden sm:block">
          <LegendComponent isGeostory={isGeostory} />
        </CollapsibleContent>
      </Collapsible>

      {/* MOBILE */}
      <Popover>
        <PopoverTrigger className="z-[600] h-12 w-full bg-secondary-500 font-inter text-sm font-medium uppercase text-brand-500 hover:bg-secondary-900 hover:text-secondary-500 data-[state=open]:bg-secondary-900 data-[state=open]:text-secondary-500 sm:hidden">
          Legend
        </PopoverTrigger>
        <PopoverContent
          sideOffset={0}
          side="top"
          className="w-screen rounded-none border-none px-0 py-0"
        >
          <PopoverClose className="absolute left-0 top-0 block h-12 w-[60px] -translate-y-full border-none bg-brand-500 focus:text-secondary-500">
            <LuChevronDown className="mx-auto h-6 w-6 text-secondary-500" />
          </PopoverClose>
          <LegendComponent isGeostory={isGeostory} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Legend;

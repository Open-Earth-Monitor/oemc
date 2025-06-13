import { useMediaQuery } from 'react-responsive';

import { PopoverClose } from '@radix-ui/react-popover';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/classnames';
import { mobile } from '@/lib/media-queries';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import LegendComponent from './component';

export const Legend: React.FC<{ isGeostory?: boolean }> = ({ isGeostory = false }) => {
  const isMobile = useMediaQuery(mobile);

  return (
    <div
      className={cn({
        'font-inter absolute bottom-0 right-0 flex w-1/2 justify-end border-t border-secondary-900 bg-brand-500 p-1 text-xs sm:bottom-3 sm:right-3 sm:block sm:w-fit sm:max-w-[294px] sm:space-y-1 sm:border-0 sm:bg-transparent sm:p-0':
          true,
        'z-[700]': isMobile,
        'z-[50]': !isMobile,
      })}
      data-testid="map-legend"
    >
      {/* DESKTOP  */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="hidden sm:block">
          <div
            data-testid="map-legend-toggle-button"
            className="font-inter text-xs font-medium uppercase tracking-widest sm:block"
          >
            Legend
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="hidden sm:block">
          <LegendComponent isGeostory={isGeostory} />
        </CollapsibleContent>
      </Collapsible>

      {/* MOBILE */}
      <Popover>
        <PopoverTrigger className="font-inter z-[600] h-12 w-full bg-secondary-500 text-sm font-medium uppercase text-brand-500 hover:bg-secondary-900 hover:text-secondary-500 data-[state=open]:bg-secondary-900 data-[state=open]:text-secondary-500 sm:hidden">
          Legend
        </PopoverTrigger>
        <PopoverContent
          sideOffset={0}
          side="top"
          className="w-screen rounded-none border-none px-0 py-0"
        >
          <PopoverClose className="absolute left-0 top-0 block h-12 w-[60px] -translate-y-full border-none bg-brand-500 focus:text-secondary-500">
            <ChevronDown className="mx-auto h-6 w-6 text-secondary-500" />
          </PopoverClose>
          <LegendComponent isGeostory={isGeostory} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Legend;

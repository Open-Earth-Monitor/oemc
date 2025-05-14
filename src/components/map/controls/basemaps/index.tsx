import { motion } from 'framer-motion';

import { cn } from '@/lib/classnames';

import { CONTROL_BUTTON_STYLES } from '@/components/map/controls/constants';
import { TooltipPortal } from '@radix-ui/react-tooltip';
import { LuMap } from 'react-icons/lu';
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { PopoverTrigger } from '@radix-ui/react-popover';
import { Popover, PopoverContent } from '@/components/ui/popover';

import { BASEMAPS } from './constants';
import { useSyncBasemapSettings } from '@/hooks/sync-query';

const BasemapControl = ({ isMobile }: { isMobile?: boolean }) => {
  const [, setBasemap] = useSyncBasemapSettings();

  return (
    <Tooltip delayDuration={100}>
      <Popover>
        <TooltipTrigger asChild>
          <PopoverTrigger>
            <motion.button
              initial="initial"
              whileHover="hover"
              className={cn({
                'group bg-brand-500 stroke-secondary-500 hover:stroke-brand-500': true,
                'p-4': isMobile,
                [CONTROL_BUTTON_STYLES.mobile]: isMobile,
                [CONTROL_BUTTON_STYLES.default]: !isMobile,
              })}
            >
              <LuMap size={22} />
            </motion.button>
          </PopoverTrigger>
        </TooltipTrigger>
        <PopoverContent className="w-fit p-0" align="start" side="right">
          <div className="p-1">
            {BASEMAPS.map((basemap) => (
              <button
                key={basemap.label}
                className="flex w-full items-center justify-start rounded-sm px-4 py-2 text-left text-sm text-secondary-500 hover:bg-secondary-500 hover:text-brand-500"
                onClick={() => {
                  setBasemap((prev) => {
                    if (prev === basemap.id) return prev;
                    return basemap.id;
                  });
                }}
              >
                {basemap.label}
              </button>
            ))}
          </div>
        </PopoverContent>
        <TooltipPortal>
          <TooltipContent sideOffset={0} side="left" align="center">
            <div className="text-sm">Change basemap</div>
            <TooltipArrow />
          </TooltipContent>
        </TooltipPortal>
      </Popover>
    </Tooltip>
  );
};

export default BasemapControl;

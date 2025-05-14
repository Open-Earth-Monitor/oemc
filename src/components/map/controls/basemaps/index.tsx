import { motion } from 'framer-motion';

import { cn } from '@/lib/classnames';

import { CONTROL_BUTTON_STYLES } from '@/components/map/controls/constants';
import { TooltipPortal } from '@radix-ui/react-tooltip';
import { LuMap } from 'react-icons/lu';
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { PopoverTrigger } from '@radix-ui/react-popover';
import { Popover, PopoverContent } from '@/components/ui/popover';

import { BASEMAPS, LABELS, LabelProps } from './constants';
import { useSyncBasemapLabelsSettings, useSyncBasemapSettings } from '@/hooks/sync-query';
import { Checkbox, CheckboxIndicator } from '@/components/ui/checkbox';
import { LuCheck } from 'react-icons/lu';
import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
const BasemapControl = ({ isMobile }: { isMobile?: boolean }) => {
  const [selectedBasemap, setBasemap] = useSyncBasemapSettings();
  const [activeLabels, setActiveLabels] = useSyncBasemapLabelsSettings();

  const handleMapLabels = (value: LabelProps['id']) => {
    setActiveLabels(value);
  };

  return (
    <Tooltip delayDuration={100}>
      <Popover>
        <TooltipTrigger asChild>
          <PopoverTrigger
            className={cn({
              'group bg-brand-500 stroke-secondary-500 hover:stroke-brand-500': true,
              [CONTROL_BUTTON_STYLES.mobile]: isMobile,
              [CONTROL_BUTTON_STYLES.default]: !isMobile,
            })}
          >
            <LuMap size={22} />
          </PopoverTrigger>
        </TooltipTrigger>
        <PopoverContent
          className="w-fit overflow-hidden bg-white-500 p-0"
          align="start"
          side="right"
        >
          
          <div className="py-1">
            {BASEMAPS.map((basemap) => (
              <button
                key={basemap.label}
                className="flex w-full items-center justify-start rounded-sm px-4 py-2 text-left text-sm  text-brand-500 hover:bg-alert"
                onClick={() => {
                  setBasemap((prev) => {
                    if (prev === basemap.id) return prev;
                    return basemap.id;
                  });
                }}
              >
                <div className="align-left flex flex-col justify-start space-y-2 px-4 py-2">
                  {LABELS.map((value) => (
                    <div
                      key={value.id}
                      className="flex items-center space-x-3"
                      data-testid={`${value}-button`}
                    >
                      <RadioGroupItem
                        value={value.id}
                        id={value.id}
                        checked={activeLabels === value.id}
                        className="h-4 w-4 shrink-0"
                      />
                      <Label htmlFor={value.id} className="text-sm capitalize text-secondary-500">
                        {value.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
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

import { PopoverTrigger } from '@radix-ui/react-popover';
import { TooltipPortal } from '@radix-ui/react-tooltip';
import { LuMap } from 'react-icons/lu';

import { cn } from '@/lib/classnames';

import { useSyncBasemapLabelsSettings, useSyncBasemapSettings } from '@/hooks/sync-query';

import { CONTROL_BUTTON_STYLES } from '@/components/map/controls/constants';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { BASEMAPS, LABELS, LabelProps } from './constants';

const BasemapControl = ({ isMobile }: { isMobile?: boolean }) => {
  const [selectedBasemap, setBasemap] = useSyncBasemapSettings();
  const [activeLabels, setActiveLabels] = useSyncBasemapLabelsSettings();

  const handleMapLabels = (value: LabelProps['id']) => {
    if (activeLabels !== value) {
      setActiveLabels(value);
    }
  };

  const handleBasemap = (value: BasemapProps['id']) => {
    if (selectedBasemap !== value) {
      setBasemap(value);
    }
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
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.5852 14.7002H16.4992C16.0218 14.7002 15.564 14.8898 15.2264 15.2274C14.8889 15.565 14.6992 16.0228 14.6992 16.5002V20.5862"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
              />
              <path
                d="M7.5 4.20581V5.69981C7.5 6.4159 7.78446 7.10265 8.29081 7.609C8.79716 8.11535 9.48392 8.39981 10.2 8.39981C10.6774 8.39981 11.1352 8.58945 11.4728 8.92702C11.8104 9.26458 12 9.72242 12 10.1998C12 11.1898 12.81 11.9998 13.8 11.9998C14.2774 11.9998 14.7352 11.8102 15.0728 11.4726C15.4104 11.135 15.6 10.6772 15.6 10.1998C15.6 9.20981 16.41 8.39981 17.4 8.39981H20.253"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
              />
              <path
                d="M11.0999 20.9551V17.4001C11.0999 16.9227 10.9103 16.4649 10.5727 16.1273C10.2351 15.7897 9.77731 15.6001 9.29992 15.6001C8.82253 15.6001 8.3647 15.4105 8.02713 15.0729C7.68956 14.7353 7.49992 14.2775 7.49992 13.8001V12.9001C7.49992 12.4227 7.31028 11.9649 6.97271 11.6273C6.63515 11.2897 6.17731 11.1001 5.69992 11.1001H3.04492"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
              />
              <path
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
              />
            </svg>
          </PopoverTrigger>
        </TooltipTrigger>
        <PopoverContent
          className="divide flex w-fit flex-col divide-y divide-dashed divide-white-900 overflow-hidden bg-black-100 px-2 py-3 text-sm text-white-500"
          align="start"
          side="right"
        >
          <div className="flex flex-col justify-start space-y-3 pb-2">
            {BASEMAPS.map((basemap) => (
              <div
                key={basemap.id}
                className="flex items-start space-x-2.5 px-2"
                data-testid={`${basemap.id}-button`}
              >
                <Switch
                  value={basemap.id}
                  id={basemap.id}
                  checked={selectedBasemap === basemap.id}
                  className="h-4 w-6 shrink-0"
                  onCheckedChange={() => handleBasemap(basemap.id)}
                />
                <Label htmlFor={basemap.id} className="text-sm">
                  {basemap.label}
                </Label>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-start space-y-3 pt-2">
            {LABELS.map((value) => (
              <div
                key={value.id}
                className="flex items-start space-x-2.5 px-2 "
                data-testid={`${value.label}-button`}
              >
                <Switch
                  value={value.id}
                  id={value.id}
                  checked={activeLabels === value.id}
                  className="h-4 w-6 shrink-0"
                  onCheckedChange={() => handleMapLabels(value.id)}
                />
                <Label htmlFor={value.id} className="text-sm">
                  {value.label}
                </Label>
              </div>
            ))}
          </div>
        </PopoverContent>
        <TooltipPortal>
          <TooltipContent sideOffset={0} side="left" align="center">
            <div className="text-sm">Map settings</div>
            <TooltipArrow />
          </TooltipContent>
        </TooltipPortal>
      </Popover>
    </Tooltip>
  );
};

export default BasemapControl;

import { useEffect, useMemo, useCallback, useState } from 'react';
import type { FC } from 'react';

import { TooltipPortal } from '@radix-ui/react-tooltip';
import { LuCirclePlay, LuCirclePause, LuX } from 'react-icons/lu';
import { useInterval } from 'usehooks-ts';

import cn from '@/lib/classnames';

import type { LayerDateRange, LayerParsed } from '@/types/layers';

import { useSyncCompareLayersSettings, useSyncLayersSettings } from '@/hooks/sync-query';

import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectIcon,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const TIMEOUT_STEP_DURATION = 2500;

const TimeSeries: FC<{
  layerId: LayerParsed['layer_id'];
  range: LayerParsed['range'];
  isActive: boolean;
  defaultActive?: boolean;
  autoPlay: boolean;
}> = ({ range, isActive, layerId, defaultActive = 'false', autoPlay }) => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();
  const [isPlaying, setPlaying] = useState(autoPlay && defaultActive && isActive);
  const opacity = layers?.[0]?.opacity;
  const [contentVisibility, setContentVisibility] = useState<boolean>(false);
  const [contentCompareVisibility, setContentCompareVisibility] = useState<boolean>(false);

  const handleSelect = useCallback(
    (value: string) => {
      const nextRange = range.find((r) => r.value === value);
      void setLayers([{ id: layerId, opacity, date: nextRange.value }]);
      setContentVisibility(false);
    },
    [layerId, opacity, range, setLayers, setContentVisibility]
  );

  const handleCompareSelect = useCallback(
    (value: string) => {
      const nextRange = range.find((r) => r.value === value);
      void setCompareLayers([{ id: layerId, opacity, date: nextRange.value }]);
      setContentVisibility(false);
    },
    [layerId, opacity, range, setLayers, setContentVisibility]
  );

  const handleTogglePlay = useCallback(() => {
    void setPlaying(!isPlaying);
  }, [isPlaying, setPlaying]);

  useEffect(() => {
    if (defaultActive && isActive && autoPlay) {
      void setPlaying(true);
    }
  }, [defaultActive, isActive, autoPlay]);

  const date = layers?.[0]?.date;
  const compareDate = compareLayers?.[0]?.date;

  const currentRange = useMemo(
    () => range.find((r) => r.value === date) ?? range[0],
    [date, range]
  );

  const compareCurrentRange = useMemo(
    () =>
      compareLayers && compareLayers.length > 0 && compareDate
        ? range.find((r) => r.value === compareDate) ?? range[0]
        : null,
    [compareDate, compareLayers, range]
  );

  const isCompareActive = useMemo(
    () => compareLayers?.[0]?.id === layerId,
    [layerId, compareLayers]
  );

  useInterval(
    () => {
      const nextRange = range[(range.indexOf(currentRange) + 1) % range.length];
      void setLayers([{ ...layers?.[0], date: nextRange.value }]);
    },
    isPlaying ? TIMEOUT_STEP_DURATION : null
  );

  const startRangelabel = useMemo(() => range && range[0]?.label, [range]);
  const endRangelabel = useMemo(() => range && range[range.length - 1]?.label, [range]);

  return (
    <div className="flex w-full flex-col">
      {/* Select dates */}
      <div className="flex flex-col space-y-2 text-secondary-500">
        <span className="text-sm">Select date:</span>
        <div className="flex w-full items-center justify-between">
          {currentRange && (
            <Select
              value={currentRange.value}
              onValueChange={handleSelect}
              open={contentVisibility}
              onOpenChange={() => {
                setContentVisibility((prev) => !prev);
              }}
            >
              <SelectTrigger className="w-fit text-xs font-semibold">
                <div
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'sm' }),
                    'w-full justify-between hover:bg-transparent'
                  )}
                >
                  <SelectValue>{currentRange?.label}</SelectValue>
                  <SelectIcon />
                </div>
              </SelectTrigger>
              <SelectContent
                className="z-[1000] flex max-h-56 w-full min-w-fit items-center text-center"
                alignOffset={-20}
                sideOffset={0}
                style={{ width: 'calc(100% - 2rem)' }}
              >
                <ScrollArea className="max-h-[200px] w-full">
                  {range.map((r: LayerDateRange) => (
                    <SelectItem key={r.value} value={r.value} className="px-2">
                      {r?.label}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          )}
          {!isCompareActive && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-semibold"
              onClick={() => {
                setPlaying(false);
                setCompareLayers([{ id: layerId, opacity, date: range[0].value }]);
              }}
            >
              Compare
            </Button>
          )}
          {compareCurrentRange && (
            <Select
              value={compareCurrentRange?.value || range[0].value}
              disabled={isPlaying}
              onValueChange={handleCompareSelect}
              open={contentCompareVisibility}
              onOpenChange={() => {
                setContentCompareVisibility((prev) => !prev);
              }}
            >
              <SelectTrigger className="w-fit text-xs font-semibold ">
                <div
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'sm' }),
                    'w-full justify-between hover:bg-transparent'
                  )}
                >
                  <SelectValue>{compareCurrentRange?.label || range[0].label}</SelectValue>
                  <div className="flex items-center space-x-2">
                    <LuX
                      className="pointer-events-auto h-4 w-4 text-accent-green"
                      onClick={() => setCompareLayers(null)}
                    />
                    <SelectIcon />
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent
                className="z-[1000] flex max-h-56 w-full min-w-fit items-center text-center"
                alignOffset={-20}
                sideOffset={0}
                style={{ width: 'calc(100% - 2rem)' }}
              >
                <ScrollArea className="max-h-[200px] w-full">
                  {range.map((r: LayerDateRange) => (
                    <SelectItem key={r.value} value={r.value} className="px-2">
                      {r?.label}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      {/* Timeline */}
      <Tooltip delayDuration={0}>
        <TooltipTrigger disabled={isCompareActive} asChild>
          <div className="flex w-full items-center space-x-3 py-3.5">
            <button
              type="button"
              onClick={handleTogglePlay}
              disabled={isCompareActive}
              className="pointer-events-auto"
            >
              {isPlaying && isActive ? (
                <LuCirclePause className="h-6 w-6 text-accent-green" />
              ) : (
                <LuCirclePlay className="h-6 w-6 text-secondary-500" />
              )}
            </button>
            <div className="relative flex w-full flex-col space-y-2 bg-white-950 sm:max-w-[248px]">
              <div className="max-w flex w-full  overflow-hidden">
                {range.map((r) => (
                  <div key={r.value} className="flex w-full items-center justify-center">
                    <div
                      className={cn('h-[6px] w-[1px] bg-white-800', {
                        'bg-accent-green': r.value === compareDate,
                      })}
                    />
                  </div>
                ))}
                <div className="absolute left-0 right-0 top-2 flex justify-between font-satoshi text-sm tracking-tight text-secondary-500">
                  <div>{startRangelabel}</div>
                  <div>{endRangelabel}</div>
                </div>
              </div>
            </div>
          </div>
        </TooltipTrigger>

        <TooltipPortal>
          <TooltipContent
            sideOffset={20}
            side="left"
            align="center"
            className={cn({
              'border-none bg-black-400 text-white-500': true,
              hidden: !isCompareActive,
            })}
          >
            <div className="max-w-xs text-sm">
              <p>
                When the layer comparison functionality is enabled, the timeline is automatically
                paused .
              </p>
              <p>To activate the timeline again, comparison mode must first be disabled.</p>
            </div>
            <TooltipArrow />
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </div>
  );
};

export default TimeSeries;

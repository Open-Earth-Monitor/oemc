import { useEffect, useMemo, useCallback, useState } from 'react';
import type { FC } from 'react';

import { HiChevronDown } from 'react-icons/hi';
import { LuCirclePlay, LuCirclePause } from 'react-icons/lu';
import { useInterval } from 'usehooks-ts';

import cn from '@/lib/classnames';

import type { LayerDateRange, LayerParsed } from '@/types/layers';

import { useSyncLayersSettings } from '@/hooks/sync-query';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectIcon,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const TIMEOUT_STEP_DURATION = 2500;

const TimeSeries: FC<{
  layerId: LayerParsed['layer_id'];
  range: LayerParsed['range'];
  isActive: boolean;
  defaultActive?: boolean;
  autoPlay: boolean;
}> = ({ range, isActive, layerId, defaultActive = 'false', autoPlay }) => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [isPlaying, setPlaying] = useState(autoPlay && defaultActive && isActive);
  const opacity = layers?.[0]?.opacity;
  const [contentVisibility, setContentVisibility] = useState<boolean>(false);

  const handleSelect = useCallback(
    (value: string) => {
      const nextRange = range.find((r) => r.value === value);
      void setLayers([{ id: layerId, opacity, date: nextRange.value }]);
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

  const currentRange = useMemo(
    () => range.find((r) => r.value === date) ?? range[0],
    [date, range]
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
    <div className="flex flex-col space-y-3.5">
      <div className="flex justify-between">
        {/* Select dates */}
        <div className="flex flex-col space-y-2 text-secondary-500">
          <span className="text-sm">Select date:</span>
          {currentRange && (
            <Select
              value={currentRange.value}
              onValueChange={handleSelect}
              open={contentVisibility}
              onOpenChange={() => {
                setContentVisibility(!contentVisibility);
              }}
            >
              <SelectTrigger className="text-xs font-semibold">
                <Button variant="outline" className="w-full justify-between" size="sm">
                  <SelectValue>{currentRange?.label}</SelectValue>
                  <SelectIcon />
                </Button>
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
      <div className="flex w-full items-center space-x-3">
        <button type="button" onClick={handleTogglePlay}>
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
                    'bg-accent-green': r.value === currentRange.value,
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
    </div>
  );
};

export default TimeSeries;

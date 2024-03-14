import { useCallback, useState } from 'react';
import type { FC } from 'react';

import { HiChevronDown } from 'react-icons/hi';
import { HiPlay, HiPause } from 'react-icons/hi2';

import cn from '@/lib/classnames';

import type { LayerDateRange, LayerParsed } from '@/types/layers';

import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectIcon,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useSyncTimeseriesOn } from '../../hooks/sync-query';
import { useSyncLayersSettings } from '../../hooks/sync-query';

const TimeSeriesLegend: FC<{
  layerId: LayerParsed['layer_id'];
  range: LayerParsed['range'];
  autoPlay?: boolean;
  isActive?: boolean;
  dataType?: 'monitor' | 'geostory';
  currentRange: LayerDateRange;
}> = ({ range, layerId, currentRange, isActive }) => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [isPlaying, setPlaying] = useSyncTimeseriesOn();
  const opacity = layers?.[0]?.opacity;
  const [contentVisibility, setContentVisibility] = useState<boolean>(false);

  const handleSelect = useCallback(
    (value: string) => {
      const nextRange = range.find((r) => r.value === value);
      void setLayers([{ id: layerId, opacity, date: nextRange.value }]);
    },
    [layerId, opacity, range, setLayers]
  );

  const handleTogglePlay = useCallback(() => {
    void setPlaying(!isPlaying);
  }, [isPlaying, setPlaying]);

  return (
    <div className="space-y-4 border-secondary-900 pt-2.5">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-[10px]">DATE:</span>
          {currentRange && (
            <Select
              value={currentRange.value}
              onValueChange={handleSelect}
              open={contentVisibility}
              onOpenChange={() => setContentVisibility(!contentVisibility)}
            >
              <SelectTrigger className="text-xs font-semibold underline">
                <>
                  <SelectValue />
                  <SelectIcon className="w-full">
                    <HiChevronDown
                      className={cn({ 'h-5 w-5': true, 'rotate-180': contentVisibility })}
                    />
                  </SelectIcon>
                </>
              </SelectTrigger>
              <SelectContent
                className="flex max-h-56 w-full min-w-fit items-center text-center"
                alignOffset={-20}
                sideOffset={0}
                style={{ width: 'calc(100% - 2rem)' }}
              >
                <ScrollArea className="max-h-[200px] w-full">
                  {range.map((r: LayerDateRange) => (
                    <SelectItem key={r.value} value={r.value} className="px-2">
                      <span className="rounded-sm px-2 py-1 hover:bg-secondary-900">{r.label}</span>
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      <div className="flex w-full space-x-3">
        <button
          type="button"
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-50 hover:border-secondary-500',
            {
              'bg-secondary-500': isPlaying,
            }
          )}
          onClick={handleTogglePlay}
        >
          {isPlaying && isActive ? (
            <HiPause
              className={cn('h-4 w-4', {
                'text-brand-50': isPlaying,
              })}
            />
          ) : (
            <HiPlay className="h-4 w-4" />
          )}
        </button>
        <div className="flex w-full flex-col space-y-2">
          <div className="flex w-full ">
            {range.map((r) => (
              <div key={r.value} className="flex w-full items-center justify-center">
                <div
                  className={cn('h-[9px] w-[1px] bg-brand-50', {
                    'bg-secondary-500': r.value === currentRange.value,
                  })}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] tracking-tight">
            <div>{range[0].label}</div>
            <div>{range[range.length - 1].label}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSeriesLegend;

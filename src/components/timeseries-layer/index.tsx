import { useMemo, useCallback, useState } from 'react';

import { useAtom } from 'jotai';

import { timeSeriesPlaybackAtom } from '@/app/store';
import type { FC } from 'react';

import { LuX } from 'react-icons/lu';

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

import Timeline from './timeline';

const TimeSeriesSameLayer: FC<{
  layerId: LayerParsed['layer_id'];
  range: LayerParsed['range'];
  isActive: boolean;
  defaultActive?: boolean;
  autoPlay: boolean;
  comparisonLayer?: LayerParsed | null;
}> = ({ range, isActive, layerId, defaultActive = false, autoPlay }) => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();

  const [isPlaying, setPlaying] = useAtom(timeSeriesPlaybackAtom);

  const opacity = layers?.[0]?.opacity;
  const [contentVisibility, setContentVisibility] = useState<boolean>(false);
  const [contentCompareVisibility, setContentCompareVisibility] = useState<boolean>(false);

  const handleSelect = useCallback(
    (value: string) => {
      setPlaying(false);
      const nextRange = range?.find((r) => r.value === value);
      void setLayers([{ id: layerId, opacity, date: nextRange?.value }]);
      setContentVisibility(false);
    },
    [layerId, opacity, range, setLayers, setContentVisibility, setPlaying]
  );

  const handleCompareSelect = useCallback(
    (value: string) => {
      setPlaying(false);
      const nextRange = range?.find((r) => r.value === value);
      void setCompareLayers([{ id: layerId, opacity, date: nextRange?.value }]);
      setContentVisibility(false);
    },
    [layerId, opacity, range, setContentVisibility, setCompareLayers, setPlaying]
  );

  const date = layers?.[0]?.date;

  const compareDate = compareLayers?.[0]?.date;

  const currentRange = useMemo(
    () => range?.find((r) => r.value === date) ?? range?.[0],
    [date, range]
  );
  const compareCurrentRange = useMemo(
    () =>
      compareLayers && compareLayers.length > 0 && compareDate
        ? range?.find((r) => r.value === compareDate) ?? range?.[0]
        : null,
    [compareDate, compareLayers, range]
  );

  const hasAnyCompare = !!compareLayers?.[0]?.id;

  return (
    <div className="flex w-full flex-col">
      {/* Select dates */}
      <div className="flex flex-col space-y-2 text-secondary-500">
        <span className="text-sm">Select date:</span>
        <div className="flex w-full items-center justify-between gap-4">
          {currentRange && (range?.length ?? 0) > 1 && (
            <Select
              value={currentRange.value}
              onValueChange={handleSelect}
              open={contentVisibility}
              onOpenChange={setContentVisibility}
            >
              <SelectTrigger className="min-w-0 max-w-[50%] text-xs font-semibold">
                <div
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'sm' }),
                    'w-full justify-between overflow-hidden hover:bg-transparent'
                  )}
                  title={currentRange?.label}
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
                  {range?.map((r: LayerDateRange) => (
                    <SelectItem key={r.value} value={r.value} className="px-2">
                      {r?.label}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          )}
          {currentRange && (range?.length ?? 0) === 1 && (
            <div className="min-w-0 max-w-[50%] text-xs font-semibold">
              <div
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                  'w-full justify-between truncate hover:bg-transparent'
                )}
                title={currentRange?.label}
              >
                {currentRange?.label}
              </div>
            </div>
          )}
          {!hasAnyCompare && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-semibold"
              disabled={(range?.length ?? 0) <= 1}
              onClick={() => {
                setPlaying(false);
                setCompareLayers([{ id: layerId, opacity, date: range?.[0]?.value }]);
              }}
            >
              Compare
            </Button>
          )}
          {compareCurrentRange && (range?.length ?? 0) > 1 && (
            <Select
              value={compareCurrentRange?.value || range?.[0]?.value}
              disabled={isPlaying}
              onValueChange={handleCompareSelect}
              open={contentCompareVisibility}
              onOpenChange={() => {
                setContentCompareVisibility((prev) => !prev);
              }}
            >
              <SelectTrigger className="min-w-0 max-w-[50%] text-xs font-semibold">
                <div
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'sm' }),
                    'w-full justify-between overflow-hidden hover:bg-transparent'
                  )}
                  title={compareCurrentRange?.label || range?.[0]?.label}
                >
                  <SelectValue>{compareCurrentRange?.label || range?.[0]?.label}</SelectValue>
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
                  {range?.map((r: LayerDateRange) => (
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
      <Timeline
        layerId={layerId}
        range={range}
        isActive={isActive}
        defaultActive={defaultActive}
        autoPlay={autoPlay}
        isPlaying={isPlaying}
        setPlaying={setPlaying}
      />
    </div>
  );
};

export default TimeSeriesSameLayer;

import { useMemo, useCallback, useState } from 'react';
import type { FC } from 'react';

import { useAtom } from 'jotai';
import { LuX } from 'react-icons/lu';

import cn from '@/lib/classnames';

import type { LayerDateRange, LayerParsed } from '@/types/layers';

import { timeSeriesPlaybackAtom } from '@/app/store';

import { useSyncCompareLayersSettings, useSyncLayersSettings } from '@/hooks/sync-query';

import DateRangeLabel from '@/components/date-range-label';
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
    <div className="flex w-full flex-col py-4">
      {/* Select dates */}
      <div className="flex flex-col space-y-2 text-secondary-500">
        <span className="text-sm">Select date:</span>
        {/* Wraps to a column when the labels are too long to sit side by side */}
        <div className="flex w-full min-w-0 flex-wrap items-center gap-2">
          {currentRange && (range?.length ?? 0) > 1 && (
            <Select
              value={currentRange.value}
              onValueChange={handleSelect}
              open={contentVisibility}
              onOpenChange={setContentVisibility}
            >
              <SelectTrigger className="h-auto min-w-[7rem] flex-1 text-xs font-semibold">
                <div
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'sm' }),
                    'min-h-8 h-auto w-full min-w-0 justify-between gap-2 overflow-hidden py-1 text-left leading-tight hover:bg-transparent'
                  )}
                  title={currentRange?.label}
                >
                  <SelectValue className="min-w-0">
                    <DateRangeLabel label={currentRange?.label} />
                  </SelectValue>
                  <SelectIcon className="shrink-0" />
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
                      <DateRangeLabel label={r?.label} />
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          )}
          {currentRange && (range?.length ?? 0) === 1 && (
            <div className="h-auto min-w-[7rem] flex-1 text-xs font-semibold">
              <div
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'sm' }),
                  'min-h-8 h-auto w-full min-w-0 justify-between py-1 text-left leading-tight hover:bg-transparent'
                )}
                title={currentRange?.label}
              >
                <DateRangeLabel label={currentRange?.label} />
              </div>
            </div>
          )}
          {!hasAnyCompare && (
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 text-xs font-semibold"
              disabled={(range?.length ?? 0) <= 1}
              onClick={() => {
                setPlaying(false);
                setCompareLayers([{ id: layerId, opacity, date: range?.[0]?.value }]);
              }}
            >
              Compare
            </Button>
          )}
          {hasAnyCompare && (
            // The close button is a sibling of the select — never truncated with it — and the
            // two travel together when the row wraps, so comparison can always be closed.
            <div className="flex min-w-[7rem] flex-1 items-center gap-2">
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
                  <SelectTrigger className="h-auto min-w-0 flex-1 text-xs font-semibold">
                    <div
                      className={cn(
                        buttonVariants({ variant: 'outline', size: 'sm' }),
                        'min-h-8 h-auto w-full min-w-0 justify-between gap-2 overflow-hidden py-1 text-left leading-tight hover:bg-transparent'
                      )}
                      title={compareCurrentRange?.label || range?.[0]?.label}
                    >
                      <SelectValue className="min-w-0">
                        <DateRangeLabel label={compareCurrentRange?.label || range?.[0]?.label} />
                      </SelectValue>
                      <SelectIcon className="shrink-0" />
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
                          <DateRangeLabel label={r?.label} />
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              )}
              <button
                type="button"
                aria-label="Close comparison"
                title="Close comparison"
                className="shrink-0 text-accent-green hover:opacity-80"
                onClick={() => setCompareLayers(null)}
              >
                <LuX className="h-4 w-4" />
              </button>
            </div>
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

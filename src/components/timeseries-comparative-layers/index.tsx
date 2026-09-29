import { useMemo, useCallback, useState } from 'react';
import type { FC } from 'react';

import { useAtom } from 'jotai';
import { LuX } from 'react-icons/lu';

import cn from '@/lib/classnames';

import type { LayerDateRange, LayerParsed } from '@/types/layers';

import { timeSeriesPlaybackAtom } from '@/app/store';

import { useSyncCompareLayersSettings, useSyncLayersSettings } from '@/hooks/sync-query';

import DateRangeLabel from '@/components/date-range-label';
import Timeline from '@/components/timeline';
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

/**
 * Toggles the layer that a monitor or geostory pairs with the active one, so
 * the map shows both side by side. `layerId` is that paired layer; it is known
 * from the dataset, so the control stays available after the pair is closed.
 */
const TimeSeriesComparativeLayers: FC<{
  layerId: LayerParsed['layer_id'];
  range: LayerParsed['range'];
  isActive: boolean;
  /** True when TimeSeriesSameLayer already renders the date select and timeline. */
  hideTimeline?: boolean;
}> = ({ range, isActive, layerId, hideTimeline = false }) => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [comparisonLayers, setComparisonLayers] = useSyncCompareLayersSettings();

  const [isPlaying, setPlaying] = useAtom(timeSeriesPlaybackAtom);

  const baseLayerId = layers?.[0]?.id;
  const opacity = layers?.[0]?.opacity;
  const [contentVisibility, setContentVisibility] = useState<boolean>(false);

  const handleSelect = useCallback(
    (value: string) => {
      setPlaying(false);
      const nextRange = range?.find((r) => r.value === value);
      void setLayers([{ id: baseLayerId, opacity, date: nextRange?.value }]);
      setContentVisibility(false);
    },
    [baseLayerId, opacity, range, setLayers, setContentVisibility, setPlaying]
  );

  const date = layers?.[0]?.date;

  const currentRange = useMemo(
    () => range?.find((r) => r.value === date) ?? range?.[0],
    [date, range]
  );

  const isCompareActive = comparisonLayers?.[0]?.id === layerId;

  const compareButton = isCompareActive ? (
    <Button
      variant="outline"
      size="sm"
      className="shrink-0 rounded-full text-xs font-semibold"
      aria-label="Hide average"
      onClick={() => {
        setPlaying(false);
        void setComparisonLayers(null);
      }}
    >
      <span>Hide average</span>
      <LuX className="h-4 w-4 shrink-0 text-accent-green" />
    </Button>
  ) : (
    <Button
      variant="outline"
      size="sm"
      className="shrink-0 text-xs font-semibold"
      onClick={() => {
        setPlaying(false);
        void setComparisonLayers([{ id: layerId, opacity }]);
      }}
    >
      Show average
    </Button>
  );

  // The date select and timeline are already on screen: only add the toggle.
  if (hideTimeline) {
    return <div className="flex w-full justify-end pb-4">{compareButton}</div>;
  }

  return (
    <div className="flex w-full flex-col py-4">
      {/* Select dates */}
      <div className="flex flex-col space-y-2 text-secondary-500">
        <span className="text-sm">Select date:</span>
        {/* Wraps to a column when the labels are too long to sit side by side */}
        <div className="flex w-full min-w-0 flex-wrap items-center gap-2">
          {currentRange && (
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

          {compareButton}
        </div>
      </div>
      <Timeline
        layerId={baseLayerId}
        range={range}
        isActive={isActive}
        defaultActive={true}
        autoPlay={true}
        isPlaying={isPlaying}
        setPlaying={setPlaying}
      />
    </div>
  );
};

export default TimeSeriesComparativeLayers;

import { useEffect, useMemo, useCallback, useState } from 'react';
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

const TimeSeriesComparativeLayers: FC<{
  layerId: LayerParsed['layer_id'];
  range: LayerParsed['range'];
  isActive: boolean;
  comparisonLayer?: LayerParsed | null;
}> = ({ range, isActive, layerId, comparisonLayer }) => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();

  const layerToCompare = useMemo(() => {
    if (!comparisonLayer) return null;
    return compareLayers?.[0]?.id || comparisonLayer.layer_id || null;
  }, [comparisonLayer, compareLayers]);

  const keyFor = (id: string) => `timeseries:${id}:playing`;

  const [isPlaying, setPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!layerId) return;
    sessionStorage.setItem(keyFor(layerId), JSON.stringify(isPlaying));
  }, [layerId, isPlaying]);

  const opacity = layers?.[0]?.opacity;
  const [contentVisibility, setContentVisibility] = useState<boolean>(false);

  const handleSelect = useCallback(
    (value: string) => {
      const nextRange = range.find((r) => r.value === value);
      void setLayers([{ id: layerId, opacity, date: nextRange?.value }]);
      setContentVisibility(false);
    },
    [layerId, opacity, range, setLayers, setContentVisibility]
  );

  const date = layers?.[0]?.date;

  const currentRange = useMemo(
    () => range.find((r) => r.value === date) ?? range[0],
    [date, range]
  );

  const isCompareActive = useMemo(() => !!compareLayers?.[0]?.id, [compareLayers]);

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
              onOpenChange={setContentVisibility}
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

          {comparisonLayer && !isCompareActive && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-semibold"
              onClick={() => {
                setPlaying(false);
                setCompareLayers([{ id: layerToCompare, opacity }]);
              }}
            >
              Compare
            </Button>
          )}

          {isCompareActive && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-full text-xs font-semibold"
              onClick={() => {
                setPlaying(false);
                setCompareLayers(null);
              }}
            >
              <span>Hide average</span>
              <LuX className="h-4 w-4 text-accent-green" />
            </Button>
          )}
        </div>
      </div>
      {/* Timeline */}
      <Timeline
        layerId={layerId}
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

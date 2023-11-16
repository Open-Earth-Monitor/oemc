import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';

import { HiPlay, HiPause, HiCalendarDays } from 'react-icons/hi2';
import { useInterval } from 'usehooks-ts';

import cn from '@/lib/classnames';

import type { LayerDateRange, LayerParsed } from '@/types/layers';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useSyncLayersSettings, useSyncCompareLayersSettings } from '../../hooks/sync-query';

const TIMEOUT_STEP_DURATION = 2500;

const TimeSeries: FC<{
  layerId: LayerParsed['layer_id'];
  range: LayerParsed['range'];
  autoPlay?: boolean;
  isActive?: boolean;
}> = ({ range, autoPlay = false, isActive = false, layerId }) => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();

  const date = layers?.[0]?.date;
  const opacity = layers?.[0]?.opacity;
  const isCompareActive = !!compareLayers?.[0]?.id;
  const [isPlaying, setPlaying] = useState<boolean>(autoPlay && isActive && !isCompareActive);

  const currentRange = useMemo(
    () => range.find((r) => r.value === date) ?? range[0],
    [date, range]
  );

  const handleTogglePlay = useCallback(() => {
    setPlaying(!isPlaying);
    if (isCompareActive) void setCompareLayers(null);
  }, [isCompareActive, isPlaying, setCompareLayers]);

  const handleSelect = useCallback(
    (value: string) => {
      const nextRange = range.find((r) => r.value === value);
      void setLayers([{ id: layerId, opacity, date: nextRange.value }]);
    },
    [layerId, opacity, range, setLayers]
  );

  useInterval(
    () => {
      const nextRange = range[(range.indexOf(currentRange) + 1) % range.length];
      void setLayers([{ id: layerId, opacity, date: nextRange.value }]);
    },
    isPlaying ? TIMEOUT_STEP_DURATION : null
  );

  useEffect(() => {
    if (isCompareActive) setPlaying(false);
  }, [isCompareActive]);

  useEffect(() => {
    if (!isActive) {
      setPlaying(false);
    } else if (isActive && !isPlaying && !isCompareActive) {
      setPlaying(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <div className="space-y-4 border-t-[0.5px] border-secondary-900 pt-2.5">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <HiCalendarDays className="h-10 w-10" />
          <span className="text-[10px]">DATE:</span>
          {currentRange && (
            <Select value={currentRange.value} onValueChange={handleSelect} disabled={!isActive}>
              <SelectTrigger className="text-xs font-semibold underline">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-fit max-w-fit" alignOffset={-10} sideOffset={0}>
                {range.map((r: LayerDateRange) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <button
          type="button"
          className={cn(
            'flex h-[52px] w-[52px] items-center justify-center rounded-full border border-brand-50 hover:border-secondary-500',
            {
              'bg-secondary-500': isPlaying,
            }
          )}
          onClick={handleTogglePlay}
          disabled={!isActive}
        >
          {isPlaying ? (
            <HiPause
              className={cn('h-4 w-4', {
                'text-brand-50': isPlaying,
              })}
            />
          ) : (
            <HiPlay className="h-4 w-4" />
          )}
        </button>
      </div>
      <div className="flex justify-between">
        {range.map((r) => (
          <div key={r.value} className="flex items-center justify-center">
            <div
              className={cn('h-[9px] w-[1px] bg-brand-50', {
                'bg-secondary-500': r.value === currentRange.value,
              })}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs">
        <div>{range[0].label}</div>
        <div>{range[range.length - 1].label}</div>
      </div>
    </div>
  );
};

export default TimeSeries;

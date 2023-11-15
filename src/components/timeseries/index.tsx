import { useCallback, useEffect, useState } from 'react';
import type { FC } from 'react';

import { HiPlay, HiPause, HiCalendarDays } from 'react-icons/hi2';
import { useInterval, useDebounce } from 'usehooks-ts';

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

const findLabel = (value: string, range: { label: string; value: string | number }[]) =>
  range?.find((d: { label: string; value: string }) => d.value === value)?.label satisfies
    | string
    | number;

const TimeSeries: FC<{
  layerId: LayerParsed['layer_id'];
  range: LayerParsed['range'];
  autoPlay?: boolean;
  isActive?: boolean;
  setIsActive?: (value: boolean) => void;
}> = ({ range, autoPlay = false, isActive = false, layerId, setIsActive }) => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();
  const isCompareActive = compareLayers?.[0]?.id;
  const compareDate = compareLayers?.[0]?.date;
  const layerOpacity = layers?.[0]?.opacity;
  const date = layers?.[0]?.date;
  const opacity = !layerOpacity && layerOpacity !== 0 ? 1 : layerOpacity;
  const debouncedOpacity = useDebounce<number>(opacity, 300);
  const defaultDateLabel = findLabel(date, range);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const defaultDate = !!date ? { label: defaultDateLabel, value: date } : range?.[0];
  const [currentRange, setCurrentRange] = useState<{ value: string; label: string }>(defaultDate);
  const [isPlaying, setPlaying] = useState<boolean>(autoPlay && !isCompareActive);

  // update selected  first render
  useEffect(
    () => {
      if (isActive && isFirstRender) {
        setCurrentRange(defaultDate);
        void setLayers([{ id: layerId, opacity, date: defaultDate?.value }]);
      }
      setIsFirstRender(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(
    () => {
      if (isActive && layers?.[0]?.id && layerId && !isFirstRender) {
        void setLayers([{ id: layerId, opacity, date: currentRange?.value }]);
        if (!!isCompareActive) {
          void setCompareLayers([{ id: layerId, opacity, date: compareDate }]);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedOpacity, opacity, currentRange?.value]
  );

  useEffect(
    () => {
      if (!isActive) {
        setPlaying(false);
        setCurrentRange(range?.[0]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isActive]
  );

  const handlePlay = useCallback(() => {
    setPlaying(!isPlaying);
    if (!isPlaying) void setCompareLayers(null);
  }, [isPlaying, setPlaying, setCompareLayers]);

  const handleSelect = useCallback(
    (value: string) => {
      const nextRange = range.find((r) => r.value === value) ?? range[0];
      void setLayers([{ id: layerId, opacity, date: nextRange.value }]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [range]
  );

  useInterval(
    () => {
      const nextRange = range[(range.indexOf(currentRange) + 1) % range.length];
      setCurrentRange(nextRange);
    },
    isPlaying ? TIMEOUT_STEP_DURATION : null
  );

  // Reset to first position when the layer is hidden
  useEffect(() => {
    if (!layers?.[0]?.id && !isFirstRender) {
      setPlaying(false);
      setCurrentRange(range[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!layers?.[0]?.id]);

  // Stop time series when compare is active
  useEffect(() => {
    if (!!isCompareActive || (!layers?.[0]?.id && !isFirstRender)) {
      setPlaying(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompareActive, setPlaying]);

  useEffect(() => {
    if (isActive && isPlaying && layers?.[0]?.id === layerId) {
      void setLayers([{ id: layerId, opacity, date: currentRange?.value }]);
    }
    if (isActive && !isPlaying && date !== currentRange?.value) {
      void setCurrentRange(date ? { label: defaultDateLabel, value: date } : range?.[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <div className="space-y-4 border-t-[0.5px] border-secondary-900 pt-2.5">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <HiCalendarDays className="h-10 w-10" />
          <span className="text-[10px]">DATE:</span>
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
        </div>
        <button
          type="button"
          className={cn(
            'flex h-[52px] w-[52px] items-center justify-center rounded-full border border-brand-50 hover:border-secondary-500',
            {
              'bg-secondary-500': isPlaying,
            }
          )}
          onClick={handlePlay}
          disabled={!isActive}
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

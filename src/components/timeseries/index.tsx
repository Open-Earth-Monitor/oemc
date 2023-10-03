import { useCallback, useEffect, useState } from 'react';
import type { FC } from 'react';

import { HiPlay, HiPause } from 'react-icons/hi2';
import { useInterval } from 'usehooks-ts';

import cn from '@/lib/classnames';

import type { LayerParsedRangeTypes } from '@/types/datasets';
import type { LayerDateRange } from '@/types/layers';

import { useURLayerParams, useURLParams } from '@/hooks/url-params';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const TIMEOUT_STEP_DURATION = 3000;

const TimeSeries: FC<{
  layerId: LayerParsedRangeTypes['layer_id'];
  range: LayerParsedRangeTypes['range'];
  autoPlay?: boolean;
}> = ({ range, autoPlay = false }) => {
  const [currentRange, setCurrentRange] = useState<{ value: string; label: string }>(range[0]);
  const [isPlaying, setPlaying] = useState<boolean>(autoPlay);
  const { updateSearchParam } = useURLParams();
  const { layerId, layerOpacity, date } = useURLayerParams();

  const onChange = useCallback(
    (currentRange: LayerDateRange) => {
      updateSearchParam({
        layers: [{ id: layerId, opacity: layerOpacity || 1, date: currentRange?.value }],
      });
    },
    [layerId, layerOpacity, updateSearchParam]
  );

  const handlePlay = useCallback(() => {
    setPlaying(!isPlaying);
  }, [isPlaying]);

  const handleSelect = useCallback(
    (value: string) => {
      const nextRange = range.find((r) => r.value === value) ?? range[0];
      setCurrentRange(nextRange);
      onChange(nextRange);
    },
    [onChange, range]
  );

  useInterval(
    () => {
      const nextRange = range[(range.indexOf(currentRange) + 1) % range.length];
      setCurrentRange(nextRange);
      onChange(nextRange);
    },
    isPlaying ? TIMEOUT_STEP_DURATION : null
  );

  useEffect(() => {
    if (!autoPlay) setPlaying(false);
  }, [autoPlay]);

  // Reset to first position when the layer is hidden
  useEffect(() => {
    if (!isPlaying && !date) {
      setCurrentRange(range[0]);
    }
  }, [date, isPlaying, range]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <span>DATE:</span>
          <Select value={currentRange.value} onValueChange={handleSelect} disabled={!layerId}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[50vh]">
              {range.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <button
          type="button"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-brand-50"
          onClick={handlePlay}
          disabled={!layerId}
        >
          {isPlaying ? (
            <HiPause className="h-4 w-4 text-secondary-500" />
          ) : (
            <HiPlay className="h-4 w-4 text-secondary-500" />
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

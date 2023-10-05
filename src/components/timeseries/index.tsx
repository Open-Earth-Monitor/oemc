import { useCallback, useEffect, useState } from 'react';
import type { FC } from 'react';

import { HiPlay, HiPause } from 'react-icons/hi2';
import { useInterval } from 'usehooks-ts';

import cn from '@/lib/classnames';

import type { LayerDateRange, LayerParsed } from '@/types/layers';

import { useURLayerParams, useURLParams } from '@/hooks/url-params';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const TIMEOUT_STEP_DURATION = 3500;

const TimeSeries: FC<{
  layerId: LayerParsed['layer_id'];
  range: LayerParsed['range'];
  autoPlay?: boolean;
  isActive?: boolean;
}> = ({ range, autoPlay = false, isActive = false }) => {
  const { updateSearchParam } = useURLParams();
  const { layerId, layerOpacity, date } = useURLayerParams();

  const [currentRange, setCurrentRange] = useState<{ value: string; label: string }>(range[0]);
  const [isPlaying, setPlaying] = useState<boolean>(autoPlay);

  const handlePlay = useCallback(() => {
    setPlaying(!isPlaying);
  }, [isPlaying]);

  const handleSelect = useCallback(
    (value: string) => {
      const nextRange = range.find((r) => r.value === value) ?? range[0];
      setCurrentRange(nextRange);
    },
    [range]
  );

  useInterval(
    () => {
      const nextRange = range[(range.indexOf(currentRange) + 1) % range.length];
      setCurrentRange(nextRange);
    },
    isPlaying ? TIMEOUT_STEP_DURATION : null
  );

  /**
   * Updating layers params when range changes
   */
  useEffect(() => {
    if (currentRange && isActive) {
      updateSearchParam({
        layers: [{ id: layerId, opacity: layerOpacity || 1, date: currentRange?.value }],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRange]);

  /**
   * At mounting set initial current range based on the url params
   */
  useEffect(() => {
    if (date) {
      const nextRange = range.find((r) => r.value === date);
      if (nextRange) setCurrentRange(nextRange);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset to first position when the layer is hidden
  useEffect(() => {
    if (!isActive) {
      setPlaying(false);
      setCurrentRange(range[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <span>DATE:</span>
          <Select value={currentRange.value} onValueChange={handleSelect} disabled={!isActive}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[50vh]">
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
              className={cn('h-4 w-4 text-secondary-500', {
                'text-brand-50': isPlaying,
              })}
            />
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

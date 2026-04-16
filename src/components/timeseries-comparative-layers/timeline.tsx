import { useMemo, useCallback } from 'react';
import type { FC } from 'react';

import { TooltipPortal } from '@radix-ui/react-tooltip';
import { LuCirclePlay, LuCirclePause } from 'react-icons/lu';
import { useInterval } from 'usehooks-ts';

import cn from '@/lib/classnames';

import type { LayerParsed } from '@/types/layers';

import { useSyncCompareLayersSettings, useSyncLayersSettings } from '@/hooks/sync-query';

import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const TIMEOUT_STEP_DURATION = 2500;
const TICK_THRESHOLD = 20;

const Timeline: FC<{
  layerId: LayerParsed['layer_id'];
  range: LayerParsed['range'];
  isActive: boolean;
  defaultActive?: boolean;
  autoPlay: boolean;
  isPlaying: boolean;
  setPlaying: (value: boolean | ((prev: boolean) => boolean)) => void;
}> = ({ range, isActive, layerId, isPlaying, setPlaying }) => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers] = useSyncCompareLayersSettings();

  const handleTogglePlay = useCallback(() => {
    void setPlaying((prev) => !prev);
  }, [isPlaying, setPlaying]);

  const date = layers?.[0]?.date;

  const currentRange = useMemo(
    () => range.find((r) => r.value === date) ?? range[0],
    [date, range]
  );

  const currentIndex = useMemo(
    () => Math.max(0, range.findIndex((r) => r.value === currentRange?.value)),
    [range, currentRange]
  );

  const isCompareActive = useMemo(
    () => compareLayers?.[0]?.id === layerId,
    [layerId, compareLayers]
  );

  useInterval(
    () => {
      const nextRange = range[(range.indexOf(currentRange) + 1) % range.length];
      void setLayers([{ ...layers?.[0], date: nextRange.value }]);
    },
    isPlaying ? TIMEOUT_STEP_DURATION : null
  );

  const handleTickClick = useCallback(
    (value: string) => {
      if (isCompareActive) return;
      void setLayers([{ ...layers?.[0], date: value }]);
    },
    [isCompareActive, layers, setLayers]
  );

  const handleSliderChange = useCallback(
    (index: number) => {
      void setLayers([{ ...layers?.[0], date: range[index].value }]);
    },
    [layers, setLayers, range]
  );

  const startRangelabel = useMemo(() => range && range[0]?.label, [range]);
  const endRangelabel = useMemo(() => range && range[range.length - 1]?.label, [range]);

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger disabled={isCompareActive} asChild>
        <div className="flex w-full items-center space-x-3 py-3.5">
          <button
            type="button"
            onClick={handleTogglePlay}
            disabled={isCompareActive}
            className="pointer-events-auto"
          >
            {isPlaying && isActive ? (
              <LuCirclePause className="h-6 w-6 text-accent-green" />
            ) : (
              <LuCirclePlay className="h-6 w-6 text-secondary-500" />
            )}
          </button>
          <div className="relative flex w-full flex-col space-y-2 bg-white-950">
            <div className="max-w flex w-full overflow-hidden">
              {range.length <= TICK_THRESHOLD ? (
                range.map((r) => (
                  <div
                    key={r.value}
                    className={cn('flex w-full items-center justify-center', {
                      'cursor-pointer': !isCompareActive,
                    })}
                    onClick={() => handleTickClick(r.value)}
                  >
                    <div
                      className={cn('h-[6px] w-[1px] bg-white-800', {
                        'w-[1.5px] bg-accent-green': r.value === currentRange?.value,
                      })}
                    />
                  </div>
                ))
              ) : (
                <input
                  type="range"
                  min={0}
                  max={range.length - 1}
                  value={currentIndex}
                  disabled={isCompareActive}
                  onChange={(e) => handleSliderChange(Number(e.target.value))}
                  className={cn(
                    'h-[6px] w-full cursor-pointer appearance-none rounded-none bg-white-800',
                    '[&::-webkit-slider-thumb]:h-[6px] [&::-webkit-slider-thumb]:w-[3px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:bg-accent-green',
                    '[&::-moz-range-thumb]:h-[6px] [&::-moz-range-thumb]:w-[3px] [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-accent-green',
                    'disabled:cursor-not-allowed disabled:opacity-50'
                  )}
                />
              )}
              <div className="absolute left-0 right-0 top-2 flex justify-between font-satoshi text-sm tracking-tight text-secondary-500">
                <div>{startRangelabel}</div>
                <div>{endRangelabel}</div>
              </div>
            </div>
          </div>
        </div>
      </TooltipTrigger>

      <TooltipPortal>
        <TooltipContent
          sideOffset={20}
          side="left"
          align="center"
          className={cn({
            'border-none bg-black-400 text-white-500': true,
            hidden: !isCompareActive,
          })}
        >
          <div className="max-w-xs text-sm">
            <p>
              When the layer comparison functionality is enabled, the timeline is automatically
              paused .
            </p>
            <p>To activate the timeline again, comparison mode must first be disabled.</p>
          </div>
          <TooltipArrow />
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  );
};

export default Timeline;

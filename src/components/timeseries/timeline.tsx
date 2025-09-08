import { useEffect, useMemo, useCallback, useState, useRef } from 'react';
import type { FC } from 'react';

import { TooltipPortal } from '@radix-ui/react-tooltip';
import { LuCirclePlay, LuCirclePause } from 'react-icons/lu';
import { useInterval } from 'usehooks-ts';

import cn from '@/lib/classnames';

import type { LayerParsed } from '@/types/layers';

import { useSyncCompareLayersSettings, useSyncLayersSettings } from '@/hooks/sync-query';

import { Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const TIMEOUT_STEP_DURATION = 2500;

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
          <div className="relative flex w-full flex-col space-y-2 bg-white-950 sm:max-w-[248px]">
            <div className="max-w flex w-full  overflow-hidden">
              {range.map((r) => (
                <div key={r.value} className="flex w-full items-center justify-center">
                  <div
                    className={cn('h-[6px] w-[1px] bg-white-800', {
                      'w-[1.5px] bg-accent-green': r.value === currentRange?.value,
                    })}
                  />
                </div>
              ))}
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

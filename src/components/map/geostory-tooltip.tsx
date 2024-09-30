'use client';

import React, { FC } from 'react';

import { format } from 'd3-format';
import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { histogramLayerLeftVisibilityAtom } from '@/app/store';

import type { GeostoryTooltipInfo } from './types';
import { useAtom } from 'jotai';
import cn from '@/lib/classnames';

const numberFormat = format(',.2f');

interface TooltipProps extends GeostoryTooltipInfo {
  onCloseTooltip: () => void;
}

const MapTooltip: FC<TooltipProps> = ({
  position,
  onCloseTooltip = () => null,
  leftData,
  rightData,
}: TooltipProps) => {
  if (!position || !leftData?.value) return null;

  const [leftLayerHistogramVisibility, setLeftLayerHistogramVisibility] = useAtom(
    histogramLayerLeftVisibilityAtom
  );

  const handleClick = () => {
    setLeftLayerHistogramVisibility(true);
  };

  return (
    <div
      className={cn({
        'max-w-32 text-2xs absolute z-50 translate-x-[-50%] translate-y-[-100%] bg-secondary-500 p-4 shadow-md':
          true,
        hidden: leftLayerHistogramVisibility,
      })}
      style={{
        left: `${position[0]}px`,
        top: `${position[1] - 10}px`,
      }}
    >
      <button className="absolute right-4 top-4 z-50" onClick={onCloseTooltip}>
        <XIcon size={14} className="text-brand-500" />
      </button>
      <div className="relative space-y-2">
        <div className="font-satoshi mr-5 space-y-4 font-bold text-brand-500">
          <div>
            <h3 className="text-sm">{leftData.title}</h3>
            {leftData.value !== 0 && (
              <div className="flex items-end space-x-2">
                <div className="space-x-2 text-xl">
                  {numberFormat(leftData.value)}
                  {!!leftData.unit && leftData.unit}
                </div>
              </div>
            )}
            {!leftData.value && (!!rightData.value || !rightData.date) && (
              <span>No data is available at this specific point.</span>
            )}
          </div>
          {leftData?.value && (
            <Button
              variant="light"
              onClick={handleClick}
              className="font-inter text-xs"
              disabled={!leftData.value}
            >
              See point histogram
            </Button>
          )}
        </div>
        {!!rightData.value && (
          <div className="border-brand-800 font-satoshi mr-5 space-y-4 border-t pt-2.5 font-bold text-brand-500 ">
            <div>
              <h3 className="text-sm">{rightData.title}</h3>
              <div className="text-xl">
                {numberFormat(rightData.value)}
                {!!rightData.unit && rightData.unit}
              </div>
            </div>
            <Button
              variant="light"
              onClick={handleClick}
              className="font-inter text-xs"
              disabled={!rightData.value}
            >
              See point histogram
            </Button>
          </div>
        )}
        {!rightData.value && !leftData.value && (
          <span className="pt-4 text-sm font-light">
            No data is available at this specific point for any of the layers.
          </span>
        )}
        <div className="arrow absolute -bottom-5 left-1/2 -translate-x-1/2 rotate-45" />
      </div>
    </div>
  );
};

export default MapTooltip;

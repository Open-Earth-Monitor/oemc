'use client';

import React, { FC } from 'react';

import { format } from 'd3-format';
import { XIcon } from 'lucide-react';
import { useAtom } from 'jotai';
import { Button } from '@/components/ui/button';

import { histogramLayerLeftVisibilityAtom, regionsLayerVisibilityAtom } from '@/app/store';

import type { MonitorTooltipInfo } from './types';
import cn from '@/lib/classnames';

const numberFormat = format(',.2f');

interface TooltipProps extends MonitorTooltipInfo {
  onCloseTooltip: () => void;
}

const MapTooltip: FC<TooltipProps> = ({
  position,
  onCloseTooltip = () => null,
  leftData,
  rightData,
}: TooltipProps) => {
  if (!position || (!leftData?.value && leftData?.value !== 0)) return null;
  const [leftLayerHistogramVisibility, setLeftLayerHistogramVisibility] = useAtom(
    histogramLayerLeftVisibilityAtom
  );

  const [isRegionsLayerActive] = useAtom(regionsLayerVisibilityAtom);

  const handleClick = () => {
    setLeftLayerHistogramVisibility(true);
  };
  const dateLabel = leftData.range?.find(({ value }) => value === leftData.date)?.label;
  const compareDateLabel =
    rightData.date && leftData.range?.find(({ value }) => value === rightData.date)?.label;

  return (
    <div
      className={cn({
        'max-w-32 text-2xs absolute z-50 translate-x-[-50%] translate-y-[-100%] bg-secondary-500 p-4 font-bold text-brand-500 shadow-md':
          true,
        hidden: leftLayerHistogramVisibility,
      })}
      style={{
        left: `${position[0]}px`,
        top: `${position[1] - 10}px`,
      }}
    >
      <button className="absolute right-4 top-4 z-50" onClick={onCloseTooltip}>
        <XIcon size={14} />
      </button>
      <div className="relative space-y-4">
        <h3 className="mr-16 text-sm font-bold">{leftData.title}</h3>

        {!!leftData.value && (
          <div className="flex items-center space-x-2">
            <div className="space-x-2 text-xl">
              {typeof leftData.value === 'number' ? numberFormat(leftData.value) : leftData.value}
              {!!leftData.unit && leftData.unit}
            </div>
            {leftData.isComparable && <span className="text-sm">({dateLabel})</span>}
          </div>
        )}
        {!leftData.value && (!!rightData.value || !rightData.date) && (
          <span className="pt-2 text-sm font-light">
            No data is available at this specific point
            {dateLabel && ` for the selected date (${dateLabel})`}.
          </span>
        )}
        {leftData?.value && !isRegionsLayerActive && (
          <Button
            variant="light"
            onClick={handleClick}
            className="font-inter text-xs"
            disabled={!leftData.value}
          >
            See point histogram
          </Button>
        )}

        {leftData?.value && isRegionsLayerActive && (
          <Button
            variant="light"
            onClick={handleClick}
            className="font-inter text-xs"
            disabled={!leftData.value}
          >
            See region histogram
          </Button>
        )}

        {rightData.date && rightData.value !== 0 && (
          <div className="border-brand-800 mt-4 border-t pt-4 text-xl">
            {typeof rightData.value === 'number' ? numberFormat(rightData.value) : rightData.value}
            {!!rightData.unit && rightData.unit}{' '}
            <span className="pt-4 text-sm">({compareDateLabel})</span>
          </div>
        )}
        {rightData.date && !rightData.value && !leftData.value && (
          <span className="pt-4 text-sm font-light">
            No data is available at this specific point for the selected dates ({dateLabel} and{' '}
            {compareDateLabel}).
          </span>
        )}
        <div className="arrow absolute -bottom-5 left-1/2 -translate-x-1/2 rotate-45" />
      </div>
    </div>
  );
};

export default MapTooltip;

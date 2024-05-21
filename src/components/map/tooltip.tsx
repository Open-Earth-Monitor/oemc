'use client';

import React, { FC } from 'react';

import { format } from 'd3-format';
import { XIcon } from 'lucide-react';

import { LayerDateRange } from '@/types/layers';

const numberFormat = format(',.2f');

type TooltipProps = {
  position: [number, number];
  onCloseTooltip: () => void;
  leftData: {
    title: string;
    date?: string;
    unit?: string;
    value: number;
    range: LayerDateRange[];
    rangeLabels: string[];
  };
  rightData: { title: string; date?: string; unit?: string; value: number };
};

const MapTooltip: FC<TooltipProps> = ({
  position,
  onCloseTooltip = () => null,
  leftData,
  rightData,
}: TooltipProps) => {
  if (!position || !leftData.value) return null;
  const dateLabel = leftData.range.find(({ value }) => value === leftData.date)?.label;
  const compareDateLabel =
    rightData.date && leftData.range.find(({ value }) => value === rightData.date)?.label;

  return (
    <div
      className="max-w-32 text-2xs absolute z-50 translate-x-[-50%] translate-y-[-100%] bg-secondary-500 p-4 font-bold text-brand-500 shadow-md"
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

        <div className="flex items-end space-x-2">
          <div className="space-x-2 text-xl">
            {numberFormat(leftData.value)}
            {!!leftData.unit && leftData.unit}
          </div>
          <span className="text-sm">({dateLabel})</span>
        </div>
        {rightData.date && (
          <div className="border-brand-800 border-t pt-2 text-xl">
            {numberFormat(rightData.value)}
            {!!rightData.unit && rightData.unit}{' '}
            <span className="text-sm">({compareDateLabel})</span>
          </div>
        )}
        <div className="arrow absolute -bottom-5 left-1/2 -translate-x-1/2 rotate-45" />
      </div>
    </div>
  );
};

export default MapTooltip;

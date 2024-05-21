'use client';

import React, { FC } from 'react';

import { format } from 'd3-format';
import { XIcon } from 'lucide-react';

const numberFormat = format(',.2f');

type TooltipProps = {
  position: [number, number];
  onCloseTooltip: () => void;
  leftData: { title: string; date?: string; unit?: string; value: number };
  rightData: { title: string; date?: string; unit?: string; value: number };
};

const MapTooltip: FC<TooltipProps> = ({
  position,
  onCloseTooltip = () => null,
  leftData,
  rightData,
}: TooltipProps) => {
  if (!position || !leftData.value) return null;

  return (
    <div
      className="max-w-32 text-2xs absolute z-50 translate-x-[-50%] translate-y-[-100%] bg-secondary-500 p-4 shadow-md"
      style={{
        left: `${position[0]}px`,
        top: `${position[1] - 10}px`,
      }}
    >
      <button className="absolute right-4 top-4 z-50" onClick={onCloseTooltip}>
        <XIcon size={14} className="text-brand-500" />
      </button>
      <div className="relative space-y-2">
        <div className="mr-16 font-satoshi font-bold text-brand-500">
          <h3 className="text-sm">{leftData.title}</h3>
          <div className="text-xl">
            {numberFormat(leftData.value)}
            {!!leftData.unit && leftData.unit}
          </div>
        </div>
        <div className="border-brand-800 border-t pt-2.5 font-satoshi font-bold text-brand-500">
          <h3 className="text-sm">{rightData.title}</h3>
          <div className="text-xl">
            {numberFormat(rightData.value)}
            {!!rightData.unit && rightData.unit}
          </div>
        </div>
        <div className="arrow absolute -bottom-5 left-1/2 -translate-x-1/2 rotate-45" />
      </div>
    </div>
  );
};

export default MapTooltip;
'use client';

import React, { FC } from 'react';

import { format } from 'd3-format';
import { XIcon } from 'lucide-react';

const numberFormat = format(',.2f');

type TooltipProps = {
  tooltipPosition: [number, number];
  onCloseTooltip: () => void;
  tooltipValue: number;
  title: string;
  date?: string;
  unit?: string;
};

const MapTooltip: FC<TooltipProps> = ({
  tooltipPosition,
  onCloseTooltip = () => null,
  tooltipValue,
  title,
  unit,
}: TooltipProps) => {
  if (!tooltipPosition || !tooltipValue) return null;
  return (
    <div
      className="max-w-32 text-2xs absolute z-50 translate-x-[-50%] translate-y-[-100%] bg-secondary-500 p-4 shadow-md"
      style={{
        left: `${tooltipPosition[0]}px`,
        top: `${tooltipPosition[1] - 10}px`,
      }}
    >
      <button className="absolute right-1 top-1" onClick={onCloseTooltip}>
        <XIcon size={10} className="text-brand-500" />
      </button>
      <div className="space-y-2 font-satoshi font-bold text-brand-500">
        <h3 className="text-sm">{title.left}</h3>
        <div className="text-xl">
          {numberFormat(tooltipValue.left)}
          {!!unit && unit}
        </div>
        <h3 className="text-sm">{title.right}</h3>

        <div className="text-xl">
          {numberFormat(tooltipValue.right)}
          {!!unit && unit}
        </div>
      </div>
    </div>
  );
};

export default MapTooltip;

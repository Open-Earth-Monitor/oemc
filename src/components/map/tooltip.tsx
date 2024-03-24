'use client';

import React, { FC } from 'react';

import { format } from 'd3-format';
import { XIcon } from 'lucide-react';

const numberFormat = format(',.2f');

type TooltipProps = {
  tooltipPosition: [number, number];
  setTooltipPosition: React.Dispatch<React.SetStateAction<[number, number]>>;
  tooltipValue: number;
  title: string;
};

const MapTooltip: FC<TooltipProps> = ({
  tooltipPosition,
  setTooltipPosition,
  tooltipValue,
  title,
}: TooltipProps) => (
  <div
    className="max-w-32 text-2xs absolute z-10 translate-x-[-50%] translate-y-[-100%] bg-secondary-500 p-4 shadow-md"
    style={{
      left: `${tooltipPosition[0]}px`,
      top: `${tooltipPosition[1] - 10}px`,
    }}
  >
    <button className="absolute right-1 top-1" onClick={() => setTooltipPosition(null)}>
      <XIcon size={10} className="text-brand-500" />
    </button>
    <div className="space-y-2 font-satoshi font-bold text-brand-500">
      <p>{title}</p>
      <span className="text-3xl">{numberFormat(tooltipValue)}</span>
    </div>
  </div>
);

export default MapTooltip;

'use client';

import React, { FC } from 'react';

import Image from 'next/image';

// import { LinePath } from '@visx/shape';

// import ExampleControls from './ExampleControls';

export type AnnotationProps = {
  width: number;
  height: number;
  compact?: boolean;
};

export const orange = '#ff7e67';
export const greens = ['#ecf4f3', '#68b0ab', '#006a71'];

import { format } from 'd3-format';
import { XIcon } from 'lucide-react';

import { cn } from '@/lib/classnames';

import { lonLatAtom } from '@/app/store';
import { useRegionsData } from '@/hooks/regions';

import { histogramLayerLeftVisibilityAtom } from '@/app/store';

import type { GeostoryTooltipInfo } from './types';

import { useAtom, useAtomValue } from 'jotai';
import { useSyncSidebarState } from '@/hooks/sync-query';

const numberFormat = format(',.2f');

interface HistogramTypes extends GeostoryTooltipInfo {
  onCloseTooltip: () => void;
  layerId: string;
  compareLayerId: string;
}

const Histogram: FC<HistogramTypes> = ({
  onCloseTooltip = () => null,
  layerId,
  compareLayerId,
  leftData,
}: HistogramTypes) => {
  const [leftLayerHistogramVisibility, setLeftLayerHistogramVisibility] = useAtom(
    histogramLayerLeftVisibilityAtom
  );

  const [isSidebarOpen] = useSyncSidebarState();

  const lonLat = useAtomValue(lonLatAtom);

  const layerPointInfoPayload = {
    lon: lonLat?.[0] || 0,
    lat: lonLat?.[1] || 0,
    layer_id: layerId,
  };

  const compareLayerPointInfoPayload = {
    lon: lonLat?.[0] || 0,
    lat: lonLat?.[1] || 0,
    layer_id: compareLayerId,
  };

  const { data: histogramData } = useRegionsData(layerPointInfoPayload, {
    enabled: !!lonLat,
  });

  const { data: compareHistogramData } = useRegionsData(compareLayerPointInfoPayload, {
    enabled: !!lonLat,
  });

  return (
    <div
      className={cn({
        'first-letter:text-2xs absolute top-[81px] z-50 border border-secondary-900 bg-brand-500 p-4 text-secondary-500 shadow-md':
          true,
        'left-2.5 ': !isSidebarOpen,
        'left-[570px]': isSidebarOpen,
      })}
    >
      <button className="absolute right-4 top-4 z-50" onClick={onCloseTooltip}>
        <XIcon size={14} />
      </button>
      <div className="relative space-y-2">
        <div className="font-satoshi mr-5 space-y-4 font-bold">
          <div>
            <h3 className="text-sm">{leftData.title}</h3>
            <h4 className="text-2xl">
              Location {numberFormat(lonLat[0])}, {numberFormat(lonLat[1])}
            </h4>
            <Image
              src="/images/histogram.png"
              alt="Histogram"
              width={300}
              height={200}
              className="py-5"
            />
            <i className="flex max-w-[300px] text-xs text-secondary-800">
              Note: The data displayed above is not real, as the actual data is currently a work in
              progress and will be shown once finalized.
            </i>
          </div>
        </div>
      </div>

      {/* <ExampleControls width={width} height={height}>
        {({ data, getDate, getStockValue, xScale, yScale }) => (
          <svg width={width} height={height}>
            <rect width={width} height={height} fill={greens[0]} />
            <LinePath
              stroke={greens[2]}
              strokeWidth={2}
              data={data}
              x={(d) => xScale(getDate(d)) ?? 0}
              y={(d) => yScale(getStockValue(d)) ?? 0}
            />
          </svg>
        )}
      </ExampleControls> */}
    </div>
  );
};

export default Histogram;

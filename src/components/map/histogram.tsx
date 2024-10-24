'use client';

import React, { FC } from 'react';

import { FiDownload } from 'react-icons/fi';

import { format } from 'd3-format';
import { XIcon } from 'lucide-react';

import { cn } from '@/lib/classnames';

import { lonLatAtom } from '@/app/store';
import { useRegionsData } from '@/hooks/regions';

import { histogramLayerLeftVisibilityAtom } from '@/app/store';

import type { GeostoryTooltipInfo } from './types';

import { useAtom, useAtomValue } from 'jotai';
import { useSyncSidebarState } from '@/hooks/sync-query';

import { downloadCSV } from '@/hooks/datasets';
import Loading from '../loading';

import LineChart from '../line-chart';

const numberFormat = format(',.2f');

export type AnnotationProps = {
  width: number;
  height: number;
  compact?: boolean;
};

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
  rightData,
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

  const { data: histogramData, isLoading: isLoadingHistogram } = useRegionsData(
    layerPointInfoPayload,
    {
      enabled: !!lonLat,
    }
  );

  const { data: compareHistogramData, isLoading: isLoadingCompareHistogram } = useRegionsData(
    compareLayerPointInfoPayload,
    {
      enabled: !!lonLat,
    }
  );

  const data1 =
    (histogramData &&
      !!histogramData.length &&
      histogramData?.map(({ label, value }) => ({
        x: label,
        y: value,
      }))) ||
    [];

  const data2 =
    (compareHistogramData &&
      !!compareHistogramData.length &&
      compareHistogramData?.map(({ label, value }) => ({
        x: label,
        y: value,
      }))) ||
    [];

  const handleClick = () => {
    if (histogramData && histogramData.length > 0) {
      downloadCSV(histogramData, `data-${leftData.title}.csv`);
    } else {
      console.error('No data available for download.');
    }
  };
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
            <button
              type="button"
              onClick={handleClick}
              className={cn({
                'flex w-full items-center justify-end space-x-2': true,
                'opacity-50': !histogramData,
              })}
              disabled={!histogramData}
            >
              <FiDownload className="h-6 w-6" />
              <span className="font-inter text-xs">CSV</span>
            </button>
            {(isLoadingHistogram || isLoadingCompareHistogram) && <Loading />}

            {!isLoadingCompareHistogram && !isLoadingHistogram && (
              <div className="relative h-full w-full">
                <LineChart data={data1} data2={data2} />
              </div>
            )}
          </div>
          {/* <Button variant="default_active" size="sm" className="w-full">
            Compare
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Histogram;

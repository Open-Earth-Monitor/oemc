'use client';

import { FC } from 'react';

import { FiDownload } from 'react-icons/fi';

import { format } from 'd3-format';
import { XIcon } from 'lucide-react';

import { cn } from '@/lib/classnames';

import { lonLatAtom } from '@/app/store';
import { usePointData } from '@/hooks/regions';

import type { GeostoryTooltipInfo } from '../types';

import { useAtomValue } from 'jotai';
import { useSyncSidebarState } from '@/hooks/sync-query';

import { downloadCSV } from '@/hooks/datasets';
import Loading from '../../loading';

import LineChart from '../../line-chart';

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
  isRegionsLayerActive?: boolean;
}

const PointHistogram: FC<HistogramTypes> = ({
  onCloseTooltip = () => null,
  layerId,
  leftData,
}: HistogramTypes) => {
  const [isSidebarOpen] = useSyncSidebarState();

  const lonLat = useAtomValue(lonLatAtom);

  const layerPointInfoPayload = {
    lon: lonLat?.[0] || 0,
    lat: lonLat?.[1] || 0,
    layer_id: layerId,
  };

  const { data: histogramData, isLoading: isLoadingHistogram } = usePointData(
    layerPointInfoPayload,
    {
      enabled: !!lonLat,
    }
  );

  const histogramPointData =
    (histogramData &&
      !!histogramData.length &&
      histogramData?.map(({ label, value }) => ({
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
        'absolute top-[81px] z-50 space-y-5 text-secondary-500 shadow-md': true,
        'left-2.5 ': !isSidebarOpen,
        'left-[570px]': isSidebarOpen,
      })}
    >
      <div className="first-letter:text-2xs border border-secondary-900 bg-brand-500 p-4 shadow-md">
        <button className="absolute right-4 top-4 z-50" onClick={onCloseTooltip}>
          <XIcon size={14} />
        </button>
        <div className="relative space-y-2">
          <div className="mr-5 space-y-4 font-satoshi font-bold">
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
              {isLoadingHistogram && <Loading />}
              {!isLoadingHistogram && (
                <div className="relative h-full w-full">
                  <LineChart data={histogramPointData} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointHistogram;

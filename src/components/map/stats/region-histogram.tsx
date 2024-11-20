'use client';

import React, { FC, useCallback } from 'react';

import { FiDownload } from 'react-icons/fi';

import { format } from 'd3-format';
import { XIcon } from 'lucide-react';

import { useAtom } from 'jotai';
import { cn } from '@/lib/classnames';

import {
  nutsDataParamsCompareAtom,
  compareFunctionalityAtom,
  nutsDataParamsAtom,
} from '@/app/store';

import { Button } from '@/components/ui/button';

import type { GeostoryTooltipInfo } from '../types';

import { useAtomValue } from 'jotai';
import { useSyncSidebarState } from '@/hooks/sync-query';

import { downloadCSV } from '@/hooks/datasets';
import Loading from '../../loading';

import LineChart from '../../line-chart';
import CompareGeolocationInfoPopup from '../compare-geolocation-info';
import { useNutsLayerData } from '@/hooks/layers';

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

const RegionHistogram: FC<HistogramTypes> = ({
  onCloseTooltip = () => null,
  leftData,
  isRegionsLayerActive = false,
}: HistogramTypes) => {
  const [isSidebarOpen] = useSyncSidebarState();
  const [compareFunctionalityInfo, setCompareFunctionalityInfo] = useAtom(compareFunctionalityAtom);
  const nutsDataParams = useAtomValue(nutsDataParamsAtom);
  const nutsDataParamsCompare = useAtomValue(nutsDataParamsCompareAtom);

  const {
    data: histogramDataRegionRaw,
    isLoading: isLoadingDataHistogram,
    isError: isErrorDataHistogram,
  } = useNutsLayerData(nutsDataParams, {
    enabled: !!nutsDataParams.NUTS_ID && !!nutsDataParams.LAYER_ID,
  });

  const {
    data: histogramDataRegionRawCompare,
    isLoading: isLoadingDataCompareHistogram,
    isError: isErrorDataCompareHistogram,
  } = useNutsLayerData(nutsDataParams, {
    enabled: !!nutsDataParamsCompare.NUTS_ID && !!nutsDataParamsCompare.LAYER_ID,
  });

  const histogramDataRegion =
    (histogramDataRegionRaw &&
      !isLoadingDataHistogram &&
      !isErrorDataHistogram &&
      histogramDataRegionRaw.dataset?.map(({ label, avg, max, min }) => ({
        x: label,
        y: avg,
        max,
        min,
      }))) ||
    [];

  const compareHistogramDataRegion =
    (histogramDataRegionRawCompare &&
      !isLoadingDataCompareHistogram &&
      !isErrorDataCompareHistogram &&
      histogramDataRegionRawCompare.dataset?.map(({ label, avg, max, min }) => ({
        x: label,
        y: avg,
      }))) ||
    [];

  const handleClick = () => {
    if (histogramDataRegion && histogramDataRegion.length > 0) {
      // downloadCSV([...histogramDataRegionRaw], `data-${leftData.title}.csv`);
    } else {
      console.error('No data available for download.');
    }
  };

  const onCompareActive = useCallback(() => {
    setCompareFunctionalityInfo(true);
  }, []);

  const onCloseCompareInfo = useCallback(() => {
    setCompareFunctionalityInfo(false);
  }, []);

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
              <h4 className="text-2xl">Regions</h4>
              <button
                type="button"
                onClick={handleClick}
                className={cn({
                  'flex w-full items-center justify-end space-x-2': true,
                  'opacity-50': !histogramDataRegion,
                })}
                disabled={!histogramDataRegion}
              >
                <FiDownload className="h-6 w-6" />
                <span className="font-inter text-xs">CSV</span>
              </button>
              {(isLoadingDataHistogram || isLoadingDataCompareHistogram) && <Loading />}

              {(compareFunctionalityInfo &&
                !isLoadingDataCompareHistogram &&
                !isLoadingDataHistogram) ||
                (!compareFunctionalityInfo && !isLoadingDataHistogram && (
                  <div className="relative h-full w-full">
                    <LineChart
                      data={histogramDataRegion}
                      dataCompare={
                        isRegionsLayerActive &&
                        compareFunctionalityInfo &&
                        compareHistogramDataRegion
                      }
                    />
                  </div>
                ))}
            </div>
            {isRegionsLayerActive && (
              <Button variant="default_active" size="sm" onClick={onCompareActive}>
                Compare
              </Button>
            )}
          </div>
        </div>
      </div>
      {compareFunctionalityInfo && isRegionsLayerActive && (
        <CompareGeolocationInfoPopup onClick={onCloseCompareInfo} />
      )}
    </div>
  );
};

export default RegionHistogram;

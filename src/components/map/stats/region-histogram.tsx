'use client';

import React, { FC, useCallback, useMemo } from 'react';

import { FiDownload } from 'react-icons/fi';

import { XIcon } from 'lucide-react';

import { useAtom } from 'jotai';
import { cn } from '@/lib/classnames';

import {
  nutsDataParamsCompareAtom,
  compareFunctionalityAtom,
  nutsDataParamsAtom,
  regionsLayerVisibilityAtom,
} from '@/app/store';

import { Button } from '@/components/ui/button';

import type { GeostoryTooltipInfo, NutsProperties } from '../types';

import { useAtomValue } from 'jotai';
import { useSyncSidebarState } from '@/hooks/sync-query';

import { downloadCSV, downloadCSVCompare } from '@/hooks/datasets';
import Loading from '../../loading';

import LineChart from '../../line-chart';
import CompareGeolocationInfoPopup from '../compare-geolocation-info';
import { useNutsLayerData } from '@/hooks/layers';
import { transformNuqsData } from '../../../lib/utils';

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
  nutsProperties?: NutsProperties;
  compareNutProperties?: NutsProperties;
  onCompareClose: () => void;
  color?: string;
}

const RegionHistogram: FC<HistogramTypes> = ({
  onCloseTooltip = () => null,
  leftData,
  compareNutProperties,
  nutsProperties,
  onCompareClose,
  color,
}: HistogramTypes) => {
  const [isSidebarOpen] = useSyncSidebarState();
  const [compareFunctionalityInfo, setCompareFunctionalityInfo] = useAtom(compareFunctionalityAtom);
  const nutsDataParams = useAtomValue(nutsDataParamsAtom);
  const nutsDataParamsCompare = useAtomValue(nutsDataParamsCompareAtom);
  const isRegionsLayerActive = useAtomValue(regionsLayerVisibilityAtom);

  const {
    data: histogramDataRegionRaw,
    isFetching: isLoadingDataHistogram,
    isError: isErrorDataHistogram,
  } = useNutsLayerData(nutsDataParams, {
    enabled: !!nutsDataParams?.NUTS_ID && !!nutsDataParams?.LAYER_ID,
  });

  const {
    data: histogramDataRegionRawCompare,
    isFetching: isLoadingDataCompareHistogram,
    isError: isErrorDataCompareHistogram,
  } = useNutsLayerData(nutsDataParamsCompare, {
    enabled: !!nutsDataParamsCompare?.NUTS_ID && !!nutsDataParamsCompare?.LAYER_ID,
  });

  const histogramDataRegion = useMemo(() => {
    if (histogramDataRegionRaw && !isLoadingDataHistogram && !isErrorDataHistogram) {
      return {
        title: nutsProperties?.NAME_LATN,
        data: transformNuqsData(histogramDataRegionRaw),
      };
    }
  }, [histogramDataRegionRaw, isLoadingDataHistogram, isErrorDataHistogram, nutsProperties]);

  const compareHistogramDataRegion = useMemo(() => {
    if (
      histogramDataRegionRawCompare &&
      !isLoadingDataCompareHistogram &&
      !isErrorDataCompareHistogram
    ) {
      return {
        title: compareNutProperties?.NAME_LATN,
        data: transformNuqsData(histogramDataRegionRawCompare),
      };
    }
  }, [
    histogramDataRegionRawCompare,
    isLoadingDataCompareHistogram,
    isErrorDataCompareHistogram,
    compareNutProperties,
  ]);

  const handleClick = () => {
    if (
      histogramDataRegionRaw?.dataset?.length &&
      !histogramDataRegionRawCompare?.dataset?.length
    ) {
      const data = histogramDataRegionRaw.dataset.map((d) => ({
        layer_id: nutsDataParams.LAYER_ID,
        label: d.label,
        value: d.avg,
        unit: leftData.unit || '',
      }));
      downloadCSV(data, `data-${leftData.title}.csv`);
    } else if (
      histogramDataRegionRaw?.dataset?.length &&
      histogramDataRegionRawCompare?.dataset?.length
    ) {
      const data = histogramDataRegionRaw.dataset.map((d, i) => ({
        date: d.label,
        layer_id: nutsDataParams.LAYER_ID,
        unit: leftData.unit || '',
        regionA: {
          name: nutsProperties?.NAME_LATN,
          min: d.min,
          max: d.max,
          avg: d.avg,
        },
        regionB: {
          name: compareNutProperties?.NAME_LATN,
          min: histogramDataRegionRawCompare.dataset[i].min,
          max: histogramDataRegionRawCompare.dataset[i].max,
          avg: histogramDataRegionRawCompare.dataset[i].avg,
        },
      }));

      downloadCSVCompare(data, `data-${leftData.title}-compare.csv`);
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
        'absolute top-[81px] z-50 min-w-[420px] space-y-5 text-secondary-500 shadow-md': true,
        'left-2.5 ': !isSidebarOpen,
        'left-[570px]': isSidebarOpen,
      })}
    >
      <div className="first-letter:text-2xs border border-secondary-900 bg-brand-500 p-5 shadow-md">
        <button className="absolute right-4 top-4 z-50" onClick={onCloseTooltip}>
          <XIcon size={14} />
        </button>
        <div className="relative space-y-2">
          <div className="space-y-4 font-satoshi font-bold">
            <div>
              <h3 className="mb-2 text-sm">{leftData.title}</h3>
              <h4 className="text-2xl">
                {nutsProperties?.NAME_LATN} - {nutsProperties?.CNTR_CODE}
              </h4>
              {compareNutProperties && (
                <div className="mt-3 flex  items-center gap-2">
                  <h4 className="text-2xl">
                    {compareNutProperties.NAME_LATN} - {compareNutProperties.CNTR_CODE}
                  </h4>
                  <button className="py-0" onClick={onCompareClose}>
                    <XIcon size={24} />
                  </button>
                </div>
              )}
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
              {isLoadingDataHistogram || isLoadingDataCompareHistogram ? (
                <Loading />
              ) : (
                <div className="relative h-full w-full">
                  <LineChart
                    data={histogramDataRegion}
                    dataCompare={isRegionsLayerActive && compareHistogramDataRegion}
                  />
                </div>
              )}
            </div>
            {isRegionsLayerActive &&
              !compareFunctionalityInfo &&
              !compareHistogramDataRegion?.data?.length && (
                <Button variant="default" size="sm" onClick={onCompareActive}>
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

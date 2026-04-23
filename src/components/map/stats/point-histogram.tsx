'use client';

import { FC, useCallback, useMemo } from 'react';

import { format } from 'd3-format';
import { useAtomValue, useSetAtom } from 'jotai';
import { FiDownload } from 'react-icons/fi';

import { cn } from '@/lib/classnames';

import { histogramVisibilityAtom, lonLatAtom } from '@/app/store';

import { downloadCSV } from '@/hooks/datasets';
import { useLayerParsedSource } from '@/hooks/layers';
import { usePointData } from '@/hooks/map';

import LineChart from '../../line-chart';
import Loading from '../../loading';
import { AnalysisSVG } from '@/SVGS/analysis';

const numberFormat = format(',.2f');

type GeostoryTooltipInfo = {
  id: string;
  compareLayerId?: string;
  title: string;
  color: string;
};

const PointHistogram: FC<GeostoryTooltipInfo> = ({ title, color, id }: GeostoryTooltipInfo) => {
  const lonLat = useAtomValue(lonLatAtom);
  const setHistogramVisibility = useSetAtom(histogramVisibilityAtom);

  const { data } = useLayerParsedSource(
    {
      layer_id: id,
    },
    {
      enabled: !!id,
    }
  );

  const { srv_path, regex } = data || {};

  const layerPointInfoPayload = {
    lon: lonLat?.[0] || 0,
    lat: lonLat?.[1] || 0,
    layer_id: id,
    srv_path,
    regex,
  };

  const {
    data: histogramData,
    isLoading: isLoadingHistogram,
    error: histogramError,
  } = usePointData(layerPointInfoPayload, {
    enabled: !!lonLat && !!regex,
  });

  const histogramPointData = useMemo(() => {
    return {
      data: (Array.isArray(histogramData) ? histogramData : [])
        .filter((d) => Number.isFinite(d?.value))
        .map((d) => ({
          x: d.label,
          y: d.value,
          unit: d.unit ?? '',
        })),
    };
  }, [histogramData]);

  const handleClick = useCallback(() => {
    if (histogramData) {
      const data = Array.isArray(histogramData)
        ? histogramData
        : histogramPointData?.data?.map((d) => ({
            layer_id: id,
            label: d.x,
            value: d.y,
            unit: d.unit || '',
          }));
      downloadCSV(data, `data-${title}.csv`);
    } else {
      console.error('No data available for download.');
    }
  }, [histogramData, histogramPointData, id, title]);

  const handleCloseAnalysis = () => setHistogramVisibility(false);

  return (
    <div className="relative space-y-2">
      <div className="space-y-3 font-satoshi font-bold">
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-white-500">
            <AnalysisSVG className="h-6 w-6" />
            <span>Analysis</span>
          </div>

          <button className="text-xs text-accent-green underline" onClick={handleCloseAnalysis}>
            Close analysis
          </button>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="font-medium" style={{ color }}>
            Location {numberFormat(lonLat[0])}, {numberFormat(lonLat[1])}
          </h4>
          <button
            type="button"
            onClick={handleClick}
            className={cn({
              'flex w-full items-center justify-end space-x-2': true,
              'opacity-50': !histogramData || !!histogramError,
            })}
            disabled={!histogramData || !!histogramError}
          >
            <FiDownload className="h-3.5 w-3.5" />
            <span className="font-inter text-xs">CSV</span>
          </button>
        </div>
        {isLoadingHistogram && <Loading />}
        {!isLoadingHistogram && histogramError && (
          <p className="text-sm text-alert-error">
            Error occurred while fetching the data:{' '}
            {(histogramError.response?.data as { message?: string })?.message ||
              histogramError.message}
          </p>
        )}
        {!isLoadingHistogram && !histogramError && (
          <div className="relative h-full w-full">
            <LineChart data={histogramPointData} color={color} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PointHistogram;

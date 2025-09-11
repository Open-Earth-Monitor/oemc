'use client';

import { FC, useCallback, useMemo } from 'react';

import { format } from 'd3-format';
import { useAtomValue } from 'jotai';
import { FiDownload } from 'react-icons/fi';

import { cn } from '@/lib/classnames';

import { lonLatAtom } from '@/app/store';

import { downloadCSV } from '@/hooks/datasets';
import { useLayerParsedSource } from '@/hooks/layers';
import { usePointData } from '@/hooks/map';

import LineChart from '../../line-chart';
import Loading from '../../loading';

const numberFormat = format(',.2f');

export type AnnotationProps = {
  width: number;
  height: number;
  compact?: boolean;
};

type GeostoryTooltipInfo = {
  id: string;
  compareLayerId?: string;
  title: string;
  color: string;
};

const PointHistogram: FC<GeostoryTooltipInfo> = ({ title, color, id }: GeostoryTooltipInfo) => {
  const lonLat = useAtomValue(lonLatAtom);

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

  const { data: histogramData, isLoading: isLoadingHistogram } = usePointData(
    layerPointInfoPayload,
    {
      enabled: !!lonLat,
    }
  );

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

  return (
    <div className="relative space-y-2">
      <div className="space-y-4 font-satoshi">
        <div className="flex items-center justify-between">
          <h4 className="font-medium" style={{ color }}>
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
            <FiDownload className="h-3.5 w-3.5" />
            <span className="font-inter text-xs">CSV</span>
          </button>
        </div>
        {isLoadingHistogram && <Loading />}
        {!isLoadingHistogram && (
          <div className="relative h-full w-full">
            <LineChart data={histogramPointData} color={color} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PointHistogram;

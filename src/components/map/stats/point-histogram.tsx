'use client';

import { FC, useCallback, useEffect, useMemo, useRef } from 'react';

import { format } from 'd3-format';
import { useAtomValue, useSetAtom } from 'jotai';
import { FiDownload } from 'react-icons/fi';

import { cn } from '@/lib/classnames';
import { scrollToHistogram } from '@/lib/scroll-to-histogram';
import { transformPointData } from '@/lib/utils';

import { histogramVisibilityAtom, lonLatAtom } from '@/app/store';

import { CATEGORIES_COLORS } from '@/constants/categories';

import { downloadCSV } from '@/hooks/datasets';
import { useLayerParsedSource } from '@/hooks/layers';
import { usePointData } from '@/hooks/map';
import { useSyncCompareLayersSettings } from '@/hooks/sync-query';

import { AnalysisSVG } from '@/SVGS/analysis';

import LineChart from '../../line-chart';
import Loading from '../../loading';

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

  // A compare layer that is a different layer gets its own series at the same
  // point, so the chart shows both layers just like the map does.
  const [compareLayers] = useSyncCompareLayersSettings();
  const compareLayerId = compareLayers?.[0]?.id;
  const hasCompareLayer = !!compareLayerId && compareLayerId !== id;

  const { data: compareLayerData } = useLayerParsedSource(
    { layer_id: compareLayerId },
    { enabled: hasCompareLayer }
  );

  const { data: compareHistogramData, isLoading: isLoadingCompareHistogram } = usePointData(
    {
      lon: lonLat?.[0] || 0,
      lat: lonLat?.[1] || 0,
      layer_id: compareLayerId,
      srv_path: compareLayerData?.srv_path,
      regex: compareLayerData?.regex,
    },
    { enabled: hasCompareLayer && !!lonLat && !!compareLayerData?.regex }
  );

  const histogramPointData = useMemo(
    () => ({ title, data: transformPointData(histogramData) }),
    [histogramData, title]
  );

  const compareHistogramPointData = useMemo(() => {
    if (!hasCompareLayer || !compareHistogramData) return undefined;
    return { title: compareLayerData?.title, data: transformPointData(compareHistogramData) };
  }, [hasCompareLayer, compareHistogramData, compareLayerData?.title]);

  // Fall back to the neutral colour when both layers share a theme, otherwise
  // the two lines would be indistinguishable.
  const compareColor = useMemo(() => {
    const themeColor = CATEGORIES_COLORS[compareLayerData?.theme]?.base;
    return themeColor && themeColor !== color ? themeColor : CATEGORIES_COLORS.Unknown.base;
  }, [compareLayerData?.theme, color]);

  const isLoading = isLoadingHistogram || (hasCompareLayer && isLoadingCompareHistogram);

  // Export the normalised rows rather than the raw response, so the CSV carries
  // the same label the chart plots.
  const handleClick = useCallback(() => {
    if (!histogramPointData.data.length) {
      console.error('No data available for download.');
      return;
    }

    const data = histogramPointData.data.map((d) => ({
      layer_id: id,
      label: d.x,
      value: d.y,
      unit: d.unit,
    }));

    downloadCSV(data, `data-${title}.csv`);
  }, [histogramPointData, id, title]);

  const handleCloseAnalysis = () => setHistogramVisibility(false);

  // Reveal the histogram card when an error is rendered for a new
  // location — without this, the inline error can land below the
  // current scroll position and the user thinks nothing happened.
  const lastScrolledErrorKey = useRef<string | null>(null);
  useEffect(() => {
    if (!histogramError || !id || !lonLat) return;
    const key = `${id}:${lonLat[0]}:${lonLat[1]}`;
    if (lastScrolledErrorKey.current === key) return;
    lastScrolledErrorKey.current = key;
    requestAnimationFrame(() => scrollToHistogram(id));
  }, [histogramError, id, lonLat]);

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
        {compareHistogramPointData && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
              {title}
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: compareColor }}
              />
              {compareHistogramPointData.title}
            </span>
          </div>
        )}
        {isLoading && <Loading />}
        {!isLoading && histogramError && (
          <p data-testid="point-histogram-error" role="alert" className="text-alert-error text-sm">
            Error occurred while fetching the data:{' '}
            {(histogramError.response?.data as { message?: string })?.message ||
              histogramError.message}
          </p>
        )}
        {!isLoading && !histogramError && (
          <div className="relative h-full w-full">
            <LineChart
              data={histogramPointData}
              dataCompare={compareHistogramPointData}
              color={color}
              compareColor={compareColor}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PointHistogram;

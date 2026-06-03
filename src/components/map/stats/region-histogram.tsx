'use client';

import { FC, useCallback, useMemo } from 'react';

import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { XIcon } from 'lucide-react';
import { FiDownload } from 'react-icons/fi';
import { HiOutlineExternalLink } from 'react-icons/hi';

import { cn } from '@/lib/classnames';
import { transformNuqsData } from '@/lib/utils';

import {
  compareFunctionalityAtom,
  nutsDataParamsAtom,
  nutsDataParamsCompareAtom,
  regionsLayerVisibilityAtom,
  nutsDataResponseAtom,
  nutsDataResponseCompareAtom,
  histogramVisibilityAtom,
} from '@/app/store';

import { CATEGORIES_COLORS } from '@/constants/categories';

import { downloadCSV, downloadCSVCompare } from '@/hooks/datasets';
import { useLayer, useNutsLayerData } from '@/hooks/layers';

import LineChart from '@/components/line-chart';
import Loading from '@/components/loading';
import CompareGeolocationInfoPopup from '@/components/map/compare-geolocation-info';
import { NutsProperties } from '@/components/map/types';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { AnalysisSVG } from '@/SVGS/analysis';

type HistogramTypes = {
  onCloseTooltip?: () => void;
  compareLayerId?: string;
  isRegionsLayerActive?: boolean;
  nutsResponse?: NutsProperties;
  compareNutsProperties?: NutsProperties;
  onCompareClose?: () => void;
  color?: string;
  title: string;
  id: string;
};

type LayerColors = {
  color: string;
  bgColor: string;
};

type LocationPillProps = {
  name?: string;
  color?: string;
  bgColor?: string;
  onClose?: () => void;
};

const DEFAULT_LAYER_COLORS: LayerColors = {
  color: CATEGORIES_COLORS.Unknown.base,
  bgColor: CATEGORIES_COLORS.Unknown.light,
};

const getLayerColors = (theme?: string): LayerColors => {
  const category = theme ? CATEGORIES_COLORS[theme] : undefined;

  return {
    color: category?.base || CATEGORIES_COLORS.Unknown.base,
    bgColor: category?.light || CATEGORIES_COLORS.Unknown.light,
  };
};

const LocationPill: FC<LocationPillProps> = ({ name, color, bgColor, onClose }) => {
  if (!name) return null;

  return (
    <div
      style={{
        backgroundColor: bgColor ?? DEFAULT_LAYER_COLORS.bgColor,
        borderColor: color ?? DEFAULT_LAYER_COLORS.color,
      }}
      className="flex w-fit items-center gap-2.5 rounded-3xl border px-2 text-xs font-medium"
    >
      <span>{name}</span>
      {onClose && (
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button type="button" aria-label="Remove region" onClick={onClose}>
              <XIcon size={12} className="cursor-pointer" />
            </button>
          </TooltipTrigger>
          <TooltipContent sideOffset={4} side="top" align="center">
            <div className="text-sm">Remove region</div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};

const RegionsHistogram: FC<HistogramTypes> = ({ id, title, onCompareClose, color }) => {
  const [compareFunctionalityInfo, setCompareFunctionalityInfo] = useAtom(compareFunctionalityAtom);
  const setHistogramVisibility = useSetAtom(histogramVisibilityAtom);

  const nutsDataParams = useAtomValue(nutsDataParamsAtom);
  const nutsDataParamsCompare = useAtomValue(nutsDataParamsCompareAtom);
  const nutsResponse = useAtomValue(nutsDataResponseAtom);
  const compareNutsResponse = useAtomValue(nutsDataResponseCompareAtom);
  const isRegionsLayerActive = useAtomValue(regionsLayerVisibilityAtom);

  const {
    data: histogramDataRegionRaw,
    isFetching: isLoadingDataHistogram,
    isError: isErrorDataHistogram,
  } = useNutsLayerData(
    { ...nutsDataParams, key: 'regular' },
    {
      enabled: Boolean(nutsDataParams?.NUTS_ID && nutsDataParams?.LAYER_ID),
    }
  );

  const {
    data: histogramDataRegionRawCompare,
    isFetching: isLoadingDataCompareHistogram,
    isError: isErrorDataCompareHistogram,
  } = useNutsLayerData(
    { ...nutsDataParamsCompare, key: 'compare' },
    {
      enabled: Boolean(nutsDataParamsCompare?.NUTS_ID && nutsDataParamsCompare?.LAYER_ID),
    }
  );

  const { data: layerData } = useLayer({ layer_id: id });

  const histogramDataRegion = useMemo(() => {
    if (!histogramDataRegionRaw || isLoadingDataHistogram || isErrorDataHistogram) return undefined;

    return {
      title: nutsResponse?.NAME_LATN,
      data: transformNuqsData(histogramDataRegionRaw),
    };
  }, [histogramDataRegionRaw, isLoadingDataHistogram, isErrorDataHistogram, nutsResponse]);

  const compareHistogramDataRegion = useMemo(() => {
    if (
      !histogramDataRegionRawCompare ||
      isLoadingDataCompareHistogram ||
      isErrorDataCompareHistogram
    ) {
      return undefined;
    }

    return {
      title: compareNutsResponse?.NAME_LATN,
      data: transformNuqsData(histogramDataRegionRawCompare),
    };
  }, [
    histogramDataRegionRawCompare,
    isLoadingDataCompareHistogram,
    isErrorDataCompareHistogram,
    compareNutsResponse,
  ]);

  const { data: mainLayerData = DEFAULT_LAYER_COLORS } = useLayer<LayerColors>(
    { layer_id: histogramDataRegionRaw?.layer_id ?? '' },
    {
      enabled: Boolean(histogramDataRegionRaw?.layer_id),
      select: (data) => getLayerColors(data.theme),
    }
  );

  const { data: compareLayerData = DEFAULT_LAYER_COLORS } = useLayer<LayerColors>(
    { layer_id: histogramDataRegionRawCompare?.layer_id ?? '' },
    {
      enabled: Boolean(histogramDataRegionRawCompare?.layer_id && compareFunctionalityInfo),
      select: (data) => getLayerColors(data.theme),
    }
  );

  const isComparing = Boolean(
    compareFunctionalityInfo && histogramDataRegionRawCompare?.dataset?.length
  );
  const isLoading = isLoadingDataHistogram || isLoadingDataCompareHistogram;

  const secondaryLayerColors = useMemo(() => {
    if (compareLayerData.color !== mainLayerData.color) {
      return compareLayerData;
    }

    return {
      color: CATEGORIES_COLORS.Unknown.base,
      bgColor: CATEGORIES_COLORS.Unknown.light,
    };
  }, [compareLayerData, mainLayerData]);

  const handleDownload = useCallback(() => {
    if (
      histogramDataRegionRaw?.dataset?.length &&
      !histogramDataRegionRawCompare?.dataset?.length
    ) {
      const data = histogramDataRegionRaw.dataset.map((d) => ({
        layer_id: nutsDataParams.LAYER_ID,
        label: d.label,
        value: d.avg,
      }));

      downloadCSV(data, `data-${title}.csv`);
      return;
    }

    if (histogramDataRegionRaw?.dataset?.length && histogramDataRegionRawCompare?.dataset?.length) {
      const data = histogramDataRegionRaw.dataset.map((d, i) => ({
        date: d.label,
        layer_id: nutsDataParams.LAYER_ID,
        regionA: {
          name: nutsResponse?.NAME_LATN,
          min: d.min,
          max: d.max,
          avg: d.avg,
        },
        regionB: {
          name: compareNutsResponse?.NAME_LATN,
          min: histogramDataRegionRawCompare.dataset[i]?.min,
          max: histogramDataRegionRawCompare.dataset[i]?.max,
          avg: histogramDataRegionRawCompare.dataset[i]?.avg,
        },
      }));

      downloadCSVCompare(data, `data-${title}-compare.csv`);
      return;
    }

    console.error('No data available for download.');
  }, [
    histogramDataRegionRaw,
    histogramDataRegionRawCompare,
    nutsDataParams.LAYER_ID,
    nutsResponse?.NAME_LATN,
    compareNutsResponse?.NAME_LATN,
    title,
  ]);

  const handleCompareOpen = useCallback(() => {
    setCompareFunctionalityInfo(true);
  }, [setCompareFunctionalityInfo]);

  const handleCompareClose = useCallback(() => {
    setCompareFunctionalityInfo(false);
  }, [setCompareFunctionalityInfo]);

  const handleClick = () => {
    setHistogramVisibility(false);
    setCompareFunctionalityInfo(false);
  };

  return (
    <div className="relative space-y-2">
      <div className="space-y-3 font-satoshi font-bold">
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-white-500">
            <AnalysisSVG className="h-6 w-6" />
            <span>Analysis</span>
          </div>

          <button className="text-xs text-accent-green underline" onClick={handleClick}>
            Close analysis
          </button>
        </div>
        <div className="flex items-center justify-end gap-2">
          {!!layerData?.download_url && (
            <a
              href={layerData.download_url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="dataset-download-button"
              title="Go to download dataset site"
              className="group/link inline-flex items-center overflow-hidden"
            >
              <HiOutlineExternalLink
                className="h-4 w-4 shrink-0 text-secondary-500"
                aria-label="Go to dataset"
              />
              <span className="ml-2 max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-in-out group-hover/link:max-w-[110px] group-hover/link:opacity-100">
                <span className="inline-block text-xs">Go to dataset</span>
              </span>
            </a>
          )}

          <button
            type="button"
            onClick={handleDownload}
            className={cn('group/download inline-flex items-center overflow-hidden', {
              'opacity-50': !histogramDataRegion,
            })}
            disabled={!histogramDataRegion}
          >
            <FiDownload className="h-4 w-4 shrink-0" />
            <span className="ml-2 max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-in-out group-hover/download:max-w-[40px] group-hover/download:opacity-100">
              <span className="inline-block font-inter text-xs">CSV</span>
            </span>
          </button>
        </div>

        <div className="flex items-center justify-start gap-2">
          <LocationPill
            name={nutsResponse?.NAME_LATN}
            color={mainLayerData.color}
            bgColor={mainLayerData.bgColor}
          />

          {compareNutsResponse?.NAME_LATN && (
            <LocationPill
              name={`${compareNutsResponse.NAME_LATN} - ${compareNutsResponse.CNTR_CODE}`}
              color={secondaryLayerColors.color}
              bgColor={secondaryLayerColors.bgColor}
              onClose={onCompareClose}
            />
          )}
        </div>

        {isLoading && <Loading />}

        {!isLoading && (
          <div className="relative h-full w-full text-white-500">
            <LineChart
              data={histogramDataRegion}
              dataCompare={isComparing ? compareHistogramDataRegion : undefined}
              color={color}
              compareColor={secondaryLayerColors.color}
            />
          </div>
        )}

        <div className="flex w-full justify-center">
          <Button variant="outline" size="sm" onClick={handleCompareOpen}>
            <span className="text-xs">Compare with another region</span>
          </Button>
        </div>
      </div>

      {compareFunctionalityInfo && isRegionsLayerActive && (
        <CompareGeolocationInfoPopup onClick={handleCompareClose} />
      )}
    </div>
  );
};

export default RegionsHistogram;

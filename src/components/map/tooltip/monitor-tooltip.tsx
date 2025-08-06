'use client';

import React, { FC, useCallback, useMemo } from 'react';

import { format } from 'd3-format';
import { useAtom, useSetAtom } from 'jotai';
import { XIcon } from 'lucide-react';
import { Coordinate } from 'ol/coordinate';
import { TileWMS } from 'ol/source';

import cn from '@/lib/classnames';

import {
  coordinateAtom,
  histogramVisibilityAtom,
  nutsDataParamsAtom,
  regionsLayerVisibilityAtom,
  resolutionAtom,
} from '@/app/store';

import { Button } from '@/components/ui/button';

import { getHistogramData } from '../../../lib/utils';
import type { MonitorTooltipInfo, NutsProperties } from '../types';

const numberFormat = format(',.2f');

interface TooltipProps extends MonitorTooltipInfo {
  onCloseTooltip: () => void;
  nutsProperties?: NutsProperties;
}

const MonitorTooltip: FC<TooltipProps> = ({
  position,
  onCloseTooltip = () => null,
  leftData,
  rightData,
  nutsProperties,
}: TooltipProps) => {
  const [isHistogramActive, isHistogramVisibility] = useAtom(histogramVisibilityAtom);
  const setNutsDataParams = useSetAtom(nutsDataParamsAtom);

  const [coordinate] = useAtom(coordinateAtom);
  const [resolution] = useAtom(resolutionAtom);

  const wmsNutsSource = useMemo(() => {
    return new TileWMS({
      url: 'https://geoserver.earthmonitor.org/geoserver/oem/wms',
      params: {
        TILED: true,
        ID: true,
        name: 'oem:NUTS_RG_01M_2021_3035',
        LAYERS: 'oem:NUTS_RG_01M_2021_3035',
      },
      serverType: 'geoserver',
      crossOrigin: 'anonymous',
    });
  }, []);

  const handleHistogram = useCallback(async () => {
    const { nutsDataParams } = await getHistogramData(
      wmsNutsSource,
      coordinate as Coordinate,
      resolution,
      leftData.id
    );
    setNutsDataParams(nutsDataParams);
    isHistogramVisibility(true);
  }, [coordinate, resolution, leftData.id, isHistogramVisibility]);
  const [isRegionsLayerActive] = useAtom(regionsLayerVisibilityAtom);

  const handleClick = () => {
    isHistogramVisibility(true);
  };

  const dateLabel = leftData.range?.find(({ value }) => value === leftData.date)?.label;
  const compareDateLabel =
    rightData.date && leftData.range?.find(({ value }) => value === rightData.date)?.label;
  if (!position || (!leftData?.value && leftData?.value !== 0)) return null;
  return (
    <>
      <div className="relative space-y-4">
        <h3 className="mt-4 text-left text-sm font-bold">{leftData.title}</h3>

        {!!leftData.value && (
          <div className="flex flex-col items-start">
            {isRegionsLayerActive && !!nutsProperties?.NAME_LATN && (
              <div className="font-satoshi text-2xl font-bold">{nutsProperties?.NAME_LATN}</div>
            )}
            <div className="space-x-2 text-xl">
              {typeof leftData.value === 'number' ? numberFormat(leftData.value) : leftData.value}
              {!!leftData.unit && leftData.unit}
            </div>
            {leftData.isComparable && <span className="text-sm">({dateLabel})</span>}
          </div>
        )}
        {!leftData.value && (!!rightData.value || !rightData.date) && (
          <span className="pt-2 text-sm font-light">
            No data is available at this specific point
            {dateLabel && ` for the selected date (${dateLabel})`}.
          </span>
        )}
        {!!leftData?.value && !isRegionsLayerActive && leftData.range && (
          <Button
            variant="default"
            onClick={handleClick}
            className="w-full font-inter text-xs"
            disabled={!leftData.value}
          >
            See point-based summary
          </Button>
        )}

        {!!leftData?.value && isRegionsLayerActive && leftData.range && (
          <Button
            variant="default"
            onClick={handleHistogram}
            className="p-2 font-inter text-xs"
            disabled={!leftData.value}
          >
            See regions-based summary
          </Button>
        )}

        {!!rightData.date && rightData.value !== 0 && (
          <div className="border-brand-800 mt-4 border-t pt-4 text-right text-xl">
            {typeof rightData.value === 'number' ? numberFormat(rightData.value) : rightData.value}
            {!!rightData.unit && rightData.unit}{' '}
            <span className="pt-4 text-sm">({compareDateLabel})</span>
          </div>
        )}
        {!!rightData.date && !rightData.value && !leftData.value && (
          <span className="pt-4 text-sm font-light">
            No data is available at this specific point for the selected dates ({dateLabel} and{' '}
            {compareDateLabel}).
          </span>
        )}
        <div className="arrow absolute -bottom-5 left-1/2 -translate-x-1/2 rotate-45" />
      </div>
    </>
  );
};

export default MonitorTooltip;

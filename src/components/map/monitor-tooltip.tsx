'use client';

import React, { FC, useCallback, useMemo } from 'react';

import { format } from 'd3-format';
import { XIcon } from 'lucide-react';
import { useAtom, useSetAtom } from 'jotai';
import { Button } from '@/components/ui/button';

import {
  coordinateAtom,
  histogramLayerLeftVisibilityAtom,
  nutsDataParamsAtom,
  regionsLayerVisibilityAtom,
  resolutionAtom,
} from '@/app/store';

import type { MonitorTooltipInfo, NutsProperties } from './types';
import cn from '@/lib/classnames';
import { getHistogramData } from './utils';
import { TileWMS } from 'ol/source';
import { Coordinate } from 'ol/coordinate';

const numberFormat = format(',.2f');

interface TooltipProps extends MonitorTooltipInfo {
  onCloseTooltip: () => void;
  nutsProperties?: NutsProperties;
}

const MapTooltip: FC<TooltipProps> = ({
  position,
  onCloseTooltip = () => null,
  leftData,
  rightData,
  nutsProperties,
}: TooltipProps) => {
  if (!position || (!leftData?.value && leftData?.value !== 0)) return null;
  const [leftLayerHistogramVisibility, setLeftLayerHistogramVisibility] = useAtom(
    histogramLayerLeftVisibilityAtom
  );
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
    setLeftLayerHistogramVisibility(true);
  }, [coordinate, resolution, leftData.id, setLeftLayerHistogramVisibility]);
  const [isRegionsLayerActive] = useAtom(regionsLayerVisibilityAtom);

  const handleClick = () => {
    setLeftLayerHistogramVisibility(true);
  };

  const dateLabel = leftData.range?.find(({ value }) => value === leftData.date)?.label;
  const compareDateLabel =
    rightData.date && leftData.range?.find(({ value }) => value === rightData.date)?.label;

  return (
    <div
      className={cn({
        'text-2xs absolute z-50 max-w-[300px] translate-x-[-50%] translate-y-[-100%] bg-secondary-500 p-5 font-bold text-brand-500 shadow-md':
          true,
        hidden: leftLayerHistogramVisibility,
      })}
      style={{
        left: `${position[0]}px`,
        top: `${position[1] - 10}px`,
      }}
    >
      <button className="absolute right-4 top-4 z-50" onClick={onCloseTooltip}>
        <XIcon size={14} className="text-brand-500" />
      </button>
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
        {leftData?.value && !isRegionsLayerActive && (
          <Button
            variant="light"
            onClick={handleClick}
            className="font-inter w-full text-xs"
            disabled={!leftData.value}
          >
            See point histogram
          </Button>
        )}

        {leftData?.value && isRegionsLayerActive && (
          <Button
            variant="light"
            onClick={handleHistogram}
            className="font-inter p-2 text-xs"
            disabled={!leftData.value}
          >
            See region histogram
          </Button>
        )}

        {rightData.date && rightData.value !== 0 && (
          <div className="border-brand-800 mt-4 border-t pt-4 text-right text-xl">
            {typeof rightData.value === 'number' ? numberFormat(rightData.value) : rightData.value}
            {!!rightData.unit && rightData.unit}{' '}
            <span className="pt-4 text-sm">({compareDateLabel})</span>
          </div>
        )}
        {rightData.date && !rightData.value && !leftData.value && (
          <span className="pt-4 text-sm font-light">
            No data is available at this specific point for the selected dates ({dateLabel} and{' '}
            {compareDateLabel}).
          </span>
        )}
        <div className="arrow absolute -bottom-5 left-1/2 -translate-x-1/2 rotate-45" />
      </div>
    </div>
  );
};

export default MapTooltip;

'use client';

import React, { FC, useCallback, useMemo } from 'react';

import { format } from 'd3-format';
import { useAtom, useSetAtom } from 'jotai';
import GeostoryTooltip from './geostory-tooltip';
import MonitorTooltip from './monitor-tooltip';
import {
  coordinateAtom,
  histogramVisibilityAtom,
  nutsDataParamsAtom,
  regionsLayerVisibilityAtom,
  resolutionAtom,
} from '@/app/store';

import type { MonitorTooltipInfo, NutsProperties } from '../types';
import cn from '@/lib/classnames';
import { getHistogramData } from '../../../lib/utils';
import { TileWMS } from 'ol/source';
import { Coordinate } from 'ol/coordinate';
import { Button } from '@/components/ui/button';

import { LuChartColumnBig, LuX } from 'react-icons/lu';

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
    <div
      className={cn({
        'absolute z-50 max-w-[300px] translate-x-[-50%] translate-y-[-100%] rounded-[20px] bg-white-500 p-5 font-satoshi font-medium text-black-500 shadow-md':
          true,
        hidden: isHistogramActive,
      })}
      style={{
        left: `${position[0]}px`,
        top: `${position[1] - 10}px`,
      }}
    >
      <div className="space-y-5">
        <div className="flex w-full items-start justify-between">
          <h3 className="break-word flex flex-wrap text-left">{leftData.title}</h3>

          <button type="button" onClick={onCloseTooltip}>
            <LuX className="h-6 w-6" />
          </button>
        </div>
        {leftData.value !== 0 && (
          <div className="flex flex-col items-start space-y-3">
            {isRegionsLayerActive && !!nutsProperties?.NAME_LATN && (
              <div className="flex flex-wrap space-x-2.5 divide-x-2 divide-white-900 text-left font-satoshi text-xs font-bold">
                <span>{nutsProperties?.NAME_LATN}</span>
                <span className="ml-2.5">Region name</span>
              </div>
            )}
            <div className="space-x-2 text-[22px]">
              {typeof leftData.value === 'number' ? numberFormat(leftData.value) : leftData.value}
              {!!leftData.unit && leftData.unit}
            </div>
          </div>
        )}
        {!leftData.value && (!!rightData.value || !rightData.date) && (
          <span>No data is available at this specific point.</span>
        )}
        {leftData?.value && !isRegionsLayerActive && (
          <Button
            variant="default"
            onClick={handleClick}
            className="space-x-2 p-2 text-sm"
            disabled={!leftData.value}
          >
            <LuChartColumnBig className="h-6 w-6" />
            <span>See point-based summary</span>
          </Button>
        )}
        {leftData?.value && isRegionsLayerActive && (
          <Button variant="default" onClick={handleHistogram} className="space-x-2 p-2  text-sm">
            <LuChartColumnBig className="h-6 w-6" />
            <span> See regions-based summary</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default MapTooltip;

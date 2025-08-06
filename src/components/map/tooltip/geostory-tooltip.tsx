'use client';

import React, { FC, useMemo, useCallback } from 'react';

import { format } from 'd3-format';
import { useAtom, useSetAtom } from 'jotai';
import { XIcon } from 'lucide-react';
import { Coordinate } from 'ol/coordinate';
import TileWMS from 'ol/source/TileWMS';

import cn from '@/lib/classnames';

import {
  coordinateAtom,
  histogramVisibilityAtom,
  regionsLayerVisibilityAtom,
  resolutionAtom,
  nutsDataParamsAtom,
} from '@/app/store';

import type { GeostoryTooltipInfo, NutsProperties } from '@/components/map/types';
import { Button } from '@/components/ui/button';

import { getHistogramData } from '../../../lib/utils';

const numberFormat = format(',.2f');

interface TooltipProps extends GeostoryTooltipInfo {
  onCloseTooltip: () => void;
  nutsProperties?: NutsProperties;
}

const GeostoryTooltip: FC<TooltipProps> = ({
  position,
  onCloseTooltip = () => null,
  leftData,
  rightData,
  nutsProperties,
}: TooltipProps) => {
  const [coordinate] = useAtom(coordinateAtom);
  const [resolution] = useAtom(resolutionAtom);
  const setNutsDataParams = useSetAtom(nutsDataParamsAtom);

  const [isRegionsLayerActive] = useAtom(regionsLayerVisibilityAtom);
  const [isHistogramActive, isHistogramVisibility] = useAtom(histogramVisibilityAtom);

  const handleClick = () => {
    isHistogramVisibility(true);
  };

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
  if (!position || !leftData?.value) return null;

  return (
    <>
      <div className="relative space-y-2">
        <div className="space-y-4 font-satoshi font-bold text-brand-500">
          <div className="space-y-2">
            <h3 className="break-word mt-4 flex flex-wrap text-left text-sm">{leftData.title}</h3>
            {leftData.value !== 0 && (
              <div className="flex flex-col items-start">
                {isRegionsLayerActive && !!nutsProperties?.NAME_LATN && (
                  <div className="flex flex-wrap text-left font-satoshi text-2xl font-bold">
                    {nutsProperties?.NAME_LATN}
                  </div>
                )}
                <div className="space-x-2 text-xl">
                  {typeof leftData.value === 'number'
                    ? numberFormat(leftData.value)
                    : leftData.value}
                  {!!leftData.unit && leftData.unit}
                </div>
              </div>
            )}
            {!leftData.value && (!!rightData.value || !rightData.date) && (
              <span>No data is available at this specific point.</span>
            )}
          </div>
          {leftData?.value && !isRegionsLayerActive && leftData.range && (
            <Button
              variant="default"
              onClick={handleClick}
              className="w-full p-2 font-inter text-xs"
              disabled={!leftData.value}
            >
              See point-based summary
            </Button>
          )}
          {leftData?.value && isRegionsLayerActive && (
            <Button variant="default" onClick={handleHistogram} className="p-2 font-inter text-xs">
              See regions-based summary
            </Button>
          )}
        </div>
        {!!rightData.value && (
          <div className="border-brand-800 space-y-4 border-t pt-2.5 font-satoshi font-bold text-brand-500 ">
            <div>
              <h3 className="mt-4 text-left text-sm">{rightData.title}</h3>
              <div className="text-xl">
                {typeof rightData.value === 'number'
                  ? numberFormat(rightData.value)
                  : rightData.value}
                {!!rightData.unit && rightData.unit}
              </div>
            </div>
            {!isRegionsLayerActive && rightData.range && (
              <Button
                variant="default"
                onClick={handleClick}
                className="font-inter text-xs"
                // disabled={true}
              >
                See point-based summary
              </Button>
            )}
            {!!isRegionsLayerActive && rightData.range && (
              <Button
                variant="default"
                onClick={handleHistogram}
                className="font-inter text-xs"
                // disabled={!rightData.value}
                // disabled={true}
              >
                See regions-based summary
              </Button>
            )}
          </div>
        )}
        {!rightData.value && !leftData.value && (
          <span className="pt-4 text-sm font-light">
            No data is available at this specific point for any of the layers.
          </span>
        )}
        <div className="arrow absolute -bottom-5 left-1/2 -translate-x-1/2 rotate-45" />
      </div>
    </>
  );
};

export default GeostoryTooltip;

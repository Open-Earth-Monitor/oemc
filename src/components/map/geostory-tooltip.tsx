'use client';

import React, { FC, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import { format } from 'd3-format';
import { XIcon } from 'lucide-react';
import TileWMS from 'ol/source/TileWMS';

import { Button } from '@/components/ui/button';
import { Coordinate } from 'ol/coordinate';
import {
  coordinateAtom,
  histogramLayerLeftVisibilityAtom,
  regionsLayerVisibilityAtom,
  resolutionAtom,
} from '@/app/store';

import type { FeatureInfoResponse, GeostoryTooltipInfo } from './types';
import { useAtom } from 'jotai';
import cn from '@/lib/classnames';
import { useNutsLayerData } from '@/hooks/layers';

const numberFormat = format(',.2f');

interface TooltipProps extends GeostoryTooltipInfo {
  onCloseTooltip: () => void;
  nutsProperties?: {};
}

const MapTooltip: FC<TooltipProps> = ({
  position,
  onCloseTooltip = () => null,
  leftData,
  rightData,
  nutsProperties,
}: TooltipProps) => {
  if (!position || !leftData?.value) return null;
  const [coordinate] = useAtom(coordinateAtom);
  const [resolution] = useAtom(resolutionAtom);

  const [nutsId, setNutsId] = useState<string>(null);

  const [isRegionsLayerActive] = useAtom(regionsLayerVisibilityAtom);
  const [leftLayerHistogramVisibility, setLeftLayerHistogramVisibility] = useAtom(
    histogramLayerLeftVisibilityAtom
  );

  const handleClick = () => {
    setLeftLayerHistogramVisibility(true);
  };

  const { data: nutsLayerData } = useNutsLayerData(
    { NUTS_ID: nutsId, LAYER_ID: leftData.id },
    { enabled: !!nutsId && !!leftData.id }
  );

  const handleHistogram = useCallback(async () => {
    const NUTS_layer = wmsNutsSource?.getFeatureInfoUrl(
      coordinate as Coordinate,
      resolution,
      'EPSG:3857',
      {
        INFO_FORMAT: 'application/json',
        LAYERS: 'oem:NUTS_RG_01M_2021_3035',
      }
    );
    try {
      const NUTS_layer_response = await axios.get<FeatureInfoResponse>(NUTS_layer);

      if (
        NUTS_layer_response.data.features?.length > 0 &&
        NUTS_layer_response.data.features[0].properties
      ) {
        const properties = NUTS_layer_response.data.features[0].properties;
        setNutsId(properties?.NUTS_ID as string);
      }
    } catch {
      console.error('There had been an eRror while fetching NUTS layer data');
    }
  }, [nutsProperties]);

  const wmsNutsSource = useMemo(() => {
    return new TileWMS({
      url: 'https://v2-geoserver.openlandmap.org/geoserver/oem/wms',
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

  return (
    <div
      className={cn({
        'max-w-32 text-2xs absolute z-50 translate-x-[-50%] translate-y-[-100%] bg-secondary-500 p-4 shadow-md':
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
      <div className="relative space-y-2">
        <div className="font-satoshi mr-5 space-y-4 font-bold text-brand-500">
          <div>
            <h3 className="text-sm">{leftData.title}</h3>
            {leftData.value !== 0 && (
              <div className="flex items-end space-x-2">
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
          {leftData?.value && !isRegionsLayerActive && (
            <Button
              variant="light"
              onClick={handleClick}
              className="font-inter text-xs"
              disabled={!leftData.value}
            >
              See point histogram
            </Button>
          )}
          {leftData?.value && isRegionsLayerActive && (
            <Button
              variant="light"
              onClick={handleHistogram}
              className="font-inter text-xs"
              // disabled={true}
            >
              See region histogram
            </Button>
          )}
        </div>
        {!!rightData.value && (
          <div className="border-brand-800 font-satoshi mr-5 space-y-4 border-t pt-2.5 font-bold text-brand-500 ">
            <div>
              <h3 className="text-sm">{rightData.title}</h3>
              <div className="text-xl">
                {typeof rightData.value === 'number'
                  ? numberFormat(rightData.value)
                  : rightData.value}
                {!!rightData.unit && rightData.unit}
              </div>
            </div>
            {!isRegionsLayerActive && (
              <Button
                variant="light"
                onClick={handleClick}
                className="font-inter text-xs"
                disabled={true}
              >
                See point histogram
              </Button>
            )}
            {isRegionsLayerActive && (
              <Button
                variant="light"
                onClick={handleClick}
                className="font-inter text-xs"
                // disabled={!rightData.value}
                // disabled={true}
              >
                See region histogram
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
    </div>
  );
};

export default MapTooltip;

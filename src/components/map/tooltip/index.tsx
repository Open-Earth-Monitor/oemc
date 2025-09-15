'use client';

import React, { FC, useCallback, useMemo } from 'react';

import { format } from 'd3-format';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import { Coordinate } from 'ol/coordinate';
import { TileWMS } from 'ol/source';
import { LuChartColumnBig, LuX } from 'react-icons/lu';

import cn from '@/lib/classnames';
import { getHistogramData } from '@/lib/utils';

import {
  coordinateAtom,
  histogramVisibilityAtom,
  nutsDataParamsAtom,
  nutsDataResponseAtom,
  regionsLayerVisibilityAtom,
  resolutionAtom,
} from '@/app/store';

import { useSyncSwipeControlPosition } from '@/hooks/sync-query';

import type { MonitorTooltipInfo } from '@/components/map/types';
import { Button } from '@/components/ui/button';

const numberFormat = format(',.2f');

interface TooltipProps extends MonitorTooltipInfo {
  onCloseTooltip: () => void;
}

function scrollToHistogram(theId: string) {
  const vp = document.getElementById('sidebar-scroll-viewport');
  const el = document.getElementById(`histogram-anchor-${theId}`);

  if (!vp || !el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });

  const sticky = vp.querySelector('.sticky') as HTMLElement | null;
  const offset = (sticky?.offsetHeight ?? 0) + 8;

  requestAnimationFrame(() => {
    vp.scrollTo({ top: vp.scrollTop - offset, behavior: 'smooth' });
  });
}

type MapTooltipProps = Omit<TooltipProps, 'leftData' | 'rightData'> & {
  data: TooltipProps['leftData'] | TooltipProps['rightData'];
};

const MapTooltip: FC<MapTooltipProps> = ({ position, onCloseTooltip = () => null, data }) => {
  const [isHistogramActive, isHistogramVisibility] = useAtom(histogramVisibilityAtom);
  const nutsDataResponse = useAtomValue(nutsDataResponseAtom);
  const setNutsDataParams = useSetAtom(nutsDataParamsAtom);
  const swipeSide = useSyncSwipeControlPosition();

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
      data.id
    );
    setNutsDataParams(nutsDataParams);
    isHistogramVisibility(true);
  }, [coordinate, resolution, data.id, isHistogramVisibility, setNutsDataParams, wmsNutsSource]);

  const [isRegionsLayerActive] = useAtom(regionsLayerVisibilityAtom);

  const handleClick = useCallback(() => {
    isHistogramVisibility(true);
    requestAnimationFrame(() => {
      scrollToHistogram(data.id);
    });
  }, [isHistogramVisibility, data.id]);

  if (!position || (data?.value === undefined && data?.value !== 0)) return null;
  return (
    <div
      className={cn({
        'absolute z-50 min-w-[250px] max-w-[300px] translate-x-[-50%] translate-y-[-100%] rounded-[20px] bg-white-500 p-5 font-satoshi font-medium text-black-500 shadow-md':
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
          <h3 className="break-word flex flex-wrap text-left">{data.title}</h3>

          <button type="button" onClick={onCloseTooltip}>
            <LuX className="h-6 w-6" />
          </button>
        </div>
        {data.value !== 0 && (
          <div className="flex flex-col items-start space-y-3">
            {isRegionsLayerActive && !!nutsDataResponse?.NAME_LATN && (
              <div className="flex flex-wrap space-x-2.5 divide-x-2 divide-white-900 text-left font-satoshi text-xs font-medium">
                <span>{nutsDataResponse?.NAME_LATN}</span>
                <span className="ml-2.5">{nutsDataResponse?.NUTS_NAME}</span>
              </div>
            )}
            <div className="space-x-2 text-[22px]">
              {typeof data.value === 'number' ? (
                <span>{numberFormat(data.value)}</span>
              ) : (
                data.value
              )}
              {!!data.unit && <span>{data.unit}</span>}
            </div>
          </div>
        )}
        {!data.value && <span>No data is available at this specific point.</span>}
        {data?.value && !isRegionsLayerActive && (
          <Button
            variant="default"
            onClick={handleClick}
            className="space-x-2 p-2 text-sm"
            disabled={!data.value}
          >
            <LuChartColumnBig className="h-6 w-6" />
            <span>See point-based summary</span>
          </Button>
        )}
        {data?.value && isRegionsLayerActive && (
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

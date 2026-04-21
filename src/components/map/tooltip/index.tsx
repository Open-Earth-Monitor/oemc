'use client';

import { FC, useCallback, useMemo } from 'react';

import { format } from 'd3-format';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import { LuX } from 'react-icons/lu';

import { useCountryName } from '@/hooks/countries';
import { useLayer } from '@/hooks/layers';

import {
  histogramVisibilityAtom,
  nutsDataResponseAtom,
  regionsLayerVisibilityAtom,
} from '@/app/store';

import { CATEGORIES_COLORS } from '@/constants/categories';

import type { MonitorTooltipInfo } from '@/components/map/types';
import { Button } from '@/components/ui/button';

import { AnalysisSVG } from '@/SVGS/analysis';

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
  const isHistogramVisibility = useSetAtom(histogramVisibilityAtom);
  const nutsDataResponse = useAtomValue(nutsDataResponseAtom);
  const countryName = useCountryName(nutsDataResponse?.CNTR_CODE);

  const { data: layerData } = useLayer({
    layer_id: data.id,
  });

  const handleHistogram = useCallback(() => {
    isHistogramVisibility(true);
  }, [isHistogramVisibility]);

  const [isRegionsLayerActive] = useAtom(regionsLayerVisibilityAtom);

  const handleClick = useCallback(() => {
    isHistogramVisibility(true);
    requestAnimationFrame(() => {
      scrollToHistogram(data?.id);
    });
  }, [isHistogramVisibility, data?.id]);

  const color = useMemo(() => {
    return (
      CATEGORIES_COLORS[layerData?.theme || 'Unknown'].base || CATEGORIES_COLORS['Unknown'].base
    );
  }, [layerData?.theme]);

  if (!position || (data?.value === undefined && data?.value !== 0)) return null;

  const label = [nutsDataResponse?.NUTS_NAME, countryName].filter(Boolean).join(', ');

  return (
    <div
      className="absolute z-50 min-w-[250px] translate-x-[-50%] translate-y-[-100%] rounded-[20px] bg-black-150 p-5 font-satoshi font-medium text-white-500 shadow-md"
      style={{
        left: `${position[0]}px`,
        top: `${position[1] - 10}px`,
      }}
    >
      <div className="space-y-5">
        <div className="flex w-full items-start justify-between space-x-2">
          <AnalysisSVG className="h-6 w-6 flex-shrink-0" />
          <h3 style={{ color }} className="break-word flex max-w-[300px] flex-wrap  text-left ">
            {data.title}
          </h3>

          <button type="button" onClick={onCloseTooltip}>
            <LuX className="h-6 w-6" />
          </button>
        </div>
        {data.value !== 0 && (
          <>
            <div className="flex items-center space-x-2 text-xs">
              {isRegionsLayerActive && (
                <span className="whitespace-nowrap">Location selected:</span>
              )}
              {isRegionsLayerActive && !!nutsDataResponse?.NUTS_NAME && (
                <div className="flex space-x-2.5 whitespace-nowrap rounded-full bg-white-950 px-2 py-0.5 text-left font-satoshi font-medium">
                  {label}
                </div>
              )}
            </div>
            <div className="space-x-2 text-[22px]">
              {typeof data.value === 'number' ? (
                <span>{numberFormat(data.value)}</span>
              ) : (
                data.value
              )}
              {!!data.unit && !!data.value && <span>{data.unit}</span>}
            </div>
          </>
        )}
        {!data.value && <span>No data is available at this specific location.</span>}
        {data?.value && !isRegionsLayerActive && (
          <Button variant="outline" onClick={handleClick} disabled={!data.value}>
            Show point histogram
          </Button>
        )}
        {data?.value && isRegionsLayerActive && (
          <Button variant="outline" onClick={handleHistogram}>
            Show region histogram
          </Button>
        )}
      </div>
    </div>
  );
};

export default MapTooltip;

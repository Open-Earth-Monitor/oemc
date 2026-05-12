'use client';

import {
  FC,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import { toLonLat } from 'ol/proj';
import { LuX } from 'react-icons/lu';

import {
  histogramVisibilityAtom,
  nutsDataResponseAtom,
  regionsLayerVisibilityAtom,
} from '@/app/store';

import { CATEGORIES_COLORS } from '@/constants/categories';

import { useCountryName } from '@/hooks/countries';
import { useLayer } from '@/hooks/layers';

import type { MonitorTooltipInfo } from '@/components/map/types';
import { Button } from '@/components/ui/button';

import { AnalysisSVG } from '@/SVGS/analysis';

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

const MapTooltip: FC<MapTooltipProps> = ({
  position,
  coordinate,
  onCloseTooltip = () => null,
  data,
}) => {
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

  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const bodyId = useId();
  const [coords, setCoords] = useState<{ left: number; top: number } | null>(null);
  const [tailOnTop, setTailOnTop] = useState(false);

  useEffect(() => {
    if (!position) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseTooltip();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [position, onCloseTooltip]);

  useEffect(() => {
    if (!position || !coords) return;
    closeRef.current?.focus({ preventScroll: true });
  }, [position, coords]);

  useLayoutEffect(() => {
    if (!position || !ref.current) return;
    const el = ref.current;
    const parent = el.offsetParent as HTMLElement | null;
    const pw = parent?.clientWidth ?? window.innerWidth;
    const ph = parent?.clientHeight ?? window.innerHeight;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const margin = 8;
    const gap = 14;

    let left = position[0] - w / 2;
    let top = position[1] - gap - h;
    let flipped = false;

    if (top < margin) {
      top = position[1] + gap;
      flipped = true;
    }

    left = Math.max(margin, Math.min(left, pw - w - margin));
    top = Math.max(margin, Math.min(top, ph - h - margin));

    setCoords((prev) => (prev?.left === left && prev?.top === top ? prev : { left, top }));
    setTailOnTop((prev) => (prev === flipped ? prev : flipped));
  });

  if (!position) return null;

  const hasLayer = !!data?.id;
  const hasValue = data?.value !== null && data?.value !== undefined && data?.value !== 0;
  const label = [countryName, nutsDataResponse?.NUTS_NAME].filter(Boolean).join(', ');

  const lonLat: [number, number] | null = (() => {
    if (!coordinate || coordinate.length < 2) return null;
    const [lon, lat] = toLonLat([coordinate[0], coordinate[1]]);
    if (!Number.isFinite(lon) || !Number.isFinite(lat)) return null;
    return [lon, lat];
  })();
  const formatDeg = (n: number) => `${n.toFixed(4)}°`;
  // Show a coordinate readout when there's no human-readable place name —
  // i.e. point queries, and region queries that came back without a NUTS_NAME.
  const showCoords = !!lonLat && hasLayer && (!isRegionsLayerActive || !nutsDataResponse?.NUTS_NAME);

  return (
    <div
      ref={ref}
      data-testid="map-tooltip"
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-describedby={bodyId}
      aria-live="polite"
      className="absolute z-50 w-[263px] font-satoshi font-medium text-white-500"
      style={{
        left: `${coords?.left ?? position[0]}px`,
        top: `${coords?.top ?? position[1] - 10}px`,
        visibility: coords ? 'visible' : 'hidden',
      }}
    >
      <div className="relative rounded-[20px] bg-black-150 p-5 shadow-md">
        <button
          ref={closeRef}
          type="button"
          data-testid="map-tooltip-close"
          onClick={onCloseTooltip}
          aria-label="Close tooltip"
          className="size-[34px] absolute -right-2 -top-2 z-10 flex items-center justify-center rounded-full border border-white-800 bg-black-150 text-white-500 transition-colors hover:border-white-500 hover:text-white-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black-150"
        >
          <LuX aria-hidden="true" focusable="false" className="size-4" />
        </button>

        <div id={bodyId} className="flex flex-col gap-3">
          <div className="flex items-start gap-1 pr-7">
            <AnalysisSVG aria-hidden="true" className="size-6 flex-shrink-0" />
            <h3
              id={titleId}
              data-testid="map-tooltip-title"
              style={{ color }}
              className="text-xs leading-[1.4]"
            >
              {hasLayer ? data.title : 'No layer active'}
            </h3>
          </div>

          {!hasLayer && (
            <p data-testid="map-tooltip-no-layer" className="text-xs">
              Activate at least one layer from the sidebar to see data for this location.
            </p>
          )}

          {showCoords && lonLat && (
            <p
              data-testid="map-tooltip-coordinates"
              className="flex items-center gap-3 text-xs"
            >
              <span className="whitespace-nowrap">Coordinates:</span>
              <span className="whitespace-nowrap rounded-full bg-white-950 px-2 py-0.5 font-mono">
                <span aria-label={`Latitude ${lonLat[1].toFixed(4)} degrees`}>
                  {formatDeg(lonLat[1])}
                </span>
                <span aria-hidden="true">, </span>
                <span aria-label={`Longitude ${lonLat[0].toFixed(4)} degrees`}>
                  {formatDeg(lonLat[0])}
                </span>
              </span>
            </p>
          )}

          {hasLayer && hasValue && isRegionsLayerActive && (
            <p className="flex items-center gap-3 text-xs">
              <span className="whitespace-nowrap">Location Selected:</span>
              {!!nutsDataResponse?.NUTS_NAME && (
                <span
                  data-testid="map-tooltip-location"
                  className="whitespace-nowrap rounded-full bg-white-950 px-2 py-0.5"
                >
                  {label}
                </span>
              )}
            </p>
          )}

          {hasLayer && !hasValue && (
            <p data-testid="map-tooltip-no-data" className="text-xs">
              No data is available at this specific location.
            </p>
          )}

          {hasLayer && hasValue && !isRegionsLayerActive && (
            <Button
              data-testid="map-tooltip-point-histogram"
              variant="outline"
              onClick={handleClick}
              className="h-[47px] w-full justify-center px-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black-150"
            >
              Show point histogram
            </Button>
          )}
          {hasLayer && hasValue && isRegionsLayerActive && (
            <Button
              data-testid="map-tooltip-region-histogram"
              variant="outline"
              onClick={handleHistogram}
              className="h-[47px] w-full justify-center px-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black-150"
            >
              Show region histogram
            </Button>
          )}
        </div>

        <div
          aria-hidden
          className={`size-3.5 absolute left-1/2 -translate-x-1/2 rotate-45 bg-black-150 ${
            tailOnTop ? '-top-1.5' : '-bottom-1.5'
          }`}
        />
      </div>
    </div>
  );
};

export default MapTooltip;

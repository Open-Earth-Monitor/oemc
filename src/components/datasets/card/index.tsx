'use client';

import { FC, useCallback, useMemo } from 'react';

import { HiOutlineExternalLink } from 'react-icons/hi';
import { LuLayers2 } from 'react-icons/lu';

import cn from '@/lib/classnames';
import { isValidUrl } from '@/lib/url';

import { Geostory } from '@/types/geostories';
import type { LayerParsed } from '@/types/layers';
import { Monitor, MonitorParsed } from '@/types/monitors';

import { histogramVisibilityAtom, regionsLayerVisibilityAtom } from '@/app/store';

import { useSyncCompareLayersSettings, useSyncLayersSettings } from '@/hooks/sync-query';

import Histogram from '@/containers/histogram';

import TimeSeriesComparativeLayers from '@/components/timeseries-comparative-layers';
import TimeSeriesSameLayer from '@/components/timeseries-layer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAtom } from 'jotai';

type DatasetCardProps = LayerParsed & {
  id: string;
  active?: boolean;
  type?: 'monitor' | 'geostory';
  isGeostory?: boolean;
  use_case_link?: Monitor['use_case_link'] | Geostory['use_case_link'];
  color?: MonitorParsed['color'];
  comparisonLayer?: LayerParsed | null;
};

const DatasetCard: FC<DatasetCardProps> = ({
  id,
  title,
  download_url,
  description,
  range,
  color,
  isGeostory = false,
  comparisonLayer = null,
}) => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();
  // isActive is based on the url
  const isActive = useMemo(() => layers?.[0]?.id === id, [id, layers]);
  const isCompareActive = useMemo(() => compareLayers?.[1]?.id === id, [id, compareLayers]);

  const [isHistogramActive, setHistogramVisibility] = useAtom(histogramVisibilityAtom);
  // isActive is based on the url
  const [regionsLayerVisibility, setIsRegionsLayerActive] = useAtom(regionsLayerVisibilityAtom);

  const layerToCompareId = useMemo(() => {
    if (!comparisonLayer) return null;
    return compareLayers?.[0]?.id || comparisonLayer.layer_id || null;
  }, [comparisonLayer, compareLayers]);

  const handleToggleLayer = useCallback(() => {
    if (!isActive) {
      void setLayers([
        {
          id,
          opacity: layers?.[0]?.opacity || 1,
          date: range?.[0]?.value,
        },
      ]);
      if (!isGeostory && range.length <= 1) void setCompareLayers(null);
      if (!isGeostory && range.length > 1 && isCompareActive) {
        void setCompareLayers([
          {
            id: layerToCompareId,
            opacity: compareLayers?.[0]?.opacity || 1,
            date: range[range?.length - 1].value,
          },
        ]);
      }
    } else {
      void setLayers(null);
      void setCompareLayers(null);
    }
  }, [
    id,
    isActive,
    isCompareActive,
    isGeostory,
    layers,
    range,
    setCompareLayers,
    setLayers,
    layerToCompareId,
    compareLayers,
  ]);

  const isValidUrlDownload = isValidUrl(download_url);

  return (
    <div
      className="space-y-3 rounded-3xl border border-black-100 p-3.5 font-medium"
      data-testid={`dataset-item-${id}`}
    >
      <div className="flex items-start justify-between">
        <h2
          data-testid="dataset-title"
          className="max-w-[60%] font-satoshi text-secondary-500"
          style={{ color }}
        >
          {title}
        </h2>
        <div className="flex items-center space-x-3">
          <span className="text-xs text-white-500/50">{isActive ? 'Hide' : 'Show'} layer</span>
          <Switch
            value={id}
            id={id}
            checked={isActive}
            className="h-4 w-6 shrink-0"
            onCheckedChange={handleToggleLayer}
          />
        </div>
      </div>

      <p data-testid="dataset-description" className="text-secondary-500">
        {description}
      </p>

      <div className="mt-1.5 flex items-baseline space-x-2"></div>

      <div className="mt-1.5 flex items-baseline space-x-2">
        {!!download_url && isValidUrlDownload && (
          <a
            href={download_url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="dataset-download-button"
            title="Go to download dataset site"
          >
            <HiOutlineExternalLink className="h-6 w-6 text-secondary-500" />
          </a>
        )}
      </div>

      {!isGeostory && (
        <div>
          <Button
            data-testid="dataset-layer-toggle-button"
            type="button"
            variant={isActive ? 'gradient' : 'default'}
            onClick={handleToggleLayer}
            className={cn('flex items-center space-x-2 leading-[140%]', {
              'bg-accent-green': isActive,
            })}
          >
            <span className="text-sm">{isActive ? 'Hide' : 'Show'} layer on the map</span>
            <LuLayers2 className="h-6 w-6 shrink-0" title="layer" />
          </Button>
        </div>
      )}

      {isActive && range && !!range.length && !comparisonLayer && (
        // same layer compared
        <TimeSeriesSameLayer
          layerId={id}
          range={range}
          isActive={isActive}
          defaultActive={true}
          autoPlay={isGeostory}
          comparisonLayer={comparisonLayer}
        />
      )}
      {comparisonLayer && (
        <TimeSeriesComparativeLayers
          layerId={id}
          range={range}
          isActive={isActive}
          comparisonLayer={comparisonLayer}
        />
      )}

      <div className="flex flex-col space-y-2.5 border-t border-dashed border-white-900 pt-3.5">
        {id && isHistogramActive && isActive && <Histogram color={color} title={title} id={id} />}
      </div>
    </div>
  );
};

export default DatasetCard;

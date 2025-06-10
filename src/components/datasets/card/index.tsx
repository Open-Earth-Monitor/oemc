'use client';

import Image from 'next/image';

import { FC, useCallback, useMemo } from 'react';

import { useAtom } from 'jotai';

import { HiOutlineExternalLink } from 'react-icons/hi';
import { LuLayers2 } from 'react-icons/lu';

import { regionsLayerVisibilityAtom } from '@/app/store';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

import cn from '@/lib/classnames';
import { isValidUrl } from '@/lib/url';

import type { LayerParsed } from '@/types/layers';
import { useSyncCompareLayersSettings, useSyncLayersSettings } from '../../../hooks/sync-query';
import { Monitor, MonitorParsed } from '@/types/monitors';
import { Geostory } from '@/types/geostories';
import TimeSeries from '@/components/timeseries';

type DatasetCardProps = LayerParsed & {
  id: string;
  active?: boolean;
  type?: 'monitor' | 'geostory';
  isGeostory?: boolean;
  use_case_link?: Monitor['use_case_link'] | Geostory['use_case_link'];
  color?: MonitorParsed['color'];
};

const DatasetCard: FC<DatasetCardProps> = ({
  id,
  title,
  download_url,
  description,
  range,
  color,
  isGeostory = false,
  data_meaning,
  value_society,
  usage_examples,
}) => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();

  // isActive is based on the url
  const isActive = useMemo(() => layers?.[0]?.id === id, [id, layers]);
  const isCompareActive = useMemo(() => compareLayers?.[1]?.id === id, [id, compareLayers]);
  const [regionsLayerVisibility, setIsRegionsLayerActive] = useAtom(regionsLayerVisibilityAtom);

  /**
   * Handle click on the toggle button
   */
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
            id,
            opacity: layers?.[0]?.opacity || 1,
            date: range[range?.length - 1].value,
          },
        ]);
      }
    } else {
      void setLayers(null);
      void setCompareLayers(null);
    }
  }, [id, isActive, isCompareActive, isGeostory, layers, range, setCompareLayers, setLayers]);

  const isValidUrlDownload = isValidUrl(download_url);

  const handleRegionsLayerVisibility = () => setIsRegionsLayerActive(!regionsLayerVisibility);

  return (
    <div className="space-y-3 bg-brand-300 p-3.5 font-medium" data-testid={`dataset-item-${id}`}>
      <h2 data-testid="dataset-title" className="font-satoshi text-secondary-500" style={{ color }}>
        {title}
      </h2>

      <p data-testid="dataset-description" className="text-secondary-500">
        {description}
      </p>

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
      {isActive && range && !!range.length && (
        <TimeSeries
          layerId={id}
          range={range}
          isActive={isActive}
          defaultActive={isActive}
          autoPlay={true}
        />
      )}
      <div className="flex flex-col space-y-2.5 border-t border-dashed border-white-900 pt-3.5">
        <div className="flex items-center space-x-2">
          <Switch onClick={handleRegionsLayerVisibility} />
          <span
            className={cn('text-sm', {
              'text-accent-green': regionsLayerVisibility,
            })}
          >
            Activate regions to analyze
          </span>
        </div>
        {regionsLayerVisibility && (
          <div className="flex w-full items-center justify-between">
            <p className="max-w- text-xs text-secondary-500">
              Click on the map to select a region and analyze it based on the active layer.
            </p>
            <Image
              src={`/svgs/regions-sidebar.svg`}
              width={34}
              height={34}
              alt="left layer active"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DatasetCard;

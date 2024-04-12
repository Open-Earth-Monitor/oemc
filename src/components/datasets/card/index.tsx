'use client';

import { FC, useCallback, useMemo } from 'react';

import { HiOutlineExternalLink } from 'react-icons/hi';
import { LuLayers } from 'react-icons/lu';

import cn from '@/lib/classnames';

import type { LayerParsed } from '@/types/layers';

import { useSyncCompareLayersSettings, useSyncLayersSettings } from '../../../hooks/sync-query';

type DatasetCardProps = LayerParsed & {
  id: string;
  active?: boolean;
  type?: 'monitor' | 'geostory';
  isGeostory?: boolean;
};

const DatasetCard: FC<DatasetCardProps> = ({
  id,
  title,
  download_url,
  description,
  range,
  isGeostory = false,
}) => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();

  // isActive is based on the url
  const isActive = useMemo(() => layers?.[0]?.id === id, [id, layers]);
  const isCompareActive = useMemo(() => compareLayers?.[1]?.id === id, [id, compareLayers]);

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

  return (
    <div className="space-y-6 bg-brand-300 p-6" data-testid={`dataset-item-${id}`}>
      <div className="flex items-start justify-between space-x-4">
        <h2 data-testid="dataset-title" className="font-satoshi text-2xl font-bold">
          {title}
        </h2>
        <div className="mt-1.5 flex items-baseline space-x-2">
          {!!download_url && (
            <a
              href={download_url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="dataset-download-button"
              title="Go to download dataset site"
            >
              <HiOutlineExternalLink className="h-6 w-6" />
            </a>
          )}
        </div>
      </div>

      <p data-testid="dataset-description">{description}</p>

      <button
        data-testid="dataset-layer-toggle-button"
        type="button"
        className={cn(
          'flex min-h-[38px] w-full items-center justify-center space-x-2 border-2 border-secondary-500 px-6 py-2 text-xs font-bold transition-colors hover:bg-secondary-500/20',
          {
            'bg-secondary-500 text-brand-500 hover:text-secondary-500': isActive,
          }
        )}
        onClick={handleToggleLayer}
      >
        <span>{isActive ? 'Hide' : 'Show'} layer on the map</span>
        <LuLayers className="h-3 w-3 text-inherit" title="layer" />
      </button>
    </div>
  );
};

export default DatasetCard;

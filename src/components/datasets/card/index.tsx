import { FC, useCallback, useEffect, useState } from 'react';

import { FiInfo } from 'react-icons/fi';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { LuLayers } from 'react-icons/lu';

import type { LayerParsedRangeTypes } from '@/types/datasets';

import { useURLayerParams, useURLParams } from '@/hooks/url-params';

import TimeSeries from '@/components/timeseries';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const DatasetCard: FC<
  LayerParsedRangeTypes & {
    id: string;
    autoPlay?: boolean;
  }
> = ({ id, title, download_url, description, author, range, autoPlay = false }) => {
  const { updateSearchParam, removeSearchParam } = useURLParams();
  const { layerId, layerOpacity, date } = useURLayerParams();

  const [isActive, setIsActive] = useState<boolean>(id === layerId);

  const handleClick = useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);

  /**
   * Update URL when isActive changes
   */
  useEffect(() => {
    if (isActive) {
      updateSearchParam({
        layers: [{ id, opacity: layerOpacity || 1, date: date || range?.[0]?.value }],
      });
    } else if (!isActive && id === layerId) {
      removeSearchParam('layers');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  /**
   * Setting isActive if autoPlay is true
   */
  useEffect(() => {
    if (autoPlay) setIsActive(autoPlay);
  }, [autoPlay]);

  return (
    <div className="space-y-6 bg-brand-300 p-6" data-testid={`dataset-item-${id}`}>
      <div className="flex items-start justify-between space-x-4">
        <h2 data-testid="dataset-title" className="font-satoshi text-2xl font-bold">
          {title}
        </h2>
        <div className="mt-1.5 flex items-baseline space-x-2">
          <Popover>
            <PopoverTrigger data-testid="dataset-info-button">
              <FiInfo className="h-6 w-6 text-secondary-500" title="Show info" />
            </PopoverTrigger>
            <PopoverContent align="center" sideOffset={5} data-testid="dataset-info-content">
              <div className="flex flex-col">
                <ul>
                  <li>Data author: {author}</li>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
          {!!download_url && (
            <a
              href={download_url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="dataset-download-button"
              title="Go to download dataset site"
            >
              <HiOutlineExternalLink className="h-6 w-6 text-gray-300" />
            </a>
          )}
        </div>
      </div>

      <p data-testid="dataset-description">{description}</p>

      {range && <TimeSeries range={range} layerId={id} autoPlay={autoPlay} isActive={isActive} />}

      <button
        data-testid="dataset-layer-toggle-button"
        type="button"
        className="flex min-h-[38px] w-full items-center justify-center space-x-2 border-2 border-secondary-500 px-6 py-2 text-xs font-bold text-secondary-500 transition-colors hover:bg-secondary-500 hover:text-brand-500"
        onClick={handleClick}
      >
        <span>{isActive ? 'Hide' : 'Show'} layer on the map</span>
        <LuLayers className="h-3 w-3 text-inherit" title="layer" />
      </button>
    </div>
  );
};

export default DatasetCard;

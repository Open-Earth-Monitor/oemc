'use client';

import { FC, useCallback, useEffect, useMemo, useRef } from 'react';

import { useAtom } from 'jotai';

import { Geostory } from '@/types/geostories';
import type { LayerParsed } from '@/types/layers';
import { Monitor, MonitorParsed } from '@/types/monitors';

import { histogramVisibilityAtom } from '@/app/store';

import { useSyncCompareLayersSettings, useSyncLayersSettings } from '@/hooks/sync-query';

import Histogram from '@/containers/histogram';

import { Switch } from '@/components/ui/switch';

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
  const hasCompare = !!compareLayers?.[0]?.id;

  const [isHistogramActive] = useAtom(histogramVisibilityAtom);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleToggleLayer = useCallback(() => {
    if (!isActive) {
      void setLayers([
        {
          id,
          opacity: layers?.[0]?.opacity || 1,
          date: range?.[0]?.value,
        },
      ]);
      if (!isGeostory && range.length <= 1) {
        void setCompareLayers(null);
      } else if (!isGeostory && hasCompare && range.length > 1) {
        const newCompareId = comparisonLayer ? comparisonLayer.layer_id : id;
        void setCompareLayers([
          {
            id: newCompareId,
            opacity: compareLayers?.[0]?.opacity || 1,
            date: range[range.length - 1].value,
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
    hasCompare,
    isGeostory,
    layers,
    range,
    setCompareLayers,
    setLayers,
    comparisonLayer,
    compareLayers,
  ]);

  useEffect(() => {
    if (!isHistogramActive || !isActive || !cardRef.current) return;
    requestAnimationFrame(() => {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [isHistogramActive, isActive]);

  return (
    <div
      ref={cardRef}
      id={`histogram-anchor-${id}`}
      className="space-y-3 rounded-3xl border border-black-100 p-3.5 text-sm font-medium text-white-50"
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

      <p data-testid="dataset-description">{description}</p>

      {id && isHistogramActive && isActive && (
        <Histogram color={color} title={title} id={id} isGeostory={isGeostory} />
      )}
    </div>
  );
};

export default DatasetCard;

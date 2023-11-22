import { useState, useEffect, useCallback, createRef, useLayoutEffect } from 'react';

import { cn } from '@/lib/classnames';

import { useLayerParsedSource } from '@/hooks/layers';
import { useSyncCompareLayersSettings, useSyncLayersSettings } from '@/hooks/sync-query';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import {
  DROPDOWN_TRIGGER_STYLES,
  LEGEND_BUTTON_STYLES,
  DROPDOWN_CONTENT_STYLES,
} from './constants';
import OpacitySetting from './opacity';
import RemoveLayer from './remove';
import LayerVisibility from './visibility';

type ActiveTab = 'layer-settings' | 'compare-layers';

const findLabel = (value: string, range: { label: string; value: string | number }[]) =>
  range?.find((d: { label: string; value: string }) => d.value === value)?.label satisfies
    | string
    | number;

export const Legend = () => {
  const [layers, setLayers] = useSyncLayersSettings();
  const [compareLayers, setCompareLayers] = useSyncCompareLayersSettings();

  const layerId = layers?.[0]?.id;
  const opacity = layers?.[0]?.opacity;

  const compareDate = compareLayers?.[0]?.date;

  const { data } = useLayerParsedSource({ layer_id: layerId }, { enabled: !!layers?.length });
  const { title, range } = data ?? {};

  const [activeTab, setActiveTab] = useState<ActiveTab>(
    !!compareDate ? 'compare-layers' : 'layer-settings'
  );

  const handleTabChange = (value: ActiveTab) => {
    if (value === 'compare-layers') {
      void setCompareLayers([
        { id: layerId, opacity, date: compareDate || range[range.length - 1]?.value },
      ]);
    }
    if (value === 'layer-settings') {
      void setCompareLayers(null);
    }
    setActiveTab(value);
  };

  const baseDateLabel = findLabel(layers?.[0]?.date, range);
  const CompareDateLabel = findLabel(compareLayers?.[0]?.date, range);

  const handleBaseDate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      void setLayers([{ id: layerId, opacity, date: e.currentTarget.value }]);
    },
    [layerId, opacity, setLayers]
  );

  const handleCompareDate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      void setCompareLayers([{ id: layerId, opacity, date: e.currentTarget.value }]);
    },
    [layerId, opacity, setCompareLayers]
  );

  useEffect(() => {
    if (activeTab === 'compare-layers' && !compareDate) {
      setActiveTab('layer-settings');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compareDate]);
  const [legendWidth, setLegendWith] = useState<number>(0);

  const titleRef = createRef<HTMLDivElement>();

  useLayoutEffect(() => {
    if (titleRef && titleRef.current) {
      const width = titleRef.current.clientWidth;
      setLegendWith(width);
    }
  }, [titleRef, setLegendWith]);

  return (
    <div
      className="absolute bottom-3 right-3 z-[55] space-y-1 font-inter text-xs"
      data-testid="map-legend"
    >
      <Tabs value={activeTab} onValueChange={handleTabChange} className="min-w-[270px]">
        <TabsList className="border border-secondary-500 bg-brand-500">
          <TabsTrigger
            data-testid="map-legend-toggle-button"
            value="layer-settings"
            className={cn(LEGEND_BUTTON_STYLES)}
          >
            Layer
          </TabsTrigger>
          <TabsTrigger
            value="compare-layers"
            className={cn(LEGEND_BUTTON_STYLES)}
            data-testid="map-legend-compare-button"
            disabled={!range || range.length === 0 || !layerId}
          >
            Compare
          </TabsTrigger>
        </TabsList>
        <TabsContent value="layer-settings" style={{ minWidth: legendWidth + 130 }}>
          <div
            className="relative flex min-h-[34px] items-start justify-between space-x-4 rounded-sm border border-gray-600 bg-brand-500 px-3.5 py-2.5 text-secondary-500"
            data-testid="map-legend-item"
          >
            <div
              data-testid="map-legend-item-title"
              className="rounded-sm text-xs font-bold"
              ref={titleRef}
            >
              {title}
            </div>
            <div
              className="flex space-x-2 divide-x divide-secondary-800"
              data-testid="map-legend-item-toolbar"
            >
              <div className="flex space-x-2">
                <OpacitySetting />
                <LayerVisibility />
              </div>
              <RemoveLayer className="pl-2" />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="compare-layers" style={{ minWidth: legendWidth + 130 }}>
          <div
            className={cn(
              'relative flex min-h-[34px] w-full flex-col justify-between rounded-sm border border-gray-600 bg-brand-500 text-secondary-500'
            )}
            data-testid="map-legend-item"
          >
            <div
              data-testid="map-legend-item-title"
              className="rounded-sm px-3.5 py-2.5 text-xs font-bold"
            >
              {title}
            </div>

            <div className="flex w-full flex-col items-start">
              <DropdownMenu>
                <DropdownMenuTrigger className={DROPDOWN_TRIGGER_STYLES}>
                  <div className="flex w-full justify-between whitespace-nowrap ">
                    <span>Selected year: {baseDateLabel}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  alignOffset={0}
                  sideOffset={0}
                  className={DROPDOWN_CONTENT_STYLES}
                  style={{ width: 'calc(100% - 2rem)' }}
                >
                  {range?.map((d) => (
                    <DropdownMenuItem
                      key={d.value}
                      className="m-auto flex w-full flex-1 justify-center whitespace-nowrap px-6 text-center text-secondary-500 hover:bg-secondary-900"
                    >
                      <button type="button" value={d.value} onClick={handleBaseDate}>
                        {d.label}
                      </button>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger className={DROPDOWN_TRIGGER_STYLES}>
                  <div className="flex w-full justify-between whitespace-nowrap">
                    <span>Selected year: {CompareDateLabel}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  alignOffset={0}
                  sideOffset={0}
                  className={DROPDOWN_CONTENT_STYLES}
                  style={{ width: 'calc(100% - 2rem)' }}
                >
                  {range?.map((d) => (
                    <DropdownMenuItem
                      key={d.value}
                      className="m-auto flex w-full flex-1 justify-center whitespace-nowrap px-6 text-center text-secondary-500 hover:bg-secondary-900"
                    >
                      <button type="button" value={d.value} onClick={handleCompareDate}>
                        {d.label}
                      </button>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Legend;
